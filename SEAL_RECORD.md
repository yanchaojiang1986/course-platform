# 封板记录

## v1.0.1 — 2026-05-17（当前版本）

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
