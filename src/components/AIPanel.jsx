import { useState, useRef, useEffect } from 'react'

const TUTOR_SYSTEM = `你是一位专业的功能测试课程教辅助手，帮助正在学习软件测试的零基础转行学员。
职责：解释软件测试概念、结合实例回答问题、鼓励学员、只回答测试和IT职场相关问题。
课程覆盖：计算机基础、测试流程、用例设计、Bug管理、接口测试、Postman、MySQL、Linux、JIRA/禅道、求职面试。
回答要简洁友好，多用例子，用中文回答。`

const SOCRATIC_SYSTEM = `你是一位专业的软件测试课程教练，正在辅导一位零基础转行学员完成实战任务。

核心规则——苏格拉底教学法：
1. 永远不直接给出答案或完整解决方案
2. 当学员提问时，先用1-2个启发性问题引导他们自己思考
3. 当学员给出部分正确的回答时，肯定正确的部分，再用问题引导完善不足的地方
4. 只有当学员自己推导出正确结论后，才进行确认和补充延伸知识
5. 如果学员卡住超过2次，可以给出"提示"而非直接答案
6. 任务完成时，给出100分制综合评分（格式：【评分：XX/100】）并分析能力点

示例（正确做法）：
学员："等价类怎么用？"
教练："好问题！你先想想——密码框要求6-12位，理论上有无数种长度可以测。但你能把这些长度分成哪几个大类吗？"

示例（错误做法）：
学员："等价类怎么用？"
教练："等价类就是把输入分成有效类和无效类……"（×不对）

用中文回答，保持友好但不失专业的语气。`

const INTERVIEWER_SYSTEM = `你是一位经验丰富的互联网公司测试组长，正在面试一位初级功能测试岗位的零基础转行候选人。

面试风格：
- 先问开放性问题让候选人放松，再逐步深入技术问题
- 对错误答案给出追问而不是直接纠正，引导候选人思考
- 考察要点：项目经历（STAR法则）、测试方法、Bug处理、职场态度

面试结束时（候选人明确要求结束，或已回答5个以上问题时）：
给出【综合评分：XX/100】，并逐项分析：项目表达、测试思维、沟通态度、技术基础。

请用中文进行面试对话。每次只问一个问题，等候选人回答后再继续。`

const WELCOME = {
  tutor: '你好！我是你的 AI 教辅 🤖\n\n有任何关于功能测试的问题随时问我，比如：\n- 等价类和边界值有什么区别？\n- 怎么写一个好的 Bug 单？\n- Postman 怎么发 POST 请求？',
  socratic: '你好！我是你的实战教练 🎯\n\n我会用提问的方式引导你完成这个任务，不会直接给你答案——因为自己推导出来的结论才真正属于你。\n\n看完左侧的任务描述后，把你的第一步思路告诉我吧！',
  interview: '你好，我是今天的面试官 😊\n\n我们来做一次初级功能测试工程师的模拟面试。\n\n首先请简单自我介绍，并说说你为什么想转行做软件测试？',
}

function getSystemPrompt(mode, moduleContext) {
  if (mode === 'interview') return INTERVIEWER_SYSTEM
  if (mode === 'socratic') return SOCRATIC_SYSTEM + `\n\n当前任务模块：${moduleContext || ''}`
  return TUTOR_SYSTEM + `\n\n当前学员所在模块：${moduleContext || ''}`
}

