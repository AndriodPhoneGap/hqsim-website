/**
 * 全站内容数据源 —— 所有文案与数据集中于此，便于维护与二次编辑。
 * 品牌：HQSIM 探芯测试 —— AI 芯片探针卡 & 测试座定制专家
 */

import wechatQrAsset from "@/assets/wechat-qrcode.svg"

export const brand = {
  name: "HQSIM 探芯测试",
  nameEn: "PROBE CARD & TEST SOCKET",
  tagline: "以探针精度，触碰每一颗芯片",
  desc: "专注 AI 芯片探针卡与测试座定制服务，支持 QFN / BGA / WLCSP 等封装，一件起订，最快 3 天交付样件。",
  contact: "yuning662008@gmail.com",
  phone: "182-0118-1983",
  address: "北京市 · 探芯测试技术服务",
  /** 微信公众号（私域主阵地） */
  wechatName: "HQSIM 探芯测试",
  wechatId: "abcm-888",
  /** 微信二维码 —— 由 Vite 静态导入，部署到子路径时也能正确加载 */
  wechatQr: wechatQrAsset,
  /** 企业微信（销售承接） */
  wecomName: "HQSIM 探针卡顾问",
  /** 官方站点与代码仓库 */
  site: "https://www.hqsim.com/zh",
  github: "https://github.com/AndriodPhoneGap/HQSIM",
}

export const nav = [
  { id: "capability", label: "核心服务", en: "Services" },
  { id: "architecture", label: "技术能力", en: "Capability" },
  { id: "product", label: "产品中心", en: "Products" },
  { id: "insights", label: "技术资料", en: "Insights" },
  { id: "process", label: "交付流程", en: "Process" },
  { id: "ecosystem", label: "配套生态", en: "Ecosystem" },
  { id: "news", label: "公司动态", en: "News" },
]

export const heroStats = [
  { value: 5, unit: " μm", label: "制造精度", desc: "针位偏差与平面度控制" },
  { value: 3, unit: " 天", label: "样件交付", desc: "紧急打样最快周期" },
  { value: 1, unit: " 件", label: "起订数量", desc: "小批量定制无最小量约束" },
  { value: 20, unit: "+", label: "支持封装", desc: "QFN / BGA / WLCSP 等" },
]

export const pillars = [
  {
    id: "probe-card",
    icon: "Cpu",
    title: "探针卡定制",
    en: "Probe Card Customization",
    desc: "依据客户 PAD Layout 逐针规划针位，从 80μm 高密度 pitch 到大尺寸 die，针位偏差与平面度控制在 ±5μm 以内。",
    metrics: [
      { k: "制造精度", v: "±5 μm" },
      { k: "最小 pitch", v: "80 μm" },
      { k: "单卡针数", v: "5,000+" },
    ],
  },
  {
    id: "test-socket",
    icon: "CircuitBoard",
    title: "测试座供应",
    en: "Test Socket Supply",
    desc: "提供垂直式、翻盖式与组合式测试座，接触力可调至 10–80g，耐温覆盖 -40℃ 至 200℃，支持快速更换与高频插拔。",
    metrics: [
      { k: "接触力", v: "10–80 g" },
      { k: "插拔寿命", v: "10,000 次" },
      { k: "工作温度", v: "-40 ~ 200 ℃" },
    ],
  },
  {
    id: "fast-sample",
    icon: "MemoryStick",
    title: "快速打样交付",
    en: "Rapid Sample Delivery",
    desc: "专人图纸审查 + 全程技术支持并行推进，紧急样件最快 3 天交付，一件起订，不设最小批量门槛。",
    metrics: [
      { k: "打样周期", v: "3 天" },
      { k: "起订量", v: "1 件" },
      { k: "图纸审查", v: "专人 1 对 1" },
    ],
  },
  {
    id: "solution",
    icon: "Braces",
    title: "测试方案咨询",
    en: "Test Solution Consulting",
    desc: "输出探针卡 + 测试座 + 测试 PCB + 分选机夹具的整体配套方案，覆盖 CP 晶圆测试与 FT 成品测试两类场景。",
    metrics: [
      { k: "配套交付", v: "4 件套" },
      { k: "方案输出", v: "≤ 3 天" },
      { k: "技术支持", v: "全流程" },
    ],
  },
]

