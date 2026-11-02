# HQSIM 探芯测试 · AI 芯片探针卡 & 测试座定制官网

> 以探针精度，触碰每一颗芯片 —— PROBE CARD & TEST SOCKET

HQSIM 探芯测试是 **AI 芯片探针卡 & 测试座定制专家**。官网展示探针卡定制、测试座供应、快速打样与测试方案咨询四大核心服务，支持 QFN / BGA / WLCSP 等 20 余种封装，高精度 ±5μm，一件起订，最快 3 天交付样件。

一套可直接部署到 **GitHub Pages** 的单页企业官网，展示核心服务、定制流程、产品线、交付节奏、配套生态与客户案例。

**官网**：<https://www.hqsim.com/zh> · **官方仓库**：<https://github.com/AndriodPhoneGap/HQSIM> · **咨询**：yuning662008@gmail.com · 182-0118-1983

**已内置公众号私域变现链路**：技术洞察区（与公众号同步的深度分析）→ 工具包勾选留资 → 方案需求表单 → 全站微信浮标。详细运营方法见 [PRIVATE-DOMAIN-GUIDE.md](./PRIVATE-DOMAIN-GUIDE.md)。

**技术栈**：React 19 · TypeScript · Vite 7 · Tailwind CSS 3 · shadcn/ui · lucide-react

---

## ⚡ 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 本地开发（默认 http://localhost:5173）
npm run dev

# 3. 生产构建，产物输出到 dist/
npm run build

# 4. 本地预览生产产物
npm run preview

# 5. 代码检查
npm run lint
```

---

## 🚀 部署到 GitHub Pages

项目已内置 GitHub Actions 工作流，推送后**自动构建并发布**，无需手工配置。

### 步骤

**1. 创建仓库并推送代码**

```bash
git init
git add .
git commit -m "feat: HQSIM 探芯测试官网初始版本"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

**2. 在 GitHub 仓库开启 Pages**

进入仓库 → **Settings** → **Pages** → **Build and deployment**：

| 配置项 | 取值 |
| --- | --- |
| Source | `GitHub Actions` |
| Branch | 保持默认（由工作流控制） |

**3. 等待部署**

推送到 `main` 后，Actions 面板会自动执行 `Deploy to GitHub Pages` 工作流：

```
Actions → Deploy to GitHub Pages → 查看运行日志
```

部署成功后访问：

```
https://<你的用户名>.github.io/<仓库名>/
```

> **路径适配**：`vite.config.ts` 中已设置 `base: "./"`，产物使用相对路径引用，因此无论仓库名是什么、部署在根路径还是子路径都能正常加载静态资源，无需额外配置。

### 部署到自定义域名

在 `Settings → Pages → Custom domain` 填入域名，并在域名服务商处添加 CNAME 记录指向 `<你的用户名>.github.io`。若使用 `www` 子域名，请额外配置 `www` 到根域名的 DNS 跳转。

---

## 📁 项目结构

```
semiconductor-ai/
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署工作流
├── public/
│   ├── 404.html                   # 自定义 404 页面（深色科技风）
│   ├── favicon-32.png             # 浏览器标签页图标（HQSIM 徽章）
│   ├── hqsim-logo.png             # HQSIM 官方圆徽章原图
│   ├── hqsim-logo-64.png          # 徽章多尺寸：64
│   ├── hqsim-logo-128.png         # 徽章多尺寸：128
│   ├── hqsim-logo-256.png         # 徽章多尺寸：256
│   ├── hqsim-logo-512.png         # 徽章多尺寸：512（OG 分享图）
│   └── wechat-qrcode.svg          # 公众号二维码（占位图，需替换）
├── src/
│   ├── App.tsx                    # 页面装配入口（区块顺序编排）
│   ├── main.tsx                   # React 挂载点
│   ├── index.css                  # 设计系统：CSS 变量、组件类、动效关键帧
│   ├── data/
│   │   └── site.ts                # ★ 全站内容数据源（文案与数据集中管理）
│   ├── components/
│   │   ├── brand/
│   │   │   └── HqsimLogo.tsx      # HQSIM 品牌标识（HqsimMark / HqsimMarkColor）
│   │   ├── common/
│   │   │   ├── Reveal.tsx         # 滚动进场动画（IntersectionObserver）
│   │   │   └── SectionHeading.tsx # 区块标题组 + 区块外壳
│   │   ├── layout/
│   │   │   ├── Footer.tsx         # 页脚
│   │   │   └── WechatDock.tsx     # 全站微信私域浮标（二维码弹窗）
│   │   └── ui/                    # shadcn/ui 组件库（40+）
│   ├── sections/                  # 页面区块（按功能组织）
│   │   ├── Navbar.tsx             # 顶部导航（滚动高亮 + 移动端菜单）
│   │   ├── Hero.tsx               # 首屏主视觉（SVG 探针卡示意 + 计数动画）
│   │   ├── Capability.tsx         # 四大核心服务
│   │   ├── Architecture.tsx       # 五环节定制流程（交互式 SVG 剖面图）
│   │   ├── Products.tsx           # 四条产品线（含跑马灯）
│   │   ├── Applications.tsx       # 应用场景
│   │   ├── Insights.tsx           # 技术洞察（与公众号联动 + 订阅侧栏）
│   │   ├── ProcessRoadmap.tsx     # 交付流程时间轴
│   │   ├── Ecosystem.tsx          # 配套生态
│   │   ├── Cases.tsx              # 客户案例
│   │   ├── News.tsx               # 公司动态
│   │   ├── Faq.tsx                # 常见问题
│   │   ├── LeadCapture.tsx        # 方案需求留资表单（私域转化主路径）
│   │   └── Cta.tsx                # 底部行动号召
│   ├── lib/
│   │   ├── utils.ts               # 工具函数（cn 等）
│   │   └── analytics.ts           # 轻量埋点（GA4 + 微信 SDK 双通道）
│   └── hooks/                     # 自定义 Hook
├── index.html                     # SEO / Open Graph / favicon
├── tailwind.config.js             # 品牌色板、字体、动画、阴影
├── vite.config.ts
└── PRIVATE-DOMAIN-GUIDE.md        # 公众号 × 官网 私域运营手册
```

