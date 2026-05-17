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
      <div className="my-6 rounded-xl border bg-white p-5 shadow-sm">
        <div className="text-sm text-gray-400">暂无卡片</div>
      </div>
    );
  }

  const card = cards[current];
  const allSeen = seen.size === total;

  return (
    <div className="my-6 rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-1 font-semibold text-gray-800">{title}</div>
      {description && <p className="mb-3 text-sm text-gray-500">{description}</p>}

      <div className="mb-2 text-right text-sm text-gray-400">{current + 1} / {total}</div>

      <div
        className={`mb-4 min-h-32 cursor-pointer rounded-xl p-6 transition-colors ${flipped ? 'bg-green-100' : 'bg-blue-100'}`}
        onClick={handleFlip}
      >
        {!flipped ? (
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-500">问题</div>
            <div className="text-base font-medium text-gray-800">{card.question}</div>
          </div>
        ) : (
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-600">答案</div>
            <div className="whitespace-pre-wrap text-base text-gray-800">{card.answer}</div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={prev}
          disabled={current === 0}
          className="rounded-lg border px-4 py-2 text-sm text-gray-600 disabled:opacity-30 hover:bg-gray-50"
        >
          上一题
        </button>

        <button
          onClick={handleFlip}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
        >
          {flipped ? '收起答案' : '查看答案'}
        </button>

        <button
          onClick={next}
          disabled={current === total - 1 && allSeen}
          className="rounded-lg border px-4 py-2 text-sm text-gray-600 disabled:opacity-30 hover:bg-gray-50"
        >
          下一题
        </button>
      </div>

      {allSeen && (
        <div className="mt-4 rounded-lg bg-green-50 p-3 text-center text-sm font-medium text-green-700">
          完成！你已完成全部 {total} 张卡片 🎉
        </div>
      )}
    </div>
  );
}
