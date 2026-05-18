import { useState, useEffect, useCallback, useMemo } from 'react'
import CourseMap from './components/CourseMap.jsx'
import ModuleDetail from './components/ModuleDetail.jsx'
import WrongBook from './components/WrongBook.jsx'
import AuthPage from './components/AuthPage.jsx'
import WorkbenchSidebar from './components/WorkbenchSidebar.jsx'
import { MODULES } from './data/modules.js'
import { hasPlanAccess } from './utils/access.js'
import { validateInteractiveData } from './data/validateInteractive.js'
import { logClient } from './utils/clientLogger.js'

// 侧栏分组：4 个阶段
const STAGE_GROUPS = [
  { label: 'Stage 01 · 基础课程', ids: ['00', '01', '02'] },
  { label: 'Stage 02 · 核心技能', ids: ['03', '04', '05'] },
  { label: 'Stage 03 · 工具实操', ids: ['06', '07'] },
  { label: 'Stage 04 · 进阶专项', ids: ['12', '13'] },
  { label: 'Stage 05 · 实战演练', ids: ['08', '14'] },
  { label: 'Stage 06 · 求职冲刺', ids: ['15', '09', '10'] },
  { label: 'Stage 07 · 资料附录', ids: ['11'] },
]

const BYPASS_LOGIN = true
const DEMO_USER = { id: 0, username: 'demo', plan: 'svip', status: 'active', memberExpiresAt: null }

const THEME_KEY = 'cp_theme'
const THEMES = ['dark', 'light']

function readInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (THEMES.includes(saved)) return saved
  } catch { /* ignore */ }
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  return 'dark'
}

function applyTheme(theme) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = theme
}

// 初始化主题（在 React 渲染前同步执行，避免一闪烁）
applyTheme(readInitialTheme())

const INTERACTIVE_ERRORS = validateInteractiveData()
if (INTERACTIVE_ERRORS.length > 0) {
  logClient('error', 'interactive_schema_failed', { count: INTERACTIVE_ERRORS.length, errors: INTERACTIVE_ERRORS })
}

function ValidationBanner({ errors }) {
  const [collapsed, setCollapsed] = useState(false)
  if (errors.length === 0) return null
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white text-xs shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-3">
        <span className="font-semibold">⚠️ interactive.js 有 {errors.length} 处数据问题</span>
        <button onClick={() => setCollapsed(c => !c)} className="ml-auto px-2 py-0.5 bg-white/20 rounded hover:bg-white/30">
          {collapsed ? '展开' : '收起'}
        </button>
      </div>
      {!collapsed && (
        <div className="max-w-5xl mx-auto px-4 pb-2 max-h-48 overflow-y-auto font-mono leading-relaxed">
          {errors.map((e, i) => (
            <div key={i}>· <span className="font-semibold">{e.blockId}</span>{e.type ? ` (${e.type})` : ''} — {e.reason}</div>
          ))}
        </div>
      )}
    </div>
  )
}

function getWrongbookCount() {
  try {
    const wb = JSON.parse(localStorage.getItem('wrongbook') || '[]')
    return wb.filter(e => !e.mastered).length
  } catch { return 0 }
}

