import { useEffect, useState } from "react"
import { MessageCircle, X, Copy, Check, QrCode } from "lucide-react"
import { brand } from "@/data/site"
import { TRACK_EVENTS, track } from "@/lib/analytics"
import { cn } from "@/lib/utils"

/**
 * 微信私域浮标 —— 全站常驻的私域入口。
 *
 * 设计意图：
 * - 公众号承担内容拉新与信任建立，官网承担承接与转化；
 * - 浮标是两者之间的「桥」，读者从任何一篇推文落地官网后，
 *   都能一键回到公众号继续订阅，从而完成「内容 → 私域」的闭环；
 * - 同时提供微信号复制与二维码弹窗，覆盖不同场景的加好友习惯。
 */
export default function WechatDock() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(false)

  // 滚动 320px 后才淡入，避免首屏干扰
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Esc 关闭弹窗
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const copyWechatId = async () => {
    try {
      await navigator.clipboard.writeText(brand.wechatId)
      setCopied(true)
      track(TRACK_EVENTS.WECHAT_COPY_ID, { source: "dock", itemId: brand.wechatId })
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // 剪贴板不可用时，用户可直接手动输入微信号
    }
  }

  const openQr = () => {
    setOpen(true)
    track(TRACK_EVENTS.WECHAT_QR_OPEN, { source: "dock", itemId: brand.wechatName })
  }

  return (
    <>
      {/* 右下角悬浮入口 */}
      <div
        className={cn(
          "fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 transition-all duration-500 sm:bottom-8 sm:right-8",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        {/* 展开的小面板 */}
        {open ? (
          <div className="glass-strong w-[268px] rounded-2xl p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-500/90">
                  WeChat Channel
                </p>
                <h3 className="mt-1.5 text-sm font-semibold text-foreground">
                  添加「{brand.wechatName}」
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="关闭二维码面板"
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-white/[0.07] bg-ink-950/60 p-4">
              <img
                src={brand.wechatQr}
                alt="微信公众号二维码"
                width={148}
                height={148}
                className="h-[148px] w-[148px] rounded-lg"
              />
              <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
                微信扫一扫，关注公众号
                <br />
                获取每周更新的选型干货
              </p>
            </div>

            <button
              type="button"
              onClick={copyWechatId}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] py-2.5 text-xs text-foreground transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-mint-400" aria-hidden="true" />
                  微信号已复制：{brand.wechatId}
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  复制微信号：{brand.wechatId}
                </>
              )}
            </button>

            <p className="mt-3 text-center text-[10px] leading-relaxed text-muted-foreground opacity-70">
              添加后可直接发送选型需求
              <br />
              顾问将在工作日 2 小时内响应
            </p>
          </div>
        ) : null}

        {/* 主按钮 */}
        <button
          type="button"
          onClick={openQr}
          aria-label="添加企业微信，获取选型建议"
          className="group relative flex h-12 items-center gap-2 rounded-full border border-cyan-500/30 bg-ink-900/90 py-3 pl-3.5 pr-4 text-ink-950 shadow-glow backdrop-blur-xl transition-all duration-300 hover:bg-cyan-500 hover:shadow-glow-lg"
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/15">
            <MessageCircle
              className="h-4 w-4 text-cyan-400 transition-colors group-hover:text-ink-950"
              aria-hidden="true"
            />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-mint-400 ring-2 ring-ink-900 animate-pulse-glow" />
          </span>
          <span className="text-sm font-semibold text-cyan-400 transition-colors group-hover:text-ink-950">
            加微信问选型
          </span>
          <QrCode className="h-3.5 w-3.5 text-cyan-400/70 transition-colors group-hover:text-ink-950/70" aria-hidden="true" />
        </button>
      </div>

      {/* 遮罩 */}
      {open ? (
        <button
          type="button"
          aria-label="关闭二维码面板"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 cursor-default bg-ink-950/60 backdrop-blur-sm"
        />
      ) : null}
    </>
  )
}
