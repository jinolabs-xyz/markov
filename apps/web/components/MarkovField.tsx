"use client";

/*
 * MarkovField — the page's one authored motion moment.
 * A streaming random walk (price) bounded and mean-reverted by a call wall,
 * a put wall, and a gamma-flip line: dealer positioning bending a random
 * process. A faint Monte-Carlo fan at the head shows the distribution of the
 * next steps. Reduced-motion renders a single settled frame. Illustrative
 * levels — synthetic, not live market data.
 */
import { useEffect, useRef } from "react";

type Palette = {
  ink: string;
  ink3: string;
  line: string;
  accent: string;
  paper: string;
};

const LEVELS = [
  { key: "CALL WALL", value: "5 810", pos: 0.16 },
  { key: "GAMMA FLIP", value: "5 762", pos: 0.5 },
  { key: "PUT WALL", value: "5 720", pos: 0.84 },
];

function readPalette(): Palette {
  const s = getComputedStyle(document.documentElement);
  const g = (n: string, f: string) => s.getPropertyValue(n).trim() || f;
  return {
    ink: g("--ink", "#0a0c10"),
    ink3: g("--ink-3", "#767d87"),
    line: g("--line", "#e5e8ec"),
    accent: g("--accent", "#2b50ff"),
    paper: g("--paper", "#f6f7f9"),
  };
}

function gauss() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export default function MarkovField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    if (!ctx || !parent) return;

    let pal = readPalette();
    let W = 0;
    let H = 0;
    let dpr = 1;

    // model space: y in [0,1], 0 = top (call wall region)
    const STEP_PX = 4; // horizontal pixels per sample
    let ys: number[] = [];
    const flip = LEVELS[1].pos;
    const callY = LEVELS[0].pos;
    const putY = LEVELS[2].pos;

    function nextY(prev: number) {
      const sigma = 0.02;
      const k = 0.045; // mean reversion toward flip (long-gamma pinning)
      let y = prev + gauss() * sigma + (flip - prev) * k;
      // soft reflection at the walls
      const pad = 0.03;
      if (y < callY + pad) y = callY + pad + (callY + pad - y) * 0.5;
      if (y > putY - pad) y = putY - pad - (y - (putY - pad)) * 0.5;
      return Math.max(0.04, Math.min(0.96, y));
    }

    function resize() {
      const r = parent!.getBoundingClientRect();
      W = Math.max(1, Math.floor(r.width));
      H = Math.max(1, Math.floor(r.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const need = Math.ceil(W / STEP_PX) + 2;
      if (ys.length === 0) {
        ys = [flip];
        for (let i = 1; i < need; i++) ys.push(nextY(ys[i - 1]));
      } else if (ys.length < need) {
        while (ys.length < need) ys.push(nextY(ys[ys.length - 1]));
      } else {
        ys = ys.slice(ys.length - need);
      }
    }

    function yPx(v: number) {
      return 20 + v * (H - 40);
    }

    function drawLevels() {
      ctx!.save();
      ctx!.font =
        "600 10px var(--font-geist-mono), ui-monospace, monospace";
      ctx!.textBaseline = "middle";
      for (const lv of LEVELS) {
        const y = yPx(lv.pos);
        const isFlip = lv.key === "GAMMA FLIP";
        ctx!.beginPath();
        ctx!.strokeStyle = isFlip ? pal.accent : pal.line;
        ctx!.globalAlpha = isFlip ? 0.55 : 1;
        ctx!.lineWidth = 1;
        if (isFlip) ctx!.setLineDash([2, 5]);
        ctx!.moveTo(0, y);
        ctx!.lineTo(W, y);
        ctx!.stroke();
        ctx!.setLineDash([]);
        ctx!.globalAlpha = 1;
        // label
        const label = `${lv.key}  ${lv.value}`;
        const tw = ctx!.measureText(label).width;
        ctx!.fillStyle = isFlip ? pal.accent : pal.ink3;
        ctx!.fillText(label, W - tw - 12, y - 9);
      }
      ctx!.restore();
    }

    function drawFan(headX: number, headV: number) {
      ctx!.save();
      ctx!.strokeStyle = pal.accent;
      ctx!.lineWidth = 1;
      const paths = 16;
      const steps = 22;
      for (let p = 0; p < paths; p++) {
        let v = headV;
        ctx!.beginPath();
        ctx!.globalAlpha = 0.06;
        ctx!.moveTo(headX, yPx(v));
        for (let s = 1; s <= steps; s++) {
          v = nextY(v);
          ctx!.lineTo(headX + s * STEP_PX, yPx(v));
        }
        ctx!.stroke();
      }
      ctx!.restore();
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      drawLevels();

      const n = ys.length;
      const headIndex = n - 24; // keep the head a bit inset so the fan shows
      const headX = headIndex * STEP_PX;

      // realized path with a fade-in from the left
      ctx!.save();
      ctx!.lineJoin = "round";
      ctx!.lineWidth = 2;
      for (let i = 1; i < headIndex; i++) {
        const x0 = (i - 1) * STEP_PX;
        const x1 = i * STEP_PX;
        ctx!.beginPath();
        ctx!.globalAlpha = Math.min(1, (i / headIndex) * 1.4);
        ctx!.strokeStyle = pal.ink;
        ctx!.moveTo(x0, yPx(ys[i - 1]));
        ctx!.lineTo(x1, yPx(ys[i]));
        ctx!.stroke();
      }
      ctx!.restore();

      // probability fan + glowing head
      drawFan(headX, ys[headIndex]);
      const hy = yPx(ys[headIndex]);
      ctx!.save();
      ctx!.shadowColor = pal.accent;
      ctx!.shadowBlur = 16;
      ctx!.fillStyle = pal.accent;
      ctx!.beginPath();
      ctx!.arc(headX, hy, 4, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    // ---- lifecycle ----
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = 0;
    let acc = 0;
    let running = true;

    function frame(t: number) {
      if (!running) return;
      if (!last) last = t;
      const dt = t - last;
      last = t;
      acc += dt;
      // advance one sample every ~46ms (streaming chart cadence)
      while (acc > 46) {
        ys.push(nextY(ys[ys.length - 1]));
        ys.shift();
        acc -= 46;
      }
      draw();
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (raf || reduce.matches) return;
      last = 0;
      acc = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(parent);

    const io = new IntersectionObserver(
      ([e]) => {
        running = e.isIntersecting;
        if (running) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVis = () => {
      running = !document.hidden;
      if (running) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVis);

    const onTheme = () => {
      pal = readPalette();
      draw();
    };
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", onTheme);

    resize();
    if (reduce.matches) {
      // settled single frame, no loop
      for (let i = 0; i < 200; i++) {
        ys.push(nextY(ys[ys.length - 1]));
        ys.shift();
      }
      draw();
    } else {
      draw();
      start();
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      mq.removeEventListener?.("change", onTheme);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="block h-full w-full"
    />
  );
}
