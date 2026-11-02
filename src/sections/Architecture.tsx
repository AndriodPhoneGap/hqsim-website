import { useRef, useState } from "react"
import { Reveal } from "@/components/common/Reveal"
import { SectionHeading } from "@/components/common/SectionHeading"
import { architectureLayers } from "@/data/site"
import { cn } from "@/lib/utils"

type Accent = "violet" | "cyan" | "mint"

/** 收敛数据源中的 accent 字段，保证类型安全 */
function resolveAccent(accent: string): Accent {
  if (accent === "violet" || accent === "cyan" || accent === "mint") return accent
  return "cyan"
}

/** 各层强调色：编号块 / 标签 / 边框 / 辉光 */
const ACCENT_STYLES: Record<
  Accent,
  { text: string; badge: string; chip: string; hoverBorder: string; glow: string }
> = {
  violet: {
    text: "text-violet-400",
    badge: "border-violet-500/40 bg-violet-500/10 text-violet-400",
    chip: "border-violet-500/25 bg-violet-500/[0.07] text-violet-400",
    hoverBorder: "border-violet-500/50",
    glow: "shadow-[0_0_70px_-20px_rgba(139,92,246,0.85)]",
  },
  cyan: {
    text: "text-cyan-400",
    badge: "border-cyan-500/40 bg-cyan-500/10 text-cyan-400",
    chip: "border-cyan-500/25 bg-cyan-500/[0.07] text-cyan-400",
    hoverBorder: "border-cyan-500/50",
    glow: "shadow-[0_0_70px_-20px_rgba(34,211,238,0.85)]",
  },
  mint: {
    text: "text-mint-400",
    badge: "border-mint-500/40 bg-mint-500/10 text-mint-400",
    chip: "border-mint-500/25 bg-mint-500/[0.07] text-mint-400",
    hoverBorder: "border-mint-500/50",
    glow: "shadow-[0_0_70px_-20px_rgba(45,212,191,0.85)]",
  },
}

/** 每层右侧的装饰性等宽示意图 */
const LAYER_ART: Record<string, string> = {
  l5: "┌─────┐\n│ + + │\n└─────┘",
  l4: "┌───┐\n│ → │\n└───┘",
  l3: "├─┤\n│ │\n└─┘",
  l2: "┌┐┌┐┌┐\n└┘└┘└┘",
  l1: "═══════\n┌─────┐\n└─────┘",
}

