# Architecture

High-level map of the Sextant monorepo. Detailed design docs live beside the
code they describe; this file is the orientation layer.

## Shape

```
apps/        →  what users see        (TS / React, pnpm workspace)
packages/    →  shared TS libraries    (@sextant/*)
services/    →  compute & data         (polyglot; Python + Node)
docs/        →  engineering docs
```

## Principles

1. **The moat is the record, not the model.** The durable assets are a trader's
   own outcome data (journal), the community, and a system-of-record the AI
   comes back to — not any single LLM feature, which commoditizes. Build there.
2. **Be agent-native, not agent-replaceable.** Ship an MCP server (in
   `@sextant/sdk`) so a trader's personal agent can query *their* levels, rules,
   and history — where only Sextant holds the state.
3. **Honest by construction.** Positioning analytics (see `gex-engine`) are
   regime/risk context, not predictions. Surfaces show calibrated uncertainty.
   Tools and education, **not** individualized investment advice.
4. **Polyglot where it pays.** TS for product surfaces and glue; Python for the
   quant/data engines. Clean API boundaries between them.

## Data flow (target)

```
market-data  ─→  gex-engine  ─→  api  ─→  apps
                                  ↑
   journal (user outcomes)  ──────┘   (personalization + the flywheel)
```

## Open decisions

- Native ES/NQ options (CME-licensed) vs. SPX-options-mapped-to-futures for v1.
- Market-data provider & redistribution licensing (the real cost/legal gate).
- Hosting/runtime for the Python engine and the API.
