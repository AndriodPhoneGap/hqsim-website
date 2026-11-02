import { cn } from "@/lib/utils"
import logo128 from "@/assets/hqsim-logo-128.png"
import logo256 from "@/assets/hqsim-logo-256.png"

/**
 * HQSIM 品牌标识。
 *
 * 使用官方 logo 资源（透明底 PNG，源自 hqsim.com）。
 *
 * 资源通过 Vite 静态导入引入，构建时会自动改写为带 base 前缀的绝对地址，
 * 因此在 GitHub Pages 子路径（如 /hqsim-website/）部署时也能正确加载 ——
 * 若手写 "/hqsim-logo-128.png" 会被解析到站点根目录而 404。
 */

/** HQSIM 官方圆徽章（导航栏等紧凑场景） */
export function HqsimMark({
  className,
  src = logo128,
}: {
  className?: string
  src?: string
}) {
  return (
    <img
      src={src}
      alt="HQSIM 探芯测试"
      width={128}
      height={128}
      className={cn("h-8 w-8 select-none object-contain", className)}
      loading="eager"
      decoding="async"
    />
  )
}

/**
 * 品牌标识的彩色版本 —— 直接使用原图渐变（薄荷青绿 #40C29E → #6DF0C4）。
 * 适合页脚大尺寸展示、favicon、OG 图等需要品牌原色的场合。
 */
export function HqsimMarkColor({
  className,
  src = logo256,
}: {
  className?: string
  src?: string
}) {
  return (
    <img
      src={src}
      alt="HQSIM 探芯测试"
      width={256}
      height={256}
      className={cn("h-9 w-9 select-none object-contain", className)}
      loading="eager"
      decoding="async"
    />
  )
}
