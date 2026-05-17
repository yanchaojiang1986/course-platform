export const INLINE_CHECKS_11 = {
  q11_1: {
    id: 'q11_1',
    type: 'choice',
    question: 'HTTP 500 更准确地表示什么？',
    options: ['请求成功', '资源未找到', '服务器内部处理出错', '用户没有网络'],
    answer: 2,
    explanation: '500 代表服务器侧发生了内部错误，通常需要结合日志继续排查。',
  },
  q11_2: {
    id: 'q11_2',
    type: 'choice',
    question: '哪种情况更符合 P1 问题？',
    options: ['页面文案错别字', '核心主流程不通，但系统没有整体崩溃', '字体大小不一致', '头像轻微偏移'],
    answer: 1,
    explanation: 'P1 一般是核心业务严重受影响，但尚未达到系统完全崩溃。',
  },
  q11_3: {
    id: 'q11_3',
    type: 'choice',
    question: '在测试库执行 UPDATE 或 DELETE 前，最应该先确认什么？',
    options: ['当前连接的是测试库，并且 SQL 有明确 WHERE 条件', '页面颜色是否正确', '浏览器是否最大化', '是否已经打开截图工具'],
    answer: 0,
    explanation: '数据库修改类操作必须先确认环境和影响范围，避免误改大量数据。',
  },
  q11_4: {
    id: 'q11_4',
    type: 'choice',
    question: '术语 UAT 通常是什么意思？',
    options: ['用户验收测试', '单元测试', '接口测试', '冒烟测试'],
    answer: 0,
    explanation: 'UAT 是 User Acceptance Test，中文通常叫用户验收测试。',
  },
}