export const architectureLayers = [
  {
    id: "l1",
    name: "需求与图纸审查",
    en: "Layout Review",
    desc: "基于客户提供的 PAD Layout 与封装信息，确认探针位规划、pitch 分布与工艺可达性边界。",
    items: ["PAD Layout 解析", "探针位规划", "焊盘可达性检查", "划片道避让"],
    accent: "cyan",
  },
  {
    id: "l2",
    name: "机械设计与布局",
    en: "Mechanical & Layout",
    desc: "在有限探针高度内完成针位避让、结构公差链与测试 PCB 的协同排布。",
    items: ["针位避让算法", "PCB 阻抗控制", "高度公差链核算", "结构 3D 校核"],
    accent: "violet",
  },
  {
    id: "l3",
    name: "针体与材料工艺",
    en: "Probe & Material",
    desc: "针体材料、镀层与针型直接决定接触电阻、插损与高温稳定性。",
    items: ["铍铜 / 磷青铜针体", "Ni-Au 镀层", "刀锋型针尖", "MEMS 探针工艺"],
    accent: "mint",
  },
  {
    id: "l4",
    name: "组装与夹具配套",
    en: "Assembly & Fixture",
    desc: "探针卡与测试座、测试 PCB、分选机夹具按同一坐标系装配，避免累积偏差。",
    items: ["陶瓷 / PCB 基板", "测试座装配", "测试板 PCB", "分选机夹具"],
    accent: "cyan",
  },
  {
    id: "l5",
    name: "测试验证与交付",
    en: "Validation & Delivery",
    desc: "在 CP 与 FT 两类场景完成坐标校正、良率验证与样件交付，附完整测试记录。",
    items: ["CP 晶圆测试", "FT 成品测试", "坐标校正", "可靠性复测"],
    accent: "violet",
  },
]

export const products = [
  {
    id: "pc-standard",
    tag: "标准",
    name: "HQ-PC 标准探针卡",
    subtitle: "按 PAD Layout 逐针定制的常规单层探针卡",
    spec: "Pitch 100–800 μm / 针数 500–3,000 / ±5 μm",
    desc: "面向 QFN、QFP、CSP 等引脚类封装的常规打样需求，一件起订，交付含针位坐标表与接触电阻抽检记录。",
    highlights: ["针位偏差 ±5 μm", "平面度可控", "含坐标校正表"],
    color: "cyan",
  },
  {
    id: "pc-hd",
    tag: "高密度",
    name: "HQ-PC HD 大尺寸探针卡",
    subtitle: "面向大 die 与高引脚数 AI 芯片的高密度方案",
    spec: "Pitch 80 μm / 针数 5,000+ / Die ≤ 25 mm",
    desc: "针对大尺寸 AI 芯片的翘曲与平面度难题，采用多层 PCB 叠层与分段针位补偿，抑制大 die 边缘的接触失效。",
    highlights: ["80 μm 高密度 pitch", "大 die 翘曲补偿", "MEMS / 悬空针可选"],
    color: "violet",
  },
  {
    id: "socket",
    tag: "测试座",
    name: "HQ-SK 垂直测试座",
    subtitle: "晶圆测试与成品测试通用 socket",
    spec: "插拔 10,000 次 / 接触力 10–80 g / ≤200 ℃",
    desc: "垂直式结构配可更换金属框，支持高温测试与快速更换，适配 BGA、LGA、WLCSP 等无引脚封装。",
    highlights: ["高温耐久框架", "快速更换机构", "低接触电阻"],
    color: "mint",
  },
  {
    id: "solution",
    tag: "方案",
    name: "HQ-SOL 一站式测试方案",
    subtitle: "探针卡 + 测试座 + 测试 PCB + 夹具整体交付",
    spec: "4 件套 / 专人图纸审查 / 全流程技术支持",
    desc: "把分散采购的测试硬件整合为一套可上机的方案，覆盖 CP 晶圆测试与 FT 成品测试，避免多供应商接口对不齐。",
    highlights: ["统一坐标系", "CP / FT 双场景", "调试与可靠性验证"],
    color: "cyan",
  },
]

