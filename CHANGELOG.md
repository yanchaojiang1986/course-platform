# Changelog

## [1.1.5] - 2026-05-19

### 变更
- 课程正文布局改为更强自适应：移除 `ContentViewer` 与知识关卡区域的桌面端窄列限制（`max-w-3xl/5xl`），内容区随窗口宽度扩展，减少左右留白。
- 移动端导航抽屉改为全屏 Overlay 形态：打开菜单时隐藏底部导航并锁定页面滚动，避免菜单被遮挡与正文可视区被挤压。
- 移动端滚动体验优化：保留手势滑动，隐藏滚动条本体以释放小屏可视空间。

### 新增
- 本地开发运维脚本（仅本地）：
- `scripts/dev-local.sh`：一键启动前后端、端口占用自动释放、健康检查与日志落盘。
- `scripts/stop-local.sh`：一键停止本地前后端并释放端口。
- `scripts/status-local.sh`：查看本地服务进程与端口状态。
- `package.json` 新增脚本：`dev:local`、`stop:local`、`status:local`。

### 修复
- 修复本地调试时的 `Failed to fetch` 链路问题：恢复并固定前后端运行链路（`9527 -> 4321`），确保课程内容接口可用。

### 质量校验
- `npm run lint` 通过（含 `lint:content`，52 个 blockId 校验通过）。
- `npm run build` 通过（84 modules）。

---

## [1.1.4] - 2026-05-19

### 修复
- 优化触控端（手机/平板）课程阅读体验：正文从“卡片内滚动”切换为“整页流式滚动”。
- `ModuleDetail.jsx` 将 `Phase1/Phase2` 的内部滚动断点由 `md` 提升为 `xl`，避免移动端被固定容器限制。
- `ScenarioPanel.jsx` 与 `AIPanel.jsx` 同步将侧栏/面板固定布局断点由 `md` 提升为 `xl`，小屏不再强制双栏挤压。
- `index.css` 新增触控端阅读模式样式（`module-page-flow/module-reader-shell`），解除卡片边框与背景包裹，提升连续阅读体验。

### 质量校验
- `npm run lint` 通过（含 `lint:content`，52 个 blockId 校验通过）。
- `npm run build` 通过（84 modules）。

---

## [1.1.3] - 2026-05-19

### 修复
- 修复移动端进入学习模块时“章节内容在小框内滚动”的体验问题。
- `Phase1` 改为仅桌面端使用内部滚动容器（`md:max-h + md:overflow-y-auto`），手机端恢复整页滚动。
- `Phase2` 改为移动端流式上下布局，取消移动端固定 `100vh` 容器与横向双栏限制。
- `ScenarioPanel` 与 `AIPanel` 同步移动端尺寸策略，避免小屏宽度被强制最小宽度挤压。

### 质量校验
- `npm run lint` 通过（含 `lint:content`，52 个 blockId 校验通过）。
- `npm run build` 通过（84 modules）。

---

## [1.1.2] - 2026-05-18

### 新增
- 移动端导航模式：手机端新增“底部导航 + 抽屉菜单”双层导航结构。

### 变更
- `WorkbenchSidebar.jsx` 支持移动断点切换：
- `<=900px` 时关闭左侧常驻栏，改为底部快捷入口（总览/当前模块/错题本/菜单）与抽屉全量菜单。
- `>900px` 保持现有桌面与平板侧栏布局。
- `index.css` 新增移动抽屉、遮罩、底部导航与主内容底部安全留白样式，避免内容被导航遮挡。

### 质量校验
- `npm run lint` 通过（含 `lint:content`，52 个 blockId 校验通过）。
- `npm run build` 通过（84 modules）。

---

## [1.1.1] - 2026-05-18

### 新增
- 侧栏导航新增模块通关外框状态：`default / in_progress / completed` 三态可视化。

### 变更
- `App.jsx` 新增模块完成态计算逻辑，基于 `phase1_/phase2_` 本地进度实时汇总并透传到侧栏项。
- `WorkbenchSidebar.jsx` 支持 `item.state` 渲染与 `data-state` 标识，保持现有交互逻辑不变。
- `index.css` 增加导航图标三态样式：进行中（琥珀外框）、已完成（绿色高亮外框+发光）、已完成且激活态强化。

### 质量校验
- `npm run lint` 通过（含 `lint:content`，52 个 blockId 校验通过）。
- `npm run build` 通过（84 modules）。

---

## [1.1.0] - 2026-05-18

### 新增
- 课程扩展到 16 个模块：新增模块 12/13/14/15 及对应内容文件、随堂检测、关卡题、互动数据、实战场景。
- 新增前端日志模块 `src/utils/clientLogger.js`：记录关键错误到浏览器控制台与 `localStorage(cp_frontend_logs)`。
- 新增后端日志落盘：`logs/backend.log`，记录服务启动、API 请求、模块访问异常、SSE 失败等事件。

### 变更
- 课程地图与模块卡按会员分层展示全部模块（含锁定态），并统一权限提示流程。
- 迁移引入内容后，按本项目既有架构标准完成数据收敛：`mindmap/checklist/flowchart/timeline` 全部回归统一 schema，不再通过组件兼容非标准结构。
- 模块 07 保持“去 AI 测试化”口径，移除 AI 测试教学条目与对应题目残留。

