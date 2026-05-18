export const INLINE_CHECKS_12 = {
  q12_1: {
    id: 'q12_1',
    type: 'choice',
    question: '性能测试中最常被混淆的两个概念是？',
    options: [
      'TPS 和响应时间',
      '并发数和在线用户数',
      'CPU 和内存',
      '前端和后端'
    ],
    answer: 1,
    explanation: '并发数 = 同时操作系统的人数；在线用户数 = 登录但不一定操作的人数。两者差几十倍。',
  },
  q12_2: {
    id: 'q12_2',
    type: 'choice',
    question: '只看平均响应时间会有什么风险？',
    options: [
      '没风险，平均值最准',
      '可能掩盖长尾问题——少数极慢请求拉不动平均值，但用户实际体验很差',
      '平均值偏高',
      '不能算 TPS'
    ],
    answer: 1,
    explanation: '必须看 P95/P99。99 个 100ms + 1 个 30s，平均才 400ms 但 P99=30s。',
  },
  q12_3: {
    id: 'q12_3',
    type: 'truefalse',
    question: '弱网测试只用 4G 模拟就够，因为 5G 普及了 2G/3G 不必再测。',
    answer: false,
    explanation: '高铁、地下车库、电梯里仍可能是 2G。极端场景必测。',
  },
  q12_4: {
    id: 'q12_4',
    type: 'choice',
    question: '提交订单时连点 3 次，结果创建了 3 个订单，这说明？',
    options: [
      '正常功能',
      '幂等性失败，存在严重风险',
      'UI 设计问题',
      '网络问题'
    ],
    answer: 1,
    explanation: '幂等性失败可能导致重复下单、重复扣款，是 P0 级问题。',
  },
  q12_5: {
    id: 'q12_5',
    type: 'choice',
    question: '性能 Bug 应该怎么描述？',
    options: [
      '"系统很卡"',
      '"在 100 并发下，订单接口 P95 从 800ms 涨到 4.5 秒，错误率从 0.05% 涨到 2.3%"',
      '"很慢"',
      '"开发自己看看"'
    ],
    answer: 1,
    explanation: '性能问题必须用具体数字描述，包含并发数、响应时间、错误率等指标。',
  },
}
