import { useState } from 'react'

const MASTERY_THRESHOLD = 0.8

function addToWrongBook(qId, moduleId, wrongAnswer) {
  try {
    const wb = JSON.parse(localStorage.getItem('wrongbook') || '[]')
    if (!wb.find(e => e.qId === qId)) {
      wb.push({ qId, moduleId, wrongAnswer, wrongAt: Date.now(), reviewedAt: null, mastered: false })
      localStorage.setItem('wrongbook', JSON.stringify(wb))
    }
  } catch { /* ignore */ }
}

function savePhase1(moduleId, score, passed, attempts, answers) {
  localStorage.setItem(`phase1_${moduleId}`, JSON.stringify({ score, passed, attempts, answers }))
  window.dispatchEvent(new Event('progress-updated'))
}

export default function Exercise({ exercises, moduleId, onPassed }) {
  const storageKey = `phase1_${moduleId}`
  const [answers, setAnswers] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || 'null')?.answers || {} }
    catch { return {} }
  })
  const [submitted, setSubmitted] = useState(() => {
    try {
      const d = JSON.parse(localStorage.getItem(storageKey) || 'null')
      return !!(d && typeof d.score === 'number' && Object.keys(d.answers || {}).length > 0)
    }
    catch { return false }
  })
  const [showResult, setShowResult] = useState(submitted)
  const [attempts, setAttempts] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || 'null')?.attempts || 0 }
    catch { return 0 }
  })

  const select = (id, val) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [id]: val }))
  }

  const submit = () => {
    const correct = exercises.filter(q => answers[q.id] === q.answer).length
    const score = correct / exercises.length
    const passed = score >= MASTERY_THRESHOLD
    const newAttempts = attempts + 1

    exercises.forEach(q => {
      if (answers[q.id] !== q.answer) {
        addToWrongBook(q.id, moduleId, answers[q.id])
      }
    })

    savePhase1(moduleId, score, passed, newAttempts, answers)
    setAttempts(newAttempts)
    setShowResult(true)
    setSubmitted(true)
    if (passed) onPassed?.()
  }

  const reset = () => {
    setAnswers({})
    setShowResult(false)
    setSubmitted(false)
    // 清掉旧成绩，但保留 passed 状态不重置（已通关不再强制）
    const prev = JSON.parse(localStorage.getItem(storageKey) || 'null') || {}
    savePhase1(moduleId, 0, prev.passed || false, attempts, {})
  }

  const correct = exercises.filter(q => answers[q.id] === q.answer).length
  const score = submitted ? correct / exercises.length : 0
  const passed = score >= MASTERY_THRESHOLD
  const alreadyPassed = (() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || 'null')?.passed === true }
    catch { return false }
  })()

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-purple-900">🧠 知识关卡</h3>
        <div className="flex items-center gap-2">
          {alreadyPassed && !showResult && (
            <span className="text-xs text-green-600 font-medium">✓ 已通关</span>
          )}
          {showResult && (
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
              {correct}/{exercises.length} · {Math.round(score * 100)}%
            </span>
          )}
          <span className="text-xs text-gray-400">通关需 ≥80%</span>
        </div>
      </div>

      {exercises.map((q, idx) => {
        const userAns = answers[q.id]
        const isCorrect = userAns === q.answer
        return (
          <div key={q.id} className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-800 mb-3">
              {idx + 1}. {q.question}
            </p>

            {q.type === 'truefalse' && (
              <div className="flex gap-3">
                {[true, false].map(val => {
                  const label = val ? '✓ 正确' : '✗ 错误'
                  const selected = userAns === val
                  const correct = showResult && val === q.answer
                  const wrong = showResult && selected && !isCorrect
                  return (
                    <button key={String(val)} onClick={() => select(q.id, val)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-colors
                        ${correct ? 'bg-green-100 border-green-400 text-green-800 font-medium' : ''}
                        ${wrong ? 'bg-red-100 border-red-400 text-red-800' : ''}
                        ${!showResult && selected ? 'bg-blue-100 border-blue-400 text-blue-800' : ''}
                        ${!showResult && !selected ? 'border-gray-200 hover:border-blue-300 text-gray-700' : ''}
                      `}>
                      {label}
                    </button>
                  )
                })}
              </div>
            )}

            {q.type === 'choice' && (
              <div className="space-y-2">
                {q.options.map((opt, i) => {
                  const selected = userAns === i
                  const correct = showResult && i === q.answer
                  const wrong = showResult && selected && !isCorrect
                  return (
                    <button key={i} onClick={() => select(q.id, i)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors
                        ${correct ? 'bg-green-100 border-green-400 text-green-800 font-medium' : ''}
                        ${wrong ? 'bg-red-100 border-red-400 text-red-800' : ''}
                        ${!showResult && selected ? 'bg-blue-100 border-blue-400 text-blue-800' : ''}
                        ${!showResult && !selected ? 'border-gray-200 hover:border-blue-300 text-gray-700' : ''}
                      `}>
                      <span className="font-mono mr-2 text-gray-400">{String.fromCharCode(65 + i)}.</span>{opt}
                    </button>
                  )
                })}
              </div>
            )}

            {showResult && (
              <div className={`mt-3 p-3 rounded-lg text-xs leading-relaxed
                ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}`}>
                {isCorrect ? '✓ 回答正确！' : '✗ 回答错误，已加入错题本。'}&nbsp;{q.explanation}
              </div>
            )}
          </div>
        )
      })}

      {/* 通关结果横幅 */}
      {showResult && (
        <div className={`rounded-lg p-4 text-center ${passed ? 'bg-green-100 border border-green-300' : 'bg-red-50 border border-red-200'}`}>
          {passed ? (
            <>
              <div className="text-2xl mb-1">🎉</div>
              <p className="font-semibold text-green-800">关卡通过！实战关卡已解锁</p>
              <p className="text-xs text-green-600 mt-1">答错的题已加入错题本，随时可复习</p>
            </>
          ) : (
            <>
              <div className="text-2xl mb-1">💪</div>
              <p className="font-semibold text-red-700">还差一点！需要答对 ≥80% 才能解锁实战</p>
              <p className="text-xs text-red-500 mt-1">答错的题已加入错题本，建议先复习再重试</p>
            </>
          )}
        </div>
      )}

      <div className="flex gap-3 pt-1">
        {!showResult ? (
          <button
            onClick={submit}
            disabled={Object.keys(answers).length < exercises.length}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            提交答案
          </button>
        ) : (
          <button onClick={reset}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
            重新作答
          </button>
        )}
        {!showResult && (
          <span className="text-xs text-gray-400 self-center">
            已答 {Object.keys(answers).length}/{exercises.length} 题
          </span>
        )}
      </div>
    </div>
  )
}
