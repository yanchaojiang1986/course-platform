export const INLINE_CHECKS_08 = {
  q08_1: {
    id: 'q08_1',
    type: 'choice',
    question: '“基本流”在业务场景测试里通常指什么？',
    options: ['用户最顺利完成主目标的那条路径', '所有异常分支的合集', '性能压测脚本', '项目排期计划'],
    answer: 0,
    explanation: '基本流就是用户按预期顺利走通主流程的那条路径。',
  },
  q08_2: {
    id: 'q08_2',
    type: 'truefalse',
    question: '写项目经历时，只写“负责测试某系统”就足够有说服力。',
    answer: false,
    explanation: '真正有说服力的是数字、工具、结果和你解决的问题。',
  },
  q08_3: {
    id: 'q08_3',
    type: 'choice',
    question: '发现一个现象不确定是不是 Bug，最稳妥的处理方式是什么？',
    options: ['默认认为不是 Bug', '先对照 PRD/原型，必要时找产品确认', '直接提单给开发判断', '先忽略'],
    answer: 1,
    explanation: '需求文档是第一判断依据，不清楚时要拉产品澄清。',
  },
  q08_4: {
    id: 'q08_4',
    type: 'truefalse',
    question: '如果本轮测试漏掉了一个场景，也不需要在测试报告里说明。',
    answer: false,
    explanation: '漏测本身就是风险，应该在报告里明确记录和说明。',
  },
}