export const processRoadmap = [
  {
    node: "图纸审查",
    year: "1 天",
    status: "量产",
    desc: "收到 PAD Layout 与封装信息后完成针位规划与可达性审查，当天给出可制造性意见与初步方案。",
    features: ["PAD 解析", "针位规划", "DFM 反馈"],
  },
  {
    node: "结构设计",
    year: "2 天",
    status: "规划",
    desc: "机械结构与探针 PCB 布局并行推进，高度公差链与避让算法持续优化中，逐版收敛结构风险。",
    features: ["结构 3D 校核", "避让算法", "阻抗设计"],
  },
  {
    node: "打样制作",
    year: "3 天",
    status: "流片",
    desc: "针体加工、镀层与基板装配在自有工艺线上完成，紧急单最快 3 天出样，附针位坐标与接触电阻抽检。",
    features: ["3 天出样", "针位坐标表", "接触电阻抽检"],
  },
  {
    node: "可靠性验证",
    year: "5 天",
    status: "预研",
    desc: "高温、插拔与寿命等验证方法与判据持续预研与建库，按客户工况组合应力项，输出验证报告。",
    features: ["高温验证", "插拔寿命", "应力项组合"],
  },
  {
    node: "批量交付",
    year: "持续",
    status: "量产",
    desc: "样件通过后转入稳定批量交付，坐标一致性、良率与交期纳入常规管控，支持版本迭代与追溯。",
    features: ["坐标一致性", "交期管控", "版本追溯"],
  },
]

export const applications = [
  {
    icon: "Bot",
    title: "AI 芯片初创公司",
    desc: "回片后需要在 CP 阶段快速筛出良率，但小批量定制探针卡门槛高、周期长。",
    metric: "1 件起订打样",
  },
  {
    icon: "Satellite",
    title: "高校与研究实验室",
    desc: "缺少完整 ATE 与测试经验，需要低成本、可复现的封装级测试方案与现场支持。",
    metric: "3 天拿到样件",
  },
  {
    icon: "Cloud",
    title: "流片方案 / MPW 公司",
    desc: "同一批次多客户共卡，要求坐标一致、良率可追溯的统一测试方案与来料复测。",
    metric: "±5 μm 坐标一致",
  },
  {
    icon: "Factory",
    title: "封测厂",
    desc: "大批量 FT 测试需要测试座高寿命、快更换，并覆盖多种封装形态与来料批次。",
    metric: "插拔 10,000 次",
  },
  {
    icon: "ShieldCheck",
    title: "功率器件厂商",
    desc: "高压大电流焊盘要求低接触电阻与高耐温方案，含高温老化与绝缘验证。",
    metric: "≤ 200 ℃ 高温",
  },
  {
    icon: "Car",
    title: "汽车电子厂商",
    desc: "车规测试要求高温与三温验证，探针卡材料与镀层需满足 AEC-Q 系列的可靠性要求。",
    metric: "三温 + 高温 FT",
  },
]

