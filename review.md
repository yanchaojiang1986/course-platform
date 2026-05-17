# 项目评审记录

## 2026-05-17 工程质量快速评审

整体结论：当前版本功能可用，但仍有关键稳定性与工程化风险；在修复核心问题前不建议作为长期迭代基线（当前评估 6.5/10）。

### 主要问题（按严重度）

1. 严重：存在无限重渲染风险。
- `src/components/CourseMap.jsx` 中 `useEffect` 未设置依赖数组，却在 effect 内 `setProgress(...)`，会持续触发 re-render。

2. 严重：二阶段完成状态不可达，进度统计逻辑不准确。
- `src/components/ModuleDetail.jsx` 仅写入 `started: true`，没有写 `completed: true` 的路径。
- `src/components/CourseMap.jsx` 中 `p2Total` 只统计“已产生本地记录”的模块，不是应有总量。

3. 中高：SSE 客户端流解析不稳，网络分片时可能丢字。
- `src/components/AIPanel.jsx` 中按 chunk 直接 `decode(...).split('\n')`，无残包缓冲。

4. 中：服务端 SSE 异常分支响应形式不一致。
- `server.js` 先设置 SSE 头，`catch` 中再 `res.status(500).json(...)`，在 headers 已发送后容易产生不合法响应。

5. 中低：答题状态持久化有瑕疵。
- `src/components/Exercise.jsx` 用 `!!d?.score` 判断是否已提交，0 分会被当作未提交。
- `attempts` 只读状态，重做后的计数可信度不足。

6. 工程化缺口：缺少自动化质量闸门。
- `package.json` 无 `test/lint/typecheck` 脚本。

### 优点

- 前后端最小闭环完整，`npm run build` 可通过。
- 依赖安全面当前干净：`npm audit --omit=dev` 为 0 漏洞。
- 组件拆分与课程数据结构整体清晰，学习流/错题本/实战面板功能完整度较好。
