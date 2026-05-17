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

export default function WrongBook({ onClose, onNavigate }) {
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
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50" onClick={onClose} />
      <div className="w-full max-w-lg bg-surface text-fg shadow-2xl flex flex-col border-l border-themed">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-themed bg-surface-soft">
          <div>
            <h2 className="font-semibold text-fg-strong">📕 错题本</h2>
            <p className="text-xs text-fg-muted mt-0.5">
              待复习 {pending.length} 题 · 已掌握 {mastered.length} 题
            </p>
          </div>
          <button onClick={onClose} className="text-fg-muted hover:text-fg text-xl">×</button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {pending.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🎉</div>
              <p className="text-fg-strong font-medium">没有待复习的错题</p>
              <p className="text-sm text-fg-faint mt-1">答错的题会自动出现在这里</p>
            </div>
          ) : (
            grouped.map(({ module, entries }) => (
              <div key={module?.id}>
                <div className="flex items-center gap-2 mb-3">
                  <span>{module?.emoji}</span>
                  <span className="text-sm font-semibold text-fg-strong">{module?.title}</span>
                  <span className="text-xs text-fg-muted">({entries.length} 题)</span>
                  {onNavigate && module && (
                    <button
                      onClick={() => { onNavigate(module.id); onClose() }}
                      className="ml-auto text-xs text-sky-600 dark:text-sky-300 hover:underline shrink-0"
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
              </div>
            ))
          )}

          {mastered.length > 0 && (
            <div className="border-t border-themed pt-4">
              <p className="text-xs text-fg-muted mb-2">✓ 已掌握（{mastered.length} 题）</p>
              <div className="space-y-1">
                {mastered.map(e => {
                  const q = allEx[e.qId]
                  return q ? (
                    <div key={e.qId} className="text-xs text-fg-faint line-through px-2">{q.question}</div>
                  ) : null
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
