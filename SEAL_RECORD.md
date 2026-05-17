# 封板记录

## v1.0.7 — 2026-05-17（当前版本）

### 封板模式
`git-seal`（项目目录已含 `.git`，以 commit 快照 + 构建校验为基线）

### 质量校验
| 检查项 | 结果 |
|--------|------|
| `npm run lint` | ✅ 通过（含 `lint:content`） |
| `npm run build` | ✅ 通过（79 modules） |

### 本次变更摘要
- 引入工作台式侧栏布局（`WorkbenchSidebar`），课程导航改为阶段分组 + 模块条目切换。
- `App/CourseMap/ModuleDetail/WrongBook` 视图路由与容器重构，错题本并入主工作区。
- 端口配置更新：后端默认端口调整为 `4321`，前端开发端口策略同步更新。
- 全局样式扩展 `ws-*` 主题与卡片语义层，统一版面层次与交互态。

### 关键文件 SHA-256
| 文件 | SHA-256 |
|------|---------|
| `package.json` | `1739b70c2387370bf7ba927c47ea207d774e818057398e7b7c195ea8995c58f2` |
| `src/App.jsx` | `f39f7282e0f0d6390f3b945f85e8bf1a1a60e7d1bdccc2667831ff337289f8e9` |
| `src/components/WorkbenchSidebar.jsx` | `55107598cb0990009763eb407dffcb8b137069ef52c11dbaf47860a7b5d8783a` |
| `src/components/CourseMap.jsx` | `2a2d1e9ed37818159c709479dc0a9f9b7b591dab75dd2abbcd36e4a50d6417cb` |
| `src/components/ModuleDetail.jsx` | `d0bd0b026d197697cfc21580f72c48b808188824ec5947ef0b326e954aa6b773` |
| `src/components/WrongBook.jsx` | `dd356ac7c7674a67c2d7d556c756fe90a378d333028dbc1d0c3f1a6148bce0ae` |
| `src/index.css` | `c992219c3bcb8d93c3f7b01d61854ab574529837a765ed343b8136a332a21db1` |
| `server.js` | `85323da7bb8af6400272314e65f9c9e65fc68f87f79e5c73a8c35206c1de9d8a` |
| `vite.config.js` | `f703d2179f48179baa9dc354823b9fc4a09f9f40cbbeabb789332b253b96274e` |
| `tailwind.config.js` | `21f1c3ca965f92d7c51e63712b9d5c1a24bff1781f6c69a9331555282b720df7` |

### 说明
- 本次封板为“工作台布局 + 端口配置 + 视觉细化”的综合更新，已通过构建与内容校验闸门。

---

## v1.0.6 — 2026-05-17（已归档）

### 封板模式
`git-seal`（项目目录已含 `.git`，以 commit 快照 + 构建校验为基线）

### 质量校验
| 检查项 | 结果 |
|--------|------|
| `npm run lint` | ✅ 通过（含 `lint:content`） |
| `npm run build` | ✅ 通过（78 modules，759ms） |

### 本次变更摘要
- 完成 UI 色彩语义层统一：新增 `card-surface / card-item / card-accent-*` 体系，收敛背景透明度与边框强度。
- 模块卡、错题本、章节练习、实战面板、内嵌检测题与错误卡全面切换到统一卡片语义，提升浅/深色一致性与可读性。
- 降低样式维护成本：后续调色可集中在 `index.css` 变体层完成，减少跨组件重复改色。

### 关键文件 SHA-256
| 文件 | SHA-256 |
|------|---------|
| `package.json` | `f378ba254fa047be853c945b1ab5acc7cb2fc403c587bbf4f1c5edc64a40ff75` |
| `src/index.css` | `4b8fbbf48fed7bead3262ac3bb0e670d641c88e5bb0c0ea5036cc8bc18123108` |
| `src/components/ModuleCard.jsx` | `26eaf948a328e6273c08f2c9f0906259f2a67f0fd15511cf1f6972a17adb7b5d` |
| `src/components/WrongBook.jsx` | `5ff0b02b77dc572e8349d67b09578c07906ecac26851ca547a45cd60b5356dab` |
| `src/components/Exercise.jsx` | `87ed56658b2001823c53868b0cae94560d2a3b8eb1258ba3d3fbc9febf8429d8` |
| `src/components/ScenarioPanel.jsx` | `8f77aa400f094dc93dc803be3fbcb3afaf689c2b2400d9952f995d89cd80e4cf` |
| `src/components/ContentViewer.jsx` | `7c84706a9a0d1f43829cd90a3770904c69c2fdd08a45269fa65f2ae7a128fcca` |
| `src/components/interactive/ErrorCard.jsx` | `6fc800c51a64078df957c9393728b8a60039f7c71ac0d34b77f2db4fdeeec907` |

