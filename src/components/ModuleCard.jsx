import { EXERCISES } from '../data/exercises.js'
import { SCENARIOS } from '../data/scenarios.js'
import SpotlightCard from './ui/SpotlightCard.jsx'

const TAG_COLORS = {
  '导航': 'from-zinc-500 to-zinc-700',
  '基础': 'from-cyan-400 to-blue-600',
  '认知': 'from-violet-400 to-fuchsia-600',
  '流程': 'from-teal-400 to-emerald-600',
  '核心技能': 'from-orange-400 to-rose-500',
  '工具': 'from-lime-400 to-emerald-600',
  '实战': 'from-pink-500 to-rose-600',
  '求职': 'from-amber-400 to-orange-600',
  '附录': 'from-slate-400 to-slate-600',
}

const TAG_SPOTLIGHT = {
  '导航': 'rgba(255,255,255,0.25)',
  '基础': 'rgba(59,130,246,0.35)',
  '认知': 'rgba(168,85,247,0.35)',
  '流程': 'rgba(16,185,129,0.3)',
  '核心技能': 'rgba(249,115,22,0.32)',
  '工具': 'rgba(132,204,22,0.3)',
  '实战': 'rgba(244,63,94,0.32)',
  '求职': 'rgba(245,158,11,0.35)',
  '附录': 'rgba(148,163,184,0.28)',
}

function getPhase1State(moduleId) {
  try {
    const data = JSON.parse(localStorage.getItem(`phase1_${moduleId}`) || 'null')
    if (!data) return { status: 'untouched', score: 0, attempts: 0 }
    return data
  } catch { return { status: 'untouched', score: 0, attempts: 0 } }
}

function getPhase2State(moduleId) {
  try {
    const data = JSON.parse(localStorage.getItem(`phase2_${moduleId}`) || 'null')
    return data || { started: false, completed: false }
  } catch { return { started: false, completed: false } }
}

export default function ModuleCard({ module, onClick }) {
  const exercises = EXERCISES[module.id] || []
  const hasScenario = !!SCENARIOS[module.id]
  const phase1 = getPhase1State(module.id)
  const phase2 = getPhase2State(module.id)

  const p1Passed = phase1.passed === true
  const p1Score = phase1.score || 0
  const p1Pct = exercises.length ? Math.round(p1Score * 100) : null

  const gradientClass = TAG_COLORS[module.tag] || TAG_COLORS['附录']
  const spotlightColor = TAG_SPOTLIGHT[module.tag] || TAG_SPOTLIGHT['附录']

  return (
    <SpotlightCard
      as="button"
      onClick={onClick}
      spotlightColor={spotlightColor}
      className="group w-full text-left rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300"
    >
      <div className={`h-1.5 bg-gradient-to-r ${gradientClass}`} />

      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl shrink-0 mt-0.5">{module.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-slate-400">模块 {module.id}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full bg-gradient-to-r ${gradientClass} text-white font-medium shadow-sm`}>
                {module.tag}
              </span>
            </div>
            <h3 className="font-semibold text-slate-100 text-sm leading-snug group-hover:text-cyan-300 transition-colors">
              {module.title}
            </h3>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <span>📖</span> 基础关卡
            </span>
            {exercises.length === 0 ? (
              <span className="text-slate-500">无练习题</span>
            ) : p1Passed ? (
              <span className="text-emerald-300 font-medium flex items-center gap-1">
                <span>✓</span> 已通关 {p1Pct}%
              </span>
            ) : p1Pct !== null ? (
              <span className="text-amber-300">进行中 {p1Pct}%</span>
            ) : (
              <span className="text-slate-500">待开始</span>
            )}
          </div>

          {exercises.length > 0 && (
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${p1Passed ? 'bg-emerald-400' : 'bg-amber-400'}`}
                style={{ width: `${p1Pct || 0}%` }}
              />
            </div>
          )}

          {hasScenario && (
            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-slate-400 flex items-center gap-1">
                <span>🎯</span> 实战关卡
              </span>
              {!p1Passed && exercises.length > 0 ? (
                <span className="text-slate-500 flex items-center gap-1">🔒 需通关基础</span>
              ) : phase2.completed ? (
                <span className="text-emerald-300 font-medium flex items-center gap-1"><span>✓</span> 已完成</span>
              ) : phase2.started ? (
                <span className="text-cyan-300">进行中</span>
              ) : (
                <span className="text-cyan-400 flex items-center gap-1">▶ 可开始</span>
              )}
            </div>
          )}
        </div>
      </div>
    </SpotlightCard>
  )
}
