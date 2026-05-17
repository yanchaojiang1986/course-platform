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
  if (typeof obj !== 'object') return <pre className="text-xs font-mono bg-gray-50 rounded p-2 border">{String(obj)}</pre>;
  return <pre className="text-xs font-mono bg-gray-50 rounded p-2 border overflow-x-auto whitespace-pre-wrap">{JSON.stringify(obj, null, 2)}</pre>;
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
      {scenario && <div className="px-4 py-2 text-sm text-gray-600 border-b bg-gray-50">{scenario}</div>}
      <div className="overflow-x-auto border-b">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left px-3 py-2 text-gray-500 font-medium">Name</th>
              <th className="text-left px-3 py-2 text-gray-500 font-medium">Method</th>
              <th className="text-left px-3 py-2 text-gray-500 font-medium">Status</th>
              <th className="text-left px-3 py-2 text-gray-500 font-medium">Type</th>
              <th className="text-left px-3 py-2 text-gray-500 font-medium">Size</th>
              <th className="text-left px-3 py-2 text-gray-500 font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {request_list.map((r, i) => (
              <tr
                key={i}
                onClick={() => setSelected(r)}
                className={`border-b cursor-pointer hover:bg-blue-50 transition ${r.highlight || (selected && selected.name === r.name) ? 'bg-blue-100' : ''}`}
              >
                <td className="px-3 py-2 text-gray-700 max-w-xs truncate font-mono">{r.name}</td>
                <td className={`px-3 py-2 font-mono font-semibold ${METHOD_COLORS[r.method?.toUpperCase()] || 'text-gray-600'}`}>{r.method}</td>
                <td className="px-3 py-2"><StatusCell code={r.status} /></td>
                <td className="px-3 py-2 text-gray-500">{r.type}</td>
                <td className="px-3 py-2 text-gray-500">{r.size}</td>
                <td className="px-3 py-2 text-gray-500">{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {req && (
        <div className="border-b">
          <div className="px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 border-b">{req.name}</div>
          <div className="flex gap-0 border-b bg-gray-50 px-3">
            {reqTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setDetailTab(tab)}
                className={`px-3 py-1.5 text-xs font-medium border-b-2 transition ${detailTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
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
        <div className="p-4 bg-gray-50">
          <div className="text-sm font-medium text-gray-700 mb-3">{diagnosis.question}</div>
          <div className="space-y-2">
            {(diagnosis.options || []).map((opt, i) => {
              const isCorrect = i === diagnosis.correct;
              let cls = 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50';
              if (diagAnswer !== null) {
                if (i === diagAnswer && isCorrect) cls = 'border-green-400 bg-green-50 text-green-700';
                else if (i === diagAnswer && !isCorrect) cls = 'border-red-400 bg-red-50 text-red-700';
                else if (isCorrect) cls = 'border-green-400 bg-green-50 text-green-700';
                else cls = 'border-gray-200 bg-white text-gray-400';
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
            <div className="mt-3 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded p-2">{diagnosis.explanation}</div>
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
      <div className="w-36 shrink-0 border-r bg-gray-50">
        <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b">案例列表</div>
        {cases.map((cs, i) => (
          <button
            key={i}
            onClick={() => setActiveCase(i)}
            className={`w-full text-left text-xs px-3 py-2 border-b transition ${activeCase === i ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {cs.case_id || `案例 ${i + 1}`}
          </button>
        ))}
      </div>
      <div className="flex-1 min-w-0 p-4 space-y-4">
        {description && <p className="text-sm text-gray-600">{description}</p>}
        {c && (
          <>
            <div className="text-sm font-medium text-gray-700">{c.scenario}</div>
            {c.request && (
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 border-b">请求</div>
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-b">
                      <td className="px-3 py-1.5 text-gray-500 w-16">Method</td>
                      <td className={`px-3 py-1.5 font-mono font-semibold ${METHOD_COLORS[c.request.method?.toUpperCase()] || 'text-gray-600'}`}>{c.request.method}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-3 py-1.5 text-gray-500">URL</td>
                      <td className="px-3 py-1.5 font-mono text-gray-700 break-all">{c.request.url}</td>
                    </tr>
                    {c.request.payload && (
                      <tr>
                        <td className="px-3 py-1.5 text-gray-500">Payload</td>
                        <td className="px-3 py-1.5"><JsonBlock obj={c.request.payload} /></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {c.response && (
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 border-b">响应</div>
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-b">
                      <td className="px-3 py-1.5 text-gray-500 w-16">Status</td>
                      <td className="px-3 py-1.5"><StatusCell code={c.response.status} /></td>
                    </tr>
                    {c.response.body !== undefined && (
                      <tr>
                        <td className="px-3 py-1.5 text-gray-500">Body</td>
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
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
              >
                查看判断 / 解析
              </button>
            ) : (
              <div className="space-y-2">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                  <span className="font-medium">正确答案：</span>{c.answer}
                </div>
                {c.explanation && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
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
  const { title } = data;
  const isMultiCase = Array.isArray(data.cases);

  return (
    <div className="my-6 rounded-xl border bg-white shadow-sm overflow-hidden">
      {title && (
        <div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 border-b flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-400"></span>
          <span className="ml-2">{title}</span>
        </div>
      )}
      {isMultiCase ? <MultiCase data={data} /> : <SingleScenario data={data} />}
    </div>
  );
}
