/**
 * 全站内容数据源 —— 所有文案与数据集中于此，便于维护与二次编辑。
 * 品牌：芯智纪元 Xinzhi Era —— 半导体人工智能芯片公司（虚构演示站点）
 */

export const brand = {
  name: "芯智纪元",
  nameEn: "XINZHI ERA",
  tagline: "以硅基算力，重塑智能边界",
  desc: "面向 AI 推理与训练场景的端到端芯片架构公司，专注 Chiplet 先进封装、存算一体架构与国产化算力底座。",
  contact: "contact@xinzhi-era.com",
  phone: "+86 755-8899-2077",
  address: "深圳市南山区科技园 芯智大厦 18F",
  /** 微信公众号（私域主阵地） */
  wechatName: "芯智纪元",
  wechatId: "xinzhi_era",
  wechatQr: "/wechat-qrcode.svg",
  /** 企业微信（销售承接） */
  wecomName: "芯智选型顾问",
}

export const nav = [
  { id: "capability", label: "技术能力", en: "Capability" },
  { id: "architecture", label: "芯片架构", en: "Architecture" },
  { id: "product", label: "产品矩阵", en: "Products" },
  { id: "insights", label: "技术洞察", en: "Insights" },
  { id: "process", label: "工艺路线", en: "Process" },
  { id: "ecosystem", label: "生态合作", en: "Ecosystem" },
  { id: "news", label: "动态", en: "News" },
]

export const heroStats = [
  { value: 64, unit: " TOPS", label: "旗舰推理算力", desc: "XZE-N900 单芯 INT8 峰值" },
  { value: 3.2, unit: "W", label: "整机功耗", desc: "8 模组风冷服务器实测" },
  { value: 2.4, unit: "×", label: "能效提升", desc: "对比上代旗舰 SoC" },
  { value: 42, unit: "nm", label: "先进制程节点", desc: "自主可控量产工艺" },
]

export const pillars = [
  {
    id: "chiplet",
    icon: "Cpu",
    title: "Chiplet 先进封装",
    en: "Advanced Chiplet",
    desc: "2.5D/3D 硅通孔与混合键合工艺，打破单片面积与良率天花板，支撑 12 芯粒异构集成。",
    metrics: [
      { k: "互连带宽", v: "4.2 TB/s" },
      { k: "键合精度", v: "< 2 μm" },
      { k: "封装良率", v: "98.6%" },
    ],
  },
  {
    id: "compute-in-memory",
    icon: "MemoryStick",
    title: "存算一体架构",
    en: "Compute-in-Memory",
    desc: "SRAM 计算单元与权重存储深度耦合，消除搬运瓶颈，让 AI 推理能效比数量级提升。",
    metrics: [
      { k: "访存延迟", v: "↓ 70%" },
      { k: "算存比", v: "1 : 32" },
      { k: "宏单元复用", v: "92%" },
    ],
  },
  {
    id: "toolchain",
    icon: "Braces",
    title: "全栈编译工具链",
    en: "AI Compiler Stack",
    desc: "自研图编译器与量化感知训练框架，从 PyTorch 一键落地到目标指令集，量化精度损失低于 0.8%。",
    metrics: [
      { k: "模型覆盖", v: "1,200+" },
      { k: "量化精度损失", v: "< 0.8%" },
      { k: "部署耗时", v: "≤ 5 min" },
    ],
  },
  {
    id: "soc",
    icon: "CircuitBoard",
    title: "全场景 SoC 集成",
    en: "Domain SoC",
    desc: "从云端训练到边缘推理的统一 IP 底座，支持多芯粒异构调度与端云协同推理编排。",
    metrics: [
      { k: "产品型号", v: "12 款" },
      { k: "场景覆盖", v: "6 大" },
      { k: "客户量产", v: "300+" },
    ],
  },
]

