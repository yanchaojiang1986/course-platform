import { useState } from 'react';

export default function Flashcard({ data }) {
  const { title, description, cards } = data;
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState(new Set());

  const total = (cards || []).length;

  const goTo = (idx) => {
    setFlipped(false);
    setCurrent(idx);
  };

  const prev = () => {
    if (current > 0) goTo(current - 1);
  };

  const next = () => {
    if (current < total - 1) {
      setSeen((prev) => new Set(prev).add(current));
      goTo(current + 1);
    } else {
      setSeen((prev) => new Set(prev).add(current));
    }
  };

  const handleFlip = () => setFlipped((f) => !f);

  if (!cards || total === 0) {
    return (
      <div className="interactive-card">
        <div className="interactive-card-header">
          <h3 className="interactive-card-title">{title || '卡片'}</h3>
        </div>
        <div className="interactive-card-body text-sm text-gray-400 dark:text-gray-500">暂无卡片</div>
      </div>
    );
  }

  const card = cards[current];
  const allSeen = seen.size === total;

  return (
    <div className="interactive-card">
      <div className="interactive-card-header justify-between">
        <h3 className="interactive-card-title">{title}</h3>
        <span className="interactive-card-badge">{current + 1} / {total}</span>
      </div>
      <div className="interactive-card-body">
        {description && <p className="mb-4 interactive-muted">{description}</p>}

        <div
          className={`mb-4 min-h-32 cursor-pointer rounded-xl border p-6 transition-colors ${
            flipped
              ? 'border-green-200 bg-green-50 dark:border-green-800/60 dark:bg-green-900/20'
              : 'border-blue-200 bg-blue-50 dark:border-blue-800/60 dark:bg-blue-900/20'
          }`}
          onClick={handleFlip}
        >
          {!flipped ? (
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-500 dark:text-blue-400">问题</div>
              <div className="text-base font-medium text-gray-800 dark:text-gray-200">{card.question}</div>
            </div>
          ) : (
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">答案</div>
              <div className="whitespace-pre-wrap text-base text-gray-800 dark:text-gray-200">{card.answer}</div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={prev}
            disabled={current === 0}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:opacity-30 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
          >
            上一题
          </button>

          <button
            onClick={handleFlip}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            {flipped ? '收起答案' : '查看答案'}
          </button>

          <button
            onClick={next}
            disabled={current === total - 1 && allSeen}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:opacity-30 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
          >
            下一题
          </button>
        </div>

        {allSeen && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-center text-sm font-medium text-green-700 dark:border-green-800/60 dark:bg-green-900/20 dark:text-green-300">
            完成！你已完成全部 {total} 张卡片 🎉
          </div>
        )}
      </div>
    </div>
  );
}
