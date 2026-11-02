import { useEffect, useRef, useState, type FormEvent } from "react"
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock,
  Copy,
  Flame,
  Gauge,
  Layers,
  Loader2,
  Lock,
  MessageCircle,
  Replace,
  Send,
  ShieldCheck,
  Table,
  type LucideIcon,
} from "lucide-react"
import { Reveal } from "@/components/common/Reveal"
import { SectionHeading } from "@/components/common/SectionHeading"
import { brand, leadForm, toolkits } from "@/data/site"
import { TRACK_EVENTS, track } from "@/lib/analytics"
import { cn } from "@/lib/utils"

/* ==========================================================================
   选型需求留资 —— 私域转化的主路径
   结构：左栏（价值主张 + 微信入口） / 右栏（工具包勾选 + 表单）
   ========================================================================== */

/** 图标名 → lucide 组件映射表，未命中的名字按调用点兜底 */
const ICON_MAP: Record<string, LucideIcon> = {
  Clock,
  ShieldCheck,
  Layers,
  Table,
  Replace,
  ClipboardCheck,
  Gauge,
}

/** 表单字段类型白名单 —— 数据源里的 type 字段以此为准 */
const FIELD_TYPES = ["text", "tel", "select", "textarea"] as const
type FieldType = (typeof FIELD_TYPES)[number]

/** 表单字段的本地视图类型（对数据源做一次收敛，避免 any） */
interface LeadField {
  id: string
  label: string
  placeholder: string
  required: boolean
  type: FieldType
  options: string[]
}

/** 安全读取 select 的 options 字段 */
function readOptions(field: unknown): string[] {
  if (field && typeof field === "object" && "options" in field) {
    const raw = (field as { options?: unknown }).options
    if (Array.isArray(raw)) {
      return raw.filter((item): item is string => typeof item === "string")
    }
  }
  return []
}

/** 把 leadForm.fields 收敛为强类型列表 */
const FIELDS: LeadField[] = leadForm.fields.map((field) => ({
  id: field.id,
  label: field.label,
  placeholder: field.placeholder,
  required: field.required,
  type: (FIELD_TYPES as readonly string[]).includes(field.type)
    ? (field.type as FieldType)
    : "text",
  options: readOptions(field),
}))

/** 标题拆分为「主语 + 关键词」，关键词走渐变强调 */
const TITLE_SPLIT = leadForm.title.indexOf("，")
const TITLE_LEAD = TITLE_SPLIT > 0 ? leadForm.title.slice(0, TITLE_SPLIT) : leadForm.title
const TITLE_TAIL = TITLE_SPLIT > 0 ? leadForm.title.slice(TITLE_SPLIT + 1) : ""

/** 输入框基础样式 */
const INPUT_BASE =
  "w-full rounded-lg border border-white/10 bg-ink-950/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground placeholder:opacity-55 outline-none transition-colors focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/25"

/** 单字段校验：必填 + 手机号格式 */
function validateField(field: LeadField, rawValue: string): string | undefined {
  const value = rawValue.trim()
  if (field.required && !value) {
    return `请填写${field.label}`
  }
  // 手机号：11 位数字且以 1 开头
  if (field.type === "tel" && value && !/^1\d{10}$/.test(value.replace(/\s/g, ""))) {
    return "请输入有效的手机号"
  }
  return undefined
}

