import { Reveal } from "@/components/common/Reveal"
import { SectionHeading } from "@/components/common/SectionHeading"
import { applications } from "@/data/site"
import {
  Bot,
  Car,
  Cloud,
  Factory,
  Satellite,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = {
  Car,
  Bot,
  Factory,
  Cloud,
  ShieldCheck,
  Satellite,
}

export default function Applications() {
  return (
    <section id="application" className="relative py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/25 to-transparent"
        aria-hidden="true"
      />
      <div className="shell">
        <SectionHeading
          eyebrow="APPLICATION SCENARIOS"
          title="算力不止于机房，而是走进每一条产线"
          desc="从车、路、厂到云，XZE 芯片以场景为中心重新定义推理的成本与边界。"
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Bot
            return (
              <Reveal key={item.title} delay={i * 70}>
                <article className="group relative h-full overflow-hidden rounded-xl border border-white/[0.07] bg-ink-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-glow">
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet-500/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0"
                    aria-hidden="true"
                  />
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-violet-500/25 bg-violet-500/10 text-violet-400 transition-all duration-300 group-hover:border-violet-400/50 group-hover:shadow-glow">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground opacity-80">
                    {item.desc}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.07] px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse-glow" />
                    <span className="font-mono text-xs text-cyan-400">{item.metric}</span>
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
