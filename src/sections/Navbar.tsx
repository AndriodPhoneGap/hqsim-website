import { useEffect, useState } from "react"
import { ArrowRight, Download, Menu, X } from "lucide-react"
import { brand, nav } from "@/data/site"
import { cn } from "@/lib/utils"
import { HqsimMark } from "@/components/brand/HqsimLogo"

/** 顶部导航栏：固定定位 + 滚动后玻璃拟态 + 滚动高亮（scroll spy） */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState<string>("top")

  // 滚动超过 24px 后切换为半透明毛玻璃背景
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // 滚动高亮：IntersectionObserver 以导航条下沿（72px）为判定线，观察经过该线的区块
  useEffect(() => {
    const ids = ["top", ...nav.map((item) => item.id)]
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0) return

    const LINE = 72 // 判定线所在的视口坐标（导航条底部）
    const visible = new Set<HTMLElement>()

    const resolve = () => {
      const visibleEls = targets.filter((el) => visible.has(el))
      // 判定线以下、文档顺序最靠后的可见区块，即当前所处的 section
      const passed = visibleEls.filter((el) => el.getBoundingClientRect().top <= LINE)
      const current = passed.length > 0 ? passed[passed.length - 1] : visibleEls[0]
      if (current) setActive(current.id)
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) visible.add(el)
          else visible.delete(el)
        })
        resolve()
      },
      // 判定带：上沿避开固定导航条，下沿延伸至视口 70% 处
      { rootMargin: "-72px 0px -70% 0px", threshold: 0 },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Esc 关闭移动端面板
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  const isActive = (id: string) => active === id

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.07] bg-ink-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 sm:h-[72px]">
        {/* 品牌标识 */}
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-3"
          aria-label={`${brand.name} 首页`}
          aria-current={active === "top" ? "page" : undefined}
        >
          <HqsimMark className="h-9 w-9 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10" />
          <span className="flex flex-col leading-none">
            <span
              className={cn(
                "text-[15px] font-semibold tracking-wide transition-colors duration-200 sm:text-base",
                active === "top" ? "text-cyan-400" : "text-foreground",
              )}
            >
              {brand.name}
            </span>
            <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-500">
              {brand.nameEn}
            </span>
          </span>
        </a>

        {/* 桌面端导航 */}
        <nav aria-label="主导航" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive(item.id) ? "location" : undefined}
              className={cn(
                "group relative flex flex-col items-center rounded-lg px-3 py-2 transition-colors duration-200",
                isActive(item.id)
                  ? "text-cyan-400"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="text-[13px] font-medium leading-none">{item.label}</span>
              <span className="mt-1 font-mono text-[9px] uppercase leading-none tracking-[0.18em] opacity-60">
                {item.en}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -bottom-0.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full transition-all duration-300",
                  isActive(item.id)
                    ? "w-5 bg-cyan-400 shadow-glow"
                    : "w-0 bg-cyan-400/50 group-hover:w-3",
                )}
              />
            </a>
          ))}
        </nav>

        {/* 右侧 CTA */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href="#ecosystem"
            className="hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:text-cyan-400 lg:inline-flex"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={1.8} />
            下载白皮书
          </a>
          <a href="#contact" className="btn-glow group px-4 py-2 text-[13px]">
            咨询合作
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-foreground transition-colors hover:border-cyan-500/50 hover:text-cyan-400 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* 移动端下拉面板 */}
      <div
        id="mobile-nav-panel"
        hidden={!menuOpen}
        className={cn(
          "border-b border-white/10 bg-ink-950/95 backdrop-blur-xl lg:hidden",
          // 展开时重新挂载动画类，使淡入效果每次都能触发
          menuOpen && "animate-fade-up",
        )}
      >
        <nav aria-label="移动端导航" className="shell flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-3 transition-colors",
                isActive(item.id)
                  ? "bg-cyan-500/[0.08] text-cyan-400"
                  : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground",
              )}
            >
              <span className="text-sm font-medium">{item.label}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
                {item.en}
              </span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-glow mt-3 w-full px-4 py-2.5 text-[13px]"
          >
            咨询合作
            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  )
}
