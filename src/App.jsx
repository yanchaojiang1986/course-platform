import { useState, useEffect } from 'react'
import CourseMap from './components/CourseMap.jsx'
import ModuleDetail from './components/ModuleDetail.jsx'
import WrongBook from './components/WrongBook.jsx'
import AuthPage from './components/AuthPage.jsx'
import { MODULES } from './data/modules.js'
import { hasPlanAccess } from './utils/access.js'

const BYPASS_LOGIN = true
const DEMO_USER = { id: 0, username: 'demo', plan: 'svip', status: 'active', memberExpiresAt: null }

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
