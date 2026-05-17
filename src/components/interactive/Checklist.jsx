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
    } catch {}
    return buildInitialState();
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {}
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
        />
        <span className={`text-sm ${checked[idx] ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
          {label}
        </span>
      </li>
    );
  };

  return (
    <div className="my-6 rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-semibold text-gray-800">{title}</span>
        <span className="text-sm text-gray-500">{done} / {total} 已完成</span>
      </div>
      {description && <p className="mb-3 text-sm text-gray-500">{description}</p>}

      {categories ? (
        (() => {
          let offset = 0;
          return categories.map((cat, ci) => {
            const start = offset;
            offset += cat.items.length;
            return (
              <div key={ci} className="mb-4">
                <h3 className="mb-1 text-sm font-semibold text-gray-600">{cat.name}</h3>
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
  );
}
