export default function ErrorCard({ blockId, type, reason }) {
  return (
    <div className="my-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-red-700">
        <span>⚠️</span>
        <span>交互组件渲染失败</span>
      </div>
      <div className="mt-2 space-y-1 text-xs text-red-700 font-mono">
        <div>blockId: <span className="font-semibold">{blockId || '(空)'}</span></div>
        {type && <div>type: <span className="font-semibold">{type}</span></div>}
        <div>原因: {reason}</div>
      </div>
      <div className="mt-2 text-xs text-red-600">
        请检查 <code>src/data/interactive.js</code> 与对应 Markdown 标记是否对齐。
      </div>
    </div>
  )
}
