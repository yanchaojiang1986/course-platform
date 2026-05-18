import { useState, useEffect } from 'react'
import { marked } from 'marked'
import InteractiveBlock from './interactive/InteractiveBlock.jsx'
import { INLINE_CHECKS } from '../data/inlineChecks/index.js'
import { EXERCISES } from '../data/exercises.js'
import { logClient } from '../utils/clientLogger.js'

marked.setOptions({ breaks: true, gfm: true })

const CHECK_PROGRESS_PREFIX = 'check_progress_'

function getCheckStorageKey(moduleId) {
  return `${CHECK_PROGRESS_PREFIX}${moduleId}`
}

function loadCheckProgress(moduleId) {
  try {
    const parsed = JSON.parse(localStorage.getItem(getCheckStorageKey(moduleId)) || '{}')
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function saveCheckProgress(moduleId, state) {
  localStorage.setItem(getCheckStorageKey(moduleId), JSON.stringify(state))
}

// 把 markdown 按 <!-- DEMO:id --> / <!-- CHECK:qId --> 标记切成段落
function parseSegments(md) {
  const regex = /<!--\s*(DEMO|CHECK):([\w-]+)\s*-->/g
  const segments = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(md)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'markdown', content: md.slice(lastIndex, match.index) })
    }
    const markerType = match[1].trim().toUpperCase()
    const markerId = match[2].trim()
    if (markerType === 'DEMO') {
      segments.push({ type: 'demo', blockId: markerId })
    } else if (markerType === 'CHECK') {
      segments.push({ type: 'check', checkId: markerId })
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < md.length) {
    segments.push({ type: 'markdown', content: md.slice(lastIndex) })
  }

  return segments
}

function hasSectionPrefix(text) {
  return /^\d{1,2}(?:\.\d{1,2})?\s+/.test(text)
}

function addSectionNumbering(html, counters) {
  if (typeof DOMParser === 'undefined') return html

  const parser = new DOMParser()
  const doc = parser.parseFromString(`<div id="__root">${html}</div>`, 'text/html')
  const root = doc.getElementById('__root')
  if (!root) return html

  root.querySelectorAll('h2, h3').forEach((el) => {
    const text = (el.textContent || '').trim()
    if (!text || hasSectionPrefix(text)) return

    if (el.tagName.toLowerCase() === 'h2') {
      counters.h2 += 1
      counters.h3 = 0
      const prefix = String(counters.h2).padStart(2, '0')
      el.innerHTML = `${prefix} ${el.innerHTML}`
      return
    }

    if (counters.h2 === 0) counters.h2 = 1
    counters.h3 += 1
    const prefix = `${String(counters.h2).padStart(2, '0')}.${String(counters.h3).padStart(2, '0')}`
    el.innerHTML = `${prefix} ${el.innerHTML}`
  })

  return root.innerHTML
}

