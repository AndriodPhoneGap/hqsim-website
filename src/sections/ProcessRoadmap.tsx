import { Layers, Rocket, Cpu, Factory, GitBranch } from "lucide-react"
import { processRoadmap } from "@/data/site"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/common/Reveal"
import { Section, SectionHeading } from "@/components/common/SectionHeading"

/**
 * 工艺路线图时间轴
 * - 桌面端：水平发光渐变线 + 5 列节点，圆点与线条严格对齐（圆点单独成行，不参与位移动画）
 * - 移动端：左侧竖线 + 圆点的竖向时间轴
 */

type StatusMeta = {
  label: string
  badge: string
  dot: string
}

/** 状态视觉映射：量产=cyan / 流片=violet / 规划=muted / 预研=灰 */
const STATUS_META: Record<string, StatusMeta | undefined> = {
  量产: {
    label: "MASS PRODUCTION",
    badge: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    dot: "bg-cyan-400",
  },
  流片: {
    label: "TAPEOUT",
    badge: "border-violet-500/30 bg-violet-500/10 text-violet-400",
    dot: "bg-violet-400",
  },
  规划: {
    label: "PLANNED",
    badge: "border-white/10 bg-white/[0.04] text-muted-foreground",
    dot: "bg-white/45",
  },
  预研: {
    label: "PRE-RESEARCH",
    badge: "border-white/10 bg-white/[0.03] text-muted-foreground/80",
    dot: "bg-white/25",
  },
}

const FALLBACK_META: StatusMeta = {
  label: "ROADMAP",
  badge: "border-white/10 bg-white/[0.04] text-muted-foreground",
  dot: "bg-white/40",
}

function getStatusMeta(status: string): StatusMeta {
  return STATUS_META[status] ?? FALLBACK_META
}

/** 节点圆点：外圈发光 + ring 光晕 */
function TimelineDot({ status }: { status: string }) {
  const meta = getStatusMeta(status)
  return (
    <span className="relative z-10 flex h-3 w-3 items-center justify-center">
      <span
        className={cn(
          "absolute inset-0 rounded-full opacity-70 blur-[7px] animate-pulse-glow",
          meta.dot,
        )}
      />
      <span
        className={cn(
          "relative h-2.5 w-2.5 rounded-full ring-4 ring-cyan-500/10",
          meta.dot,
        )}
      />
    </span>
  )
}

/** 节点标题区：年份 + 工艺节点 + 状态徽章 */
function NodeTitle({
  year,
  node,
  status,
  align = "center",
}: {
  year: string
  node: string
  status: string
  align?: "center" | "left"
}) {
  const meta = getStatusMeta(status)
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-2",
        align === "center" ? "justify-center" : "justify-start",
      )}
    >
      <span className="tnum font-mono text-3xl font-semibold leading-none tracking-tight text-foreground sm:text-4xl">
        {year}
      </span>
      <span className="font-mono text-sm uppercase tracking-[0.18em] text-cyan-400">
        {node}
      </span>
      <span
        className={cn(
          "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em]",
          meta.badge,
        )}
        title={meta.label}
      >
        {status}
      </span>
    </div>
  )
}

