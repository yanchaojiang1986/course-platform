import { useState } from 'react';

const METHOD_COLORS = {
  GET: 'text-green-600',
  POST: 'text-blue-600',
  PUT: 'text-yellow-600',
  PATCH: 'text-orange-600',
  DELETE: 'text-red-600',
};

function StatusCell({ code }) {
  const n = parseInt(code);
  let cls = 'text-green-600';
  if (n >= 300 && n < 400) cls = 'text-blue-600';
  if (n >= 400 && n < 500) cls = 'text-orange-600';
  if (n >= 500) cls = 'text-red-600';
  return <span className={`font-mono text-xs ${cls}`}>{code}</span>;
}

function JsonBlock({ obj }) {
  if (obj === undefined || obj === null) return null;
  if (typeof obj !== 'object') return <pre className="interactive-panel-soft p-2 text-xs font-mono">{String(obj)}</pre>;
  return <pre className="interactive-panel-soft overflow-x-auto whitespace-pre-wrap p-2 text-xs font-mono">{JSON.stringify(obj, null, 2)}</pre>;
}

function SingleScenario({ data }) {
  const { scenario, request_list = [], selected_request, diagnosis } = data;
  const [detailTab, setDetailTab] = useState('Headers');
  const [selected, setSelected] = useState(null);
  const [diagAnswer, setDiagAnswer] = useState(null);

  const req = selected || selected_request;
  const reqTabs = req?.tabs ? Object.keys(req.tabs) : ['Headers'];

  return (
    <div>
      {scenario && <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600 dark:border-slate-700 dark:bg-slate-800/55 dark:text-gray-300">{scenario}</div>}
      <div className="overflow-x-auto border-b border-gray-200 dark:border-slate-700">
        <table className="w-full text-xs">
          <thead>
            <tr className="interactive-table-head">
              <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Name</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Method</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Type</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Size</th>
              <th className="px-3 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Time</th>
            </tr>
          </thead>
          <tbody>
            {request_list.map((r, i) => (
              <tr
                key={i}
                onClick={() => setSelected(r)}
                className={`interactive-table-row cursor-pointer transition hover:bg-blue-50 dark:hover:bg-blue-900/15 ${r.highlight || (selected && selected.name === r.name) ? 'bg-blue-100 dark:bg-blue-900/25' : ''}`}
              >
                <td className="max-w-xs truncate px-3 py-2 font-mono text-gray-700 dark:text-gray-300">{r.name}</td>
                <td className={`px-3 py-2 font-mono font-semibold ${METHOD_COLORS[r.method?.toUpperCase()] || 'text-gray-600'}`}>{r.method}</td>
                <td className="px-3 py-2"><StatusCell code={r.status} /></td>
                <td className="px-3 py-2 text-gray-500 dark:text-gray-400">{r.type}</td>
                <td className="px-3 py-2 text-gray-500 dark:text-gray-400">{r.size}</td>
                <td className="px-3 py-2 text-gray-500 dark:text-gray-400">{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {req && (
        <div className="border-b border-gray-200 dark:border-slate-700">
          <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600 dark:border-slate-700 dark:bg-slate-800/55 dark:text-gray-300">{req.name}</div>
          <div className="flex gap-0 border-b border-gray-200 bg-gray-50 px-3 dark:border-slate-700 dark:bg-slate-800/55">
            {reqTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setDetailTab(tab)}
                className={`border-b-2 px-3 py-1.5 text-xs font-medium transition ${detailTab === tab ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-3">
            <JsonBlock obj={req.tabs?.[detailTab] || req.tabs?.[Object.keys(req.tabs || {})[0]]} />
          </div>
        </div>
      )}
      {diagnosis && (
        <div className="bg-gray-50 p-4 dark:bg-slate-800/45">
          <div className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-200">{diagnosis.question}</div>
          <div className="space-y-2">
            {(diagnosis.options || []).map((opt, i) => {
              const isCorrect = i === diagnosis.correct;
              let cls = 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900/70 dark:text-gray-300 dark:hover:bg-slate-800';
              if (diagAnswer !== null) {
                if (i === diagAnswer && isCorrect) cls = 'border-green-400 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/20 dark:text-green-300';
                else if (i === diagAnswer && !isCorrect) cls = 'border-red-400 bg-red-50 text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300';
                else if (isCorrect) cls = 'border-green-400 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/20 dark:text-green-300';
                else cls = 'border-gray-200 bg-white text-gray-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-gray-500';
              }
              return (
                <button
                  key={i}
                  onClick={() => diagAnswer === null && setDiagAnswer(i)}
                  disabled={diagAnswer !== null}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition ${cls}`}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              );
            })}
          </div>
          {diagAnswer !== null && diagnosis.explanation && (
            <div className="mt-3 rounded border border-blue-200 bg-blue-50 p-2 text-sm text-blue-700 dark:border-blue-800/60 dark:bg-blue-900/20 dark:text-blue-300">{diagnosis.explanation}</div>
          )}
        </div>
      )}
    </div>
  );
}

function MultiCase({ data }) {
  const { description, cases = [] } = data;
  const [activeCase, setActiveCase] = useState(0);
  const [revealed, setRevealed] = useState({});

  const c = cases[activeCase];

  return (
    <div className="flex">
      <div className="w-36 shrink-0 border-r border-gray-200 bg-gray-50 dark:border-slate-700 dark:bg-slate-800/55">
        <div className="border-b border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 dark:border-slate-700 dark:text-gray-400">案例列表</div>
        {cases.map((cs, i) => (
          <button
            key={i}
            onClick={() => setActiveCase(i)}
            className={`w-full border-b border-gray-200 px-3 py-2 text-left text-xs transition dark:border-slate-700 ${activeCase === i ? 'bg-blue-50 text-blue-700 font-medium dark:bg-blue-900/20 dark:text-blue-300' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800'}`}
          >
            {cs.case_id || `案例 ${i + 1}`}
          </button>
        ))}
      </div>
      <div className="flex-1 min-w-0 p-4 space-y-4">
        {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
        {c && (
          <>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{c.scenario}</div>
            {c.request && (
              <div className="interactive-panel overflow-hidden">
                <div className="interactive-table-head px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">请求</div>
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="interactive-table-row">
                      <td className="w-16 px-3 py-1.5 text-gray-500 dark:text-gray-400">Method</td>
                      <td className={`px-3 py-1.5 font-mono font-semibold ${METHOD_COLORS[c.request.method?.toUpperCase()] || 'text-gray-600'}`}>{c.request.method}</td>
                    </tr>
                    <tr className="interactive-table-row">
                      <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">URL</td>
                      <td className="break-all px-3 py-1.5 font-mono text-gray-700 dark:text-gray-300">{c.request.url}</td>
                    </tr>
                    {c.request.payload && (
                      <tr>
                        <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">Payload</td>
                        <td className="px-3 py-1.5"><JsonBlock obj={c.request.payload} /></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {c.response && (
              <div className="interactive-panel overflow-hidden">
                <div className="interactive-table-head px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">响应</div>
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="interactive-table-row">
                      <td className="w-16 px-3 py-1.5 text-gray-500 dark:text-gray-400">Status</td>
                      <td className="px-3 py-1.5"><StatusCell code={c.response.status} /></td>
                    </tr>
                    {c.response.body !== undefined && (
                      <tr>
                        <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">Body</td>
                        <td className="px-3 py-1.5"><JsonBlock obj={c.response.body} /></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {!revealed[activeCase] ? (
              <button
                onClick={() => setRevealed(prev => ({ ...prev, [activeCase]: true }))}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                查看判断 / 解析
              </button>
            ) : (
              <div className="space-y-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-800/60 dark:bg-green-900/20 dark:text-green-300">
                  <span className="font-medium">正确答案：</span>{c.answer}
                </div>
                {c.explanation && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700 dark:border-blue-800/60 dark:bg-blue-900/20 dark:text-blue-300">
                    <span className="font-medium">解析：</span>{c.explanation}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function DevTools({ data }) {
  const { title, description } = data;
  const isMultiCase = Array.isArray(data.cases);

  return (
    <div className="interactive-card">
      {title && (
        <div className="interactive-card-header">
          <span aria-hidden>🛠️</span>
          <h3 className="interactive-card-title">{title}</h3>
        </div>
      )}
      <div className="p-0">
        {description && <div className="px-4 pb-2 pt-4 text-sm text-gray-500 dark:text-gray-400">{description}</div>}
        {isMultiCase ? <MultiCase data={data} /> : <SingleScenario data={data} />}
      </div>
    </div>
  );
}
