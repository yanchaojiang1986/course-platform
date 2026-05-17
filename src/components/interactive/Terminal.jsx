import { useState, useEffect, useRef } from 'react';

function TerminalOutput({ lines }) {
  const [visible, setVisible] = useState([]);
  const prevLines = useRef([]);

  useEffect(() => {
    if (JSON.stringify(lines) === JSON.stringify(prevLines.current)) return;
    prevLines.current = lines;
    setVisible([]);
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisible(prev => [...prev, line]);
      }, i * 50);
    });
  }, [lines]);

  return (
    <>
      {visible.map((line, i) => (
        <div key={i} className={`font-mono text-sm leading-relaxed ${line.startsWith('# ') ? 'text-yellow-400' : 'text-gray-100'}`}>
          {line}
        </div>
      ))}
    </>
  );
}

function ScenarioView({ scenario, prompt }) {
  const outputLines = scenario.output ? scenario.output.split('\n') : [];
  const nextOutputLines = scenario.next_output ? scenario.next_output.split('\n') : [];

  return (
    <div className="p-4 space-y-1">
      <div className="flex items-center gap-2 font-mono text-sm">
        <span className="text-green-400">{prompt}</span>
        <span className="text-green-300">{scenario.command}</span>
      </div>
      {outputLines.length > 0 && <TerminalOutput lines={outputLines} />}
      {scenario.tip && (
        <div className="text-yellow-400 text-xs mt-1 font-mono"># {scenario.tip}</div>
      )}
      {scenario.next_command && (
        <>
          <div className="flex items-center gap-2 font-mono text-sm mt-2">
            <span className="text-green-400">{prompt}</span>
            <span className="text-green-300">{scenario.next_command}</span>
          </div>
          {nextOutputLines.length > 0 && <TerminalOutput lines={nextOutputLines} />}
        </>
      )}
      <div className="flex items-center gap-1 font-mono text-sm">
        <span className="text-green-400">{prompt}</span>
        <span className="w-2 h-4 bg-green-400 animate-pulse inline-block ml-0.5"></span>
      </div>
    </div>
  );
}

export default function Terminal({ data }) {
  const { title, prompt = 'tester@server:~$', scenarios = [] } = data;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="interactive-card">
      {title && (
        <div className="interactive-card-header">
          <span aria-hidden>💻</span>
          <h3 className="interactive-card-title">{title}</h3>
        </div>
      )}
      <div className="border-b border-gray-700 bg-gray-800 px-4 py-2 dark:border-gray-800 dark:bg-gray-900">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        {scenarios.length > 1 && (
          <div className="ml-4 flex gap-1">
            {scenarios.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-3 py-0.5 rounded text-xs font-medium transition ${activeTab === i ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200'}`}
              >
                {s.name || `场景 ${i + 1}`}
              </button>
            ))}
          </div>
        )}
      </div>
      <div style={{ backgroundColor: '#1a1a1a' }} className="min-h-40">
        {scenarios[activeTab] && (
          <ScenarioView
            key={activeTab}
            scenario={scenarios[activeTab]}
            prompt={prompt}
          />
        )}
      </div>
    </div>
  );
}
