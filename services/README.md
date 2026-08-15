# services/

Backend services and compute engines. Services are **polyglot** — each owns its
own toolchain and README, and communicates over well‑defined APIs. A service in
a JS/TS toolchain participates in the pnpm workspace (via its `package.json`); a
Python service is managed independently (e.g. with `uv`).

Current:

- **`gex-engine/`** — options positioning (gamma exposure) computation engine.
  Python. Computes per‑strike greeks/exposure from options chains and maps them
  to futures price levels (support/resistance, gamma flip, walls).

Planned (indicative):

- **`market-data/`** — normalized options/futures data ingestion & caching.
- **`api/`** — the public/gateway API the apps talk to.
- **`journal/`** — trade journaling + outcome data store (the proprietary flywheel).
