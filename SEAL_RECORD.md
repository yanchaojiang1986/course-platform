# 封板记录

## v1.1.3 — 2026-05-19（当前版本）

### 封板模式
`git-seal`（项目目录已含 `.git`，以 commit 快照 + 构建校验为基线）

### 质量校验
| 检查项 | 结果 |
|--------|------|
| `npm run lint` | ✅ 通过（含 `lint:content`，52 个 blockId） |
| `npm run build` | ✅ 通过（84 modules） |

### 本次变更摘要
- 修复移动端学习模块中的“内嵌小框滚动”体验问题，恢复手机端整页滚动。
- `Phase1` 章节容器仅在桌面端启用内部滚动；移动端不再限制 `max-height`。
- `Phase2` 改为移动端流式上下布局，取消移动端固定视口高度与横向双栏限制。
- `ScenarioPanel/AIPanel` 同步移动端尺寸与边框策略，避免小屏内容被挤压。

### 关键文件 SHA-256
| 文件 | SHA-256 |
|------|---------|
| `package.json` | `3d97243d0998628202fa0fbdeb3537aa0777d07bc59d0b5747cfeb6733524d81` |
| `package-lock.json` | `2bf7ab508de011113e89238740ef69f308f1efce1fc3644c7bbeee7a2776fb1c` |
| `src/components/ModuleDetail.jsx` | `48132bdf66327560a64e32fc3240ac8c298879149511df3c66af88be222c6591` |
| `src/components/ScenarioPanel.jsx` | `ff8cf35239b718409f3a2803eec7563146c3ab2396e0f6f692ce326366796ff5` |
| `src/components/AIPanel.jsx` | `ed54b072076918a8bb106c0f5a20402eb8f66db08ca15f21b2a4e6c522b532ee` |

### 说明
- 本次封板聚焦移动端阅读与滚动体验，未改动课程内容数据与权限逻辑。

---

## v1.1.2 — 2026-05-18（已归档）

### 封板模式
`git-seal`（项目目录已含 `.git`，以 commit 快照 + 构建校验为基线）

### 质量校验
| 检查项 | 结果 |
|--------|------|
| `npm run lint` | ✅ 通过（含 `lint:content`，52 个 blockId） |
| `npm run build` | ✅ 通过（84 modules） |

### 本次变更摘要
- 完成移动端导航适配：手机端由“左侧常驻栏”切换为“底部导航 + 抽屉菜单”。
- 保持平板与桌面工作台结构不变，仅在 `<=900px` 启用移动导航模式。
- 新增移动端底部安全留白与抽屉遮罩交互，解决小屏阅读空间被侧栏挤占的问题。

### 关键文件 SHA-256
| 文件 | SHA-256 |
|------|---------|
| `package.json` | `119eca29fbbf239431839023c362867b6fe0803ffcaea1b26f393812babcf804` |
| `package-lock.json` | `0c5c174c8375ec061ebbd11ae2bcca54fbed9e660534c0996598800a4c55946c` |
| `src/components/WorkbenchSidebar.jsx` | `c592ee1fba8ef197801f9c114763159854747248e2a21b0b8849dd606ce84b36` |
| `src/index.css` | `f9fca4d5d51bf581fdce80cc21d15801440eb9c0faff5f021107348e7dcf9195` |

### 说明
- 本次封板聚焦移动端可用性提升，课程逻辑与权限模型未变更。

---

## v1.1.1 — 2026-05-18（已归档）

### 封板模式
`git-seal`（项目目录已含 `.git`，以 commit 快照 + 构建校验为基线）

### 质量校验
| 检查项 | 结果 |
|--------|------|
| `npm run lint` | ✅ 通过（含 `lint:content`，52 个 blockId） |
| `npm run build` | ✅ 通过（84 modules） |

### 本次变更摘要
- 新增“模块通关态”导航反馈：侧栏图标外框按 `default / in_progress / completed` 进行三态展示。
- 模块完成判定统一复用既有学习进度：`phase1.passed` 与 `phase2.completed` 组合计算，不引入新存储结构。
- 样式层新增状态色语义：进行中琥珀边框、已完成绿色高亮边框，激活态下进一步强化可见性。