export const architectureLayers = [
  {
    id: "l5",
    name: "应用与算法层",
    en: "Application & Algorithm",
    desc: "大模型微调、视觉检测、语音唤醒与具身智能策略的模型资产库。",
    items: ["LLM 推理引擎", "多模态感知", "强化学习策略", "模型蒸馏工具"],
    accent: "violet",
  },
  {
    id: "l4",
    name: "AI 编译与算子层",
    en: "Compiler & Operator",
    desc: "图优化、算子融合、稀疏化与混合精度量化，一套工具链贯通全系芯片。",
    items: ["XZE 编译器", "INT4/INT8 量化", "算子自动调优", "零拷贝推理引擎"],
    accent: "cyan",
  },
  {
    id: "l3",
    name: "芯片指令与驱动层",
    en: "ISA & Runtime",
    desc: "自研 XISA 指令集扩展、异构调度内核与统一运行时，屏蔽底层硬件差异。",
    items: ["XISA 扩展指令", "多核调度器", "零拷贝显存", "设备抽象层"],
    accent: "cyan",
  },
  {
    id: "l2",
    name: "计算与存储芯粒层",
    en: "Compute & Memory Dies",
    desc: "AI 计算芯粒、大 SRAM 存储芯粒、I/O 与高速互联芯粒按需组合。",
    items: ["NPU 计算芯粒", "SPC 存储芯粒", "UCIe 互联", "安全芯粒"],
    accent: "violet",
  },
  {
    id: "l1",
    name: "硅工艺与封装层",
    en: "Silicon & Packaging",
    desc: "自主可控的 42nm 至 12nm 工艺平台与混合键合先进封装产线。",
    items: ["12nm FinFET", "2.5D 中介层", "混合键合", "晶圆级封装"],
    accent: "mint",
  },
]

export const products = [
  {
    id: "n900",
    tag: "旗舰",
    name: "XZE-N900",
    subtitle: "数据中心 AI 推理加速卡",
    spec: "64 TOPS INT8 / 1.5 TB/s HBM / PCIe 5.0",
    desc: "面向大模型推理的主力产品，单卡承载 70B 参数量化模型，配合 8 卡集群实现低延迟服务化。",
    highlights: ["存算一体 NPU", "4.2 TB/s 片间互联", "动态 KV Cache 压缩"],
    color: "cyan",
  },
  {
    id: "e300",
    tag: "边缘",
    name: "XZE-E300",
    subtitle: "边缘智能计算模组",
    spec: "32 TOPS INT8 / 15 W / 产业级 -40~85℃",
    desc: "面向工业质检、智能网关与机器人的紧凑模组，集成安全隔离区，支持端侧模型热更新。",
    highlights: ["车规级安全岛", "离线模型仓库", "宽温工业设计"],
    color: "violet",
  },
  {
    id: "t200",
    tag: "训练",
    name: "XZE-T200",
    subtitle: "智算集群互联加速卡",
    spec: "1.6 TB/s 双向带宽 / 8 卡无损扩展",
    desc: "专注大模型训练与MoE 专家并行通信，通过拓扑感知路由与拥塞控制降低通信开销。",
    highlights: ["拓扑感知路由", "梯度压缩传输", "自适应拥塞控制"],
    color: "mint",
  },
  {
    id: "p100",
    tag: "IP",
    name: "XZE-IP100",
    subtitle: "可授权 Chiplet IP 平台",
    spec: "完整 RTL / SDK / 编译器授权",
    desc: "向芯片设计公司与系统厂商开放 NPU、互联与安全 IP，加速自研 AI 芯片的流片周期。",
    highlights: ["多种工艺节点可移植", "参考设计与量产支持", "长期版本维护"],
    color: "cyan",
  },
]

export const processRoadmap = [
  {
    node: "42nm",
    year: "2024",
    status: "量产",
    desc: "成熟工艺平台大规模出货，覆盖边缘与工业场景，良率与成本双优。",
    features: ["GAA 封装", "8 TOPS NPU", "月产能 12 万片"],
  },
  {
    node: "28nm",
    year: "2025",
    status: "量产",
    desc: "算力密度提升 2.4 倍，配套 2.5D 中介层封装方案正式导入产线。",
    features: ["2.5D 中介层", "24 TOPS NPU", "月产能 18 万片"],
  },
  {
    node: "16nm",
    year: "2026",
    status: "流片",
    desc: "FinFET 工艺平台全流程贯通，首款自研训练加速卡 XZE-T200 完成验证。",
    features: ["FinFET", "UCIe 互联", "MoE 负载调度"],
  },
  {
    node: "12nm",
    year: "2027",
    status: "规划",
    desc: "先进封装与芯粒化设计全面落地，存算一体架构进入大规模商用。",
    features: ["混合键合", "3D 堆叠", "存算一体量产"],
  },
  {
    node: "5nm",
    year: "2028+",
    status: "预研",
    desc: "面向下一代生成式模型的超大规模训练芯片，探索 GAA 与背供电前沿工艺。",
    features: ["GAA", "背供电", "超大规模互连"],
  },
]

