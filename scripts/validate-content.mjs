#!/usr/bin/env node
// 教程内容与交互组件数据交叉校验：
// 1. 扫描 public/content/*.md 中所有 <!-- DEMO:xxx --> 标记
// 2. 与 src/data/interactive.js 的 keys 比对
// 3. 跑 schema 校验（validateInteractive.js）
// 失败时退出码 1，可直接挂在 npm run lint / 封板流程里。

import { readdirSync, readFileSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const contentDir = join(repoRoot, 'public', 'content')

const DEMO_RE = /<!--\s*DEMO:([\w-]+)\s*-->/g

function collectMarkdownMarkers() {
  const markers = new Map() // blockId -> [{ file, line }]
  for (const name of readdirSync(contentDir)) {
    if (!name.endsWith('.md')) continue
    const full = join(contentDir, name)
    if (!statSync(full).isFile()) continue
    const text = readFileSync(full, 'utf-8')
    const lines = text.split('\n')
    lines.forEach((line, i) => {
      let m
      const re = new RegExp(DEMO_RE.source, 'g')
      while ((m = re.exec(line)) !== null) {
        const id = m[1]
        if (!markers.has(id)) markers.set(id, [])
        markers.get(id).push({ file: name, line: i + 1 })
      }
    })
  }
  return markers
}

async function loadInteractiveModules() {
  const dataUrl = pathToFileURL(join(repoRoot, 'src', 'data', 'interactive.js')).href
  const validatorUrl = pathToFileURL(join(repoRoot, 'src', 'data', 'validateInteractive.js')).href
  const { INTERACTIVE_DATA } = await import(dataUrl)
  const { validateInteractiveData } = await import(validatorUrl)
  return { INTERACTIVE_DATA, validateInteractiveData }
}

function fmt(s) {
  return s.padEnd(10)
}

async function main() {
  const { INTERACTIVE_DATA, validateInteractiveData } = await loadInteractiveModules()
  const markers = collectMarkdownMarkers()
  const dataKeys = new Set(Object.keys(INTERACTIVE_DATA))
  const markerKeys = new Set(markers.keys())

  const orphanMarkers = [...markerKeys].filter(k => !dataKeys.has(k))
  const unusedData = [...dataKeys].filter(k => !markerKeys.has(k))
  const schemaErrors = validateInteractiveData(INTERACTIVE_DATA)

  let problems = 0
  console.log('— 交互组件数据完整性校验 —\n')

  console.log(`已扫描 markdown 标记：${markerKeys.size} 个 blockId`)
  console.log(`已注册数据条目：    ${dataKeys.size} 个 blockId\n`)

  if (orphanMarkers.length > 0) {
    problems += orphanMarkers.length
    console.log(`✗ ${orphanMarkers.length} 个 markdown 标记在 interactive.js 中找不到数据：`)
    for (const id of orphanMarkers) {
      const occurs = markers.get(id).map(o => `${o.file}:${o.line}`).join(', ')
      console.log(`  · ${fmt(id)} 出现在：${occurs}`)
    }
    console.log('')
  }

  if (unusedData.length > 0) {
    console.log(`⚠ ${unusedData.length} 条数据未被任何 markdown 标记引用（不阻断）：`)
    for (const id of unusedData) console.log(`  · ${id}`)
    console.log('')
  }

  if (schemaErrors.length > 0) {
    problems += schemaErrors.length
    console.log(`✗ ${schemaErrors.length} 条数据 schema 校验失败：`)
    for (const e of schemaErrors) {
      console.log(`  · ${fmt(e.blockId)} ${e.type ? `[${e.type}]` : ''} — ${e.reason}`)
    }
    console.log('')
  }

  if (problems === 0) {
    console.log('✓ 全部校验通过')
    process.exit(0)
  } else {
    console.log(`✗ 共发现 ${problems} 个阻断性问题`)
    process.exit(1)
  }
}

main().catch(err => {
  console.error('校验脚本异常：', err)
  process.exit(2)
})
