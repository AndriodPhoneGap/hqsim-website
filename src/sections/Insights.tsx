import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, ChevronRight, Copy, MessageCircle, Radio, Target } from "lucide-react"
import { brand, insights } from "@/data/site"
import { TRACK_EVENTS, track } from "@/lib/analytics"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/common/Reveal"
import { Section, SectionHeading } from "@/components/common/SectionHeading"

type Insight = (typeof insights)[number]

/**
 * 技术洞察：左侧文章列表 + 右侧公众号订阅卡（sticky）。
 *
 * 布局策略：
 * - 首篇作为「主推文章」大卡片，承载完整要点与行动建议，形成视觉重心；
 * - 其余 5 篇作为紧凑列表卡，信息密度更高、便于横向对比；
 * - 右侧栏承担「内容 → 私域」的转化闭环：二维码 + 复制微信号 + 加企业微信。
 *
 * 交互说明：
 * - 卡片整体可点击 —— 通过标题内按钮的 `after` 伪元素拉伸覆盖整卡，
 *   既保证整卡点击热区与埋点，又避免 `<button>` 内嵌 `<h3>` 的非法结构；
 * - 主推卡内的「在公众号查看完整版」为独立锚点，层级高于覆盖层。
 */

/** 分类胶囊：主推为青色描边，列表态弱化 */
function categoryPill(active: boolean) {
  return cn(
    "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300",
    active
      ? "border-cyan-500/30 bg-cyan-500/[0.08] text-cyan-400"
      : "border-white/10 bg-white/[0.03] text-muted-foreground",
  )
}

