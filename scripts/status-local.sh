#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

FRONT_PORT="${FRONT_PORT:-9527}"
BACK_PORT="${BACK_PORT:-4321}"

print_pid() {
  local name="$1"
  local file="$2"
  if [[ -f "$file" ]]; then
    local pid
    pid="$(cat "$file" 2>/dev/null || true)"
    if [[ -n "${pid:-}" ]] && ps -p "$pid" >/dev/null 2>&1; then
      echo "[status-local] $name 运行中 (PID: $pid)"
      return
    fi
  fi
  echo "[status-local] $name 未运行"
}

print_port() {
  local name="$1"
  local port="$2"
  if lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
    echo "[status-local] $name 端口 $port 监听中"
  else
    echo "[status-local] $name 端口 $port 未监听"
  fi
}

print_pid "后端" "output/backend.pid"
print_pid "前端" "output/frontend.pid"
print_port "后端" "$BACK_PORT"
print_port "前端" "$FRONT_PORT"
