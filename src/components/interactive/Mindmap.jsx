import { useState } from 'react';

const BRANCH_COLORS = [
  { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-700', light: 'bg-blue-50 border-blue-200' },
  { bg: 'bg-purple-500', border: 'border-purple-500', text: 'text-purple-700', light: 'bg-purple-50 border-purple-200' },
  { bg: 'bg-orange-500', border: 'border-orange-500', text: 'text-orange-700', light: 'bg-orange-50 border-orange-200' },
  { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-700', light: 'bg-green-50 border-green-200' },
  { bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-700', light: 'bg-red-50 border-red-200' },
  { bg: 'bg-cyan-500', border: 'border-cyan-500', text: 'text-cyan-700', light: 'bg-cyan-50 border-cyan-200' },
];

export default function Mindmap({ data }) {
  const { title, root, branches = [] } = data;
  const [collapsed, setCollapsed] = useState({});

  const toggleBranch = (idx) => {
    setCollapsed(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="my-6 rounded-xl border bg-white p-5 shadow-sm">
      {title && <h3 className="text-base font-semibold text-gray-700 mb-4">{title}</h3>}
      <div className="overflow-x-auto">
        <div className="flex items-start gap-0 min-w-max">
          <div className="flex items-center self-center">
            <div className="bg-blue-900 text-white text-sm font-bold px-4 py-3 rounded-xl shadow-md whitespace-nowrap">
              {root}
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            {branches.map((branch, idx) => {
              const color = BRANCH_COLORS[idx % BRANCH_COLORS.length];
              const isCollapsed = collapsed[idx];
              return (
                <div key={idx} className="flex items-start">
                  <div className="flex items-center">
                    <div className="w-0 h-0.5 bg-gray-300"></div>
                    <button
                      onClick={() => toggleBranch(idx)}
                      className={`${color.bg} text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap flex items-center gap-1 hover:opacity-90 transition-opacity`}
                    >
                      <span>{branch.name}</span>
                      <span className="text-xs opacity-75">{isCollapsed ? '▶' : '▾'}</span>
                    </button>
                    {!isCollapsed && branch.children && branch.children.length > 0 && (
                      <div className="w-4 h-0.5 bg-gray-300"></div>
                    )}
                  </div>
                  {!isCollapsed && branch.children && branch.children.length > 0 && (
                    <div className="flex flex-col gap-1.5 justify-center relative">
                      <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-gray-200"></div>
                      {branch.children.map((child, cidx) => (
                        <div key={cidx} className="flex items-center">
                          <div className="w-4 h-0.5 bg-gray-200"></div>
                          <span className={`text-xs px-2.5 py-1 rounded-md border ${color.light} ${color.text} whitespace-nowrap`}>
                            {child}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
