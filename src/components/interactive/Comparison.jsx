import { useState } from 'react';

export default function Comparison({ data }) {
  const { layout, title, items, left, right, conclusion } = data;

  if (layout === 'cards') {
    return (
      <div className="my-6 rounded-xl border bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span>📊</span>
          <span className="text-sm font-semibold text-blue-600">{title}</span>
        </div>
        <div className="flex gap-4">
          {(items || []).map((item, i) => (
            <div key={i} className="flex-1 rounded-lg border p-4">
              <div className="mb-2 text-2xl">{item.icon}</div>
              <div className="mb-3 font-semibold text-gray-800">{item.role}</div>
              {item.interactions && item.interactions.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1">
                  {item.interactions.map((it, j) => (
                    <span key={j} className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">{it}</span>
                  ))}
                </div>
              )}
              {item.tips && item.tips.length > 0 && (
                <ul className="space-y-1">
                  {item.tips.map((tip, j) => (
                    <li key={j} className="text-sm text-gray-600">• {tip}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        {conclusion && (
          <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">{conclusion}</div>
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
          <span className="font-semibold text-gray-800">{side.name}</span>
          {side.badge && (
            <span
              className="rounded-full px-2 py-0.5 text-xs font-medium"
              style={{ backgroundColor: side.badge_color || '#e5e7eb', color: '#374151' }}
            >
              {side.badge}
            </span>
          )}
        </div>
        {hasItems && (
          <ul className="space-y-1">
            {side.items.map((it, i) => (
              <li key={i} className="text-sm text-gray-700">• {it}</li>
            ))}
          </ul>
        )}
        {hasPros && (
          <ul className="space-y-1">
            {side.pros.map((p, i) => (
              <li key={i} className="text-sm text-gray-700">✅ {p}</li>
            ))}
          </ul>
        )}
        {hasCons && (
          <ul className="mt-2 space-y-1">
            {side.cons.map((c, i) => (
              <li key={i} className="text-sm text-gray-700">⚠️ {c}</li>
            ))}
          </ul>
        )}
        {hasContent && (
          <p className="mb-2 text-sm text-gray-700">{side.content}</p>
        )}
        {hasProblems && (
          <ul className="space-y-1">
            {side.problems.map((p, i) => (
              <li key={i} className="text-sm text-gray-700">❌ {p}</li>
            ))}
          </ul>
        )}
        {hasHighlights && (
          <ul className="space-y-1">
            {side.highlights.map((h, i) => (
              <li key={i} className="text-sm text-gray-700">⭐ {h}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="my-6 rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span>📊</span>
        <span className="text-sm font-semibold text-blue-600">{title}</span>
      </div>
      <div className="flex gap-4">
        {renderSide(left, 'bg-red-50')}
        {renderSide(right, 'bg-green-50')}
      </div>
      {conclusion && (
        <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">{conclusion}</div>
      )}
    </div>
  );
}