---

## 🎨 设计与内容定制

### 修改文案与数据

**所有文案与数据都集中在 `src/data/site.ts`**，无需翻改组件代码：

```ts
export const brand = { name, nameEn, tagline, desc, contact, phone, address }
export const nav = [...]                // 顶部导航（id 对应区块锚点）
export const heroStats = [...]          // 首屏数据条
export const pillars = [...]            // 四大核心服务
export const architectureLayers = [...] // 五环节定制流程
export const products = [...]           // 四条产品线
export const processRoadmap = [...]     // 交付流程
export const applications = [...]       // 应用场景
export const ecosystem = [...]          // 配套生态
export const cases = [...]              // 客户案例
export const news = [...]               // 公司动态
export const faqs = [...]               // 常见问题
export const footerColumns = [...]      // 页脚链接
export const insights = [...]           // 技术洞察（与公众号同步的深度分析）
export const toolkits = [...]           // 免费工具包（私域留资钩子）
export const leadForm = {...}           // 留资表单配置（字段 / 卖点 / 隐私条款）
```

### 修改公众号信息

```ts
export const brand = {
  // ...
  wechatName: "HQSIM 探芯测试",   // 公众号名称
  wechatId: "abcm-888",           // 微信号
  wechatQr: "/wechat-qrcode.svg", // 二维码图片路径
  wecomName: "HQSIM 探针卡顾问",  // 企业微信名称
}
```

替换 `public/wechat-qrcode.svg` 为真实二维码图片，全站 4 处引用（洞察侧栏、留资表单、浮标弹窗）自动生效。

### 修改配色

品牌色板在 `tailwind.config.js` 的 `theme.extend.colors` 中定义：

```js
cyan:   { 400: "#8ff8dc", 500: "#6df0c4", 600: "#40c29e" }  // HQSIM 主色（薄荷青绿）
violet: { 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed" }  // 辅助色
mint:   { 400: "#7df5c8", 500: "#3fbd97" }                  // 点缀色
ink:    { 950: "#04060d", 900: "#070b16", ... }            // 深色底
```

同步修改 `src/index.css` 中 `:root` 的 `--primary` / `--accent` 等 CSS 变量。

### 新增区块

1. 在 `src/sections/` 新建组件并 `export default`
2. 在 `src/App.tsx` 的 `<main>` 中引入并放置
3. 如需加入顶部导航，在 `src/data/site.ts` 的 `nav` 数组追加 `{ id, label, en }`，并保证对应区块的 `id` 一致

### 修改 SEO

编辑 `index.html` 中的 `<title>`、`description`、`og:*`、`twitter:*` 与 `canonical` 标签。favicon 使用 HQSIM 官方徽章多尺寸 PNG（`favicon-32.png` / `hqsim-logo-64.png` / `hqsim-logo-128.png` / `hqsim-logo-256.png`），OG 分享图使用 `hqsim-logo-512.png`。

---

## ✨ 设计特性

- **深色科技风视觉**：深空蓝黑底 + 薄荷青绿 / 紫罗兰渐变，电路网格纹理背景
- **官方品牌标识**：采用 HQSIM 官方圆徽章（芯片 + 电路走线），配手绘 SVG 插画，零外部图片依赖
- **滚动进场动画**：`Reveal` 组件基于 IntersectionObserver，支持错落延迟
- **导航滚动高亮**：实时跟随视口高亮当前区块
- **数字计数动画**：首屏指标滚动到位后缓动递增
- **交互式流程图**：hover 五环节定制流程，垂直导轨流动光点跟随高亮环节
- **私域转化链路**：技术洞察 ↔ 公众号双向导流、工具包勾选留资、表单校验与成功态引导、全站微信浮标
- **零依赖埋点**：GA4 + 微信 JS-SDK 双通道上报，UTM 渠道归因，8 类事件覆盖完整漏斗
- **全响应式**：移动端到宽屏无横向滚动，含移动端抽屉菜单
- **无障碍**：语义化标签、键盘可达、`aria-*` 标注、跳转链接、`prefers-reduced-motion` 降级
- **零外部依赖字体**：使用系统中文字体栈，首屏无第三方字体请求

---

## ⚠️ 免责声明

本网站为 **HQSIM 探芯测试** 官网的重新设计版本，用于展示前端工程实现。页面中部分产品参数、案例描述与交付周期基于官网公开信息整理，具体以实际报价与合同约定为准。

正式部署前需替换 `src/data/site.ts` 中的示例数据，以及 `public/wechat-qrcode.svg` 二维码。

---

## 📄 License

MIT