export const applications = [
  {
    icon: "Car",
    title: "智能驾驶",
    desc: "多路摄像头感知与决策模型在车端实时运行，端侧推理延迟低于 20ms。",
    metric: "< 20ms 端到端延迟",
  },
  {
    icon: "Bot",
    title: "具身智能",
    desc: "视觉语言动作模型部署于机器人本体，算力与功耗在移动平台上自洽。",
    metric: "15W 移动端推理",
  },
  {
    icon: "Factory",
    title: "工业质检",
    desc: "小样本缺陷检测模型现场训练，产线换型周期从数天缩短至数小时。",
    metric: "检测精度 99.6%",
  },
  {
    icon: "Cloud",
    title: "智算中心",
    desc: "训推一体集群与国产化算力底座兼容，支撑千卡规模大模型训练任务。",
    metric: "千卡集群已验证",
  },
  {
    icon: "ShieldCheck",
    title: "智能安防",
    desc: "多路视频结构化分析在边缘侧完成，敏感数据不出域，隐私合规。",
    metric: "16 路并发分析",
  },
  {
    icon: "Satellite",
    title: "航天遥感",
    desc: "在轨实时图像识别与压缩，星载功耗约束下完成多目标检测。",
    metric: "功耗 -40% 优化",
  },
]

export const ecosystem = [
  {
    role: "晶圆制造",
    partners: ["中芯国际", "华虹宏力", "粤芯半导体"],
    desc: "共建 42nm 至 12nm 工艺平台产能保障与良率联合优化。",
  },
  {
    role: "先进封装",
    partners: ["长电科技", "通富微电", "华天科技"],
    desc: "2.5D/3D 封装与混合键合产线协同，支撑 Chiplet 规模量产。",
  },
  {
    role: "EDA 工具",
    partners: ["华大九天", "概伦电子", "新思科技"],
    desc: "数字与模拟混合设计全流程 EDA 支持，缩短芯粒联合调试周期。",
  },
  {
    role: "整机与集成",
    partners: ["浪潮信息", "新华三", "联想"],
    desc: "服务器、网络与整柜方案联合定义，适配国产化算力中心建设。",
  },
  {
    role: "行业方案商",
    partners: ["海尔卡奥斯", "中车株洲所", "商汤科技"],
    desc: "面向制造、交通与城市治理的联合方案落地与场景共创。",
  },
  {
    role: "基础软件",
    partners: ["麒麟软件", "OpenAnolis", "龙蜥社区"],
    desc: "操作系统、驱动与运行时适配，完成信创全栈兼容性认证。",
  },
]

export const cases = [
  {
    industry: "智能制造",
    title: "某头部汽车集团 智驾域控升级",
    challenge: "原有方案在多路感知场景下算力不足，且功耗难以满足整车热设计约束。",
    solution: "采用 XZE-E300 模组重构感知域，将 7 路视觉任务统一调度到端侧执行。",
    results: [
      { k: "端侧延迟", v: "-58%" },
      { k: "整机功耗", v: "-34%" },
      { k: "量产节点", v: "已 SOP" },
    ],
  },
  {
    industry: "智算中心",
    title: "地方国资智算集群建设",
    challenge: "国产化替代需求下，需要兼容既有模型生态并支撑千卡规模训练。",
    solution: "部署 640 套 XZE-N900 加速卡，配套编译器与调度平台完成模型迁移。",
    results: [
      { k: "迁移周期", v: "3 个月" },
      { k: "集群规模", v: "640 卡" },
      { k: "算力利用率", v: "87%" },
    ],
  },
  {
    industry: "智慧能源",
    title: "电网巡检无人机智能识别",
    challenge: "输电线路缺陷需人工逐段复核，巡检效率与一致性均受限。",
    solution: "部署轻量化视觉模型于机载边缘计算单元，实现实时缺陷分类与回传。",
    results: [
      { k: "复核效率", v: "6.2×" },
      { k: "漏检率", v: "-71%" },
      { k: "单架次覆盖", v: "120 km" },
    ],
  },
]