export const ecosystem = [
  {
    role: "测试设备厂商",
    partners: ["主流 ATE 测试机", "晶圆探针台", "分选机与 handler"],
    desc: "与主流 ATE 与探针台生态做接口与坐标体系对齐，确保探针卡在既有机台上直接可用。",
  },
  {
    role: "封测与量产服务",
    partners: ["头部封测厂", "第三方测试服务商", "来料复测服务"],
    desc: "面向量产测试环节提供测试座、备件与快速更换方案，缩短换型与维护停机时间。",
  },
  {
    role: "芯片设计公司",
    partners: ["AI 芯片初创团队", "Fabless 设计公司", "IP 与 Chiplet 提供商"],
    desc: "从后端设计阶段介入，复核焊盘与探针规划的可制造性，减少流片后返工。",
  },
  {
    role: "高校与研究机构",
    partners: ["高校微电子实验室", "封装与测试课程", "公共测试平台"],
    desc: "提供教学与实验级方案，含样件复用、实验指导与低成本封装测试支持。",
  },
  {
    role: "EDA 工具",
    partners: ["Cadence / Synopsys", "DFT 与仿真工具链", "封装仿真工具"],
    desc: "与仿真、DFT 及封装仿真流程对接，校核焊盘定义、探针可达性与测试覆盖率。",
  },
  {
    role: "材料与针体供应",
    partners: ["铍铜 / 磷青铜针材", "陶瓷与覆铜板基板", "贵金属镀液"],
    desc: "稳定针体材料与镀层供应批次一致性，把接触电阻与高温漂移控制在设计窗口内。",
  },
]

export const cases = [
  {
    industry: "AI 芯片初创",
    title: "某 AI 推理芯片初创公司的小批量探针卡打样",
    challenge:
      "首轮流片回片后需要立即做 CP 摸底，但主流探针卡厂商普遍要求 50–100 片起订、周期 4 周以上；小批量无法被接单。",
    solution:
      "按其 12×12 mm QFN 封装与 PAD Layout 定制单层探针卡，pitch 150μm、针数 1,200，含焊盘可达性审查与划片道避让。",
    results: [
      { k: "起订量", v: "50 → 1 件" },
      { k: "样件周期", v: "4 周 → 3 天" },
      { k: "针位偏差", v: "±5 μm" },
    ],
  },
  {
    industry: "高校实验室",
    title: "某高校微电子实验室的封装测试能力搭建",
    challenge:
      "实验室只有半自动探针台，缺 ATE 与探针卡经验，WLCSP 器件无法完成有效接触测试，学生实验难以复现。",
    solution:
      "提供 WLCSP 探针卡 + 适配夹具的一整套方案，含针位坐标表、接触调试指导与两轮线上技术支持。",
    results: [
      { k: "样件获取", v: "3 天" },
      { k: "调试周期", v: "缩短 50%" },
      { k: "可测封装", v: "6 类" },
    ],
  },
  {
    industry: "流片方案",
    title: "某共享流片方案公司的多客户共卡测试",
    challenge:
      "同一批次包含多个设计，焊盘排布各异且交付窗口紧，测试方案不一致导致复测数据无法横向对比。",
    solution:
      "为该批次统一针位规划与坐标系，按各设计单独出坐标表并做来料复测，交付含良率记录的样件与坐标基准。",
    results: [
      { k: "坐标一致性", v: "±5 μm" },
      { k: "复测可比性", v: "100%" },
      { k: "交付节奏", v: "按批次滚动" },
    ],
  },
]

export const news = [
  {
    date: "2026-10-30",
    category: "产品发布",
    title: "HQ-PC HD 大尺寸探针卡完成首批交付",
    desc: "面向 25mm 级大 die 的高密度方案正式量产，采用多层 PCB 叠层与分段针位补偿，pitch 下探至 80μm。",
  },
  {
    date: "2026-10-12",
    category: "快速交付",
    title: "单笔紧急样件实现 3 天交付记录",
    desc: "某 AI 芯片初创的 1,200 针 QFN 探针卡从图纸审查到样件出库仅用 3 天，含针位坐标表与接触电阻抽检记录。",
  },
  {
    date: "2026-09-18",
    category: "能力扩展",
    title: "封装支持范围扩展至 SON / CSP / DFN 等 20+ 类型",
    desc: "新增 SON、CSP、DFN 等封装形式的针型与结构方案，配套封装类型对照表同步更新并可对外领取。",
  },
  {
    date: "2026-08-25",
    category: "技术资料",
    title: "《探针卡设计规则速查》与《可靠性测试项目清单》上线",
    desc: "把针位避让、高度公差链与高温插拔验证等工程经验整理为结构化资料，在官网与公众号同步提供下载。",
  },
]

