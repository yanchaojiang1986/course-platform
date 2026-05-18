const LOG_KEY = 'cp_frontend_logs'
const MAX_LOGS = 500

function nowIso() {
  return new Date().toISOString()
}

function readLogs() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(LOG_KEY)
    const parsed = JSON.parse(raw || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeLogs(logs) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(LOG_KEY, JSON.stringify(logs.slice(-MAX_LOGS)))
  } catch {
    // ignore storage errors
  }
}

export function logClient(level, event, meta = {}) {
  const entry = {
    ts: nowIso(),
    level: String(level || 'info'),
    event: String(event || 'event'),
    meta,
  }

  if (entry.level === 'error') {
    console.error('[client]', entry)
  } else if (entry.level === 'warn') {
    console.warn('[client]', entry)
  } else {
    console.log('[client]', entry)
  }

  const logs = readLogs()
  logs.push(entry)
  writeLogs(logs)
}

export function getClientLogs() {
  return readLogs()
}
