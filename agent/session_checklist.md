# Session Checklist

## Start Session
- Read `agent/progress.md`
- Read `agent/feature_list.json`
- Check recent commits
- Verify dependency health:
  - `npm run build`
- Verify smoke test availability:
  - `npm run test:e2e:smoke -- --list` (optional)

## During Session
- Process exactly one target question file at a time
- Apply quality gate before moving to next question
- Keep changes scoped and commit small

## End Session
- Update `agent/progress.md`
- Update `agent/feature_list.json` status and timestamp
- Commit with validation evidence
- Ensure no dev ports left open (`5173`, `5174`, `5175`)
