export default function BarChart({ data }) {
  const { title, subtitle, unit = 'K/月', labels = [], series = [], footnote } = data || {}

  const maxVal = Math.max(
    1,
    ...series.flatMap(s => (s.values || []).map(v => Number(v) || 0))
  )

  return (
    <div className="my-6 rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-1 flex items-center gap-2">
        <span>📊</span>
        <span className="font-semibold text-gray-800">{title}</span>
      </div>
      {subtitle && <p className="mb-4 text-sm text-gray-500">{subtitle}</p>}

      <div className="mb-3 flex flex-wrap gap-3">
        {series.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: s.color || '#3b82f6' }}
            />
            <span>{s.name}</span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="grid grid-cols-4 gap-3 h-60 items-end border-b border-gray-200 pb-3">
            {labels.map((label, idx) => (
              <div key={idx} className="flex items-end justify-center gap-1.5">
                {series.map((s, sIdx) => {
                  const raw = Number((s.values || [])[idx] || 0)
                  const h = `${Math.max(8, Math.round((raw / maxVal) * 100))}%`
                  return (
                    <div key={sIdx} className="flex flex-col items-center w-8">
                      <span className="mb-1 text-[11px] text-gray-500">{raw}</span>
                      <div
                        className="w-full rounded-t-md transition-all"
                        style={{ height: h, backgroundColor: s.color || '#3b82f6' }}
                        title={`${s.name}: ${raw}${unit}`}
                      />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-3 mt-2">
            {labels.map((label, idx) => (
              <div key={idx} className="text-center text-xs text-gray-600">{label}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-500">单位：{unit}</div>
      {footnote && <div className="mt-1 text-xs text-gray-400">{footnote}</div>}
    </div>
  )
}
