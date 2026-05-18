export const INLINE_CHECKS_09 = {
  q09_1: {
    id: 'q09_1',
    type: 'choice',
    question: '下面哪点最容易让一段测试项目经历显得“没区分度”？',
    options: ['只有职责罗列，没有数据和结果', '写清楚使用了哪些工具', '说明发现了多少高优 Bug', '讲清楚自己负责的链路'],
    answer: 0,
    explanation: '只堆职责名词却没有数字、结果和价值，很容易被视为模板化描述。',
  },
  q09_2: {
    id: 'q09_2',
    type: 'choice',
    question: '面试中被问“开发不认 Bug 怎么办”，更稳的回答顺序是哪项？',
    options: ['先吵赢对方再说', '先自查，再拿需求依据沟通，最后必要时拉产品确认', '直接升级给领导', '先把 Bug 优先级调到最高'],
    answer: 1,
    explanation: '先自证、再依据沟通、最后三方确认，是最职业也最稳的思路。',
  },
  q09_3: {
    id: 'q09_3',
    type: 'truefalse',
    question: '外包经历是否有价值，更多取决于你能不能把项目内容讲清楚。',
    answer: true,
    explanation: '经历本身不是原罪，关键在于你如何表达做了什么、怎么做、结果如何。',
  },
  q09_4: {
    id: 'q09_4',
    type: 'choice',
    question: '技术面尾声反问时，哪类问题更显得专业？',
    options: ['只问加班强度', '问团队工具链和新人如何接项目', '只问薪资上限', '表示没有问题'],
    answer: 1,
    explanation: '这类问题能体现你在认真理解岗位，而不是只关注外部条件。',
  },
  q09_5: {
    id: 'q09_5',
    type: 'truefalse',
    question: '简历应该用 Word 格式发送，因为 HR 改起来方便。',
    answer: false,
    explanation: '错误。Word 在不同电脑上格式可能错乱，必须导出 PDF 发送。',
  },
  q09_6: {
    id: 'q09_6',
    type: 'choice',
    question: '在 BOSS 直聘上和 HR 沟通的开场白，以下哪个最合适？',
    options: [
      '"您好"',
      '"贵司还招人吗？"',
      '"您好，看到贵司岗位招聘，我有 3 个匹配点：[具体技能]，方便聊聊吗？"',
      '"工资多少？"'
    ],
    answer: 2,
    explanation: '主动给出匹配点 + 明确诉求，是 HR 最愿意回复的方式。',
  },
  q09_7: {
    id: 'q09_7',
    type: 'choice',
    question: '零基础转行最有效的"作品集"是？',
    options: [
      '一句"参与过测试项目"',
      '完整可见的测试用例文档 + Bug 单 + 测试报告',
      '只放 GitHub 链接',
      '一张证书照片'
    ],
    answer: 1,
    explanation: '具体可见的产出物 > 抽象描述。视觉证据比口头描述强 10 倍。',
  },
}
