import { useState, useMemo } from 'react'
import { MODULES } from '../data/modules.js'
import { EXERCISES } from '../data/exercises.js'

function getAllExercises() {
  const map = {}
  Object.entries(EXERCISES).forEach(([moduleId, qs]) => {
    qs.forEach(q => { map[q.id] = { ...q, moduleId } })
  })
  return map
}

function getWrongBook() {
  try { return JSON.parse(localStorage.getItem('wrongbook') || '[]') }
  catch { return [] }
}

function saveWrongBook(wb) {
  localStorage.setItem('wrongbook', JSON.stringify(wb))
}

function QuizItem({ entry, qData, onReview }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  if (!qData) return null

  const isCorrect = submitted && selected === qData.answer

  return (
    <div className="card-surface p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-fg-strong">{qData.question}</p>
        {entry.mastered && <span className="text-xs text-emerald-600 dark:text-emerald-300 font-medium shrink-0">✓ 已掌握</span>}
      </div>

      {qData.type === 'truefalse' && (
        <div className="flex gap-2">
          {[true, false].map(val => {
            const label = val ? '✓ 正确' : '✗ 错误'
            const sel = selected === val
            const correct = submitted && val === qData.answer
            const wrong = submitted && sel && !isCorrect
            return (
              <button key={String(val)} onClick={() => !submitted && setSelected(val)}
                className={`px-3 py-1.5 rounded-lg text-xs border transition-colors
                  ${correct ? 'bg-emerald-500/15 border-emerald-400/60 text-emerald-700 dark:text-emerald-200 font-medium' : ''}
                  ${wrong ? 'bg-rose-500/15 border-rose-400/60 text-rose-600 dark:text-rose-300' : ''}
                  ${!submitted && sel ? 'bg-sky-500/15 border-sky-400/60 text-sky-700 dark:text-sky-200' : ''}
                  ${!submitted && !sel ? 'border-themed hover:border-sky-400/50 text-fg' : ''}
                `}>
                {label}
              </button>
            )
          })}
        </div>
      )}

      {qData.type === 'choice' && (
        <div className="space-y-1.5">
          {qData.options.map((opt, i) => {
            const sel = selected === i
            const correct = submitted && i === qData.answer
            const wrong = submitted && sel && !isCorrect
            return (
              <button key={i} onClick={() => !submitted && setSelected(i)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs border transition-colors
                  ${correct ? 'bg-emerald-500/15 border-emerald-400/60 text-emerald-700 dark:text-emerald-200 font-medium' : ''}
                  ${wrong ? 'bg-rose-500/15 border-rose-400/60 text-rose-600 dark:text-rose-300' : ''}
                  ${!submitted && sel ? 'bg-sky-500/15 border-sky-400/60 text-sky-700 dark:text-sky-200' : ''}
                  ${!submitted && !sel ? 'border-themed hover:border-sky-400/50 text-fg' : ''}
                `}>
                <span className="font-mono mr-1.5 text-fg-faint">{String.fromCharCode(65 + i)}.</span>{opt}
              </button>
            )
          })}
        </div>
      )}

      {submitted ? (
        <div className={`text-xs p-2 rounded ${isCorrect ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-200' : 'bg-amber-500/10 text-amber-700 dark:text-amber-200'}`}>
          {isCorrect ? '✓ 回答正确！' : '✗ 还需再练。'} {qData.explanation}
        </div>
      ) : (
        <button
          onClick={() => { setSubmitted(true); if (selected === qData.answer) onReview(entry.qId) }}
          disabled={selected === null}
          className="px-3 py-1.5 bg-sky-600 text-white text-xs rounded-lg hover:bg-sky-700 disabled:opacity-40 transition-colors"
        >
          提交
        </button>
      )}
    </div>
  )
}

export default function WrongBook({ onNavigate }) {
  const allEx = useMemo(getAllExercises, [])
  const [wb, setWb] = useState(getWrongBook)

  const pending = wb.filter(e => !e.mastered)
  const mastered = wb.filter(e => e.mastered)

  const grouped = useMemo(() => {
    const g = {}
    pending.forEach(e => {
      const mod = MODULES.find(m => m.id === e.moduleId)
      const key = e.moduleId
      if (!g[key]) g[key] = { module: mod, entries: [] }
      g[key].entries.push(e)
    })
    return Object.values(g)
  }, [pending])

  const markMastered = (qId) => {
    const next = wb.map(e => e.qId === qId ? { ...e, mastered: true, reviewedAt: Date.now() } : e)
    setWb(next)
    saveWrongBook(next)
    window.dispatchEvent(new Event('progress-updated'))
  }

  return (
    <div className="ws-main-inner">
        {/* Header */}
        <section className="glass-panel rounded-3xl p-6 sm:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="min-w-0">
              <p className="ws-eyebrow">Review</p>
              <h1 className="ws-title text-xl sm:text-2xl font-extrabold mt-1 truncate">📕 错题本</h1>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm flex-wrap">
              <span className="px-3 py-1.5 rounded-full border border-rose-400/40 bg-rose-500/10 text-rose-600 dark:text-rose-200">
                待复习 {pending.length} 题
              </span>
              <span className="px-3 py-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-200">
                已掌握 {mastered.length} 题
              </span>
            </div>
          </div>
        </section>

        {/* 待复习题区 */}
        {pending.length === 0 ? (
          <section className="glass-panel rounded-3xl p-12 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-fg-strong font-medium text-lg">没有待复习的错题</p>
            <p className="text-sm text-fg-muted mt-2">答错的题会自动出现在这里，复习后标记为已掌握。</p>
          </section>
        ) : (
          <div className="space-y-5">
            {grouped.map(({ module, entries }) => (
              <section key={module?.id} className="glass-panel rounded-3xl p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{module?.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-semibold text-fg-strong truncate">{module?.title}</h2>
                    <p className="text-xs text-fg-muted mt-0.5">{entries.length} 题待复习</p>
                  </div>
                  {onNavigate && module && (
                    <button
                      onClick={() => onNavigate(module.id)}
                      className="px-3 py-1.5 text-xs rounded-lg border border-themed bg-surface text-fg-muted hover:text-fg hover:bg-elevated transition-colors shrink-0"
                    >
                      → 去该模块
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {entries.map(entry => (
                    <QuizItem
                      key={entry.qId}
                      entry={entry}
                      qData={allEx[entry.qId]}
                      onReview={markMastered}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* 已掌握折叠区 */}
        {mastered.length > 0 && (
          <section className="glass-panel rounded-3xl p-5 sm:p-6">
            <h2 className="text-xs uppercase tracking-[0.18em] text-fg-muted mb-3">✓ 已掌握（{mastered.length} 题）</h2>
            <div className="space-y-1.5">
              {mastered.map(e => {
                const q = allEx[e.qId]
                return q ? (
                  <div key={e.qId} className="text-xs text-fg-faint line-through px-2 leading-relaxed">{q.question}</div>
                ) : null
              })}
            </div>
          </section>
        )}
    </div>
  )
}
