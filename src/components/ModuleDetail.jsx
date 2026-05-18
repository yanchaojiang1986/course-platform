import { useState } from 'react'
import ContentViewer from './ContentViewer.jsx'
import Exercise from './Exercise.jsx'
import ScenarioPanel from './ScenarioPanel.jsx'
import AIPanel from './AIPanel.jsx'
import { EXERCISES } from '../data/exercises.js'
import { SCENARIOS } from '../data/scenarios.js'

function getPhase1State(moduleId) {
  try {
    const d = JSON.parse(localStorage.getItem(`phase1_${moduleId}`) || 'null')
    return d || { passed: false }
  } catch { return { passed: false } }
}

function getPhase2State(moduleId) {
  try {
    const d = JSON.parse(localStorage.getItem(`phase2_${moduleId}`) || 'null')
    return d || { started: false, completed: false }
  } catch { return { started: false, completed: false } }
}

function savePhase2(moduleId, state) {
  localStorage.setItem(`phase2_${moduleId}`, JSON.stringify(state))
  window.dispatchEvent(new Event('progress-updated'))
}

function TabButton({ active, locked, icon, label, hint, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`px-4 py-2.5 rounded-xl text-sm border transition-all ${active
        ? 'border-sky-400/55 bg-sky-500/12 text-sky-700 dark:text-sky-200'
        : locked
          ? 'border-themed bg-surface-soft text-fg-faint cursor-not-allowed'
          : 'border-themed bg-surface text-fg-muted hover:border-themed-strong hover:text-fg'}`}
    >
      <span className="inline-flex items-center gap-2 font-medium">
        <span>{icon}</span>
        {label}
      </span>
      {hint ? <span className="ml-2 text-[11px] opacity-80">{hint}</span> : null}
    </button>
  )
}

export default function ModuleDetail({ module }) {
  const exercises = EXERCISES[module.id] || []
  const scenario = SCENARIOS[module.id] || null

  const [phase1Passed, setPhase1Passed] = useState(() => getPhase1State(module.id).passed)
  const [phase2State, setPhase2State] = useState(() => getPhase2State(module.id))
  const [activeTab, setActiveTab] = useState('phase1')

  const hasExercises = exercises.length > 0
  const hasScenario = !!scenario
  const phase2Locked = hasExercises && !phase1Passed

  const handlePhase1Passed = () => {
    setPhase1Passed(true)
  }

  const handlePhase2Start = () => {
    const next = { ...phase2State, started: true }
    setPhase2State(next)
    savePhase2(module.id, next)
  }

  const handlePhase2Complete = () => {
    if (phase2State.completed) return
    const next = { ...phase2State, started: true, completed: true }
    setPhase2State(next)
    savePhase2(module.id, next)
  }

  const aiMode = scenario?.aiMode || 'socratic'
  const scenarioContext = scenario ? `${scenario.title}\n\n${scenario.context}\n\n任务：${scenario.tasks.join('；')}` : ''

  return (
    <div className="ws-main-inner module-page-flow">
        <header className="glass-panel rounded-2xl px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="min-w-0">
              <p className="ws-eyebrow">{module.tag}</p>
              <h1 className="ws-title text-xl sm:text-2xl font-extrabold truncate mt-1">{module.emoji} {module.title}</h1>
            </div>
            <span className="self-start lg:self-auto text-xs px-2.5 py-1 rounded-full border border-themed bg-surface-soft text-fg">
              {module.tag}
            </span>
          </div>
        </header>

        <div className="glass-panel rounded-2xl p-3 sm:p-4">
          <div className="flex flex-wrap gap-2">
            <TabButton
              active={activeTab === 'phase1'}
              locked={false}
              icon="📖"
              label="基础关卡"
              hint={phase1Passed ? '已通关' : ''}
              onClick={() => setActiveTab('phase1')}
            />

            {hasScenario && (
              <TabButton
                active={activeTab === 'phase2'}
                locked={phase2Locked}
                icon={phase2Locked ? '🔒' : '🎯'}
                label="实战关卡"
                hint={phase2State.completed ? '已完成' : phase2Locked ? '需先通过基础关卡' : ''}
                onClick={() => !phase2Locked && setActiveTab('phase2')}
              />
            )}
          </div>
        </div>

        {activeTab === 'phase1' && (
          <div className="content-surface module-reader-shell overflow-visible xl:overflow-hidden">
            <div className="xl:max-h-[calc(100vh-220px)] xl:overflow-y-auto">
              <ContentViewer module={module} />
              {hasExercises && (
                <div className="max-w-3xl mx-auto px-6 pb-10">
                  <Exercise
                    exercises={exercises}
                    moduleId={module.id}
                    onPassed={handlePhase1Passed}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'phase2' && hasScenario && (
          <div className="content-surface module-reader-shell overflow-visible xl:overflow-hidden">
            <div className="flex flex-col xl:flex-row xl:h-[calc(100vh-220px)] xl:overflow-hidden">
              <ScenarioPanel
                scenario={scenario}
                phase2State={phase2State}
                onStart={handlePhase2Start}
                onComplete={handlePhase2Complete}
              />
              <div className="flex-1 min-h-[420px] xl:min-h-0 xl:overflow-hidden">
                {phase2State.started ? (
                  <AIPanel
                    mode={aiMode}
                    moduleContext={module.title}
                    scenarioContext={scenarioContext}
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-surface-soft">
                    <div className="text-5xl mb-4">🎯</div>
                    <p className="text-fg-muted text-sm">先在左侧点击「开始实战」，然后与 AI 教练进入任务对话。</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
