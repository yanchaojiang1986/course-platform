export default function Sidebar({ modules, activeId, progress, mode, onSelect, onModeChange }) {
  const done = Object.values(progress).filter(Boolean).length
  const pct = Math.round((done / modules.length) * 100)

  return (
    <aside className="w-72 bg-gray-900 text-gray-100 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-700">
        <div className="text-lg font-bold tracking-tight">功能测试训练营</div>
        <div className="mt-2 text-xs text-gray-400">
          进度 {done}/{modules.length}
          <div className="mt-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* 模式切换 */}
      <div className="px-4 py-3 border-b border-gray-700">
        <div className="flex rounded-lg overflow-hidden text-xs font-medium">
          <button
            onClick={() => onModeChange('study')}
            className={`flex-1 py-2 transition-colors ${mode === 'study' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-gray-200'}`}
          >
            📖 学习模式
          </button>
          <button
            onClick={() => onModeChange('interview')}
            className={`flex-1 py-2 transition-colors ${mode === 'interview' ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-gray-200'}`}
          >
            🎤 面试模式
          </button>
        </div>
      </div>

      {/* 模块列表 */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll py-2">
        {modules.map(m => {
          const isDone = progress[m.id]
          const isActive = m.id === activeId
          return (
            <button
              key={m.id}
              onClick={() => onSelect(m.id)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors text-sm
                ${isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}
            >
              <span className="text-base shrink-0">{m.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className={`truncate ${isActive ? 'font-medium' : ''}`}>模块 {m.id} · {m.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{m.tag}</div>
              </div>
              {isDone && <span className="text-green-400 text-xs shrink-0">✓</span>}
            </button>
          )
        })}
      </nav>

      <div className="px-5 py-3 border-t border-gray-700 text-xs text-gray-500">
        v1.0 · 整合版
      </div>
    </aside>
  )
}
