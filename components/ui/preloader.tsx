"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  // Count 00 → 100, ease-out, like a press warming up.
  useEffect(() => {
    const DURATION = 1500;
    const start = performance.now();
    let rafId = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 300);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9997] flex flex-col items-center justify-center bg-[#f5f1e8]"
        >
          {/* Paper grain on preloader */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' seed='3'/%3E%3CfeColorMatrix values='0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Top masthead line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-[#d4c9b3] px-6 py-4"
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#8a7c6a]">
              Vol. I · № 04
            </span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#8a7c6a]">
              Paris · MMXXVI
            </span>
          </motion.div>

          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#8a7c6a]"
            >
              ¶ Now printing
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
              className="mt-3 font-display text-7xl italic text-[#1a1612] md:text-8xl"
            >
              Xisco
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
                className="text-[#8c2a1f]"
              >
                .
              </motion.span>
            </motion.h1>

            <div className="mx-auto mt-6 h-px w-40 origin-left overflow-hidden bg-[#d4c9b3]">
              <motion.div
                className="h-full bg-[#8c2a1f]"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>

          {/* Counter, bottom-right — like a page proof */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between border-t border-[#d4c9b3] px-6 py-4">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[#8a7c6a]">
              Setting type
            </span>
            <span className="font-display text-5xl italic tabular-nums text-[#1a1612] md:text-6xl">
              {String(count).padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
