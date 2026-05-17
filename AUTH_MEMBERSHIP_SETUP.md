# 授权码 + 会员等级上线说明

## 1. 环境变量

至少配置以下变量：

```bash
ANTHROPIC_API_KEY=...
AUTH_REQUIRED=true
JWT_SECRET=请替换为长随机字符串
ADMIN_API_KEY=请替换为后台管理Key
DATABASE_URL=postgres://...
```

可选：

```bash
AUTH_COOKIE_NAME=cp_session
SESSION_DAYS=30
BCRYPT_ROUNDS=10
LOCAL_ADMIN_ENABLED=true
LOCAL_ADMIN_USERNAME=admin
LOCAL_ADMIN_PASSWORD=admin12345
LOCAL_ADMIN_PLAN=svip
```

说明：`LOCAL_ADMIN_*` 仅在 `NODE_ENV != production` 且 `AUTH_REQUIRED=true` 时自动创建/兜底本地调试账号。

## 2. 数据库

服务启动时会自动创建表：

- `users`
- `invite_codes`
- `invite_code_usages`

无需手动执行 SQL 迁移。

## 3. 生成授权码（管理员）

请求：

```bash
curl -X POST https://<your-domain>/api/admin/invite-codes/generate \
  -H "Content-Type: application/json" \
  -H "x-admin-key: <ADMIN_API_KEY>" \
  -d '{
    "count": 20,
    "plan": "vip",
    "validDays": 30,
    "maxBindCount": 1,
    "batch": "vip-2026-05"
  }'
```

返回里会给 `codes`（明文），请自行保存。

## 4. 学员登录流程

1. 学员在登录页选择“激活账号”
2. 输入授权码 + 用户名 + 密码
3. 激活成功后自动登录
4. 后续使用“账号登录”

## 5. 会员可见范围（当前实现）

- `free`：模块 `00-02`
- `vip`：模块 `00-07`
- `svip`：模块 `00-11`

具体定义在 `src/data/modules.js` 的 `requiredPlan` 字段中，可直接调整。

## 6. 关键接口

- `POST /api/auth/redeem`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/content/:moduleId`（鉴权后返回 Markdown）

## 7. 本地无数据库调试

可临时关闭鉴权：

```bash
AUTH_REQUIRED=false npm start
```

此模式会使用 `demo/svip` 账号直通，仅用于本地开发。