export const faqs = [
  {
    q: "最小起订量是多少？单件也能做吗？",
    a: "可以。探针卡与测试座均支持 1 件起订，这也是我们主要服务 AI 芯片初创团队的原因。常规打样从图纸审查到样件交付最快 3 天，不设最小批量门槛；量产订单另行按良率与交期排产。",
  },
  {
    q: "打样和批量交付分别需要多久？",
    a: "紧急单最快 3 天交付样件，含针位坐标表与接触电阻抽检记录；完整验证（含高温、插拔与可靠性项）通常 5–10 个工作日。批量交付按坐标一致性与良率管控，版本可追溯。",
  },
  {
    q: "支持哪些封装类型？",
    a: "常见封装基本覆盖：QFN / DFN、QFP、BGA、LGA、WLCSP、CSP、SON 等 20 余种类型，涉及 80μm 至 800μm 的 pitch 区间。特殊封装（如陶瓷封装、非标异形焊盘）可提交 PAD Layout 后由工程师评估确认。",
  },
  {
    q: "你们需要客户提供什么资料？资料会保密吗？",
    a: "至少需要三项：PAD Layout 文件（含焊盘坐标与层信息）、封装外形与尺寸图、以及测试场景说明（CP 或 FT、探针台或分选机型号、是否有高温与三温要求）。资料齐全时，图纸审查当天可完成。所有资料按保密件管理，仅用于本次方案评估与制造，不用于其他用途。",
  },
  {
    q: "精度如何保证？价格怎么算？",
    a: "针位偏差与平面度控制在 ±5μm 以内，交付时随样件提供针位坐标表与接触电阻抽检数据；需要高温或车规工况的方案可追加 200℃ 高温测试与插拔寿命验证。报价按封装形式、pitch、针数、针型与结构复杂度（单层 / 悬空 / MEMS）拆分，样件与批量价格口径不同，收到资料后 1 个工作日内给出明细。",
  },
]

export const footerColumns = [
  {
    title: "产品中心",
    links: ["HQ-PC 标准探针卡", "HQ-PC HD 大尺寸探针卡", "HQ-SK 垂直测试座", "HQ-SOL 一站式测试方案", "封装类型对照表"],
  },
  {
    title: "服务方案",
    links: ["探针卡定制服务", "测试座供应", "紧急打样与快速交付", "测试方案咨询", "可靠性验证与复测"],
  },
  {
    title: "技术资料",
    links: ["探针卡设计规则速查", "测试方案需求表", "可靠性测试项目清单", "技术洞察文章", "封装与工艺说明"],
  },
  {
    title: "关于我们",
    links: ["公司简介", "公司动态", "交付流程", "配套生态", "联系方式与地址"],
  },
]

/* ==========================================================================
   技术洞察 —— 与微信公众号联动的内容区
   内容模型对齐行业头部公众号：认知型 + 决策型内容占主体，
   每篇都附带「可落地的行动建议」，把阅读行为自然导向定制咨询。
   ========================================================================== */

