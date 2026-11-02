import { ArrowRight, Check, Cpu } from "lucide-react"
import { Reveal } from "@/components/common/Reveal"
import { SectionHeading } from "@/components/common/SectionHeading"
import { products } from "@/data/site"
import { cn } from "@/lib/utils"

type Color = "cyan" | "violet" | "mint"

/** 收敛数据源中的 color 字段，保证类型安全 */
function resolveColor(color: string): Color {
  if (color === "cyan" || color === "violet" || color === "mint") return color
  return "cyan"
}

/** 各产品主色：胶囊标签 / hover 边框 / 辉光 / 光晕 */
const COLOR_STYLES: Record<
  Color,
  { pill: string; hover: string; halo: string }
> = {
  cyan: {
    pill: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    hover: "hover:border-cyan-500/45 hover:shadow-[0_0_70px_-20px_rgba(34,211,238,0.85)]",
    halo: "radial-gradient(circle, rgba(34,211,238,0.18), transparent 70%)",
  },
  violet: {
    pill: "border-violet-500/30 bg-violet-500/10 text-violet-400",
    hover: "hover:border-violet-500/45 hover:shadow-[0_0_70px_-20px_rgba(139,92,246,0.85)]",
    halo: "radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%)",
  },
  mint: {
    pill: "border-mint-500/30 bg-mint-500/10 text-mint-400",
    hover: "hover:border-mint-500/45 hover:shadow-[0_0_70px_-20px_rgba(45,212,191,0.85)]",
    halo: "radial-gradient(circle, rgba(45,212,191,0.18), transparent 70%)",
  },
}

/** 跑马灯文案：精度、封装与交付能力关键词 */
const MARQUEE_ITEMS = [
  "±5μm 精度",
  "Pitch 80μm 起",
  "QFN / BGA / WLCSP",
  "一件起订",
  "3 天交付",
  "高精度 PCB",
  "刀锋型针尖",
  "接触力可调",
  "镍金镀层",
  "垂直测试座",
]

export default function Products() {
  return (
    <section id="product" className="relative py-20 sm:py-28">
      <div className="shell">
        {/* 工艺能力与产品标签跑马灯 */}
        <div
          className="mask-fade-x relative mb-14 overflow-hidden border-y border-white/[0.07] bg-ink-950/40 py-3"
          role="region"
          aria-label="工艺能力与产品标签"
        >
          <div className="flex w-max animate-marquee items-center">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
                {MARQUEE_ITEMS.map((item) => (
                  <span key={item} className="flex items-center">
                    <span className="px-6 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground opacity-75">
                      {item}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-cyan-500/50" aria-hidden />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <SectionHeading
          eyebrow="PRODUCT PORTFOLIO"
          title={
            <>
              覆盖打样到量产的
              <span className="text-gradient">探针卡与测试座产品线</span>
            </>
          }
          desc="从常规单层探针卡到大 die 高密度方案，从垂直测试座到探针卡 + 测试座 + 测试 PCB + 夹具的一站式交付，覆盖 QFN / BGA / WLCSP 等 20 余种封装，一件起订、最快 3 天出样。"
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:gap-6 md:grid-cols-2">
          {products.map((product, i) => {
            const styles = COLOR_STYLES[resolveColor(product.color)]

            return (
              <Reveal key={product.id} delay={i * 80} className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-ink-900/60 p-6 transition-all duration-300 hover:-translate-y-1",
                    styles.hover,
                  )}
                >
                  {/* hover 光晕 */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: styles.halo }}
                  />

                  {/* 顶部：标签 + 产品名 */}
                  <div className="relative flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-[0.14em]",
                        styles.pill,
                      )}
                    >
                      {product.tag}
                    </span>
                    <h3 className="truncate font-mono text-lg font-bold tracking-tight text-foreground sm:text-xl">
                      {product.name}
                    </h3>
                  </div>

                  <p className="relative mt-3 text-sm text-muted-foreground">{product.subtitle}</p>

                  {/* 关键参数 */}
                  <div className="relative mt-4 flex items-start gap-2.5 rounded-lg border border-white/[0.07] bg-ink-950/60 p-3">
                    <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500/80" aria-hidden />
                    <p className="font-mono text-xs leading-relaxed text-cyan-400/90">
                      {product.spec}
                    </p>
                  </div>

                  <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                    {product.desc}
                  </p>

                  {/* 核心特性 */}
                  <ul className="relative mt-4 space-y-2">
                    {product.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" aria-hidden />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 详情入口 */}
                  <div className="relative mt-auto flex items-center justify-end border-t border-white/[0.07] pt-4">
                    <button
                      type="button"
                      aria-label={`查看 ${product.name} 详情`}
                      className="inline-flex items-center gap-1.5 rounded-md font-mono text-xs uppercase tracking-[0.18em] text-cyan-400 transition-all duration-300 hover:brightness-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                    >
                      查看详情
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </button>
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
