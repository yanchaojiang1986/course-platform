import { useState } from 'react'

export default function SalaryChart({ data }) {
  const { title, note, levels = [], cities = [], stats = [] } = data || {}
  const [tab, setTab] = useState('levels')

  const levelMax = Math.max(1, ...levels.map(l => Number(l.max) || 0))
  const cityMax = Math.max(1, ...cities.map(c => Number(c.max) || 0))

  const barWidth = (val, max) => `${Math.round(((Number(val) || 0) / max) * 100)}%`

  const levelColor = (i) => {
    const colors = ['#94A3B8', '#3B82F6', '#8B5CF6', '#F59E0B']
    return colors[i] || '#3B82F6'
  }

  return (
    <div className="interactive-card">
      <div className="interactive-card-header justify-between">
        <div className="flex items-center justify-between">
          <div>
            <div className="interactive-card-title">{title}</div>
            {note && <div className="mt-0.5 text-xs text-blue-500 dark:text-blue-400">{note}</div>}
          </div>
          <span className="interactive-card-badge">
            薪资参考
          </span>
        </div>
      </div>

      {stats.length > 0 && (
        <div className={`grid divide-x divide-gray-100 border-b border-gray-100 dark:divide-slate-700/60 dark:border-slate-700/60 ${stats.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {stats.slice(0, 3).map((s, i) => (
            <div key={i} className="px-4 py-3 text-center">
              <div className="text-xl mb-0.5">{s.icon}</div>
              <div className="text-sm font-bold text-gray-800 dark:text-gray-200">{s.value}</div>
              <div className="text-xs leading-tight mt-0.5 text-gray-400 dark:text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex border-b border-gray-100 bg-gray-50 text-xs font-medium dark:border-slate-700/60 dark:bg-slate-800/60">
        {[
          { key: 'levels', label: '按经验等级' },
          { key: 'cities', label: '按城市（初级）' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 transition-colors ${
              tab === t.key
                ? 'bg-white text-blue-600 border-b-2 border-blue-500 -mb-px dark:bg-slate-900/70 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-3">
        {tab === 'levels' && levels.map((level, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{level.title}</span>
                {level.badge && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: `${levelColor(i)}18`, color: levelColor(i) }}
                  >
                    {level.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                ¥{Number(level.min || 0).toLocaleString()} – ¥{Number(level.max || 0).toLocaleString()}
              </span>
            </div>
            <div className="relative h-6 overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
              <div
                className="absolute inset-y-0 left-0 rounded-full opacity-30"
                style={{ width: barWidth(level.min, levelMax), backgroundColor: levelColor(i) }}
              />
              <div
                className="absolute inset-y-0 left-0 rounded-full flex items-center justify-end pr-2"
                style={{ width: barWidth(level.max, levelMax), backgroundColor: `${levelColor(i)}CC` }}
              >
                <span className="text-xs font-bold text-white drop-shadow">
                  {(Number(level.max || 0) / 1000).toFixed(0)}k
                </span>
              </div>
            </div>
            {level.note && <div className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{level.note}</div>}
          </div>
        ))}

        {tab === 'cities' && cities.map((city, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <span className="w-12 text-xs font-semibold text-gray-700 dark:text-gray-300">{city.name}</span>
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                ¥{Number(city.min || 0).toLocaleString()} – ¥{Number(city.max || 0).toLocaleString()}
              </span>
            </div>
            <div className="relative h-5 overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
              <div
                className="absolute inset-y-0 left-0 rounded-full opacity-30"
                style={{ width: barWidth(city.min, cityMax), backgroundColor: '#3B82F6' }}
              />
              <div
                className="absolute inset-y-0 left-0 rounded-full flex items-center justify-end pr-2"
                style={{ width: barWidth(city.max, cityMax), backgroundColor: '#3B82F6CC' }}
              >
                <span className="text-xs font-bold text-white drop-shadow">
                  {(Number(city.max || 0) / 1000).toFixed(0)}k
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
