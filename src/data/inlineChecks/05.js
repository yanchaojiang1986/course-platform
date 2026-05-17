export const INLINE_CHECKS_05 = {
  q05_1: {
    id: 'q05_1',
    type: 'choice',
    question: '一条高质量 Bug 标题通常至少要包含什么？',
    options: ['环境、操作、结果', '作者心情、截图数量、需求链接', '谁发现的、几点提交的、工时', '版本号就够了'],
    answer: 0,
    explanation: '好的标题要让开发一眼知道在什么环境、做了什么、出了什么问题。',
  },
  q05_2: {
    id: 'q05_2',
    type: 'choice',
    question: '开发把 Bug 状态改成 Fixed 后，测试下一步最合理的动作是什么？',
    options: ['直接关闭', '重新复测，确认修好再关闭', '等下个版本再说', '转给产品经理'],
    answer: 1,
    explanation: 'Fixed 只是开发声明“我改好了”，真正关闭前必须经过测试复测。',
  },
  q05_3: {
    id: 'q05_3',
    type: 'choice',
    question: '哪类问题最符合 P0 Bug？',
    options: ['按钮边距不齐', '搜索排序偶发异常', '系统崩溃或核心资金链路严重受损', '帮助文档打不开'],
    answer: 2,
    explanation: 'P0 代表阻断性或灾难性问题，必须优先处理。',
  },
  q05_4: {
    id: 'q05_4',
    type: 'truefalse',
    question: 'Bug 的严重程度和优先级在任何情况下都完全一样。',
    answer: false,
    explanation: '严重程度看影响本身，优先级看修复顺序，两者经常相关但不总是相同。',
  },
}
