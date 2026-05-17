# 课程交互组件清单 INTERACTIVE_MAP

> 本文件记录所有"用纯文字描述但可以用交互组件更直观展示"的位置，按模块整理，供前端实现参考。
> 生成时间：2026-05-17

---

## 模块 00：课程介绍与学习说明

### [00-01] 课程整体路线图

- **所在章节**：00.2 课程整体路线图
- **当前文字描述**：用 ASCII art 绘制的五阶段纵向流程，从"零基础"到"拿到第一份功能测试工作"，共列出 10 个模块。
- **建议组件类型**：`timeline`
- **组件内容/数据**：

```json
{
  "type": "timeline",
  "title": "课程学习路线图",
  "items": [
    {
      "stage": "阶段一：打地基",
      "color": "#6B7280",
      "modules": [
        { "id": "01", "name": "计算机基础扫盲", "desc": "环境 / 前后端 / 接口的概念" },
        { "id": "02", "name": "行业认知与岗位理解", "desc": "测试是什么 / 每天干什么" }
      ]
    },
    {
      "stage": "阶段二：核心技能",
      "color": "#3B82F6",
      "modules": [
        { "id": "03", "name": "软件测试流程与团队协作", "desc": "完整生命周期 + 敏捷工作法" },
        { "id": "04", "name": "功能测试核心方法", "desc": "需求拆解 + 四大用例设计方法" },
        { "id": "05", "name": "Bug 管理与测试输出", "desc": "Bug 单 + 测试报告" }
      ]
    },
    {
      "stage": "阶段三：工具提升",
      "color": "#8B5CF6",
      "modules": [
        { "id": "06", "name": "接口测试入门", "desc": "Postman + 前后端联调思路" },
        { "id": "07", "name": "测试工具基础", "desc": "JIRA / 禅道 / F12 / MySQL / Linux / AI 辅助" }
      ]
    },
    {
      "stage": "阶段四：实战串联",
      "color": "#F59E0B",
      "modules": [
        { "id": "08", "name": "企业级实战项目", "desc": "从需求到报告的完整交付" }
      ]
    },
    {
      "stage": "阶段五：求职落地",
      "color": "#10B981",
      "modules": [
        { "id": "09", "name": "求职转型与面试准备", "desc": "简历 + 面试 + 甲方 vs 外包" },
        { "id": "10", "name": "入职与成长", "desc": "30 天落地指南 + 职业进阶路径" }
      ]
    }
  ],
  "start_label": "零基础",
  "end_label": "拿到第一份功能测试工作"
}
```

---

### [00-02] 学习节奏安排

- **所在章节**：00.2 课程整体路线图（建议学习节奏部分）
- **当前文字描述**：6 条文字列表，描述全职学习情况下每周应完成的模块。
- **建议组件类型**：`checklist`
- **组件内容/数据**：

```json
{
  "type": "checklist",
  "title": "6 周学习计划（全职）",
  "description": "勾选已完成的周次，跟踪学习进度",
  "items": [
    { "week": "第 1 周", "content": "模块 01-02：建立认知框架", "tag": "认知" },
    { "week": "第 2 周", "content": "模块 03-05 前半段：测试流程 + 用例设计方法精读", "tag": "核心技能" },
    { "week": "第 3 周", "content": "模块 03-05 后半段：Bug 管理 + 每天手写用例练手", "tag": "核心技能" },
    { "week": "第 4 周", "content": "模块 06-07：Postman、F12、MySQL、Linux 工具上手实操", "tag": "工具" },
    { "week": "第 5 周", "content": "模块 08：完成完整项目实战作品", "tag": "实战" },
    { "week": "第 6 周", "content": "模块 09-10：打磨简历，准备投递", "tag": "求职" }
  ]
}
```

---

### [00-03] 成果物对应表

- **所在章节**：00.3 学习方法与成果物说明
- **当前文字描述**：一张 Markdown 表格，列出各模块对应的核心成果物。
- **建议组件类型**：`checklist`
- **组件内容/数据**：

```json
{
  "type": "checklist",
  "title": "作品集成果物清单",
  "description": "每完成一个成果物即勾选，全部完成后你的求职作品集就准备好了",
  "items": [
    { "module": "模块 01", "artifact": "基础认知概念图", "hint": "前后端/接口/环境关系图" },
    { "module": "模块 02", "artifact": "岗位理解笔记", "hint": "测试岗每天做什么、与谁协作" },
    { "module": "模块 03", "artifact": "测试流程图", "hint": "从需求评审到上线的完整流程" },
    { "module": "模块 04", "artifact": "需求测试点清单 + 测试用例文档", "hint": "至少 20 条用四大方法编写的用例" },
    { "module": "模块 05", "artifact": "标准 Bug 单 + 简版测试报告", "hint": "含 P0-P3 各一条示例" },
    { "module": "模块 06", "artifact": "接口测试练习记录", "hint": "Postman 发送截图 + 响应分析" },
    { "module": "模块 07", "artifact": "工具使用练习记录", "hint": "F12/MySQL/Linux 操作截图" },
    { "module": "模块 08", "artifact": "完整项目：用例集 + Bug 集 + 测试报告 + 面试介绍稿", "hint": "可直接放进简历的作品" },
    { "module": "模块 09", "artifact": "转型简历初稿 + 面试项目介绍稿", "hint": "用 STAR 法则写项目经验" }
  ]
}
```

---

## 模块 01：测试前的计算机基础扫盲

### [01-01] 三大环境关系

- **所在章节**：01.4 测试环境、生产环境、提测、上线是什么
- **当前文字描述**：一行 ASCII 文字 `开发环境（dev）→ 提测 → 测试环境（test）→ 上线 → 生产环境（prod）`，描述三个环境的流转关系。
- **建议组件类型**：`flowchart`
- **组件内容/数据**：

```json
{
  "type": "flowchart",
  "title": "软件发布环境流转图",
  "nodes": [
    { "id": "dev", "label": "开发环境\n(Development)", "sublabel": "开发在本地写代码、自测", "color": "#6B7280", "icon": "💻" },
    { "id": "qa",  "label": "测试环境\n(Test / Staging)", "sublabel": "测试人员在此执行所有测试", "color": "#3B82F6", "icon": "🔍" },
    { "id": "prod","label": "生产环境\n(Production)", "sublabel": "真实用户正在使用的系统", "color": "#10B981", "icon": "🚀" }
  ],
  "edges": [
    { "from": "dev", "to": "qa", "label": "提测\n（开发自测通过后部署到测试环境）" },
    { "from": "qa", "to": "prod", "label": "上线 / 发布\n（测试报告通过后部署到生产环境）" }
  ],
  "warnings": [
    { "node": "prod", "text": "⚠️ 千万不要在生产环境随意操作！" }
  ]
}
```

---

### [01-02] 前后端架构类比

- **所在章节**：01.3 什么是前端、后端、服务器、数据库、接口
- **当前文字描述**：一张用"点外卖"类比技术架构的表格，列出前端/后端/服务器/数据库/接口的类比说明。
- **建议组件类型**：`comparison`
- **组件内容/数据**：

```json
{
  "type": "comparison",
  "title": "用"点外卖"理解技术架构",
  "subtitle": "点击每个概念，查看测试人员需要关注的内容",
  "items": [
    {
      "concept": "前端（Frontend）",
      "analogy": "外卖 APP 界面",
      "tech": "HTML / CSS / JavaScript",
      "tester_focus": "页面显示是否正确？交互是否响应？提示文案是否准确？"
    },
    {
      "concept": "后端（Backend）",
      "analogy": "厨房 + 厨师",
      "tech": "Java / Python / Go",
      "tester_focus": "业务逻辑是否正确？数据处理有无错误？边界条件是否处理？"
    },
    {
      "concept": "服务器（Server）",
      "analogy": "餐厅建筑本身",
      "tech": "Linux 主机",
      "tester_focus": "日志在哪里？服务有没有挂？报错信息是什么？"
    },
    {
      "concept": "数据库（Database）",
      "analogy": "仓库 / 冰箱",
      "tech": "MySQL / PostgreSQL",
      "tester_focus": "数据真的存进去了吗？有没有脏数据？"
    },
    {
      "concept": "接口（API）",
      "analogy": "传菜窗口",
      "tech": "HTTP / REST",
      "tester_focus": "请求参数对吗？返回数据格式对吗？异常情况有没有合理提示？"
    }
  ]
}
```

---

### [01-03] 常见概念辨析

- **所在章节**：01.2 什么是账号、密码、验证码、缓存、日志
- **当前文字描述**：用文字分别解释账号、密码、验证码、缓存、日志五个概念及测试关注点。
- **建议组件类型**：`mindmap`
- **组件内容/数据**：

```json
{
  "type": "mindmap",
  "title": "测试人员必懂的五个核心概念",
  "root": "日常测试高频概念",
  "branches": [
    {
      "name": "账号",
      "children": ["唯一标识用户", "维护测试账号列表", "多角色账号准备（管理员/普通用户）"]
    },
    {
      "name": "密码",
      "children": ["长度限制（最小/最大位数）", "字符限制（特殊符号）", "加密传输（不能明文）", "错误次数锁定"]
    },
    {
      "name": "验证码",
      "children": ["短信验证码（5分钟时效）", "过期后不可复用", "同一号码频率限制", "图形验证码防机器人"]
    },
    {
      "name": "缓存",
      "children": ["改了配置但页面显示旧的", "清缓存后 Bug 消失 → 缓存引发", "Ctrl+Shift+Delete 清浏览器缓存"]
    },
    {
      "name": "日志",
      "children": ["前端日志：F12 Console", "后端日志：Linux 服务器", "提 Bug 时附上日志截图"]
    }
  ]
}
```

