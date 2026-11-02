# 芯智纪元 · 半导体人工智能科技官网

> 以硅基算力，重塑智能边界 —— 面向 AI 推理与训练场景的端到端芯片架构公司官网。

一套可直接部署到 **GitHub Pages** 的单页企业官网，聚焦半导体与人工智能赛道，展示技术能力、芯片架构、产品矩阵、工艺路线、生态合作与客户案例。

**已内置公众号私域变现链路**：技术洞察区（与公众号同步的深度分析）→ 工具包勾选留资 → 选型需求表单 → 全站微信浮标。详细运营方法见 [PRIVATE-DOMAIN-GUIDE.md](./PRIVATE-DOMAIN-GUIDE.md)。

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
git commit -m "feat: 芯智纪元半导体 AI 官网初始版本"
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
│   └── 404.html                   # 自定义 404 页面（深色科技风）
├── src/
│   ├── App.tsx                    # 页面装配入口（区块顺序编排）
│   ├── main.tsx                   # React 挂载点
│   ├── index.css                  # 设计系统：CSS 变量、组件类、动效关键帧
│   ├── data/
│   │   └── site.ts                # ★ 全站内容数据源（文案与数据集中管理）
│   ├── components/
│   │   ├── common/
│   │   │   ├── Reveal.tsx         # 滚动进场动画（IntersectionObserver）
│   │   │   └── SectionHeading.tsx # 区块标题组 + 区块外壳
│   │   ├── layout/
│   │   │   └── Footer.tsx         # 页脚
│   │   └── ui/                    # shadcn/ui 组件库（40+）
│   ├── sections/                  # 页面区块（按功能组织）
│   │   ├── Navbar.tsx             # 顶部导航（滚动高亮 + 移动端菜单）
│   │   ├── Hero.tsx               # 首屏主视觉（SVG 芯片 + 计数动画）
│   │   ├── Capability.tsx         # 四大技术能力
│   │   ├── Architecture.tsx       # 五层芯片架构（交互式 SVG 剖面图）
│   │   ├── Products.tsx           # 产品矩阵（含跑马灯）
│   │   ├── Applications.tsx       # 应用场景
│   │   ├── Insights.tsx           # 技术洞察（与公众号联动 + 订阅侧栏）
│   │   ├── ProcessRoadmap.tsx     # 工艺路线图时间轴
│   │   ├── Ecosystem.tsx          # 生态合作
│   │   ├── Cases.tsx              # 客户案例
│   │   ├── News.tsx               # 新闻动态
│   │   ├── Faq.tsx                # 常见问题
│   │   ├── LeadCapture.tsx        # 选型需求留资表单（私域转化主路径）
│   │   └── Cta.tsx               # 底部行动号召
│   ├── components/
│   │   ├── common/
│   │   │   ├── Reveal.tsx         # 滚动进场动画（IntersectionObserver）
│   │   │   └── SectionHeading.tsx # 区块标题组 + 区块外壳
│   │   ├── layout/
│   │   │   ├── Footer.tsx         # 页脚
│   │   │   └── WechatDock.tsx     # 全站微信私域浮标（二维码弹窗）
│   │   └── ui/                    # shadcn/ui 组件库（40+）
│   ├── lib/
│   │   ├── utils.ts               # 工具函数（cn 等）
│   │   └── analytics.ts           # 轻量埋点（GA4 + 微信 SDK 双通道）
│   └── hooks/                     # 自定义 Hook
├── public/
│   ├── 404.html                   # 自定义 404 页面（深色科技风）
│   └── wechat-qrcode.svg          # 公众号二维码（占位图，需替换）
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
export const pillars = [...]            // 技术能力
export const architectureLayers = [...] // 五层架构
export const products = [...]           // 产品矩阵
export const processRoadmap = [...]     // 工艺路线
export const applications = [...]       // 应用场景
export const ecosystem = [...]          // 生态合作
export const cases = [...]              // 客户案例
export const news = [...]               // 新闻动态
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
  wechatName: "芯智纪元",        // 公众号名称
  wechatId: "xinzhi_era",        // 微信号
  wechatQr: "/wechat-qrcode.svg", // 二维码图片路径
  wecomName: "芯智选型顾问",     // 企业微信名称
}
```

替换 `public/wechat-qrcode.svg` 为真实二维码图片，全站 3 处引用（洞察侧栏、留资表单、浮标弹窗）自动生效。

### 修改配色

品牌色板在 `tailwind.config.js` 的 `theme.extend.colors` 中定义：

```js
cyan:   { 400: "#5ee9ff", 500: "#22d3ee", 600: "#06b6d4" }  // 主色
violet: { 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed" }  // 辅助色
mint:   { 400: "#5eead4", 500: "#2dd4bf" }                  // 点缀色
ink:    { 950: "#04060d", 900: "#070b16", ... }            // 深色底
```

同步修改 `src/index.css` 中 `:root` 的 `--primary` / `--accent` 等 CSS 变量。

### 新增区块

1. 在 `src/sections/` 新建组件并 `export default`
2. 在 `src/App.tsx` 的 `<main>` 中引入并放置
3. 如需加入顶部导航，在 `src/data/site.ts` 的 `nav` 数组追加 `{ id, label, en }`，并保证对应区块的 `id` 一致

### 修改 SEO

编辑 `index.html` 中的 `<title>`、`description`、`og:*`、`twitter:*` 与 `canonical` 标签。favicon 为内联 SVG（芯片标记），无需额外文件。

---

## ✨ 设计特性

- **深色科技风视觉**：深空蓝黑底 + 电光青 / 紫罗兰渐变，电路网格纹理背景
- **纯手绘 SVG 插画**：Hero 芯片主视觉、芯片剖面图、流程图均为原生 SVG，零图片依赖、任意分辨率清晰
- **滚动进场动画**：`Reveal` 组件基于 IntersectionObserver，支持错落延迟
- **导航滚动高亮**：实时跟随视口高亮当前区块
- **数字计数动画**：首屏指标滚动到位后缓动递增
- **交互式架构图**：hover 五层架构，垂直导轨流动光点跟随高亮层
- **私域转化链路**：技术洞察 ↔ 公众号双向导流、工具包勾选留资、表单校验与成功态引导、全站微信浮标
- **零依赖埋点**：GA4 + 微信 JS-SDK 双通道上报，UTM 渠道归因，8 类事件覆盖完整漏斗
- **全响应式**：移动端到宽屏无横向滚动，含移动端抽屉菜单
- **无障碍**：语义化标签、键盘可达、`aria-*` 标注、跳转链接、`prefers-reduced-motion` 降级
- **零外部依赖字体**：使用系统中文字体栈，首屏无第三方字体请求

---

## ⚠️ 免责声明

本站为**演示站点**，页面中的公司名称、产品型号、参数指标、客户案例、合作伙伴与融资信息均为**虚构示例**，仅用于展示前端工程能力与设计实现，不构成任何商业或投资信息。正式使用前请替换 `src/data/site.ts` 中的全部内容及 `index.html` 中的站点信息。

---

## 📄 License

MIT