### 说明
- 本次封板为“视觉语义一致性增强”，不改变课程数据结构与业务流程。

---

## v1.0.5 — 2026-05-17（已归档）

### 封板模式
`git-seal`（项目目录已含 `.git`，以 commit 快照 + 构建校验为基线）

### 质量校验
| 检查项 | 结果 |
|--------|------|
| `npm run lint` | ✅ 通过（含 `lint:content`） |
| `npm run build` | ✅ 通过（78 modules，759ms） |

### 本次变更摘要
- 交互渲染链路增加可观测性：`InteractiveBlock` 对缺数据与非法 type 显示 `ErrorCard`，不再静默丢失。
- 增加 `validateInteractiveData()` 启动期 schema 校验与开发态红条提示。
- 增加 `scripts/validate-content.mjs`，建立 markdown 标记、interactive key、schema 三方一致性校验闸门。
- `lint` 正式串联内容校验，封板前可直接阻断映射错误。

### 关键文件 SHA-256
| 文件 | SHA-256 |
|------|---------|
| `package.json` | `7dba719472ed3e68e4ac2a38e209fa896a2202024aa964e748dc072c81863f96` |
| `src/App.jsx` | `23d2b570b5e93222554ae871364359ea1fda9f70eec8039df537d17fa204d389` |
| `src/components/interactive/InteractiveBlock.jsx` | `75d4871792d86d05205f52f9e088550f79efaf36df6e39cbf18106e2aa51835d` |
| `src/components/interactive/ErrorCard.jsx` | `0917b02e051b5e07507f7716744a8ca05b529264c9eb9f321d8805735e7d84c7` |
| `src/data/validateInteractive.js` | `74941a4db13d69f326d983d9c0c46912a536581698540142f87cb9a47d9a7991` |
| `scripts/validate-content.mjs` | `137f050641b146bd70ad8925b708beeac643ec29a3a38210e1ce122427bafddc` |

### 说明
- 本次封板重点为“可观测性 + 校验闸门”增强，目标是提前暴露映射/结构问题，降低课程内容回归成本。

---

## v1.0.4 — 2026-05-17（已归档）

### 封板模式
`git-seal`（项目目录已含 `.git`，以 commit 快照 + 构建校验为基线）

### 质量校验
| 检查项 | 结果 |
|--------|------|
| `npm run lint` | ✅ 通过 |
| `npm run build` | ✅ 通过（76 modules，717ms） |

### 本次变更摘要
- 完成前端整体视觉升级（CourseMap / ModuleCard / ModuleDetail / ScenarioPanel / AIPanel / 全局样式）。
- 修复模块 `00` 薪资看板错映射：恢复 `salary-chart` 专属 schema，恢复经验等级与城市双视图。
- 清除模块 `01` 薪资参考看板，避免与模块 `00` 重复。
- 新增 `SEAL_PROCESS.md` 并规定封板后自动推送 GitHub。

### 关键文件 SHA-256
| 文件 | SHA-256 |
|------|---------|
| `package.json` | `87484caec24e71ed414b7ef72c687bade745ad8d53ac07704cf1300b7d889ec9` |
| `src/index.css` | `1b988e4dbf466c36fbe59eebb9772c5b24a1d8106eba63ff20bf7a0613718186` |
| `src/components/CourseMap.jsx` | `46032371cbb3660229bea0f71b410a7545df1fba3b4adcd1fb51f4c8ac2fa5b3` |
| `src/components/ModuleDetail.jsx` | `cf527c0d66f672c1923cff859699d0fda856a34e0b0aa183a8315538cc6b741d` |
| `src/data/interactive.js` | `4e641c90a9204ab2756cc310054ec51280fcdb9ba3922000b0cadd2b25f19634` |
| `public/content/00_课程介绍与学习说明.md` | `f85ff9cecdd839c42a87cb3a365ad017b38575ec716b8b2e56df312ec0c994fc` |
| `public/content/01_测试前的计算机基础扫盲.md` | `bbca7cefcc4ddac094faf28681ad03e30a3cc5271e4e6b34c68735ea617d9654` |
| `SEAL_PROCESS.md` | `4c7852a529100d78cab17e98abbfabb05e9d1f6c6edb7129bc799342401e620b` |

### 说明
- 本次封板包含界面升级与课程映射修复两类变更，均已通过构建与语法校验。

---

## v1.0.3 — 2026-05-17（已归档）

### 封板模式
`git-seal`（项目目录已含 `.git`，以 commit 快照 + 构建校验为基线）

### 质量校验
| 检查项 | 结果 |
|--------|------|
| `npm run lint` | ✅ 通过 |
| `npm run build` | ✅ 通过（76 modules，725ms） |