---

## 模块 02：软件测试行业认知与岗位理解

### [02-01] 测试分类体系

- **所在章节**：02.3 软件测试的常见分类
- **当前文字描述**：三个维度（按阶段/按代码可见度/按质量属性）分别用列表列出测试类型，共 10 种测试。
- **建议组件类型**：`mindmap`
- **组件内容/数据**：

```json
{
  "type": "mindmap",
  "title": "软件测试分类全图",
  "root": "软件测试",
  "branches": [
    {
      "name": "按测试阶段",
      "children": [
        "单元测试（开发自己做）",
        "集成测试（模块间接口）",
        "系统测试（测试工程师日常核心）★",
        "验收测试（UAT，上线前）"
      ]
    },
    {
      "name": "按代码可见度",
      "children": [
        "黑盒测试（不看代码，看输入输出）★ 本课重点",
        "白盒测试（看代码逻辑，需编程能力）",
        "灰盒测试（结合界面 + 接口/数据）"
      ]
    },
    {
      "name": "按质量属性",
      "children": [
        "功能测试（能不能用）",
        "性能测试（快不快/稳不稳）",
        "安全测试（抵抗攻击）",
        "兼容性测试（多设备/浏览器）"
      ]
    }
  ]
}
```

---

### [02-02] 黑盒 vs 白盒对比

- **所在章节**：02.3 软件测试的常见分类（维度二）
- **当前文字描述**：在列表中分别描述黑盒和白盒测试的定义，无直观对比。
- **建议组件类型**：`comparison`
- **组件内容/数据**：

```json
{
  "type": "comparison",
  "title": "黑盒测试 vs 白盒测试",
  "layout": "side-by-side",
  "left": {
    "name": "黑盒测试（Black-box）",
    "badge": "本课程重点",
    "badge_color": "#3B82F6",
    "items": [
      "不需要看代码",
      "只关注：输入什么 → 输出是否符合需求",
      "测试依据：产品需求文档（PRD）",
      "工具：Postman、F12、Excel 用例表",
      "适合：功能测试工程师（入门首选）"
    ]
  },
  "right": {
    "name": "白盒测试（White-box）",
    "badge": "进阶方向",
    "badge_color": "#6B7280",
    "items": [
      "需要阅读源代码",
      "关注：代码逻辑分支、代码覆盖率",
      "测试依据：代码结构 + 设计文档",
      "工具：JUnit、代码覆盖率工具",
      "适合：有编程能力的测试开发工程师"
    ]
  }
}
```

---

### [02-03] 测试工程师协作角色图

- **所在章节**：02.4 初级功能测试岗到底在做什么
- **当前文字描述**：文字列表描述测试与产品经理、开发工程师、项目经理、其他测试的协作。
- **建议组件类型**：`mindmap`
- **组件内容/数据**：

```json
{
  "type": "mindmap",
  "title": "测试工程师的日常协作网络",
  "root": "测试工程师",
  "branches": [
    {
      "name": "产品经理（PM）",
      "children": ["需求答疑", "验收确认", "需求变更同步"]
    },
    {
      "name": "开发工程师（RD）",
      "children": ["沟通 Bug 复现", "督促修复进度", "复测验证"]
    },
    {
      "name": "项目经理（SM/PMO）",
      "children": ["汇报测试进度", "暴露风险（晚提测）"]
    },
    {
      "name": "其他测试",
      "children": ["用例评审", "互相复测"]
    },
    {
      "name": "每日产出",
      "children": ["测试用例文档", "Bug 报告（JIRA/禅道）", "测试报告"]
    }
  ]
}
```

---

## 模块 03：软件测试流程与团队协作

### [03-01] 完整测试流程

- **所在章节**：03.1 一个需求从提出到上线经历什么
- **当前文字描述**：六个步骤用标题+文字段落描述，从"需求分析与评审"到"测试报告出具与上线"，没有可视化流程图。
- **建议组件类型**：`flowchart`
- **组件内容/数据**：

```json
{
  "type": "flowchart",
  "title": "软件测试完整生命周期",
  "direction": "vertical",
  "nodes": [
    {
      "id": "step1",
      "label": "① 需求分析与评审",
      "desc": "参加 PRD 讲解会，找需求漏洞、逻辑矛盾",
      "role": "测试 + 产品 + 开发",
      "color": "#6B7280"
    },
    {
      "id": "step2",
      "label": "② 测试计划编写",
      "desc": "确定范围、人员、排期、环境资源",
      "role": "测试主管",
      "color": "#6B7280"
    },
    {
      "id": "step3",
      "label": "③ 测试用例设计与评审",
      "desc": "并行于开发阶段，提炼测试点，编写用例，组织评审",
      "role": "测试工程师",
      "color": "#3B82F6"
    },
    {
      "id": "step4",
      "label": "④ 测试环境搭建 / 提测",
      "desc": "开发部署测试环境，正式移交测试人员",
      "role": "开发 → 测试",
      "color": "#3B82F6"
    },
    {
      "id": "step5",
      "label": "⑤ 测试执行 & Bug 追踪",
      "desc": "对照用例执行，提 Bug，跟踪修复，复测关闭",
      "role": "测试工程师",
      "color": "#F59E0B"
    },
    {
      "id": "step6",
      "label": "⑥ 测试报告 & 上线",
      "desc": "输出测试报告，给出发布结论",
      "role": "测试工程师 + 项目经理",
      "color": "#10B981"
    }
  ],
  "edges": [
    { "from": "step1", "to": "step2" },
    { "from": "step2", "to": "step3" },
    { "from": "step3", "to": "step4" },
    { "from": "step4", "to": "step5" },
    { "from": "step5", "to": "step6" },
    { "from": "step5", "to": "step5", "label": "Bug 未关闭 → 继续复测", "type": "loop" }
  ]
}
```

---

### [03-02] 敏捷团队活动

- **所在章节**：03.2 敏捷项目中的测试工作
- **当前文字描述**：文字列表描述 Sprint 计划会、每日站会、演示会、回顾会的内容，无节奏感的可视化呈现。
- **建议组件类型**：`timeline`
- **组件内容/数据**：

```json
{
  "type": "timeline",
  "title": "两周 Sprint 中测试工程师的节奏",
  "orientation": "horizontal",
  "items": [
    { "day": "Sprint 第 1 天", "event": "Sprint 计划会", "desc": "确定本次迭代范围，评估测试工作量", "role": "全团队" },
    { "day": "第 1-5 天", "event": "并行写用例", "desc": "开发写代码期间，测试同步编写测试用例（测试左移）", "role": "测试" },
    { "day": "第 5 天", "event": "提测", "desc": "开发部署测试环境，移交测试", "role": "开发 → 测试" },
    { "day": "第 6-9 天", "event": "测试执行 & Bug 追踪", "desc": "执行用例，提 Bug，跟踪修复，复测", "role": "测试 + 开发" },
    { "day": "每天早上", "event": "每日站会（10-15分钟）", "desc": "昨天做了什么 / 今天做什么 / 有什么阻碍", "role": "全团队" },
    { "day": "Sprint 最后 1-2 天", "event": "演示会 + 回顾会", "desc": "演示可工作的软件；复盘本次迭代改进点", "role": "全团队" }
  ]
}
```

---

### [03-03] 团队协作沟通指南

- **所在章节**：03.3 测试如何和产品、开发、项目经理协作
- **当前文字描述**：一张三行表格，描述与各角色的互动内容和沟通建议。
- **建议组件类型**：`comparison`
- **组件内容/数据**：

```json
{
  "type": "comparison",
  "title": "测试工程师协作沟通指南",
  "layout": "cards",
  "items": [
    {
      "role": "产品经理（PM）",
      "icon": "📋",
      "interactions": ["需求答疑", "验收确认", "需求变更同步"],
      "tips": [
        "需求不清晰必须追问到底，不能主观臆测",
        "口头达成的需求修改，必须让 PM 落实到 PRD 文档，避免口说无凭"
      ]
    },
    {
      "role": "开发工程师（RD）",
      "icon": "💻",
      "interactions": ["沟通 Bug 复现步骤", "解释为什么是 Bug", "督促修复进度"],
      "tips": [
        "提 Bug 必须提供：前置条件、复现步骤、报错截图（含日志更好）",
        "不要使用命令式语气",
        "当开发认为不是 Bug 时，拿出需求文档作为准绳"
      ]
    },
    {
      "role": "项目经理（SM/PMO）",
      "icon": "📊",
      "interactions": ["汇报测试进度", "暴露项目风险"],
      "tips": [
        "遇到不可控风险必须'及时举手'，不要憋在心里",
        "晚暴露问题的危害远大于早求助"
      ]
    }
  ]
}
```

---

## 模块 04：功能测试核心方法

### [04-01] 业务场景树拆解