export default function LeadCapture() {
  /** 表单取值 */
  const [values, setValues] = useState<Record<string, string>>({})
  /** 字段错误映射 */
  const [errors, setErrors] = useState<Record<string, string>>({})
  /** 已勾选的工具包 id */
  const [selectedToolkits, setSelectedToolkits] = useState<string[]>([])
  /** 提交状态 */
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle")
  /** 微信号复制状态 */
  const [copied, setCopied] = useState(false)

  const copyTimer = useRef<number | null>(null)
  const submitTimer = useRef<number | null>(null)

  // 卸载时清理定时器，避免对已卸载组件 setState
  useEffect(() => {
    return () => {
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current)
      if (submitTimer.current !== null) window.clearTimeout(submitTimer.current)
    }
  }, [])

  /** 复制微信号 */
  const copyWechatId = async () => {
    try {
      await navigator.clipboard.writeText(brand.wechatId)
      setCopied(true)
      track(TRACK_EVENTS.WECHAT_COPY_ID, { source: "lead-form", itemId: brand.wechatId })
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current)
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // 剪贴板不可用时，用户可手动输入微信号
    }
  }

  /** 勾选工具包 —— 勾选即视为下载意向 */
  const toggleToolkit = (id: string, checked: boolean) => {
    setSelectedToolkits((prev) =>
      checked ? (prev.includes(id) ? prev : [...prev, id]) : prev.filter((item) => item !== id),
    )
    if (checked) {
      track(TRACK_EVENTS.TOOLKIT_DOWNLOAD, { source: "lead-form", itemId: id })
    }
  }

  /** 输入变化：若有错误则即时重算该字段 */
  const handleChange = (field: LeadField, value: string) => {
    setValues((prev) => ({ ...prev, [field.id]: value }))
    if (errors[field.id]) {
      const next = validateField(field, value)
      setErrors((prev) => {
        const draft = { ...prev }
        if (next) {
          draft[field.id] = next
        } else {
          delete draft[field.id]
        }
        return draft
      })
    }
  }

  /** 提交 */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "submitting") return

    const nextErrors: Record<string, string> = {}
    let firstErrorId: string | null = null

    for (const field of FIELDS) {
      const message = validateField(field, values[field.id] ?? "")
      if (message) {
        nextErrors[field.id] = message
        if (!firstErrorId) firstErrorId = field.id
      }
    }

    setErrors(nextErrors)

    if (firstErrorId) {
      track(TRACK_EVENTS.LEAD_VALIDATION_ERROR, { source: "lead-form", itemId: firstErrorId })
      const target = document.getElementById(`lead-${firstErrorId}`)
      target?.scrollIntoView({ behavior: "smooth", block: "center" })
      target?.focus({ preventScroll: true })
      return
    }

    setStatus("submitting")

    /* ------------------------------------------------------------------
     * TODO: 接入真实后端 —— POST https://<your-api>/leads
     *
     * 建议请求体结构：
     * {
     *   contact: {
     *     name: string,      // 称呼
     *     company: string,   // 公司名称
     *     phone: string,     // 手机号
     *     wechat?: string    // 微信号（选填）
     *   },
     *   scene: string,        // 应用场景
     *   demand: string,       // 具体需求
     *   toolkits: string[],   // 已勾选的工具包 id
     *   submittedAt: number   // 客户端时间戳
     * }
     *
     * 服务端建议：二次校验 + 防刷（验证码 / 频控）+ 落库，
     * 并通过企业微信 API 或第三方表单收集服务推送给销售顾问。
     * 当前为纯静态站点，以下使用定时器模拟网络延迟，提交内容不会被真实发送。
     * ------------------------------------------------------------------ */
    submitTimer.current = window.setTimeout(() => {
      setStatus("done")
      track(TRACK_EVENTS.LEAD_SUBMIT, {
        source: "lead-form",
        itemId: selectedToolkits.length ? selectedToolkits.join(",") : "none",
      })
    }, 1200)
  }

  /** 重新提交一份需求 */
  const resetForm = () => {
    setValues({})
    setErrors({})
    setSelectedToolkits([])
    setStatus("idle")
  }

  /** 渲染单个字段 */
  const renderField = (field: LeadField) => {
    const fieldId = `lead-${field.id}`
    const error = errors[field.id]
    const isFullRow = field.type === "select" || field.type === "textarea"
    const describedBy = error ? `${fieldId}-error` : undefined

    return (
      <div key={field.id} className={cn(isFullRow && "sm:col-span-2")}>
        <label htmlFor={fieldId} className="mb-2 block text-xs font-medium text-foreground">
          {field.label}
          {field.required ? (
            <span className="ml-1 text-destructive" aria-hidden>
              *
            </span>
          ) : null}
        </label>

        {field.type === "select" ? (
          /* 原生 select：appearance-none 会移除系统箭头，这里补一个 chevron 指示 */
          <div className="relative">
            <select
              id={fieldId}
              name={field.id}
              value={values[field.id] ?? ""}
              required={field.required}
              aria-required={field.required || undefined}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
              onChange={(e) => handleChange(field, e.target.value)}
              className={cn(
                INPUT_BASE,
                "appearance-none bg-ink-950/80 pr-10 [&>option]:bg-ink-900 [&>option]:text-foreground",
                error && "border-destructive/60",
              )}
            >
              <option value="">请选择{field.label}</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground opacity-70"
              aria-hidden
            />
          </div>
        ) : field.type === "textarea" ? (
          <textarea
            id={fieldId}
            name={field.id}
            value={values[field.id] ?? ""}
            placeholder={field.placeholder}
            required={field.required}
            aria-required={field.required || undefined}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            rows={4}
            onChange={(e) => handleChange(field, e.target.value)}
            className={cn(INPUT_BASE, "resize-y", error && "border-destructive/60")}
          />
        ) : (
          <input
            id={fieldId}
            name={field.id}
            type={field.type === "tel" ? "tel" : "text"}
            inputMode={field.type === "tel" ? "numeric" : undefined}
            value={values[field.id] ?? ""}
            placeholder={field.placeholder}
            required={field.required}
            aria-required={field.required || undefined}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            onChange={(e) => handleChange(field, e.target.value)}
            className={cn(INPUT_BASE, "tnum", error && "border-destructive/60")}
          />
        )}

        {error ? (
          <p id={`${fieldId}-error`} role="alert" className="mt-1.5 text-[11px] text-destructive">
            {error}
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <section id="lead" className="relative overflow-hidden py-20 sm:py-28">
      {/* 背景：电路网格 + 双色辉光 */}
      <div className="pointer-events-none absolute inset-0 bg-circuit opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[110px]"
        aria-hidden
      />

      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* ---------------- 左栏：价值主张 + 微信入口 ---------------- */}
          <div className="flex flex-col gap-8">
            <SectionHeading
              align="left"
              eyebrow="GET A RECOMMENDATION"
              title={
                <>
                  {TITLE_LEAD}
                  {TITLE_TAIL ? (
                    <>
                      ，<span className="text-gradient">{TITLE_TAIL}</span>
                    </>
                  ) : null}
                </>
              }
              desc={leadForm.desc}
            />

            {/* 三项服务承诺 */}
            <ul className="flex flex-col gap-4">
              {leadForm.benefits.map((benefit, i) => {
                const Icon = ICON_MAP[benefit.icon] ?? Clock
                return (
                  <Reveal key={benefit.title} delay={i * 90} as="li">
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/10 text-cyan-400">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-foreground">{benefit.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </ul>

            {/* 微信咨询条：填表之外的第二条通路 */}
            <Reveal delay={280}>
              <div className="rounded-xl border border-white/[0.07] bg-ink-900/60 p-4">
                {/* 窄屏下改为两行堆叠，避免文案被压缩成竖条 */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={brand.wechatQr}
                      alt={`${brand.wecomName}微信二维码`}
                      width={60}
                      height={60}
                      className="h-[60px] w-[60px] shrink-0 rounded-lg border border-white/10 bg-ink-950/60"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 text-sm text-foreground">
                        <MessageCircle
                          className="h-3.5 w-3.5 shrink-0 text-cyan-400"
                          aria-hidden
                        />
                        <span className="min-w-0">
                          不想填表？直接加
                          <span className="text-cyan-400">{brand.wecomName}</span>
                          微信
                        </span>
                      </p>
                      <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground opacity-70">
                        微信号：{brand.wechatId}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={copyWechatId}
                    className="inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-foreground transition-colors hover:border-cyan-500/40 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 sm:w-auto"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-mint-400" aria-hidden />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden />
                        复制微信号
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------------- 右栏：工具包勾选 + 表单卡片 ---------------- */}
          <Reveal delay={120}>
            <div className="rounded-2xl border border-white/[0.08] bg-ink-900/70 p-6 shadow-card sm:p-8">
              {status === "done" ? (
                /* ============ 成功态 ============ */
                <div className="animate-fade-up text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-mint-400/30 bg-mint-400/10">
                    <CheckCircle2 className="h-8 w-8 text-mint-400" aria-hidden />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    已收到，顾问会在 2 小时内联系您
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    我们已记录您的场景与约束条件，将匹配同工艺节点的量产方案，
                    并同步附上替代料与风险评估。
                  </p>

                  {/* 微信加速通道 */}
                  <div className="mt-7 rounded-xl border border-white/[0.07] bg-ink-950/50 p-4 text-left">
                    <p className="text-sm font-medium text-foreground">
                      加微信可以更快拿到资料
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      直接添加 {brand.wecomName}，发送「选型」即可获取
                      {selectedToolkits.length
                        ? `已勾选的 ${selectedToolkits.length} 份资料`
                        : "选型资料"}
                      。
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={brand.wechatQr}
                        alt={`${brand.wecomName}微信二维码`}
                        width={60}
                        height={60}
                        className="h-[60px] w-[60px] shrink-0 rounded-lg border border-white/10 bg-ink-950/60"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-xs text-cyan-400">{brand.wechatId}</p>
                        <button
                          type="button"
                          onClick={copyWechatId}
                          className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-foreground transition-colors hover:border-cyan-500/40 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                        >
                          {copied ? (
                            <>
                              <Check className="h-3 w-3 text-mint-400" aria-hidden />
                              已复制
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" aria-hidden />
                              复制微信号
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 部署提示 */}
                  <p className="mt-5 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.06] px-3 py-2.5 text-left text-[11px] leading-relaxed text-cyan-400/90">
                    当前为纯静态演示站点，提交内容不会被真实发送。
                    正式部署时需将提交逻辑接入后端 API 或第三方表单收集服务
                    （如企业微信 API），接口位置见组件内 TODO 注释。
                  </p>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-ghost mt-6 w-full py-3"
                  >
                    再提交一份需求
                  </button>
                </div>
              ) : (
                /* ============ 表单态 ============ */
                <>
                  {/* A. 工具包勾选 */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground">
                        想要哪份资料？可多选
                      </h3>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-1 text-[11px] text-cyan-400">
                        <Flame className="h-3 w-3" aria-hidden />
                        热门资源会优先发送
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {toolkits.map((toolkit) => {
                        const Icon = ICON_MAP[toolkit.icon] ?? Table
                        const checked = selectedToolkits.includes(toolkit.id)
                        const inputId = `lead-toolkit-${toolkit.id}`

                        return (
                          <label
                            key={toolkit.id}
                            htmlFor={inputId}
                            className={cn(
                              "relative block cursor-pointer rounded-xl border p-4 transition-all duration-300 focus-within:ring-2 focus-within:ring-cyan-500/40",
                              checked
                                ? "border-cyan-500/50 bg-cyan-500/[0.08]"
                                : "border-white/10 bg-white/[0.02] hover:border-cyan-500/30 hover:bg-white/[0.04]",
                            )}
                          >
                            <input
                              id={inputId}
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => toggleToolkit(toolkit.id, e.target.checked)}
                              className="sr-only"
                            />

                            {/* 选中角标 */}
                            {checked ? (
                              <span
                                className="absolute left-0 top-0 flex h-4 w-4 items-center justify-center rounded-br-md bg-cyan-500 text-ink-950"
                                aria-hidden
                              >
                                <Check className="h-2.5 w-2.5" />
                              </span>
                            ) : null}

                            {/* 头部：图标 + 标题 + 热门徽章（flex 排布，避免徽章压住标题） */}
                            <span className="flex items-start gap-2.5">
                              <span
                                className={cn(
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
                                  checked
                                    ? "border-cyan-500/40 bg-cyan-500/15 text-cyan-400"
                                    : "border-white/10 bg-white/[0.03] text-cyan-500/80",
                                )}
                              >
                                <Icon className="h-4 w-4" aria-hidden />
                              </span>
                              <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-foreground">
                                {toolkit.title}
                              </span>
                              {toolkit.hot ? (
                                <span className="shrink-0 rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-medium leading-normal text-cyan-400">
                                  热门
                                </span>
                              ) : null}
                            </span>

                            <span className="mt-2.5 block text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                              {toolkit.desc}
                            </span>

                            <span className="mt-2 block font-mono text-[10px] text-cyan-400/90">
                              {toolkit.format}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  <div className="hairline my-7" />

                  {/* B. 表单 */}
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
                      {FIELDS.map(renderField)}
                    </div>

                    {/* C. 提交按钮 */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn-glow mt-7 w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                          提交中…
                        </>
                      ) : (
                        <>
                          提交需求，24 小时内收到选型建议
                          <Send className="h-4 w-4" aria-hidden />
                        </>
                      )}
                    </button>

                    {/* 隐私说明 */}
                    <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground opacity-70">
                      <Lock className="mt-0.5 h-3 w-3 shrink-0" aria-hidden />
                      {leadForm.privacy}
                    </p>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
