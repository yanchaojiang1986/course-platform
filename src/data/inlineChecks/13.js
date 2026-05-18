export const INLINE_CHECKS_13 = {
  q13_1: {
    id: 'q13_1',
    type: 'choice',
    question: '设计 Web 兼容性测试矩阵，应该优先覆盖哪个浏览器？',
    options: ['Firefox', 'Chrome', 'Safari', '360 浏览器'],
    answer: 1,
    explanation: 'Chrome 占 65%+ 市场，必须 P0 必测。',
  },
  q13_2: {
    id: 'q13_2',
    type: 'choice',
    question: 'Android 测试机型矩阵设计，下列哪条最合理？',
    options: [
      '只测最新旗舰机',
      '覆盖主流厂商 + 不同系统版本 + 折叠/异形屏',
      '挑最便宜的几款',
      '看哪款手机有就用哪款'
    ],
    answer: 1,
    explanation: 'Android 碎片化严重，必须覆盖主流厂商、系统版本、屏幕形态。',
  },
  q13_3: {
    id: 'q13_3',
    type: 'choice',
    question: "在评论框输入 `<script>alert('xss')</script>` 并提交，刷新后弹出对话框，说明？",
    options: [
      '正常功能',
      '存在 XSS 漏洞',
      '浏览器问题',
      'JS 加载成功'
    ],
    answer: 1,
    explanation: 'XSS 漏洞——后端未对用户输入的 HTML 标签做转义。',
  },
  q13_4: {
    id: 'q13_4',
    type: 'truefalse',
    question: '用普通账号 token 调管理员接口能成功，这属于水平越权。',
    answer: false,
    explanation: '这是垂直越权（跨角色权限提升）。水平越权是同级用户访问彼此数据。',
  },
  q13_5: {
    id: 'q13_5',
    type: 'choice',
    question: '发现一个高危安全 Bug，最合适的提单方式是？',
    options: [
      '在 JIRA 标题里详细写攻击 payload',
      '在公开群里讨论复现步骤',
      '标题模糊描述，详细步骤通过 IM 私聊负责人',
      '直接修复不提单'
    ],
    answer: 2,
    explanation: '安全 Bug 必须保密。公开渠道贴 payload 等于教别人攻击。',
  },
}
