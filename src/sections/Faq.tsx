import { CircleHelp } from "lucide-react"
import { faqs } from "@/data/site"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/common/Reveal"
import { Section, SectionHeading } from "@/components/common/SectionHeading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

/**
 * 常见问题：shadcn Accordion 手风琴（单开可折叠，默认展开第一项）
 * shadcn 默认偏浅色，这里覆盖 trigger 的 hover 背景与下划线。
 */
export default function Faq() {
  return (
    <Section id="faq" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-dotfield opacity-[0.3]" />
      <div className="pointer-events-none absolute right-0 top-10 h-[300px] w-[300px] rounded-full bg-violet-500/[0.08] blur-[120px]" />

      <div className="relative">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              常见问题<span className="text-gradient">解答</span>
            </>
          }
          desc="关于产品差异、迁移成本、国产化适配与产能保障的常见疑问，这里都有直接的回答。"
        />

        <Reveal delay={100} className="mx-auto mt-14 max-w-3xl">
          <div className="glass rounded-xl p-2">
            <Accordion type="single" collapsible defaultValue="faq-0">
              {faqs.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`faq-${i}`}
                  className="border-white/10 px-2 transition-colors duration-300 data-[state=open]:bg-white/[0.025] last:border-b-0 sm:px-3"
                >
                  <AccordionTrigger
                    className={cn(
                      "rounded-lg px-3 py-5 text-left font-medium text-foreground",
                      "hover:bg-white/[0.03] hover:no-underline",
                      "focus-visible:ring-2 focus-visible:ring-cyan-500/40",
                      "[&[data-state=open]>svg]:text-cyan-400",
                    )}
                  >
                    <span className="flex items-start gap-3">
                      <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400/80" />
                      <span className="text-[15px] leading-relaxed">{item.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-5 pl-10 text-muted-foreground text-sm leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>

        {/* 兜底提示 */}
        <Reveal delay={160} className="mx-auto mt-8 max-w-3xl text-center">
          <p className="text-sm text-muted-foreground">
            没有找到答案？
            <a
              href="#contact"
              className="ml-1.5 text-cyan-400 underline-offset-4 transition-colors hover:text-cyan-300 hover:underline"
            >
              联系我们获取支持
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