export const insights = [
  {
    id: "one-piece-moq",
    date: "2026-10-30",
    category: "行业观察",
    readTime: "12 min",
    title: "探针卡为什么一件起订就能做：AI 芯片初创的现实困境",
    summary:
      "探针卡行业默认 50 片起订、单笔数万元、周期 4 周起步，这套规则在 AI 芯片初创面前几乎等于一堵墙。真正卡住项目的不是成本，而是「凑单」这件事本身。",
    takeaways: [
      "起订量来自备料经济性：针体材料、陶瓷基板与 PCB 都是按批采购，小批量会被摊到极高单价",
      "周期被排产队列锁死：主流厂商把打样单排在量产单之后，4 周是乐观值",
      "小批量可行的路径是工艺收敛：用通用针型 + 标准 PCB 基材替代全定制，把差异只留在针位规划上",
    ],
    cta: "小批量打样被排产挡住时，先确认对方是否愿意做工艺收敛，而不是先谈价格",
    tags: ["探针卡", "起订量", "小批量", "AI 芯片"],
  },
  {
    id: "large-die-probe",
    date: "2026-10-16",
    category: "工程实践",
    readTime: "13 min",
    title: "大尺寸 AI 芯片 die，探针卡设计真正难在哪",
    summary:
      "大 die 的难点不在针数，而在平面度。die 尺寸超过 20mm 后，晶圆翘曲与探针受力叠加，边缘焊盘的接触失效往往先于中部出现。",
    takeaways: [
      "平面度是几何问题：针体高度公差链与基板平面度叠加，误差会直接吃掉 overdrive 余量",
      "边缘针位是失效高发区：die 翘曲导致边缘抬起，需要分段针长或接触力补偿策略",
      "结构冗余是必要成本：多层 PCB 叠层与参考针设计会增加复杂度，但换取的是可重复的校正模型",
    ],
    cta: "评估大 die 探针卡方案时，先问平面度怎么测、怎么补，再问报价",
    tags: ["大尺寸 die", "平面度", "翘曲", "针位补偿"],
  },
  {
    id: "socket-selection",
    date: "2026-09-25",
    category: "选型指南",
    readTime: "10 min",
    title: "测试座选型：垂直式、翻盖式与组合式怎么选",
    summary:
      "测试座没有通用最优解。封装形式、测试温度、插拔频次与更换速度四个变量，基本决定了该往哪个结构上靠。",
    takeaways: [
      "垂直式：结构简单、接触力稳定，适合高温与高频插拔，但更换样品需要整机开盖",
      "翻盖式：换型快、适合小批量多品种，代价是长期高温下铰链与压合机构的热变形",
      "组合式：兼顾更换速度与耐久度，成本最高，适合量产线的主力工位",
    ],
    cta: "选座之前先把「一天换几次样品、最高多少度」这两个数定下来",
    tags: ["测试座", "socket", "选型", "高温测试"],
  },
  {
    id: "pad-to-sample",
    date: "2026-09-06",
    category: "流程拆解",
    readTime: "11 min",
    title: "从 PAD Layout 到样件：中间会踩的七个坑",
    summary:
      "真正耗时往往不在加工，而在两端：前面的图纸理解偏差，和后面的坐标对不上。这七处是探针卡交付周期被拉长的主要原因。",
    takeaways: [
      "焊盘定义不清：阻焊开窗与实际焊盘的偏差，会直接变成针位偏心",
      "划片道与钝化桥未标注：探针落在划片道上会批量报废，坐标基准不统一也会让校正无解",
      "电源地焊盘热容差异：未标注散热大焊盘，容易被当成普通信号焊盘处理",
    ],
    cta: "发资料时把封装图、划片道标注与基准点一起给，能省掉一轮来回",
    tags: ["PAD Layout", "打样", "图纸审查", "避让"],
  },
  {
    id: "high-temp-material",
    date: "2026-08-20",
    category: "材料工艺",
    readTime: "9 min",
    title: "高温测试对探针材料与镀层到底意味着什么",
    summary:
      "200℃ 环境下，探针材料的热膨胀、镀层扩散与接触电阻漂移会同时出现。这三项指标决定了探针卡能不能进高温测试机台。",
    takeaways: [
      "铍铜与磷青铜的选择看温度与循环次数：高温长周期更依赖疲劳寿命而非初始硬度",
      "镀层不是越厚越好：Au/Ni/Au 的厚度直接影响接触电阻与高温下的元素互扩散",
      "高温测试要连同 PCB 与夹具一起看：只有探针耐高温而基板不耐温，整卡依旧失效",
    ],
    cta: "高温需求下单独立项，先确认整套卡（含 PCB 与夹具）的耐温边界",
    tags: ["高温测试", "铍铜", "镀层", "接触电阻"],
  },
  {
    id: "cp-vs-ft",
    date: "2026-07-28",
    category: "流程对比",
    readTime: "8 min",
    title: "CP 晶圆测试与 FT 成品测试，测试座方案差在哪",
    summary:
      "同一颗芯片，晶圆上测和封装后测用的是完全不同的两套硬件。需求场景不同，选错测试座会直接推高单颗测试成本。",
    takeaways: [
      "CP 关注的是良率分布与坐标定位，探针台接口与快速换片是优先项",
      "FT 关注的是成品可靠性与高温三温，测试座的热设计与插拔寿命是优先项",
      "同一客户常常两边都要：分选机接口、坐标基准与数据追溯格式需要提前统一",
    ],
    cta: "同时做 CP 与 FT 的项目，先把两套方案的坐标系与数据格式对齐再下单",
    tags: ["CP", "FT", "晶圆测试", "成品测试"],
  },
]

