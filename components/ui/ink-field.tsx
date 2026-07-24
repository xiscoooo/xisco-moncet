"use client";

import { useEffect, useRef } from "react";

/**
 * InkField — an interactive halftone dot grid, a nod to newsprint.
 *
 * A near-invisible ink grid; dots swell and darken under a "loupe" that
 * follows the cursor. When the pointer is idle it drifts on a slow Lissajous
 * path, so the field stays alive. Monochrome, GPU-cheap, canvas-based.
 * Honours prefers-reduced-motion (renders a single static frame).
 */
export default function InkField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const SPACING = 30;      // grid pitch in CSS px
    const BASE_R = 0.5;      // ambient dot radius
    const MAX_R = 2.6;       // radius directly under the loupe
    const RADIUS = 190;      // loupe influence radius
    const INK = "26,22,18";  // #1a1612

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Loupe position (current, eased) + pointer target.
    let lx = 0, ly = 0;
    let tx = -9999, ty = -9999;
    let lastPointerMove = -Infinity;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (lx === 0 && ly === 0) { lx = width / 2; ly = height / 2; }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      lastPointerMove = performance.now();
    };

    const draw = (now: number) => {
      // Idle drift: if the pointer hasn't moved recently, wander slowly.
      const idle = now - lastPointerMove > 1800;
      if (idle) {
        const t = now / 1000;
        tx = width * (0.5 + 0.32 * Math.sin(t * 0.34));
        ty = height * (0.5 + 0.30 * Math.cos(t * 0.27));
      }
      // Ease the loupe toward its target.
      lx += (tx - lx) * 0.06;
      ly += (ty - ly) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const r2 = RADIUS * RADIUS;
      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          const dx = x - lx;
          const dy = y - ly;
          const d2 = dx * dx + dy * dy;
          let t = 0;
          if (d2 < r2) {
            const f = 1 - Math.sqrt(d2) / RADIUS;
            t = f * f; // ease-in falloff
          }
          const r = BASE_R + (MAX_R - BASE_R) * t;
          const alpha = 0.05 + 0.5 * t;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${INK},${alpha})`;
          ctx.fill();
        }
      }
    };

    let rafId = 0;
    const loop = (now: number) => {
      draw(now);
      rafId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduce) {
      draw(0); // single static frame
    } else {
      window.addEventListener("mousemove", onMove);
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
}