### 修复
- 修复“模块不存在/内容加载失败”排查链路：统一使用当前运行端口 `9527 -> 4321`，并补充访问日志便于定位旧服务/错端口访问。
- 修复新增模块中若干互动块的字段映射问题（缺 `edges`、`sections` 与 `root.children` 非标准结构）。

### 质量校验
- `npm run lint` 通过（含 `lint:content`，52 个 blockId 校验通过）。
- `npm run build` 通过（84 modules）。
- 手工巡检：`/api/content/:moduleId` 全量 16 个模块返回成功。

---

## [1.0.9] - 2026-05-17

### 新增
- 新增 `todolist.md`，记录会员分层、Pro AI 知识库约束、手机端兼容、登录页 UI、暗色模式、二维码联系弹窗与推广裂变机制等后续待办。

### 变更
- 清除课程内容中的 AI 测试教学内容：删除模块 07 的“AI 辅助测试”章节。
- 模块 11 的 AI 相关练习题与章节检测题替换为数据库安全操作、UAT 术语等基础测试知识。
- 课程说明、学习路线与 AI 教辅系统提示中移除“AI 辅助测试”课程覆盖描述。
- 求职模块的推荐交互形式从“AI 面试扩展入口”调整为“面试问答练习入口”。

### 质量校验
- `npm run lint` 通过（含 `lint:content`，39 个 blockId 校验通过）。
- `npm run build` 通过（79 modules）。

---

## [1.0.8] - 2026-05-17

### 变更
- Trae 完成交互组件 UI 体系优化：`interactive/*` 组件整体切换到更统一的卡片、表格、流程图、导图、终端、接口、SQL、图表展示风格。
- `src/index.css` 扩展交互组件通用样式能力，支撑浅/深色模式下的统一边框、背景、标题与内容层级。
- 去除课程标题与侧栏中不友好的模块编号前缀：侧栏模块项仅显示课程名称，模块详情页抬头改为模块标签。
- `Mindmap.jsx` 更新为新的导图树结构与深浅色兼容样式，支持折叠分支与子节点连线展示。

### 质量校验
- `npm run lint` 通过（含 `lint:content`，39 个 blockId 校验通过）。
- `npm run build` 通过（79 modules）。

---

## [1.0.7] - 2026-05-17

### 变更
- 引入工作台式布局：新增 `src/components/WorkbenchSidebar.jsx`，主界面改为「左侧分组导航 + 右侧内容区」结构。
- `src/App.jsx` 统一路由视图状态：`map / wrongbook / moduleId`，侧栏驱动模块切换，错题本并入主视图。
- `src/components/CourseMap.jsx` 与 `src/components/ModuleDetail.jsx` 适配新工作台容器，移除原页面级返回/退出入口耦合。
- `src/index.css` 扩展工作台视觉体系（`ws-*`），并继续统一卡片语义样式细节。

### 配置
- 端口策略调整：
  - `server.js` 默认后端端口由 `3001` 调整为 `4321`（仍可通过 `PORT` 覆盖）。
  - `vite.config.js` 更新开发端口配置，避免与现有本地进程冲突。
- `tailwind.config.js` 同步扫描路径，覆盖新增组件文件。

### 质量校验
- `npm run lint` 通过（含 `lint:content`，39 个 blockId 校验通过）。
- `npm run build` 通过（79 modules）。

---

## [1.0.6] - 2026-05-17

### 变更
- 建立统一卡片语义层：`src/index.css` 新增 `.card-surface` / `.card-item` / `.card-accent` 及六色变体（`sky/emerald/amber/rose/fuchsia/violet`），集中管理透明度与边框强度。
- 课程核心页面统一改造到语义化卡片系统：
  - `ModuleCard.jsx`：去除硬编码深色渐变，改为 `elevated-card + text-fg-*`，状态徽章配色统一。
  - `WrongBook.jsx`：抽屉容器与题卡改为 `bg-surface + card-surface`，选项配色与 `Exercise` 对齐。
  - `Exercise.jsx`：容器与结果反馈改为 `card-accent-*` 体系。
  - `ScenarioPanel.jsx`：场景背景/任务条/提示条改为 `card-surface/card-item/card-accent-*`。
  - `ContentViewer.jsx`：内嵌检测题与缺题提示改为 `card-accent-*`。
  - `interactive/ErrorCard.jsx`：错误卡改为 `card-accent-rose`，浅深色一致。

### 修复
- 修复浅色模式可读性问题：统一失败态/提示态文字到 `*-700`，深色模式统一为 `*-200`。
- 消除组件内重复透明度写法（`/8 /10 /12 /15` 与 `border /35 /40 /45`），收敛为统一 token（背景 10%、边框 40%）。

### 质量校验
- `npm run lint` 通过（含 `lint:content`，39 个 blockId 全通过）。
- `npm run build` 通过（78 modules，css 47.84kB gzip 9.17kB）。

---

## [1.0.5] - 2026-05-17

