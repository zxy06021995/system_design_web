# Runbook

## Build Failure
1. Run `npm run build`
2. Fix compile errors before any content continuation
3. Re-run build and record result in `progress.md`

## Smoke Failure
1. Run `npm run test:e2e:smoke`
2. Identify failure type:
   - routing
   - page render
   - markdown load
3. Fix and re-run smoke

## MCP Layer Unavailable
1. Keep quality gate unblocked with Playwright CLI: `npm run test:e2e:smoke`
2. Record MCP failure reason in `agent/progress.md`
3. Retry MCP after baseline smoke passes

## Network Push Failure
1. Keep local commit
2. Retry `git push`
3. If still blocked, log issue in `progress.md` and continue local work

## Port Cleanup
1. Check and close dev ports:
   - `5173`
   - `5174`
   - `5175`
