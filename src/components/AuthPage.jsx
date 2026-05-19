import { useState } from 'react'

async function callApi(url, payload) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || '请求失败')
  return data
}

export default function AuthPage({ onAuthed }) {
  const [tab, setTab] = useState('redeem')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [redeemForm, setRedeemForm] = useState({ code: '', username: '', password: '' })
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })

  const submitRedeem = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await callApi('/api/auth/redeem', redeemForm)
      onAuthed?.(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const submitLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await callApi('/api/auth/login', loginForm)
      onAuthed?.(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen app-shell text-slate-100 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 app-grid-overlay pointer-events-none" />
      <div className="relative w-full max-w-md glass-panel rounded-3xl border border-white/15 overflow-hidden shadow-2xl shadow-black/25">
        <div className="p-6 border-b border-white/10">
          <p className="text-[11px] tracking-[0.22em] uppercase text-cyan-300/80">QA Bootcamp</p>
          <h1 className="text-2xl font-semibold mt-2 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
            教程平台登录
          </h1>
          <p className="text-sm text-slate-300 mt-1">先激活账号，再开始学习</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 rounded-xl overflow-hidden border border-white/15 text-sm bg-white/5">
            <button
              onClick={() => setTab('redeem')}
              className={`py-2.5 transition-colors ${tab === 'redeem' ? 'bg-cyan-500/90 text-slate-950 font-semibold' : 'text-slate-300 hover:bg-white/10'}`}
            >
              激活账号
            </button>
            <button
              onClick={() => setTab('login')}
              className={`py-2.5 transition-colors ${tab === 'login' ? 'bg-cyan-500/90 text-slate-950 font-semibold' : 'text-slate-300 hover:bg-white/10'}`}
            >
              账号登录
            </button>
          </div>

          {error && <div className="text-sm rounded-lg bg-rose-500/15 border border-rose-400/40 text-rose-200 px-3 py-2">{error}</div>}

          {tab === 'redeem' ? (
            <form className="space-y-3" onSubmit={submitRedeem}>
              <input
                className="w-full border border-white/15 bg-white/5 rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                placeholder="授权码"
                value={redeemForm.code}
                onChange={(e) => setRedeemForm(prev => ({ ...prev, code: e.target.value }))}
                required
              />
              <input
                className="w-full border border-white/15 bg-white/5 rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                placeholder="用户名（4-32位）"
                value={redeemForm.username}
                onChange={(e) => setRedeemForm(prev => ({ ...prev, username: e.target.value }))}
                required
              />
              <input
                className="w-full border border-white/15 bg-white/5 rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                type="password"
                placeholder="密码（至少8位）"
                value={redeemForm.password}
                onChange={(e) => setRedeemForm(prev => ({ ...prev, password: e.target.value }))}
                required
              />
              <button
                disabled={loading}
                className="w-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl py-2.5 text-sm font-semibold transition-colors"
              >
                {loading ? '处理中...' : '激活并登录'}
              </button>
            </form>
          ) : (
            <form className="space-y-3" onSubmit={submitLogin}>
              <input
                className="w-full border border-white/15 bg-white/5 rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                placeholder="用户名"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                required
              />
              <input
                className="w-full border border-white/15 bg-white/5 rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                type="password"
                placeholder="密码"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                required
              />
              <button
                disabled={loading}
                className="w-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl py-2.5 text-sm font-semibold transition-colors"
              >
                {loading ? '登录中...' : '登录'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
