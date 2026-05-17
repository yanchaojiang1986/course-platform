import { useState } from 'react'

const BRANCH_COLORS = [
  { bg: 'bg-blue-500', ring: 'focus-visible:ring-blue-300 dark:focus-visible:ring-blue-500', text: 'text-blue-700 dark:text-blue-300', light: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800', line: 'border-blue-300 dark:border-blue-700' },
  { bg: 'bg-purple-500', ring: 'focus-visible:ring-purple-300 dark:focus-visible:ring-purple-500', text: 'text-purple-700 dark:text-purple-300', light: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800', line: 'border-purple-300 dark:border-purple-700' },
  { bg: 'bg-orange-500', ring: 'focus-visible:ring-orange-300 dark:focus-visible:ring-orange-500', text: 'text-orange-700 dark:text-orange-300', light: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800', line: 'border-orange-300 dark:border-orange-700' },
  { bg: 'bg-green-500', ring: 'focus-visible:ring-green-300 dark:focus-visible:ring-green-500', text: 'text-green-700 dark:text-green-300', light: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800', line: 'border-green-300 dark:border-green-700' },
  { bg: 'bg-rose-500', ring: 'focus-visible:ring-rose-300 dark:focus-visible:ring-rose-500', text: 'text-rose-700 dark:text-rose-300', light: 'bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800', line: 'border-rose-300 dark:border-rose-700' },
  { bg: 'bg-cyan-500', ring: 'focus-visible:ring-cyan-300 dark:focus-visible:ring-cyan-500', text: 'text-cyan-700 dark:text-cyan-300', light: 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-200 dark:border-cyan-800', line: 'border-cyan-300 dark:border-cyan-700' },
]

function LeafList({ leaves, color }) {
  if (!leaves || leaves.length === 0) return null
  return (
    <div className="flex flex-col justify-center">
      {leaves.map((leaf, idx) => {
        const isFirst = idx === 0
        const isLast = idx === leaves.length - 1
        const isOnly = leaves.length === 1

        return (
          <div key={idx} className="relative flex items-center py-1.5 pl-6">
            {/* 子节点连线：使用圆角边框模拟曲线过渡 */}
            {!isOnly && (
              <div
                className={`absolute left-0 w-4 border-l-2 ${color.line} ${isFirst
                  ? 'top-1/2 bottom-0 rounded-tl-xl border-t-2'
                  : isLast
                    ? 'top-0 bottom-1/2 rounded-bl-xl border-b-2'
                    : 'inset-y-0'
                  }`}
              />
            )}

            {/* 中间节点的横向分支连线 */}
            {(!isFirst && !isLast && !isOnly) && (
              <div className={`absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-current ${color.text} opacity-30`} />
            )}

            {/* 唯一节点的直连线 */}
            {isOnly && (
              <div className={`absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-current ${color.text} opacity-30`} />
            )}

            {/* 短横线连接到卡片 */}
            {!isOnly && (isFirst || isLast) && (
              <div className={`absolute left-4 top-1/2 h-[2px] w-2 -translate-y-1/2 bg-current ${color.text} opacity-30`} />
            )}

            <span
              className={`z-10 whitespace-nowrap rounded-md border px-3 py-1.5 text-[13px] leading-tight shadow-sm transition-all hover:shadow-md ${color.light} ${color.text}`}
            >
              {leaf}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function BranchList({ branches, collapsed, toggleBranch }) {
  return (
    <div className="flex flex-col justify-center">
      {branches.map((branch, idx) => {
        const isFirst = idx === 0
        const isLast = idx === branches.length - 1
        const isOnly = branches.length === 1
        const color = BRANCH_COLORS[idx % BRANCH_COLORS.length]
        const isCollapsed = Boolean(collapsed[idx])
        const children = Array.isArray(branch.children) ? branch.children : []
        const hasChildren = !isCollapsed && children.length > 0

        return (
          <div key={idx} className="relative flex items-center py-3 pl-8">
            {/* 分支主轴连线：带圆角的平滑过渡 */}
            {!isOnly && (
              <div
                className={`absolute left-0 w-5 border-l-2 border-gray-200 dark:border-slate-700 ${isFirst
                  ? 'top-1/2 bottom-0 rounded-tl-xl border-t-2'
                  : isLast
                    ? 'top-0 bottom-1/2 rounded-bl-xl border-b-2'
                    : 'inset-y-0'
                  }`}
              />
            )}

            {/* 中间分支的横向连线 */}
            {(!isFirst && !isLast && !isOnly) && (
              <div className="absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 bg-gray-200 dark:bg-slate-700" />
            )}

            {/* 唯一分支的直连线 */}
            {isOnly && (
              <div className="absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 bg-gray-200 dark:bg-slate-700" />
            )}

            {/* 接驳到按钮的短横线 */}
            {!isOnly && (isFirst || isLast) && (
              <div className="absolute left-5 top-1/2 h-[2px] w-3 -translate-y-1/2 bg-gray-200 dark:bg-slate-700" />
            )}

            <div className="flex items-center">
              <button
                onClick={() => toggleBranch(idx)}
                className={`${color.bg} ${color.ring} z-10 flex min-h-[36px] touch-manipulation items-center gap-2 whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-medium text-white shadow-sm ring-2 ring-transparent transition-all hover:scale-[1.02] hover:shadow-md focus:outline-none active:scale-95`}
              >
                <span>{branch.name}</span>
                {children.length > 0 && (
                  <div aria-hidden className={`flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[9px] transition-transform ${isCollapsed ? '' : 'rotate-180'}`}>
                    ▼
                  </div>
                )}
              </button>

              {/* 分支到子节点的根连线 */}
              {hasChildren && (
                <>
                  <div className={`h-[2px] w-5 shrink-0 bg-current ${color.text} opacity-30`} />
                  <LeafList leaves={children} color={color} />
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Mindmap({ data }) {
  const { title, root, branches = [] } = data || {}
  const [collapsed, setCollapsed] = useState({})

  const toggleBranch = (idx) => {
    setCollapsed((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className="interactive-card my-8 rounded-2xl border-gray-100 bg-[#FAFAFA] dark:border-slate-800 dark:bg-slate-900/50">
      {title && (
        <div className="interactive-card-header px-6 py-4">
          <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">{title}</h3>
        </div>
      )}

      <div className="overflow-x-auto p-8">
        <div className="flex min-w-max items-center gap-0">
          {/* 根节点：更饱满的圆角和阴影 */}
          <div className="z-10 shrink-0 whitespace-nowrap rounded-xl bg-slate-800 dark:bg-slate-700 px-6 py-4 text-sm font-bold tracking-wide text-white shadow-lg ring-4 ring-slate-800/10 dark:ring-slate-700/30">
            {root}
          </div>

          {branches.length > 0 && (
            <>
              {/* 根节点到分支主轴的粗横线 */}
              <div className="h-[2px] w-6 shrink-0 bg-gray-200 dark:bg-slate-700" />
              <BranchList branches={branches} collapsed={collapsed} toggleBranch={toggleBranch} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