/** 芯片剖面示意图：die → 中介层 → HBM → 封装基板 */
function ChipCrossSection() {
  const tiles = Array.from({ length: 12 }, (_, i) => {
    const col = i % 4
    const row = Math.floor(i / 4)
    return <rect key={i} x={136 + col * 24} y={94 + row * 21} width="16" height="14" rx="1.5" />
  })

  const vias = Array.from({ length: 16 }, (_, i) => (
    <circle key={i} cx={60 + i * 16} cy="192" r="1.8" />
  ))

  const bga = Array.from({ length: 12 }, (_, i) => (
    <circle key={i} cx={60 + i * 22} cy="240" r="4" />
  ))

  return (
    <svg
      viewBox="0 0 360 410"
      className="h-auto w-full"
      role="img"
      aria-labelledby="xze-package-diagram-title"
    >
      <title id="xze-package-diagram-title">
        XZE-N900 2.5D Chiplet 封装剖面示意图，包含 NPU die、UCIe 互联、HBM3E、中介层与封装基板
      </title>

      <defs>
        <filter id="xze-svg-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 标题 */}
      <text x="20" y="22" className="font-mono" fontSize="9" fill="#5ee9ff" fillOpacity="0.6">
        XZE-N900 / 2.5D PACKAGE
      </text>

      {/* 顶盖 */}
      <rect x="48" y="40" width="264" height="24" rx="4" fill="#0e1528" stroke="#1c2745" />
      <text x="180" y="55.5" textAnchor="middle" className="font-mono" fontSize="8" fill="#5ee9ff" fillOpacity="0.45">
        LID / IHS
      </text>

      {/* HBM3E 左侧 */}
      <rect x="60" y="86" width="52" height="68" rx="2" fill="#0a0f1e" stroke="#5eead4" />
      <path d="M60 102h52M60 118h52M60 134h52" stroke="#5eead4" strokeOpacity="0.3" />
      <text x="86" y="80" textAnchor="middle" className="font-mono" fontSize="7.5" fill="#5eead4" fillOpacity="0.85">
        HBM3E
      </text>

      {/* HBM3E 右侧 */}
      <rect x="248" y="86" width="52" height="68" rx="2" fill="#0a0f1e" stroke="#5eead4" />
      <path d="M248 102h52M248 118h52M248 134h52" stroke="#5eead4" strokeOpacity="0.3" />
      <text x="274" y="80" textAnchor="middle" className="font-mono" fontSize="7.5" fill="#5eead4" fillOpacity="0.85">
        HBM3E
      </text>

      {/* UCIe 互联 */}
      <path
        d="M112 100h12M236 100h12"
        stroke="#22d3ee"
        strokeOpacity="0.85"
        strokeDasharray="4 6"
        strokeLinecap="round"
        className="animate-trace-flow"
      />
      <text x="110" y="94" textAnchor="end" className="font-mono" fontSize="7" fill="#22d3ee" fillOpacity="0.7">
        UCIe
      </text>
      <text x="250" y="94" className="font-mono" fontSize="7" fill="#22d3ee" fillOpacity="0.7">
        UCIe
      </text>

      {/* NPU die */}
      <rect
        x="124"
        y="78"
        width="112"
        height="84"
        rx="3"
        fill="#0e1528"
        stroke="#8b5cf6"
        strokeWidth="1.2"
        filter="url(#xze-svg-glow)"
      />
      <g fill="#8b5cf6" fillOpacity="0.4" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="0.8">
        {tiles}
      </g>
      <text x="180" y="70" textAnchor="middle" className="font-mono" fontSize="8" fill="#a78bfa" fillOpacity="0.9">
        NPU DIE · 12nm
      </text>

      {/* TSV 硅通孔 */}
      <path
        d="M90 162v20M116 162v20M142 162v20M168 162v20M194 162v20M220 162v20M246 162v20M272 162v20"
        stroke="#5ee9ff"
        strokeOpacity="0.3"
      />

      {/* 中介层 */}
      <rect x="48" y="182" width="264" height="34" rx="2" fill="#101a33" stroke="#22d3ee" strokeOpacity="0.7" />
      <g fill="#5ee9ff" fillOpacity="0.45">
        {vias}
      </g>
      <text x="180" y="208" textAnchor="middle" className="font-mono" fontSize="8" fill="#22d3ee" fillOpacity="0.85">
        INTERPOSER · 2.5D
      </text>

      {/* 封装基板 */}
      <rect x="36" y="222" width="288" height="58" rx="4" fill="#0a0f1e" stroke="#1c2745" />
      <g fill="#22d3ee" fillOpacity="0.25" stroke="#22d3ee" strokeOpacity="0.45" strokeWidth="0.8">
        {bga}
      </g>
      <text x="180" y="268" textAnchor="middle" className="font-mono" fontSize="8" fill="#5ee9ff" fillOpacity="0.55">
        PKG SUBSTRATE
      </text>

      {/* 主板 */}
      <rect x="24" y="288" width="312" height="22" rx="3" fill="#0e1528" stroke="#1c2745" />
      <text x="180" y="303" textAnchor="middle" className="font-mono" fontSize="8" fill="#5ee9ff" fillOpacity="0.45">
        MAINBOARD
      </text>

      {/* 图例 */}
      <rect x="24" y="326" width="10" height="10" rx="2" fill="#8b5cf6" fillOpacity="0.6" stroke="#a78bfa" strokeOpacity="0.6" />
      <text x="42" y="334.5" className="font-mono" fontSize="8" fill="#5ee9ff" fillOpacity="0.6">
        NPU DIE
      </text>
      <rect x="200" y="326" width="10" height="10" rx="2" fill="#5eead4" fillOpacity="0.7" />
      <text x="218" y="334.5" className="font-mono" fontSize="8" fill="#5ee9ff" fillOpacity="0.6">
        HBM3E
      </text>
      <rect x="24" y="348" width="10" height="10" rx="2" fill="#22d3ee" fillOpacity="0.7" />
      <text x="42" y="356.5" className="font-mono" fontSize="8" fill="#5ee9ff" fillOpacity="0.6">
        INTERPOSER
      </text>
      <rect x="200" y="348" width="10" height="10" rx="2" fill="#0e1528" stroke="#5ee9ff" strokeOpacity="0.6" />
      <text x="218" y="356.5" className="font-mono" fontSize="8" fill="#5ee9ff" fillOpacity="0.6">
        PKG SUBSTRATE
      </text>

      <text x="24" y="392" className="font-mono" fontSize="7.5" fill="#5ee9ff" fillOpacity="0.32">
        FIG.01 / CHIplet PACKAGE CROSS-SECTION
      </text>
    </svg>
  )
}

