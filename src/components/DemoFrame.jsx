import { useState } from 'react'

const DEMOS = {
  register: { title: '用户注册表单', url: '/demo/register.html', desc: '找出表单中预埋的验证 Bug' },
  shop:     { title: '购物车应用',   url: '/demo/shop.html',     desc: '发现购物车中的计算和交互 Bug' },
  weather:  { title: '天气查询应用', url: '/demo/weather.html',  desc: '测试天气查询接口的异常场景' },
}

export default function DemoFrame({ demoId }) {
  const [expanded, setExpanded] = useState(false)
  const demo = DEMOS[demoId]
  if (!demo) return null

  return (
    <div className={`border border-gray-200 rounded-xl overflow-hidden bg-white transition-all ${expanded ? 'h-[600px]' : 'h-auto'}`}>
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-base">🖥️</span>
          <div>
            <div className="text-sm font-semibold text-gray-800">{demo.title}</div>
            <div className="text-xs text-gray-500">{demo.desc}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href={demo.url} target="_blank" rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline px-2 py-1">
            新窗口打开 ↗
          </a>
          <button
            onClick={() => setExpanded(e => !e)}
            className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {expanded ? '收起' : '展开演示'}
          </button>
        </div>
      </div>
      {expanded && (
        <iframe
          src={demo.url}
          className="w-full"
          style={{ height: 552, border: 'none' }}
          title={demo.title}
          sandbox="allow-scripts allow-forms allow-same-origin"
        />
      )}
    </div>
  )
}
