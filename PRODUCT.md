# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Marketing/product site: **Next.js (App Router)**, deployed to **Cloudflare**, living in the monorepo at `apps/web`. The broader platform is polyglot — Python powers the quantitative service (`services/gex-engine`). Stack chosen by the user 2026-08-18.

## Users

Primary: **retail futures day-traders**, concentrated in the **prop / funded-account** world (Apex, Topstep, MyFundedFutures and similar) — traders working evaluations and funded accounts who live on intraday ES/NQ and need an edge and, above all, not to breach risk rules. Secondary: serious derivatives/options-aware traders who want dealer-positioning context. Skews male, 25–44, mobile- and community-native (Discord/Telegram, fintwit, r/FuturesTrading).

## Product Purpose

Read the **hidden structure of the market** — dealer options positioning (gamma exposure / walls / gamma flip), cross-market order flow, and the trader's own history — and turn it into **clear, calibrated guidance for futures traders**. The product exists because the signals that move index futures intraday (options dealer hedging, 0DTE gamma) are invisible to the retail futures trader, who trades ES/NQ without seeing the SPX options positioning that drives them. Success = the trader navigates the session with the institutional map in hand and stays inside their risk rules.

## Positioning

Options-derived dealer positioning **mapped natively onto the futures a trader actually trades** (ES/NQ), wrapped with three things no incumbent has combined: **AI plain-language explanation**, **trade journaling on the user's own outcomes**, and **prop-firm rule awareness** — plus an **agent-native MCP surface** so a trader's own AI assistant can query their levels, rules, and history (which only this product holds). Today only ~one vendor (MenthorQ) serves futures-native gamma at all, and none couple it to journaling, prop-rules, or an honest/calibrated frame. The durable moat is the **trader's own outcome data + community + system-of-record**, not the AI layer (which commoditizes).

## Operating Context

Traders operate on TradingView/broker charts and futures platforms (NinjaTrader, Sierra Chart, Tradovate), inside prop-firm evaluations with hard drawdown/consistency rules, across a ~23-hour Globex session including overnight. They congregate in Discord/Telegram, YouTube (ICT / Smart-Money-Concepts, prop-firm reviews), fintwit, and Reddit. Buying and community increasingly transact through Whop. Decisions are made fast, intraday, under real risk-of-ruin.

## Capabilities and Constraints

Intended capabilities (product direction; **not yet built**): a gamma-exposure engine (`services/gex-engine`) computing per-strike greeks and futures-mapped **call wall / put wall / gamma flip**; an AI explanation layer; a **trade journal + outcome flywheel**; a **prop rule guardian** (pre-breach drawdown/consistency warnings); an **agent-native MCP server**.

Hard constraints (must be honored by all copy and design):
- **Open interest is end-of-day**; anything intraday is a *model*, not a measurement.
- The dealer-positioning sign is a **heuristic**, and GEX is **regime / risk context, not a predictive signal** (a vendor's own 8-year backtest shows its independent edge collapses once volatility regime is known).
- **Tools & education, not individualized investment advice** — stay clear of the RIA line and of SEC "AI-washing" (never state accuracy/performance that isn't substantiated).

Explicitly undecided: native ES/NQ options (CME-licensed) vs SPX-options-mapped-to-futures for v1; the market-data provider and its redistribution licensing (the real cost gate); whether the founding team has the options-quant/data-engineering skill to build vs. buy the engine (the open go/no-go).

## Brand Commitments

- **Name: Markov** (chosen 2026-08-18). After the mathematician Andrey Markov; a *Markov process* is a memoryless random process — the math used to model markets. The thesis: *trading is an ancient practice we now lay mathematics over, in a world that is fundamentally random.* Target domain: `markov.io` (available at naming; registration pending — do not claim it as owned).
- **Binding visual reference: supermemory.ai** (recorded per the user; to be interpreted, not copied, in the design step).
- **Voice:** honest, calibrated, un-hyped. Sells the *map and the risk context*, never a prophecy. No fabricated proof.
- Repo: public org `jinolabs-xyz` (repo being renamed to `markov`).

## Evidence on Hand

- A strategy/market-research brief exists (produced this session, private artifact) — internal, not site content.
- **There is no shipped product yet.** The repo is a scaffold; `services/gex-engine` is a documented stub (`NotImplementedError`).
- **Must NOT be fabricated on the site:** user counts, testimonials, "trusted by" logos, revenue/AUM, win rates, accuracy percentages, backtest performance, press, or any existing-traction claim. The honest posture is **early / building**, not established. This is both an integrity requirement and a legal one (AI-washing).

## Product Principles

1. **Honest by construction.** Calibrated uncertainty over confident numbers; regime/risk context, not predictions; tools & education, not advice.
2. **The moat is the record, not the model.** Optimize for the trader's own outcome data, community, and system-of-record — the things a general AI agent can't regenerate.
3. **Be agent-native, not agent-replaceable.** Ship the MCP surface so personal agents plug into Markov, where the state lives.
4. **Futures-native and prop-aware.** Speak ES/NQ and drawdown rules, not just SPX indicators.
5. **Sell the map, not a prophecy.** The edge is seeing hidden structure and managing risk, never a promised outcome.

## Accessibility & Inclusion

Marketing site targets WCAG 2.1 AA: legible contrast in both themes, keyboard-operable, `prefers-reduced-motion` honored, real focus states.
