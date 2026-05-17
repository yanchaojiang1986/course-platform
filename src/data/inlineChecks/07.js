export const INLINE_CHECKS_07 = {
  q07_1: {
    id: 'q07_1',
    type: 'choice',
    question: '接口返回 404 时，第一反应更应该是什么？',
    options: ['路径写错或接口没部署', '后端代码空指针', '数据库死锁', '前端样式冲突'],
    answer: 0,
    explanation: '404 最常见是资源不存在，优先检查 URL 和部署情况。',
  },
  q07_2: {
    id: 'q07_2',
    type: 'choice',
    question: '想实时盯着日志新增内容，最合适的命令是哪条？',
    options: ['cat app.log', 'tail -f app.log', 'ls -la app.log', 'pwd'],
    answer: 1,
    explanation: '`tail -f` 会持续跟踪文件末尾新增内容，适合边操作边观察日志。',
  },
  q07_3: {
    id: 'q07_3',
    type: 'truefalse',
    question: '在测试库执行 UPDATE 或 DELETE 时，不写 WHERE 也没关系。',
    answer: false,
    explanation: '这是非常危险的习惯，测试环境也应严格限制更新范围。',
  },
  q07_4: {
    id: 'q07_4',
    type: 'choice',
    question: '想快速找出日志里所有包含某个异常关键词的行，最适合用什么命令？',
    options: ['grep', 'mkdir', 'touch', 'mv'],
    answer: 0,
    explanation: '`grep` 就是按关键词搜索文本内容的常用命令。',
  },
}
