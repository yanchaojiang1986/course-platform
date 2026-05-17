import express from 'express'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { Pool } from 'pg'
import Anthropic from '@anthropic-ai/sdk'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, existsSync } from 'fs'
import { MODULES } from './src/data/modules.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const port = process.env.PORT || 4321

const AUTH_REQUIRED = process.env.AUTH_REQUIRED !== 'false'
const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret-change-me'
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || ''
const COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'cp_session'
const SESSION_DAYS = Number(process.env.SESSION_DAYS || 30)
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10)
const LOCAL_ADMIN_ENABLED = process.env.LOCAL_ADMIN_ENABLED !== 'false'
const LOCAL_ADMIN_USERNAME = safeUsername(process.env.LOCAL_ADMIN_USERNAME || 'admin')
const LOCAL_ADMIN_PASSWORD = process.env.LOCAL_ADMIN_PASSWORD || 'admin12345'
const LOCAL_ADMIN_PLAN = process.env.LOCAL_ADMIN_PLAN || 'svip'

const PLAN_RANK = { free: 1, vip: 2, svip: 3 }

const MODULE_BY_ID = new Map(MODULES.map(m => [m.id, m]))

const distPath = join(__dirname, 'dist')
const contentRoot = join(__dirname, 'public', 'content')

const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSL === 'disable' ? false : { rejectUnauthorized: false },
}) : null

function normalizePlan(plan) {
  return PLAN_RANK[plan] ? plan : 'free'
}

function hasPlanAccess(userPlan, requiredPlan = 'free') {
  return (PLAN_RANK[normalizePlan(userPlan)] || 1) >= (PLAN_RANK[normalizePlan(requiredPlan)] || 1)
}

function sha256(input) {
  return crypto.createHash('sha256').update(input).digest('hex')
}

function safeUsername(raw) {
  return String(raw || '').trim().toLowerCase()
}

function validateUsername(username) {
  return /^[a-z0-9_]{4,32}$/.test(username)
}

function validatePassword(password) {
  return typeof password === 'string' && password.length >= 8 && password.length <= 72
}

function cookieOptions() {
  const secure = process.env.NODE_ENV === 'production'
  return {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000,
  }
}

function signSession(userId) {
  return jwt.sign({ uid: userId }, JWT_SECRET, { expiresIn: `${SESSION_DAYS}d` })
}

