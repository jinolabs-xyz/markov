"use client";

/*
 * AccessForm — honest, backend-free early-access capture.
 * On submit it composes a real email (opens the visitor's mail client) rather
 * than faking a saved-to-a-list state there is no backend for. Swap CONTACT
 * for a form endpoint (Cloudflare Pages Functions / Formspree) when one exists.
 */
import { useState } from "react";

const CONTACT = "hello@markov.io"; // placeholder — wire to a real inbox/endpoint

export default function AccessForm() {
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Markov — early access");
    const body = encodeURIComponent(
      `I'd like early access to Markov.\n\nEmail: ${email}\n`,
    );
    window.location.href = `mailto:${CONTACT}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
      aria-label="Request early access"
    >
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@desk.com"
        autoComplete="email"
        className="u-mono h-[2.9rem] flex-1 rounded-[9px] border border-[var(--line-2)] bg-[var(--surface)] px-4 text-[0.95rem] text-[var(--ink)] outline-none transition-colors focus:border-[var(--accent)]"
      />
      <button type="submit" className="u-btn u-btn--primary justify-center">
        Request access
      </button>
    </form>
  );
}