export default function AIPanel({ mode = 'tutor', moduleContext, scenarioContext, onClose }) {
  const welcomeKey = mode === 'interview' ? 'interview' : mode === 'socratic' ? 'socratic' : 'tutor'
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME[welcomeKey] }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    setMessages([{ role: 'assistant', content: WELCOME[welcomeKey] }])
  }, [mode])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')

    const userMsg = { role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setLoading(true)
    setMessages([...history, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
          mode,
          moduleContext: scenarioContext || moduleContext,
          systemPrompt: getSystemPrompt(mode, scenarioContext || moduleContext),
        })
      })
      if (!res.ok) throw new Error('请求失败')

      const reader = res.body?.getReader()
      if (!reader) throw new Error('响应流不可读')
      const decoder = new TextDecoder()
      let accumulated = ''
      let sseBuffer = ''
      let streamDone = false

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        sseBuffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, '\n')

        let boundaryIndex
        while ((boundaryIndex = sseBuffer.indexOf('\n\n')) >= 0) {
          const eventBlock = sseBuffer.slice(0, boundaryIndex)
          sseBuffer = sseBuffer.slice(boundaryIndex + 2)

          for (const line of eventBlock.split('\n')) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6)
            if (data === '[DONE]') {
              streamDone = true
              break
            }
            try {
              accumulated += JSON.parse(data).text
              setMessages(prev => {
                const next = [...prev]
                next[next.length - 1] = { role: 'assistant', content: accumulated }
                return next
              })
            } catch { /* ignore malformed chunk */ }
          }

          if (streamDone) break
        }
        if (streamDone) break
      }

      // flush decoder and process any remaining partial event block
      sseBuffer += decoder.decode()
      if (sseBuffer.trim() && !streamDone) {
        for (const line of sseBuffer.split('\n')) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') break
          try {
            accumulated += JSON.parse(data).text
            setMessages(prev => {
              const next = [...prev]
              next[next.length - 1] = { role: 'assistant', content: accumulated }
              return next
            })
          } catch { /* ignore */ }
        }
      }
    } catch (err) {
      setMessages(prev => {
        const next = [...prev]
        next[next.length - 1] = { role: 'assistant', content: `抱歉，出错了：${err.message}` }
        return next
      })
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const headerConfig = {
    tutor:    { bg: 'bg-sky-500/10',     icon: '🤖', label: 'AI 教辅助手',  accent: 'text-sky-700 dark:text-sky-200' },
    socratic: { bg: 'bg-fuchsia-500/10', icon: '🎯', label: 'AI 实战教练', accent: 'text-fuchsia-700 dark:text-fuchsia-200' },
    interview:{ bg: 'bg-amber-500/10',   icon: '🎤', label: 'AI 面试官',   accent: 'text-amber-700 dark:text-amber-200' },
  }
  const hc = headerConfig[mode] || headerConfig.tutor

  return (
    <div className="flex flex-col xl:h-full border-t xl:border-t-0 xl:border-l border-themed bg-surface w-full max-w-full min-w-0 xl:max-w-[460px] xl:min-w-[320px]">
      <div className={`flex items-center justify-between px-4 py-3 border-b border-themed ${hc.bg} shrink-0`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{hc.icon}</span>
          <div>
            <div className="text-sm font-semibold text-fg-strong">{hc.label}</div>
            {mode === 'tutor' && moduleContext && (
              <div className="text-xs text-fg-muted">当前：{moduleContext}</div>
            )}
            {mode === 'socratic' && (
              <div className={`text-xs ${hc.accent}`}>苏格拉底模式·引导思考</div>
            )}
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-fg-muted hover:text-fg text-lg leading-none">×</button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-soft">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && <span className="text-base mr-2 mt-0.5 shrink-0">{hc.icon}</span>}
            <div className={m.role === 'user' ? 'bubble-user' : 'bubble-ai'}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.content}</p>
              {loading && i === messages.length - 1 && m.role === 'assistant' && !m.content && (
                <span className="inline-flex gap-1">
                  {[0, 150, 300].map(d => (
                    <span key={d} className="animate-bounce text-fg-faint text-lg" style={{ animationDelay: `${d}ms` }}>·</span>
                  ))}
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t border-themed bg-surface shrink-0">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder={mode === 'interview' ? '回答面试官的问题…' : mode === 'socratic' ? '说说你的思路…' : '问任何测试相关问题…'}
            className="flex-1 px-3 py-2 text-sm border border-themed bg-surface text-fg rounded-lg focus:outline-none focus:border-sky-400 placeholder:text-fg-faint"
            disabled={loading}
          />
          <button onClick={send} disabled={!input.trim() || loading}
            className="px-4 py-2 bg-sky-600 text-white text-sm rounded-lg hover:bg-sky-700 disabled:opacity-40 transition-colors">
            发送
          </button>
        </div>
        <p className="text-xs text-fg-faint mt-1.5 text-center">Enter 发送</p>
      </div>
    </div>
  )
}
