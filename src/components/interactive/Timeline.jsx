export default function Timeline({ data }) {
  const { title, items, orientation, base_stage, fork_point, paths, start_label, end_label } = data;

  if (paths) {
    return (
      <div className="interactive-card">
        <div className="interactive-card-header">
          <h3 className="interactive-card-title">{title}</h3>
        </div>
        <div className="interactive-card-body">
          {base_stage && (
            <div
              className="mb-3 rounded-lg p-3 dark:text-gray-200"
              style={{ backgroundColor: base_stage.color || '#dbeafe' }}
            >
              <div className="font-semibold text-gray-800 dark:text-gray-100">{base_stage.label}</div>
              {base_stage.duration && <div className="text-xs text-gray-600 dark:text-gray-300">{base_stage.duration}</div>}
              {base_stage.desc && <div className="mt-1 text-sm text-gray-700 dark:text-gray-200">{base_stage.desc}</div>}
            </div>
          )}
          {fork_point && (
            <div className="mb-3 text-center text-sm text-gray-500 dark:text-gray-400">{fork_point}</div>
          )}
          <div className="flex gap-4">
            {(paths || []).map((path, pi) => (
              <div key={pi} className="interactive-panel-soft flex-1 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{path.name}</span>
                  {path.tag && (
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{ backgroundColor: path.tag_color || '#e5e7eb', color: '#374151' }}
                    >
                      {path.tag}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {(path.stages || []).map((stage, si) => (
                    <div key={si} className="rounded bg-white/80 p-2 text-sm dark:bg-slate-900/60">
                      {stage.duration && <div className="text-xs text-gray-500 dark:text-gray-400">{stage.duration}</div>}
                      <div className="text-gray-700 dark:text-gray-300">{stage.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (orientation === 'horizontal') {
    return (
      <div className="interactive-card">
        <div className="interactive-card-header">
          <h3 className="interactive-card-title">{title}</h3>
        </div>
        <div className="interactive-card-body overflow-x-auto">
          <div className="flex min-w-max items-start gap-0">
            {(items || []).map((item, i) => (
              <div key={i} className="flex flex-col items-center" style={{ minWidth: '100px' }}>
                <div className="mb-1 text-center text-xs font-semibold text-blue-600 dark:text-blue-400">{item.day}</div>
                <div className="flex items-center w-full">
                  <div className="h-0.5 flex-1 bg-blue-200 dark:bg-blue-800/70" style={{ visibility: i === 0 ? 'hidden' : 'visible' }} />
                  <div className="h-3 w-3 rounded-full bg-blue-500 flex-shrink-0" />
                  <div className="h-0.5 flex-1 bg-blue-200 dark:bg-blue-800/70" style={{ visibility: i === (items.length - 1) ? 'hidden' : 'visible' }} />
                </div>
                <div className="mt-1 text-center text-xs font-medium text-gray-700 dark:text-gray-300">{item.event}</div>
                {item.desc && <div className="mt-0.5 text-center text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>}
                {item.role && <div className="mt-0.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-center text-xs text-gray-500 dark:bg-slate-800 dark:text-gray-400">{item.role}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="interactive-card">
      <div className="interactive-card-header">
        <h3 className="interactive-card-title">{title}</h3>
      </div>
      <div className="interactive-card-body">
        {start_label && (
          <div className="mb-2 text-center text-xs text-gray-400 dark:text-gray-500">{start_label}</div>
        )}
        <div className="space-y-4">
          {(items || []).map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="h-4 w-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color || '#3b82f6' }}
                />
                {i < (items.length - 1) && (
                  <div className="mt-1 w-0.5 flex-1 bg-gray-200 dark:bg-slate-700" style={{ minHeight: '24px' }} />
                )}
              </div>
              <div className="pb-2 flex-1">
                <div
                  className="mb-1 inline-block rounded px-2 py-0.5 text-sm font-semibold text-white"
                  style={{ backgroundColor: item.color || '#3b82f6' }}
                >
                  {item.stage}
                </div>
                {item.modules && item.modules.length > 0 && (
                  <ul className="space-y-1">
                    {item.modules.map((mod, mi) => (
                      <li key={mi} className="text-sm text-gray-700 dark:text-gray-300">
                        {mod.id && <span className="font-medium">{mod.id} </span>}
                        {mod.name}
                        {mod.desc && <span className="text-gray-500 dark:text-gray-400"> — {mod.desc}</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
        {end_label && (
          <div className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">{end_label}</div>
        )}
      </div>
    </div>
  );
}
