# 功能测试训练营平台

面向零基础转行学员的功能测试在线训练平台。核心理念：**不是看视频，是真的做**。

---

## 快速启动

### 前提条件

- Node.js 18+
- PostgreSQL（可选，无数据库时关闭鉴权）

### 安装依赖

```bash
npm install
```

### 环境变量

复制并填写以下变量（开发环境可省略数据库相关项）：

```bash
ANTHROPIC_API_KEY=sk-ant-...       # 必填，AI 教练功能
AUTH_REQUIRED=false                 # 本地开发可设 false 跳过登录
JWT_SECRET=your-random-secret
ADMIN_API_KEY=your-admin-key
DATABASE_URL=postgres://user:pass@host:5432/dbname   # 生产环境必填
```

完整环境变量说明见 `AUTH_MEMBERSHIP_SETUP.md`。

### 本地开发

```bash
npm run dev        # 启动 Vite 前端开发服务器（端口 5173）
node server.js     # 启动后端服务（端口 3001）
```

### 生产构建

```bash
npm run build      # 输出到 dist/
npm start          # 启动生产服务器（同时托管前端静态文件）
```

---

## 功能概览

| 模块 | 说明 |
|------|------|
| 课程地图 | 12 个模块卡片，两阶段进度（基础关卡 + 实战关卡） |
| 富媒体内容 | Markdown + 交互组件（终端、思维导图、用例表、流程图等） |
| 章节练习 | 每节内嵌检验题，答对解锁下一节 |
| 错题本 | 跨模块错题汇总与复习 |
| 实战关卡 | 内嵌真实 Demo 应用（含预埋 Bug），AI 教练同步辅导 |
| 会员系统 | 邀请码兑换，free / vip / svip 三档权限 |

---

## 技术栈

- **前端**：React 18 + Tailwind CSS + Vite 5
- **后端**：Express + Anthropic SDK（流式对话）
- **数据库**：PostgreSQL（users、invite_codes、invite_code_usages）
- **部署**：Zeabur（`zbpack.json` 已配置）

---

## 课程模块

| ID | 标题 | 权限 |
|----|------|------|
| 00 | 课程介绍与学习说明 | free |
| 01 | 计算机基础扫盲 | free |
| 02 | 行业认知与岗位理解 | free |
| 03 | 测试流程与团队协作 | vip |
| 04 | 功能测试核心方法 | vip |
| 05 | Bug 管理与测试输出 | vip |
| 06 | 接口测试入门 | vip |
| 07 | 测试工具基础 | vip |
| 08 | 企业级实战项目 | svip |
| 09 | 求职转型与面试准备 | svip |
| 10 | 入职与成长 | svip |
| 11 | 附录与模板资料 | svip |

---

## 管理员操作

批量生成邀请码：

```bash
curl -X POST https://<your-domain>/api/admin/invite-codes/generate \
  -H "Content-Type: application/json" \
  -H "x-admin-key: <ADMIN_API_KEY>" \
  -d '{"count": 10, "plan": "vip", "validDays": 30}'
```

详细说明见 `AUTH_MEMBERSHIP_SETUP.md`。

---

## 文档索引

| 文件 | 说明 |
|------|------|
| `PLAN.md` | 完整产品实施计划与技术路线 |
| `CHANGELOG.md` | 版本变更记录 |
| `AUTH_MEMBERSHIP_SETUP.md` | 授权码与会员系统配置说明 |
| `INTERACTIVE_MAP.md` | 全课程交互组件插入位置清单 |
| `SEAL_RECORD.md` | 封板记录与校验哈希 |
| `SEAL_PROCESS.md` | 封板标准流程（含自动推送 GitHub） |
