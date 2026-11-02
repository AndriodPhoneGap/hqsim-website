import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/common/Reveal"

/** 区块标题组：eyebrow + 主标题 + 描述 */
export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
  className,
}: {
  eyebrow?: string
  title: ReactNode
  desc?: ReactNode
  align?: "center" | "left"
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="eyebrow">
          <span className="h-px w-6 bg-cyan-500/60" />
          {eyebrow}
          {align === "center" ? <span className="h-px w-6 bg-cyan-500/60" /> : null}
        </span>
      ) : null}
      <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.25] tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {desc ? (
        <p
          className={cn(
            "max-w-2xl text-balance text-[15px] leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {desc}
        </p>
      ) : null}
    </Reveal>
  )
}

/** 统一的区块外壳 */
export function Section({
  id,
  children,
  className,
  containerClassName,
}: {
  id?: string
  children: ReactNode
  className?: string
  containerClassName?: string
}) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", className)}>
      <div className={cn("shell", containerClassName)}>{children}</div>
    </section>
  )
}
