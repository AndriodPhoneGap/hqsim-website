import { ArrowRight, CalendarDays } from "lucide-react"
import { news } from "@/data/site"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/common/Reveal"
import { Section, SectionHeading } from "@/components/common/SectionHeading"

/**
 * 新闻动态：左右分栏布局
 * 左侧为标题区 + 查看全部按钮，右侧为新闻列表（整行可点击）。
 */

export default function News() {
  return (
    <Section id="news" className="relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 bg-circuit opacity-30" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-cyan-500/[0.08] blur-[120px]" />

      <div className="relative grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* ---------- 左栏：标题 + 按钮 ---------- */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="NEWSROOM"
            title={
              <>
                最新<span className="text-gradient">动态</span>
              </>
            }
            desc="产品发布、技术突破与生态进展 —— 追踪芯智纪元的每一次向前。"
          />

          <Reveal delay={120} className="mt-8">
            <a
              href="#news"
              className="btn-ghost group focus-visible:ring-cyan-500/50"
              aria-label="查看全部新闻动态"
            >
              查看全部
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* ---------- 右栏：新闻列表 ---------- */}
        <div className="flex flex-col">
          {news.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <a
                href="#news"
                className={cn(
                  "group block border-b border-white/10 py-7 transition-colors duration-300",
                  "hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40",
                  i === 0 && "pt-0",
                  i === news.length - 1 && "border-b-0",
                )}
              >
                {/* 头部：日期 + 分类 */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="tnum inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-cyan-400">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {item.date}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-300 group-hover:border-cyan-500/30 group-hover:text-cyan-400">
                    {item.category}
                  </span>
                </div>

                {/* 标题 */}
                <h3 className="mt-3 flex items-start gap-3 text-[17px] font-medium leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-cyan-400 sm:text-lg">
                  <span className="flex-1">{item.title}</span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 translate-x-0 text-cyan-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </h3>

                {/* 描述 */}
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
