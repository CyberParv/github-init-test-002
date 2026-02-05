# Tests

This repository currently has no identifiable application stack (no package manager lockfiles, no source tree, no routes/UI entrypoints).

## What I need from you
Please provide **one** of the following so I can generate accurate unit/integration/E2E tests and CI quality gates:

1. A repo tree (preferred):
   - `ls -la`
   - `find . -maxdepth 4 -type f | sed 's|^./||'`

2. Or tell me the stack:
   - Backend: (Node/Express, NestJS, Python/FastAPI, Django, Go, Java/Spring, etc.)
   - Frontend: (React/Vite, Next.js, Vue, Angular, etc.)
   - Test runner preferences: (Jest/Vitest, Pytest, Go test, JUnit, etc.)
   - Primary UI route (e.g. `/`)
   - Key API endpoints to cover

## Once you provide that
I will add:
- Unit tests + integration tests for key endpoints
- E2E smoke test for primary UI route (Playwright/Cypress depending on stack)
- Scripts/commands to run tests locally and in CI (GitHub Actions)