- **所在章节**：04.1 拿到需求后，测试人员第一步做什么（需求分析拆解法）
- **当前文字描述**：用三层列表描述业务场景树（大模块 → 子功能 → 测试点），以"购物车"为例，但未展示为可展开的树状结构。
- **建议组件类型**：`mindmap`
- **组件内容/数据**：

```json
{
  "type": "mindmap",
  "title": "业务场景树示例：购物车模块",
  "collapsible": true,
  "root": "购物车",
  "branches": [
    {
      "name": "添加商品",
      "children": [
        "添加单件商品（正向）",
        "添加已存在商品（数量叠加）",
        "超过库存时添加（边界）",
        "商品已下架时添加（异常）"
      ]
    },
    {
      "name": "结算",
      "children": [
        "全选商品结算",
        "部分勾选商品结算",
        "购物车为空时结算（异常）",
        "商品下架后结算（联动）"
      ]
    },
    {
      "name": "删除商品",
      "children": [
        "删除单件商品",
        "批量删除",
        "删除后购物车为空的状态展示"
      ]
    }
  ]
}
```

---

### [04-02] 等价类划分法交互演示

- **所在章节**：04.3 四大核心用例设计方法 — 等价类划分法
- **当前文字描述**：用文字描述"年龄 1-120 的整数"场景，列出有效等价类和无效等价类的例子。
- **建议组件类型**：`input-demo`
- **组件内容/数据**：

```json
{
  "type": "input-demo",
  "title": "等价类划分法 — 交互演示",
  "scenario": "系统要求输入人的年龄（1-120 的整数）",
  "input_label": "请输入年龄值，立即看到它属于哪个等价类",
  "input_type": "text",
  "rules": {
    "valid_class": { "condition": "整数 且 1 <= value <= 120", "label": "✅ 有效等价类", "example": "如 20、50、100", "color": "#10B981" },
    "invalid_classes": [
      { "condition": "整数 且 value < 1", "label": "❌ 无效：小于最小值", "example": "如 0、-5", "color": "#EF4444" },
      { "condition": "整数 且 value > 120", "label": "❌ 无效：大于最大值", "example": "如 121、999", "color": "#EF4444" },
      { "condition": "包含小数点", "label": "❌ 无效：小数", "example": "如 10.5", "color": "#EF4444" },
      { "condition": "包含非数字字符", "label": "❌ 无效：非数字", "example": "如 'A'、'#'", "color": "#EF4444" },
      { "condition": "为空", "label": "❌ 无效：空值", "example": "不输入直接提交", "color": "#EF4444" }
    ]
  },
  "tip": "💡 每个无效等价类只需选一个代表值来测试，无需穷举所有"
}
```

---

### [04-03] 边界值分析法交互演示

- **所在章节**：04.3 四大核心用例设计方法 — 边界值分析法
- **当前文字描述**：用文字描述"密码长度 8-16 位"场景，列出 7、8、16、17 四个边界值及其预期结果。
- **建议组件类型**：`input-demo`
- **组件内容/数据**：

```json
{
  "type": "input-demo",
  "title": "边界值分析法 — 密码长度验证",
  "scenario": "系统要求密码长度必须是 8 到 16 位",
  "input_label": "输入一段密码，查看长度是否通过验证",
  "input_type": "password",
  "show_length_counter": true,
  "boundary_table": [
    { "length": 7,  "desc": "最小值 - 1", "expected": "❌ 应报错：密码太短", "color": "#EF4444" },
    { "length": 8,  "desc": "最小值（边界）", "expected": "✅ 应通过", "color": "#10B981" },
    { "length": 16, "desc": "最大值（边界）", "expected": "✅ 应通过", "color": "#10B981" },
    { "length": 17, "desc": "最大值 + 1", "expected": "❌ 应报错：密码太长", "color": "#EF4444" }
  ],
  "realtime_feedback": true,
  "tip": "💡 边界值与等价类配合使用效果最佳"
}
```

---

### [04-04] 场景法基本流与备选流

- **所在章节**：04.3 四大核心用例设计方法 — 场景法（业务流程法）
- **当前文字描述**：用列表描述电商购物的基本流和三条备选流，结构层级不清晰。
- **建议组件类型**：`flowchart`
- **组件内容/数据**：

```json
{
  "type": "flowchart",
  "title": "场景法示例：电商购物流程",
  "nodes": [
    { "id": "browse", "label": "浏览商品", "type": "step" },
    { "id": "cart",   "label": "加入购物车", "type": "step" },
    { "id": "order",  "label": "提交订单", "type": "decision", "desc": "库存是否充足？" },
    { "id": "pay",    "label": "发起支付", "type": "decision", "desc": "余额是否充足？" },
    { "id": "success","label": "支付成功 → 等待发货", "type": "end", "color": "#10B981" },
    { "id": "no_stock","label": "提示库存不足，无法加购", "type": "error", "color": "#EF4444" },
    { "id": "pay_fail","label": "支付失败，提示充值", "type": "error", "color": "#EF4444" },
    { "id": "refund", "label": "申请退款 → 原路返回", "type": "branch", "color": "#F59E0B" }
  ],
  "edges": [
    { "from": "browse", "to": "cart" },
    { "from": "cart", "to": "order", "label": "有库存 ✅" },
    { "from": "cart", "to": "no_stock", "label": "库存不足 ❌" },
    { "from": "order", "to": "pay" },
    { "from": "pay", "to": "success", "label": "余额足够 ✅" },
    { "from": "pay", "to": "pay_fail", "label": "余额不足 ❌" },
    { "from": "success", "to": "refund", "label": "立刻申请退款" }
  ],
  "highlight_main_flow": true
}
```

---

### [04-05] 标准测试用例表

- **所在章节**：04.4 如何把测试点写成标准测试用例
- **当前文字描述**：一张六行的字段说明表（编号/标题/前置条件/执行步骤/预期结果/优先级），只列出字段含义，没有可操作的用例示例。
- **建议组件类型**：`testcase`
- **组件内容/数据**：

```json
{
  "type": "testcase",
  "title": "标准测试用例示例表（登录模块）",
  "columns": ["用例编号", "用例标题", "前置条件", "执行步骤", "预期结果", "优先级", "状态"],
  "priority_colors": {
    "P0": "#EF4444",
    "P1": "#F59E0B",
    "P2": "#3B82F6",
    "P3": "#6B7280"
  },
  "status_options": ["待执行", "通过", "失败", "阻塞"],
  "rows": [
    {
      "id": "Login-001",
      "title": "正确账号和密码可以成功登录",
      "precondition": "处于未登录状态，已有注册账号（test@example.com / Test1234）",
      "steps": "1. 进入登录页\n2. 输入正确账号 test@example.com\n3. 输入对应密码 Test1234\n4. 点击登录按钮",
      "expected": "1. 页面成功跳转到用户主页\n2. 右上角显示用户昵称\n3. 数据库产生对应的登录日志记录",
      "priority": "P0",
      "status": "待执行"
    },
    {
      "id": "Login-002",
      "title": "密码错误时给出明确提示且不登录成功",
      "precondition": "处于未登录状态，已有注册账号",
      "steps": "1. 进入登录页\n2. 输入正确账号\n3. 输入错误密码（如 Wrong123）\n4. 点击登录按钮",
      "expected": "1. 页面停留在登录页\n2. 显示错误提示：'账号或密码错误'\n3. 数据库无新登录记录",
      "priority": "P0",
      "status": "待执行"
    },
    {
      "id": "Login-003",
      "title": "密码连续错误 5 次账号被锁定",
      "precondition": "处于未登录状态，账号未被锁定",
      "steps": "1. 连续输入错误密码 5 次\n2. 第 6 次再尝试登录",
      "expected": "第 6 次尝试时，提示账号已被锁定，需要 X 分钟后重试",
      "priority": "P1",
      "status": "待执行"
    },
    {
      "id": "Login-004",
      "title": "密码框输入内容默认不可见（星号显示）",
      "precondition": "处于未登录状态",
      "steps": "1. 进入登录页\n2. 在密码框输入任意字符",
      "expected": "密码框中内容显示为星号（●●●●），不明文展示",
      "priority": "P2",
      "status": "待执行"
    }
  ]
}
```

---

## 模块 05：Bug 管理与测试输出

### [05-01] Bug 生命周期流程图

- **所在章节**：05.3 Bug 生命周期与常见状态
- **当前文字描述**：用 ASCII art 描述 Bug 从 New → Assigned → Fixed → Closed / Reopened 的流转，以及 Rejected 和 Deferred 特殊状态。
- **建议组件类型**：`flowchart`
- **组件内容/数据**：