export const news = [
  {
    date: "2026-10-28",
    category: "产品发布",
    title: "XZE-T200 训练加速卡完成流片验证，首批样片点亮",
    desc: "采用 16nm FinFET 与自研 UCIe 互连，单集群 8 卡无损扩展，MoE 专家并行通信开销下降 31%。",
  },
  {
    date: "2026-09-19",
    category: "技术突破",
    title: "自研存算一体架构实现能效比 2.4 倍提升",
    desc: "计算单元与 SRAM 权重存储深度耦合，推理场景下访存延迟下降 70%，整机功耗降至 3.2W。",
  },
  {
    date: "2026-08-06",
    category: "生态合作",
    title: "与三家封测伙伴签署 Chiplet 联合产能协议",
    desc: "覆盖 2.5D 中介层与混合键合工艺，2026 年内规划月产能 30 万片混合键合产能。",
  },
  {
    date: "2026-07-15",
    category: "公司动态",
    title: "芯智纪元完成 B 轮融资，加速 12nm 产线建设",
    desc: "本轮资金将主要用于 12nm FinFET 工艺平台建设与第三代编译器研发。",
  },
]

export const faqs = [
  {
    q: "芯智纪元的产品与开源芯片方案有什么差异？",
    a: "我们提供的是完整的商业级产品线：包含芯片本体、编译器、驱动与运行时，以及整机和集群方案。开源社区更偏向教学与研究参考设计，我们的量产级产品在工艺、可靠性与长期支持上投入了完整工程资源，同时保持工具链对主流开源框架的开放兼容。",
  },
  {
    q: "迁移现有模型到 XZE 平台的周期大概多久？",
    a: "典型 PyTorch 模型通过 XZE 编译器完成图优化与量化部署，通常在 5 分钟内产出可运行产物。对于需要定制算子或结构化剪枝的复杂模型，经验周期为 2 到 6 周，我们会提供算法工程师全程支持。",
  },
  {
    q: "是否支持国产化操作系统与信创环境？",
    a: "支持。已完成与麒麟、统信等国产操作系统的完整适配认证，并在龙蜥、OpenAnolis 等开源社区提供上游驱动与运行时支持。所有产品均可在纯信创环境下完成训练、部署与运维闭环。",
  },
  {
    q: "芯片的供货与产能如何保障？",
    a: "我们与国内三家主流晶圆厂和封测厂建立了长期产能协议，42nm 与 28nm 平台已进入稳定量产，16nm 处于流片到量产过渡期。每个季度滚动更新产能规划，并为战略客户提供专属产能预留。",
  },
  {
    q: "生态合作与生态合作计划如何申请？",
    a: "您可以通过页脚的合作邮箱提交申请，或直接联系对应业务线的生态负责人。我们会按技术方向、场景互补与量产计划三个维度评估，并在 5 个工作日内给出初步反馈与对接人。",
  },
]

export const footerColumns = [
  {
    title: "产品",
    links: ["XZE-N900 加速卡", "XZE-E300 边缘模组", "XZE-T200 训练卡", "XZE-IP100 IP 授权", "整机与集群方案"],
  },
  {
    title: "技术",
    links: ["Chiplet 先进封装", "存算一体架构", "XZE 编译器", "XISA 指令集", "工艺与路线图"],
  },
  {
    title: "生态",
    links: ["伙伴计划", "开发者社区", "模型迁移支持", "技术白皮书", "校园计划"],
  },
  {
    title: "关于",
    links: ["公司简介", "新闻动态", "加入我们", "媒体报道", "联系与地址"],
  },
]

/* ==========================================================================
   技术洞察 —— 与微信公众号联动的内容区
   内容模型对齐行业头部公众号：认知型 + 决策型内容占主体，
   每篇都附带「可落地的行动建议」，把阅读行为自然导向选型咨询。
   ========================================================================== */

