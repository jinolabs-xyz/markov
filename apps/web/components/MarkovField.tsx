"use client";

/*
 * MarkovField — the page's one authored motion moment.
 * A streaming random walk (price) held between a call wall and a put wall and
 * pulled toward the gamma-flip line: dealer positioning bending a random
 * process. A faint Monte-Carlo fan at the head shows the next-step
 * distribution. Reduced-motion renders a single settled frame.
 * Illustrative — synthetic levels, not live market data.
 */
import { useEffect, useRef } from "react";

const MONO =
  "600 10px ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace";

const LEVELS = [
  { key: "CALL WALL", value: "5810", pos: 0.2, kind: "wall" as const },
  { key: "GAMMA FLIP", value: "5762", pos: 0.5, kind: "flip" as const },
  { key: "PUT WALL", value: "5720", pos: 0.8, kind: "wall" as const },
];

type Palette = {
  ink: string;
  ink2: string;
  ink3: string;
  accent: string;
  surface: string;
};

function readPalette(): Palette {
  const s = getComputedStyle(document.documentElement);
  const g = (n: string, f: string) => s.getPropertyValue(n).trim() || f;
  return {
    ink: g("--ink", "#0a0c10"),
    ink2: g("--ink-2", "#454b54"),
    ink3: g("--ink-3", "#767d87"),
    accent: g("--accent", "#2b50ff"),
    surface: g("--surface", "#ffffff"),
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

    const STEP_PX = 4;
    const flip = 0.5;
    const callY = 0.2;
    const putY = 0.8;
    let ys: number[] = [];

    function nextY(prev: number) {
      const sigma = 0.019;
      const k = 0.05; // pull toward the flip (long-gamma pinning)
      let y = prev + gauss() * sigma + (flip - prev) * k;
      const pad = 0.04;
      if (y < callY + pad) y = callY + pad + (callY + pad - y) * 0.6;
      if (y > putY - pad) y = putY - pad - (y - (putY - pad)) * 0.6;
      return Math.max(0.06, Math.min(0.94, y));
    }

    function yPx(v: number) {
      return 22 + v * (H - 44);
    }

    function resize() {
      const r = parent!.getBoundingClientRect();
      W = Math.max(1, Math.floor(r.width));
      H = Math.max(1, Math.floor(r.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
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

    function label(text: string, y: number, color: string) {
      ctx!.font = MONO;
      ctx!.textBaseline = "middle";
      const tw = ctx!.measureText(text).width;
      const x = W - tw - 12;
      // opaque chip so the label stays legible over the walk
      ctx!.fillStyle = pal.surface;
      ctx!.fillRect(x - 6, y - 8, tw + 12, 16);
      ctx!.fillStyle = color;
      ctx!.fillText(text, x, y);
    }

    function drawLevels() {
      for (const lv of LEVELS) {
        const y = yPx(lv.pos);
        if (lv.kind === "flip") {
          ctx!.save();
          ctx!.strokeStyle = pal.accent;
          ctx!.globalAlpha = 0.7;
          ctx!.lineWidth = 1;
          ctx!.setLineDash([2, 5]);
          ctx!.beginPath();
          ctx!.moveTo(0, y);
          ctx!.lineTo(W, y);
          ctx!.stroke();
          ctx!.restore();
          label(`${lv.key} ${lv.value}`, y - 11, pal.accent);
        } else {
          // faint band + solid edge to read as a "wall"
          ctx!.save();
          ctx!.fillStyle = pal.ink3;
          ctx!.globalAlpha = 0.06;
          const band = 8;
          const dir = lv.pos < 0.5 ? -1 : 1;
          ctx!.fillRect(0, y, W, band * dir);
          ctx!.globalAlpha = 0.85;
          ctx!.strokeStyle = pal.ink3;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(0, y);
          ctx!.lineTo(W, y);
          ctx!.stroke();
          ctx!.restore();
          label(`${lv.key} ${lv.value}`, lv.pos < 0.5 ? y - 11 : y + 11, pal.ink3);
        }
      }
    }

    function drawFan(headX: number, headV: number) {
      ctx!.save();
      ctx!.strokeStyle = pal.accent;
      ctx!.lineWidth = 1;
      ctx!.globalAlpha = 0.07;
      for (let p = 0; p < 16; p++) {
        let v = headV;
        ctx!.beginPath();
        ctx!.moveTo(headX, yPx(v));
        for (let s = 1; s <= 20; s++) {
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
      const headIndex = n - 22;
      const headX = headIndex * STEP_PX;

      // realized path, fading in from the left
      ctx!.save();
      ctx!.lineJoin = "round";
      ctx!.lineWidth = 2;
      ctx!.strokeStyle = pal.ink;
      for (let i = 1; i < headIndex; i++) {
        ctx!.globalAlpha = Math.min(1, (i / headIndex) * 1.5);
        ctx!.beginPath();
        ctx!.moveTo((i - 1) * STEP_PX, yPx(ys[i - 1]));
        ctx!.lineTo(i * STEP_PX, yPx(ys[i]));
        ctx!.stroke();
      }
      ctx!.restore();

      drawFan(headX, ys[headIndex]);

      // glowing head
      const hy = yPx(ys[headIndex]);
      ctx!.save();
      ctx!.shadowColor = pal.accent;
      ctx!.shadowBlur = 15;
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
      acc += t - last;
      last = t;
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

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onTheme = () => {
      pal = readPalette();
      draw();
    };
    mq.addEventListener?.("change", onTheme);

    resize();
    if (reduce.matches) {
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

  return <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />;
}
