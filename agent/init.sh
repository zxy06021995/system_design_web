#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "[init] root: $ROOT_DIR"
echo "[init] read progress and feature list"

if [ -f "$ROOT_DIR/agent/progress.md" ]; then
  tail -n 40 "$ROOT_DIR/agent/progress.md" || true
fi

if [ -f "$ROOT_DIR/agent/feature_list.json" ]; then
  cat "$ROOT_DIR/agent/feature_list.json"
fi

echo "[init] recent commits"
if [ -d "$ROOT_DIR/.git" ]; then
  git -C "$ROOT_DIR" log --oneline -n 20 || true
fi

echo "[init] done"