export const insights = [
  {
    id: "glass-substrate",
    date: "2026-10-28",
    category: "先进封装",
    readTime: "12 min",
    title: "玻璃基板被吹成破局点，却困在脆性和良率里",
    summary:
      "英特尔称 TGV 良率突破 95%，而行业原型线卡在 65%。同一个技术、两个口径，中间隔着二十多个百分点——这才是从发布会走到量产机台的真实距离。",
    takeaways: [
      "玻璃解决的是真问题：热膨胀系数 3.2 对硅 2.6，翘曲压到 10μm 以内",
      "四道坎：脆性、TGV 填充、界面应力、检测节拍，全都不是堆时间能过的",
      "现在能做的三件事：索要 TGV 设计规则文档、按单片良品成本算账、跑整叠结构验证",
    ],
    cta: "评估供应商封装路线时，要问的第一个问题是良率报告",
    tags: ["玻璃基板", "TGV", "Chiplet", "良率"],
  },
  {
    id: "tapeout-cost",
    date: "2026-10-15",
    category: "成本结构",
    readTime: "10 min",
    title: "流片失败一次，损失的是多少钱",
    summary:
      "流片约占硬件成本四成，而其中最贵的是掩模版而非晶圆。真正压垮项目的不是那几百万美元，而是随之而来的时间窗口与机会成本。",
    takeaways: [
      "14nm 流一次片约 300 万美元，掩模版按层数计价且不可返工",
      "改一颗晶体管：设计阶段几天几万人，进了掩模版就是几万美金加几个月",
      "降低风险的四层做法：验证充分、仿真收敛、投片预演、锁死工程余量",
    ],
    cta: "首次流片风险已可由保险与补贴分担，但设计阶段必须一次做对",
    tags: ["流片", "掩模版", "成本", "EDA"],
  },
  {
    id: "mcu-vs-fpga",
    date: "2026-09-27",
    category: "选型指南",
    readTime: "8 min",
    title: "MCU 和 FPGA 到底怎么选：一张表说清楚",
    summary:
      "任务性质决定架构。通用控制与顺序逻辑选 MCU，海量并行与硬件级定制选 FPGA，而需要同时兼顾成本与算力的场景，答案往往是 SoC。",
    takeaways: [
      "看实时性：MCU 靠中断与时钟周期，FPGA 延时低到亚微秒级",
      "看可迭代性：硬件级问题在 FPGA 上重构成本远低于 ASIC 回炉",
      "看系统复杂度：CPU + GPU + NPU 集成到单一 SoC 才能同时压住体积与性能",
    ],
    cta: "不确定选哪条路线？把需求发给我们，24 小时内给到选型建议",
    tags: ["MCU", "FPGA", "SoC", "选型"],
  },
  {
    id: "ai-chip-landscape",
    date: "2026-09-08",
    category: "产业格局",
    readTime: "11 min",
    title: "AI 芯片四强路线对比：谁在定义下一代算力",
    summary:
      "从 GPU 通用并行到 TPU 专用矩阵再到 NPU 端侧推理，四条路线并非替代关系。真正的分野在于：谁能把特定场景的能效推到极致。",
    takeaways: [
      "CPU / GPU / TPU / NPU 的差异是数据搬运效率，不是算力绝对值",
      "训练侧的核心矛盾是通信开销，推理侧的核心矛盾是访存带宽",
      "存算一体是绕开搬运瓶颈的架构级解法，能效提升可达一个量级",
    ],
    cta: "算力选型不是追峰值参数，先看你的负载是通信瓶颈还是带宽瓶颈",
    tags: ["GPU", "TPU", "NPU", "存算一体"],
  },
  {
    id: "auto-chip",
    date: "2026-08-20",
    category: "车规芯片",
    readTime: "9 min",
    title: "中央计算架构下，车载芯片方案怎么重新排位",
    summary:
      "从分散 ECU 走向「中央 + 区域」，芯片的角色正从功能单元变成算力节点。功能安全、带宽与热设计三者共同决定新架构的芯片选型逻辑。",
    takeaways: [
      "单车芯片数量超 1700 颗，架构集中化让算力节点设计取代功能堆叠",
      "Chiplet 让功能安全单元与 AI 加速器在同一 SoC 内安全共存",
      "国产 14nm 车规产线良率突破 95%，为域控方案提供第二供应源",
    ],
    cta: "域控算力方案要同时满足功能安全与热约束，欢迎来聊具体工况",
    tags: ["汽车电子", "Chiplet", "RISC-V", "中央计算"],
  },
  {
    id: "supply-risk",
    date: "2026-07-30",
    category: "供应链",
    readTime: "7 min",
    title: "一颗芯片停产的连锁反应，比断供本身更贵",
    summary:
      "替代料不是查一张表那么简单。真正的成本在认证周期、库存策略与二供验证的提前量上，这三件事决定你能否优雅地切换方案。",
    takeaways: [
      "二供导入的核心变量是认证周期，而非技术兼容性",
      "安全库存按在途交期与风险概率测算，而非按历史用量",
      "国产替代的可执行性要用同工艺节点的真实量产数据验证",
    ],
    cta: "需要一份针对你们 BOM 的断供风险评估？我们可以做",
    tags: ["供应链", "替代料", "断供", "国产化"],
  },
]

