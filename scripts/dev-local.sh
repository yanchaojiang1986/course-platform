#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

FRONT_PORT="${FRONT_PORT:-9527}"
BACK_PORT="${BACK_PORT:-4321}"
AUTH_REQUIRED="${AUTH_REQUIRED:-false}"

mkdir -p output logs

kill_port() {
  local port="$1"
  local pids
  pids="$(lsof -ti tcp:"$port" -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -n "$pids" ]]; then
    echo "[dev-local] 端口 $port 被占用，正在释放: $pids"
    kill $pids 2>/dev/null || true
    sleep 1
    pids="$(lsof -ti tcp:"$port" -sTCP:LISTEN 2>/dev/null || true)"
    if [[ -n "$pids" ]]; then
      echo "[dev-local] 强制释放端口 $port: $pids"
      kill -9 $pids 2>/dev/null || true
    fi
  fi
}

kill_port "$BACK_PORT"
kill_port "$FRONT_PORT"

if [[ -f output/backend.pid ]]; then
  old_pid="$(cat output/backend.pid 2>/dev/null || true)"
  [[ -n "$old_pid" ]] && kill "$old_pid" 2>/dev/null || true
fi
if [[ -f output/frontend.pid ]]; then
  old_pid="$(cat output/frontend.pid 2>/dev/null || true)"
  [[ -n "$old_pid" ]] && kill "$old_pid" 2>/dev/null || true
fi

nohup env AUTH_REQUIRED="$AUTH_REQUIRED" PORT="$BACK_PORT" node server.js > output/backend.log 2>&1 &
BACK_PID=$!
echo "$BACK_PID" > output/backend.pid

echo "[dev-local] 后端启动中: PID=$BACK_PID PORT=$BACK_PORT"
for _ in {1..20}; do
  if curl -fsS "http://localhost:${BACK_PORT}/api/auth/me" >/dev/null 2>&1; then
    echo "[dev-local] 后端健康检查通过"
    break
  fi
  sleep 0.5
done

nohup npm run dev -- --host 0.0.0.0 --port "$FRONT_PORT" --strictPort > output/frontend.log 2>&1 &
FRONT_PID=$!
echo "$FRONT_PID" > output/frontend.pid

echo "[dev-local] 前端启动中: PID=$FRONT_PID PORT=$FRONT_PORT"
for _ in {1..20}; do
  if curl -fsS "http://localhost:${FRONT_PORT}" >/dev/null 2>&1; then
    echo "[dev-local] 前端健康检查通过"
    break
  fi
  sleep 0.5
done

echo "[dev-local] 启动完成"
echo "[dev-local] 前端: http://localhost:${FRONT_PORT}"
echo "[dev-local] 后端: http://localhost:${BACK_PORT}"
echo "[dev-local] 日志: output/frontend.log, output/backend.log"
