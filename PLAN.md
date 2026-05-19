# 功能测试训练营平台 · 完整实施计划

_最后更新：2026-05-17_

---

## 一、产品定位

面向零基础转行学员的功能测试训练平台。核心理念：**不是看视频，是真的做**。

- 用户：零基础/弱基础，准备转行做功能测试的学员
- 分发：Zeabur 部署，付费学员访问
- 技术栈：React 18 + Tailwind CSS + Vite 5（前端）/ Express + Anthropic SDK（后端）

---

## 二、整体架构（已实现）

```
主界面：Scrimba 风格教程地图（12 个模块卡片）
  └── 模块详情页（两 Tab）
        ├── Tab 1：基础关卡（Phase 1）
        │     ├── 富媒体内容（Markdown + 交互组件）← 待实现
        │     └── 章节内嵌练习 ← 待实现
        │           └── ≥80% 通关 → 解锁实战
        │
        └── Tab 2：实战关卡（Phase 2）
              ├── 情境任务描述
              ├── Demo 应用（iframe 内嵌）
              └── 苏格拉底 AI 教练 / 模拟面试官
```

---

## 三、三阶段实施路线图

### 阶段 A：已完成 ✅

| 组件 | 说明 |
|---|---|
| CourseMap.jsx | Scrimba 风格教程地图主页 |
| ModuleCard.jsx | 模块卡片（两阶段状态显示） |
| ModuleDetail.jsx | 两 Tab 详情页 |
| Exercise.jsx | 80% 通关门槛 + 错题写入 |
| WrongBook.jsx | 跨模块错题本抽屉 |
| ScenarioPanel.jsx | Phase 2 情境任务面板 |
| AIPanel.jsx | 三模式 AI（教辅/苏格拉底/面试官） |
| App.jsx | 教程地图/模块详情路由 |
| server.js | Mock API（login/products/orders/weather） |
| DemoFrame.jsx | Demo 应用内嵌组件 |
| data/scenarios.js | 11 个模块实战情境 |
| data/exercises.js | 所有模块练习题（3-6题/模块） |
| public/demo/*.html | 3 个预埋 Bug 的 Demo 应用 |

---

### 阶段 B：交互式内容组件 ← 当前重点

**核心思路**：在 Markdown 文件中用 `<!-- DEMO:类型:参数 -->` 标记，ContentViewer 解析后替换为对应交互组件。

#### B1. 组件类型清单

| 标记 | 组件 | 用途 |
|---|---|---|
| `<!-- DEMO:terminal -->` | 模拟 Linux 终端 | ls/grep/tail -f/cat 等命令实际可执行 |
| `<!-- DEMO:mindmap:标题 -->` | 可展开脑图 | 测试点梳理、知识结构可视化 |
| `<!-- DEMO:testcase:场景 -->` | Excel 风格用例表 | 含优先级颜色、执行状态列 |
| `<!-- DEMO:flowchart:类型 -->` | 流程图 | Bug 生命周期、测试流程、发布流程 |
| `<!-- DEMO:http -->` | HTTP 请求演示 | 状态码、请求头、JSON 响应交互查看 |
| `<!-- DEMO:devtools -->` | 模拟 F12 面板 | Network 抓包排查演示 |
| `<!-- DEMO:input:场景 -->` | 输入即时验证 | 等价类/边界值规则即时反馈 |
| `<!-- DEMO:comparison:A:B -->` | 对比卡片 | 黑盒vs白盒、甲方vs外包等 |
| `<!-- DEMO:sql -->` | Mock SQL 执行器 | SELECT 查询返回模拟数据 |
| `<!-- DEMO:timeline:类型 -->` | 时间线 | 职业路径、测试阶段顺序 |
| `<!-- DEMO:checklist:类型 -->` | 交互检查清单 | 发布前 checklist、入职第一周任务 |

#### B2. 具体插入位置
→ 见 `INTERACTIVE_MAP.md`（由扫描 Agent 生成）

#### B3. 实现步骤

1. **改 ContentViewer.jsx**：解析 `<!-- DEMO:xxx -->` 标记，分段渲染（Markdown + 组件交替）
2. **建 src/components/interactive/ 目录**，每类组件一个文件
3. **按模块优先级**逐步给 md 文件加标记，组件与标记同步推进

#### B4. 优先实现顺序

1. `terminal` — 模块 07（Linux命令），最直观，学员体验落差最大
2. `mindmap` — 模块 04（测试点梳理），XMind 的替代品
3. `testcase` — 模块 04/05（用例表），Excel 的替代品
4. `flowchart` — 模块 03/05（测试流程、Bug 生命周期）
5. `input` — 模块 04（等价类/边界值即时演示）
6. `http` + `devtools` — 模块 06（接口测试抓包）
7. 其余组件按需推进

---

### 阶段 C：章节内嵌练习

**核心思路**：内容按章节分割，每节后插入 1-2 道即时检验题，答对解锁下一节。

```
章节 1 内容 → [即时检验题] → 通过 → 章节 2 内容 → [即时检验题] → ...
```

**实现步骤**：
1. 在 md 文件章节末尾加 `<!-- CHECK:q01_1 -->` 标记（引用 exercises.js 中的题目 ID）
2. ContentViewer 识别标记，渲染 MiniQuiz 组件（单题版 Exercise）
3. 答对自动展开下一章节，答错给出解析但仍可继续（不强制拦截，避免挫败感）

---

## 四、Demo 应用规划（已有 + 待建）

| Demo | 文件 | 对应模块 | 状态 |
|---|---|---|---|
| 用户注册表单 | demo/register.html | 04 | ✅ 已完成（5个预埋Bug） |
| 购物车应用 | demo/shop.html | 05 | ✅ 已完成（8个预埋Bug） |
| 天气查询接口 | demo/weather.html | 06 | ✅ 已完成（5个预埋Bug） |
| Linux 终端模拟器 | demo/terminal.html | 07 | 待建 |
| API 测试工具 | demo/api-tester.html | 06/07 | 待建 |
| Bug 管理系统 | demo/bugtracker.html | 05/08 | 待建（后期） |

---

## 五、部署配置

- 平台：Zeabur
- 构建：`npm run build` → `node server.js`
- 环境变量：`ANTHROPIC_API_KEY`
- 配置文件：`zbpack.json`（已存在）

---

## 六、文件说明

| 文件 | 说明 |
|---|---|
| `PLAN.md` | 本文件，完整实施计划 |
| `INTERACTIVE_MAP.md` | 全教程交互组件插入清单（Agent 生成） |
| `CURRENT_TASK.md` | 当前任务进度快照（自动更新） |
| `public/content/*.md` | 教程内容文件 |
| `public/demo/*.html` | 可测试 Demo 应用 |
| `src/components/` | React 组件 |
| `src/data/` | 静态数据（模块、练习题、情境） |
