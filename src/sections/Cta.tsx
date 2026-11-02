import { Mail, Phone, MapPin, ArrowRight, Download, Sparkles } from "lucide-react"
import { brand } from "@/data/site"
import { Reveal } from "@/components/common/Reveal"
import { Section } from "@/components/common/SectionHeading"

/**
 * 底部行动号召：全宽大区块 + 电路纹理 + 青色径向辉光
 */

export default function Cta() {
  return (
    <Section id="contact" className="relative overflow-hidden">
      <div className="relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-10 sm:p-16">
            {/* 电路网格纹理叠加 */}
            <div className="pointer-events-none absolute inset-0 bg-circuit opacity-50" />
            {/* 右上角青色径向辉光 */}
            <div className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-cyan-500/25 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-violet-500/15 blur-[100px]" />
            {/* 顶/底细线 */}
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            <div className="relative flex flex-col items-center text-center">
              <span className="eyebrow">
                <span className="h-px w-6 bg-cyan-500/60" />
                GET IN TOUCH
                <span className="h-px w-6 bg-cyan-500/60" />
              </span>

              <h2 className="mt-6 max-w-3xl text-balance text-3xl font-semibold leading-[1.25] tracking-tight text-foreground sm:text-4xl lg:text-[42px]">
                让我们一起，把 <span className="text-gradient">AI 算力</span>{" "}
                送到每一颗芯片上
              </h2>

              <p className="mt-5 max-w-2xl text-balance text-[15px] leading-relaxed text-muted-foreground">
                无论你正在规划智算集群、改造产线还是自研 AI 芯片，
                我们的架构与工艺团队都能给出可落地的方案。留下联系方式，我们会在一个工作日内与你联系。
              </p>

              {/* 按钮组 */}
              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
                <a
                  href={`mailto:${brand.contact}?subject=${encodeURIComponent("预约技术交流")}`}
                  className="btn-glow group focus-visible:ring-cyan-500/60"
                >
                  预约技术交流
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href={`mailto:${brand.contact}?subject=${encodeURIComponent("申请下载产品手册")}`}
                  className="btn-ghost group"
                >
                  <Download className="h-4 w-4" />
                  下载产品手册
                </a>
              </div>

              {/* 联系方式 */}
              <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/[0.08] pt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-3">
                <a
                  href={`mailto:${brand.contact}`}
                  className="group inline-flex items-center gap-2 font-mono text-[12px] text-muted-foreground transition-colors hover:text-cyan-400"
                >
                  <Mail className="h-3.5 w-3.5 text-cyan-500/70 transition-colors group-hover:text-cyan-400" />
                  {brand.contact}
                </a>

                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="group inline-flex items-center gap-2 font-mono text-[12px] text-muted-foreground transition-colors hover:text-cyan-400"
                >
                  <Phone className="h-3.5 w-3.5 text-cyan-500/70 transition-colors group-hover:text-cyan-400" />
                  {brand.phone}
                </a>

                <span className="inline-flex items-center gap-2 font-mono text-[12px] text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-cyan-500/70" />
                  {brand.address}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 底部补充说明 */}
        <Reveal delay={120} className="mt-8 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-6">
          <span className="inline-flex items-center gap-2 text-[12px] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            面向企业客户开放架构评估与 POC 验证
          </span>
          <span className="hidden h-3 w-px bg-white/10 sm:block" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
            Response within 1 business day
          </span>
        </Reveal>
      </div>
    </Section>
  )
}