export default function App() {
  const [view, setView] = useState('map') // 'map' | 'wrongbook' | moduleId
  const [wrongbookCount, setWrongbookCount] = useState(getWrongbookCount)
  const [authLoading, setAuthLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState(readInitialTheme)

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try { localStorage.setItem(THEME_KEY, next) } catch { /* ignore */ }
      applyTheme(next)
      return next
    })
  }, [])

  useEffect(() => {
    const onError = (event) => {
      logClient('error', 'window_error', {
        message: event?.message || '',
        source: event?.filename || '',
        line: event?.lineno || 0,
        col: event?.colno || 0,
      })
    }
    const onRejection = (event) => {
      logClient('error', 'unhandled_rejection', {
        reason: String(event?.reason || ''),
      })
    }
    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onRejection)
    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onRejection)
    }
  }, [])

  useEffect(() => {
    let mounted = true
    const bootstrap = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' })
        if (!res.ok) throw new Error('unauthorized')
        const data = await res.json()
        if (mounted) setUser(data.user || null)
      } catch {
        if (mounted) setUser(null)
        logClient('warn', 'auth_me_failed')
      } finally {
        if (mounted) setAuthLoading(false)
      }
    }
    bootstrap()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    setWrongbookCount(getWrongbookCount())
  }, [view])

  const effectiveUser = user || (BYPASS_LOGIN ? DEMO_USER : null)

  const visibleModules = MODULES.filter(m => hasPlanAccess(effectiveUser?.plan, m.requiredPlan))
  const visibleIds = new Set(visibleModules.map(m => m.id))

  const handleSelectModule = (id) => {
    if (id === 'overview' || id === 'wrongbook' || visibleIds.has(id)) {
      setView(id === 'overview' ? 'map' : id)
    } else {
      const target = MODULES.find(m => m.id === id)
      if (target) {
        window.alert(`此课程需要 ${target.requiredPlan?.toUpperCase()} 权限解锁。\n\n请联系课程管理员升级后继续学习。`)
      }
      setView('map')
    }
  }

  const activeModule = MODULES.find(m => m.id === view && visibleIds.has(m.id))

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } catch { /* ignore */ }
    setUser(null)
    setView('map')
  }

  // 构建侧栏项目列表（含分组分割）
  const sidebarItems = useMemo(() => {
    const items = [
      { kind: 'item', id: 'overview', label: '总览', icon: '🧭', hint: '任务地图与进度' },
    ]
    STAGE_GROUPS.forEach(group => {
      const groupMods = visibleModules.filter(m => group.ids.includes(m.id))
      if (groupMods.length === 0) return
      items.push({ kind: 'section', label: group.label })
      groupMods.forEach(m => {
        items.push({
          kind: 'item',
          id: m.id,
          label: m.title,
          icon: m.emoji,
          hint: m.tag,
        })
      })
    })
    items.push({ kind: 'section', label: 'Tools' })
    items.push({
      kind: 'item',
      id: 'wrongbook',
      label: '错题本',
      icon: '📕',
      hint: wrongbookCount > 0 ? `${wrongbookCount} 题待复习` : '集中复习薄弱点',
    })
    return items
  }, [visibleModules, wrongbookCount])

  // 侧栏激活态：当 view 是 'map' 时高亮 overview
  const activeId = view === 'map' ? 'overview' : view

  if (authLoading && !BYPASS_LOGIN) {
    return <div className="min-h-screen grid place-items-center text-fg-muted">加载中...</div>
  }

  if (!effectiveUser) {
    return <AuthPage onAuthed={(u) => setUser(u)} />
  }

  let mainView
  if (view === 'wrongbook') {
    mainView = <WrongBook onNavigate={(moduleId) => handleSelectModule(moduleId)} />
  } else if (activeModule) {
    mainView = <ModuleDetail module={activeModule} />
  } else {
    mainView = (
      <CourseMap
        user={effectiveUser}
        modules={MODULES}
        onSelectModule={handleSelectModule}
        wrongbookCount={wrongbookCount}
      />
    )
  }

  return (
    <>
      {import.meta.env.DEV && <ValidationBanner errors={INTERACTIVE_ERRORS} />}
      <div className="ws-shell">
        <WorkbenchSidebar
          items={sidebarItems}
          activeId={activeId}
          onChange={handleSelectModule}
          brandTitle="功能测试训练营"
          brandTag="QA Bootcamp"
          footer={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <div>账号 <span style={{ color: 'var(--text)', fontWeight: 600 }}>{effectiveUser?.username}</span></div>
                <div style={{ marginTop: 2 }}>计划 <span style={{ color: 'var(--secondary)', fontWeight: 700, textTransform: 'uppercase' }}>{effectiveUser?.plan}</span></div>
              </div>
              <button onClick={toggleTheme} className="glass-btn" style={{ fontSize: 12, padding: '8px 12px' }}>
                {theme === 'light' ? '🌙 切换深色' : '☀️ 切换浅色'}
              </button>
              <button onClick={handleLogout} className="glass-btn" style={{ fontSize: 12, padding: '8px 12px' }}>
                退出登录
              </button>
            </div>
          }
        />
        <main className="ws-main">
          {mainView}
        </main>
      </div>
    </>
  )
}