/** 节点正文：描述 + 特性胶囊 */
function NodeBody({ desc, features }: { desc: string; features: string[] }) {
  return (
    <div className="mt-4 space-y-4">
      <p className="text-[13px] leading-relaxed text-muted-foreground">{desc}</p>
      <ul className="flex flex-wrap gap-2">
        {features.map((f) => (
          <li
            key={f}
            className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ProcessRoadmap() {
  const massCount = processRoadmap.filter((i) => i.status === "量产").length
  const firstNode = processRoadmap[0]
  const lastNode = processRoadmap[processRoadmap.length - 1]

  return (
    <Section id="process" className="relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 bg-circuit opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[620px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative">
        <SectionHeading
          eyebrow="PROCESS ROADMAP"
          title={
            <>
              从 <span className="text-gradient tnum">42nm</span> 到{" "}
              <span className="text-gradient tnum">5nm</span> 的自主工艺进阶
            </>
          }
          desc="以成熟制程保障规模化出货，以 FinFET 与混合键合承接先进算力需求，工艺、封装与芯粒互联同步演进。"
        />

        {/* ---------- 桌面端：水平时间轴 ---------- */}
        <div className="relative mt-16 hidden lg:block">
          {/* 线与圆点同处一个 relative 容器，随 reveal 一起位移，始终保持对齐 */}
          <Reveal className="relative">
            {/* 贯穿的发光渐变线：圆点行高 64px，圆点直径 12px → 圆心位于 58px */}
            <div className="pointer-events-none absolute inset-x-0 top-[57px] h-[2px] bg-gradient-to-r from-cyan-500 via-violet-500 to-mint-500 opacity-80" />
            <div className="pointer-events-none absolute inset-x-0 top-[57px] h-[2px] bg-gradient-to-r from-cyan-500 via-violet-500 to-mint-500 opacity-50 blur-md" />

            <div className="grid grid-cols-5 gap-5">
              {processRoadmap.map((item) => (
                <div key={item.node} className="flex h-16 items-end justify-center">
                  <TimelineDot status={item.status} />
                </div>
              ))}
            </div>
          </Reveal>

          {/* 内容行：与圆点行使用相同栅格，列宽一致 */}
          <div className="relative mt-6 grid grid-cols-5 gap-5">
            {processRoadmap.map((item, i) => (
              <Reveal key={item.node} delay={i * 90} className="flex flex-col">
                <div className="flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-cyan-500/25 hover:bg-white/[0.04]">
                  <NodeTitle year={item.year} node={item.node} status={item.status} />
                  <NodeBody desc={item.desc} features={item.features} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------- 移动端：竖向时间轴 ---------- */}
        <div className="relative mt-12 lg:hidden">
          <div className="pointer-events-none absolute bottom-2 left-[7.5px] top-2 w-px bg-gradient-to-b from-cyan-500 via-violet-500 to-mint-500/40" />

          <ol className="space-y-8">
            {processRoadmap.map((item, i) => (
              <Reveal as="li" key={item.node} delay={i * 80} className="relative pl-9">
                <span className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center">
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full opacity-60 blur-md",
                      getStatusMeta(item.status).dot,
                    )}
                  />
                  <span
                    className={cn(
                      "relative h-2.5 w-2.5 rounded-full ring-4 ring-cyan-500/10",
                      getStatusMeta(item.status).dot,
                    )}
                  />
                </span>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <NodeTitle
                    year={item.year}
                    node={item.node}
                    status={item.status}
                    align="left"
                  />
                  <NodeBody desc={item.desc} features={item.features} />
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* ---------- 底部小结对比条 ---------- */}
        <Reveal delay={120} className="mt-14">
          <div className="glass rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2 text-cyan-400">
              <Layers className="h-4 w-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]">
                ROADMAP SNAPSHOT
              </span>
            </div>

            <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="border-l border-white/10 pl-4">
                <dt className="text-xs text-muted-foreground">工艺跨度</dt>
                <dd className="tnum mt-1.5 font-mono text-lg text-foreground sm:text-xl">
                  {firstNode.node} → {lastNode.node}
                </dd>
              </div>
              <div className="border-l border-white/10 pl-4">
                <dt className="text-xs text-muted-foreground">已量产节点</dt>
                <dd className="tnum mt-1.5 font-mono text-lg text-cyan-400 sm:text-xl">
                  {massCount} / {processRoadmap.length}
                </dd>
              </div>
              <div className="border-l border-white/10 pl-4">
                <dt className="text-xs text-muted-foreground">封装演进</dt>
                <dd className="tnum mt-1.5 font-mono text-lg text-foreground sm:text-xl">
                  2.5D → 3D
                </dd>
              </div>
              <div className="border-l border-white/10 pl-4">
                <dt className="text-xs text-muted-foreground">芯粒互联</dt>
                <dd className="tnum mt-1.5 font-mono text-lg text-foreground sm:text-xl">
                  UCIe 标准
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.07] pt-4 text-[12px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Rocket className="h-3.5 w-3.5 text-cyan-400" />
                2026 年 16nm FinFET 流片验证
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-violet-400" />
                2027 年存算一体规模商用
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Factory className="h-3.5 w-3.5 text-mint-400" />
                全流程自主可控
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GitBranch className="h-3.5 w-3.5 text-cyan-400" />
                工艺与封装协同演进
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
