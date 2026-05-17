import { EXERCISES } from '../data/exercises.js'
import { SCENARIOS } from '../data/scenarios.js'
import SpotlightCard from './ui/SpotlightCard.jsx'

const TAG_COLORS = {
  '导航': { line: 'from-slate-300 to-slate-500', spot: 'rgba(203,213,225,0.28)' },
  '基础': { line: 'from-sky-400 to-cyan-300', spot: 'rgba(56,189,248,0.34)' },
  '认知': { line: 'from-emerald-400 to-teal-300', spot: 'rgba(16,185,129,0.32)' },
  '流程': { line: 'from-cyan-500 to-emerald-400', spot: 'rgba(34,211,238,0.3)' },
  '核心技能': { line: 'from-amber-400 to-orange-500', spot: 'rgba(245,158,11,0.34)' },
  '工具': { line: 'from-lime-400 to-emerald-500', spot: 'rgba(132,204,22,0.3)' },
  '实战': { line: 'from-rose-400 to-orange-400', spot: 'rgba(251,113,133,0.32)' },
  '求职': { line: 'from-orange-300 to-amber-500', spot: 'rgba(251,146,60,0.34)' },
  '附录': { line: 'from-slate-400 to-slate-600', spot: 'rgba(148,163,184,0.3)' },
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

function StageBadge({ ok, label }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] ${ok
      ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200'
      : 'border-themed bg-surface-soft text-fg-muted'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${ok ? 'bg-emerald-400 dot-signal' : 'bg-fg-faint opacity-60'}`} style={!ok ? { background: 'var(--text-faint)' } : undefined} />
      {label}
    </span>
  )
}

export default function ModuleCard({ module, onClick }) {
  const exercises = EXERCISES[module.id] || []
  const hasScenario = !!SCENARIOS[module.id]
  const phase1 = getPhase1State(module.id)
  const phase2 = getPhase2State(module.id)

  const p1Passed = phase1.passed === true
  const p1Score = phase1.score || 0
  const p1Pct = exercises.length ? Math.round(p1Score * 100) : 0

  const theme = TAG_COLORS[module.tag] || TAG_COLORS['附录']

  return (
    <SpotlightCard
      as="button"
      onClick={onClick}
      spotlightColor={theme.spot}
      className="group w-full text-left elevated-card text-fg hover:-translate-y-1.5 hover:border-themed-strong transition-all duration-300"
    >
      <div className={`h-1.5 bg-gradient-to-r ${theme.line} rounded-t-2xl`} />

      <div className="p-4 sm:p-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 shrink-0 rounded-xl border border-themed bg-surface-soft flex items-center justify-center text-xl">
            {module.emoji}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono tracking-[0.08em] text-fg-muted">M-{module.id}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r ${theme.line} text-slate-950 font-semibold`}>
                {module.tag}
              </span>
            </div>
            <h3 className="text-sm font-semibold leading-snug text-fg-strong group-hover:text-sky-600 dark:group-hover:text-sky-200 transition-colors">
              {module.title}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-fg-muted">基础关卡进度</span>
              {exercises.length === 0 ? (
                <span className="text-fg-faint">无练习题</span>
              ) : p1Passed ? (
                <span className="text-emerald-600 dark:text-emerald-300 font-medium">已通关 {p1Pct}%</span>
              ) : phase1.attempts > 0 ? (
                <span className="text-amber-600 dark:text-amber-300">进行中 {p1Pct}%</span>
              ) : (
                <span className="text-fg-faint">待开始</span>
              )}
            </div>
            <div className="h-1.5 bg-surface-soft rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${p1Passed ? 'bg-emerald-400' : 'bg-amber-400'}`}
                style={{ width: `${Math.max(0, Math.min(100, p1Pct))}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <StageBadge ok={p1Passed || exercises.length === 0} label="P1 基础" />
            {hasScenario && (
              <StageBadge
                ok={phase2.completed}
                label={!p1Passed && exercises.length > 0 ? 'P2 锁定' : phase2.started ? 'P2 进行中' : 'P2 待开始'}
              />
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  )
}
