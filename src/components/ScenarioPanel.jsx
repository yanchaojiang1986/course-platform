import DemoFrame from './DemoFrame.jsx'

export default function ScenarioPanel({ scenario, phase2State, onStart, onComplete }) {
  const { started, completed } = phase2State

  return (
    <div className="w-80 shrink-0 border-r border-gray-200 bg-gray-50 flex flex-col overflow-y-auto">
      <div className="p-5 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🎯</span>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">实战任务</span>
        </div>
        <h3 className="font-semibold text-gray-800 text-sm leading-snug">{scenario.title}</h3>
      </div>

      <div className="flex-1 p-5 space-y-5">
        {/* Demo 应用 */}
        {scenario.demo && (
          <DemoFrame demoId={scenario.demo} />
        )}

        {/* 情境 */}
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">📋 情境背景</div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {scenario.context}
          </div>
        </div>

        {/* 任务列表 */}
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">✅ 你的任务</div>
          <div className="space-y-2">
            {scenario.tasks.map((task, i) => (
              <div key={i} className="flex items-start gap-2 bg-white border border-gray-200 rounded-lg p-3">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700">{task}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mock API 提示 */}
        {scenario.hasMockApi && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
            <div className="font-semibold mb-1">🔌 可用的 Mock API</div>
            <div className="font-mono text-amber-700">POST /api/mock/login</div>
            <div className="mt-1">测试账号：testuser / Test1234</div>
          </div>
        )}

        {/* AI 模式说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
          <div className="font-semibold mb-1">
            {scenario.aiMode === 'interview' ? '🎤 面试官模式' : '🤖 苏格拉底模式'}
          </div>
          {scenario.aiMode === 'interview'
            ? 'AI 将扮演面试官进行模拟面试，完成后给出评分和反馈。'
            : 'AI 不会直接给答案，会用问题引导你思考，帮你自己推导出结论。'
          }
        </div>

        {completed && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700 font-medium text-center">
            ✓ 本关卡已完成
          </div>
        )}
      </div>

      <div className="p-5 border-t border-gray-200 space-y-2">
        {!started && (
          <button
            onClick={onStart}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            开始实战 →
          </button>
        )}
        {started && !completed && (
          <button
            onClick={onComplete}
            className="w-full py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            标记本关完成 ✓
          </button>
        )}
      </div>
    </div>
  )
}