### 关键文件 SHA-256
| 文件 | SHA-256 |
|------|---------|
| `package.json` | `5bf9eb40f4c2fb615e7b7236d2e5f43ff00a81dddb98e0806e0d87dd857c5a77` |
| `package-lock.json` | `a10cd052ecc754f01763e646a833f3952a25ed8dcb2c2282c26b900f11c022ee` |
| `src/App.jsx` | `ada0e1fcf7cdadb72f71c37888ff2a2a7925406b809b5665fb53187e87c8ec93` |
| `src/components/WorkbenchSidebar.jsx` | `a84b14fb576d05f71ea9ac8d78a56a8d53cc3c9ef7f0ee0803967c25a19ae6ee` |
| `src/index.css` | `9c2ed202c4a6fbc00c9b969eb014e1e3e1b4773f9a4a777155b5762546967386` |

### 说明
- 本次封板聚焦“学习结果可视反馈”增强，未改变课程数据与权限模型。

---

## v1.1.0 — 2026-05-18（已归档）

### 封板模式
`git-seal`（项目目录已含 `.git`，以 commit 快照 + 构建校验为基线）

### 质量校验
| 检查项 | 结果 |
|--------|------|
| `npm run lint` | ✅ 通过（含 `lint:content`，52 个 blockId） |
| `npm run build` | ✅ 通过（84 modules） |
| 模块巡检 | ✅ 通过（`/api/content/:moduleId` 共 16 个模块全部可访问） |

### 本次变更摘要
- 课程体系扩展到 16 模块，新增模块 12/13/14/15 及配套课程内容、检测题、场景数据。
- 会员分层展示保持当前项目架构：地图显示全部模块，锁定态与权限提示统一。
- Claude 引入内容按本项目规范完成数据收敛，统一到既有交互 schema（不反向改造组件契约）。
- 新增前后端可追踪日志：
- 前端：`src/utils/clientLogger.js`，记录加载失败/未处理异常到 `cp_frontend_logs`。
- 后端：`logs/backend.log`，记录 API 请求与模块访问异常。
- 修复“模块不存在”排查链路，确认当前标准端口为前端 `9527`、后端 `4321`。

### 关键文件 SHA-256
| 文件 | SHA-256 |
|------|---------|
| `package.json` | `0a3439eb3a706d1a46484ffbb39803b91a7879efbf361d441445a4e7edb815bf` |
| `package-lock.json` | `f9b68e3bf88e6e45af43ddb5dfffa56c3b1e592f62d0344568571f12b045ec13` |
| `server.js` | `b244a28048c27190a4a125c1a1ddd02ab8d1380fa987afa9a7ed5ff4e5580163` |
| `src/App.jsx` | `1176bc4f2d589ed1ddd433c1ff8fd98e44a09dce8593ca82b6ee296c991946bd` |
| `src/components/CourseMap.jsx` | `2bd0e6fa0bffd9746493f98e79c910c46efd3d41230ba22b407469320ecff020` |
| `src/components/ModuleCard.jsx` | `ed58e6e74366e529485cc7cae56bc8ff2e27b6dc73a17adb473a7e56abff81f4` |
| `src/components/ContentViewer.jsx` | `b1a8ba7fd5e6f2f6af835e17a6900e6fc44751c942c87a7cca8d2e2a9e714152` |
| `src/data/modules.js` | `633f8bbefd2b57985be77b5e89efb2c016210fe20773d4eeebadd37e5fa9f254` |
| `src/data/interactive.js` | `5877127e728cbf5807b100f739888d8dd216cb5306f7d7a51c5d34f01d46fe08` |
| `src/data/exercises.js` | `71ee5a8f0bed0a8999e2fb88c12b2a7513e195f779feb613b2ec5aad70a3ca82` |
| `src/data/scenarios.js` | `ffb3b50143c2067dff719ca6e639e471f04747035bf3449b6e83c5a6c1f33b27` |
| `src/data/inlineChecks/index.js` | `0ed83251d19d586adb5605add416089590ce86cc21164d1fe95c28dcd2a9c5c6` |
| `src/utils/clientLogger.js` | `f9521b8065a1159e7146372c76040ddf50c13100f96937168554c1d0171bcbc9` |
| `public/content/12_性能与专项测试扫盲.md` | `e0c0b4d21b9a541111a2e5ef37302456ff145443969225f0b0c4c37542ec623c` |
| `public/content/13_兼容性与安全测试.md` | `e5ca60872ee84ef596a56532f7adb35336c1ddaf370e63d0caf66134905af973` |
| `public/content/14_避坑手册25条.md` | `bae995c3fc5b1a6b689bf8a52c10d493bafe7f654b60093659af77fec58fd251` |
| `public/content/15_面试题精讲100问.md` | `a40d79d046b0778632c11af2bc5363e3ce0dbfe65f57c21af2baad0a11f943eb` |

