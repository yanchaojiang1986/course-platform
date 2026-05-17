export const INLINE_CHECKS_02 = {
  q02_1: {
    id: 'q02_1',
    type: 'choice',
    question: '软件测试在项目里最核心的角色是什么？',
    options: ['替开发写业务代码', '帮助发现缺陷并验证需求是否被正确实现', '只负责做汇报 PPT', '上线后才开始参与'],
    answer: 1,
    explanation: '测试的核心价值是发现问题、验证实现、评估风险，而不是替开发写业务代码。',
  },
  q02_2: {
    id: 'q02_2',
    type: 'choice',
    question: '黑盒测试最关注的是什么？',
    options: ['代码每一行是否执行过', '输入和输出是否符合需求', '服务器用了几台机器', '数据库用了什么存储引擎'],
    answer: 1,
    explanation: '黑盒测试不看内部实现，重点看输入后的输出是否符合预期。',
  },
  q02_3: {
    id: 'q02_3',
    type: 'truefalse',
    question: '测试思维里常说的“破坏性思维”，就是主动去想异常和非正常使用场景。',
    answer: true,
    explanation: '测试人员要比普通用户更爱“捣乱”，这样才更容易提前发现风险。',
  },
  q02_4: {
    id: 'q02_4',
    type: 'choice',
    question: 'PRD 对测试工作的意义，最准确的说法是哪项？',
    options: ['只是产品经理自己的笔记', '是测试理解需求和设计测试点的重要依据', '只在上线后才会用到', '主要给运维团队使用'],
    answer: 1,
    explanation: 'PRD 是测试设计用例和判断预期结果时的重要依据。',
  },
}
