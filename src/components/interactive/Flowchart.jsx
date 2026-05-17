export default function Flowchart({ data }) {
  const { title, nodes = [], edges = [], warnings = [], direction = 'horizontal' } = data
  const isVertical = direction === 'vertical'

  const warningMap = {}
  warnings.forEach(w => { warningMap[w.node] = w.text })

  const loopEdge = edges.find(e => e.type === 'loop')

  return (
    <div className="interactive-card">
      <div className="interactive-card-header">
        <span aria-hidden>🗺️</span>
        <h3 className="interactive-card-title">{title}</h3>
      </div>
      <div className="interactive-card-body bg-gradient-to-br from-blue-50/70 to-indigo-50/70 dark:from-slate-900/40 dark:to-slate-800/30">
        <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center gap-0 overflow-x-auto`}>
          {nodes.map((node, i) => {
            const edge = edges.find(e => e.from === nodes[i - 1]?.id && e.to === node.id && e.type !== 'loop')

            return (
              <div key={node.id} className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center`}>
                {i > 0 && edge && (
                  <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center`}>
                    {isVertical ? (
                      <div className="my-1 flex flex-col items-center">
                        <div className="interactive-panel px-2 py-1 text-center text-xs leading-tight text-gray-500 dark:text-gray-400 max-w-[180px] mb-1">
                          {edge.label}
                        </div>
                        <span className="text-lg text-gray-400 dark:text-slate-500">↓</span>
                      </div>
                    ) : (
                      <div className="mx-1 flex flex-col items-center">
                        <div className="max-w-[90px] whitespace-pre-line text-center text-xs leading-tight text-gray-500 dark:text-gray-400 mb-0.5">
                          {edge.label}
                        </div>
                        <span className="text-lg text-gray-400 dark:text-slate-500">→</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="relative">
                  <div
                    className="rounded-xl border-2 p-4 text-center shadow-sm backdrop-blur-sm"
                    style={{
                      backgroundColor: `${node.color}18`,
                      borderColor: `${node.color}40`,
                      minWidth: isVertical ? 280 : 120,
                      maxWidth: isVertical ? 'none' : 150,
                    }}
                  >
                    <div className="mb-1 text-2xl">{node.icon}</div>
                    <div className="whitespace-pre-line text-sm font-semibold leading-snug" style={{ color: node.color }}>
                      {node.label}
                    </div>
                    {node.sublabel && (
                      <div className="mt-1 text-xs leading-tight text-gray-500 dark:text-gray-400">{node.sublabel}</div>
                    )}
                    {node.desc && (
                      <div className="mt-1 text-xs leading-tight text-gray-600 dark:text-gray-300">{node.desc}</div>
                    )}
                    {node.role && (
                      <div className="mt-1.5 inline-block rounded-full px-2 py-0.5 text-xs" style={{ backgroundColor: `${node.color}20`, color: node.color }}>
                        {node.role}
                      </div>
                    )}
                  </div>
                  {warningMap[node.id] && (
                    <div className="mt-2 rounded-lg border border-red-200 bg-red-50 px-2 py-1.5 text-center text-xs text-red-600 dark:border-red-800/60 dark:bg-red-900/20 dark:text-red-300">
                      {warningMap[node.id]}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {loopEdge && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:border-amber-800/60 dark:bg-amber-900/20 dark:text-amber-300">
            <span aria-hidden>🔄</span>
            <span>{loopEdge.label}</span>
          </div>
        )}
      </div>
    </div>
  )
}