/* ==========================================================================
   选型工具 —— 免费领取的钩子，是私域留资的核心载体
   ========================================================================== */

export const toolkits = [
  {
    id: "package-matrix",
    icon: "Table",
    title: "封装类型对照表",
    desc: "整理 20 余种封装的典型 pitch、焊盘尺寸、对应针型与适配测试座结构，附选型注意事项。",
    format: "Excel · 6 表",
    hot: true,
  },
  {
    id: "design-rules",
    icon: "Replace",
    title: "探针卡设计规则速查",
    desc: "针位避让、划片道禁区、高度公差链与 overdrive 取值等工程规则清单，按环节排列可直接对照。",
    format: "PDF · 14 页",
    hot: true,
  },
  {
    id: "requirement-sheet",
    icon: "ClipboardCheck",
    title: "测试方案需求表",
    desc: "客户填写用表单，覆盖封装信息、PAD 资料、测试场景与温度要求，填完即可进入方案评估。",
    format: "Excel · 2 表",
    hot: false,
  },
  {
    id: "reliability-list",
    icon: "Gauge",
    title: "可靠性测试项目清单",
    desc: "高温、插拔、寿命与绝缘等验证项目清单，含判据说明与推荐应力组合方式。",
    format: "PDF · 9 页",
    hot: false,
  },
]

/* ==========================================================================
   留资表单 —— 私域转化的主路径
   ========================================================================== */

export const leadForm = {
  title: "提交封装信息，3 天内拿到方案与报价",
  desc: "留下封装与测试场景信息，我们会基于你的 PAD Layout 出针位规划建议、交付周期与报价口径。此表单同时用于添加工程师微信好友的技术沟通入口。",
  privacy: "提交即表示同意我们通过微信或电话与您联系，信息仅用于技术咨询与方案评估，不会对外提供。",
  fields: [
    {
      id: "name",
      label: "称呼",
      placeholder: "如：王工",
      required: true,
      type: "text",
    },
    {
      id: "company",
      label: "公司名称",
      placeholder: "如：某 AI 芯片设计公司",
      required: true,
      type: "text",
    },
    {
      id: "phone",
      label: "手机号",
      placeholder: "用于接收方案与报价",
      required: true,
      type: "tel",
    },
    {
      id: "wechat",
      label: "微信号",
      placeholder: "选填，方便我们添加好友",
      required: false,
      type: "text",
    },
    {
      id: "scene",
      label: "封装类型",
      placeholder: "如：QFN 12×12 mm / BGA 0.4 mm pitch",
      required: true,
      type: "select",
      options: ["QFN / DFN", "QFP", "BGA", "LGA", "WLCSP", "CSP / SON", "其他封装"],
    },
    {
      id: "demand",
      label: "需求描述",
      placeholder: "如：QFN 12×12 mm，pitch 150μm，约 1200 针，CP 晶圆测试，需要 3 天样件；请附 PAD Layout",
      required: true,
      type: "textarea",
    },
  ],
  benefits: [
    { icon: "Clock", title: "3 天快速交付", desc: "紧急样件最快 3 天出图，含针位坐标表与接触电阻抽检记录" },
    { icon: "ClipboardCheck", title: "实物 PAD 图纸审查", desc: "按你提供的 PAD Layout 做针位规划与可达性审查，当天反馈" },
    { icon: "Layers", title: "一站式配套方案", desc: "探针卡、测试座、测试 PCB 与夹具统一坐标系交付" },
  ],
}
