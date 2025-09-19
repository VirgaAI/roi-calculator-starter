# Ospitek ROI Calculator (Starter Monorepo)

This repository contains the **core math library** and an **embeddable React widget** to calculate and visualize ROI for Ospitek's surgical intelligence platform. It also includes an example **demo app** and **CI pipeline**.

> **Security/Compliance:** This project is designed to run with **no PHI** and **minimal PII**. Keep it private. Use GitHub for source control, reviews, issues, and CI; host the user-facing widget on `ospitek.com` (e.g., `/roi`).

## What’s inside
- `@ospitek/roi-core` — TypeScript formulas + tests
- `@ospitek/roi-widget` — React component (embeddable UI)
- `apps/demo` — Vite app to preview the widget
- `.github/` — CI workflow + templates
- Shared configs for TypeScript/ESLint/Prettier

## Quickstart
```bash
pnpm install
pnpm -w dev
```
Open http://localhost:5173

## Commands
```bash
pnpm -w lint
pnpm -w typecheck
pnpm -w test
pnpm -w build
```

## No assumptions rules
- No PHI; keep inputs aggregated.
- All changes via PR with green CI.