/* ==========================================================================
   选型工具 —— 免费领取的钩子，是私域留资的核心载体
   ========================================================================== */

export const toolkits = [
  {
    id: "selection-matrix",
    icon: "Table",
    title: "AI 芯片选型对照矩阵",
    desc: "覆盖算力、带宽、功耗、封装、生态、供货六维的 28 款主流芯片横向对比，支持按场景筛选。",
    format: "Excel · 28 款",
    hot: true,
  },
  {
    id: "replacement-list",
    icon: "Replace",
    title: "国产替代料速查清单",
    desc: "按功能分类整理的国产对标型号，标注 PIN 兼容情况、认证状态与已验证产线。",
    format: "PDF · 42 页",
    hot: true,
  },
  {
    id: "tapeout-checklist",
    icon: "ClipboardCheck",
    title: "首次流片自检清单",
    desc: "从 DRC、LVS 到工程余量的 68 项检查点，附每个检查点对应的风险等级与建议责任人。",
    format: "PDF · 18 页",
    hot: false,
  },
  {
    id: "power-budget",
    icon: "Gauge",
    title: "整机功耗预算模板",
    desc: "按模块拆解推理服务器与边缘模组的功耗模型，支持自定义负载率与散热条件测算。",
    format: "Excel · 8 表",
    hot: false,
  },
]

/* ==========================================================================
   留资表单 —— 私域转化的主路径
   ========================================================================== */

export const leadForm = {
  title: "提交选型需求，24 小时内拿到建议",
  desc: "留下场景与约束，我们会匹配同工艺节点的量产方案，并附上替代料与风险评估。此表单同时用于添加工程师微信好友的技术沟通入口。",
  privacy: "提交即表示同意我们通过微信或电话与您联系，信息仅用于技术咨询，不会对外提供。",
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
      placeholder: "如：深圳某某智能科技有限公司",
      required: true,
      type: "text",
    },
    {
      id: "phone",
      label: "手机号",
      placeholder: "用于接收选型建议",
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
      label: "应用场景",
      placeholder: "如：工业质检 / 边缘推理 / 智算集群",
      required: true,
      type: "select",
      options: ["工业质检与机器视觉", "边缘 AI / 智能网关", "智算中心 / 大模型推理", "智能驾驶域控", "智能安防", "其他"],
    },
    {
      id: "demand",
      label: "具体需求",
      placeholder: "如：需要 32TOPS 以上 INT8 算力，功耗不超过 15W，用于 4 路 1080P 视频实时分析",
      required: true,
      type: "textarea",
    },
  ],
  benefits: [
    { icon: "Clock", title: "24 小时响应", desc: "工作日 2 小时内确认需求，24 小时内给到初步方案" },
    { icon: "ShieldCheck", title: "同节点量产方案", desc: "只推荐已量产验证的料号，不做纸面参数承诺" },
    { icon: "Layers", title: "替代料评估", desc: "同步给出国产对标型号与二供导入风险提示" },
  ],
}
