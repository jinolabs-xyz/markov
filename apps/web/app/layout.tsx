/*
 * ============================================================================
 * DIRECTION CONTRACT — Markov landing (Persuade)   seed: brief-pinned (no roll)
 * ----------------------------------------------------------------------------
 * THESIS: A futures trader's edge is the hidden options positioning that bends
 *   price. This page refuses the SaaS hero-with-stat-cards; it opens on the
 *   mechanism itself, alive.
 * OWN-WORLD: Bright dev-infra world pinned from supermemory.ai — cool near-white
 *   ground, heavy Geist display, one electric-ultramarine accent, a faint
 *   probability-lattice of dots, Geist Mono for data/levels. Made Markov's own
 *   by a live random-walk field (canvas), never a static image.
 * STORY: The market looks random; the structure is computable. Markov maps
 *   dealer gamma onto ES/NQ as levels — calibrated context, not predictions.
 *   Visitor follows development / requests early access.
 * FIRST VIEWPORT: Left — one heavy headline + lede + two actions. Right — the
 *   MarkovField random walk resolving against a level ladder. Primary action
 *   (GitHub) sits under the headline, above the fold.
 * FORM: dev-infra landing, pinned. FINISH: unreviewed and undocumented is
 *   unfinished; this build ends with the finish review, the verdict, DESIGN.md,
 *   and every shipping raster carrying its provenance.
 * ============================================================================
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Markov — read the market's hidden structure",
  description:
    "The options positioning that moves ES and NQ is invisible to you. Markov computes dealer gamma — walls, the flip, the levels — and maps it onto the futures you trade. Calibrated context, not predictions.",
  metadataBase: new URL("https://markov.io"),
  openGraph: {
    title: "Markov — read the market's hidden structure",
    description:
      "Dealer options positioning, mapped onto the futures you trade. Context and risk, calibrated — never a prophecy.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