```json
{
  "type": "flowchart",
  "title": "Bug 完整生命周期",
  "nodes": [
    { "id": "new",      "label": "New\n（新建）",          "color": "#6B7280", "desc": "测试人员发现并提交" },
    { "id": "assigned", "label": "Assigned\n（已分配）",    "color": "#3B82F6", "desc": "开发主管分配给具体程序员" },
    { "id": "fixed",    "label": "Fixed/Resolved\n（已修复）","color": "#8B5CF6", "desc": "程序员改完代码，打回测试验证" },
    { "id": "closed",   "label": "Closed\n（已关闭）",      "color": "#10B981", "desc": "测试验证通过，关闭" },
    { "id": "reopened", "label": "Reopened\n（重新打开）",   "color": "#F59E0B", "desc": "验证不通过，打回开发继续修" },
    { "id": "rejected", "label": "Rejected\n（已拒绝）",     "color": "#EF4444", "desc": "开发认为不是 Bug，需拿 PRD 沟通" },
    { "id": "deferred", "label": "Deferred\n（延期修复）",   "color": "#9CA3AF", "desc": "成本高或优先级低，排到下版本" }
  ],
  "edges": [
    { "from": "new",      "to": "assigned",  "label": "分配" },
    { "from": "assigned", "to": "fixed",     "label": "修复完成" },
    { "from": "assigned", "to": "rejected",  "label": "认为非 Bug" },
    { "from": "assigned", "to": "deferred",  "label": "延期处理" },
    { "from": "fixed",    "to": "closed",    "label": "验证通过 ✅" },
    { "from": "fixed",    "to": "reopened",  "label": "验证不通过 ❌" },
    { "from": "reopened", "to": "fixed",     "label": "再次修复" }
  ]
}
```

---

### [05-02] Bug 单好坏对比

- **所在章节**：05.2 如何写一个开发愿意接的 Bug 单
- **当前文字描述**：用 ❌/✅ 对比了一个坏标题（"登录坏了"）和好标题，但其余字段的好坏对比都是文字说明。
- **建议组件类型**：`comparison`
- **组件内容/数据**：

```json
{
  "type": "comparison",
  "title": "Bug 单：坏写法 vs 好写法",
  "layout": "side-by-side",
  "left": {
    "name": "❌ 坏的 Bug 单",
    "badge": "开发看了头疼",
    "badge_color": "#EF4444",
    "items": [
      "标题：登录坏了",
      "步骤：点了一下登录",
      "实际结果：出问题了",
      "预期结果：（空）",
      "严重程度：（未填）",
      "附件：（无）",
      "环境：（未填）"
    ]
  },
  "right": {
    "name": "✅ 好的 Bug 单",
    "badge": "开发看了直接修",
    "badge_color": "#10B981",
    "items": [
      "标题：在 iOS 端 App 的登录页，输入带空格的用户名点击登录，App 闪退崩溃",
      "步骤：1. 打开 iOS 14.x App v2.1.0；2. 在用户名框输入'test user'（含空格）；3. 输入密码；4. 点击登录",
      "实际结果：App 直接闪退，回到手机桌面",
      "预期结果：根据 PRD 第 3.2 节，应提示'用户名不能包含空格'",
      "严重程度：P0（阻断性）",
      "附件：崩溃截图 + 控制台日志截图（已附）",
      "环境：iOS 14.5 / iPhone 12 / App v2.1.0 / 测试账号：test001"
    ]
  }
}
```

---

### [05-03] 测试报告结构

- **所在章节**：05.4 什么是测试报告
- **当前文字描述**：一张五行表格描述测试报告各章节内容，无数据可视化。
- **建议组件类型**：`testcase`
- **组件内容/数据**：

```json
{
  "type": "testcase",
  "title": "测试报告结构示例（可直接套用）",
  "description": "以下为一份简版测试报告的核心章节，适合新人第一次写报告时参考",
  "columns": ["章节", "内容要点", "示例"],
  "rows": [
    {
      "chapter": "测试范围",
      "points": "本次测试了哪些功能模块、哪些版本",
      "example": "本次测试覆盖：登录模块、购物车模块、支付模块 v2.1.0，不含推荐算法模块"
    },
    {
      "chapter": "测试结论",
      "points": "是否建议上线，理由是什么",
      "example": "建议上线。所有 P0/P1 Bug 已关闭，遗留 2 条 P3 UI Bug 已确认不影响主流程"
    },
    {
      "chapter": "Bug 统计",
      "points": "总数、各优先级数量、已关闭数、遗留数",
      "example": "共发现 23 个 Bug：P0×2（已关），P1×5（已关），P2×10（已关），P3×6（遗留 2）"
    },
    {
      "chapter": "遗留 Bug 说明",
      "points": "遗留了哪些 Bug，为什么可以遗留，风险评估",
      "example": "BUG-045：首页 Banner 图文字偏移 2px（P3）；BUG-051：注册页帮助链接 404（P3），影响极小，下版本修复"
    },
    {
      "chapter": "风险总结",
      "points": "测试未覆盖的范围、已知潜在风险",
      "example": "因工期限制，压力测试未执行；双十一高并发场景需上线后密切监控"
    }
  ]
}
```

---

## 模块 06：接口测试入门

### [06-01] HTTP 请求/响应结构

- **所在章节**：06.2 请求和响应到底是什么
- **当前文字描述**：两张表格分别列出请求组成（URL/方法/Header/Body）和响应组成（状态码/响应体），无可交互的真实结构展示。
- **建议组件类型**：`http-demo`
- **组件内容/数据**：

```json
{
  "type": "http-demo",
  "title": "接口请求/响应结构解析",
  "tabs": ["请求（Request）", "响应（Response）"],
  "request": {
    "method": "POST",
    "url": "https://api.example.com/users/login",
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    "body": {
      "username": "test@example.com",
      "password": "Test1234"
    },
    "annotations": {
      "method": "请求方法：GET=获取 / POST=提交 / PUT=更新 / DELETE=删除",
      "url": "接口地址，告诉服务器要找谁",
      "headers": "附加信息，如登录凭证 Token",
      "body": "实际发送的数据，通常是 JSON 格式"
    }
  },
  "response": {
    "status_code": 200,
    "status_text": "OK",
    "headers": {
      "Content-Type": "application/json",
      "Set-Cookie": "session_id=abc123; HttpOnly"
    },
    "body": {
      "code": 0,
      "msg": "登录成功",
      "data": {
        "user_id": 10086,
        "username": "test@example.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    },
    "annotations": {
      "status_code": "200=成功 / 400=请求错误 / 401=未授权 / 404=找不到 / 500=服务器错误",
      "body": "服务器返回的 JSON 数据，测试人员需验证字段名和字段值是否符合接口文档"
    }
  }
}
```

---

### [06-02] F12 Network 面板模拟

- **所在章节**：06.3 使用 Chrome DevTools 抓包（F12）
- **当前文字描述**：五步文字列表描述打开 F12、点 Network 面板、触发操作、找请求、查看 Headers/Payload/Response 的步骤，以及如何判断前后端 Bug 归属。
- **建议组件类型**：`devtools`
- **组件内容/数据**：

```json
{
  "type": "devtools",
  "title": "模拟 F12 Network 面板 — 前后端 Bug 定位实战",
  "scenario": "点击登录按钮后页面没有跳转，如何排查？",
  "panels": ["Network", "Console", "Elements"],
  "active_panel": "Network",
  "request_list": [
    { "name": "login",        "method": "POST", "status": 401, "type": "fetch", "size": "1.2 KB", "time": "320ms", "highlight": true },
    { "name": "main.js",      "method": "GET",  "status": 200, "type": "script","size": "45 KB",  "time": "120ms" },
    { "name": "style.css",    "method": "GET",  "status": 200, "type": "stylesheet","size": "8 KB","time": "80ms" }
  ],
  "selected_request": {
    "name": "login",
    "tabs": {
      "Headers": {
        "Request URL": "https://api.example.com/users/login",
        "Request Method": "POST",
        "Status Code": "401 Unauthorized"
      },
      "Payload": {
        "username": "test@example.com",
        "password": "Test1234"
      },
      "Response": {
        "code": 401,
        "msg": "Token 已过期，请重新登录",
        "data": null
      }
    }
  },
  "diagnosis": {
    "question": "根据以上抓包结果，这是前端 Bug 还是后端 Bug？",
    "options": ["前端 Bug（前端发错了数据）", "后端 Bug（前端数据没问题，后端返回了错误）"],
    "correct": 1,
    "explanation": "Payload 中 username 和 password 格式正确，但后端返回 401 且提示 Token 过期。前端发的数据没有问题，是后端 Token 验证逻辑的问题 → 后端 Bug。"
  }
}
```

---

### [06-03] 接口测试验证四步法

- **所在章节**：06.5 接口测试最基础的验证思路
- **当前文字描述**：四条文字要点，说明每次接口测试应验证的内容（状态码/字段/错误参数/数据联动）。
- **建议组件类型**：`checklist`
- **组件内容/数据**：

```json
{
  "type": "checklist",
  "title": "接口测试四步验证清单",
  "description": "每次接口测试执行后，逐一勾选确认",
  "items": [
    {
      "step": 1,
      "item": "状态码是否正确",
      "detail": "成功时 200；失败时对应的 4xx/5xx（不能一律返回 200 包体里带错误码）"
    },
    {
      "step": 2,
      "item": "返回字段是否符合接口文档",
      "detail": "字段名拼写对吗？字段类型对吗（number vs string）？必填字段有没有？"
    },
    {
      "step": 3,
      "item": "错误参数时系统是否正确提示",
      "detail": "发空值、超长、格式错误 → 后端是否返回有意义的错误信息，而不是直接崩溃（500）"
    },
    {
      "step": 4,
      "item": "接口成功后数据是否真正写入",
      "detail": "提交成功后去数据库 SELECT 一下，数据真的写进去了吗？刷新页面，前端展示是最新数据吗？"
    }
  ]
}
```

