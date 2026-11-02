import { Braces, CircuitBoard, Cpu, MemoryStick, type LucideIcon } from "lucide-react"
import { Reveal } from "@/components/common/Reveal"
import { SectionHeading } from "@/components/common/SectionHeading"
import { pillars } from "@/data/site"
import { cn } from "@/lib/utils"

/** 图标名 → lucide 组件映射表，未命中的名字回退到 Cpu */
const ICON_MAP: Record<string, LucideIcon> = {
  Cpu,
  MemoryStick,
  Braces,
  CircuitBoard,
}

/** 数值配色：青 / 紫交替，强化节奏感 */
const VALUE_TONE = ["text-cyan-400", "text-violet-400", "text-cyan-400"]

export default function Capability() {
  return (
    <section id="capability" className="relative py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="CORE CAPABILITIES"
          title={
            <>
              从工艺到算力栈的
              <span className="text-gradient">全栈自研</span>
            </>
          }
          desc="以先进封装为起点、以编译器与指令集为枢纽，芯智纪元在硅工艺、芯粒设计、工具链与系统集成四个维度持续投入，为客户交付从 IP 到整机的完整链路。"
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:gap-6 lg:grid-cols-2">
          {pillars.map((pillar, i) => {
            const Icon = ICON_MAP[pillar.icon] ?? Cpu

            return (
              <Reveal key={pillar.id} delay={i * 80} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-ink-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-glow sm:p-7">
                  {/* hover 时浮现的柔光 */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/10 text-cyan-400 transition-all duration-300 group-hover:border-cyan-500/50 group-hover:shadow-glow">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-500/70">
                        {pillar.en}
                      </p>
                    </div>
                  </div>

                  <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                    {pillar.desc}
                  </p>

                  <div className="relative mt-auto pt-6">
                    <dl className="grid grid-cols-3 gap-3 border-t border-white/[0.07] pt-4">
                      {pillar.metrics.map((metric, mi) => (
                        <div key={metric.k} className="min-w-0">
                          <dt className="truncate text-[11px] leading-tight text-muted-foreground opacity-80">
                            {metric.k}
                          </dt>
                          <dd
                            className={cn(
                              "mt-1.5 font-mono text-sm font-medium tnum",
                              VALUE_TONE[mi % VALUE_TONE.length],
                            )}
                          >
                            {metric.v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
