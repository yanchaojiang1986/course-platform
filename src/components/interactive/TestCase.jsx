import { useState } from 'react';

const STATUS_CYCLE = ['待执行', '通过', '失败', '阻塞'];
const STATUS_COLORS = {
  '待执行': 'bg-gray-100 text-gray-600',
  '通过': 'bg-green-100 text-green-700',
  '失败': 'bg-red-100 text-red-700',
  '阻塞': 'bg-orange-100 text-orange-700',
};
const PRIORITY_COLORS = {
  P0: 'bg-red-100 text-red-700',
  P1: 'bg-orange-100 text-orange-700',
  P2: 'bg-yellow-100 text-yellow-700',
  P3: 'bg-gray-100 text-gray-600',
};

function StandardTable({ data, rows, statuses, setStatuses, expanded, setExpanded }) {
  const priorityColors = data.priority_colors || PRIORITY_COLORS;

  const cycleStatus = (id) => {
    setStatuses(prev => {
      const cur = prev[id] || rows.find(r => r.id === id)?.status || '待执行';
      const idx = STATUS_CYCLE.indexOf(cur);
      return { ...prev, [id]: STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length] };
    });
  };

  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="interactive-table-head">
          {data.columns.map((col, i) => (
            <th key={i} className="px-3 py-2 text-left font-medium whitespace-nowrap text-gray-600 dark:text-gray-400">{col}</th>
          ))}
          <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">详情</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const statusVal = statuses[row.id] || row.status || '待执行';
          const isExpanded = expanded[row.id];
          const pColor = priorityColors[row.priority] || PRIORITY_COLORS[row.priority] || 'bg-gray-100 text-gray-600';
          return (
            <>
              <tr key={row.id} className="interactive-table-row hover:bg-gray-50 dark:hover:bg-slate-800/40">
                <td className="px-3 py-2 whitespace-nowrap text-gray-500 dark:text-gray-400">{row.id}</td>
                <td className="px-3 py-2 text-gray-800 dark:text-gray-200">{row.title}</td>
                {data.columns.length > 2 && <td className="max-w-xs truncate px-3 py-2 text-gray-600 dark:text-gray-400">{row.precondition}</td>}
                {data.columns.length > 3 && <td className="max-w-xs truncate px-3 py-2 text-gray-600 dark:text-gray-400">{row.steps}</td>}
                {data.columns.length > 4 && <td className="max-w-xs truncate px-3 py-2 text-gray-600 dark:text-gray-400">{row.expected}</td>}
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${pColor}`}>{row.priority}</span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <button
                    onClick={() => cycleStatus(row.id)}
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium cursor-pointer ${STATUS_COLORS[statusVal] || 'bg-gray-100 text-gray-600'}`}
                  >
                    {statusVal}
                  </button>
                </td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => setExpanded(prev => ({ ...prev, [row.id]: !prev[row.id] }))}
                    className="text-xs text-blue-500 hover:underline dark:text-blue-400"
                  >
                    {isExpanded ? '收起' : '展开'}
                  </button>
                </td>
              </tr>
              {isExpanded && (
                <tr key={`${row.id}-detail`} className="interactive-table-row bg-blue-50/80 dark:bg-blue-900/15">
                  <td colSpan={data.columns.length + 1} className="px-4 py-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="mb-1 font-medium text-gray-700 dark:text-gray-300">前置条件</div>
                        <div className="whitespace-pre-wrap text-gray-600 dark:text-gray-400">{row.precondition}</div>
                      </div>
                      <div>
                        <div className="mb-1 font-medium text-gray-700 dark:text-gray-300">测试步骤</div>
                        <div className="whitespace-pre-wrap text-gray-600 dark:text-gray-400">{row.steps}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="mb-1 font-medium text-gray-700 dark:text-gray-300">预期结果</div>
                        <div className="whitespace-pre-wrap text-gray-600 dark:text-gray-400">{row.expected}</div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          );
        })}
      </tbody>
    </table>
  );
}