---

## 模块 07：测试工具基础

### [07-01] Linux 日志查看命令

- **所在章节**：07.4 Linux 与日志查看基础
- **当前文字描述**：代码块列出 5 条 bash 命令（tail、grep、cd/ls、kill、tar），有注释说明，但无交互演示。
- **建议组件类型**：`terminal`
- **组件内容/数据**：

```json
{
  "type": "terminal",
  "title": "Linux 日志查看 — 模拟终端",
  "prompt": "tester@server:~$",
  "scenarios": [
    {
      "name": "场景一：实时查看日志（边点界面边看报错）",
      "command": "tail -f /usr/local/tomcat/logs/error.log",
      "output": "[2026-05-17 14:32:01] INFO  Request received: POST /api/login\n[2026-05-17 14:32:01] ERROR NullPointerException at UserService.java:87\n    at com.example.service.UserService.login(UserService.java:87)\n    at com.example.controller.UserController.login(UserController.java:45)\n[2026-05-17 14:32:01] ERROR Response: 500 Internal Server Error",
      "tip": "发现 NullPointerException？把这段截图贴给后端开发，他会非常感谢你"
    },
    {
      "name": "场景二：搜索特定关键词（快速过滤报错）",
      "command": "grep 'NullPointerException' error.log",
      "output": "[2026-05-17 14:32:01] ERROR NullPointerException at UserService.java:87\n[2026-05-17 09:15:33] ERROR NullPointerException at OrderService.java:124"
    },
    {
      "name": "场景三：查看日志目录",
      "command": "ls -la /usr/local/tomcat/logs",
      "output": "total 48\ndrwxr-xr-x 2 tomcat tomcat 4096 May 17 14:30 .\ndrwxr-xr-x 9 tomcat tomcat 4096 May 01 09:00 ..\n-rw-r--r-- 1 tomcat tomcat 12842 May 17 14:32 error.log\n-rw-r--r-- 1 tomcat tomcat 28190 May 17 14:32 access.log\n-rw-r--r-- 1 tomcat tomcat  3024 May 17 12:00 catalina.log"
    },
    {
      "name": "场景四：查找并终止卡死进程",
      "command": "ps -ef | grep java",
      "output": "tomcat   12345   1 99 14:30 ?   00:05:12 java -jar app.jar\ntester   12400 12399  0 14:35 pts/0 00:00:00 grep java",
      "next_command": "kill -9 12345",
      "next_output": "[1] Killed   java -jar app.jar"
    }
  ]
}
```

---

### [07-02] SQL 查询可执行演示

- **所在章节**：07.3 数据库验证基础：MySQL
- **当前文字描述**：代码块列出五条 SQL（SELECT、UPDATE、DELETE、JOIN），有注释，但没有可执行的 Mock 数据环境。
- **建议组件类型**：`sql-demo`
- **组件内容/数据**：

```json
{
  "type": "sql-demo",
  "title": "测试人员常用 SQL — Mock 数据库演练",
  "description": "以下是内置了模拟数据的测试数据库，直接点击运行查看结果",
  "mock_tables": {
    "users": [
      { "user_id": 1,   "username": "zhangsan",  "email": "zhang@test.com", "account_balance": 100.00, "status": "active" },
      { "user_id": 2,   "username": "lisi",       "email": "li@test.com",    "account_balance": 9999.00,"status": "active" },
      { "user_id": 3,   "username": "test_user",  "email": "test@test.com",  "account_balance": 0.00,  "status": "locked" }
    ],
    "orders": [
      { "order_id": "202601010001", "user_id": 1, "total_amount": 88.00,  "status": "paid",    "create_time": "2026-01-01 10:00:00" },
      { "order_id": "202601010002", "user_id": 1, "total_amount": 200.00, "status": "pending", "create_time": "2026-01-01 11:30:00" },
      { "order_id": "202601020001", "user_id": 2, "total_amount": 999.00, "status": "paid",    "create_time": "2026-01-02 09:15:00" }
    ]
  },
  "preset_queries": [
    {
      "label": "查看特定用户数据",
      "sql": "SELECT * FROM users WHERE username = 'zhangsan';",
      "purpose": "验证用户注册后数据是否正确写入"
    },
    {
      "label": "验证订单是否存在",
      "sql": "SELECT * FROM orders WHERE order_id = '202601010001';",
      "purpose": "支付成功后验证订单状态是否变为 paid"
    },
    {
      "label": "连表查询用户订单",
      "sql": "SELECT u.username, o.order_id, o.total_amount, o.status\nFROM users u\nJOIN orders o ON u.user_id = o.user_id\nWHERE u.username = 'zhangsan';",
      "purpose": "验证用户和订单的关联关系是否正确"
    },
    {
      "label": "⚠️ 给测试账号充值（慎用）",
      "sql": "UPDATE users SET account_balance = 9999 WHERE username = 'test_user';",
      "purpose": "快速准备测试大额支付的测试数据",
      "warning": "仅在测试数据库执行！"
    }
  ]
}
```

---

### [07-03] F12 Network 面板归因练习

- **所在章节**：07.2 浏览器开发者工具（F12）— Network 面板如何辅助判断问题归属
- **当前文字描述**：五步文字列表描述排查流程（打开面板 → 找请求 → 查 Payload → 查 Response → 判断归属），缺乏交互练习。
- **建议组件类型**：`devtools`
- **组件内容/数据**：

```json
{
  "type": "devtools",
  "title": "前后端 Bug 归因训练场",
  "description": "点击查看不同场景的 Network 记录，判断这是前端 Bug 还是后端 Bug",
  "cases": [
    {
      "case_id": 1,
      "scenario": "用户点击'添加购物车'，页面提示'系统繁忙，请稍后'",
      "request": { "method": "POST", "url": "/api/cart/add", "payload": { "product_id": "SKU001", "quantity": 1 } },
      "response": { "status": 500, "body": { "code": 500, "msg": "Internal Server Error" } },
      "answer": "后端 Bug",
      "explanation": "前端发送的 payload 格式正确（product_id 和 quantity 都有），但后端返回 500。说明是后端服务器内部处理出了问题。"
    },
    {
      "case_id": 2,
      "scenario": "搜索商品时，输入关键词后结果为空，但数据库里明明有数据",
      "request": { "method": "GET", "url": "/api/products/search?keyword=", "payload": null },
      "response": { "status": 200, "body": { "code": 0, "data": [] } },
      "answer": "前端 Bug",
      "explanation": "请求 URL 中 keyword 参数为空（?keyword=），前端没有把用户输入的关键词正确带上，导致后端搜索了空字符串。这是前端的 Bug。"
    },
    {
      "case_id": 3,
      "scenario": "修改用户昵称，提示'修改成功'，但刷新页面后昵称没变",
      "request": { "method": "PUT", "url": "/api/user/profile", "payload": { "nickname": "新昵称" } },
      "response": { "status": 200, "body": { "code": 0, "msg": "修改成功" } },
      "answer": "后端 Bug 或数据库 Bug",
      "explanation": "接口返回 200 且 msg='修改成功'，但刷新后数据没变。说明后端返回了假的成功（没有真正写入数据库），需要去数据库 SELECT 验证。这是后端 Bug。"
    }
  ]
}
```

---

## 模块 08：企业级实战项目

### [08-01] 支付链路场景法用例

- **所在章节**：08.1 项目 A：Web 电商平台测试（支付链路）
- **当前文字描述**：用文字列表描述重复支付、弱网断网、支付后立刻退款等测试场景，没有结构化的测试用例呈现。
- **建议组件类型**：`testcase`
- **组件内容/数据**：

```json
{
  "type": "testcase",
  "title": "电商支付链路测试用例集",
  "columns": ["用例编号", "场景描述", "测试要点", "优先级", "状态"],
  "rows": [
    { "id": "PAY-001", "scenario": "正常支付流程", "points": "选商品 → 下单 → 支付宝沙箱成功支付 → 订单状态变更为已支付 → 库存减少", "priority": "P0", "status": "待执行" },
    { "id": "PAY-002", "scenario": "弱网断网场景", "points": "支付密码输入瞬间断开网络，重新联网后：系统是超时报错、保留订单，还是陷入死循环？", "priority": "P0", "status": "待执行" },
    { "id": "PAY-003", "scenario": "重复支付防护", "points": "同一订单点击支付后，快速多次点击支付按钮，是否只发起一次支付请求？", "priority": "P0", "status": "待执行" },
    { "id": "PAY-004", "scenario": "支付后立刻退款", "points": "支付成功后 30 秒内申请全额退款，退款金额是否与支付金额完全一致？", "priority": "P1", "status": "待执行" },
    { "id": "PAY-005", "scenario": "余额不足时支付", "points": "账户余额为 0 时发起支付，系统是否正确提示余额不足并引导充值？", "priority": "P1", "status": "待执行" },
    { "id": "PAY-006", "scenario": "库存超买边界", "points": "商品库存剩余 1 件时，两个用户同时发起支付，只有一个应成功，另一个需提示库存不足", "priority": "P1", "status": "待执行" }
  ]
}
```

---

### [08-02] 移动端测试场景清单

