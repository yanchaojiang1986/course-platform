export default function Comparison({ data }) {
  const { layout, title, items, left, right, conclusion } = data;

  if (layout === 'cards') {
    return (
      <div className="interactive-card">
        <div className="interactive-card-header">
          <span aria-hidden>📊</span>
          <h3 className="interactive-card-title">{title}</h3>
        </div>
        <div className="interactive-card-body flex gap-4">
          {(items || []).map((item, i) => (
            <div key={i} className="interactive-panel-soft flex-1 p-4">
              <div className="mb-2 text-2xl">{item.icon}</div>
              <div className="mb-3 font-semibold text-gray-800 dark:text-gray-200">{item.role}</div>
              {item.interactions && item.interactions.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1">
                  {item.interactions.map((it, j) => (
                    <span key={j} className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">{it}</span>
                  ))}
                </div>
              )}
              {item.tips && item.tips.length > 0 && (
                <ul className="space-y-1">
                  {item.tips.map((tip, j) => (
                    <li key={j} className="text-sm text-gray-600 dark:text-gray-400">• {tip}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        {conclusion && (
          <div className="mx-5 mb-5 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-300">{conclusion}</div>
        )}
      </div>
    );
  }

  const renderSide = (side, bg) => {
    if (!side) return null;
    const hasPros = side.pros && side.pros.length > 0;
    const hasCons = side.cons && side.cons.length > 0;
    const hasItems = side.items && side.items.length > 0;
    const hasContent = side.content !== undefined;
    const hasProblems = side.problems && side.problems.length > 0;
    const hasHighlights = side.highlights && side.highlights.length > 0;

    return (
      <div className={`flex-1 rounded-lg p-4 ${bg}`}>
        <div className="mb-3 flex items-center gap-2">
          <span className="font-semibold text-gray-800 dark:text-gray-200">{side.name}</span>
          {side.badge && (
            <span
              className="rounded-full px-2 py-0.5 text-xs font-medium dark:bg-slate-700/60 dark:text-gray-200"
              style={{ backgroundColor: side.badge_color || '#e5e7eb', color: '#374151' }}
            >
              {side.badge}
            </span>
          )}
        </div>
        {hasItems && (
          <ul className="space-y-1">
            {side.items.map((it, i) => (
              <li key={i} className="text-sm text-gray-700 dark:text-gray-300">• {it}</li>
            ))}
          </ul>
        )}
        {hasPros && (
          <ul className="space-y-1">
            {side.pros.map((p, i) => (
              <li key={i} className="text-sm text-gray-700 dark:text-gray-300">✅ {p}</li>
            ))}
          </ul>
        )}
        {hasCons && (
          <ul className="mt-2 space-y-1">
            {side.cons.map((c, i) => (
              <li key={i} className="text-sm text-gray-700 dark:text-gray-300">⚠️ {c}</li>
            ))}
          </ul>
        )}
        {hasContent && (
          <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">{side.content}</p>
        )}
        {hasProblems && (
          <ul className="space-y-1">
            {side.problems.map((p, i) => (
              <li key={i} className="text-sm text-gray-700 dark:text-gray-300">❌ {p}</li>
            ))}
          </ul>
        )}
        {hasHighlights && (
          <ul className="space-y-1">
            {side.highlights.map((h, i) => (
              <li key={i} className="text-sm text-gray-700 dark:text-gray-300">⭐ {h}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="interactive-card">
      <div className="interactive-card-header">
        <span aria-hidden>📊</span>
        <h3 className="interactive-card-title">{title}</h3>
      </div>
      <div className="interactive-card-body flex gap-4">
        {renderSide(left, 'bg-red-50 dark:bg-red-900/10')}
        {renderSide(right, 'bg-green-50 dark:bg-green-900/10')}
      </div>
      {conclusion && (
        <div className="mx-5 mb-5 rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-300">{conclusion}</div>
      )}
    </div>
  );
}
