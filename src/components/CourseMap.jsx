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
  const r = 26
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={r} fill="none" stroke="#334155" strokeWidth="6" />
          <circle
            cx="32" cy="32" r={r} fill="none"
            stroke={color} strokeWidth="6"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-100">
          {pct}%
        </span>
      </div>
      <div className="text-center">
        <div className="text-xs font-medium text-slate-300">{label}</div>
        <div className="text-xs text-slate-500">{value}/{total} 完成</div>
      </div>
    </div>
  )
}

export default function CourseMap({ modules, onSelectModule, wrongbookCount, user, onLogout }) {
  const [progress, setProgress] = useState(() => getOverallProgress(modules))

  // 挂载后订阅进度变化事件，避免渲染循环
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
    { label: '01 基础课程', ids: ['00', '01', '02'] },
    { label: '02 核心技能', ids: ['03', '04', '05'] },
    { label: '03 工具与实操', ids: ['06', '07'] },
    { label: '04 实战与求职', ids: ['08', '09', '10', '11'] },
  ]

  return (
    <div className="min-h-screen app-shell text-slate-100">
      <div className="absolute inset-0 app-grid-overlay pointer-events-none" />

      <div className="relative px-8 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-3xl p-7 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] tracking-[0.24em] uppercase text-cyan-300/80">QA Bootcamp</p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                  功能测试训练营
                </h1>
                <p className="mt-2 text-sm text-slate-300">零基础转行 · 两阶段学习 · AI 教辅 + 苏格拉底实战</p>
                <p className="mt-3 text-xs text-slate-400">当前账号：{user?.username} · 会员等级：{(user?.plan || '').toUpperCase()}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onSelectModule('wrongbook')}
                  className="relative flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors border border-white/10"
                >
                  📕 错题本
                  {wrongbookCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {wrongbookCount > 9 ? '9+' : wrongbookCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors border border-white/10"
                >
                  退出登录
                </button>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-10">
              <ProgressRing value={progress.p1Done} total={progress.p1Total} color="#34d399" label="基础关卡" />
              <ProgressRing value={progress.p2Done} total={progress.p2Total} color="#60a5fa" label="实战关卡" />
              <div className="flex-1 hidden sm:block">
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />练习题通关 ≥80% 解锁实战</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />答错题自动进入错题本</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />苏格拉底 AI 引导，不直接给答案</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-fuchsia-400 shrink-0" />接口测试模块可真实发请求</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-8 pb-10 space-y-8">
        {groups.map(group => {
          const mods = modules.filter(m => group.ids.includes(m.id))
          if (mods.length === 0) return null
          return (
            <div key={group.label}>
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.18em] mb-3">{group.label}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mods.map(m => (
                  <ModuleCard
                    key={m.id}
                    module={m}
                    onClick={() => onSelectModule(m.id)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
