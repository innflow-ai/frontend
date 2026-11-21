#!/bin/bash
set -euo pipefail
cd /Users/ak/innflow-web
codex exec --cd /Users/ak/innflow-web --approve-for-me \
  -i /Users/ak/innflow-web/.codex-inbox-hero-cleanup.png \
  - < /Users/ak/innflow-web/.codex-prompt-hero-cleanup.md \
  2>&1 | tee /Users/ak/innflow-web/.codex-hero-cleanup.log
echo EXIT:$?
