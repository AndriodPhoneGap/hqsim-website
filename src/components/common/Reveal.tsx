import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * 滚动进场动画容器：进入视口后添加 .is-visible
 * 支持 delay（毫秒）以实现错落进场。
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: "div" | "section" | "li" | "article" | "span"
}) {
  const ref = useRef<HTMLElement | null>(null)
  // 环境不支持 IntersectionObserver 时直接展示，避免内容永久隐藏
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === "undefined")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
