/**
 * 轻量级事件埋点 —— 用于追踪私域漏斗各环节的转化。
 *
 * 设计原则：
 * 1. 零依赖、可降级 —— 任何 API 缺失都不影响业务功能；
 * 2. 双通道上报 —— 同时推送到 GA4（如果存在）与微信 SDK（如果存在）；
 * 3. 事件名统一走常量，避免散落的魔法字符串造成统计口径不一致。
 */

/** 埋点事件枚举 —— 与运营侧统计口径一一对应 */
export const TRACK_EVENTS = {
  /** 页面浏览 */
  PAGE_VIEW: "page_view",
  /** 点击公众号浮标 */
  WECHAT_FAB_CLICK: "wechat_fab_click",
  /** 打开二维码弹窗 */
  WECHAT_QR_OPEN: "wechat_qr_open",
  /** 扫码/复制微信号 */
  WECHAT_COPY_ID: "wechat_copy_id",
  /** 查看洞察文章 */
  INSIGHT_VIEW: "insight_view",
  /** 点击工具包下载 */
  TOOLKIT_DOWNLOAD: "toolkit_download",
  /** 提交选型需求表单 */
  LEAD_SUBMIT: "lead_submit",
  /** 表单校验失败 */
  LEAD_VALIDATION_ERROR: "lead_validation_error",
  /** 点击底部主 CTA */
  CTA_CLICK: "cta_click",
} as const

export type TrackEvent = (typeof TRACK_EVENTS)[keyof typeof TRACK_EVENTS]

/** 事件参数 */
export interface TrackParams {
  /** 事件来源区块，如 "insights" / "lead-form" */
  source?: string
  /** 关联对象标识，如文章 id、工具包 id */
  itemId?: string
  /** 补充说明 */
  label?: string
  [key: string]: string | number | boolean | undefined
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    wx?: {
      ready?: (cb: () => void) => void
      config?: (opts: Record<string, unknown>) => void
      invoke?: (api: string, opts: Record<string, unknown>) => void
    }
    __XZE_TRACK__?: Record<string, unknown>
  }
}

/**
 * 记录一条埋点事件。
 * 任何异常都会被吞掉——埋点失败绝不能影响用户体验。
 */
export function track(event: TrackEvent, params: TrackParams = {}): void {
  try {
    const payload = {
      event,
      ...params,
      ts: Date.now(),
      path: typeof window !== "undefined" ? window.location.pathname : "",
    }

    // 本地留存，便于开发期自查与后续回传
    window.__XZE_TRACK__ = window.__XZE_TRACK__ ?? {}
    window.__XZE_TRACK__[event] = payload

    // 通道一：GA4
    if (typeof window.gtag === "function") {
      window.gtag("event", event, payload)
    }

    // 通道二：微信 JS-SDK（用于公众号内打开官网时回传）
    if (window.wx?.invoke) {
      window.wx.invoke("reportAnalytics", { event, params: JSON.stringify(payload) })
    }
  } catch {
    // 埋点异常静默处理
  }
}

/**
 * 声明 UTM 参数，供运营在公众号推文中做渠道归因。
 * 首次访问时写入 sessionStorage，后续跳转保留来源。
 */
export function captureUtm(): void {
  try {
    if (typeof window === "undefined") return
    const key = "xze_utm"
    if (sessionStorage.getItem(key)) return

    const params = new URLSearchParams(window.location.search)
    const utm: Record<string, string> = {}
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const v = params.get(k)
      if (v) utm[k] = v
    }
    if (Object.keys(utm).length === 0) return

    sessionStorage.setItem(key, JSON.stringify(utm))
  } catch {
    // 忽略隐私模式下的存储异常
  }
}

/** 读取并回传渠道归因参数 */
export function reportAttribution(): void {
  try {
    if (typeof window === "undefined") return
    const raw = sessionStorage.getItem("xze_utm")
    if (!raw) return
    track(TRACK_EVENTS.PAGE_VIEW, {
      source: "attribution",
      ...(JSON.parse(raw) as Record<string, string>),
    })
  } catch {
    // 忽略解析异常
  }
}
