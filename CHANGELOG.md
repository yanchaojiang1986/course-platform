# Changelog

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