async function ensureSchema() {
  if (!AUTH_REQUIRED) return
  if (!pool) throw new Error('AUTH_REQUIRED=true 但未配置 DATABASE_URL')

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      username VARCHAR(32) NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      plan VARCHAR(16) NOT NULL DEFAULT 'free',
      member_expires_at TIMESTAMPTZ,
      status VARCHAR(16) NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS invite_codes (
      id BIGSERIAL PRIMARY KEY,
      code_hash TEXT NOT NULL UNIQUE,
      plan VARCHAR(16) NOT NULL DEFAULT 'free',
      valid_days INTEGER,
      expires_at TIMESTAMPTZ,
      max_bind_count INTEGER NOT NULL DEFAULT 1,
      used_count INTEGER NOT NULL DEFAULT 0,
      status VARCHAR(16) NOT NULL DEFAULT 'active',
      batch VARCHAR(64),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS invite_code_usages (
      id BIGSERIAL PRIMARY KEY,
      invite_code_id BIGINT NOT NULL REFERENCES invite_codes(id),
      user_id BIGINT NOT NULL REFERENCES users(id),
      used_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    CREATE INDEX IF NOT EXISTS idx_invite_codes_hash ON invite_codes(code_hash);
  `)
}

async function ensureLocalDebugAdmin() {
  if (!AUTH_REQUIRED || !pool || !LOCAL_ADMIN_ENABLED) return

  const isProd = process.env.NODE_ENV === 'production'
  if (isProd) return

  if (!validateUsername(LOCAL_ADMIN_USERNAME)) {
    throw new Error('LOCAL_ADMIN_USERNAME 不合法（仅小写字母/数字/下划线，4-32位）')
  }
  if (!validatePassword(LOCAL_ADMIN_PASSWORD)) {
    throw new Error('LOCAL_ADMIN_PASSWORD 不合法（长度需为 8-72 位）')
  }

  const normalizedPlan = normalizePlan(LOCAL_ADMIN_PLAN)
  const { rows } = await pool.query(
    `SELECT id FROM users WHERE username = $1 LIMIT 1`,
    [LOCAL_ADMIN_USERNAME]
  )

  if (rows[0]) {
    await pool.query(
      `UPDATE users
       SET plan = $1, status = 'active', updated_at = NOW()
       WHERE id = $2`,
      [normalizedPlan, rows[0].id]
    )
    console.log(`[auth] Local debug admin ensured: ${LOCAL_ADMIN_USERNAME} (existing user, plan=${normalizedPlan})`)
    return
  }

  const passwordHash = await bcrypt.hash(LOCAL_ADMIN_PASSWORD, BCRYPT_ROUNDS)
  await pool.query(
    `INSERT INTO users (username, password_hash, plan, member_expires_at, status)
     VALUES ($1, $2, $3, NULL, 'active')`,
    [LOCAL_ADMIN_USERNAME, passwordHash, normalizedPlan]
  )
  console.log(`[auth] Local debug admin created: ${LOCAL_ADMIN_USERNAME} / ${LOCAL_ADMIN_PASSWORD} (plan=${normalizedPlan})`)
}

async function loadUserById(userId) {
  if (!pool) return null
  const { rows } = await pool.query(
    `SELECT id, username, plan, member_expires_at, status FROM users WHERE id = $1 LIMIT 1`,
    [userId]
  )
  if (!rows[0]) return null

  const user = rows[0]
  const expired = user.member_expires_at && new Date(user.member_expires_at).getTime() < Date.now()
  if (expired && user.plan !== 'free') {
    const { rows: updatedRows } = await pool.query(
      `UPDATE users SET plan = 'free', updated_at = NOW() WHERE id = $1 RETURNING id, username, plan, member_expires_at, status`,
      [user.id]
    )
    return updatedRows[0]
  }
  return user
}

function authOptional(req, _res, next) {
  if (!AUTH_REQUIRED) {
    req.user = { id: 0, username: 'demo', plan: 'svip', status: 'active', member_expires_at: null }
    return next()
  }

  const token = req.cookies?.[COOKIE_NAME]
  if (!token) return next()

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.authPayload = payload
  } catch {
    // ignore
  }
  next()
}

async function requireAuth(req, res, next) {
  if (!AUTH_REQUIRED) {
    req.user = { id: 0, username: 'demo', plan: 'svip', status: 'active', member_expires_at: null }
    return next()
  }

  const token = req.cookies?.[COOKIE_NAME]
  if (!token) return res.status(401).json({ error: '未登录' })

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const user = await loadUserById(payload.uid)
    if (!user || user.status !== 'active') {
      return res.status(401).json({ error: '账号不可用，请联系管理员' })
    }
    req.user = user
    next()
  } catch {
    return res.status(401).json({ error: '登录已过期，请重新登录' })
  }
}

function requireAdmin(req, res, next) {
  const key = req.headers['x-admin-key']
  if (!ADMIN_API_KEY || key !== ADMIN_API_KEY) {
    return res.status(401).json({ error: '管理员鉴权失败' })
  }
  next()
}

function issueAuthCookie(res, userId) {
  const token = signSession(userId)
  res.cookie(COOKIE_NAME, token, cookieOptions())
}

function toPublicUser(user) {
  return {
    id: user.id,
    username: user.username,
    plan: normalizePlan(user.plan),
    status: user.status,
    memberExpiresAt: user.member_expires_at || null,
  }
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const TUTOR_SYSTEM = `你是一位专业的功能测试课程教辅助手，帮助正在学习软件测试的零基础转行学员。
你的职责：
- 解释软件测试的概念、方法、工具
- 结合实际例子回答学员问题
- 鼓励学员，帮助建立信心
- 只回答与软件测试、IT职场相关的问题，其他话题礼貌引导回课程

当前课程涵盖：计算机基础、测试流程、用例设计（等价类/边界值/场景法/错误推测法）、Bug管理、接口测试、Postman、MySQL、Linux日志、JIRA/禅道、AI辅助测试、求职面试。
回答要简洁、友好、实用，多用例子。用中文回答。`

const INTERVIEWER_SYSTEM = `你是一位经验丰富的互联网公司测试组长，正在面试一位功能测试岗位的零基础转行候选人。

面试风格：
- 先问开放性问题让候选人放松，再逐步深入技术问题
- 对错误答案给出提示而不是直接纠正，引导候选人思考
- 面试结束后给出详细的评分反馈（100分制）

常见考点：软件测试定义、黑盒/白盒、测试流程、四大用例设计方法、Bug生命周期、Bug单写法、接口测试基础、甲方vs外包选择、"开发不认Bug怎么办"等。

请用中文进行面试对话。每次只问一个问题，等候选人回答后再继续。`

app.set('trust proxy', 1)
app.use(express.json())
app.use(cookieParser())

// 禁止直接访问课程 markdown 静态文件，统一走鉴权 API
app.use('/content', (_req, res) => res.status(403).json({ error: '请通过授权接口访问课程内容' }))

// 生产环境：服务 Vite 构建产物
if (existsSync(distPath)) {
  app.use(express.static(distPath))
}

// 保留 public 目录静态资源（但 content 已在上方被拦截）
app.use(express.static(join(__dirname, 'public')))

app.use(authOptional)

app.get('/api/auth/me', async (req, res) => {
  if (!AUTH_REQUIRED) {
    return res.json({ user: { id: 0, username: 'demo', plan: 'svip', status: 'active', memberExpiresAt: null } })
  }

  const token = req.cookies?.[COOKIE_NAME]
  if (!token) return res.status(401).json({ error: '未登录' })

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const user = await loadUserById(payload.uid)
    if (!user || user.status !== 'active') return res.status(401).json({ error: '未登录' })
    return res.json({ user: toPublicUser(user) })
  } catch {
    return res.status(401).json({ error: '未登录' })
  }
})

app.post('/api/auth/redeem', async (req, res) => {
  if (!AUTH_REQUIRED) return res.status(400).json({ error: '当前环境未启用授权码登录' })

  const code = String(req.body?.code || '').trim()
  const username = safeUsername(req.body?.username)
  const password = String(req.body?.password || '')

  if (!code) return res.status(400).json({ error: '授权码不能为空' })
  if (!validateUsername(username)) return res.status(400).json({ error: '用户名格式不合法（仅小写字母/数字/下划线，4-32位）' })
  if (!validatePassword(password)) return res.status(400).json({ error: '密码长度需为 8-72 位' })

  const codeHash = sha256(code)
  const conn = await pool.connect()

  try {
    await conn.query('BEGIN')

    const inviteRes = await conn.query(
      `SELECT * FROM invite_codes WHERE code_hash = $1 FOR UPDATE`,
      [codeHash]
    )

    const invite = inviteRes.rows[0]
    if (!invite) {
      await conn.query('ROLLBACK')
      return res.status(400).json({ error: '授权码无效' })
    }
    if (invite.status !== 'active') {
      await conn.query('ROLLBACK')
      return res.status(400).json({ error: '授权码不可用' })
    }
    if (invite.expires_at && new Date(invite.expires_at).getTime() < Date.now()) {
      await conn.query('ROLLBACK')
      return res.status(400).json({ error: '授权码已过期' })
    }
    if (Number(invite.used_count) >= Number(invite.max_bind_count)) {
      await conn.query('ROLLBACK')
      return res.status(400).json({ error: '授权码已被使用' })
    }

    const userExists = await conn.query(`SELECT 1 FROM users WHERE username = $1`, [username])
    if (userExists.rows.length > 0) {
      await conn.query('ROLLBACK')
      return res.status(400).json({ error: '用户名已存在' })
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)

    let memberExpiresAt = invite.expires_at || null
    if (!memberExpiresAt && invite.valid_days && Number(invite.valid_days) > 0) {
      const ms = Number(invite.valid_days) * 24 * 60 * 60 * 1000
      memberExpiresAt = new Date(Date.now() + ms).toISOString()
    }

    const userInsert = await conn.query(
      `INSERT INTO users (username, password_hash, plan, member_expires_at, status)
       VALUES ($1, $2, $3, $4, 'active')
       RETURNING id, username, plan, member_expires_at, status`,
      [username, passwordHash, normalizePlan(invite.plan), memberExpiresAt]
    )
    const user = userInsert.rows[0]

    const nextUsed = Number(invite.used_count) + 1
    const nextStatus = nextUsed >= Number(invite.max_bind_count) ? 'used' : invite.status

    await conn.query(
      `UPDATE invite_codes SET used_count = $1, status = $2 WHERE id = $3`,
      [nextUsed, nextStatus, invite.id]
    )

    await conn.query(
      `INSERT INTO invite_code_usages (invite_code_id, user_id) VALUES ($1, $2)`,
      [invite.id, user.id]
    )

    await conn.query('COMMIT')

    issueAuthCookie(res, user.id)
    return res.json({ user: toPublicUser(user) })
  } catch (err) {
    await conn.query('ROLLBACK')
    const message = err instanceof Error ? err.message : '激活失败'
    return res.status(500).json({ error: message })
  } finally {
    conn.release()
  }
})

app.post('/api/auth/login', async (req, res) => {
  if (!AUTH_REQUIRED) return res.status(400).json({ error: '当前环境未启用授权登录' })

  const username = safeUsername(req.body?.username)
  const password = String(req.body?.password || '')

  if (!username || !password) return res.status(400).json({ error: '用户名和密码不能为空' })

  const { rows } = await pool.query(
    `SELECT id, username, password_hash, plan, member_expires_at, status FROM users WHERE username = $1 LIMIT 1`,
    [username]
  )
  const user = rows[0]
  if (!user || user.status !== 'active') return res.status(401).json({ error: '用户名或密码错误' })

  const ok = await bcrypt.compare(password, user.password_hash)
  if (!ok) return res.status(401).json({ error: '用户名或密码错误' })

  const publicUser = await loadUserById(user.id)
  issueAuthCookie(res, user.id)
  return res.json({ user: toPublicUser(publicUser || user) })
})

app.post('/api/auth/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' })
  res.json({ ok: true })
})

app.get('/api/modules', requireAuth, (req, res) => {
  const visible = MODULES.filter(m => hasPlanAccess(req.user.plan, m.requiredPlan)).map(m => ({
    id: m.id,
    title: m.title,
    emoji: m.emoji,
    tag: m.tag,
    requiredPlan: m.requiredPlan,
  }))
  res.json({ modules: visible })
})

app.get('/api/content/:moduleId', requireAuth, (req, res) => {
  const moduleId = String(req.params.moduleId || '')
  const moduleDef = MODULE_BY_ID.get(moduleId)
  if (!moduleDef) return res.status(404).json({ error: '模块不存在' })

  if (!hasPlanAccess(req.user.plan, moduleDef.requiredPlan)) {
    return res.status(403).json({ error: `当前会员无权限访问该模块（需要 ${moduleDef.requiredPlan.toUpperCase()}）` })
  }

  const filePath = join(contentRoot, moduleDef.file)
  if (!existsSync(filePath)) return res.status(404).json({ error: '课程内容不存在' })

  const content = readFileSync(filePath, 'utf-8')
  res.json({ moduleId: moduleDef.id, content })
})

// 管理员接口：生成一批授权码
app.post('/api/admin/invite-codes/generate', requireAdmin, async (req, res) => {
  if (!pool) return res.status(500).json({ error: '数据库未配置' })

  const count = Math.max(1, Math.min(500, Number(req.body?.count || 1)))
  const plan = normalizePlan(req.body?.plan)
  const validDays = req.body?.validDays ? Number(req.body.validDays) : null
  const maxBindCount = Math.max(1, Number(req.body?.maxBindCount || 1))
  const batch = String(req.body?.batch || `batch-${Date.now()}`)

  const conn = await pool.connect()
  const generated = []
  try {
    await conn.query('BEGIN')
    for (let i = 0; i < count; i++) {
      const rawCode = `CP-${plan.toUpperCase()}-${crypto.randomBytes(6).toString('hex').toUpperCase()}`
      const codeHash = sha256(rawCode)
      let expiresAt = null
      if (validDays && validDays > 0) {
        expiresAt = new Date(Date.now() + validDays * 24 * 60 * 60 * 1000).toISOString()
      }

      await conn.query(
        `INSERT INTO invite_codes (code_hash, plan, valid_days, expires_at, max_bind_count, used_count, status, batch)
         VALUES ($1, $2, $3, $4, $5, 0, 'active', $6)`,
        [codeHash, plan, validDays, expiresAt, maxBindCount, batch]
      )
      generated.push(rawCode)
    }
    await conn.query('COMMIT')
    res.json({ batch, plan, count: generated.length, codes: generated })
  } catch (err) {
    await conn.query('ROLLBACK')
    const message = err instanceof Error ? err.message : '生成失败'
    res.status(500).json({ error: message })
  } finally {
    conn.release()
  }
})

// Mock API for API testing modules
app.get('/api/mock/weather', requireAuth, (req, res) => {
  const WEATHER_DB = {
    '北京': { city: '北京', temp: 18, feelsLike: 16, desc: '晴', humidity: 35, wind: '3级', visibility: '15km' },
    '上海': { city: '上海', temp: 23, feelsLike: 24, desc: '多云', humidity: 72, wind: '2级', visibility: '10km' },
    '广州': { city: '广州', temp: 29, feelsLike: 31, desc: '阵雨', humidity: 88, wind: '1级', visibility: '8km' },
    '深圳': { city: '深圳', temp: 28, feelsLike: 30, desc: '晴转多云', humidity: 80, wind: '2级', visibility: '12km' },
    '成都': { city: '成都', temp: 20, feelsLike: 19, desc: '阴', humidity: 65, wind: '1级', visibility: '6km' },
  }
  const ALIAS = { beijing: '北京', shanghai: '上海', guangzhou: '广州', shenzhen: '深圳', chengdu: '成都' }
  const city = req.query.city || ''
  // Bug: 城市名大小写敏感（Beijing 不匹配）
  const key = ALIAS[city] || city
  const data = WEATHER_DB[key]
  if (!data) {
    // Bug: 空城市名也返回 404 而非 400
    return res.status(404).json({ code: 404, message: `城市"${city}"不存在`, city })
  }
  res.json({ code: 200, data, updateTime: new Date().toISOString() })
})

app.post('/api/mock/login', requireAuth, (req, res) => {
  const { username, password } = req.body || {}
  if (username === 'testuser' && password === 'Test1234') {
    res.json({ code: 200, message: '登录成功', token: 'mock-jwt-token-abc123', user: { id: 1, name: 'Test User', role: 'tester' } })
  } else if (!username || !password) {
    res.status(400).json({ code: 400, message: '用户名和密码不能为空' })
  } else {
    res.status(401).json({ code: 401, message: '用户名或密码错误' })
  }
})

app.get('/api/mock/products', requireAuth, (req, res) => {
  const { category, page = 1 } = req.query
  const products = [
    { id: 1, name: '测试手机', price: 2999, category: 'electronics', stock: 50 },
    { id: 2, name: '测试耳机', price: 399, category: 'electronics', stock: 0 },
    { id: 3, name: '测试T恤', price: 99, category: 'clothing', stock: 200 },
  ]
  const filtered = category ? products.filter(p => p.category === category) : products
  res.json({ code: 200, data: filtered, total: filtered.length, page: Number(page) })
})

app.post('/api/mock/orders', requireAuth, (req, res) => {
  const auth = req.headers.authorization
  if (!auth || !auth.includes('mock-jwt-token')) {
    return res.status(401).json({ code: 401, message: '未登录或Token已过期' })
  }
  const { productId, quantity } = req.body || {}
  if (!productId || !quantity) {
    return res.status(400).json({ code: 400, message: '缺少必要参数 productId 或 quantity' })
  }
  if (quantity <= 0) {
    return res.status(400).json({ code: 400, message: '购买数量必须大于0' })
  }
  res.json({ code: 200, message: '下单成功', orderId: `ORD-${Date.now()}`, productId, quantity })
})

app.post('/api/chat', requireAuth, async (req, res) => {
  const { messages, mode, moduleContext, systemPrompt } = req.body

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: '服务端未配置 API Key' })
  }

  const system = systemPrompt || (mode === 'interview' ? INTERVIEWER_SYSTEM
    : `${TUTOR_SYSTEM}\n\n当前学员正在学习的模块：${moduleContext || '未知'}`)

  try {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system,
      messages
    })

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`)
      }
    }
    res.write('data: [DONE]\n\n')
    res.end()
  } catch (err) {
    const message = err instanceof Error ? err.message : '服务端异常'
    if (res.headersSent) {
      try {
        res.write(`data: ${JSON.stringify({ error: message })}\n\n`)
        res.write('data: [DONE]\n\n')
      } catch { /* ignore stream write errors */ }
      res.end()
      return
    }
    res.status(500).json({ error: message })
  }
})

// SPA fallback（生产环境）
if (existsSync(distPath)) {
  app.get('*', (_, res) => res.sendFile(join(distPath, 'index.html')))
}

async function bootstrap() {
  try {
    await ensureSchema()
    await ensureLocalDebugAdmin()
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
      console.log(`Auth mode: ${AUTH_REQUIRED ? 'enabled' : 'disabled'}`)
    })
  } catch (err) {
    console.error('Server bootstrap failed:', err)
    process.exit(1)
  }
}

bootstrap()
