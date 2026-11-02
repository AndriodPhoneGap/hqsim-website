import { Github, Mail, Rss, MessageCircle, Phone, MapPin, Send } from "lucide-react"
import { brand, footerColumns } from "@/data/site"
import { cn } from "@/lib/utils"

/**
 * 页脚：品牌区 + 链接列 + 社交入口 + 版权栏
 */

/** 芯片 Logo 标记（纯 SVG，无外部依赖） */
function ChipLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect
        x="12"
        y="12"
        width="24"
        height="24"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="18"
        y="18"
        width="12"
        height="12"
        rx="2.5"
        fill="currentColor"
        opacity="0.35"
      />
      {/* 引脚 */}
      {[17, 24, 31].map((p) => (
        <g key={`v-${p}`}>
          <line x1={p} y1="7" x2={p} y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1={p} y1="36" x2={p} y2="41" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      ))}
      {[17, 24, 31].map((p) => (
        <g key={`h-${p}`}>
          <line x1="7" y1={p} x2="12" y2={p} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="36" y1={p} x2="41" y2={p} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  )
}

/** 链接文案 → 站内锚点映射 */
const LINK_HREF: Record<string, string | undefined> = {
  "XZE-N900 加速卡": "#product",
  "XZE-E300 边缘模组": "#product",
  "XZE-T200 训练卡": "#product",
  "XZE-IP100 IP 授权": "#product",
  "整机与集群方案": "#product",
  "Chiplet 先进封装": "#architecture",
  "存算一体架构": "#architecture",
  "XZE 编译器": "#capability",
  "XISA 指令集": "#architecture",
  "工艺与路线图": "#process",
  "伙伴计划": "#ecosystem",
  "开发者社区": "#ecosystem",
  "模型迁移支持": "#cases",
  "技术白皮书": "#news",
  "校园计划": "#ecosystem",
  "公司简介": "#cases",
  "新闻动态": "#news",
  "加入我们": "#contact",
  "媒体报道": "#news",
  "联系与地址": "#contact",
}

/** 社交 / 合作入口 */
const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/your-org/xinzhi-era", external: true },
  { icon: MessageCircle, label: "知乎", href: "#news", external: false },
  { icon: Rss, label: "微信公众号", href: "#news", external: false },
  { icon: Mail, label: "邮件订阅", href: `mailto:${brand.contact}`, external: false },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-ink-950">
      {/* 顶部渐隐细线 */}
      <div className="hairline" />

      <div className="shell py-14 sm:py-16">
        {/* ---------- 上部：品牌区 + 链接列 ---------- */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          {/* 品牌区 */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/[0.08] text-cyan-400">
                <ChipLogo className="h-6 w-6" />
              </span>
              <div>
                <p className="text-[15px] font-semibold tracking-tight text-foreground">
                  {brand.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-500/80">
                  {brand.nameEn}
                </p>
              </div>
            </div>

            <p className="mt-5 font-mono text-[12px] tracking-[0.1em] text-muted-foreground/90">
              {brand.tagline}
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              {brand.desc}
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
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
              <span className="inline-flex items-start gap-2 font-mono text-[12px] text-muted-foreground">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-500/70" />
                {brand.address}
              </span>
            </div>
          </div>

          {/* 链接列 */}
          <nav
            aria-label="页脚导航"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6"
          >
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground">
                  {col.title}
                </h3>
                <div className="mt-4 h-px w-8 bg-cyan-500/40" />
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href={LINK_HREF[link] ?? "#contact"}
                        className="group inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-cyan-400"
                      >
                        <span className="h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-3" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* ---------- 中部：社交 / 合作入口 ---------- */}
        <div className="mt-12 flex flex-col items-start gap-5 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, label, href, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02]",
                  "text-muted-foreground transition-all duration-300",
                  "hover:border-cyan-500/50 hover:bg-cyan-500/[0.08] hover:text-cyan-400",
                )}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <a
            href={`mailto:${brand.contact}?subject=${encodeURIComponent("订阅芯智纪元技术通讯")}`}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 font-mono text-[12px] text-muted-foreground transition-all duration-300 hover:border-cyan-500/50 hover:text-cyan-400"
          >
            <Send className="h-3.5 w-3.5" />
            订阅技术通讯
          </a>
        </div>

        {/* ---------- 底部版权栏 ---------- */}
        <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.07] pt-6 text-[12px] text-muted-foreground/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {brand.name} {brand.nameEn}. 保留所有权利。</p>
          <p className="text-muted-foreground/60">
            本站为演示站点，页面中公司名称、产品型号与数据均为虚构示例。
          </p>
          <p className="font-mono tracking-[0.08em]">
            粤ICP备2026000000号-0
            <span className="ml-2 text-muted-foreground/50">（示例）</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
