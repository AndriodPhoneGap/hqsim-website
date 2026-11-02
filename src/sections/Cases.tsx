import { Target, Lightbulb, Quote } from "lucide-react"
import { cases } from "@/data/site"
import { Reveal } from "@/components/common/Reveal"
import { Section, SectionHeading } from "@/components/common/SectionHeading"

/**
 * 客户案例：3 个横向卡片
 * 每张卡片包含行业标签、标题、挑战 / 方案小节与底部指标条。
 */

export default function Cases() {
  return (
    <Section id="cases" className="relative overflow-hidden">
      {/* 淡淡的点阵背景层 */}
      <div className="pointer-events-none absolute inset-0 bg-dotfield opacity-[0.35]" />
      <div className="pointer-events-none absolute left-1/4 top-10 h-[340px] w-[340px] rounded-full bg-cyan-500/[0.08] blur-[120px]" />

      <div className="relative">
        <SectionHeading
          eyebrow="CUSTOMER STORIES"
          title={
            <>
              让算力真正落到<span className="text-gradient">产线上</span>
            </>
          }
          desc="从车端感知到千卡智算集群，真实场景的落地数据是我们最好的说明书。"
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {cases.map((item, i) => (
            <Reveal key={item.title} delay={i * 100} className="flex flex-col">
              <article className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.035] hover:shadow-card sm:p-7">
                {/* 右上角装饰引号 */}
                <Quote
                  className="pointer-events-none absolute -top-2 right-4 h-16 w-16 text-white/[0.035] transition-colors duration-300 group-hover:text-cyan-500/10"
                  aria-hidden
                />

                {/* 行业标签 */}
                <span className="relative inline-flex w-fit items-center rounded-full border border-cyan-500/25 bg-cyan-500/[0.08] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-400">
                  {item.industry}
                </span>

                {/* 案例标题 */}
                <h3 className="relative mt-4 text-[19px] font-semibold leading-snug tracking-tight text-foreground">
                  {item.title}
                </h3>

                {/* 挑战 */}
                <div className="relative mt-6 border-l border-white/10 pl-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-3.5 w-3.5 text-violet-400" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-violet-400/90">
                      Challenge
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    {item.challenge}
                  </p>
                </div>

                {/* 方案 */}
                <div className="relative mt-5 border-l border-cyan-500/30 pl-4">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-400/90">
                      Solution
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    {item.solution}
                  </p>
                </div>

                {/* 底部结果指标条 */}
                <dl className="relative mt-auto grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                  {item.results.map((r) => (
                    <div key={r.k} className="min-w-0">
                      <dt className="truncate text-[11px] text-muted-foreground">
                        {r.k}
                      </dt>
                      <dd className="tnum mt-1.5 font-mono text-xl font-semibold text-cyan-400">
                        {r.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
