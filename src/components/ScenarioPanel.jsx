import DemoFrame from './DemoFrame.jsx'

export default function ScenarioPanel({ scenario, phase2State, onStart, onComplete }) {
  const { started, completed } = phase2State

  return (
    <div className="w-[350px] shrink-0 border-r border-slate-200 bg-gradient-to-b from-slate-50 to-white flex flex-col overflow-y-auto">
      <div className="p-5 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🎯</span>
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-[0.14em]">实战任务</span>
        </div>
        <h3 className="font-semibold text-slate-800 text-sm leading-snug">{scenario.title}</h3>
      </div>

      <div className="flex-1 p-5 space-y-5">
        {scenario.demo && <DemoFrame demoId={scenario.demo} />}

        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.12em] mb-2">场景背景</div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap shadow-sm">
            {scenario.context}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.12em] mb-2">任务清单</div>
          <div className="space-y-2">
            {scenario.tasks.map((task, i) => (
              <div key={i} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-700">{task}</span>
              </div>
            ))}
          </div>
        </div>

        {scenario.hasMockApi && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
            <div className="font-semibold mb-1">可用 Mock API</div>
            <div className="font-mono text-amber-800">POST /api/mock/login</div>
            <div className="mt-1">测试账号：testuser / Test1234</div>
          </div>
        )}

        <div className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-xs text-sky-900">
          <div className="font-semibold mb-1">{scenario.aiMode === 'interview' ? '面试官模式' : '苏格拉底模式'}</div>
          {scenario.aiMode === 'interview'
            ? 'AI 将扮演面试官进行模拟面试，完成后给出评分和反馈。'
            : 'AI 不会直接给答案，会通过提问引导你完成推导。'}
        </div>

        {completed && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 font-medium text-center">
            ✓ 本关卡已完成
          </div>
        )}
      </div>

      <div className="p-5 border-t border-slate-200 space-y-2 bg-white/85 backdrop-blur">
        {!started && (
          <button
            onClick={onStart}
            className="w-full py-2.5 rounded-lg text-sm font-medium bg-sky-600 text-white hover:bg-sky-700 transition-colors"
          >
            开始实战 →
          </button>
        )}
        {started && !completed && (
          <button
            onClick={onComplete}
            className="w-full py-2.5 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            标记本关完成 ✓
          </button>
        )}
      </div>
    </div>
  )
}