function ChapterTable({ data, rows, expanded, setExpanded }) {
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="interactive-table-head">
          {data.columns.map((col, i) => (
            <th key={i} className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">{col}</th>
          ))}
          <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">详情</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => {
          const isExpanded = expanded[idx];
          return (
            <>
              <tr key={idx} className="interactive-table-row hover:bg-gray-50 dark:hover:bg-slate-800/40">
                <td className="px-3 py-2 font-medium text-gray-800 dark:text-gray-200">{row.chapter}</td>
                <td className="max-w-xs truncate px-3 py-2 text-gray-600 dark:text-gray-400">{row.points}</td>
                {row.example !== undefined && (
                  <td className="max-w-xs truncate px-3 py-2 font-mono text-xs text-gray-600 dark:text-gray-400">{row.example}</td>
                )}
                <td className="px-3 py-2">
                  <button
                    onClick={() => setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }))}
                    className="text-xs text-blue-500 hover:underline dark:text-blue-400"
                  >
                    {isExpanded ? '收起' : '展开'}
                  </button>
                </td>
              </tr>
              {isExpanded && (
                <tr key={`${idx}-detail`} className="interactive-table-row bg-blue-50/80 dark:bg-blue-900/15">
                  <td colSpan={data.columns.length + 1} className="px-4 py-3">
                    <div className="text-sm space-y-2">
                      <div><span className="font-medium text-gray-700 dark:text-gray-300">要点：</span><span className="whitespace-pre-wrap text-gray-600 dark:text-gray-400">{row.points}</span></div>
                      {row.example && <div><span className="font-medium text-gray-700 dark:text-gray-300">示例：</span><code className="rounded bg-gray-100 px-1 font-mono text-xs whitespace-pre-wrap text-gray-600 dark:bg-slate-800 dark:text-gray-300">{row.example}</code></div>}
                    </div>
                  </td>
                </tr>
              )}
            </>
          );
        })}
      </tbody>
    </table>
  );
}

function GenericTable({ data, rows, expanded, setExpanded }) {
  const keys = Object.keys(rows[0] || {});
  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="interactive-table-head">
          {data.columns && data.columns.length > 0
            ? data.columns.map((col, i) => <th key={i} className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">{col}</th>)
            : keys.map((k, i) => <th key={i} className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">{k}</th>)
          }
          <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">详情</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => {
          const isExpanded = expanded[idx];
          const vals = keys.map(k => row[k]);
          return (
            <>
              <tr key={idx} className="interactive-table-row hover:bg-gray-50 dark:hover:bg-slate-800/40">
                {vals.map((v, i) => (
                  <td key={i} className="max-w-xs truncate px-3 py-2 text-gray-700 dark:text-gray-300">{String(v ?? '')}</td>
                ))}
                <td className="px-3 py-2">
                  <button
                    onClick={() => setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }))}
                    className="text-xs text-blue-500 hover:underline dark:text-blue-400"
                  >
                    {isExpanded ? '收起' : '展开'}
                  </button>
                </td>
              </tr>
              {isExpanded && (
                <tr key={`${idx}-detail`} className="interactive-table-row bg-blue-50/80 dark:bg-blue-900/15">
                  <td colSpan={keys.length + 1} className="px-4 py-3">
                    <div className="text-sm space-y-1">
                      {keys.map(k => (
                        <div key={k}><span className="font-medium text-gray-700 dark:text-gray-300">{k}：</span><span className="whitespace-pre-wrap text-gray-600 dark:text-gray-400">{String(row[k] ?? '')}</span></div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </>
          );
        })}
      </tbody>
    </table>
  );
}

export default function TestCase({ data }) {
  const { title, description, rows = [] } = data;
  const [statuses, setStatuses] = useState({});
  const [expanded, setExpanded] = useState({});

  const firstRow = rows[0] || {};
  const isStandard = 'id' in firstRow && 'steps' in firstRow;
  const isChapter = 'chapter' in firstRow && 'points' in firstRow;

  return (
    <div className="interactive-card">
      {title && (
        <div className="interactive-card-header">
          <h3 className="interactive-card-title">{title}</h3>
        </div>
      )}
      <div className="p-0 overflow-x-auto">
        {description && <p className="mb-3 px-5 pt-4 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        {isStandard && (
          <StandardTable
            data={data}
            rows={rows}
            statuses={statuses}
            setStatuses={setStatuses}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        )}
        {!isStandard && isChapter && (
          <ChapterTable data={data} rows={rows} expanded={expanded} setExpanded={setExpanded} />
        )}
        {!isStandard && !isChapter && rows.length > 0 && (
          <GenericTable data={data} rows={rows} expanded={expanded} setExpanded={setExpanded} />
        )}
      </div>
    </div>
  );
}