### 新增
- 新增交互错误可视化组件 `src/components/interactive/ErrorCard.jsx`。
- 新增交互数据校验模块 `src/data/validateInteractive.js`（14 种 type schema + `validateInteractiveData()`）。
- 新增内容交叉校验脚本 `scripts/validate-content.mjs`（扫描 markdown DEMO 标记、校验孤儿标记、未引用数据、schema 合法性）。

### 变更
- `src/components/interactive/InteractiveBlock.jsx`：将 `!data` 与未知 `type` 的静默 `return null` 改为可见错误卡。
- `src/App.jsx`：启动时执行交互数据校验，开发环境顶部展示校验红条，生产环境保留控制台报错。
- `package.json`：`lint` 串联 `lint:syntax + lint:content`，并将 `lint:syntax` 改为 `find` 兼容写法。

### 修复
- 修复 `input-demo` schema 误判：支持 `rules` 与 `boundary_table` 两种合法结构，覆盖 `04-03` 场景。

### 质量校验
- `npm run lint` 通过（含内容校验）。
- `npm run build` 通过（78 modules，759ms）。

---

## [1.0.4] - 2026-05-17

### 变更
- 前端视觉体系升级：重构首页地图、模块卡片、模块详情、实战侧栏与 AI 面板样式，统一为高层次深色玻璃风格。
- 新增封板流程文件 `SEAL_PROCESS.md`，明确封板后自动 `git push` 为强制步骤，并在 `README.md` 文档索引中登记。

### 修复
- 修复模块 `00` 薪资看板映射错位：恢复 `00-04` 为 `salary-chart` 专属数据结构（经验等级/城市双视图），不再复用 `01` 的柱状图结构。
- 调整模块 `00` 中薪资看板位置到前置章节，避免被章节解锁截断导致“看不到”。
- 清除模块 `01` 的薪资参考看板内容及 `DEMO:01-04` 映射，避免与模块 `00` 定位重叠。

### 质量校验
- `npm run lint` 通过。
- `npm run build` 通过（76 modules，717ms）。

---

## [1.0.3] - 2026-05-17

### 文档
- 新增 `review.md` 的 `v1.0.2` 全量评审记录（总体评分 8.0/10，含分层问题与优先级待办）。

### 质量校验
- `npm run lint` 通过。
- `npm run build` 通过（76 modules，725ms）。

---

## [1.0.2] - 2026-05-17

### 变更
- 本地调试默认屏蔽登录页：`src/App.jsx` 增加 `BYPASS_LOGIN` 与 `DEMO_USER`，未登录时以演示身份进入课程。
- 课程可见范围改为基于 `effectiveUser` 计算，确保演示身份可访问会员分层课程用于验收。

### 修复
- 修正“本地调试时卡在加载态/登录态”的体验问题，便于快速核对课程内容与交互。

---

## [1.0.1] - 2026-05-17

### 新增
- 授权码 + 会员等级系统（free / vip / svip 三档权限，PostgreSQL 持久化）
- 邀请码兑换 / 登录 / 登出接口（`/api/auth/*`）
- 管理员接口：批量生成邀请码（`/api/admin/invite-codes/generate`）
- AuthPage.jsx：登录 / 邀请码兑换前端页面
- Sidebar.jsx：侧边导航组件
- ContentViewer.jsx：支持 `<!-- DEMO:type -->` 标记的富媒体内容渲染器
- 交互组件库（`src/components/interactive/`）：BarChart、Checklist、Comparison、DevTools、Flashcard、Flowchart、HttpDemo、InputDemo、Mindmap、SalaryChart、SqlDemo、Terminal、TestCase、Timeline
- 章节内嵌检验题数据（`src/data/inlineChecks/`，共 12 个模块 × N 题）
- 可视化教学样例挂载到模块 03、05、06

### 变更
- `server.js`：从 mock-only 服务升级为全功能后端（认证、权限、数据库、AI 流式对话）
- 模块内容访问加入计划权限检查（`requiredPlan` 字段）
- `INTERACTIVE_MAP.md`：记录全课程交互组件插入位置

### 修复
- 构建时 lint 脚本兼容无 `rg` 环境（fallback 到 `find`）

---

## [1.0.0] - 2026-05-17（初始封板）

### 新增
- CourseMap.jsx：Scrimba 风格课程地图主页（12 模块）
- ModuleCard.jsx、ModuleDetail.jsx：两阶段模块卡片与详情页
- Exercise.jsx：80% 通关门槛 + 错题写入
- WrongBook.jsx：跨模块错题本
- ScenarioPanel.jsx：Phase 2 实战情境面板
- AIPanel.jsx：三模式 AI 教练（教辅 / 苏格拉底 / 模拟面试官）
- DemoFrame.jsx：Demo 应用内嵌组件
- `public/demo/`：register.html（5 个预埋 Bug）、shop.html（8 个预埋 Bug）、weather.html（5 个预埋 Bug）
- `src/data/`：modules.js、exercises.js、scenarios.js、interactive.js
- `server.js`：Express 后端（Mock API + Anthropic SSE 流式对话）
- Zeabur 部署配置（zbpack.json）
