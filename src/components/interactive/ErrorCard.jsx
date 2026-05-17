export default function ErrorCard({ blockId, type, reason }) {
  return (
    <div className="my-4 card-accent card-accent-rose">
      <div className="flex items-center gap-2 text-sm font-semibold text-rose-600 dark:text-rose-200">
        <span>⚠️</span>
        <span>交互组件渲染失败</span>
      </div>
      <div className="mt-2 space-y-1 text-xs text-rose-600 dark:text-rose-200 font-mono">
        <div>blockId: <span className="font-semibold">{blockId || '(空)'}</span></div>
        {type && <div>type: <span className="font-semibold">{type}</span></div>}
        <div>原因: {reason}</div>
      </div>
      <div className="mt-2 text-xs text-rose-500 dark:text-rose-300">
        请检查 <code>src/data/interactive.js</code> 与对应 Markdown 标记是否对齐。
      </div>
    </div>
  )
}
