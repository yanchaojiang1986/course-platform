# 项目评审记录

## 2026-05-17 v1.0.2 全量评审

**总体评分：8.0 / 10**

上次评审（6.5 分）指出的核心问题已全部修复，工程化闭环基本完整。当前版本可作为迭代基线。以下按层次逐项分析。

---

## 一、架构层

### 优点
- 前后端职责分离清晰：Vite 构建产物由 Express 托管，生产/开发路径一致，无双端口问题
- `/content` 路由被服务端拦截（`server.js:276`），防止 Markdown 绕过鉴权直接访问——设计正确
- `access.js` 单一模块统一权限逻辑，前后端复用同一套 `PLAN_RANK`，无重复定义
- 数据库 Schema 启动时自动创建（`ensureSchema`），零 migration 负担，适合小规模部署
- `BYPASS_LOGIN`（`App.jsx:9`）的调试绕过用前端常量而非环境变量，无需改 .env，本地验收方便

### 问题
- **`BYPASS_LOGIN = true` 硬编码**（`App.jsx:9`）：若部署前未手动改回，生产环境任何人都能以 svip 身份访问全教程。建议改为 `const BYPASS_LOGIN = import.meta.env.DEV`，彻底消灭人工记忆依赖
- `server.js` 中 `PLAN_RANK` 和 `normalizePlan`、`hasPlanAccess` 均为内联副本（`server.js:2-4`，对比 `utils/access.js:1-15`），与前端实际存在两套，只是恰好内容一致。后端应直接 import `src/utils/access.js`，或把 utils 提到共享层

---

## 二、后端（server.js）

### 优点
- 邀请码兑换走数据库事务（`BEGIN/COMMIT/ROLLBACK`，`server.js:320-381`），并发安全，逻辑完整
- `loadUserById` 在查询时自动过期会员降级为 free（`server.js:174-182`），无需定时任务
- SSE 流式回复异常处理正确：已发 headers 时向流写错误再 end，未发时走正常 500（`server.js:576-587`）
- Mock API 预埋的 Bug（大小写、空参数、stock=0 等）覆盖接口测试典型考点，教学价值高
- 本地调试账号（`ensureLocalDebugAdmin`）生产环境自动跳过，安全边界处理到位

### 问题
- **`/api/auth/redeem` 和 `/api/admin/invite-codes/generate` 缺少速率限制**：暴力枚举授权码 hash 理论可行（`sha256(code)`），建议加 `express-rate-limit` 或 IP 级频控
- **`/api/content/:moduleId` 同步读文件**（`readFileSync`，`server.js:445`）：内容量小时无妨，但若教程 md 文件日后变大，会阻塞事件循环，建议改为 `fs.promises.readFile`
- `systemPrompt` 由前端传入（`server.js:548`），后端直接使用未做校验，恶意用户可伪造 system prompt 覆盖教练人设。建议后端根据 `mode` 自行拼装 system，前端只传 `mode`

---

## 三、前端——状态管理

### 优点
- `CourseMap` 的进度订阅改为事件驱动（`storage` + `progress-updated` + `focus`，`CourseMap.jsx:65-74`），已彻底消除上次评审指出的无限渲染问题
- `Exercise.jsx:26-29` 的 submitted 判断改为 `!!(d && typeof d.score === 'number' && Object.keys(d.answers||{}).length > 0)`，修复了 score=0 被误判为未提交的 bug
- `ModuleDetail` 的 Phase 2 `completed` 路径（`handlePhase2Complete`，`ModuleDetail.jsx:51-56`）已正常写入，进度统计可达

### 问题
- **`AIPanel.jsx:61-63` 的 `useEffect` 监听 `mode` 变化重置消息**，但 `welcomeKey` 是 `mode` 的派生值，应直接用 `mode` 作为 key prop 强制重建组件，避免历史消息在切换时短暂可见
- `ContentViewer` 的 `addSectionNumbering`（`ContentViewer.jsx:60-87`）在每次渲染时创建 DOMParser 解析整段 HTML，多段内容时性能较差；headingCounters 对象跨段累加逻辑正确，但每个 markdown 段独立调用、无法跨段连续编号（新段从上一段的最终计数继续，这是预期行为，但代码不明显）

