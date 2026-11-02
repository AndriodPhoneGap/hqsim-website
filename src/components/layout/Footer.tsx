import { Github, Mail, Rss, MessageCircle, Phone, MapPin, Send } from "lucide-react"
import { brand, footerColumns } from "@/data/site"
import { HqsimMarkColor } from "@/components/brand/HqsimLogo"

/**
 * 页脚：品牌区 + 链接列 + 社交入口 + 版权栏
 */

/**
 * 页脚链接 → 站内锚点映射。
 * 键为链接文案，值为对应区块 id；未命中的链接统一回落到联系区。
 */
const LINK_HREF: Record<string, string> = {
  // 产品
  "标准探针卡": "#product",
  "高密度探针卡": "#product",
  "测试座 / Socket": "#product",
  "一站式测试方案": "#product",
  "打样与交付": "#process",
  // 服务
  "探针卡定制": "#capability",
  "测试座供应": "#capability",
  "快速打样": "#capability",
  "方案咨询": "#capability",
  "服务流程": "#process",
  "精度与工艺": "#architecture",
  // 技术
  "技术资料": "#insights",
  "封装类型对照": "#insights",
  "设计规则速查": "#insights",
  "应用场景": "#application",
  "常见问题": "#faq",
  // 关于
  "关于我们": "#top",
  "新闻动态": "#news",
  "联系我们": "#contact",
  "在线留言": "#lead",
  "微信公众号": "#insights",
}

/** 社交 / 合作入口 */
const SOCIALS = [
  { icon: Github, label: "GitHub", href: brand.github, external: true },
  { icon: MessageCircle, label: "微信公众号", href: "#insights", external: false },
  { icon: Rss, label: "技术资料", href: "#insights", external: false },
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
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/[0.08]">
                <HqsimMarkColor className="h-9 w-9" />
              </span>
              <div>
                <p className="text-[15px] font-semibold tracking-tight text-foreground">
                  {brand.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-500/80">
                  {brand.nameEn}
                </p>
              </div>
            </div>

            <p className="mt-5 font-mono text-[12px] tracking-[0.1em] text-muted-foreground opacity-90">
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
              <p className="flex items-center gap-2 font-mono text-[12px] text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-cyan-500/70" />
                {brand.address}
              </p>
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

        {/* ---------- 中部：社交入口 + 订阅 ---------- */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/[0.07] pt-8 sm:flex-row">
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.label}
                  href={s.href}
                  {...(s.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-all duration-300 hover:border-cyan-500/50 hover:text-cyan-400"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              )
            })}
          </div>

          <a
            href={`mailto:${brand.contact}?subject=${encodeURIComponent("订阅 HQSIM 技术通讯")}`}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-[13px] text-foreground transition-all duration-300 hover:border-cyan-500/50 hover:text-cyan-400"
          >
            <Send className="h-3.5 w-3.5 text-cyan-500/70 transition-colors group-hover:text-cyan-400" />
            订阅技术通讯
          </a>
        </div>

        {/* ---------- 底部版权栏 ---------- */}
        <div className="mt-8 flex flex-col items-center gap-3 border-t border-white/[0.07] pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-mono text-[11px] text-muted-foreground opacity-70">
            © 2026 {brand.name} · {brand.nameEn}. 保留所有权利。
          </p>
          <p className="text-[11px] text-muted-foreground opacity-60">
            探针卡与测试座定制 · 一件起订 · 最快 3 天交付样件
          </p>
        </div>
      </div>
    </footer>
  )
}
