# Sextant

**AI‑native market intelligence & trading tooling.**
_Find your position._

Sextant reads the hidden structure of the market — dealer options positioning
(gamma / vanna / charm exposure), cross‑market order flow, and a trader's own
history — and turns it into clear, calibrated guidance for futures and
derivatives traders. Like the instrument it's named for, it fixes your position
when the horizon is nothing but noise.

> **Status:** early development. Structure and interfaces will change.

---

## Monorepo

This repository is the single home for every Sextant service, app, and shared
package. It is a **polyglot monorepo**: TypeScript / Node for apps, APIs, and
shared libraries; Python for the quantitative and data engines.

```
sextant/
├── apps/          # User-facing applications (web dashboard, marketing, …)
├── services/      # Backend services & engines
│   └── gex-engine/    # Options positioning (gamma exposure) engine — Python
├── packages/      # Shared TypeScript libraries (types, sdk, ui, config, …)
└── docs/          # Architecture & engineering docs
```

- **`apps/`** and **`packages/`** are a [pnpm](https://pnpm.io) workspace,
  orchestrated by [Turborepo](https://turborepo.com).
- **`services/`** may hold independently‑toolchained services (e.g. Python
  packages managed with [uv](https://docs.astral.sh/uv/)). Each service owns its
  README and toolchain, and is wired into the platform over well‑defined APIs.

## Getting started

Prerequisites: **Node ≥ 22**, **pnpm ≥ 10**, and — for Python services — **uv**.

```bash
pnpm install       # install JS/TS workspaces
pnpm dev           # run all dev tasks via Turborepo
pnpm build         # build every workspace
pnpm lint          # lint every workspace
```

Each `services/*` package documents its own setup in its own README.

## Conventions

- TypeScript packages are scoped under **`@sextant/*`**.
- Trunk‑based development on **`main`** — branch per change, open a PR.
- **Never commit secrets.** Copy `.env.example` → `.env` locally.
- Keep the honest line: Sextant provides **tools and analysis, not financial
  advice**. Surfaces should present calibrated context, not directives.

---

© 2026 Jino Labs. All rights reserved. License TBD (currently proprietary).