### 本次变更摘要
- 纳入 Claude 最新 code review 结果到 `review.md`（v1.0.2 全量评审）。
- 版本号提升至 `1.0.3`，同步更新封板记录与变更日志。

### 关键文件 SHA-256
| 文件 | SHA-256 |
|------|---------|
| `review.md` | `c9b6610aecb3cfd8c6577f61046c015a6123150d73dbc4ded1480719754dfd1d` |
| `package.json` | `c3f77b4cebfb91dd2b1f21f48951f84f2f153365892919806803f5cf12855454` |

### 说明
- 本次封板为“文档与评审基线封板”，不涉及运行时代码逻辑变更。

---

## v1.0.2 — 2026-05-17（已归档）

### 封板模式
`git-seal`（项目目录已含 `.git`，以 commit 快照 + 构建校验为基线）

### 质量校验
| 检查项 | 结果 |
|--------|------|
| `npm run lint` | ✅ 通过 |
| `npm run build` | ✅ 通过（76 modules，693ms） |

### 本次变更摘要
- 屏蔽登录页用于本地调试验收（`BYPASS_LOGIN = true`）。
- 增加演示身份 `DEMO_USER(svip)`，课程展示改为按 `effectiveUser` 计算权限。
- 版本号提升至 `1.0.2`，补齐封板文档与变更记录。

### 关键文件 SHA-256
| 文件 | SHA-256 |
|------|---------|
| `src/App.jsx` | `c24bec3f713d7e57e3fda18fe8583efced20fa020d40460c57bf89c05f494c1f` |
| `package.json` | `8339e89b363f58cffb16abd1fa01c21caeca64eb18953df0ad3c9efaf04d7f4c` |
| `server.js` | `6b55187a9085b2b394c529e9319101944066e508edb1928b7608ad55733a77e8` |

### 说明
- 当前工作区还包含 `CURRENT_TASK.md` 与 `conversations/*.md` 的自动更新（工具痕迹），不影响前后端运行。

---

## v1.0.1 — 2026-05-17（已归档）

### 封板模式
`nogit-seal`（项目目录不含 `.git`，以文件哈希 + 构建校验为基线）

### 质量校验
| 检查项 | 结果 |
|--------|------|
| `npm run build` | ✅ 通过（76 modules，677ms） |
| 语法检查（node --check） | ✅ 通过（全部 .js 文件） |
| `npm run typecheck` | ✅ 通过（无 TypeScript 文件） |
| `npm run test` | ✅ 通过（占位脚本） |

### 本次新增内容摘要
- 授权码 + 会员等级系统（free / vip / svip）
- AuthPage.jsx、Sidebar.jsx
- ContentViewer.jsx + 14 个交互组件（interactive/）
- 章节内嵌检验题数据（inlineChecks/，12 个模块）
- 可视化教学样例（模块 03、05、06）

### 关键文件 SHA-256

**后端**
| 文件 | SHA-256 |
|------|---------|
| `server.js` | `6b55187a9085b2b394c529e9319101944066e508edb1928b7608ad55733a77e8` |
| `package.json` | `acde3cad12b1ed8561d43919ddc10b45bf6c542fb505ce0806e6b80abf18c3e5` |

**前端核心组件**
| 文件 | SHA-256 |
|------|---------|
| `src/App.jsx` | `4eeaf745491b5290b0f5f64e15b2b6bb9a3d24776b014e76a24dc7a1d1e2f3f4` |
| `src/components/AIPanel.jsx` | `7edc9ecf7672b29f3d90dffee38c022d3544c9d9dde2256107d992ed619a4ef6` |
| `src/components/AuthPage.jsx` | `c19e25257a05c7463015be4aa57fdcc30c876c7232b6fa31ceecccc5e8838604` |
| `src/components/ContentViewer.jsx` | `aa829e9ddf449faff6233fa852e203f3be85b714eaf16793feb528baa3003096` |
| `src/components/CourseMap.jsx` | `f6ad9a560760bf878223d88e6770caf90df074a8e8266f9e664b41804951abb7` |
| `src/components/DemoFrame.jsx` | `a17c87e8f8c13c9424cab6548795b47934bb3cf87b35bedb2e339a35bf1146e9` |
| `src/components/Exercise.jsx` | `611432aa3dfacbcea2c5b28228e7f6cb07e2caa54e9bf88d8919f2800b23b3c5` |
| `src/components/ModuleCard.jsx` | `d216b9902899178c7285a33645ea435ea1ebbc36522eacbf6959166e937b6ecf` |
| `src/components/ModuleDetail.jsx` | `4ac866b1c12a01f6a6789b9e789848aacd132f43e5fa9dcd94de6c9968cc85f2` |
| `src/components/ScenarioPanel.jsx` | `7bcedcd2dbe5fd62fd61079f5d86035e5e5459a588eeacbf92f455531d160634` |
| `src/components/Sidebar.jsx` | `b604497c335c53fb4ebb8f8910aee7bcdc8122192f3e496bf13211edfd29cdc0` |
| `src/components/WrongBook.jsx` | `55e0c578b53fa9bc374f388a3d828d3848499d372be8a05fe7c347ea9bb5de8d` |

