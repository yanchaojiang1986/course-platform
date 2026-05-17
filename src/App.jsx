import { useState, useEffect } from 'react'
import CourseMap from './components/CourseMap.jsx'
import ModuleDetail from './components/ModuleDetail.jsx'
import WrongBook from './components/WrongBook.jsx'
import AuthPage from './components/AuthPage.jsx'
import { MODULES } from './data/modules.js'
import { hasPlanAccess } from './utils/access.js'
import { validateInteractiveData } from './data/validateInteractive.js'

const BYPASS_LOGIN = true
const DEMO_USER = { id: 0, username: 'demo', plan: 'svip', status: 'active', memberExpiresAt: null }

const INTERACTIVE_ERRORS = validateInteractiveData()
if (INTERACTIVE_ERRORS.length > 0) {
  console.error('[interactive.js] 校验失败：', INTERACTIVE_ERRORS)
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
  const [view, setView] = useState('map') // 'map' | moduleId
  const [showWrongBook, setShowWrongBook] = useState(false)
  const [wrongbookCount, setWrongbookCount] = useState(getWrongbookCount)
  const [authLoading, setAuthLoading] = useState(true)
  const [user, setUser] = useState(null)

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
      } finally {
        if (mounted) setAuthLoading(false)
      }
    }
    bootstrap()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    setWrongbookCount(getWrongbookCount())
  }, [view, showWrongBook])

  const effectiveUser = user || (BYPASS_LOGIN ? DEMO_USER : null)

  const visibleModules = MODULES.filter(m => hasPlanAccess(effectiveUser?.plan, m.requiredPlan))
  const visibleIds = new Set(visibleModules.map(m => m.id))

  const handleSelectModule = (id) => {
    if (id === 'wrongbook') {
      setShowWrongBook(true)
    } else if (visibleIds.has(id)) {
      setView(id)
    } else {
      setView('map')
    }
  }

  const activeModule = visibleModules.find(m => m.id === view)

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } catch { /* ignore */ }
    setUser(null)
    setView('map')
    setShowWrongBook(false)
  }

  if (authLoading && !BYPASS_LOGIN) {
    return <div className="min-h-screen grid place-items-center text-gray-500">加载中...</div>
  }

  if (!effectiveUser) {
    return <AuthPage onAuthed={(u) => setUser(u)} />
  }

  return (
    <>
      {import.meta.env.DEV && <ValidationBanner errors={INTERACTIVE_ERRORS} />}
      {view === 'map' || !activeModule ? (
        <CourseMap
          user={effectiveUser}
          modules={visibleModules}
          onSelectModule={handleSelectModule}
          wrongbookCount={wrongbookCount}
          onLogout={handleLogout}
        />
      ) : (
        <ModuleDetail
          module={activeModule}
          onBack={() => setView('map')}
        />
      )}

      {showWrongBook && (
        <WrongBook
          onClose={() => { setShowWrongBook(false); setWrongbookCount(getWrongbookCount()) }}
          onNavigate={(moduleId) => { setShowWrongBook(false); handleSelectModule(moduleId) }}
        />
      )}
    </>
  )
}
