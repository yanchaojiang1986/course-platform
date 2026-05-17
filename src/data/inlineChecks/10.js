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
}