**交互组件**
| 文件 | SHA-256 |
|------|---------|
| `interactive/BarChart.jsx` | `760a4672d3f95867aaace38adda9f111e94275983a0e024bbc887a3479271514` |
| `interactive/Checklist.jsx` | `b368015358c46e5310f5dd6b8607a5027d4774fa532366ec8dda52bc822120c6` |
| `interactive/Comparison.jsx` | `660b6135ee206c99ae40c8766f78e0cb512d97f12bd7898f0404c9b2bc41c841` |
| `interactive/DevTools.jsx` | `0130d2a2ae7cae3458496745e029087e9f2ba02444827c09ccbb56384139c59c` |
| `interactive/Flashcard.jsx` | `d9a9d07c6cdb4df775fdba4811a9fffe2aa5cecbfdafdf851d060525ed02231d` |
| `interactive/Flowchart.jsx` | `9867ea6bc1f51532cb3eca27e9a9edb792d4ce86018abaec23018ad79c9bcc85` |
| `interactive/HttpDemo.jsx` | `df0fc9c2102cf6ba9d64a0637432828bf70d944e7a4a41a5ff01c2b6c3416d9c` |
| `interactive/InputDemo.jsx` | `8f7c474c3c7581060884db9f5d7eb7f92f759bd422c2ec4b91d0c625d3310ec5` |
| `interactive/InteractiveBlock.jsx` | `572867ce361e5cafb737e74e4b0e983eb4dee40b41e5ab3f48651dbd2359a1f1` |
| `interactive/Mindmap.jsx` | `c0e6759ae6ca11ff61a1f8f49aeab4a8abb83b8d406913c74dd561ef0426b0a9` |
| `interactive/SalaryChart.jsx` | `5d2f7f11f6dc132cc8bc6ba1c15922d559808b954128e01329dd77a91d78ba65` |
| `interactive/SqlDemo.jsx` | `b0b540fd476463c95cc90849d1bdba878ae81bdd807af1e3a87ef3cbed23c069` |
| `interactive/Terminal.jsx` | `741a6821dfe98f5c4222881c0810fbfd5c3ff9af5d416d169091d8fb3e7b7728` |
| `interactive/TestCase.jsx` | `d2e022b25e3e6a8e31f509d8a9de8df79116d8239fdce3b26afc38d1e931f5a4` |
| `interactive/Timeline.jsx` | `f0b3ed27e64557676dafd8e9818f239b65f1babd539551e0375c7f38b88dcb1a` |

**数据层**
| 文件 | SHA-256 |
|------|---------|
| `src/data/modules.js` | `dd86b0c3069b0b27dda0978b85b088674676ad1454a033f9d95b209e5f2eb8bb` |
| `src/data/exercises.js` | `0d86c8c8b31bc949aecff9a8304c141c676befb0c122cc4b27b3a906f22da2c3` |
| `src/data/scenarios.js` | `0fe3861cdf46c09e07c882d6219a78c027a47733454b6fa8df9c047408b918d3` |
| `src/data/interactive.js` | `0343d32852ed410c75e010d0a4b80687954b9113ea7a4861cdecabc330800d55` |

### API 接口清单（自 server.js 生成）

| 方法 | 路径 | 权限 | 说明 |
|------|------|------|------|
| GET | `/api/auth/me` | 公开 | 获取当前登录用户信息 |
| POST | `/api/auth/redeem` | 公开 | 兑换邀请码 |
| POST | `/api/auth/login` | 公开 | 账号密码登录 |
| POST | `/api/auth/logout` | 公开 | 登出 |
| GET | `/api/modules` | 登录 | 获取模块列表（含进度） |
| GET | `/api/content/:moduleId` | 登录 + 计划权限 | 获取模块 Markdown 内容 |
| POST | `/api/admin/invite-codes/generate` | 管理员 | 批量生成邀请码 |
| GET | `/api/mock/weather` | 登录 | Mock 天气接口（含预埋 Bug） |
| POST | `/api/mock/login` | 登录 | Mock 登录接口（含预埋 Bug） |
| GET | `/api/mock/products` | 登录 | Mock 商品接口（含预埋 Bug） |
| POST | `/api/mock/orders` | 登录 | Mock 订单接口（含预埋 Bug） |
| POST | `/api/chat` | 登录 | Anthropic SSE 流式对话（AI 教练） |

---

## v1.0.0 — 2026-05-17（初始封板，已归档）

原始封板详情见 `FREEZE_2026-05-17.md`。
