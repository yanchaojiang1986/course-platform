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

export default function ModuleDetail({ module, onBack }) {
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
    <div className="flex flex-col h-screen bg-white">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-200 bg-white shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          <span>←</span>
          <span>课程地图</span>
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-gray-800">{module.emoji} 模块 {module.id} · {module.title}</span>
        <span className="ml-auto text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{module.tag}</span>
      </div>

      {/* Tab 切换 */}
      <div className="flex border-b border-gray-200 bg-white shrink-0">
        <button
          onClick={() => setActiveTab('phase1')}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'phase1'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <span>📖</span>
          <span>基础关卡</span>
          {phase1Passed && <span className="text-xs text-green-600">✓</span>}
        </button>

        {hasScenario && (
          <button
            onClick={() => !phase2Locked && setActiveTab('phase2')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'phase2'
                ? 'border-purple-600 text-purple-600'
                : phase2Locked
                  ? 'border-transparent text-gray-300 cursor-not-allowed'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{phase2Locked ? '🔒' : '🎯'}</span>
            <span>实战关卡</span>
            {phase2Locked && hasExercises && (
              <span className="text-xs text-gray-400">需先通过基础关卡</span>
            )}
            {phase2State.completed && <span className="text-xs text-green-600">✓</span>}
          </button>
        )}
      </div>

      {/* Phase 1 内容 */}
      {activeTab === 'phase1' && (
        <div className="flex-1 overflow-y-auto">
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
      )}

      {/* Phase 2 内容 */}
      {activeTab === 'phase2' && hasScenario && (
        <div className="flex flex-1 overflow-hidden">
          <ScenarioPanel
            scenario={scenario}
            phase2State={phase2State}
            onStart={handlePhase2Start}
            onComplete={handlePhase2Complete}
          />
          <div className="flex-1 overflow-hidden">
            {phase2State.started ? (
              <AIPanel
                mode={aiMode}
                moduleContext={module.title}
                scenarioContext={scenarioContext}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="text-5xl mb-4">{aiMode === 'interview' ? '🎤' : '🎯'}</div>
                <p className="text-gray-500 text-sm">点击左侧「开始实战」按钮开始对话</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
