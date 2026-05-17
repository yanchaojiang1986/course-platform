export const INLINE_CHECKS_11 = {
  q11_1: {
    id: 'q11_1',
    type: 'choice',
    question: 'HTTP 500 更准确地表示什么？',
    options: ['请求成功', '资源未找到', '服务器内部处理出错', '用户没有网络'],
    answer: 2,
    explanation: '500 代表服务器侧发生了内部错误，通常需要结合日志继续排查。',
  },
  q11_2: {
    id: 'q11_2',
    type: 'choice',
    question: '哪种情况更符合 P1 问题？',
    options: ['页面文案错别字', '核心主流程不通，但系统没有整体崩溃', '字体大小不一致', '头像轻微偏移'],
    answer: 1,
    explanation: 'P1 一般是核心业务严重受影响，但尚未达到系统完全崩溃。',
  },
  q11_3: {
    id: 'q11_3',
    type: 'truefalse',
    question: 'AI 生成的测试用例或分析结果，仍然需要人工审查后再使用。',
    answer: true,
    explanation: 'AI 是辅助提效工具，不能替代人工对业务和风险的判断。',
  },
  q11_4: {
    id: 'q11_4',
    type: 'choice',
    question: '让 AI 帮你分析错误日志时，哪种提问方式通常更有效？',
    options: ['只说“帮我看下”', '给出角色、背景、完整日志和明确任务', '只贴一行报错不加说明', '直接说“帮我修好”'],
    answer: 1,
    explanation: '高质量 Prompt 一般包含角色、上下文、原始材料和明确输出要求。',
  },
}