---

## 四、前端——组件设计

### 优点
- `ContentViewer` 的段落解析（`parseSegments`）用 regex 切割 `<!-- DEMO: -->` 和 `<!-- CHECK: -->`，设计简洁，扩展新标记只需加一个 `else if`
- `InlineCheckCard` 答错后提供「再试一次」和「看解析后继续」双出口，不强制拦截，教学体验合理
- `Exercise.jsx` 的 `reset` 保留历史 `passed` 状态（`Exercise.jsx:68`），重做不清除已通关标记，防止误操作
- `AuthPage` 的激活与登录两 Tab 共用一个错误展示区，UI 简洁

### 问题
- **`AIPanel` 宽度硬编码为 `width: 380`**（`AIPanel.jsx:168`），在移动端 < 400px 时会撑破布局，应改为 `min-w-[320px] w-[380px] max-w-full`
- `WrongBook` 和 `Sidebar` 未被评审（代码未完整阅读），不列入本次评分

---

## 五、安全性

| 项目 | 状态 | 说明 |
|------|------|------|
| SQL 注入 | ✅ 安全 | 全部使用参数化查询 `$1, $2...` |
| XSS | ⚠️ 注意 | `dangerouslySetInnerHTML` 渲染 `marked.parse(content)`，内容来自服务端文件系统，风险可控；但若日后允许用户上传 md，需加 DOMPurify |
| JWT | ✅ 安全 | `httpOnly + sameSite:lax + secure(生产)`，无 localStorage 存 token |
| 密码存储 | ✅ 安全 | bcrypt 10 轮，强度合理 |
| 授权码枚举 | ⚠️ 缺失 | 见后端问题第1条 |
| System Prompt 注入 | ⚠️ 缺失 | 见后端问题第3条 |

---

## 六、教程内容（公开可见部分）

**仅评审内容结构，未逐字审阅全部 md 文件。**

- 12 个模块覆盖「基础→方法→工具→实战→求职」完整链路，主题切分合理
- 3 个预埋 Bug 的 Demo 应用（register/shop/weather）与模块对应清晰，学习目标明确
- 交互组件（14 个）品类齐全：终端、脑图、流程图、SQL 执行器、HTTP 演示等，超出同类平台平均水平
- `inlineChecks` 每个模块均有内嵌检验题，章节解锁机制逻辑完整
- **待补充**：模块 08-11（svip）内容成熟度未知；demo/terminal.html、demo/api-tester.html 在 PLAN.md 中标记为「待建」，当前缺失不影响核心流程但会露白

---

## 七、工程化

| 项目 | 状态 |
|------|------|
| 构建 (`npm run build`) | ✅ 通过 |
| 语法检查 | ✅ 通过（node --check） |
| .gitignore | ✅ 完整（node_modules/dist/.env） |
| README | ✅ 已补充 |
| CHANGELOG | ✅ 已补充 |
| 自动化测试 | ❌ 占位脚本，无实质覆盖 |
| CI/CD | ❌ 无 GitHub Actions |
| 速率限制 | ❌ 缺失 |

---

## 八、待办（按优先级）

1. **高**：`App.jsx:9` `BYPASS_LOGIN` 改为 `import.meta.env.DEV`，彻底消灭生产泄露风险
2. **高**：`/api/chat` 后端自行拼装 system prompt，前端只传 `mode`
3. **中**：邀请码接口加速率限制（`express-rate-limit`）
4. **中**：`/api/content/:moduleId` 改为异步读文件
5. **低**：后端 `PLAN_RANK`/`hasPlanAccess` 改为从 `utils/access.js` import 消除副本
6. **低**：`AIPanel` 宽度改为响应式
7. **后续**：补充 demo/terminal.html、demo/api-tester.html
