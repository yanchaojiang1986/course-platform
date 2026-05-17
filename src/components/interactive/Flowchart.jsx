export default function Flowchart({ data }) {
  const { title, nodes = [], edges = [], warnings = [], direction = 'horizontal' } = data
  const isVertical = direction === 'vertical'

  const warningMap = {}
  warnings.forEach(w => { warningMap[w.node] = w.text })

  const loopEdge = edges.find(e => e.type === 'loop')

  return (
    <div className="my-6 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
      <div className="text-sm font-semibold text-blue-800 mb-4 flex items-center gap-2">
        <span>🗺️</span> {title}
      </div>

      <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center gap-0 overflow-x-auto`}>
        {nodes.map((node, i) => {
          const edge = edges.find(e => e.from === nodes[i - 1]?.id && e.to === node.id && e.type !== 'loop')
          const isLast = i === nodes.length - 1

          return (
            <div key={node.id} className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center`}>
              {/* Arrow + edge label between nodes */}
              {i > 0 && edge && (
                <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center`}>
                  {isVertical ? (
                    <div className="flex flex-col items-center my-1">
                      <div className="text-xs text-gray-500 text-center max-w-[180px] leading-tight px-2 py-1 bg-white rounded border border-gray-200 mb-1">
                        {edge.label}
                      </div>
                      <span className="text-gray-400 text-lg">↓</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center mx-1">
                      <div className="text-xs text-gray-500 text-center whitespace-pre-line mb-0.5 max-w-[90px] leading-tight">
                        {edge.label}
                      </div>
                      <span className="text-gray-400 text-lg">→</span>
                    </div>
                  )}
                </div>
              )}

              {/* Node card */}
              <div className="relative">
                <div
                  className="rounded-xl p-4 text-center shadow-sm border-2 border-white"
                  style={{ backgroundColor: node.color + '18', borderColor: node.color + '40', minWidth: isVertical ? 280 : 120, maxWidth: isVertical ? 'none' : 150 }}
                >
                  <div className="text-2xl mb-1">{node.icon}</div>
                  <div className="text-sm font-semibold whitespace-pre-line leading-snug" style={{ color: node.color }}>
                    {node.label}
                  </div>
                  {node.sublabel && (
                    <div className="text-xs text-gray-500 mt-1 leading-tight">{node.sublabel}</div>
                  )}
                  {node.desc && (
                    <div className="text-xs text-gray-600 mt-1 leading-tight">{node.desc}</div>
                  )}
                  {node.role && (
                    <div className="text-xs mt-1.5 px-2 py-0.5 rounded-full inline-block" style={{ backgroundColor: node.color + '20', color: node.color }}>
                      {node.role}
                    </div>
                  )}
                </div>
                {warningMap[node.id] && (
                  <div className="mt-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-2 py-1.5 text-center">
                    {warningMap[node.id]}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Loop edge note */}
      {loopEdge && (
        <div className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2">
          <span>🔄</span> {loopEdge.label}
        </div>
      )}
    </div>
  )
}
