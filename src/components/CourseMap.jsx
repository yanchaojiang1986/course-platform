import { useState, useEffect } from 'react'
import { EXERCISES } from '../data/exercises.js'
import { SCENARIOS } from '../data/scenarios.js'
import ModuleCard from './ModuleCard.jsx'

function getOverallProgress(modules) {
  let p1Done = 0, p2Done = 0, totalP1 = 0, totalP2 = 0
  modules.forEach(m => {
    const hasEx = (EXERCISES[m.id] || []).length > 0
    if (hasEx) {
      totalP1++
      try {
        const d = JSON.parse(localStorage.getItem(`phase1_${m.id}`) || 'null')
        if (d?.passed) p1Done++
      } catch { /* ignore */ }
    }
    const hasScenario = !!SCENARIOS[m.id]
    if (hasScenario) {
      totalP2++
      try {
        const d = JSON.parse(localStorage.getItem(`phase2_${m.id}`) || 'null')
        if (d?.completed) p2Done++
      } catch { /* ignore */ }
    }
  })
  return { p1Done, p1Total: totalP1, p2Done, p2Total: totalP2 }
}

function ProgressRing({ value, total, color, label }) {
  const pct = total ? Math.round((value / total) * 100) : 0
  const r = 28
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ

  return (
    <div className="metric-panel flex items-center gap-4 min-w-[170px]">
      <div className="relative w-16 h-16 shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(148,163,184,0.25)" strokeWidth="7" />
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-fg-strong">{pct}%</span>
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.14em] text-fg-muted">{label}</div>
        <div className="mt-1 text-sm font-semibold text-fg-strong">{value}/{total} 完成</div>
      </div>
    </div>
  )
}

function Metric({ title, value, hint, color }) {
  return (
    <div className="metric-panel">
      <div className="text-[11px] uppercase tracking-[0.16em] text-fg-muted">{title}</div>
      <div className="mt-2 text-2xl font-semibold" style={{ color }}>{value}</div>
      <div className="mt-1 text-xs text-fg-muted">{hint}</div>
    </div>
  )
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme !== 'light'
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? '切换为浅色模式' : '切换为深色模式'}
      title={isDark ? '切换为浅色模式' : '切换为深色模式'}
      className="px-3 py-2.5 rounded-xl border border-themed bg-surface text-fg hover:bg-elevated transition-colors flex items-center gap-1.5 text-sm"
    >
      <span aria-hidden>{isDark ? '🌙' : '☀️'}</span>
      <span>{isDark ? '深色' : '浅色'}</span>
    </button>
  )
}

export default function CourseMap({ modules, onSelectModule, wrongbookCount, user, onLogout, theme, onToggleTheme }) {
  const [progress, setProgress] = useState(() => getOverallProgress(modules))

  useEffect(() => {
    const syncProgress = () => setProgress(getOverallProgress(modules))
    window.addEventListener('storage', syncProgress)
    window.addEventListener('progress-updated', syncProgress)
    window.addEventListener('focus', syncProgress)
    return () => {
      window.removeEventListener('storage', syncProgress)
      window.removeEventListener('progress-updated', syncProgress)
      window.removeEventListener('focus', syncProgress)
    }
  }, [modules])

  const groups = [
    { label: 'Stage 01 · 基础课程', ids: ['00', '01', '02'], desc: '计算机与测试认知的底层能力，建立统一语言和视角。' },
    { label: 'Stage 02 · 核心技能', ids: ['03', '04', '05'], desc: '功能测试主线方法：流程、设计、缺陷管理与输出。' },
    { label: 'Stage 03 · 工具实操', ids: ['06', '07'], desc: '接口与工具体系，形成真实可复用的执行能力。' },
    { label: 'Stage 04 · 项目与求职', ids: ['08', '09', '10', '11'], desc: '企业级项目场景与岗位转化能力，完成闭环。' },
  ]

  const doneModules = progress.p1Done + progress.p2Done
  const totalUnits = progress.p1Total + progress.p2Total || 1
  const doneRate = Math.round((doneModules / totalUnits) * 100)

  return (
    <div className="min-h-screen app-shell text-fg">
      <div className="absolute inset-0 app-grid-overlay pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10 space-y-8">
        <section className="glass-panel rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="max-w-3xl">
              <p className="section-chip">Test Engineering Bootcamp</p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-fg-strong">
                功能测试训练营 · 任务地图
              </h1>
              <p className="mt-3 text-sm sm:text-base text-fg-muted leading-relaxed">
                按“基础关卡 → 实战关卡”推进。每个模块都以可验证结果为目标，不是看完就算学完。
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full border border-themed bg-surface-soft text-fg">账号：{user?.username}</span>
                <span className="px-3 py-1 rounded-full border border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-200">计划：{(user?.plan || '').toUpperCase()}</span>
                <span className="px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200">总进度：{doneRate}%</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start flex-wrap">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              <button
                onClick={() => onSelectModule('wrongbook')}
                className="relative px-4 py-2.5 rounded-xl border border-rose-400/35 bg-rose-500/10 text-rose-700 dark:text-rose-100 hover:bg-rose-500/20 transition-colors"
              >
                错题本
                {wrongbookCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-rose-500 text-white text-[11px] flex items-center justify-center font-semibold">
                    {wrongbookCount > 9 ? '9+' : wrongbookCount}
                  </span>
                )}
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2.5 rounded-xl border border-themed bg-surface text-fg hover:bg-elevated transition-colors"
              >
                退出登录
              </button>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-wrap gap-3">
              <ProgressRing value={progress.p1Done} total={progress.p1Total} color="#34d399" label="基础关卡" />
              <ProgressRing value={progress.p2Done} total={progress.p2Total} color="#38bdf8" label="实战关卡" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Metric title="可学模块" value={modules.length} hint="已按会员权限过滤" color="#7dd3fc" />
              <Metric title="已完成单元" value={doneModules} hint="基础+实战累计" color="#6ee7b7" />
            </div>
          </div>
        </section>

        {groups.map(group => {
          const mods = modules.filter(m => group.ids.includes(m.id))
          if (mods.length === 0) return null
          return (
            <section key={group.label} className="glass-panel rounded-3xl p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-sm font-semibold tracking-[0.12em] uppercase text-fg-strong">{group.label}</h2>
                  <p className="mt-1 text-sm text-fg-muted">{group.desc}</p>
                </div>
                <span className="text-xs text-fg-muted">{mods.length} 个模块</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {mods.map(m => (
                  <ModuleCard
                    key={m.id}
                    module={m}
                    onClick={() => onSelectModule(m.id)}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
