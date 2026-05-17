import { useState } from 'react';

const METHOD_COLORS = {
  GET: 'bg-green-100 text-green-700',
  POST: 'bg-blue-100 text-blue-700',
  PUT: 'bg-yellow-100 text-yellow-700',
  PATCH: 'bg-orange-100 text-orange-700',
  DELETE: 'bg-red-100 text-red-700',
};

function syntaxHighlight(obj) {
  const json = JSON.stringify(obj, null, 2);
  return json
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          return `<span style="color:#6b7280">${match}</span>`;
        }
        return `<span style="color:#16a34a">${match}</span>`;
      }
      if (/true|false/.test(match)) return `<span style="color:#9333ea">${match}</span>`;
      if (/null/.test(match)) return `<span style="color:#ef4444">${match}</span>`;
      return `<span style="color:#2563eb">${match}</span>`;
    });
}

function JsonBlock({ obj }) {
  if (!obj || typeof obj !== 'object') return null;
  return (
    <pre
      className="bg-gray-50 rounded-lg p-3 text-xs font-mono overflow-x-auto border border-gray-100"
      dangerouslySetInnerHTML={{ __html: syntaxHighlight(obj) }}
    />
  );
}

function AnnotatedField({ label, value, annotation }) {
  return (
    <div className="mb-2">
      <div className="flex items-start gap-2">
        <span className="text-xs font-mono text-gray-500 min-w-max">{label}:</span>
        <span className="text-xs font-mono text-gray-800 break-all">{value}</span>
      </div>
      {annotation && (
        <div className="ml-4 mt-0.5 text-xs text-blue-600 italic"># {annotation}</div>
      )}
    </div>
  );
}

function StatusBadge({ code }) {
  const n = parseInt(code);
  let cls = 'bg-green-100 text-green-700';
  if (n >= 400 && n < 500) cls = 'bg-orange-100 text-orange-700';
  if (n >= 500) cls = 'bg-red-100 text-red-700';
  return <span className={`px-2 py-0.5 rounded font-mono text-sm font-bold ${cls}`}>{code}</span>;
}

function RequestPanel({ request, annotations = {} }) {
  const { method, url, headers = {}, body } = request;
  const methodColor = METHOD_COLORS[method?.toUpperCase()] || 'bg-gray-100 text-gray-700';
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded font-mono text-xs font-bold ${methodColor}`}>{method}</span>
        <span className="text-sm font-mono text-gray-700 break-all">{url}</span>
      </div>
      {Object.keys(headers).length > 0 && (
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Headers</div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            {Object.entries(headers).map(([k, v]) => (
              <AnnotatedField key={k} label={k} value={v} annotation={annotations[k]} />
            ))}
          </div>
        </div>
      )}
      {body && (
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Body</div>
          <JsonBlock obj={body} />
          {annotations.body && (
            <div className="mt-1 text-xs text-blue-600 italic"># {annotations.body}</div>
          )}
        </div>
      )}
    </div>
  );
}

function ResponsePanel({ response, annotations = {} }) {
  const { status_code, status_text, headers = {}, body } = response;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <StatusBadge code={status_code} />
        <span className="text-sm text-gray-600">{status_text}</span>
      </div>
      {Object.keys(headers).length > 0 && (
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Headers</div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            {Object.entries(headers).map(([k, v]) => (
              <AnnotatedField key={k} label={k} value={v} annotation={annotations[k]} />
            ))}
          </div>
        </div>
      )}
      {body !== undefined && (
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Body</div>
          {typeof body === 'object' ? <JsonBlock obj={body} /> : (
            <pre className="bg-gray-50 rounded-lg p-3 text-xs font-mono border border-gray-100">{String(body)}</pre>
          )}
        </div>
      )}
    </div>
  );
}

export default function HttpDemo({ data }) {
  const { title, tabs = ['请求（Request）', '响应（Response）'], request, response } = data;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="my-6 rounded-xl border bg-white p-5 shadow-sm">
      {title && <h3 className="text-base font-semibold text-gray-700 mb-4">{title}</h3>}
      <div className="flex gap-1 border-b mb-4">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-sm font-medium rounded-t transition ${activeTab === i ? 'bg-white border border-b-white border-gray-200 text-blue-600 -mb-px' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === 0 && request && (
        <RequestPanel request={request} annotations={request.annotations || {}} />
      )}
      {activeTab === 1 && response && (
        <ResponsePanel response={response} annotations={response.annotations || {}} />
      )}
    </div>
  );
}
