import { INTERACTIVE_DATA } from '../../data/interactive.js'
import { KNOWN_TYPES } from '../../data/validateInteractive.js'
import ErrorCard from './ErrorCard.jsx'
import Flowchart from './Flowchart.jsx'
import Comparison from './Comparison.jsx'
import Checklist from './Checklist.jsx'
import Timeline from './Timeline.jsx'
import Flashcard from './Flashcard.jsx'
import Mindmap from './Mindmap.jsx'
import TestCase from './TestCase.jsx'
import InputDemo from './InputDemo.jsx'
import HttpDemo from './HttpDemo.jsx'
import Terminal from './Terminal.jsx'
import SqlDemo from './SqlDemo.jsx'
import DevTools from './DevTools.jsx'
import BarChart from './BarChart.jsx'
import SalaryChart from './SalaryChart.jsx'

export default function InteractiveBlock({ blockId }) {
  const data = INTERACTIVE_DATA[blockId]
  if (!data) {
    return <ErrorCard blockId={blockId} reason="在 interactive.js 中找不到对应数据" />
  }

  switch (data.type) {
    case 'flowchart':   return <Flowchart data={data} />
    case 'comparison':  return <Comparison data={data} />
    case 'checklist':   return <Checklist data={data} blockId={blockId} />
    case 'timeline':    return <Timeline data={data} />
    case 'flashcard':   return <Flashcard data={data} />
    case 'mindmap':     return <Mindmap data={data} />
    case 'testcase':    return <TestCase data={data} />
    case 'input-demo':  return <InputDemo data={data} />
    case 'http-demo':   return <HttpDemo data={data} />
    case 'terminal':    return <Terminal data={data} />
    case 'sql-demo':    return <SqlDemo data={data} />
    case 'devtools':    return <DevTools data={data} />
    case 'bar-chart':   return <BarChart data={data} />
    case 'salary-chart': return <SalaryChart data={data} />
    default:
      return (
        <ErrorCard
          blockId={blockId}
          type={data.type || '(空)'}
          reason={`未知 type，合法值：${KNOWN_TYPES.join(', ')}`}
        />
      )
  }
}