### 说明
- 本次封板为“课程扩展 + 架构规范收敛 + 可观测性补齐”，已通过构建与内容校验闸门。

---

## v1.0.9 — 2026-05-17（已归档）

### 封板模式
`git-seal`（项目目录已含 `.git`，以 commit 快照 + 构建校验为基线）

### 质量校验
| 检查项 | 结果 |
|--------|------|
| `npm run lint` | ✅ 通过（含 `lint:content`，39 个 blockId） |
| `npm run build` | ✅ 通过（79 modules） |

### 本次变更摘要
- 新增 `todolist.md`，沉淀会员权限、Pro AI 知识库约束、移动端兼容、登录页 UI、暗色模式、二维码联系弹窗与推广裂变等后续事项。
- 清除课程内容中的 AI 测试教学：删除模块 07 的“AI 辅助测试”章节，并替换模块 11 相关练习题。
- 同步更新课程说明、学习路线与教辅系统提示，去掉“AI 辅助测试”覆盖描述。
- 求职模块推荐交互形式调整为“面试问答练习入口”。

### 关键文件 SHA-256
| 文件 | SHA-256 |
|------|---------|
| `package.json` | `464c801e4831f2d7675e8d5567646d794d57ef3b0ac6a4eb91d628addf1a3ca1` |
| `package-lock.json` | `16918538bc8fe71bbceb8362d4d7f32b0c8c3782306c5480a7e56595cc4f2c35` |
| `todolist.md` | `d0004964a6201fa67ebbfde762abdaae4f2d4333a728eb99718e3ae989b3fc55` |
| `public/content/07_测试工具基础.md` | `2cd0289793a2a36cac1261b6ce4bde978e96bbcc31bfe074c16d0f6de92a723b` |
| `public/content/09_求职转型与面试准备.md` | `a597673ecda0b033225c6b23f5da4da1b92b61b579badfb00dc0d62bf68e4376` |
| `public/content/README.md` | `dc2d59fed40d79530d8ebe5aaaec43048bd0c69bf142e70583ef786a9040c808` |
| `src/components/AIPanel.jsx` | `a900d3160b5c2b8aa3182ddd4dd06ca6f05eae88550a57db6b8bfcad7f846feb` |
| `src/data/exercises.js` | `1412bb300f79b2ab51472edc700155b7e46337ad21f30ba1c95960861144fb29` |
| `src/data/inlineChecks/11.js` | `a16cca6ed7f9396f6f9ff435672f85f9fa3c1ac8f113fcc7c799df41153141cc` |
| `src/data/interactive.js` | `ee12799ab372df766232803f6f90afe1a793a369f888d9572e7b8b60ecc33219` |

### 说明
- 本次封板为“课程 AI 测试内容清理 + 后续待办沉淀”，已通过构建与内容校验闸门。

---

## v1.0.8 — 2026-05-17（已归档）

### 封板模式
`git-seal`（项目目录已含 `.git`，以 commit 快照 + 构建校验为基线）

### 质量校验
| 检查项 | 结果 |
|--------|------|
| `npm run lint` | ✅ 通过（含 `lint:content`，39 个 blockId） |
| `npm run build` | ✅ 通过（79 modules） |