- **所在章节**：08.2 项目 B：移动端社交 App 测试
- **当前文字描述**：五个子场景（基础消息、交叉事件中断、弱网、安装升级、权限管理）用文字列表描述，无可勾选的测试清单。
- **建议组件类型**：`checklist`
- **组件内容/数据**：

```json
{
  "type": "checklist",
  "title": "移动端 App 测试场景清单",
  "description": "执行测试时逐一勾选，确保场景覆盖完整",
  "categories": [
    {
      "name": "消息基础功能",
      "items": [
        "发送文字消息：显示正常，时间戳正确",
        "发送图片：压缩/原图选择正常，接收方显示正确",
        "发送视频/文件：上传进度显示，大文件处理",
        "消息撤回：双方都生效，2分钟内可撤回",
        "已读状态：对方查看后状态变化"
      ]
    },
    {
      "name": "交叉事件中断",
      "items": [
        "上传图片中来电 → 接听后回到 App，上传是否继续/失败提示",
        "发送中闹钟响起 → 处理闹钟后消息状态",
        "退到桌面被系统清理后重新打开 → 草稿箱数据保留",
        "切换 App 后回来 → 消息是否实时刷新"
      ]
    },
    {
      "name": "网络切换",
      "items": [
        "WiFi → 4G 切换时消息发送是否中断",
        "4G → 断网状态下的提示是否友好",
        "弱网（2G/3G 模拟）下图片上传表现",
        "断网重连后消息是否自动重发"
      ]
    },
    {
      "name": "安装/升级",
      "items": [
        "覆盖安装新版本：聊天记录是否保留",
        "覆盖安装新版本：用户设置是否保留",
        "卸载重装：登录状态是否正确清除"
      ]
    },
    {
      "name": "权限管理",
      "items": [
        "拒绝相册权限后点击发图：是否有'去设置开启'引导",
        "拒绝麦克风权限后录音：是否有友好提示",
        "从设置开启权限后返回 App：是否立即生效"
      ]
    }
  ]
}
```

---

### [08-03] 完整实战项目交付清单

- **所在章节**：08.3 项目 C：综合交付项目
- **当前文字描述**：四步流程（需求理解/用例编写/执行提Bug/测试报告）用文字描述，无可追踪进度的清单。
- **建议组件类型**：`checklist`
- **组件内容/数据**：

```json
{
  "type": "checklist",
  "title": "项目 C 完整交付检查清单",
  "description": "从需求到测试报告的完整流程，全部完成后你的作品集就准备好了",
  "items": [
    { "phase": "步骤一：需求理解", "task": "阅读模拟 PRD，理解核心业务逻辑" },
    { "phase": "步骤一：需求理解", "task": "提出至少 3 个隐性需求或逻辑漏洞（写下来）" },
    { "phase": "步骤二：用例编写", "task": "用业务场景树拆解需求，完成思维导图" },
    { "phase": "步骤二：用例编写", "task": "运用四大方法编写标准用例，目标 ≥ 30 条" },
    { "phase": "步骤二：用例编写", "task": "P0 核心流程用例完整覆盖" },
    { "phase": "步骤三：执行测试", "task": "在真实开源系统上执行测试" },
    { "phase": "步骤三：执行测试", "task": "提交至少 5 条标准 Bug 单（含 P0 或 P1 至少 1 条）" },
    { "phase": "步骤三：执行测试", "task": "用 F12 抓包截图贴入 Bug 单" },
    { "phase": "步骤三：执行测试", "task": "用 MySQL 查询验证数据写入情况" },
    { "phase": "步骤四：测试报告", "task": "按模块 05 格式写简版测试报告" },
    { "phase": "步骤四：测试报告", "task": "给出明确的上线建议并说明理由" },
    { "phase": "求职包装", "task": "用 STAR 法则写面试项目介绍稿（≥300字）" }
  ]
}
```

---

## 模块 09：求职转型与面试准备

### [09-01] 甲方 vs 外包对比

- **所在章节**：09.5 甲方 vs 外包如何选择
- **当前文字描述**：分两段文字分别描述外包公司和甲方公司的优缺点，最后给出建议，无结构化对比。
- **建议组件类型**：`comparison`
- **组件内容/数据**：

```json
{
  "type": "comparison",
  "title": "甲方自研 vs 外包公司：如何选第一份工作",
  "layout": "side-by-side",
  "left": {
    "name": "外包公司",
    "subtitle": "（中软、软通、文思海辉等驻场）",
    "badge": "零基础入行更容易",
    "badge_color": "#F59E0B",
    "pros": [
      "面试门槛相对低，上岸速度快",
      "可接触大厂真实业务，快速丰富简历",
      "项目种类多，1-2年可涉及不同行业"
    ],
    "cons": [
      "归属感差，无核心产品认同感",
      "核心架构和自动化接触机会少",
      "主要做纯功能黑盒，成长天花板早"
    ]
  },
  "right": {
    "name": "甲方公司（自研团队）",
    "subtitle": "（自己研发产品的公司）",
    "badge": "长期发展更优",
    "badge_color": "#10B981",
    "pros": [
      "深度参与产品全生命周期",
      "有更完整的测试体系和成长路径",
      "测试有一定的话语权"
    ],
    "cons": [
      "面试门槛相对高",
      "竞争者更多，简历要求更高"
    ]
  },
  "conclusion": "作为零基础转型者：生存第一。第一份工作在外包干 1-2 年打好基本功，积累项目经验后再跳甲方，是完全合理的路径。"
}
```

---

### [09-02] 简历好坏对比

- **所在章节**：09.2 简历怎么写
- **当前文字描述**：用 ❌/✅ 对比了一段坏的项目描述和用 STAR 法则写的好描述，是纯文字呈现。
- **建议组件类型**：`comparison`
- **组件内容/数据**：

```json
{
  "type": "comparison",
  "title": "测试岗简历：坏写法 vs 好写法（STAR 法则）",
  "layout": "side-by-side",
  "left": {
    "name": "❌ 坏的项目描述",
    "badge": "HR 看完直接跳过",
    "badge_color": "#EF4444",
    "content": "负责电商系统的登录、购物车、支付模块的测试。使用等价类、边界值设计用例，用 Postman 测试接口，用 JIRA 报 Bug。",
    "problems": [
      "只罗列了工具和方法名词，没有产出数据",
      "和其他 100 份简历一模一样，毫无区分度",
      "看不出解决了什么问题"
    ]
  },
  "right": {
    "name": "✅ 好的项目描述（STAR 法则）",
    "badge": "HR 眼前一亮",
    "badge_color": "#10B981",
    "content": "主导电商项目 C 端（登录、支付核心订单链路）的功能与接口测试。针对历史遗留的超卖与库存并发逻辑设计深度测试用例。\n\n在测试执行周期内发现并追踪 45+ 有效缺陷，其中含 3 个支付阻断性 P0 级重大 Bug，在 JIRA 中完成全生命周期闭环管理。\n\n使用 Postman 完成接口联调验证，编写 MySQL 语句造库查询脏数据，通过 Chrome DevTools 抓包精准定位 20+ 起前后端对接问题，提升修复效率 15%。",
    "highlights": ["有数字：45个缺陷、3个P0", "有工具：Postman、MySQL、DevTools", "有价值：解决了超卖、脏数据问题"]
  }
}
```

---

### [09-03] 高频面试题问答卡

- **所在章节**：09.4 常见面试题整理
- **当前文字描述**：五组面试题以 Q/A 纯文字格式列出，包括测试目的、黑白盒区别、开发不认 Bug、是否同意上线、等价类与边界值区别。
- **建议组件类型**：`comparison`（翻牌式问答卡）
- **组件内容/数据**：

```json
{
  "type": "flashcard",
  "title": "功能测试高频面试题",
  "description": "点击卡片翻转查看参考答案",
  "cards": [
    {
      "question": "软件测试的目的是什么？",
      "answer": "①发现软件中的缺陷；②验证软件符合需求；③为上线提供质量评估依据，让团队有信心发布产品。"
    },
    {
      "question": "黑盒测试和白盒测试的区别？",
      "answer": "黑盒：不关注代码内部，只关注输入和输出是否符合需求，本课程重点。\n白盒：需要阅读代码结构，针对代码逻辑分支进行测试，要求有编程能力。"
    },
    {
      "question": "等价类划分法和边界值分析法的区别？",
      "answer": "等价类：将输入数据分成有效/无效的类，每类只测一个代表值，减少重复测试。\n边界值：专门测边界上的特殊值（最小值-1、最小值、最大值、最大值+1）。两者通常配合使用。"
    },
    {
      "question": "开发不认 Bug 怎么办？（满分思路）",
      "answer": "①先自我排查，确保复现步骤没问题；②拿 PRD 或接口文档中的约定作为客观依据；③如果 PRD 没写清楚，立刻拉上产品经理三方碰头确认，以产品最终认定为准并更新文档。不要主观争吵。"
    },
    {
      "question": "明天上线，今天发现难修的 Bug，同意上线吗？",
      "answer": "不能一概而论，评估严重程度和影响范围：\n• P0（主链路崩溃/资金异常）：坚决拦截，紧急修复后再发；\n• P3（文案错误/非核心UI）：可提延期修复单，由产品和项目经理评估认可后带病上线。\n无论哪种情况，绝不私自隐瞒，必须有书面留痕。"
    }
  ]
}
```

