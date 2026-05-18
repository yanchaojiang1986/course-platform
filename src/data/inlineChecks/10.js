export const INLINE_CHECKS_10 = {
  q10_1: {
    id: 'q10_1',
    type: 'choice',
    question: '入职后第一次执行回归用例前，最合理的动作是什么？',
    options: ['先理解业务目标和正常流程', '直接开始点，不懂再说', '先否定现有用例', '只挑最简单的做'],
    answer: 0,
    explanation: '不知道“正常应该怎样”，就很难判断“哪里异常”。',
  },
  q10_2: {
    id: 'q10_2',
    type: 'choice',
    question: '功能测试工程师最常见的技术进阶方向是哪条？',
    options: ['自动化测试工程师', 'UI 设计师', '纯运营岗位', '行政管理岗位'],
    answer: 0,
    explanation: '功能测试继续向自动化演进，是最常见也最主流的成长路径之一。',
  },
  q10_3: {
    id: 'q10_3',
    type: 'truefalse',
    question: '只要开发和产品口头说可以，就能跳过正式提测流程直接上线。',
    answer: false,
    explanation: '测试工作必须留痕并走流程，口头许可不能替代正式验证和记录。',
  },
  q10_4: {
    id: 'q10_4',
    type: 'choice',
    question: '从功能测试转自动化测试，最有效的第一步是？',
    options: [
      '直接辞职去培训班',
      '在本职工作中"抠"出实践机会（如 Postman Runner、Newman 接入 Jenkins）',
      '等公司主动给你转岗',
      '只看书学语法'
    ],
    answer: 1,
    explanation: '在工作中找机会落地是最快的成长方式。等机会不如造机会。',
  },
  q10_5: {
    id: 'q10_5',
    type: 'choice',
    question: '中级测试工程师 vs 初级，最核心的差距是？',
    options: [
      '工龄长短',
      '能独立设计测试方案、用代码搭框架、识别系统性风险',
      '会用更多工具',
      '加班时间更长'
    ],
    answer: 1,
    explanation: '中级是"会设计方案+会写自动化+有系统思维"。光会用工具不算中级。',
  },
}
