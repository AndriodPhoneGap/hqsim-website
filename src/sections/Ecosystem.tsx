import { Users, Wrench, Cpu, Server, Boxes, SquareTerminal, type LucideIcon } from "lucide-react"
import { ecosystem } from "@/data/site"
import { Reveal } from "@/components/common/Reveal"
import { Section, SectionHeading } from "@/components/common/SectionHeading"

/**
 * 生态合作：6 类角色卡片
 * 每个角色附带一行英文标签，体现产业链位置。
 */

/** 角色 → 英文标签映射 */
const ROLE_EN: Record<string, string | undefined> = {
  晶圆制造: "FOUNDRY",
  先进封装: "PACKAGING",
  "EDA 工具": "EDA",
  整机与集成: "OEM",
  行业方案商: "SI",
  基础软件: "OS",
}

/** 角色 → 图标映射（按索引循环兜底） */
const ROLE_ICONS: LucideIcon[] = [Cpu, Boxes, Wrench, Server, Users, SquareTerminal]

export default function Ecosystem() {
  return (
    <Section id="ecosystem" className="relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 bg-dotfield opacity-[0.35]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative">
        <SectionHeading
          eyebrow="ECOSYSTEM"
          title={
            <>
              共建<span className="text-gradient">自主可控</span>的半导体生态
            </>
          }
          desc="从晶圆制造到基础软件，与产业链上下游伙伴建立联合产能与联合方案，让国产算力底座在真实场景中跑通。"
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ecosystem.map((item, i) => {
            const Icon = ROLE_ICONS[i % ROLE_ICONS.length]
            return (
              <Reveal key={item.role} delay={i * 80} className="flex flex-col">
                <article className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/[0.04] hover:shadow-glow">
                  {/* hover 时从左上角扫过的微光 */}
                  <span className="pointer-events-none absolute -top-16 -left-16 h-32 w-32 rounded-full bg-cyan-500/0 blur-2xl transition-colors duration-500 group-hover:bg-cyan-500/20" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {item.role}
                      </h3>
                      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-500/80">
                        {ROLE_EN[item.role] ?? "PARTNER"}
                      </p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-cyan-400 transition-colors duration-300 group-hover:border-cyan-500/40">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>

                  {/* 伙伴胶囊标签 */}
                  <ul className="relative mt-5 flex flex-wrap gap-2">
                    {item.partners.map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[12px] text-muted-foreground transition-colors duration-300 group-hover:border-white/15 group-hover:text-foreground/90"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>

                  <p className="relative mt-5 text-[13px] leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* 底部合作说明 */}
        <Reveal delay={120} className="mt-12">
          <div className="glass flex flex-col items-center gap-4 rounded-2xl px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-500/80">
                PARTNER PROGRAM
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                想成为生态伙伴？提交技术方向与量产计划，我们将在 5 个工作日内回复。
              </p>
            </div>
            <a
              href="#contact"
              className="btn-ghost shrink-0 whitespace-nowrap hover:shadow-glow"
            >
              申请加入生态
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