function InlineCheckCard({ checkId, question, state, onPass, onContinue }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const status = state?.status || null
  const finished = status === 'passed' || status === 'continued'

  const resetTry = () => {
    setSelected(null)
    setSubmitted(false)
    setIsCorrect(false)
  }

  useEffect(() => {
    resetTry()
  }, [checkId])

  if (!question) {
    return (
      <div className="my-6 card-accent card-accent-amber">
        <p className="text-sm text-amber-700 dark:text-amber-200">练习题 `{checkId}` 未找到。可先继续学习。</p>
        {!finished && (
          <button
            onClick={() => onContinue(checkId)}
            className="mt-3 px-3 py-1.5 text-xs rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            继续下一节
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="my-6 card-accent card-accent-sky p-5 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-sky-700 dark:text-sky-200">章节检查题</h4>
        {status === 'passed' && <span className="text-xs text-emerald-600 dark:text-emerald-300 font-medium">✓ 已通过</span>}
        {status === 'continued' && <span className="text-xs text-amber-600 dark:text-amber-300 font-medium">已继续（未掌握）</span>}
      </div>

      <p className="text-sm text-fg-strong">{question.question}</p>

      {question.type === 'choice' && (
        <div className="space-y-2">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !finished && !submitted && setSelected(i)}
              disabled={finished || submitted}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors ${selected === i ? 'bg-sky-500/15 border-sky-400/60 text-sky-700 dark:text-sky-200' : 'bg-surface border-themed text-fg'
                } ${finished || submitted ? 'opacity-80' : 'hover:border-sky-400/50'}`}
            >
              <span className="font-mono mr-2 text-fg-faint">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>
      )}

      {question.type === 'truefalse' && (
        <div className="flex gap-2">
          {[true, false].map(v => (
            <button
              key={String(v)}
              onClick={() => !finished && !submitted && setSelected(v)}
              disabled={finished || submitted}
              className={`px-4 py-2 rounded-lg text-sm border transition-colors ${selected === v ? 'bg-sky-500/15 border-sky-400/60 text-sky-700 dark:text-sky-200' : 'bg-surface border-themed text-fg'
                } ${finished || submitted ? 'opacity-80' : 'hover:border-sky-400/50'}`}
            >
              {v ? '✓ 正确' : '✗ 错误'}
            </button>
          ))}
        </div>
      )}

      {!finished && !submitted && (
        <button
          onClick={() => {
            const ok = selected === question.answer
            if (ok) {
              onPass(checkId)
              setIsCorrect(true)
              setSubmitted(true)
              return
            }
            setIsCorrect(false)
            setSubmitted(true)
          }}
          disabled={selected === null}
          className="px-4 py-2 text-sm rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-40 transition-colors"
        >
          提交并解锁
        </button>
      )}

      {!finished && submitted && (
        <div className={`rounded-lg p-3 text-xs ${isCorrect ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-200' : 'bg-amber-500/10 text-amber-700 dark:text-amber-200'}`}>
          {isCorrect ? '回答正确，已解锁下一节。' : `还不对。解析：${question.explanation}`}
          {!isCorrect && (
            <div className="mt-2 flex gap-2">
              <button
                onClick={resetTry}
                className="px-3 py-1.5 rounded bg-surface border border-amber-400/40 text-amber-700 dark:text-amber-200 hover:bg-amber-500/10 transition-colors"
              >
                再试一次
              </button>
              <button
                onClick={() => onContinue(checkId)}
                className="px-3 py-1.5 rounded bg-amber-600 text-white hover:bg-amber-700 transition-colors"
              >
                看解析后继续
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function ContentViewer({ module }) {
  const [segments, setSegments] = useState([])
  const [checkProgress, setCheckProgress] = useState({})
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    if (!module) return
    setLoading(true)
    setLoadError('')
    setCheckProgress(loadCheckProgress(module.id))

    let aborted = false
    const controller = new AbortController()

    const load = async () => {
      try {
        const res = await fetch(`/api/content/${module.id}`, {
          credentials: 'include',
          signal: controller.signal,
        })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error || '内容加载失败')
        if (aborted) return
        setSegments(parseSegments(data.content || ''))
      } catch (err) {
        if (aborted) return
        const message = err?.message || '内容加载失败'
        setLoadError(message)
        logClient('error', 'module_content_load_failed', {
          moduleId: module?.id || '',
          moduleTitle: module?.title || '',
          message,
        })
        setSegments([{ type: 'markdown', content: '<p>内容加载失败，请刷新重试。</p>' }])
      } finally {
        if (!aborted) setLoading(false)
      }
    }

    load()
    return () => {
      aborted = true
      controller.abort()
    }
  }, [module])

  const checkSegments = segments.filter(s => s.type === 'check')
  const unlockedChecks = checkSegments.filter(s => checkProgress[s.checkId]).length

  let visibleCount = segments.length
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]
    if (seg.type === 'check' && !checkProgress[seg.checkId]) {
      visibleCount = i + 1
      break
    }
  }
  const visibleSegments = segments.slice(0, visibleCount)

  const updateCheckProgress = (checkId, status) => {
    if (!module?.id) return
    setCheckProgress(prev => {
      const attempts = (prev[checkId]?.attempts || 0) + 1
      const next = { ...prev, [checkId]: { status, attempts, updatedAt: Date.now() } }
      saveCheckProgress(module.id, next)
      return next
    })
  }

  const getInlineQuestion = (checkId) => {
    const fromInline = INLINE_CHECKS[checkId]
    if (fromInline) return fromInline
    const fromExercise = (EXERCISES[module.id] || []).find(q => q.id === checkId)
    if (!fromExercise) {
      logClient('warn', 'inline_check_not_found', { moduleId: module?.id || '', checkId })
    }
    return fromExercise || null
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {loading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-6 bg-surface-soft rounded w-2/3" />
          <div className="h-4 bg-surface-soft rounded w-full" />
          <div className="h-4 bg-surface-soft rounded w-5/6" />
          <div className="h-4 bg-surface-soft rounded w-4/5" />
        </div>
      ) : (
        <>
          {loadError && (
            <div className="mb-4 text-xs rounded-lg border border-rose-400/40 bg-rose-500/10 text-rose-600 dark:text-rose-200 px-3 py-2">
              {loadError}
            </div>
          )}
          {checkSegments.length > 0 && (
            <div className="mb-5 text-xs text-fg-muted">
              章节解锁进度：{unlockedChecks}/{checkSegments.length}
            </div>
          )}
          {(() => {
            const headingCounters = { h2: 0, h3: 0 }
            return visibleSegments.map((seg, i) => {
              if (seg.type === 'demo') {
                return <InteractiveBlock key={`${module.id}-demo-${seg.blockId}-${i}`} blockId={seg.blockId} />
              }
              if (seg.type === 'check') {
                return (
                  <InlineCheckCard
                    key={`${module.id}-check-${seg.checkId}-${i}`}
                    checkId={seg.checkId}
                    question={getInlineQuestion(seg.checkId)}
                    state={checkProgress[seg.checkId]}
                    onPass={(id) => updateCheckProgress(id, 'passed')}
                    onContinue={(id) => updateCheckProgress(id, 'continued')}
                  />
                )
              }

              const html = addSectionNumbering(marked.parse(seg.content), headingCounters)
              return <article key={`${module.id}-md-${i}`} className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
            })
          })()}
        </>
      )}
    </div>
  )
}
