import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const MOBILE_BREAKPOINT = 900

/**
 * 工作台侧栏 —— 对齐 flywheel-engine/src/components/WorkbenchSidebar.tsx
 * - 288px 默认 / 108px 紧凑（窗口 < 1360px）
 * - 选中态用绝对定位的渐变滑块跟随，cubic-bezier 280ms 过渡
 * - 悬停 90ms 延迟触发切换，避免快速划过抖动
 * - 在侧栏滚轮可前后切换条目
 *
 * items: Array<{ kind: 'section' | 'item', id?, label, hint?, icon?, state?: 'default' | 'in_progress' | 'completed' }>
 */
export default function WorkbenchSidebar({ items, activeId, onChange, brandTitle = '功能测试训练营', brandTag = 'QA Bootcamp', footer }) {
  const itemRefs = useRef({})
  const hoverTimer = useRef(null)
  const navRef = useRef(null)
  const [slider, setSlider] = useState({ top: 0, height: 0, opacity: 0 })
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BREAKPOINT : false)
  const [compact, setCompact] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 1360 && window.innerWidth > MOBILE_BREAKPOINT : false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const onlyItems = items.filter(i => i.kind !== 'section')
  const indexOf = (id) => onlyItems.findIndex(i => i.id === id)

  useLayoutEffect(() => {
    if (mobile) return
    const el = itemRefs.current[activeId]
    if (!el) return
    setSlider({ top: el.offsetTop, height: el.offsetHeight, opacity: 1 })
  }, [activeId, items, compact, mobile])

  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT
      setMobile(isMobile)
      setCompact(window.innerWidth < 1360 && !isMobile)
      const el = itemRefs.current[activeId]
      if (!isMobile && el) setSlider({ top: el.offsetTop, height: el.offsetHeight, opacity: 1 })
    }
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
      if (hoverTimer.current) window.clearTimeout(hoverTimer.current)
    }
  }, [activeId])

  useEffect(() => {
    if (!mobile && drawerOpen) setDrawerOpen(false)
  }, [mobile, drawerOpen])

  useEffect(() => {
    setDrawerOpen(false)
  }, [activeId])

  const scheduleHover = (id) => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => onChange(id), 90)
  }
  const cancelHover = () => {
    if (hoverTimer.current) { window.clearTimeout(hoverTimer.current); hoverTimer.current = null }
  }

  const handleWheel = (e) => {
    if (mobile) return
    if (Math.abs(e.deltaY) < 18) return
    const idx = indexOf(activeId)
    if (idx < 0) return
    const dir = e.deltaY > 0 ? 1 : -1
    const next = onlyItems[idx + dir]
    if (next) {
      e.preventDefault()
      onChange(next.id)
    }
  }

  if (mobile) {
    const byId = new Map(onlyItems.map(i => [i.id, i]))
    const quickItemsRaw = [
      byId.get('overview'),
      byId.get(activeId),
      byId.get('wrongbook'),
    ].filter(Boolean)
    const seen = new Set()
    const quickItems = quickItemsRaw.filter((item) => {
      if (seen.has(item.id)) return false
      seen.add(item.id)
      return true
    }).slice(0, 3)

    return (
      <>
        <aside className="ws-sidebar-mobile" aria-hidden={!drawerOpen}>
          <div className={`ws-mobile-drawer-backdrop ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)} />
          <div className={`ws-mobile-drawer ${drawerOpen ? 'open' : ''}`}>
            <div className="ws-mobile-drawer-head">
              <div className="ws-brand-badge">{brandTag}</div>
              <button className="glass-btn" onClick={() => setDrawerOpen(false)} style={{ padding: '6px 10px', fontSize: 12 }}>
                关闭
              </button>
            </div>
            <div className="ws-mobile-drawer-title">{brandTitle}</div>
            <nav className="ws-mobile-drawer-nav">
              {items.map((item, idx) => {
                if (item.kind === 'section') {
                  return <div key={`m-sec-${idx}`} className="ws-nav-section">{item.label}</div>
                }
                const active = item.id === activeId
                const state = item.state || 'default'
                return (
                  <button
                    key={item.id}
                    className={`ws-mobile-drawer-item ${active ? 'active' : ''}`}
                    data-state={state}
                    onClick={() => onChange(item.id)}
                  >
                    <span className="ws-nav-icon">{item.icon || item.label?.slice(0, 1) || '·'}</span>
                    <span className="ws-nav-label">
                      <span className="ws-nav-label-main">{item.label}</span>
                      {item.hint && <span className="ws-nav-label-hint">{item.hint}</span>}
                    </span>
                  </button>
                )
              })}
            </nav>
            {footer && <div className="ws-mobile-drawer-footer">{footer}</div>}
          </div>
        </aside>

        <div className="ws-bottom-nav">
          {quickItems.map((item) => {
            const active = item.id === activeId
            return (
              <button
                key={`q-${item.id}`}
                className={`ws-bottom-nav-item ${active ? 'active' : ''}`}
                data-state={item.state || 'default'}
                onClick={() => onChange(item.id)}
              >
                <span className="ws-nav-icon">{item.icon || item.label?.slice(0, 1) || '·'}</span>
                <span className="ws-bottom-nav-label">{item.label}</span>
              </button>
            )
          })}
          <button className={`ws-bottom-nav-item ${drawerOpen ? 'active' : ''}`} onClick={() => setDrawerOpen(v => !v)}>
            <span className="ws-nav-icon">☰</span>
            <span className="ws-bottom-nav-label">菜单</span>
          </button>
        </div>
      </>
    )
  }

  return (
    <aside
      className={`ws-sidebar ${compact ? 'compact' : ''}`}
      onWheel={handleWheel}
      onMouseLeave={cancelHover}
    >
      {!compact && (
        <div className="ws-brand">
          <div className="ws-brand-badge">{brandTag}</div>
          <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.2, color: 'var(--text-strong)' }}>
            {brandTitle}
          </div>
        </div>
      )}
      {compact && (
        <div
          title={`${brandTag} · ${brandTitle}`}
          style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, rgba(124,106,247,0.45), rgba(78,205,196,0.32))', display: 'grid', placeItems: 'center', alignSelf: 'center', fontSize: 22 }}
        >
          🧪
        </div>
      )}

      <nav className="ws-nav" ref={navRef}>
        <div
          className="ws-nav-slider"
          style={{ top: slider.top, height: slider.height, opacity: slider.opacity }}
        />
        {items.map((item, idx) => {
          if (item.kind === 'section') {
            if (compact) return null
            return (
              <div key={`sec-${idx}`} className="ws-nav-section">{item.label}</div>
            )
          }
          const active = item.id === activeId
          const state = item.state || 'default'
          return (
            <button
              key={item.id}
              ref={node => { itemRefs.current[item.id] = node }}
              onClick={() => onChange(item.id)}
              onMouseEnter={() => scheduleHover(item.id)}
              className={`ws-nav-btn ${active ? 'active' : ''} ${compact ? 'compact' : ''}`}
              data-state={state}
              title={compact ? `${item.label}${item.hint ? ` · ${item.hint}` : ''}` : undefined}
            >
              <span className="ws-nav-icon">{item.icon || item.label?.slice(0, 1) || '·'}</span>
              {!compact && (
                <span className="ws-nav-label">
                  <span className="ws-nav-label-main">{item.label}</span>
                  {item.hint && <span className="ws-nav-label-hint">{item.hint}</span>}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {footer && !compact && (
        <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
          {footer}
        </div>
      )}
    </aside>
  )
}
