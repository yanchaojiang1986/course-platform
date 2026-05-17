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
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-gray-800">{qData.question}</p>
        {entry.mastered && <span className="text-xs text-green-600 font-medium shrink-0">✓ 已掌握</span>}
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
                  ${correct ? 'bg-green-100 border-green-400 text-green-800 font-medium' : ''}
                  ${wrong ? 'bg-red-100 border-red-400 text-red-700' : ''}
                  ${!submitted && sel ? 'bg-blue-100 border-blue-400 text-blue-800' : ''}
                  ${!submitted && !sel ? 'border-gray-200 hover:border-blue-300 text-gray-700' : ''}
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
                  ${correct ? 'bg-green-100 border-green-400 text-green-800 font-medium' : ''}
                  ${wrong ? 'bg-red-100 border-red-400 text-red-700' : ''}
                  ${!submitted && sel ? 'bg-blue-100 border-blue-400 text-blue-800' : ''}
                  ${!submitted && !sel ? 'border-gray-200 hover:border-blue-300 text-gray-700' : ''}
                `}>
                <span className="font-mono mr-1.5 text-gray-400">{String.fromCharCode(65 + i)}.</span>{opt}
              </button>
            )
          })}
        </div>
      )}

      {submitted ? (
        <div className={`text-xs p-2 rounded ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}`}>
          {isCorrect ? '✓ 回答正确！' : '✗ 还需再练。'} {qData.explanation}
        </div>
      ) : (
        <button
          onClick={() => { setSubmitted(true); if (selected === qData.answer) onReview(entry.qId) }}
          disabled={selected === null}
          className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 disabled:opacity-40 transition-colors"
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
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="w-full max-w-lg bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="font-semibold text-gray-800">📕 错题本</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              待复习 {pending.length} 题 · 已掌握 {mastered.length} 题
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {pending.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🎉</div>
              <p className="text-gray-600 font-medium">没有待复习的错题</p>
              <p className="text-sm text-gray-400 mt-1">答错的题会自动出现在这里</p>
            </div>
          ) : (
            grouped.map(({ module, entries }) => (
              <div key={module?.id}>
                <div className="flex items-center gap-2 mb-3">
                  <span>{module?.emoji}</span>
                  <span className="text-sm font-semibold text-gray-700">{module?.title}</span>
                  <span className="text-xs text-gray-400">({entries.length} 题)</span>
                  {onNavigate && module && (
                    <button
                      onClick={() => { onNavigate(module.id); onClose() }}
                      className="ml-auto text-xs text-blue-500 hover:text-blue-700 hover:underline shrink-0"
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
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-400 mb-2">✓ 已掌握（{mastered.length} 题）</p>
              <div className="space-y-1">
                {mastered.map(e => {
                  const q = allEx[e.qId]
                  return q ? (
                    <div key={e.qId} className="text-xs text-gray-400 line-through px-2">{q.question}</div>
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
