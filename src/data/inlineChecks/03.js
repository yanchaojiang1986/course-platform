export const INLINE_CHECKS_03 = {
  q03_1: {
    id: 'q03_1',
    type: 'choice',
    question: '“测试左移”更强调测试人员在哪个阶段尽早介入？',
    options: ['需求评审和开发阶段', '只有上线前一天', 'Bug 爆发后', '验收失败后'],
    answer: 0,
    explanation: '测试左移强调越早介入越好，最好在需求和开发阶段就开始参与。',
  },
  q03_2: {
    id: 'q03_2',
    type: 'choice',
    question: '每日站会最重要的价值是什么？',
    options: ['展示谁最忙', '快速同步进展、计划和阻塞', '详细讨论所有技术方案', '统一评判谁做得不好'],
    answer: 1,
    explanation: '站会的目的不是展开大讨论，而是快速同步状态与风险。',
  },
  q03_3: {
    id: 'q03_3',
    type: 'truefalse',
    question: '开发不认 Bug 时，测试第一步应该先核对复现步骤和需求依据。',
    answer: true,
    explanation: '先自查和拿依据沟通，能减少无效争论，再视情况拉产品确认。',
  },
  q03_6: {
    id: 'q03_6',
    type: 'choice',
    question: '长期维护一个复杂模块，最能降低回归遗漏的做法是什么？',
    options: ['每次都临场自由发挥', '维护回归清单并随版本更新重点场景', '只测新增按钮', '线上出问题再补测'],
    answer: 1,
    explanation: '回归基线是长期项目里最重要的稳定器之一。',
  },
}
