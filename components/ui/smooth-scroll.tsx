"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum smooth-scroll (Lenis) with anchor interception.
 *
 * - Disabled entirely under prefers-reduced-motion (falls back to native).
 * - In-page hash links (#about, …) are animated with a fixed-header offset,
 *   so the existing <Nav> and <SectionDots> keep working.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Intercept in-page anchor clicks for animated scroll with header offset.
    const HEADER_OFFSET = -80;
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        // "back to top" logo link
        if (href === "#") {
          e.preventDefault();
          lenis.scrollTo(0, { offset: 0 });
        }
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: HEADER_OFFSET });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
