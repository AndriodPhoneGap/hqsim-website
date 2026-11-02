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
  l5: "┌───┐\n│ ✓ │\n└───┘",
  l4: "┌─┐┌─┐\n└─┘└─┘",
  l3: "╱│╲│╱\n │ │ │",
  l2: "┌┐┌┐┌┐\n└┘└┘└┘",
  l1: "╔═════╗\n║ ▣ ▣ ║\n╚═════╝",
}

/** 探针卡与测试座剖面示意图：探针 → PAD → 芯片 die → 测试座 → PCB */
function ProbeCrossSection() {
  // 探针阵列：12 根，针尖向下接触芯片 PAD
  const probes = Array.from({ length: 12 }, (_, i) => {
    const col = i % 6
    const row = Math.floor(i / 6)
    return { x: 108 + col * 26, y: 96 + row * 26 }
  })

  // 测试座焊球阵列
  const sockets = Array.from({ length: 14 }, (_, i) => (
    <circle key={i} cx={62 + i * 18} cy="288" r="4" />
  ))

  // PCB 走线焊盘
  const pads = Array.from({ length: 20 }, (_, i) => (
    <rect key={i} x={44 + i * 14} y="330" width="7" height="7" rx="1.5" />
  ))

  return (
    <svg
      viewBox="0 0 360 410"
      className="h-auto w-full"
      role="img"
      aria-labelledby="hqsim-probe-diagram-title"
    >
      <title id="hqsim-probe-diagram-title">
        HQSIM 探针卡与测试座剖面示意图，包含探针针体、芯片 PAD、探针卡 PCB、测试座与夹具
      </title>

      <defs>
        <filter id="hqsim-svg-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 标题 */}
      <text x="20" y="22" className="font-mono" fontSize="9" fill="#8ff8dc" fillOpacity="0.6">
        HQSIM / PROBE CARD SECTION
      </text>

      {/* 探针卡 PCB（顶板） */}
      <rect x="48" y="40" width="264" height="24" rx="4" fill="#0e1528" stroke="#1c2745" />
      <text x="180" y="55.5" textAnchor="middle" className="font-mono" fontSize="8" fill="#8ff8dc" fillOpacity="0.5">
        PROBE CARD PCB
      </text>

      {/* 探针针体：悬臂结构，针尖向下 */}
      <g>
        {probes.map((pr, i) => (
          <g key={i}>
            {/* 针身 */}
            <rect
              x={pr.x}
              y={pr.y}
              width="10"
              height="22"
              rx="2"
              fill="#0a0f1e"
              stroke="#40c29e"
              strokeOpacity="0.85"
              strokeWidth="1"
            />
            {/* 刀锋型针尖 */}
            <path
              d={`M${pr.x + 5} ${pr.y + 22}v9`}
              stroke="#8ff8dc"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* 接触点 */}
            <circle cx={pr.x + 5} cy={pr.y + 33} r="1.8" fill="#8ff8dc" />
          </g>
        ))}
      </g>
      <text x="252" y="76" className="font-mono" fontSize="7.5" fill="#8ff8dc" fillOpacity="0.7">
        BLADE
      </text>
      <text x="252" y="86" className="font-mono" fontSize="7.5" fill="#8ff8dc" fillOpacity="0.7">
        PROBE
      </text>

      {/* 芯片 die */}
      <rect
        x="96"
        y="160"
        width="168"
        height="44"
        rx="3"
        fill="#0e1528"
        stroke="#8b5cf6"
        strokeWidth="1.2"
        filter="url(#hqsim-svg-glow)"
      />
      {/* die 上的 PAD 焊盘 */}
      <g fill="#8b5cf6" fillOpacity="0.5" stroke="#a78bfa" strokeOpacity="0.6" strokeWidth="0.7">
        {probes.map((pr, i) => (
          <rect key={i} x={pr.x} y="162" width="10" height="8" rx="1" />
        ))}
      </g>
      <text x="180" y="196" textAnchor="middle" className="font-mono" fontSize="7.5" fill="#a78bfa" fillOpacity="0.9">
        DIE · PAD ARRAY
      </text>

      {/* PAD 到探针的接触线 */}
      <path
        d="M113 160v-22M139 160v-38M165 160v-22M191 160v-38M217 160v-22M243 160v-38"
        stroke="#40c29e"
        strokeOpacity="0.8"
        strokeDasharray="3 5"
        strokeLinecap="round"
        className="animate-trace-flow"
      />

      {/* 测试座（socket 主体） */}
      <rect x="36" y="212" width="288" height="46" rx="4" fill="#101a33" stroke="#40c29e" strokeOpacity="0.75" />
      <text x="180" y="238" textAnchor="middle" className="font-mono" fontSize="8" fill="#40c29e" fillOpacity="0.9">
        TEST SOCKET
      </text>

      {/* 测试座焊球 */}
      <g fill="#8ff8dc" fillOpacity="0.45" stroke="#8ff8dc" strokeOpacity="0.55" strokeWidth="0.8">
        {sockets}
      </g>

      {/* 夹具 / 载板 */}
      <rect x="24" y="268" width="312" height="26" rx="3" fill="#0e1528" stroke="#1c2745" />
      <text x="180" y="285" textAnchor="middle" className="font-mono" fontSize="8" fill="#8ff8dc" fillOpacity="0.5">
        FIXTURE / LOAD BOARD
      </text>

      {/* 走线焊盘层 */}
      <g fill="#40c29e" fillOpacity="0.3" stroke="#40c29e" strokeOpacity="0.45" strokeWidth="0.7">
        {pads}
      </g>
      <text x="180" y="322" textAnchor="middle" className="font-mono" fontSize="7.5" fill="#8ff8dc" fillOpacity="0.45">
        PCB LAND PATTERN
      </text>

      {/* 图例 */}
      <rect x="24" y="338" width="10" height="10" rx="2" fill="#8b5cf6" fillOpacity="0.6" stroke="#a78bfa" strokeOpacity="0.6" />
      <text x="42" y="346.5" className="font-mono" fontSize="8" fill="#8ff8dc" fillOpacity="0.6">
        DIE / PAD
      </text>
      <rect x="200" y="338" width="10" height="10" rx="2" fill="#7df5c8" fillOpacity="0.7" />
      <text x="218" y="346.5" className="font-mono" fontSize="8" fill="#8ff8dc" fillOpacity="0.6">
        PROBE
      </text>
      <rect x="24" y="360" width="10" height="10" rx="2" fill="#40c29e" fillOpacity="0.7" />
      <text x="42" y="368.5" className="font-mono" fontSize="8" fill="#8ff8dc" fillOpacity="0.6">
        SOCKET
      </text>
      <rect x="200" y="360" width="10" height="10" rx="2" fill="#0e1528" stroke="#8ff8dc" strokeOpacity="0.6" />
      <text x="218" y="368.5" className="font-mono" fontSize="8" fill="#8ff8dc" fillOpacity="0.6">
        LOAD BOARD
      </text>

      <text x="24" y="396" className="font-mono" fontSize="7.5" fill="#8ff8dc" fillOpacity="0.32">
        FIG.01 / PROBE CARD &amp; SOCKET CROSS-SECTION
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
          eyebrow="PROBE CARD WORKFLOW"
          title={
            <>
              五环节贯通的
              <span className="text-gradient">定制交付链路</span>
            </>
          }
          desc="从客户 PAD 图纸审查与针位规划，到机械布局、针体材料工艺、探针卡与测试座组装，再到可靠性验证与批量交付——五个环节纵向贯通，同一支团队贯穿从图纸到量产的完整流程。"
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
              <ProbeCrossSection />

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-4">
                {[
                  { k: "制造精度", v: "±5 μm" },
                  { k: "最小 Pitch", v: "80 μm" },
                  { k: "接触力", v: "10–80 g" },
                  { k: "温度范围", v: "-40~200 ℃" },
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
