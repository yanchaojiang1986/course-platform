export const INTERACTIVE_DATA = {
  // 模块 00
  '00-01': {
    type: 'timeline',
    title: '课程学习路线图',
    start_label: '零基础',
    end_label: '拿到第一份功能测试工作',
    items: [
      { stage: '阶段一：基础课程', color: '#6B7280', modules: [
        { id: '01', name: '计算机基础扫盲', desc: '环境 / 前后端 / 接口的概念' },
        { id: '02', name: '行业认知与岗位理解', desc: '测试是什么 / 每天干什么' },
      ]},
      { stage: '阶段二：核心技能', color: '#3B82F6', modules: [
        { id: '03', name: '软件测试流程与团队协作', desc: '完整生命周期 + 敏捷工作法' },
        { id: '04', name: '功能测试核心方法', desc: '需求拆解 + 四大用例设计方法' },
        { id: '05', name: 'Bug 管理与测试输出', desc: 'Bug 单 + 测试报告' },
      ]},
      { stage: '阶段三：工具提升', color: '#8B5CF6', modules: [
        { id: '06', name: '接口测试入门', desc: 'Postman + 前后端联调思路' },
        { id: '07', name: '测试工具基础', desc: 'JIRA / 禅道 / F12 / MySQL / Linux / AI 辅助' },
      ]},
      { stage: '阶段四：实战串联', color: '#F59E0B', modules: [
        { id: '08', name: '企业级实战项目', desc: '从需求到报告的完整交付' },
      ]},
      { stage: '阶段五：求职落地', color: '#10B981', modules: [
        { id: '09', name: '求职转型与面试准备', desc: '简历 + 面试 + 甲方 vs 外包' },
        { id: '10', name: '入职与成长', desc: '30 天落地指南 + 职业进阶路径' },
      ]},
    ],
  },

  '00-02': {
    type: 'checklist',
    title: '6 周学习计划（全职）',
    description: '勾选已完成的周次，跟踪学习进度',
    items: [
      { week: '第 1 周', content: '模块 01-02：建立认知框架', tag: '认知' },
      { week: '第 2 周', content: '模块 03-05 前半段：测试流程 + 用例设计方法精读', tag: '核心技能' },
      { week: '第 3 周', content: '模块 03-05 后半段：Bug 管理 + 每天手写用例练手', tag: '核心技能' },
      { week: '第 4 周', content: '模块 06-07：Postman、F12、MySQL、Linux 工具上手实操', tag: '工具' },
      { week: '第 5 周', content: '模块 08：完成完整项目实战作品', tag: '实战' },
      { week: '第 6 周', content: '模块 09-10：打磨简历，准备投递', tag: '求职' },
    ],
  },

  '00-03': {
    type: 'checklist',
    title: '作品集成果物清单',
    description: '每完成一个成果物即勾选，全部完成后你的求职作品集就准备好了',
    items: [
      { module: '模块 01', artifact: '基础认知概念图', hint: '前后端/接口/环境关系图' },
      { module: '模块 02', artifact: '岗位理解笔记', hint: '测试岗每天做什么、与谁协作' },
      { module: '模块 03', artifact: '测试流程图', hint: '从需求评审到上线的完整流程' },
      { module: '模块 04', artifact: '需求测试点清单 + 测试用例文档', hint: '至少 20 条用四大方法编写的用例' },
      { module: '模块 05', artifact: '标准 Bug 单 + 简版测试报告', hint: '含 P0-P3 各一条示例' },
      { module: '模块 06', artifact: '接口测试练习记录', hint: 'Postman 发送截图 + 响应分析' },
      { module: '模块 07', artifact: '工具使用练习记录', hint: 'F12/MySQL/Linux 操作截图' },
      { module: '模块 08', artifact: '完整项目：用例集 + Bug 集 + 测试报告 + 面试介绍稿', hint: '可直接放进简历的作品' },
      { module: '模块 09', artifact: '转型简历初稿 + 面试项目介绍稿', hint: '用 STAR 法则写项目经验' },
    ],
  },

  '00-04': {
    type: 'salary-chart',
    title: '功能测试工程师薪资参考',
    note: '数据来源：招聘平台公开区间（教学示例）',
    stats: [
      { icon: '📈', value: '需求稳定', label: '功能测试岗位长期有招聘需求' },
      { icon: '⏱', value: '1-3 个月', label: '零基础到拿到第一份 offer 的常见周期' },
      { icon: '🚀', value: '可进阶', label: '接口/自动化/性能能力可持续抬升薪资' },
    ],
    levels: [
      { title: '初级（0-1 年）', badge: '本课程目标', min: 6000, max: 12000, note: '先拿到入场岗位，再做能力升级' },
      { title: '中级（1-3 年）', min: 10000, max: 20000, note: '接口测试、SQL、日志定位能力形成差异化' },
      { title: '高级（3-5 年）', min: 18000, max: 30000, note: '具备自动化或性能能力后区间提升明显' },
      { title: '资深/测试开发（5 年+）', min: 25000, max: 50000, note: '走测试架构或测试开发路线' },
    ],
    cities: [
      { name: '北京', min: 10000, max: 15000 },
      { name: '上海', min: 9000, max: 14000 },
      { name: '深圳', min: 9000, max: 14000 },
      { name: '杭州', min: 8000, max: 12000 },
      { name: '广州', min: 7500, max: 12000 },
      { name: '成都', min: 6000, max: 10000 },
      { name: '武汉', min: 6000, max: 10000 },
    ],
  },

  // 模块 01
  '01-01': {
    type: 'flowchart',
    title: '软件发布环境流转图',
    direction: 'horizontal',
    nodes: [
      { id: 'dev',  label: '开发环境\n(Development)', sublabel: '开发在本地写代码、自测', color: '#6B7280', icon: '💻' },
      { id: 'qa',   label: '测试环境\n(Test / Staging)', sublabel: '测试人员在此执行所有测试', color: '#3B82F6', icon: '🔍' },
      { id: 'prod', label: '生产环境\n(Production)', sublabel: '真实用户正在使用的系统', color: '#10B981', icon: '🚀' },
    ],
    edges: [
      { from: 'dev', to: 'qa',   label: '提测\n（开发自测通过后部署到测试环境）' },
      { from: 'qa',  to: 'prod', label: '上线 / 发布\n（测试报告通过后部署到生产环境）' },
    ],
    warnings: [
      { node: 'prod', text: '⚠️ 千万不要在生产环境随意操作！一个误操作可能影响真实用户数据' },
    ],
  },

  '01-02': {
    type: 'comparison',
    title: '用"点外卖"理解技术架构',
    layout: 'cards',
    items: [
      { role: '前端（Frontend）', icon: '📱', interactions: ['用户看得见', 'HTML/CSS/JS'], tips: ['页面显示是否正确？', '交互是否响应？', '提示文案是否准确？'] },
      { role: '后端（Backend）', icon: '🍳', interactions: ['处理业务逻辑', 'Java/Python/Go'], tips: ['业务逻辑是否正确？', '数据处理有无错误？', '边界条件是否处理？'] },
      { role: '服务器（Server）', icon: '🏢', interactions: ['运行后端程序', 'Linux 主机'], tips: ['日志在哪里？', '服务有没有挂？', '报错信息是什么？'] },
      { role: '数据库（Database）', icon: '🗄️', interactions: ['持久化存储', 'MySQL/PostgreSQL'], tips: ['数据真的存进去了吗？', '有没有脏数据？'] },
      { role: '接口（API）', icon: '🪟', interactions: ['前后端通信约定', 'HTTP/REST'], tips: ['请求参数对吗？', '返回数据格式对吗？', '异常情况有没有合理提示？'] },
    ],
  },

  '01-03': {
    type: 'mindmap',
    title: '测试人员必懂的五个核心概念',
    root: '日常测试高频概念',
    branches: [
      { name: '账号', children: ['唯一标识用户', '维护测试账号列表', '多角色账号准备（管理员/普通用户）'] },
      { name: '密码', children: ['长度限制（最小/最大位数）', '字符限制（特殊符号）', '加密传输（不能明文）', '错误次数锁定'] },
      { name: '验证码', children: ['短信验证码（5分钟时效）', '过期后不可复用', '同一号码频率限制', '图形验证码防机器人'] },
      { name: '缓存', children: ['改了配置但页面显示旧的', '清缓存后 Bug 消失 → 缓存引发', 'Ctrl+Shift+Delete 清浏览器缓存'] },
      { name: '日志', children: ['前端日志：F12 Console', '后端日志：Linux 服务器', '提 Bug 时附上日志截图'] },
    ],
  },

  // 模块 02
  '02-01': {
    type: 'mindmap',
    title: '软件测试分类全图',
    root: '软件测试',
    branches: [
      { name: '按测试阶段', children: ['单元测试（开发自己做）', '集成测试（模块间接口）', '系统测试（测试工程师日常核心）★', '验收测试（UAT，上线前）'] },
      { name: '按代码可见度', children: ['黑盒测试（不看代码，看输入输出）★ 本课重点', '白盒测试（看代码逻辑，需编程能力）', '灰盒测试（结合界面 + 接口/数据）'] },
      { name: '按质量属性', children: ['功能测试（能不能用）', '性能测试（快不快/稳不稳）', '安全测试（抵抗攻击）', '兼容性测试（多设备/浏览器）'] },
    ],
  },

  '02-02': {
    type: 'comparison',
    title: '黑盒测试 vs 白盒测试',
    layout: 'side-by-side',
    left: {
      name: '黑盒测试（Black-box）',
      badge: '本课程重点',
      badge_color: '#3B82F6',
      items: ['不需要看代码', '只关注：输入什么 → 输出是否符合需求', '测试依据：产品需求文档（PRD）', '工具：Postman、F12、Excel 用例表', '适合：功能测试工程师（入门首选）'],
    },
    right: {
      name: '白盒测试（White-box）',
      badge: '进阶方向',
      badge_color: '#6B7280',
      items: ['需要阅读源代码', '关注：代码逻辑分支、代码覆盖率', '测试依据：代码结构 + 设计文档', '工具：JUnit、代码覆盖率工具', '适合：有编程能力的测试开发工程师'],
    },
  },

  '02-03': {
    type: 'mindmap',
    title: '测试工程师的日常协作网络',
    root: '测试工程师',
    branches: [
      { name: '产品经理（PM）', children: ['需求答疑', '验收确认', '需求变更同步'] },
      { name: '开发工程师（RD）', children: ['沟通 Bug 复现', '督促修复进度', '复测验证'] },
      { name: '项目经理（SM/PMO）', children: ['汇报测试进度', '暴露风险（晚提测）'] },
      { name: '其他测试', children: ['用例评审', '互相复测'] },
      { name: '每日产出', children: ['测试用例文档', 'Bug 报告（JIRA/禅道）', '测试报告'] },
    ],
  },

  // 模块 03
  '03-01': {
    type: 'flowchart',
    title: '软件测试完整生命周期',
    direction: 'vertical',
    nodes: [
      { id: 'step1', label: '① 需求分析与评审', desc: '参加 PRD 讲解会，找需求漏洞、逻辑矛盾', role: '测试 + 产品 + 开发', color: '#6B7280' },
      { id: 'step2', label: '② 测试计划编写', desc: '确定范围、人员、排期、环境资源', role: '测试主管', color: '#6B7280' },
      { id: 'step3', label: '③ 测试用例设计与评审', desc: '并行于开发阶段，提炼测试点，编写用例，组织评审', role: '测试工程师', color: '#3B82F6' },
      { id: 'step4', label: '④ 测试环境搭建 / 提测', desc: '开发部署测试环境，正式移交测试人员', role: '开发 → 测试', color: '#3B82F6' },
      { id: 'step5', label: '⑤ 测试执行 & Bug 追踪', desc: '对照用例执行，提 Bug，跟踪修复，复测关闭', role: '测试工程师', color: '#F59E0B' },
      { id: 'step6', label: '⑥ 测试报告 & 上线', desc: '输出测试报告，给出发布结论', role: '测试工程师 + 项目经理', color: '#10B981' },
    ],
    edges: [
      { from: 'step1', to: 'step2' },
      { from: 'step2', to: 'step3' },
      { from: 'step3', to: 'step4' },
      { from: 'step4', to: 'step5' },
      { from: 'step5', to: 'step6' },
      { from: 'step5', to: 'step5', label: 'Bug 未关闭 → 继续复测', type: 'loop' },
    ],
  },

  '03-02': {
    type: 'timeline',
    title: '两周 Sprint 中测试工程师的节奏',
    orientation: 'horizontal',
    items: [
      { day: 'Sprint 第 1 天', event: 'Sprint 计划会', desc: '确定本次迭代范围，评估测试工作量', role: '全团队' },
      { day: '第 1-5 天', event: '并行写用例', desc: '开发写代码期间，测试同步编写测试用例（测试左移）', role: '测试' },
      { day: '第 5 天', event: '提测', desc: '开发部署测试环境，移交测试', role: '开发 → 测试' },
      { day: '第 6-9 天', event: '测试执行 & Bug 追踪', desc: '执行用例，提 Bug，跟踪修复，复测', role: '测试 + 开发' },
      { day: '每天早上', event: '每日站会（10-15分钟）', desc: '昨天做了什么 / 今天做什么 / 有什么阻碍', role: '全团队' },
      { day: 'Sprint 最后 1-2 天', event: '演示会 + 回顾会', desc: '演示可工作的软件；复盘本次迭代改进点', role: '全团队' },
    ],
  },

  '03-03': {
    type: 'comparison',
    title: '测试工程师协作沟通指南',
    layout: 'cards',
    items: [
      { role: '产品经理（PM）', icon: '📋', interactions: ['需求答疑', '验收确认', '需求变更同步'], tips: ['需求不清晰必须追问到底，不能主观臆测', '口头达成的需求修改，必须让 PM 落实到 PRD 文档，避免口说无凭'] },
      { role: '开发工程师（RD）', icon: '💻', interactions: ['沟通 Bug 复现步骤', '解释为什么是 Bug', '督促修复进度'], tips: ['提 Bug 必须提供：前置条件、复现步骤、报错截图（含日志更好）', '不要使用命令式语气', '当开发认为不是 Bug 时，拿出需求文档作为准绳'] },
      { role: '项目经理（SM/PMO）', icon: '📊', interactions: ['汇报测试进度', '暴露项目风险'], tips: ['遇到不可控风险必须"及时举手"，不要憋在心里', '晚暴露问题的危害远大于早求助'] },
    ],
  },

  '03-04': {
    type: 'testcase',
    title: '需求文档（PRD）阅读与测试提取示例',
    description: '把“读文档”变成可执行动作，避免只看热闹不产出测试点',
    columns: ['PRD章节', '你要关注什么', '可直接产出的测试点', '常见风险'],
    rows: [
      { chapter: '1. 背景与目标', points: '这次改动要解决什么业务问题，目标用户是谁', '可直接产出的测试点': '确认目标用户角色在入口与权限上是否正确', example: '目标不清导致测偏：测了很多UI细节但漏核心业务链路' },
      { chapter: '2. 业务流程', points: '主流程、分支流程、异常流程是否完整', '可直接产出的测试点': '按主/分支/异常拆用例，至少各覆盖一条', example: '只测主流程，漏掉回退、撤销、重复提交' },
      { chapter: '3. 字段与校验规则', points: '字段类型、长度、必填、格式、枚举约束', '可直接产出的测试点': '边界值（min-1/min/max/max+1）+ 空值/非法值', example: '前端校验有，后端漏校验，绕过前端可写脏数据' },
      { chapter: '4. 状态流转', points: '状态从A到B的条件、可否回退、谁可操作', '可直接产出的测试点': '状态机正向/逆向/越权变更测试', example: '状态可被越权修改，导致业务穿透' },
      { chapter: '5. 非功能约束', points: '性能、安全、审计日志、可追溯要求', '可直接产出的测试点': '高并发、弱网、日志留痕、敏感字段脱敏检查', example: '功能通过但无日志留痕，出问题无法追责定位' },
    ],
  },

  // 模块 04
  '04-01': {
    type: 'mindmap',
    title: '业务场景树示例：购物车模块',
    root: '购物车',
    branches: [
      { name: '添加商品', children: ['添加单件商品（正向）', '添加已存在商品（数量叠加）', '超过库存时添加（边界）', '商品已下架时添加（异常）'] },
      { name: '结算', children: ['全选商品结算', '部分勾选商品结算', '购物车为空时结算（异常）', '商品下架后结算（联动）'] },
      { name: '删除商品', children: ['删除单件商品', '批量删除', '删除后购物车为空的状态展示'] },
    ],
  },

  '04-02': {
    type: 'input-demo',
    title: '等价类划分法 — 交互演示',
    scenario: '系统要求输入人的年龄（1-120 的整数）',
    input_label: '请输入年龄值，立即看到它属于哪个等价类',
    input_type: 'text',
    rules: {
      valid_class: { condition: '整数 且 1 <= value <= 120', label: '✅ 有效等价类', example: '如 20、50、100', color: '#10B981' },
      invalid_classes: [
        { condition: '整数 且 value < 1', label: '❌ 无效：小于最小值', example: '如 0、-5', color: '#EF4444' },
        { condition: '整数 且 value > 120', label: '❌ 无效：大于最大值', example: '如 121、999', color: '#EF4444' },
        { condition: '包含小数点', label: '❌ 无效：小数', example: '如 10.5', color: '#EF4444' },
        { condition: '包含非数字字符', label: '❌ 无效：非数字', example: "如 'A'、'#'", color: '#EF4444' },
        { condition: '为空', label: '❌ 无效：空值', example: '不输入直接提交', color: '#EF4444' },
      ],
    },
    tip: '💡 每个无效等价类只需选一个代表值来测试，无需穷举所有',
  },

  '04-03': {
    type: 'input-demo',
    title: '边界值分析法 — 密码长度验证',
    scenario: '系统要求密码长度必须是 8 到 16 位',
    input_label: '输入一段密码，查看长度是否通过验证',
    input_type: 'password',
    show_length_counter: true,
    boundary_table: [
      { length: 7,  desc: '最小值 - 1', expected: '❌ 应报错：密码太短', color: '#EF4444' },
      { length: 8,  desc: '最小值（边界）', expected: '✅ 应通过', color: '#10B981' },
      { length: 16, desc: '最大值（边界）', expected: '✅ 应通过', color: '#10B981' },
      { length: 17, desc: '最大值 + 1', expected: '❌ 应报错：密码太长', color: '#EF4444' },
    ],
    realtime_feedback: true,
    tip: '💡 边界值与等价类配合使用效果最佳',
  },

  '04-04': {
    type: 'flowchart',
    title: '场景法示例：电商购物流程',
    direction: 'vertical',
    nodes: [
      { id: 'browse',   label: '浏览商品', color: '#6B7280' },
      { id: 'cart',     label: '加入购物车', color: '#3B82F6' },
      { id: 'order',    label: '提交订单', desc: '库存是否充足？', color: '#F59E0B' },
      { id: 'pay',      label: '发起支付', desc: '余额是否充足？', color: '#F59E0B' },
      { id: 'success',  label: '✅ 支付成功 → 等待发货', color: '#10B981' },
    ],
    edges: [
      { from: 'browse', to: 'cart' },
      { from: 'cart',   to: 'order', label: '有库存' },
      { from: 'order',  to: 'pay' },
      { from: 'pay',    to: 'success', label: '余额足够' },
    ],
    warnings: [
      { node: 'cart',  text: '❌ 备选流：库存不足 → 提示无法加购' },
      { node: 'pay',   text: '❌ 备选流：余额不足 → 提示充值 / 支付失败' },
      { node: 'success', text: '⚡ 备选流：支付成功后立刻申请退款' },
    ],
  },

  '04-05': {
    type: 'testcase',
    title: '标准测试用例示例表（登录模块）',
    columns: ['用例编号', '用例标题', '前置条件', '执行步骤', '预期结果', '优先级', '状态'],
    priority_colors: { P0: '#EF4444', P1: '#F59E0B', P2: '#3B82F6', P3: '#6B7280' },
    status_options: ['待执行', '通过', '失败', '阻塞'],
    rows: [
      { id: 'Login-001', title: '正确账号和密码可以成功登录', precondition: '处于未登录状态，已有注册账号（test@example.com / Test1234）', steps: '1. 进入登录页\n2. 输入正确账号 test@example.com\n3. 输入对应密码 Test1234\n4. 点击登录按钮', expected: '1. 页面成功跳转到用户主页\n2. 右上角显示用户昵称\n3. 数据库产生对应的登录日志记录', priority: 'P0', status: '待执行' },
      { id: 'Login-002', title: '密码错误时给出明确提示且不登录成功', precondition: '处于未登录状态，已有注册账号', steps: '1. 进入登录页\n2. 输入正确账号\n3. 输入错误密码（如 Wrong123）\n4. 点击登录按钮', expected: "1. 页面停留在登录页\n2. 显示错误提示：'账号或密码错误'\n3. 数据库无新登录记录", priority: 'P0', status: '待执行' },
      { id: 'Login-003', title: '密码连续错误 5 次账号被锁定', precondition: '处于未登录状态，账号未被锁定', steps: '1. 连续输入错误密码 5 次\n2. 第 6 次再尝试登录', expected: '第 6 次尝试时，提示账号已被锁定，需要 X 分钟后重试', priority: 'P1', status: '待执行' },
      { id: 'Login-004', title: '密码框输入内容默认不可见（星号显示）', precondition: '处于未登录状态', steps: '1. 进入登录页\n2. 在密码框输入任意字符', expected: '密码框中内容显示为星号（●●●●），不明文展示', priority: 'P2', status: '待执行' },
    ],
  },

  // 模块 05
  '05-01': {
    type: 'flowchart',
    title: 'Bug 生命周期流转图',
    direction: 'horizontal',
    nodes: [
      { id: 'new',      label: 'New\n新建',       sublabel: '测试发现并提交',           color: '#6B7280', icon: '🆕' },
      { id: 'assigned', label: 'Assigned\n指派',  sublabel: '分配给对应开发',           color: '#3B82F6', icon: '👤' },
      { id: 'fixed',    label: 'Fixed\n已修复',   sublabel: '开发修复，等待复测',       color: '#F59E0B', icon: '🔧' },
      { id: 'closed',   label: 'Closed\n关闭',    sublabel: '复测通过，正式关闭',       color: '#10B981', icon: '✅' },
    ],
    edges: [
      { from: 'new',      to: 'assigned', label: '开发认领' },
      { from: 'assigned', to: 'fixed',    label: '开发修复' },
      { from: 'fixed',    to: 'closed',   label: '复测通过' },
      { from: 'fixed',    to: 'assigned', label: 'Reopen\n（复测不通过）', type: 'back' },
    ],
    warnings: [
      { node: 'closed', text: '⚠️ 关闭前必须复测，不能直接关闭' },
    ],
  },

  '05-02': {
    type: 'comparison',
    title: 'Bug 单：坏写法 vs 好写法',
    layout: 'side-by-side',
    left: {
      name: '❌ 坏的 Bug 单',
      badge: '开发看了头疼',
      badge_color: '#EF4444',
      items: ['标题：登录坏了', '步骤：点了一下登录', '实际结果：出问题了', '预期结果：（空）', '严重程度：（未填）', '附件：（无）', '环境：（未填）'],
    },
    right: {
      name: '✅ 好的 Bug 单',
      badge: '开发看了直接修',
      badge_color: '#10B981',
      items: ['标题：在 iOS 端 App 的登录页，输入带空格的用户名点击登录，App 闪退崩溃', '步骤：1. 打开 iOS 14.x App v2.1.0；2. 在用户名框输入"test user"（含空格）；3. 输入密码；4. 点击登录', '实际结果：App 直接闪退，回到手机桌面', '预期结果：根据 PRD 第 3.2 节，应提示"用户名不能包含空格"', '严重程度：P0（阻断性）', '附件：崩溃截图 + 控制台日志截图（已附）', '环境：iOS 14.5 / iPhone 12 / App v2.1.0 / 测试账号：test001'],
    },
  },

  '05-03': {
    type: 'testcase',
    title: '测试报告结构示例（可直接套用）',
    description: '以下为一份简版测试报告的核心章节，适合新人第一次写报告时参考',
    columns: ['章节', '内容要点', '示例'],
    rows: [
      { chapter: '测试范围', points: '本次测试了哪些功能模块、哪些版本', example: '本次测试覆盖：登录模块、购物车模块、支付模块 v2.1.0，不含推荐算法模块' },
      { chapter: '测试结论', points: '是否建议上线，理由是什么', example: '建议上线。所有 P0/P1 Bug 已关闭，遗留 2 条 P3 UI Bug 已确认不影响主流程' },
      { chapter: 'Bug 统计', points: '总数、各优先级数量、已关闭数、遗留数', example: '共发现 23 个 Bug：P0×2（已关），P1×5（已关），P2×10（已关），P3×6（遗留 2）' },
      { chapter: '遗留 Bug 说明', points: '遗留了哪些 Bug，为什么可以遗留，风险评估', example: 'BUG-045：首页 Banner 图文字偏移 2px（P3）；BUG-051：注册页帮助链接 404（P3），影响极小，下版本修复' },
      { chapter: '风险总结', points: '测试未覆盖的范围、已知潜在风险', example: '因工期限制，压力测试未执行；双十一高并发场景需上线后密切监控' },
    ],
  },

  '05-04': {
    type: 'testcase',
    title: '测试执行记录示例（Execution Log）',
    description: '记录“哪天、谁测了什么、结果如何、关联哪个 Bug”，用于追踪进度与责任边界',
    columns: ['日期', '模块', '执行用例', '结果', 'Bug单号', '执行人', '备注'],
    rows: [
      { date: '2026-05-14', module: '登录与鉴权', case_count: '12', result: '11通过 / 1失败', bug_id: 'BUG-2101', owner: 'QA-张三', note: '失败点为密码错误5次未锁定账户' },
      { date: '2026-05-15', module: '购物车', case_count: '18', result: '16通过 / 2失败', bug_id: 'BUG-2108, BUG-2110', owner: 'QA-李四', note: '并发加购库存显示不一致，已提交后端' },
      { date: '2026-05-16', module: '支付链路', case_count: '15', result: '13通过 / 1失败 / 1阻塞', bug_id: 'BUG-2122', owner: 'QA-王五', note: '阻塞原因：第三方沙箱回调异常，待外部恢复' },
      { date: '2026-05-17', module: '退款与对账', case_count: '10', result: '9通过 / 1失败', bug_id: 'BUG-2135', owner: 'QA-张三', note: 'T+1对账差异，定位为重复回调幂等失效' },
    ],
  },

  // 模块 06
  '06-01': {
    type: 'http-demo',
    title: '接口请求/响应结构解析',
    tabs: ['请求（Request）', '响应（Response）'],
    request: {
      method: 'POST',
      url: 'https://api.example.com/users/login',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: { username: 'test@example.com', password: 'Test1234' },
      annotations: {
        method: '请求方法：GET=获取 / POST=提交 / PUT=更新 / DELETE=删除',
        url: '接口地址，告诉服务器要找谁',
        headers: '附加信息，如登录凭证 Token',
        body: '实际发送的数据，通常是 JSON 格式',
      },
    },
    response: {
      status_code: 200,
      status_text: 'OK',
      headers: { 'Content-Type': 'application/json', 'Set-Cookie': 'session_id=abc123; HttpOnly' },
      body: { code: 0, msg: '登录成功', data: { user_id: 10086, username: 'test@example.com', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } },
      annotations: {
        status_code: '200=成功 / 400=请求错误 / 401=未授权 / 404=找不到 / 500=服务器错误',
        body: '服务器返回的 JSON 数据，测试人员需验证字段名和字段值是否符合接口文档',
      },
    },
  },

  '06-02': {
    type: 'devtools',
    title: '模拟 F12 Network 面板 — 前后端 Bug 定位实战',
    scenario: '点击登录按钮后页面没有跳转，如何排查？',
    panels: ['Network', 'Console', 'Elements'],
    active_panel: 'Network',
    request_list: [
      { name: 'login',     method: 'POST', status: 401, type: 'fetch',      size: '1.2 KB', time: '320ms', highlight: true },
      { name: 'main.js',   method: 'GET',  status: 200, type: 'script',     size: '45 KB',  time: '120ms' },
      { name: 'style.css', method: 'GET',  status: 200, type: 'stylesheet', size: '8 KB',   time: '80ms' },
    ],
    selected_request: {
      name: 'login',
      tabs: {
        Headers: { 'Request URL': 'https://api.example.com/users/login', 'Request Method': 'POST', 'Status Code': '401 Unauthorized' },
        Payload: { username: 'test@example.com', password: 'Test1234' },
        Response: { code: 401, msg: 'Token 已过期，请重新登录', data: null },
      },
    },
    diagnosis: {
      question: '根据以上抓包结果，这是前端 Bug 还是后端 Bug？',
      options: ['前端 Bug（前端发错了数据）', '后端 Bug（前端数据没问题，后端返回了错误）'],
      correct: 1,
      explanation: 'Payload 中 username 和 password 格式正确，但后端返回 401 且提示 Token 过期。前端发的数据没有问题，是后端 Token 验证逻辑的问题 → 后端 Bug。',
    },
  },

  '06-03': {
    type: 'checklist',
    title: '接口测试四步验证清单',
    description: '每次接口测试执行后，逐一勾选确认',
    items: [
      { step: 1, item: '状态码是否正确', detail: '成功时 200；失败时对应的 4xx/5xx（不能一律返回 200 包体里带错误码）' },
      { step: 2, item: '返回字段是否符合接口文档', detail: '字段名拼写对吗？字段类型对吗（number vs string）？必填字段有没有？' },
      { step: 3, item: '错误参数时系统是否正确提示', detail: '发空值、超长、格式错误 → 后端是否返回有意义的错误信息，而不是直接崩溃（500）' },
      { step: 4, item: '接口成功后数据是否真正写入', detail: '提交成功后去数据库 SELECT 一下，数据真的写进去了吗？刷新页面，前端展示是最新数据吗？' },
    ],
  },

  '06-04': {
    type: 'testcase',
    title: '接口技术文档样例（API Spec）',
    description: '零基础学员先看懂“字段约束”再测接口，避免只会点 Send',
    columns: ['字段名', '类型', '必填', '约束/枚举', '示例', '测试关注点'],
    rows: [
      { field: 'username', type: 'string', required: '是', constraint: '4-20字符；字母/数字/下划线', sample: 'qa_user01', focus: '3/4/20/21长度；空格与中文是否允许' },
      { field: 'password', type: 'string', required: '是', constraint: '8-16位；至少含数字+字母', sample: 'Test1234', focus: '7/8/16/17边界；弱密码是否拦截' },
      { field: 'role', type: 'enum', required: '是', constraint: 'admin/user/auditor', sample: 'user', focus: '非法枚举值是否报错（如 superadmin）' },
      { field: 'phone', type: 'string', required: '否', constraint: '中国大陆手机号 11 位', sample: '13800138000', focus: '选填不传应成功；传错格式应报错' },
      { field: 'remark', type: 'string', required: '否', constraint: '最大 200 字符；禁止脚本标签', sample: '首批灰度用户', focus: '超长、XSS 特殊字符、emoji 兼容' },
    ],
  },

  // 模块 07
  '07-01': {
    type: 'terminal',
    title: 'Linux 日志查看 — 模拟终端',
    prompt: 'tester@server:~$',
    scenarios: [
      { name: '场景一：实时查看日志', command: 'tail -f /usr/local/tomcat/logs/error.log', output: '[2026-05-17 14:32:01] INFO  Request received: POST /api/login\n[2026-05-17 14:32:01] ERROR NullPointerException at UserService.java:87\n    at com.example.service.UserService.login(UserService.java:87)\n    at com.example.controller.UserController.login(UserController.java:45)\n[2026-05-17 14:32:01] ERROR Response: 500 Internal Server Error', tip: '发现 NullPointerException？把这段截图贴给后端开发，他会非常感谢你' },
      { name: '场景二：搜索特定关键词', command: "grep 'NullPointerException' error.log", output: '[2026-05-17 14:32:01] ERROR NullPointerException at UserService.java:87\n[2026-05-17 09:15:33] ERROR NullPointerException at OrderService.java:124' },
      { name: '场景三：查看日志目录', command: 'ls -la /usr/local/tomcat/logs', output: 'total 48\ndrwxr-xr-x 2 tomcat tomcat 4096 May 17 14:30 .\ndrwxr-xr-x 9 tomcat tomcat 4096 May 01 09:00 ..\n-rw-r--r-- 1 tomcat tomcat 12842 May 17 14:32 error.log\n-rw-r--r-- 1 tomcat tomcat 28190 May 17 14:32 access.log\n-rw-r--r-- 1 tomcat tomcat  3024 May 17 12:00 catalina.log' },
      { name: '场景四：查找并终止卡死进程', command: 'ps -ef | grep java', output: 'tomcat   12345   1 99 14:30 ?   00:05:12 java -jar app.jar\ntester   12400 12399  0 14:35 pts/0 00:00:00 grep java', next_command: 'kill -9 12345', next_output: '[1] Killed   java -jar app.jar' },
    ],
  },

  '07-02': {
    type: 'sql-demo',
    title: '测试人员常用 SQL — Mock 数据库演练',
    description: '以下是内置了模拟数据的测试数据库，直接点击运行查看结果',
    mock_tables: {
      users: [
        { user_id: 1, username: 'zhangsan', email: 'zhang@test.com', account_balance: 100.00, status: 'active' },
        { user_id: 2, username: 'lisi',     email: 'li@test.com',    account_balance: 9999.00, status: 'active' },
        { user_id: 3, username: 'test_user', email: 'test@test.com', account_balance: 0.00,   status: 'locked' },
      ],
      orders: [
        { order_id: '202601010001', user_id: 1, total_amount: 88.00,  status: 'paid',    create_time: '2026-01-01 10:00:00' },
        { order_id: '202601010002', user_id: 1, total_amount: 200.00, status: 'pending', create_time: '2026-01-01 11:30:00' },
        { order_id: '202601020001', user_id: 2, total_amount: 999.00, status: 'paid',    create_time: '2026-01-02 09:15:00' },
      ],
    },
    preset_queries: [
      { label: '查看特定用户数据', sql: "SELECT * FROM users WHERE username = 'zhangsan';", purpose: '验证用户注册后数据是否正确写入' },
      { label: '验证订单是否存在', sql: "SELECT * FROM orders WHERE order_id = '202601010001';", purpose: '支付成功后验证订单状态是否变为 paid' },
      { label: '连表查询用户订单', sql: "SELECT u.username, o.order_id, o.total_amount, o.status\nFROM users u\nJOIN orders o ON u.user_id = o.user_id\nWHERE u.username = 'zhangsan';", purpose: '验证用户和订单的关联关系是否正确' },
      { label: '⚠️ 给测试账号充值（慎用）', sql: "UPDATE users SET account_balance = 9999 WHERE username = 'test_user';", purpose: '快速准备测试大额支付的测试数据', warning: '仅在测试数据库执行！' },
    ],
  },

  '07-03': {
    type: 'devtools',
    title: '前后端 Bug 归因训练场',
    description: '点击查看不同场景的 Network 记录，判断这是前端 Bug 还是后端 Bug',
    cases: [
      { case_id: 1, scenario: "用户点击'添加购物车'，页面提示'系统繁忙，请稍后'", request: { method: 'POST', url: '/api/cart/add', payload: { product_id: 'SKU001', quantity: 1 } }, response: { status: 500, body: { code: 500, msg: 'Internal Server Error' } }, answer: '后端 Bug', explanation: '前端发送的 payload 格式正确（product_id 和 quantity 都有），但后端返回 500。说明是后端服务器内部处理出了问题。' },
      { case_id: 2, scenario: '搜索商品时，输入关键词后结果为空，但数据库里明明有数据', request: { method: 'GET', url: '/api/products/search?keyword=', payload: null }, response: { status: 200, body: { code: 0, data: [] } }, answer: '前端 Bug', explanation: '请求 URL 中 keyword 参数为空（?keyword=），前端没有把用户输入的关键词正确带上，导致后端搜索了空字符串。这是前端的 Bug。' },
      { case_id: 3, scenario: "修改用户昵称，提示'修改成功'，但刷新页面后昵称没变", request: { method: 'PUT', url: '/api/user/profile', payload: { nickname: '新昵称' } }, response: { status: 200, body: { code: 0, msg: '修改成功' } }, answer: '后端 Bug 或数据库 Bug', explanation: "接口返回 200 且 msg='修改成功'，但刷新后数据没变。说明后端返回了假的成功（没有真正写入数据库），需要去数据库 SELECT 验证。这是后端 Bug。" },
    ],
  },

  // 模块 08
  '08-01': {
    type: 'testcase',
    title: '电商支付链路测试用例集',
    columns: ['用例编号', '场景描述', '测试要点', '优先级', '状态'],
    priority_colors: { P0: '#EF4444', P1: '#F59E0B', P2: '#3B82F6', P3: '#6B7280' },
    status_options: ['待执行', '通过', '失败', '阻塞'],
    rows: [
      { id: 'PAY-001', scenario: '正常支付流程', points: '选商品 → 下单 → 支付宝沙箱成功支付 → 订单状态变更为已支付 → 库存减少', priority: 'P0', status: '待执行' },
      { id: 'PAY-002', scenario: '弱网断网场景', points: '支付密码输入瞬间断开网络，重新联网后：系统是超时报错、保留订单，还是陷入死循环？', priority: 'P0', status: '待执行' },
      { id: 'PAY-003', scenario: '重复支付防护', points: '同一订单点击支付后，快速多次点击支付按钮，是否只发起一次支付请求？', priority: 'P0', status: '待执行' },
      { id: 'PAY-004', scenario: '支付后立刻退款', points: '支付成功后 30 秒内申请全额退款，退款金额是否与支付金额完全一致？', priority: 'P1', status: '待执行' },
      { id: 'PAY-005', scenario: '余额不足时支付', points: '账户余额为 0 时发起支付，系统是否正确提示余额不足并引导充值？', priority: 'P1', status: '待执行' },
      { id: 'PAY-006', scenario: '库存超买边界', points: '商品库存剩余 1 件时，两个用户同时发起支付，只有一个应成功，另一个需提示库存不足', priority: 'P1', status: '待执行' },
    ],
  },

  '08-02': {
    type: 'checklist',
    title: '移动端 App 测试场景清单',
    description: '执行测试时逐一勾选，确保场景覆盖完整',
    categories: [
      { name: '消息基础功能', items: ['发送文字消息：显示正常，时间戳正确', '发送图片：压缩/原图选择正常，接收方显示正确', '发送视频/文件：上传进度显示，大文件处理', '消息撤回：双方都生效，2分钟内可撤回', '已读状态：对方查看后状态变化'] },
      { name: '交叉事件中断', items: ['上传图片中来电 → 接听后回到 App，上传是否继续/失败提示', '发送中闹钟响起 → 处理闹钟后消息状态', '退到桌面被系统清理后重新打开 → 草稿箱数据保留', '切换 App 后回来 → 消息是否实时刷新'] },
      { name: '网络切换', items: ['WiFi → 4G 切换时消息发送是否中断', '4G → 断网状态下的提示是否友好', '弱网（2G/3G 模拟）下图片上传表现', '断网重连后消息是否自动重发'] },
      { name: '安装/升级', items: ['覆盖安装新版本：聊天记录是否保留', '覆盖安装新版本：用户设置是否保留', '卸载重装：登录状态是否正确清除'] },
      { name: '权限管理', items: ["拒绝相册权限后点击发图：是否有'去设置开启'引导", '拒绝麦克风权限后录音：是否有友好提示', '从设置开启权限后返回 App：是否立即生效'] },
    ],
  },

  '08-03': {
    type: 'checklist',
    title: '项目 C 完整交付检查清单',
    description: '从需求到测试报告的完整流程，全部完成后你的作品集就准备好了',
    items: [
      { phase: '步骤一：需求理解', task: '阅读模拟 PRD，理解核心业务逻辑' },
      { phase: '步骤一：需求理解', task: '提出至少 3 个隐性需求或逻辑漏洞（写下来）' },
      { phase: '步骤二：用例编写', task: '用业务场景树拆解需求，完成思维导图' },
      { phase: '步骤二：用例编写', task: '运用四大方法编写标准用例，目标 ≥ 30 条' },
      { phase: '步骤二：用例编写', task: 'P0 核心流程用例完整覆盖' },
      { phase: '步骤三：执行测试', task: '在真实开源系统上执行测试' },
      { phase: '步骤三：执行测试', task: '提交至少 5 条标准 Bug 单（含 P0 或 P1 至少 1 条）' },
      { phase: '步骤三：执行测试', task: '用 F12 抓包截图贴入 Bug 单' },
      { phase: '步骤三：执行测试', task: '用 MySQL 查询验证数据写入情况' },
      { phase: '步骤四：测试报告', task: '按模块 05 格式写简版测试报告' },
      { phase: '步骤四：测试报告', task: '给出明确的上线建议并说明理由' },
      { phase: '求职包装', task: '用 STAR 法则写面试项目介绍稿（≥300字）' },
    ],
  },

  // 模块 09
  '09-01': {
    type: 'comparison',
    title: '甲方自研 vs 外包公司：如何选第一份工作',
    layout: 'side-by-side',
    left: {
      name: '外包公司',
      badge: '零基础入行更容易',
      badge_color: '#F59E0B',
      pros: ['面试门槛相对低，上岸速度快', '可接触大厂真实业务，快速丰富简历', '项目种类多，1-2年可涉及不同行业'],
      cons: ['归属感差，无核心产品认同感', '核心架构和自动化接触机会少', '主要做纯功能黑盒，成长天花板早'],
    },
    right: {
      name: '甲方公司（自研团队）',
      badge: '长期发展更优',
      badge_color: '#10B981',
      pros: ['深度参与产品全生命周期', '有更完整的测试体系和成长路径', '测试有一定的话语权'],
      cons: ['面试门槛相对高', '竞争者更多，简历要求更高'],
    },
    conclusion: '作为零基础转型者：生存第一。第一份工作在外包干 1-2 年打好基本功，积累项目经验后再跳甲方，是完全合理的路径。',
  },

  '09-02': {
    type: 'comparison',
    title: '测试岗简历：坏写法 vs 好写法（STAR 法则）',
    layout: 'side-by-side',
    left: {
      name: '❌ 坏的项目描述',
      badge: 'HR 看完直接跳过',
      badge_color: '#EF4444',
      content: '负责电商系统的登录、购物车、支付模块的测试。使用等价类、边界值设计用例，用 Postman 测试接口，用 JIRA 报 Bug。',
      problems: ['只罗列了工具和方法名词，没有产出数据', '和其他 100 份简历一模一样，毫无区分度', '看不出解决了什么问题'],
    },
    right: {
      name: '✅ 好的项目描述（STAR 法则）',
      badge: 'HR 眼前一亮',
      badge_color: '#10B981',
      content: '主导电商项目 C 端（登录、支付核心订单链路）的功能与接口测试。针对历史遗留的超卖与库存并发逻辑设计深度测试用例。\n\n在测试执行周期内发现并追踪 45+ 有效缺陷，其中含 3 个支付阻断性 P0 级重大 Bug，在 JIRA 中完成全生命周期闭环管理。\n\n使用 Postman 完成接口联调验证，编写 MySQL 语句造库查询脏数据，通过 Chrome DevTools 抓包精准定位 20+ 起前后端对接问题，提升修复效率 15%。',
      highlights: ['有数字：45个缺陷、3个P0', '有工具：Postman、MySQL、DevTools', '有价值：解决了超卖、脏数据问题'],
    },
  },

  '09-03': {
    type: 'flashcard',
    title: '功能测试高频面试题',
    description: '点击卡片翻转查看参考答案',
    cards: [
      { question: '软件测试的目的是什么？', answer: '①发现软件中的缺陷；②验证软件符合需求；③为上线提供质量评估依据，让团队有信心发布产品。' },
      { question: '黑盒测试和白盒测试的区别？', answer: '黑盒：不关注代码内部，只关注输入和输出是否符合需求，本课程重点。\n白盒：需要阅读代码结构，针对代码逻辑分支进行测试，要求有编程能力。' },
      { question: '等价类划分法和边界值分析法的区别？', answer: '等价类：将输入数据分成有效/无效的类，每类只测一个代表值，减少重复测试。\n边界值：专门测边界上的特殊值（最小值-1、最小值、最大值、最大值+1）。两者通常配合使用。' },
      { question: '开发不认 Bug 怎么办？（满分思路）', answer: '①先自我排查，确保复现步骤没问题；②拿 PRD 或接口文档中的约定作为客观依据；③如果 PRD 没写清楚，立刻拉上产品经理三方碰头确认，以产品最终认定为准并更新文档。不要主观争吵。' },
      { question: '明天上线，今天发现难修的 Bug，同意上线吗？', answer: '不能一概而论，评估严重程度和影响范围：\n• P0（主链路崩溃/资金异常）：坚决拦截，紧急修复后再发；\n• P3（文案错误/非核心UI）：可提延期修复单，由产品和项目经理评估认可后带病上线。\n无论哪种情况，绝不私自隐瞒，必须有书面留痕。' },
    ],
  },

  // 模块 10
  '10-01': {
    type: 'checklist',
    title: '入职 30 天行动清单',
    description: '每日下班前勾选，30 天后你将成为该业务模块的熟手',
    categories: [
      { name: '第 1-3 天：配环境与读文档', items: ['获取公司邮箱账号', '申请内网权限（VPN、内部系统）', '开通 JIRA / 禅道账号', '获取开发/测试环境访问权限', '收集历史产品需求说明书（PRD）', '翻看缺陷管理库中常见的历史 Bug', '记录内部行业黑话和系统模块名称'] },
      { name: '第 4-14 天：模仿与执行现有用例', items: ['拿到导师分配的回归测试用例集', '按步骤执行用例，熟悉真实业务操作流', '遇到不确定的现象先记录，再问老测试', '每天下班前整理笔记复盘'] },
      { name: '第 15-30 天：承担小模块', items: ['接手 1-2 个小页面的独立需求', '提 Bug 前先问老测试确认是否属实', '完成所负责模块的完整用例并执行', '每天下班前整理笔记，复盘遇到的坑'] },
    ],
  },

  '10-02': {
    type: 'timeline',
    title: '软件测试职业进阶路径',
    base_stage: { label: '初级功能测试工程师', desc: '本课程出发点', duration: '0-1年', color: '#6B7280' },
    fork_point: '1-2 年后，根据个人兴趣选择方向',
    paths: [
      { name: '路径一：全栈自动化工程师', tag: '技术方向（最主流）', tag_color: '#3B82F6', stages: [{ duration: '1-2年', label: 'Python/Java 编程基础 + Selenium' }, { duration: '2-3年', label: 'Appium（移动端）+ Pytest + Jenkins CI/CD' }, { duration: '3年+', label: '自动化框架设计 / 性能测试 (JMeter)' }] },
      { name: '路径二：测试开发工程师', tag: '高薪方向', tag_color: '#8B5CF6', stages: [{ duration: '1-2年', label: '中级后端开发能力（Java/Python）' }, { duration: '2-3年', label: '自研测试平台 / 研发效能工具' }, { duration: '3年+', label: '研发效能专家 / 测试架构师' }] },
      { name: '路径三：业务专家 & 测试管理', tag: '软技能方向', tag_color: '#10B981', stages: [{ duration: '1-2年', label: '深耕行业（电商/金融/医疗）业务知识' }, { duration: '2-3年', label: '测试 Lead / 测试经理' }, { duration: '3年+', label: '测试总监 / 测试架构' }] },
    ],
  },

  // 模块 11
  '11-01': {
    type: 'testcase',
    title: 'Bug 严重度与优先级速查卡',
    columns: ['等级', '别称', '判别标准', '典型例子', '是否阻止上线'],
    priority_colors: { P0: '#EF4444', P1: '#F97316', P2: '#3B82F6', P3: '#6B7280' },
    rows: [
      { id: 'P0', chapter: 'P0 致命', points: '系统完全无法运行、崩溃；或造成资金/数据丢失；导致测试无法继续', example: '支付界面点击付款 App 直接闪退；用户数据全部被清空', priority: 'P0', status: '必须阻止上线' },
      { id: 'P1', chapter: 'P1 严重', points: '核心主干业务流不通，但系统没崩溃；或出现大面积数据计算错误', example: '账号能登录，但所有页面显示白屏无响应', priority: 'P1', status: '建议阻止上线' },
      { id: 'P2', chapter: 'P2 一般', points: '次要功能不通，正常容错机制有问题，或存在不复杂的临时规避方案', example: '搜索页按"价格排序"没反应，但按"销量排序"正常', priority: 'P2', status: '评估后决定' },
      { id: 'P3', chapter: 'P3 轻微', points: '不影响任何业务逻辑，如界面排版错位、文字错误、建议性要求', example: '字号应为 14px 但实际是 12px；"登录"被写成"登陆"', priority: 'P3', status: '可带病上线' },
    ],
  },
}
