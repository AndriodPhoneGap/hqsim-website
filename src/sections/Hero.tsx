import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowRight, FileText } from "lucide-react"
import { brand, heroStats } from "@/data/site"
import { Reveal } from "@/components/common/Reveal"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                              滚动计数动画组件                              */
/* -------------------------------------------------------------------------- */

/**
 * 数字滚动计数：进入视口后用 requestAnimationFrame 从 0 缓动到目标值。
 * 小数位数由目标值自动推导（3.2 → 1 位，64 → 0 位），并尊重「减少动态效果」偏好。
 */
function Counter({
  value,
  duration = 1700,
  className,
}: {
  value: number
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement | null>(null)

  // 是否跳过动画：系统开启「减少动态效果」或环境不支持 IntersectionObserver
  const skipAnimation = useMemo(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return true
    if (typeof window.matchMedia !== "function") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  const [display, setDisplay] = useState(() => (skipAnimation ? value : 0))

  const decimals = useMemo(() => {
    const raw = String(value)
    const dot = raw.indexOf(".")
    if (dot === -1) return 0
    return Math.min(raw.length - dot - 1, 2)
  }, [value])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (skipAnimation) return

    let raf = 0
    let started = false

    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
        setDisplay(value * eased)
        if (progress < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true
            run()
            io.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration, skipAnimation])

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*                              芯片 + 电路主视觉 SVG                          */
/* -------------------------------------------------------------------------- */

/** 电路走线：每条带流动虚线，端点为焊盘节点；reverse 为反向流动 */
const TRACES: { d: string; color: string; reverse?: boolean; delay: number }[] = [
  { d: "M190 232 H132 V178 H74", color: "#22d3ee", delay: 0 },
  { d: "M190 300 H112 V340 H58", color: "#22d3ee", reverse: true, delay: -0.6 },
  { d: "M280 190 V118 H212 V64", color: "#8b5cf6", delay: -1.2 },
  { d: "M280 190 V140 H368 V86", color: "#22d3ee", reverse: true, delay: -1.8 },
  { d: "M370 236 H432 V186 H512", color: "#22d3ee", delay: -2.4 },
  { d: "M370 316 H448 V356 H512", color: "#8b5cf6", reverse: true, delay: -3 },
  { d: "M280 370 V440 H340 V496", color: "#22d3ee", delay: -3.6 },
  { d: "M244 370 V452 H176 V496", color: "#22d3ee", reverse: true, delay: -4.2 },
]

/** 走线端点节点坐标 */
const NODES: [number, number][] = [
  [74, 178],
  [58, 340],
  [212, 64],
  [368, 86],
  [512, 186],
  [512, 356],
  [340, 496],
  [176, 496],
]

/** 外圈技术标注：等宽字体小字 */
const ANNOTATIONS: {
  text: string
  x: number
  y: number
  anchor: "start" | "middle" | "end"
  color: string
}[] = [
  { text: "XISA", x: 220, y: 56, anchor: "start", color: "#5ee9ff" },
  { text: "NPU CORE", x: 376, y: 78, anchor: "start", color: "#5ee9ff" },
  { text: "UCIe", x: 68, y: 156, anchor: "end", color: "#22d3ee" },
  { text: "42nm", x: 52, y: 318, anchor: "end", color: "#22d3ee" },
  { text: "HBM", x: 512, y: 166, anchor: "end", color: "#5ee9ff" },
  { text: "SRAM", x: 168, y: 502, anchor: "end", color: "#22d3ee" },
]

const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

/** 计算单元阵列不透明度（确定性伪随机，避免每次渲染跳动） */
const cellOpacity = (col: number, row: number) =>
  0.14 + (((col * 5 + row * 3 + col * row) % 8) / 8) * 0.76

function ChipIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 560"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="XZE 系列 AI 芯片与电路互连示意图"
    >
      <defs>
        {/* 芯体描边渐变 */}
        <linearGradient id="xze-chip-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5ee9ff" />
          <stop offset="55%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        {/* 外层光晕 */}
        <radialGradient id="xze-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
          <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#04060d" stopOpacity="0" />
        </radialGradient>
        {/* 扫描光带渐变 */}
        <linearGradient id="xze-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="50%" stopColor="#5ee9ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
        {/* 霓虹辉光滤镜 */}
        <filter id="xze-neon" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* 芯体裁剪区，供扫描光带使用 */}
        <clipPath id="xze-chip-clip">
          <rect x="190" y="190" width="180" height="180" rx="26" />
        </clipPath>
      </defs>

      {/* 背光晕 */}
      <circle cx="280" cy="280" r="200" fill="url(#xze-halo)" />

      {/* 旋转虚线圆环：三环不同速度、不同方向 */}
      <g
        style={{ transformBox: "view-box", transformOrigin: "50% 50%" }}
        className="animate-spin-slow"
        fill="none"
      >
        <circle cx="280" cy="280" r="248" stroke="#22d3ee" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="1 12" />
        <circle cx="280" cy="280" r="196" stroke="#8b5cf6" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="3 18" />
      </g>
      <g
        style={{
          transformBox: "view-box",
          transformOrigin: "50% 50%",
          animationDuration: "42s",
          animationDirection: "reverse",
        }}
        className="animate-spin-slow"
        fill="none"
      >
        <circle cx="280" cy="280" r="214" stroke="#22d3ee" strokeOpacity="0.3" strokeWidth="1.4" strokeDasharray="10 16" />
      </g>
      <g
        style={{
          transformBox: "view-box",
          transformOrigin: "50% 50%",
          animationDuration: "64s",
        }}
        className="animate-spin-slow"
        fill="none"
      >
        <circle cx="280" cy="280" r="166" stroke="#5ee9ff" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="26 22" />
      </g>

      {/* 电路走线：stroke-dasharray + animate-trace-flow 形成流动感 */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4">
        {TRACES.map((t) => (
          <path
            key={t.d}
            d={t.d}
            stroke={t.color}
            strokeOpacity="0.55"
            strokeDasharray="12 8"
            className="animate-trace-flow"
            style={{
              animationDelay: `${t.delay}s`,
              animationDirection: t.reverse ? "reverse" : "normal",
              animationDuration: t.reverse ? "5.2s" : undefined,
            }}
          />
        ))}
      </g>

      {/* 走线端点节点 */}
      <g>
        {NODES.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="7" fill="#22d3ee" fillOpacity="0.16" className="animate-pulse-glow" />
            <circle cx={x} cy={y} r="3" fill="#5ee9ff" />
          </g>
        ))}
      </g>

      {/* 芯体：悬浮 + 发光 */}
      <g className="animate-float-slow">
        <rect
          x="190"
          y="190"
          width="180"
          height="180"
          rx="26"
          fill="none"
          stroke="#22d3ee"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          filter="url(#xze-neon)"
        />
        <rect x="190" y="190" width="180" height="180" rx="26" fill="#070b16" stroke="url(#xze-chip-stroke)" strokeWidth="1.6" />
        <rect x="201" y="201" width="158" height="158" rx="19" fill="none" stroke="#22d3ee" strokeOpacity="0.18" strokeWidth="1" />

        {/* 芯内计算单元阵列 */}
        <g>
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((__, col) => (
              <rect
                key={`${row}-${col}`}
                x={218 + col * 16}
                y={218 + row * 16}
                width="12"
                height="12"
                rx="2.5"
                fill={(row + col) % 7 === 0 ? "#8b5cf6" : "#22d3ee"}
                fillOpacity={cellOpacity(col, row)}
              />
            )),
          )}
        </g>

        {/* 芯内隔层走线 */}
        <g stroke="#5ee9ff" strokeOpacity="0.12" strokeWidth="1">
          <path d="M190 254 H370" />
          <path d="M190 306 H370" />
        </g>

        {/* 扫描光带：沿芯体纵向扫过（transform-box 需为 fill-box 才能正确位移） */}
        <g clipPath="url(#xze-chip-clip)">
          <rect
            x="190"
            y="190"
            width="180"
            height="18"
            fill="url(#xze-scan)"
            className="animate-scan-line"
            style={{ transformBox: "fill-box" }}
          />
        </g>

        {/* 芯体中心十字准星 */}
        <g stroke="#5ee9ff" strokeOpacity="0.35" strokeWidth="1">
          <path d="M272 280 H288 M280 272 V288" />
        </g>

        {/* 芯体型号 */}
        <text
          x="280"
          y="359"
          textAnchor="middle"
          fontFamily={MONO}
          fontSize="9"
          letterSpacing="2.4"
          fill="#5ee9ff"
          fillOpacity="0.55"
        >
          XZE-N900
        </text>
      </g>

      {/* 外圈技术标注 */}
      <g fontFamily={MONO} fontSize="11" letterSpacing="1.6">
        {ANNOTATIONS.map((a) => (
          <text key={a.text} x={a.x} y={a.y} textAnchor={a.anchor} fill={a.color} fillOpacity="0.65">
            {a.text}
          </text>
        ))}
      </g>

      {/* 角落装饰刻度 */}
      <g stroke="#22d3ee" strokeOpacity="0.3" strokeWidth="1">
        <path d="M28 40 V28 H40" />
        <path d="M520 40 V28 H508" />
        <path d="M28 520 V532 H40" />
        <path d="M520 520 V532 H508" />
      </g>
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Hero 区块                                  */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  const [headlineLead, headlineAccent] = brand.tagline.split("，")

  return (
    <main id="top" className="relative isolate overflow-hidden">
      {/* ---------------- 背景层次 ---------------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* 电路网格 */}
        <div className="absolute inset-0 bg-circuit animate-grid-drift opacity-60" />
        {/* 点阵 */}
        <div className="absolute inset-0 bg-dotfield opacity-20" />
        {/* 顶部青色主辉光 */}
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        {/* 底部紫色辉光（向上渐隐） */}
        <div className="absolute bottom-0 left-1/2 h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-violet-500/[0.07] to-transparent" />
      </div>

      {/* 顶部高亮分隔线 */}
      <div aria-hidden className="hairline absolute inset-x-0 top-0 z-10" />

      {/* ---------------- 首屏主体 ---------------- */}
      <section aria-labelledby="hero-heading" className="shell relative pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-8">
          {/* 左侧文案 */}
          <div className="animate-fade-up">
            <p className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-glow" />
              AI Silicon Foundry · 2026
            </p>

            <h1
              id="hero-heading"
              className="mt-6 text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {headlineLead}，
              <br />
              <span className="text-gradient">{headlineAccent}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[15px]">
              {brand.desc}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#architecture" className="btn-glow group">
                了解我们的架构
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#ecosystem" className="btn-ghost group">
                <FileText className="h-4 w-4 transition-colors group-hover:text-cyan-400" />
                下载技术白皮书
              </a>
            </div>

            <div className="mt-8 flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
              <span className="h-2 w-2 shrink-0 animate-pulse-glow rounded-full bg-mint-400 shadow-glow" />
              <span>已服务 300+ 量产客户 · 覆盖 6 大场景 · 12nm 平台研发中</span>
            </div>
          </div>

          {/* 右侧主视觉 */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-cyan-500/10 blur-[90px]" />
            <ChipIllustration className="mx-auto w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[560px]" />
          </div>
        </div>
      </section>

      {/* ---------------- 底部数据条 ---------------- */}
      <section aria-labelledby="hero-stats-heading" className="shell relative mt-16 sm:mt-20 lg:mt-24">
        <div className="hairline mb-9" />
        <h2 id="hero-stats-heading" className="sr-only">
          核心性能指标
        </h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4">
          {heroStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 90}>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <Counter
                    value={stat.value}
                    className="text-gradient inline-block text-3xl font-semibold tabular-nums tracking-tight sm:text-[34px]"
                  />
                  <span className="font-mono text-sm font-medium text-cyan-400">{stat.unit.trim()}</span>
                </div>
                <div className="mt-2.5 text-sm font-medium text-foreground">{stat.label}</div>
                <div className="mt-1 font-mono text-[11px] leading-relaxed text-muted-foreground">
                  {stat.desc}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
