import { useState } from 'react';

function parseSql(sql, tables) {
  const s = sql.trim();

  const selectAllMatch = s.match(/^\s*SELECT\s+\*\s+FROM\s+(\w+)\s*$/i);
  if (selectAllMatch) {
    const tname = selectAllMatch[1].toLowerCase();
    const table = tables[tname];
    if (!table) return { error: `表 "${tname}" 不存在` };
    return { rows: table, affected: null };
  }

  const selectWhereMatch = s.match(/^\s*SELECT\s+\*\s+FROM\s+(\w+)\s+WHERE\s+(\w+)\s*=\s*['"]?([^'";\s]+)['"]?\s*$/i);
  if (selectWhereMatch) {
    const [, tname, field, val] = selectWhereMatch;
    const table = tables[tname.toLowerCase()];
    if (!table) return { error: `表 "${tname}" 不存在` };
    const filtered = table.filter(row => String(row[field]) === val || String(row[field]) === `'${val}'`);
    return { rows: filtered, affected: null };
  }

  const joinMatch = s.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)\s+(\w+)\s+JOIN\s+(\w+)\s+(\w+)\s+ON\s+([\w.]+)\s*=\s*([\w.]+)(?:\s+WHERE\s+([\s\S]+?))?\s*$/i);
  if (joinMatch) {
    const [, , t1, , t2, , on1, on2, whereClause] = joinMatch;
    const table1 = tables[t1.toLowerCase()];
    const table2 = tables[t2.toLowerCase()];
    if (!table1) return { error: `表 "${t1}" 不存在` };
    if (!table2) return { error: `表 "${t2}" 不存在` };
    const f1 = on1.includes('.') ? on1.split('.')[1] : on1;
    const f2 = on2.includes('.') ? on2.split('.')[1] : on2;
    let joined = [];
    for (const r1 of table1) {
      for (const r2 of table2) {
        if (String(r1[f1]) === String(r2[f2])) {
          joined.push({ ...r1, ...r2 });
        }
      }
    }
    if (whereClause) {
      const wm = whereClause.match(/(\w+)\s*=\s*['"]?([^'";\s]+)['"]?/);
      if (wm) {
        const [, wf, wv] = wm;
        joined = joined.filter(row => String(row[wf]) === wv);
      }
    }
    return { rows: joined, affected: null };
  }

  const updateMatch = s.match(/^\s*UPDATE\s+(\w+)\s+SET\s+(\w+)\s*=\s*(['"]?[^'";\s]+['"]?)\s+WHERE\s+(\w+)\s*=\s*['"]?([^'";\s]+)['"]?\s*$/i);
  if (updateMatch) {
    const [, tname, setField, setVal, whereField, whereVal] = updateMatch;
    const tnameLower = tname.toLowerCase();
    const table = tables[tnameLower];
    if (!table) return { error: `表 "${tname}" 不存在` };
    let count = 0;
    const newVal = setVal.replace(/^['"]|['"]$/g, '');
    for (const row of table) {
      if (String(row[whereField]) === whereVal) {
        row[setField] = isNaN(newVal) ? newVal : Number(newVal);
        count++;
      }
    }
    return { rows: null, affected: count, message: `${count} 行受影响` };
  }

  const insertMatch = s.match(/^\s*INSERT\s+INTO\s+(\w+)/i);
  if (insertMatch) return { rows: null, affected: 0, message: '暂不支持 INSERT 模拟执行' };

  const deleteMatch = s.match(/^\s*DELETE\s+FROM\s+(\w+)/i);
  if (deleteMatch) return { rows: null, affected: 0, message: '暂不支持 DELETE 模拟执行（防止误删演示数据）' };

  return { rows: null, affected: 0, message: '该 SQL 类型暂不支持模拟执行' };
}

function ResultTable({ rows }) {
  if (!rows || rows.length === 0) return <div className="p-2 text-sm text-gray-500 dark:text-gray-400">查询结果为空（0 行）</div>;
  const cols = Object.keys(rows[0]);
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="interactive-table-head">
            {cols.map(c => <th key={c} className="px-3 py-2 text-left font-medium whitespace-nowrap text-gray-600 dark:text-gray-400">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="interactive-table-row hover:bg-gray-50 dark:hover:bg-slate-800/40">
              {cols.map(c => <td key={c} className="px-3 py-2 whitespace-nowrap text-gray-700 dark:text-gray-300">{String(row[c] ?? '')}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-1 px-1 text-xs text-gray-400 dark:text-gray-500">{rows.length} 行结果</div>
    </div>
  );
}

export default function SqlDemo({ data }) {
  const { title, description, mock_tables = {}, preset_queries = [] } = data;
  const [tables, setTables] = useState(() => JSON.parse(JSON.stringify(mock_tables)));
  const [selectedQuery, setSelectedQuery] = useState(preset_queries[0] || null);
  const [sql, setSql] = useState(preset_queries[0]?.sql || '');
  const [result, setResult] = useState(null);
  const [ran, setRan] = useState(false);

  const handleSelectQuery = (q) => {
    setSelectedQuery(q);
    setSql(q.sql);
    setResult(null);
    setRan(false);
  };

  const handleRun = () => {
    const res = parseSql(sql, tables);
    if (res.rows !== null && !res.error) {
      setTables(prev => ({ ...prev }));
    }
    setResult(res);
    setRan(true);
  };

  return (
    <div className="interactive-card">
      {title && (
        <div className="interactive-card-header">
          <h3 className="interactive-card-title">{title}</h3>
        </div>
      )}
      <div className="interactive-card-body">
        {description && <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        <div className="flex gap-4">
          {preset_queries.length > 0 && (
            <div className="w-40 shrink-0">
              <div className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">预设查询</div>
              <div className="space-y-1">
                {preset_queries.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectQuery(q)}
                    className={`w-full rounded-lg border px-2.5 py-2 text-left text-xs transition ${selectedQuery?.label === q.label
                      ? 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-400 dark:hover:bg-slate-800'
                      }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex-1 min-w-0 space-y-3">
            {selectedQuery?.purpose && (
              <div className="rounded border border-blue-100 bg-blue-50 p-2 text-xs text-gray-500 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-gray-300">
                <span className="font-medium text-blue-700 dark:text-blue-300">目的：</span>{selectedQuery.purpose}
              </div>
            )}
            <textarea
              value={sql}
              onChange={e => { setSql(e.target.value); setRan(false); setResult(null); }}
              className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100"
              rows={4}
              spellCheck={false}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleRun}
                className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                运行 ▶
              </button>
              {selectedQuery?.warning && (
                <span className="rounded border border-orange-200 bg-orange-50 px-2 py-1 text-xs text-orange-600 dark:border-orange-800/60 dark:bg-orange-900/20 dark:text-orange-300">⚠ {selectedQuery.warning}</span>
              )}
            </div>
            {ran && result && (
              <div className="interactive-panel overflow-hidden">
                <div className="interactive-table-head px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400">执行结果</div>
                <div className="p-2">
                  {result.error && <div className="p-2 text-sm text-red-600 dark:text-red-300">{result.error}</div>}
                  {result.message && <div className="p-2 text-sm text-gray-600 dark:text-gray-400">{result.message}</div>}
                  {result.rows !== null && !result.error && <ResultTable rows={result.rows} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
