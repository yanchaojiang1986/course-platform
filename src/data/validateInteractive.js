import { INTERACTIVE_DATA } from './interactive.js'

// 每种 type 的 schema 约束：
//   required: 必需字段（全部存在才算通过）
//   anyOf:    任一组字段全部存在即可（用于 either/or 结构）
export const INTERACTIVE_SCHEMAS = {
  flowchart:      { required: ['nodes', 'edges'] },
  comparison:     { anyOf: [['items'], ['left', 'right']] },
  checklist:      { anyOf: [['items'], ['categories']] },
  timeline:       { anyOf: [['items'], ['paths']] },
  flashcard:      { required: ['cards'] },
  mindmap:        { required: ['root', 'branches'] },
  testcase:       { required: ['rows'] },
  'input-demo':   { anyOf: [['rules'], ['boundary_table']] },
  'http-demo':    { anyOf: [['request'], ['response']] },
  terminal:       { required: ['scenarios'] },
  'sql-demo':     { required: ['mock_tables', 'preset_queries'] },
  devtools:       { anyOf: [['cases'], ['request_list']] },
  'bar-chart':    { required: ['labels', 'series'] },
  'salary-chart': { required: ['levels', 'cities'] },
}

export const KNOWN_TYPES = Object.keys(INTERACTIVE_SCHEMAS)

function hasAllFields(data, fields) {
  return fields.every(f => data[f] !== undefined && data[f] !== null)
}

function validateOne(blockId, data) {
  if (!data || typeof data !== 'object') {
    return { blockId, type: null, reason: '数据不是对象' }
  }
  const type = data.type
  if (!type) {
    return { blockId, type: null, reason: '缺少 type 字段' }
  }
  const schema = INTERACTIVE_SCHEMAS[type]
  if (!schema) {
    return { blockId, type, reason: `未知 type（合法值：${KNOWN_TYPES.join(', ')}）` }
  }
  if (schema.required && !hasAllFields(data, schema.required)) {
    const missing = schema.required.filter(f => data[f] === undefined || data[f] === null)
    return { blockId, type, reason: `缺字段：${missing.join(', ')}` }
  }
  if (schema.anyOf && !schema.anyOf.some(group => hasAllFields(data, group))) {
    const options = schema.anyOf.map(g => `[${g.join('+')}]`).join(' 或 ')
    return { blockId, type, reason: `需要满足以下任一字段组：${options}` }
  }
  return null
}

export function validateInteractiveData(dataMap = INTERACTIVE_DATA) {
  const errors = []
  for (const [blockId, data] of Object.entries(dataMap)) {
    const err = validateOne(blockId, data)
    if (err) errors.push(err)
  }
  return errors
}
