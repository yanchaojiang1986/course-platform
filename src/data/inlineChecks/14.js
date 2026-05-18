export const INLINE_CHECKS_14 = {
  q14_1: {
    id: 'q14_1',
    type: 'truefalse',
    question: '在同一个页面发现 5 个不同的 UI 问题，可以合并到 1 张 Bug 单提交。',
    answer: false,
    explanation: '一个 Bug 一张单。合并提交会导致部分被忽略、追踪困难。',
  },
  q14_2: {
    id: 'q14_2',
    type: 'choice',
    question: '开发让你紧急测一个"小改动"不需要回归，你应该？',
    options: [
      '相信开发，跳过回归',
      '至少跑一次冒烟测试，因为小改动也可能引发连锁影响',
      '只测改动那个字段',
      '让开发自己测'
    ],
    answer: 1,
    explanation: '任何代码改动都至少跑冒烟。"小改动"往往影响范围最大（开发不主动告知）。',
  },
  q14_3: {
    id: 'q14_3',
    type: 'choice',
    question: '产品口头说"按钮挪一下"，作为测试你应该？',
    options: [
      '立即按这个测',
      '要求落实到 PRD 或群里发书面通知',
      '告诉开发改',
      '忽略'
    ],
    answer: 1,
    explanation: '口头变更必须书面留痕，避免后续争议。',
  },
  q14_4: {
    id: 'q14_4',
    type: 'truefalse',
    question: '上线后发现漏测 Bug，第一反应应该是先解释"为什么没人告诉我"。',
    answer: false,
    explanation: '错误。第一时间是解决问题，事后才复盘原因。甩锅是大忌。',
  },
  q14_5: {
    id: 'q14_5',
    type: 'choice',
    question: '面对老板的"为什么这个 Bug 没测出来"，最专业的回应方式是？',
    options: [
      '"因为开发没告诉我"',
      '"因为时间太紧"',
      '"是我覆盖不足，我已经把这个场景加入回归用例，避免再发生"',
      '"产品需求没写清楚"'
    ],
    answer: 2,
    explanation: '承认问题 + 拿出改进措施。这是体现专业度和成长心态的最佳话术。',
  },
}