---

## 模块 10：入职与成长

### [10-01] 入职 30 天行动计划

- **所在章节**：10.1 新人入职 30 天落地生存指南
- **当前文字描述**：三段文字分别描述第1-3天、第4-14天、第15-30天应该做什么，但没有可互动的计划表。
- **建议组件类型**：`checklist`
- **组件内容/数据**：

```json
{
  "type": "checklist",
  "title": "入职 30 天行动清单",
  "description": "每日下班前勾选，30 天后你将成为该业务模块的熟手",
  "categories": [
    {
      "name": "第 1-3 天：配环境与读文档",
      "items": [
        "获取公司邮箱账号",
        "申请内网权限（VPN、内部系统）",
        "开通 JIRA / 禅道账号",
        "获取开发/测试环境访问权限",
        "收集历史产品需求说明书（PRD）",
        "翻看缺陷管理库中常见的历史 Bug",
        "记录内部行业黑话和系统模块名称"
      ]
    },
    {
      "name": "第 4-14 天：模仿与执行现有用例",
      "items": [
        "拿到导师分配的回归测试用例集",
        "按步骤执行用例，熟悉真实业务操作流",
        "遇到不确定的现象先记录，再问老测试",
        "每天下班前整理笔记复盘"
      ]
    },
    {
      "name": "第 15-30 天：承担小模块",
      "items": [
        "接手 1-2 个小页面的独立需求",
        "提 Bug 前先问老测试确认是否属实",
        "完成所负责模块的完整用例并执行",
        "每天下班前整理笔记，复盘遇到的坑"
      ]
    }
  ]
}
```

---

### [10-02] 职业进阶路径

- **所在章节**：10.3 从功能测试到更高阶的进阶路径
- **当前文字描述**：三条路径（全栈自动化/测试开发/业务专家）用标题+文字段落描述，没有可视化的分叉路径图。
- **建议组件类型**：`timeline`
- **组件内容/数据**：

```json
{
  "type": "timeline",
  "title": "软件测试职业进阶路径",
  "base_stage": {
    "label": "初级功能测试工程师",
    "desc": "本课程出发点",
    "duration": "0-1年",
    "color": "#6B7280"
  },
  "fork_point": "1-2 年后，根据个人兴趣选择方向",
  "paths": [
    {
      "name": "路径一：全栈自动化工程师",
      "tag": "技术方向（最主流）",
      "tag_color": "#3B82F6",
      "stages": [
        { "duration": "1-2年", "label": "Python/Java 编程基础 + Selenium" },
        { "duration": "2-3年", "label": "Appium（移动端）+ Pytest + Jenkins CI/CD" },
        { "duration": "3年+",  "label": "自动化框架设计 / 性能测试 (JMeter)" }
      ]
    },
    {
      "name": "路径二：测试开发工程师",
      "tag": "高薪方向",
      "tag_color": "#8B5CF6",
      "stages": [
        { "duration": "1-2年", "label": "中级后端开发能力（Java/Python）" },
        { "duration": "2-3年", "label": "自研测试平台 / 研发效能工具" },
        { "duration": "3年+",  "label": "研发效能专家 / 测试架构师" }
      ]
    },
    {
      "name": "路径三：业务专家 & 测试管理",
      "tag": "软技能方向",
      "tag_color": "#10B981",
      "stages": [
        { "duration": "1-2年", "label": "深耕行业（电商/金融/医疗）业务知识" },
        { "duration": "2-3年", "label": "测试 Lead / 测试经理" },
        { "duration": "3年+",  "label": "测试总监 / 测试架构" }
      ]
    }
  ]
}
```

---

## 模块 11：附录与模板资料

### [11-01] Bug 严重度分级速查

- **所在章节**：A. Bug 严重度与优先级分类参考
- **当前文字描述**：一张四行表格描述 P0-P3 各级别的判别标准和例子，纯文字，无颜色区分。
- **建议组件类型**：`testcase`（带优先级颜色的分级卡片）
- **组件内容/数据**：

```json
{
  "type": "testcase",
  "title": "Bug 严重度与优先级速查卡",
  "columns": ["等级", "别称", "判别标准", "典型例子", "是否阻止上线"],
  "priority_colors": {
    "P0": "#EF4444",
    "P1": "#F97316",
    "P2": "#3B82F6",
    "P3": "#6B7280"
  },
  "rows": [
    {
      "level": "致命 (Blocker)",
      "alias": "P0",
      "standard": "系统完全无法运行/崩溃；造成严重资金/数据丢失；导致测试无法继续推进",
      "example": "支付时 App 直接闪退；用户数据全部被清空",
      "block_release": "🔴 必须修复后才能上线"
    },
    {
      "level": "严重 (Critical)",
      "alias": "P1",
      "standard": "核心主干业务流不通，但系统未崩溃；或出现大面积数据计算错误",
      "example": "能登录但所有页面显示白屏；购物车金额计算错误",
      "block_release": "🟠 原则上需修复，特殊情况需管理层确认"
    },
    {
      "level": "一般 (Major)",
      "alias": "P2",
      "standard": "次要功能不通；容错机制有问题；存在临时规避方案",
      "example": "搜索页价格排序无效，但销量排序正常",
      "block_release": "🟡 视情况可带病上线，排期下版本修复"
    },
    {
      "level": "轻微 (Minor/UI)",
      "alias": "P3",
      "standard": "不影响任何业务逻辑；界面排版/文字/样式问题",
      "example": "字号应 14px 实际 12px；'登录'写成'登陆'",
      "block_release": "🟢 可上线，下版本修复"
    }
  ]
}
```

---

### [11-02] Bug 排查四步流程图

- **所在章节**：B. Bug 排查通用流程表
- **当前文字描述**：四步骤文字描述（查前端F12 → 查状态码 → 查服务器日志 → 查数据库），嵌有 bash 和 SQL 代码块，但流程关系不直观。
- **建议组件类型**：`flowchart`
- **组件内容/数据**：

```json
{
  "type": "flowchart",
  "title": "Bug 排查通用四步流程",
  "direction": "vertical",
  "nodes": [
    {
      "id": "step1",
      "label": "第一步：查前端（F12 Network）",
      "questions": ["请求发出了吗？", "请求参数格式符合 API 约定吗？", "有没有标红的失败请求？"],
      "color": "#3B82F6",
      "tool": "Chrome DevTools → Network 面板"
    },
    {
      "id": "step2",
      "label": "第二步：查网络响应（状态码）",
      "questions": ["200 → 问题在返回数据本身", "400 → 前端传参格式/结构不合法", "404 → 接口路径错误或未部署", "500/502 → 后端服务器内部错误"],
      "color": "#8B5CF6",
      "tool": "Response 面板 → Status Code"
    },
    {
      "id": "step3",
      "label": "第三步：查服务器日志（Linux）",
      "questions": ["tail -f /path/to/error.log 实时滚动查看", "同时在前端重现问题", "找 NullPointerException 等详细报错"],
      "color": "#F59E0B",
      "tool": "SSH 连接服务器 + tail / grep 命令"
    },
    {
      "id": "step4",
      "label": "第四步：查底层数据（MySQL）",
      "questions": ["全程 200 但展示不对时", "SELECT * FROM table WHERE condition 查实际数据", "可能是历史脏数据导致查询异常"],
      "color": "#10B981",
      "tool": "MySQL 客户端（Navicat / 命令行）"
    }
  ],
  "edges": [
    { "from": "step1", "to": "step2", "label": "请求正常发出但有异常状态码" },
    { "from": "step2", "to": "step3", "label": "状态码 500 → 后端出错，进服务器查日志" },
    { "from": "step3", "to": "step4", "label": "日志无明显报错 → 怀疑脏数据" }
  ]
}
```

---

### [11-03] HTTP 状态码速查

- **所在章节**：C. 常用 HTTP 响应状态码速查
- **当前文字描述**：一张九行表格列出状态码、含义、常见原因，纯静态表格。
- **建议组件类型**：`http-demo`（状态码交互查询）
- **组件内容/数据**：

```json
{
  "type": "http-demo",
  "title": "HTTP 状态码速查 & 测试场景对照",
  "interactive": true,
  "codes": [
    { "code": 200, "text": "OK",                   "category": "success", "color": "#10B981", "meaning": "请求成功", "tester_action": "验证响应体字段是否符合接口文档" },
    { "code": 201, "text": "Created",              "category": "success", "color": "#10B981", "meaning": "新资源创建成功（POST）", "tester_action": "去数据库确认新记录已写入" },
    { "code": 400, "text": "Bad Request",          "category": "client",  "color": "#F59E0B", "meaning": "前端传参格式错误，缺少必填字段", "tester_action": "查看 Payload 确认哪个字段格式有问题 → 前端 Bug" },
    { "code": 401, "text": "Unauthorized",         "category": "client",  "color": "#F59E0B", "meaning": "未登录或 Token 过期", "tester_action": "确认 Headers 中 Authorization 是否正确携带 Token" },
    { "code": 403, "text": "Forbidden",            "category": "client",  "color": "#F59E0B", "meaning": "已登录但权限不足", "tester_action": "验证不同角色的权限隔离是否正确（权限测试重点）" },
    { "code": 404, "text": "Not Found",            "category": "client",  "color": "#F59E0B", "meaning": "接口路径不存在或资源不存在", "tester_action": "确认 URL 是否正确；后端是否已部署该接口" },
    { "code": 500, "text": "Internal Server Error","category": "server",  "color": "#EF4444", "meaning": "后端代码抛出异常", "tester_action": "进服务器查日志 tail -f error.log，截图给后端 → 后端 Bug" },
    { "code": 502, "text": "Bad Gateway",          "category": "server",  "color": "#EF4444", "meaning": "后端服务挂掉或正在重启", "tester_action": "通知后端检查服务是否崩溃" },
    { "code": 504, "text": "Gateway Timeout",      "category": "server",  "color": "#EF4444", "meaning": "后端处理时间过长，请求超时", "tester_action": "记录超时时间，性能问题，通知后端优化" }
  ]
}
```