### 本次变更摘要
- Trae 完成交互组件 UI 统一优化，覆盖图表、清单、对比、DevTools、流程图、导图、HTTP、输入演示、薪资图、SQL、终端、用例表与时间线组件。
- `src/index.css` 新增/扩展交互组件通用视觉样式，提升浅色/深色模式一致性。
- 课程侧栏与详情页去除“模块 00 / Module 00 / M-00”等编号前缀，标题展示更友好。
- `Mindmap.jsx` 更新为新版树状导图布局，支持分支折叠、深浅色与多层节点连线。

### 关键文件 SHA-256
| 文件 | SHA-256 |
|------|---------|
| `package.json` | `224fe37d9a5f68dc7a46906ec0ac450b5ef740952e604f0af6316659ceaf059f` |
| `package-lock.json` | `194938d85764c094574c8b0d4175cfadee3560638c869a670a7a9814528eab59` |
| `src/App.jsx` | `017be70cef77d5f27f6252d4d1cea9d12eae91e842c74fd185403c47e7f48b55` |
| `src/components/ModuleCard.jsx` | `6602389f430cd994f654a75bf7ea427e954471077867fb146fd17b4db4f3d6e3` |
| `src/components/ModuleDetail.jsx` | `bae60fa158679107647d78ba92eb42a369782ce27ee3552098daa2c43991f152` |
| `src/index.css` | `282c3891823fd16f017538f5e29ec2a7abc2844040af36aee220704bda82cefc` |
| `src/components/interactive/BarChart.jsx` | `a38be059dda6b623f9c1624124969630fecb332b04c414928685f1d9cb4e63d2` |
| `src/components/interactive/Checklist.jsx` | `fa75aaccef9d6b7de5557cbd687074096dae34619a54c1338fae931074c5af5d` |
| `src/components/interactive/Comparison.jsx` | `81635dc151098a676a2cb590293194af8cb331d30cb38d40bd08e99b5212e746` |
| `src/components/interactive/DevTools.jsx` | `d937276d3448b030375c2fcb8a19cad197c94dbd43a688198eb33fb053946cc1` |
| `src/components/interactive/Flashcard.jsx` | `98d6b3bd8ad69f5d8b17d3a81dcac484138f6e41b532a76377bece3c91f5973d` |
| `src/components/interactive/Flowchart.jsx` | `7f22047baae1cd1b486d212fedf0d4ef12fc2f2eea546f529ccbf3982a2bad08` |
| `src/components/interactive/HttpDemo.jsx` | `c03e76a1dbbddb3a822c9d2efdc06179869923325869608e74a71197b91e7854` |
| `src/components/interactive/InputDemo.jsx` | `2bc55cd605877d1498cca03d056745c3be703b6f0ece2f978a04998cba87cb2d` |
| `src/components/interactive/Mindmap.jsx` | `8364656f83ac3fc7a4f2a549a3fd9279e5744800a6228e9b4e5f82d1c02e9229` |
| `src/components/interactive/SalaryChart.jsx` | `86593d7fb49b405239f8898f3599515197591444c3cd59bfd86c68ceb3a9cbac` |
| `src/components/interactive/SqlDemo.jsx` | `03b864d15c0ff7ccb57b1465988105684cbe1f6e26fd799225ff8d4c91e8a125` |
| `src/components/interactive/Terminal.jsx` | `5781a806d279fa87b32590869b572f3ac51e93a6f14b3ab1677fa4640e0c70b4` |
| `src/components/interactive/TestCase.jsx` | `45096efa5b027f9a4e004e834235856578adec292ab2c058b66dbca556df22fc` |
| `src/components/interactive/Timeline.jsx` | `19871418032806a8f653fb43007dbbdce106df525a907e45d2c9da400e817094` |

### 说明
- 本次封板为“交互组件视觉优化 + 标题友好化”的综合更新，已通过构建与内容校验闸门。

---

## v1.0.7 — 2026-05-17（已归档）

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
