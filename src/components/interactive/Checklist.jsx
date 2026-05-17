import { useState, useEffect } from 'react';

export default function Checklist({ data, blockId }) {
  const { title, description, items, categories } = data;
  const storageKey = `checklist_${blockId}`;

  const buildInitialState = () => {
    if (categories) {
      const total = categories.reduce((acc, cat) => acc + cat.items.length, 0);
      return Array(total).fill(false);
    }
    return Array((items || []).length).fill(false);
  };

  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch { }
    return buildInitialState();
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch { }
  }, [checked, storageKey]);

  const toggle = (idx) => {
    setChecked((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const total = checked.length;
  const done = checked.filter(Boolean).length;

  const renderItem = (item, idx) => {
    let label = '';
    if (typeof item === 'string') {
      label = item;
    } else if (item.week && item.content) {
      label = `第${item.week}周：${item.content}`;
    } else if (item.module && item.artifact) {
      label = `${item.module} — ${item.artifact}`;
    } else if (item.phase && item.task) {
      label = `${item.phase}：${item.task}`;
    } else if (item.step && item.item) {
      label = item.detail ? `${item.step}. ${item.item}（${item.detail}）` : `${item.step}. ${item.item}`;
    } else if (item.task) {
      label = item.task;
    } else if (item.item) {
      label = item.item;
    } else {
      label = JSON.stringify(item);
    }

    return (
      <li key={idx} className="flex items-start gap-2 py-1">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-blue-500"
          checked={!!checked[idx]}
          onChange={() => toggle(idx)}
          aria-label={label}
        />
        <span className={`text-sm ${checked[idx] ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
          {label}
        </span>
      </li>
    );
  };

  return (
    <div className="interactive-card">
      <div className="interactive-card-header justify-between">
        <h3 className="interactive-card-title">{title}</h3>
        <span className="interactive-card-badge">{done} / {total} 已完成</span>
      </div>
      <div className="interactive-card-body">
        {description && <p className="mb-4 interactive-muted">{description}</p>}

        {categories ? (
          (() => {
            let offset = 0;
            return categories.map((cat, ci) => {
              const start = offset;
              offset += cat.items.length;
              return (
                <div key={ci} className="mb-4 rounded-lg border border-gray-100 bg-gray-50/70 p-3 dark:border-slate-700/60 dark:bg-slate-800/35">
                  <h3 className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-400">{cat.name}</h3>
                  <ul>
                    {cat.items.map((item, ii) => renderItem(item, start + ii))}
                  </ul>
                </div>
              );
            });
          })()
        ) : (
          <ul>
            {(items || []).map((item, i) => renderItem(item, i))}
          </ul>
        )}
      </div>
    </div>
  );
}
