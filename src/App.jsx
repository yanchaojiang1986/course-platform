import { useState, useEffect, useCallback, useMemo } from 'react'
import CourseMap from './components/CourseMap.jsx'
import ModuleDetail from './components/ModuleDetail.jsx'
import WrongBook from './components/WrongBook.jsx'
import AuthPage from './components/AuthPage.jsx'
import WorkbenchSidebar from './components/WorkbenchSidebar.jsx'
import { MODULES } from './data/modules.js'
import { EXERCISES } from './data/exercises.js'
import { SCENARIOS } from './data/scenarios.js'
import { hasPlanAccess } from './utils/access.js'
import { validateInteractiveData } from './data/validateInteractive.js'
import { logClient } from './utils/clientLogger.js'

// 侧栏分组：4 个阶段
const STAGE_GROUPS = [
  { label: 'Stage 01 · 基础教程', ids: ['00', '01', '02'] },
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
const BASIC_MODULE_IDS = new Set(['00', '01', '02'])
const SCREENING_KEY = 'cp_entry_screening_v1'
const SCREENING_PASS_SCORE = 60

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

function defaultScreeningAnswers() {
  return {
    education: '',
    major: '',
    experience: '',
  }
}

function readScreeningResult() {
  try {
    const raw = JSON.parse(localStorage.getItem(SCREENING_KEY) || 'null')
    if (!raw || typeof raw !== 'object') return null
    return raw
  } catch {
    return null
  }
}

function scoreScreening(answers) {
  const scoreMap = {
    education: {
      fulltime_college: 8,
      bachelor: 12,
      master_plus: 15,
      non_fulltime_college: -10,
      below_college: -20,
    },
    major: {
      computer: 10,
      stem: 6,
      non_stem: 0,
      arts: -8,
    },
    experience: {
      none: -6,
      one_three_related: 10,
      one_three_unrelated: 4,
      four_eight_related: 8,
      four_eight_unrelated: -2,
      nine_plus_related: 3,
      nine_plus_unrelated: -10,
    }
  }

  const base = 50
  const score = base
    + (scoreMap.education[answers.education] || 0)
    + (scoreMap.major[answers.major] || 0)
    + (scoreMap.experience[answers.experience] || 0)

  const hardFailed = answers.education === 'non_fulltime_college' || answers.education === 'below_college'
  const passed = !hardFailed && score >= SCREENING_PASS_SCORE

  return {
    score,
    passed,
    hardFailed,
    threshold: SCREENING_PASS_SCORE,
  }
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

function ScreeningModal({
  open,
  answers,
  onChange,
  onSubmit,
  onClose,
  result,
  targetModuleTitle,
}) {
  if (!open) return null
  const showResult = !!result

  return (
    <div className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-sm px-4 py-6 flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-2xl border border-themed bg-surface p-5 sm:p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-fg-muted">前置筛选</p>
            <h3 className="mt-1 text-xl font-bold text-fg-strong">进入基础教程前评估</h3>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">
              为保证学习效果，进入 <span className="text-fg-strong font-semibold">{targetModuleTitle || '基础教程'}</span> 前需要先完成基础筛选。
              及格分为 {SCREENING_PASS_SCORE} 分。
            </p>
          </div>
          <button className="glass-btn text-xs px-3 py-1.5" onClick={onClose}>关闭</button>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="text-sm text-fg">
            <div className="mb-1.5 text-fg-muted">学历</div>
            <select
              className="w-full rounded-xl border border-themed bg-surface-soft px-3 py-2 text-fg"
              value={answers.education}
              onChange={(e) => onChange('education', e.target.value)}
            >
              <option value="">请选择</option>
              <option value="fulltime_college">全日制大专</option>
              <option value="bachelor">本科</option>
              <option value="master_plus">硕士及以上</option>
              <option value="non_fulltime_college">非全日制大专/本科</option>
              <option value="below_college">大专以下</option>
            </select>
          </label>

          <label className="text-sm text-fg">
            <div className="mb-1.5 text-fg-muted">专业</div>
            <select
              className="w-full rounded-xl border border-themed bg-surface-soft px-3 py-2 text-fg"
              value={answers.major}
              onChange={(e) => onChange('major', e.target.value)}
            >
              <option value="">请选择</option>
              <option value="computer">计算机类</option>
              <option value="stem">理工科（非计算机）</option>
              <option value="non_stem">其他专业</option>
              <option value="arts">文科类</option>
            </select>
          </label>

          <label className="text-sm text-fg sm:col-span-2">
            <div className="mb-1.5 text-fg-muted">工作经验</div>
            <select
              className="w-full rounded-xl border border-themed bg-surface-soft px-3 py-2 text-fg"
              value={answers.experience}
              onChange={(e) => onChange('experience', e.target.value)}
            >
              <option value="">请选择</option>
              <option value="none">0 年工作经验</option>
              <option value="one_three_related">1-3 年相关经验</option>
              <option value="one_three_unrelated">1-3 年非相关经验</option>
              <option value="four_eight_related">4-8 年相关经验</option>
              <option value="four_eight_unrelated">4-8 年非相关经验</option>
              <option value="nine_plus_related">9 年以上相关经验</option>
              <option value="nine_plus_unrelated">9 年以上且不相关经验</option>
            </select>
          </label>
        </div>

        {showResult && (
          <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${result.passed
            ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200'
            : 'border-rose-400/40 bg-rose-500/10 text-rose-700 dark:text-rose-200'}`}>
            <div className="font-semibold">评估得分：{result.score} / 100</div>
            {result.passed ? (
              <div className="mt-1">已达到进入条件，正在进入基础教程。</div>
            ) : result.hardFailed ? (
              <div className="mt-1">当前学历条件不满足“全日制大专及以上”要求，暂不满足学习条件。</div>
            ) : (
              <div className="mt-1">未达到及格线（{result.threshold} 分），暂不满足学习条件。</div>
            )}
          </div>
        )}

        <div className="mt-5 flex items-center justify-end gap-2">
          <button className="glass-btn text-sm px-4 py-2" onClick={onClose}>取消</button>
          <button className="glass-btn text-sm px-4 py-2 border-emerald-400/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200" onClick={onSubmit}>
            提交评估
          </button>
        </div>
      </div>
    </div>
  )
}

function getWrongbookCount() {
  try {
    const wb = JSON.parse(localStorage.getItem('wrongbook') || '[]')
    return wb.filter(e => !e.mastered).length
  } catch { return 0 }
}

function readPhase1(moduleId) {
  try { return JSON.parse(localStorage.getItem(`phase1_${moduleId}`) || 'null') || {} }
  catch { return {} }
}

function readPhase2(moduleId) {
  try { return JSON.parse(localStorage.getItem(`phase2_${moduleId}`) || 'null') || {} }
  catch { return {} }
}

function computeModuleNavState(module) {
  const hasExercises = (EXERCISES[module.id] || []).length > 0
  const hasScenario = !!SCENARIOS[module.id]
  if (!hasExercises && !hasScenario) return 'default'

  const p1 = readPhase1(module.id)
  const p2 = readPhase2(module.id)

  const p1Passed = p1.passed === true
  const p2Completed = p2.completed === true
  const completed = hasExercises && hasScenario
    ? (p1Passed && p2Completed)
    : hasExercises
      ? p1Passed
      : p2Completed

  if (completed) return 'completed'

  const inProgress = (p1.attempts || 0) > 0 || p1Passed || p2.started === true
  return inProgress ? 'in_progress' : 'default'
}

export default function App() {
  const [view, setView] = useState('map') // 'map' | 'wrongbook' | moduleId
  const [wrongbookCount, setWrongbookCount] = useState(getWrongbookCount)
  const [moduleNavStateMap, setModuleNavStateMap] = useState(() => ({}))
  const [authLoading, setAuthLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState(readInitialTheme)
  const [screeningResult, setScreeningResult] = useState(() => readScreeningResult())
  const [screeningOpen, setScreeningOpen] = useState(false)
  const [screeningTargetId, setScreeningTargetId] = useState(null)
  const [screeningAnswers, setScreeningAnswers] = useState(defaultScreeningAnswers)
  const [screeningAttemptResult, setScreeningAttemptResult] = useState(null)

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

  useEffect(() => {
    const sync = () => {
      const next = {}
      MODULES.forEach((m) => {
        next[m.id] = computeModuleNavState(m)
      })
      setModuleNavStateMap(next)
    }
    sync()
    window.addEventListener('storage', sync)
    window.addEventListener('progress-updated', sync)
    window.addEventListener('focus', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('progress-updated', sync)
      window.removeEventListener('focus', sync)
    }
  }, [])

  const effectiveUser = user || (BYPASS_LOGIN ? DEMO_USER : null)

  const visibleModules = MODULES.filter(m => hasPlanAccess(effectiveUser?.plan, m.requiredPlan))
  const visibleIds = new Set(visibleModules.map(m => m.id))

  const openScreening = (targetId) => {
    setScreeningTargetId(targetId)
    setScreeningOpen(true)
    setScreeningAttemptResult(null)
    const previous = screeningResult?.answers
    setScreeningAnswers(previous ? {
      education: previous.education || '',
      major: previous.major || '',
      experience: previous.experience || '',
    } : defaultScreeningAnswers())
  }

  const handleSelectModule = (id) => {
    if (BASIC_MODULE_IDS.has(id) && !screeningResult?.passed) {
      openScreening(id)
      return
    }

    if (id === 'overview' || id === 'wrongbook' || visibleIds.has(id)) {
      setView(id === 'overview' ? 'map' : id)
    } else {
      const target = MODULES.find(m => m.id === id)
      if (target) {
        window.alert(`此教程需要 ${target.requiredPlan?.toUpperCase()} 权限解锁。\n\n请联系教程管理员升级后继续学习。`)
      }
      setView('map')
    }
  }

  const activeModule = MODULES.find(m => m.id === view && visibleIds.has(m.id))
  const screeningTargetModule = MODULES.find(m => m.id === screeningTargetId)

  const submitScreening = () => {
    if (!screeningAnswers.education || !screeningAnswers.major || !screeningAnswers.experience) {
      window.alert('请先完成全部筛选项后再提交。')
      return
    }
    const scored = scoreScreening(screeningAnswers)
    const payload = {
      ...scored,
      answers: { ...screeningAnswers },
      updatedAt: new Date().toISOString(),
    }
    try {
      localStorage.setItem(SCREENING_KEY, JSON.stringify(payload))
    } catch { /* ignore */ }
    setScreeningResult(payload)
    setScreeningAttemptResult(payload)

    if (payload.passed && screeningTargetId) {
      setScreeningOpen(false)
      setView(screeningTargetId)
      return
    }
    window.alert('未达到进入基础教程条件，当前不可进入基础教程。')
  }

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
          state: moduleNavStateMap[m.id] || 'default',
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
  }, [visibleModules, wrongbookCount, moduleNavStateMap])

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
          mobileNavCompact={view !== 'map'}
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
      <ScreeningModal
        open={screeningOpen}
        answers={screeningAnswers}
        result={screeningAttemptResult}
        targetModuleTitle={screeningTargetModule?.title}
        onClose={() => setScreeningOpen(false)}
        onChange={(key, value) => setScreeningAnswers(prev => ({ ...prev, [key]: value }))}
        onSubmit={submitScreening}
      />
    </>
  )
}
