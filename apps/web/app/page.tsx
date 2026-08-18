import MarkovField from "@/components/MarkovField";
import AccessForm from "@/components/AccessForm";

const GITHUB = "https://github.com/jinolabs-xyz/markov";

function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2 font-[var(--font-display)] text-[1.05rem] font-semibold tracking-[-0.03em] text-[var(--ink)]">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <polyline
          points="1,15 4,9 7,12 10,4 13,10 16,7 21,13"
          stroke="var(--accent)"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx="10" cy="4" r="2" fill="var(--accent)" />
      </svg>
      Markov
    </span>
  );
}

export default function Home() {
  return (
    <>
      {/* ---------- nav ---------- */}
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_82%,transparent)] backdrop-blur-md">
        <div className="u-shell flex h-16 items-center justify-between">
          <a href="#top" aria-label="Markov home">
            <Wordmark />
          </a>
          <nav className="hidden items-center gap-8 text-[0.92rem] text-[var(--ink-2)] md:flex">
            <a className="transition-colors hover:text-[var(--ink)]" href="#how">
              How it works
            </a>
            <a className="transition-colors hover:text-[var(--ink)]" href="#build">
              What we&rsquo;re building
            </a>
            <a className="transition-colors hover:text-[var(--ink)]" href="#principles">
              Principles
            </a>
            <a
              className="transition-colors hover:text-[var(--ink)]"
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </nav>
          <a href="#access" className="u-btn u-btn--primary h-10">
            Request access
          </a>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* ---------- hero ---------- */}
        <section className="u-lattice border-b border-[var(--line)]">
          <div className="u-shell grid items-center gap-10 py-16 md:grid-cols-[1.02fr_1fr] md:gap-14 md:py-24">
            <div>
              <h1 className="u-h1 text-[var(--ink)]">
                Read the hidden structure the futures market moves on.
              </h1>
              <p className="u-lede mt-7 max-w-[46ch]">
                Dealer options positioning &mdash; the gamma walls, the flip,
                the levels &mdash; steers every intraday move in ES and NQ, and
                you never see it. Markov computes it and maps it onto the
                futures you trade. Context and risk, calibrated &mdash; never a
                prophecy.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="u-btn u-btn--primary"
                >
                  Follow development on GitHub
                  <span aria-hidden="true">&rarr;</span>
                </a>
                <a href="#how" className="u-btn u-btn--ghost">
                  See how it works
                </a>
              </div>
              <p className="u-mono mt-8 text-[0.78rem] text-[var(--ink-3)]">
                // private development &middot; markov.io &middot; no product
                yet &mdash; building in the open
              </p>
            </div>

            {/* the signature: a random walk bent by the walls */}
            <div className="relative">
              <div className="u-label mb-2 flex items-center justify-between">
                <span>ES &middot; random walk, bounded by positioning</span>
                <span className="text-[var(--accent)]">live model</span>
              </div>
              <div className="h-[300px] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] sm:h-[380px] md:h-[440px]">
                <MarkovField />
              </div>
              <p className="u-mono mt-2 text-[0.68rem] text-[var(--ink-3)]">
                Illustrative &mdash; synthetic levels, not live market data.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- mechanism ---------- */}
        <section id="how" className="border-b border-[var(--line)]">
          <div className="u-shell py-20 md:py-28">
            <h2 className="u-h2 max-w-[20ch] text-[var(--ink)]">
              The options market moves the futures market.
            </h2>
            <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
              <div className="u-prose text-[1.02rem] leading-relaxed">
                <p>
                  When you trade ES or NQ, price is pushed and pinned by how
                  options dealers hedge their gamma. The biggest strikes become
                  walls &mdash; magnets that attract price and barriers that
                  turn it away. The line where dealer gamma flips sign decides
                  the whole regime of the session.
                </p>
                <p className="mt-4">
                  That structure is computable from the options chain. The
                  catch: it lives in the index options you are not watching,
                  denominated in a market you do not trade. Markov computes it
                  and draws it where it matters &mdash; on your futures.
                </p>
                <p className="u-mono mt-6 text-[0.8rem] text-[var(--ink-3)]">
                  Open interest is end-of-day; intraday is modeled, and we show
                  the assumptions rather than hide them.
                </p>
              </div>

              {/* the two regimes, labeled — not cards */}
              <div className="grid grid-cols-2 divide-x divide-[var(--line)] rounded-xl border border-[var(--line)] bg-[var(--surface)]">
                <div className="p-5">
                  <div className="u-label text-[var(--up)]">Above the flip</div>
                  <svg viewBox="0 0 120 44" className="mt-4 h-11 w-full" aria-hidden="true">
                    <path
                      d="M2 22 Q 14 8 26 22 T 50 22 T 74 22 T 98 22 T 118 22"
                      fill="none"
                      stroke="var(--ink-2)"
                      strokeWidth="1.6"
                    />
                  </svg>
                  <h3 className="u-h3 mt-4 text-[var(--ink)]">Dampened</h3>
                  <p className="mt-1 text-[0.9rem] text-[var(--ink-2)]">
                    Dealers sell strength, buy weakness. Volatility compresses;
                    price pins toward the big strikes.
                  </p>
                </div>
                <div className="p-5">
                  <div className="u-label text-[var(--down)]">Below the flip</div>
                  <svg viewBox="0 0 120 44" className="mt-4 h-11 w-full" aria-hidden="true">
                    <path
                      d="M2 34 L 26 30 L 42 36 L 66 18 L 84 24 L 118 4"
                      fill="none"
                      stroke="var(--ink-2)"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3 className="u-h3 mt-4 text-[var(--ink)]">Amplified</h3>
                  <p className="mt-1 text-[0.9rem] text-[var(--ink-2)]">
                    Dealers hedge with the move. Trends extend and breaks run;
                    risk of ruin climbs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- what we're building ---------- */}
        <section id="build" className="border-b border-[var(--line)]">
          <div className="u-shell py-20 md:py-28">
            <h2 className="u-h2 max-w-[24ch] text-[var(--ink)]">
              What we&rsquo;re building.
            </h2>
            <p className="u-prose mt-5 text-[1.02rem]">
              One place to see the map, keep the record only you own, and stay
              inside your rules.
            </p>

            <div className="mt-12 border-t border-[var(--line)]">
              {[
                {
                  label: "Positioning",
                  title: "The levels, on your futures chart.",
                  body: "Gamma walls, the flip, and the map — computed from options, drawn on ES and NQ, updated through the session. Regime and risk context, not buy-and-sell signals.",
                },
                {
                  label: "Journal",
                  title: "A record that compounds.",
                  body: "Your trades, theses, and outcomes in one place. It is the data that makes the coaching yours — and the one asset a general AI cannot regenerate.",
                },
                {
                  label: "Guardian",
                  title: "Never breach a rule again.",
                  body: "Live drawdown and consistency tracking across your prop accounts, warning you before you cross the line — the single most common way funded traders blow up.",
                },
                {
                  label: "Agent",
                  title: "Bring your own AI.",
                  body: "An MCP endpoint so your own Claude or ChatGPT can ask Markov where the flip is, or whether a trade fits your rules — because only Markov holds your record.",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="grid gap-2 border-b border-[var(--line)] py-8 md:grid-cols-[200px_1fr] md:gap-10 md:py-9"
                >
                  <div className="u-label pt-1 text-[var(--accent)]">
                    {row.label}
                  </div>
                  <div className="max-w-[62ch]">
                    <h3 className="u-h3 text-[var(--ink)]">{row.title}</h3>
                    <p className="mt-2 text-[0.98rem] text-[var(--ink-2)]">
                      {row.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- principles (quiet, drenched) ---------- */}
        <section
          id="principles"
          className="bg-[var(--ink)] text-[var(--paper)]"
        >
          <div className="u-shell py-20 md:py-28">
            <h2 className="u-h2 max-w-[18ch] text-[var(--paper)]">
              We sell the map, not a prophecy.
            </h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-[color-mix(in_srgb,var(--paper)_14%,transparent)] md:grid-cols-3">
              {[
                {
                  h: "Calibrated, not confident.",
                  p: "Positioning is regime and risk context. When the data is thin, the interface says so — instead of inventing a number you would trade on.",
                },
                {
                  h: "Tools, not advice.",
                  p: "Markov never tells you to buy or sell. That line between education and investment advice is the law, and we stay firmly on the right side of it.",
                },
                {
                  h: "Your record is the moat.",
                  p: "The value compounds in your own trades, rules, and outcomes — not in a model anyone can rent. What you build here is yours.",
                },
              ].map((c) => (
                <div key={c.h} className="bg-[var(--ink)] p-7">
                  <h3 className="u-h3 text-[var(--paper)]">{c.h}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[color-mix(in_srgb,var(--paper)_66%,transparent)]">
                    {c.p}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- access ---------- */}
        <section id="access" className="u-lattice border-b border-[var(--line)]">
          <div className="u-shell py-20 text-center md:py-28">
            <h2 className="u-h2 mx-auto max-w-[20ch] text-[var(--ink)]">
              Markov is in private development.
            </h2>
            <p className="u-prose mx-auto mt-5 text-[1.02rem]">
              There is no product to log into yet &mdash; we are building in the
              open. Follow along on GitHub, or leave your email and we will
              reach out when early access opens.
            </p>
            <div className="mt-9 flex flex-col items-center gap-4">
              <AccessForm />
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="u-btn u-btn--ghost"
              >
                Follow development on GitHub
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- footer ---------- */}
      <footer className="bg-[var(--paper)]">
        <div className="u-shell flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-3 text-[0.9rem] text-[var(--ink-2)]">
              AI-native market intelligence for futures traders. A Jino Labs
              venture.
            </p>
          </div>
          <div className="flex gap-14 text-[0.9rem]">
            <div className="flex flex-col gap-2">
              <span className="u-label mb-1">Build</span>
              <a className="text-[var(--ink-2)] hover:text-[var(--ink)]" href={GITHUB} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="text-[var(--ink-2)] hover:text-[var(--ink)]" href="#build">
                Roadmap
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="u-label mb-1">Company</span>
              <a className="text-[var(--ink-2)] hover:text-[var(--ink)]" href="#principles">
                Principles
              </a>
              <a className="text-[var(--ink-2)] hover:text-[var(--ink)]" href="mailto:hello@markov.io">
                Contact
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--line)]">
          <div className="u-shell flex flex-col gap-3 py-6 text-[0.78rem] text-[var(--ink-3)] md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl">
              Markov provides research tools and education, not financial,
              investment, or trading advice. Trading futures and options carries
              a substantial risk of loss.
            </p>
            <p className="u-mono whitespace-nowrap">
              &copy; 2026 Jino Labs &middot; markov.io
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
