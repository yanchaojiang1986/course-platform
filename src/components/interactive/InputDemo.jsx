import { useState } from 'react';

function EquivalenceMode({ data }) {
  const { scenario, input_label, input_type, rules, tip } = data;
  const [value, setValue] = useState('');

  const analyzeClass = (val) => {
    if (!val) return null;
    const { valid_class, invalid_classes = [] } = rules || {};
    for (const cls of invalid_classes) {
      if (matchCondition(val, cls.condition)) return { ...cls, isValid: false };
    }
    if (valid_class && matchCondition(val, valid_class.condition)) return { ...valid_class, isValid: true };
    return null;
  };

  const matchCondition = (val, condition) => {
    if (!condition) return false;
    const c = condition.toLowerCase();
    if (c.includes('letters only') || c.includes('只含字母')) return /^[a-zA-Z]+$/.test(val);
    if (c.includes('numbers only') || c.includes('只含数字')) return /^\d+$/.test(val);
    if (c.includes('alphanumeric') || c.includes('字母数字')) return /^[a-zA-Z0-9]+$/.test(val);
    if (c.includes('empty') || c.includes('空')) return val.trim() === '';
    if (c.includes('special') || c.includes('特殊')) return /[^a-zA-Z0-9]/.test(val);
    const rangeMatch = c.match(/(\d+)\s*[-~]\s*(\d+)\s*(chars?|字符|位)/);
    if (rangeMatch) {
      const [, min, max] = rangeMatch;
      return val.length >= parseInt(min) && val.length <= parseInt(max);
    }
    const ltMatch = c.match(/<\s*(\d+)/);
    if (ltMatch) return val.length < parseInt(ltMatch[1]);
    const gtMatch = c.match(/>\s*(\d+)/);
    if (gtMatch) return val.length > parseInt(gtMatch[1]);
    return false;
  };

  const result = analyzeClass(value);
  const { valid_class, invalid_classes = [] } = rules || {};

  return (
    <div className="space-y-4">
      {scenario && <p className="text-sm text-gray-600">{scenario}</p>}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{input_label || '请输入'}</label>
        <input
          type={input_type || 'text'}
          value={value}
          onChange={e => setValue(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100"
          placeholder="输入内容以查看等价类分析…"
        />
      </div>
      {value && result && (
        <div className={`flex items-center gap-2 p-3 rounded-lg border text-sm font-medium`}
          style={{ backgroundColor: result.color + '20', borderColor: result.color, color: result.color }}>
          <span>{result.isValid ? '✓ 有效等价类' : '✗ 无效等价类'}：{result.label}</span>
        </div>
      )}
      {value && !result && (
        <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-500 dark:border-slate-700 dark:bg-slate-800/50 dark:text-gray-400">
          未匹配到任何等价类
        </div>
      )}
      <div className="interactive-panel overflow-hidden">
        <div className="interactive-table-head px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400">等价类参考表</div>
        <table className="w-full text-xs">
          <thead>
            <tr className="interactive-table-head">
              <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400">类型</th>
              <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400">标签</th>
              <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400">条件</th>
              <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400">示例</th>
            </tr>
          </thead>
          <tbody>
            {valid_class && (
              <tr className="interactive-table-row">
                <td className="px-3 py-2"><span className="px-1.5 py-0.5 rounded text-white text-xs" style={{ backgroundColor: valid_class.color }}>有效</span></td>
                <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{valid_class.label}</td>
                <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{valid_class.condition}</td>
                <td className="px-3 py-2 font-mono text-gray-500 dark:text-gray-400">{valid_class.example}</td>
              </tr>
            )}
            {invalid_classes.map((cls, i) => (
              <tr key={i} className="interactive-table-row last:border-0">
                <td className="px-3 py-2"><span className="px-1.5 py-0.5 rounded text-white text-xs" style={{ backgroundColor: cls.color }}>无效</span></td>
                <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{cls.label}</td>
                <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{cls.condition}</td>
                <td className="px-3 py-2 font-mono text-gray-500 dark:text-gray-400">{cls.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tip && <p className="rounded border border-yellow-200 bg-yellow-50 p-2 text-xs text-yellow-700 dark:border-yellow-800/60 dark:bg-yellow-900/20 dark:text-yellow-300">{tip}</p>}
    </div>
  );
}

function BoundaryMode({ data }) {
  const { scenario, input_label, input_type, show_length_counter, boundary_table = [], tip } = data;
  const [value, setValue] = useState('');

  const getMatchingBoundary = (len) => {
    let best = null;
    for (const row of boundary_table) {
      if (row.length === len) return row;
      if (row.length !== undefined && Math.abs(row.length - len) < Math.abs((best?.length ?? Infinity) - len)) {
        best = row;
      }
    }
    return best;
  };

  const len = value.length;
  const matched = getMatchingBoundary(len);

  return (
    <div className="space-y-4">
      {scenario && <p className="text-sm text-gray-600">{scenario}</p>}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">{input_label || '请输入'}</label>
        <div className="relative">
          <input
            type={input_type || 'text'}
            value={value}
            onChange={e => setValue(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-16 text-sm text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100"
            placeholder="输入内容以查看边界值分析…"
          />
          {show_length_counter && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500">{len} 字符</span>
          )}
        </div>
      </div>
      {value && matched && (
        <div className="p-3 rounded-lg border text-sm font-medium"
          style={{ backgroundColor: matched.color + '20', borderColor: matched.color, color: matched.color }}>
          当前长度 {len}：{matched.desc} — {matched.expected}
        </div>
      )}
      <div className="interactive-panel overflow-hidden">
        <div className="interactive-table-head px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400">边界值测试点</div>
        <table className="w-full text-xs">
          <thead>
            <tr className="interactive-table-head">
              <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400">长度</th>
              <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400">描述</th>
              <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400">预期结果</th>
            </tr>
          </thead>
          <tbody>
            {boundary_table.map((row, i) => (
              <tr key={i} className={`interactive-table-row last:border-0 ${len === row.length ? 'font-semibold' : ''}`}
                style={len === row.length ? { backgroundColor: row.color + '15' } : {}}>
                <td className="px-3 py-2">
                  <span className="px-1.5 py-0.5 rounded text-white text-xs" style={{ backgroundColor: row.color }}>{row.length}</span>
                </td>
                <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{row.desc}</td>
                <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{row.expected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tip && <p className="rounded border border-yellow-200 bg-yellow-50 p-2 text-xs text-yellow-700 dark:border-yellow-800/60 dark:bg-yellow-900/20 dark:text-yellow-300">{tip}</p>}
    </div>
  );
}

export default function InputDemo({ data }) {
  const { title } = data;
  const isEquivalence = !!data.rules;

  return (
    <div className="interactive-card">
      {title && (
        <div className="interactive-card-header">
          <span aria-hidden>⌨️</span>
          <h3 className="interactive-card-title">{title}</h3>
        </div>
      )}
      <div className="interactive-card-body">
        {isEquivalence ? <EquivalenceMode data={data} /> : <BoundaryMode data={data} />}
      </div>
    </div>
  );
}
