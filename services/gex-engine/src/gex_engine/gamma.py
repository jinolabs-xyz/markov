"""Intended public surface for the gamma-exposure engine.

This module documents the shape of the engine so the rest of the monorepo can be
built against a stable interface. The implementations are the first real build;
they intentionally raise ``NotImplementedError`` for now.

Design notes (kept honest and explicit):

* Open interest is an end-of-day snapshot. Anything intraday is a *model* layered
  on stale OI plus signed flow, not a measurement.
* The dealer-positioning sign (calls +, puts -) is a heuristic convention, not an
  observed dealer book. It can be wrong in speculative regimes.
* Output is regime / risk *context*. It is not investment advice and not a
  predictive bounce-line generator.
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class Regime(str, Enum):
    """Dealer gamma regime relative to spot."""

    LONG_GAMMA = "long_gamma"  # vol-dampening, mean-reverting / pinning
    SHORT_GAMMA = "short_gamma"  # vol-amplifying, trending


@dataclass(frozen=True)
class OptionQuote:
    """A single option contract observation."""

    strike: float
    expiry: str  # ISO date
    is_call: bool
    open_interest: int
    volume: int
    mid_price: float


@dataclass(frozen=True)
class PositioningLevels:
    """Levels a futures trader acts on, already mapped to futures price."""

    underlying: str  # e.g. "SPX"
    futures_symbol: str  # e.g. "ES"
    spot: float
    gamma_flip: float  # zero-gamma level (futures price)
    call_wall: float  # largest positive-gamma strike above spot (resistance)
    put_wall: float  # largest (put) gamma strike below spot (support)
    net_gex: float  # $ notional per 1% move
    regime: Regime


def compute_positioning(
    underlying: str,
    futures_symbol: str,
    spot: float,
    chain: list[OptionQuote],
    *,
    basis: float = 0.0,
) -> PositioningLevels:
    """Compute futures-mapped positioning levels from an options chain.

    Args:
        underlying: Index/equity whose options carry the dealer book (e.g. "SPX").
        futures_symbol: Futures contract to map levels onto (e.g. "ES").
        spot: Current spot/index price.
        chain: Options chain observations for the underlying.
        basis: Futures basis (F - S) to add when mapping index strikes to futures.

    Returns:
        PositioningLevels mapped to the futures price.

    Raises:
        NotImplementedError: scaffold — implementation is the first build.
    """
    raise NotImplementedError("gex-engine: compute_positioning is not yet implemented")