---

### [11-04] SQL 速查可执行演示

- **所在章节**：D. 常用 SQL 速查
- **当前文字描述**：一个大代码块列出七条 SQL，包括 SELECT、WHERE、ORDER BY、COUNT、JOIN、UPDATE、DELETE，只有注释说明。
- **建议组件类型**：`sql-demo`
- **组件内容/数据**：

```json
{
  "type": "sql-demo",
  "title": "测试常用 SQL 速查 — 可执行演练",
  "description": "选择常见场景，点击运行查看 Mock 数据返回结果",
  "mock_tables": {
    "users": [
      { "user_id": 1, "username": "test",     "email": "test@example.com", "account_balance": 100 },
      { "user_id": 2, "username": "zhangsan", "email": "zhang@example.com","account_balance": 9999 }
    ],
    "orders": [
      { "order_id": 1001, "user_id": 1, "total_amount": 88,  "status": "paid",    "create_time": "2026-01-01" },
      { "order_id": 1002, "user_id": 1, "total_amount": 200, "status": "pending", "create_time": "2026-01-02" },
      { "order_id": 1003, "user_id": 2, "total_amount": 999, "status": "paid",    "create_time": "2026-01-03" }
    ],
    "bugs": [
      { "bug_id": 1, "title": "登录闪退", "severity": "P0", "status": "closed" },
      { "bug_id": 2, "title": "价格显示错误", "severity": "P1", "status": "open" },
      { "bug_id": 3, "title": "字体偏小", "severity": "P3", "status": "open" }
    ]
  },
  "preset_queries": [
    { "label": "基础查询：查指定用户",         "sql": "SELECT * FROM users WHERE username = 'test';",   "scenario": "验证注册后用户数据是否正确写入" },
    { "label": "查指定状态的订单",             "sql": "SELECT * FROM orders WHERE status = 'pending';",  "scenario": "查看所有待支付订单" },
    { "label": "按金额降序排序",               "sql": "SELECT * FROM orders ORDER BY total_amount DESC;","scenario": "找金额最大的订单验证" },
    { "label": "统计 P0 Bug 数量",            "sql": "SELECT COUNT(*) FROM bugs WHERE severity = 'P0';", "scenario": "测试报告中统计各优先级 Bug 数量" },
    { "label": "连表查询用户和订单",           "sql": "SELECT u.username, o.order_id, o.total_amount\nFROM users u\nJOIN orders o ON u.user_id = o.user_id\nWHERE u.user_id = 1;", "scenario": "验证用户和订单的关联数据" },
    { "label": "⚠️ 更新数据（测试库！慎用）", "sql": "UPDATE users SET account_balance = 9999 WHERE username = 'test';", "scenario": "快速准备大额支付测试数据", "warning": "执行前确认连接的是测试数据库！" }
  ]
}
```

---

### [11-05] 学习时长安排表

- **所在章节**：F. 课程学习参考时长安排表
- **当前文字描述**：一张六行的时间安排表格，描述每周应完成的模块和目标。
- **建议组件类型**：`checklist`
- **组件内容/数据**：

```json
{
  "type": "checklist",
  "title": "6 周学习时间表（含打卡）",
  "description": "每周完成后打卡，记录实际完成日期，监督自己的学习节奏",
  "items": [
    { "week": "第 1 周", "modules": "模块 01-02", "goal": "建立基本认知，了解测试是什么、做什么", "daily_task": "每天 2 小时精读内容 + 整理笔记" },
    { "week": "第 2 周", "modules": "模块 03-05（前半）", "goal": "掌握测试流程、用例设计方法", "daily_task": "每天手写至少 20 条正规用例" },
    { "week": "第 3 周", "modules": "模块 03-05（后半冲刺）", "goal": "Bug 管理 + 测试报告", "daily_task": "找 3 个真实 APP 每天练习找 Bug 并提单" },
    { "week": "第 4 周", "modules": "模块 06-07", "goal": "工具上手：Postman、F12、MySQL、Linux", "daily_task": "每个工具必须实际操作一遍，截图留存" },
    { "week": "第 5 周", "modules": "模块 08", "goal": "完成完整项目实战，形成简历作品", "daily_task": "每天持续推进，至少产出 30 条用例 + 5 个 Bug 单" },
    { "week": "第 6 周", "modules": "模块 09-10", "goal": "打磨简历，整理高频面试题，准备投递", "daily_task": "每天练习讲项目（录音或对着镜子讲）" }
  ]
}
```

---

## 汇总索引

| 编号 | 模块 | 组件类型 | 章节位置 | 实现优先级 |
|------|------|---------|---------|-----------|
| 00-01 | 模块00 | `timeline` | 课程整体路线图 | P0 |
| 00-02 | 模块00 | `checklist` | 建议学习节奏 | P1 |
| 00-03 | 模块00 | `checklist` | 成果物对应表 | P1 |
| 01-01 | 模块01 | `flowchart` | 三大环境关系 | P0 |
| 01-02 | 模块01 | `comparison` | 前后端架构类比 | P0 |
| 01-03 | 模块01 | `mindmap` | 账号/密码/缓存等概念 | P2 |
| 02-01 | 模块02 | `mindmap` | 测试分类体系 | P1 |
| 02-02 | 模块02 | `comparison` | 黑盒 vs 白盒 | P0 |
| 02-03 | 模块02 | `mindmap` | 团队协作角色图 | P2 |
| 03-01 | 模块03 | `flowchart` | 完整测试流程 | P0 |
| 03-02 | 模块03 | `timeline` | 敏捷Sprint节奏 | P1 |
| 03-03 | 模块03 | `comparison` | 协作沟通指南 | P1 |
| 04-01 | 模块04 | `mindmap` | 业务场景树拆解 | P0 |
| 04-02 | 模块04 | `input-demo` | 等价类划分法演示 | P0 |
| 04-03 | 模块04 | `input-demo` | 边界值分析法演示 | P0 |
| 04-04 | 模块04 | `flowchart` | 场景法基本流备选流 | P1 |
| 04-05 | 模块04 | `testcase` | 标准测试用例表 | P0 |
| 05-01 | 模块05 | `flowchart` | Bug 生命周期 | P0 |
| 05-02 | 模块05 | `comparison` | Bug 单好坏对比 | P0 |
| 05-03 | 模块05 | `testcase` | 测试报告结构 | P1 |
| 06-01 | 模块06 | `http-demo` | HTTP请求/响应结构 | P0 |
| 06-02 | 模块06 | `devtools` | F12 Network模拟 | P0 |
| 06-03 | 模块06 | `checklist` | 接口测试四步验证 | P1 |
| 07-01 | 模块07 | `terminal` | Linux 日志查看命令 | P0 |
| 07-02 | 模块07 | `sql-demo` | SQL 查询可执行演示 | P0 |
| 07-03 | 模块07 | `devtools` | 前后端 Bug 归因练习 | P1 |
| 08-01 | 模块08 | `testcase` | 支付链路测试用例 | P1 |
| 08-02 | 模块08 | `checklist` | 移动端测试场景清单 | P1 |
| 08-03 | 模块08 | `checklist` | 实战项目交付清单 | P1 |
| 09-01 | 模块09 | `comparison` | 甲方 vs 外包 | P1 |
| 09-02 | 模块09 | `comparison` | 简历好坏对比 | P0 |
| 09-03 | 模块09 | `flashcard` | 高频面试题问答卡 | P0 |
| 10-01 | 模块10 | `checklist` | 入职30天行动计划 | P1 |
| 10-02 | 模块10 | `timeline` | 职业进阶路径 | P1 |
| 11-01 | 模块11 | `testcase` | Bug 严重度分级速查 | P1 |
| 11-02 | 模块11 | `flowchart` | Bug排查四步流程图 | P0 |
| 11-03 | 模块11 | `http-demo` | HTTP状态码速查 | P1 |
| 11-04 | 模块11 | `sql-demo` | SQL速查可执行演示 | P1 |
| 11-05 | 模块11 | `checklist` | 学习时长安排表 | P2 |

**组件类型统计：**
- `flowchart`：6 个
- `comparison`：7 个
- `checklist`：9 个
- `testcase`：4 个
- `timeline`：4 个
- `mindmap`：4 个
- `input-demo`：2 个
- `http-demo`：2 个
- `sql-demo`：2 个
- `devtools`：2 个
- `terminal`：1 个
- `flashcard`：1 个（面试题翻牌）

**合计：39 个交互组件**
