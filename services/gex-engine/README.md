# gex-engine

The **options positioning engine** — Sextant's core quantitative service.

Given an options chain (open interest, volume, and prices for an underlying such
as SPX/SPY/NDX or ES/NQ options), it:

1. Solves implied volatility per contract and computes greeks
   (Black‑Scholes for index/equity options, **Black‑76** for options on futures).
2. Aggregates **gamma exposure (GEX)** per strike under an explicit,
   documented dealer‑positioning assumption.
3. Derives the levels a trader acts on — **gamma flip / zero‑gamma**, **call
   wall**, **put wall** — and maps them onto the corresponding **futures price**
   (basis‑adjusted).

> **Honesty note.** Open interest is end‑of‑day; intraday exposure is *modeled*,
> not measured, and the dealer‑sign convention is a heuristic. GEX is treated as
> **regime / risk context**, not a predictive signal. Methodology and its limits
> are documented alongside the code — never hidden behind a confident number.

## Stack

- Python ≥ 3.11, managed with [uv](https://docs.astral.sh/uv/).
- No heavy market-data dependency is committed; the provider is configured via
  env (see `.env.example`).

## Develop

```bash
cd services/gex-engine
uv sync
uv run pytest
```

## Status

Scaffold only. `src/gex_engine/gamma.py` documents the intended public surface;
the implementation and provider adapters are the first build.
