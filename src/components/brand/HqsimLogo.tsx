import { cn } from "@/lib/utils"

/**
 * HQSIM 品牌标识。
 *
 * 使用官方 logo 资源（透明底 PNG，源自 hqsim.com），
 * 通过 CSS mask 让图形继承当前文字颜色，从而适配深色背景下的不同场景。
 */
export function HqsimMark({
  className,
  /** 图片资源路径，优先使用小尺寸版本以节省带宽 */
  src = "/hqsim-logo-128.png",
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
  src = "/hqsim-logo-256.png",
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