export default function Insights() {
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef<number | null>(null)

  const featured: Insight = insights[0]
  const list: Insight[] = insights.slice(1)

  // 卸载时清理定时器，避免状态更新泄漏
  useEffect(
    () => () => {
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current)
    },
    [],
  )

  const copyWechatId = async () => {
    track(TRACK_EVENTS.WECHAT_COPY_ID, { source: "insights-sidebar", itemId: brand.wechatId })
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(brand.wechatId)
      } else {
        // 兜底：非安全上下文或旧浏览器下 Clipboard API 不可用
        const area = document.createElement("textarea")
        area.value = brand.wechatId
        area.setAttribute("readonly", "")
        area.style.position = "fixed"
        area.style.opacity = "0"
        document.body.appendChild(area)
        area.select()
        document.execCommand("copy")
        document.body.removeChild(area)
      }
      setCopied(true)
      if (copyTimer.current !== null) window.clearTimeout(copyTimer.current)
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // 复制失败时保持原状，用户可直接手动输入微信号
      setCopied(false)
    }
  }

  const trackInsight = (id: string) => {
    track(TRACK_EVENTS.INSIGHT_VIEW, { source: "insights", itemId: id })
  }

  return (
    <Section id="insights" className="relative">
      {/* ---------- 背景装饰（克制） ---------- */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-dotfield opacity-[0.22]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-[340px] w-[340px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -left-28 bottom-6 h-[300px] w-[300px] rounded-full bg-violet-500/[0.06] blur-[120px]" />

      <div className="relative">
        <SectionHeading
          align="center"
          eyebrow="TECHNICAL INSIGHTS"
          title={
            <>
              每周拆一个<strong className="text-gradient">真问题</strong>
            </>
          }
          desc="这些是与微信公众号同步的深度分析，官网保留结构化版本，便于检索与对比。"
        />

        <Reveal delay={120}>
          <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground opacity-70">
            每周三更新 · 已同步 {insights.length} 篇
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          {/* ==================== 左：文章列表 ==================== */}
          <div className="flex min-w-0 flex-col gap-4">
            {/* ---------- 主推文章 ---------- */}
            <Reveal delay={80}>
              <article className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-ink-800/70 to-ink-900/60 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/30 hover:shadow-glow">
                <div className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-cyan-500/[0.10] blur-[90px]" />

                <div className="relative p-6 sm:p-8">
                  {/* 头部：分类 + 日期 + 阅读时长 */}
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <span className={categoryPill(true)}>{featured.category}</span>
                    <span className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground opacity-70">
                      <span className="tnum">{featured.date}</span>
                      <span className="h-3 w-px bg-white/10" />
                      <span className="tnum">{featured.readTime}</span>
                    </span>
                  </div>

                  {/* 标题（按钮的 after 伪元素覆盖整卡，形成整卡点击热区） */}
                  <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-cyan-400">
                    <button
                      type="button"
                      onClick={() => trackInsight(featured.id)}
                      aria-label={`查看文章：${featured.title}`}
                      className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
                    >
                      {featured.title}
                    </button>
                  </h3>

                  {/* 摘要 */}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{featured.summary}</p>

                  {/* 要点 */}
                  <div className="mt-6">
                    <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-400/90">
                      <span className="h-px w-4 bg-cyan-500/50" />
                      Key Takeaways
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {featured.takeaways.map((point) => (
                        <li key={point} className="flex gap-2.5 text-[13px] leading-relaxed text-foreground">
                          <ChevronRight
                            className="mt-[3px] h-3.5 w-3.5 shrink-0 text-cyan-400"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 行动建议（转化钩子） */}
                  <div className="mt-6 flex items-start gap-3 rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06] px-4 py-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-cyan-500/15">
                      <Target className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                    </span>
                    <p className="text-[13px] leading-relaxed text-foreground">{featured.cta}</p>
                  </div>

                  {/* 底部：标签 + 公众号链接 */}
                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/[0.07] pt-5">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    <a
                      href="#insights-subscribe"
                      onClick={() => trackInsight(featured.id)}
                      className="relative z-10 ml-auto inline-flex items-center gap-1.5 rounded text-[12px] text-cyan-400 transition-colors duration-300 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                    >
                      在公众号查看完整版
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>

            {/* ---------- 其余文章：紧凑列表 ---------- */}
            {list.map((item, i) => (
              <Reveal key={item.id} delay={140 + i * 70}>
                <article className="group relative rounded-xl border border-white/[0.07] bg-ink-900/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/35 hover:bg-ink-850/70">
                  <div className="flex items-start gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={categoryPill(false)}>{item.category}</span>
                        <span className="tnum font-mono text-[11px] text-cyan-400/90">{item.date}</span>
                      </div>

                      <h3 className="mt-3 text-base font-medium leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-cyan-400">
                        <button
                          type="button"
                          onClick={() => trackInsight(item.id)}
                          aria-label={`查看文章：${item.title}`}
                          className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
                        >
                          {item.title}
                        </button>
                      </h3>

                      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground opacity-80">
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-3 pt-1">
                      <span className="tnum font-mono text-[11px] text-muted-foreground opacity-70">
                        {item.readTime}
                      </span>
                      <ArrowRight
                        className="h-4 w-4 text-cyan-400 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* ==================== 右：公众号订阅卡 ==================== */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal delay={160}>
              <div
                id="insights-subscribe"
                className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-ink-800/90 to-ink-900/90 p-6 shadow-card"
              >
                {/* 标题 */}
                <div className="flex items-center gap-3">
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/[0.10]">
                    <Radio className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-mint-400 ring-2 ring-ink-800 animate-pulse-glow" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-400/90">
                      Weekly Digest
                    </p>
                    <h3 className="mt-1 text-[15px] font-semibold text-foreground">公众号每周更新</h3>
                  </div>
                </div>

                {/* 二维码 */}
                <div className="mt-5 rounded-xl border border-white/[0.07] bg-ink-950/60 p-3">
                  <img
                    src={brand.wechatQr}
                    alt={`${brand.wechatName}公众号二维码`}
                    width={160}
                    height={160}
                    className="mx-auto w-full max-w-[160px] rounded-lg"
                  />
                </div>

                {/* 公众号名称与微信号 */}
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <p className="font-mono text-[12px] text-foreground">{brand.wechatName}</p>
                  <p className="tnum font-mono text-[11px] text-muted-foreground opacity-70">
                    ID: {brand.wechatId}
                  </p>
                </div>

                {/* 复制微信号 */}
                <button
                  type="button"
                  onClick={copyWechatId}
                  aria-label={`复制微信号 ${brand.wechatId}`}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] py-2.5 text-xs text-foreground transition-all duration-300 hover:border-cyan-500/40 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-mint-400" aria-hidden="true" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      复制微信号
                    </>
                  )}
                </button>

                {/* 说明 */}
                <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground opacity-80">
                  关注后可在公众号直接回复关键词「选型」获取工具包。
                </p>

                {/* 加企业微信 */}
                <a
                  href="#lead"
                  onClick={() =>
                    track(TRACK_EVENTS.CTA_CLICK, { source: "insights-sidebar", label: "add-wecom" })
                  }
                  className="btn-glow mt-5 w-full"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  加企业微信顾问
                </a>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* 底部分隔线 */}
        <div className="hairline mt-16" />
      </div>
    </Section>
  )
}
