#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

FRONT_PORT="${FRONT_PORT:-9527}"
BACK_PORT="${BACK_PORT:-4321}"

stop_pid_file() {
  local file="$1"
  if [[ -f "$file" ]]; then
    local pid
    pid="$(cat "$file" 2>/dev/null || true)"
    if [[ -n "${pid:-}" ]]; then
      kill "$pid" 2>/dev/null || true
      sleep 0.5
      kill -9 "$pid" 2>/dev/null || true
      echo "[stop-local] 已停止 PID $pid"
    fi
    rm -f "$file"
  fi
}

stop_port() {
  local port="$1"
  local pids
  pids="$(lsof -ti tcp:"$port" -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -n "$pids" ]]; then
    kill $pids 2>/dev/null || true
    sleep 0.5
    pids="$(lsof -ti tcp:"$port" -sTCP:LISTEN 2>/dev/null || true)"
    [[ -n "$pids" ]] && kill -9 $pids 2>/dev/null || true
    echo "[stop-local] 已释放端口 $port"
  fi
}

stop_pid_file output/backend.pid
stop_pid_file output/frontend.pid
stop_port "$BACK_PORT"
stop_port "$FRONT_PORT"

echo "[stop-local] 本地服务已停止"