export default function Architecture() {
  // 当前 hover（高亮）的层级索引
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  // 连接线上亮点所处的纵向位置
  const [dotTop, setDotTop] = useState<number | null>(null)

  const stackRef = useRef<HTMLDivElement | null>(null)
  const layerRefs = useRef<Array<HTMLDivElement | null>>([])

  /** 进入某层时，测量其中心位置供连接线亮点定位 */
  const handleEnter = (index: number) => {
    const stack = stackRef.current
    const el = layerRefs.current[index]
    if (!stack || !el) return
    setActiveIndex(index)
    setDotTop(el.offsetTop + el.offsetHeight / 2)
  }

  const handleLeave = () => {
    setActiveIndex(null)
    setDotTop(null)
  }

  return (
    <section id="architecture" className="relative overflow-hidden py-20 sm:py-28">
      {/* 电路网格底纹 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-circuit opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-cyan-500/[0.06] blur-[120px]"
      />

      <style>{`
        @keyframes xze-rail-flow {
          0% { top: -8%; opacity: 0; }
          14% { opacity: 0.95; }
          86% { opacity: 0.95; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      <div className="shell relative">
        <SectionHeading
          eyebrow="FULL-STACK ARCHITECTURE"
          title={
            <>
              五层一体的
              <span className="text-gradient">芯片软硬件栈</span>
            </>
          }
          desc="从 12nm 硅工艺与混合键合封装，到 XISA 指令集、XZE 编译器，再到上层模型与算法资产——五个层级纵向贯通，同一支团队贯穿从硅到应用的完整链路。"
          align="center"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[104px_minmax(0,1fr)_336px] xl:gap-8">
          {/* 左侧垂直层级标签（移动端隐藏） */}
          <nav aria-label="架构层级导航" className="hidden xl:block">
            <ol className="sticky top-28 space-y-2 border-l border-white/[0.08] pl-3">
              {architectureLayers.map((layer, i) => {
                const styles = ACCENT_STYLES[resolveAccent(layer.accent)]
                const isActive = activeIndex === i

                return (
                  <li key={layer.id}>
                    <a
                      href={`#architecture-${layer.id}`}
                      aria-current={isActive ? "true" : undefined}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={handleLeave}
                      onFocus={() => handleEnter(i)}
                      onBlur={handleLeave}
                      className={cn(
                        "flex items-center gap-2 rounded-md border px-2 py-1.5 font-mono text-[11px] transition-all duration-300",
                        isActive
                          ? cn(styles.badge, "shadow-glow")
                          : "border-transparent text-muted-foreground opacity-60 hover:border-white/10 hover:text-foreground hover:opacity-100",
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                      {layer.id.toUpperCase()}
                    </a>
                  </li>
                )
              })}
            </ol>
          </nav>

          {/* 中间：五层堆叠 */}
          <div ref={stackRef} className="relative ml-7 sm:ml-9">
            {/* 贯穿五层的发光连接线 */}
            <div
              aria-hidden
              className="absolute left-0 top-3 bottom-3 w-px bg-gradient-to-b from-violet-500/70 via-cyan-500/70 to-mint-500/70 shadow-[0_0_14px_rgba(34,211,238,0.55)]"
            />

            {/* 流动的亮点：hover 时沿线下滑 */}
            {activeIndex !== null ? (
              <>
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 z-10 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.9)]"
                  style={{ animation: "xze-rail-flow 3.4s linear infinite" }}
                />
                {dotTop !== null ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 z-10 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.95)] animate-pulse-glow transition-[top] duration-500 ease-out"
                    style={{ top: dotTop }}
                  />
                ) : null}
              </>
            ) : null}

            <ol className="space-y-4">
              {architectureLayers.map((layer, i) => {
                const styles = ACCENT_STYLES[resolveAccent(layer.accent)]
                const isActive = activeIndex === i

                return (
                  <Reveal as="li" key={layer.id} delay={120 + i * 90}>
                    <div
                      id={`architecture-${layer.id}`}
                      ref={(el) => {
                        layerRefs.current[i] = el
                      }}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={handleLeave}
                      className={cn(
                        "group relative flex gap-4 rounded-xl border bg-ink-900/60 p-5 transition-all duration-300 sm:gap-5 sm:p-6",
                        isActive
                          ? cn("bg-ink-850/85", styles.hoverBorder, styles.glow)
                          : "border-white/[0.07] hover:border-white/20",
                      )}
                    >
                      {/* 层级编号 */}
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg border font-mono transition-all duration-300",
                          styles.badge,
                        )}
                      >
                        <span className="text-sm font-bold leading-none tnum">
                          {layer.id.toUpperCase()}
                        </span>
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-current" aria-hidden />
                      </div>

                      {/* 层信息 */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                            {layer.name}
                          </h3>
                          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground opacity-70">
                            {layer.en}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {layer.desc}
                        </p>

                        <ul className="mt-4 flex flex-wrap gap-2">
                          {layer.items.map((item) => (
                            <li
                              key={item}
                              className={cn(
                                "rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none",
                                styles.chip,
                              )}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 装饰性等宽示意图 */}
                      <pre
                        aria-hidden
                        className={cn(
                          "hidden shrink-0 self-center font-mono text-[10px] leading-[1.6] opacity-45 lg:block",
                          styles.text,
                        )}
                      >
                        {LAYER_ART[layer.id]}
                      </pre>
                    </div>
                  </Reveal>
                )
              })}
            </ol>
          </div>

          {/* 右侧：芯片剖面示意图 */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="glass-strong relative overflow-hidden rounded-xl p-4">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
              />
              <ChipCrossSection />

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-4">
                {[
                  { k: "制程", v: "12nm" },
                  { k: "片间互联", v: "4.2 TB/s" },
                  { k: "HBM 容量", v: "192 GB" },
                  { k: "封装尺寸", v: "65×65 mm" },
                ].map((item) => (
                  <div key={item.k}>
                    <p className="text-[11px] text-muted-foreground opacity-70">{item.k}</p>
                    <p className="mt-1 font-mono text-sm text-cyan-400 tnum">{item.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
