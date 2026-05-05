"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";

// ============================================================
// 1. RevealText — character-by-character or word-by-word reveal
// ============================================================
export function RevealText({
  children,
  by = "char",
  delay = 0,
  className = "",
  staggerSpeed = 0.025,
  as: Component = "span",
}: {
  children: string;
  by?: "char" | "word";
  delay?: number;
  className?: string;
  staggerSpeed?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const items = by === "char" ? children.split("") : children.split(" ");
  const Wrapper = Component as React.ElementType;

  return (
    <Wrapper ref={ref} className={`inline-block ${className}`} aria-label={children}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 24, filter: "blur(8px)" }
          }
          transition={{
            duration: 0.7,
            delay: delay + i * staggerSpeed,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
          style={{ whiteSpace: "pre" }}
        >
          {item}
          {by === "word" && i < items.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Wrapper>
  );
}

// ============================================================
// 2. InkSpread — animated horizontal rule that "draws"
// ============================================================
export function InkSpread({
  className = "",
  delay = 0,
  height = 1,
}: {
  className?: string;
  delay?: number;
  height?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, transformOrigin: "left" }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1.4, delay, ease: [0.65, 0, 0.35, 1] }}
      className={`bg-current ${className}`}
      style={{ height: `${height}px` }}
    />
  );
}

// ============================================================
// 3. Magnetic — element that pulls toward cursor
// ============================================================
export function Magnetic({
  children,
  strength = 0.4,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPos({ x, y });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={className}>
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================
// 4. Parallax — moves element on scroll
// ============================================================
export function Parallax({
  children,
  offset = 50,
  className = "",
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

// ============================================================
// 5. CursorTracker — dual cursor (dot + ring) with event delegation
// ============================================================
export function CursorTracker() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });

    // Event delegation — works for all elements, including dynamically rendered ones
    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const closest = target.closest("a, button, [data-cursor-hover]");
      if (closest) {
        setHovering(true);
        setCursorLabel(closest.getAttribute("data-cursor-label") ?? "");
      } else {
        setHovering(false);
        setCursorLabel("");
      }
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
    };
  }, []);

  return (
    <>
      {/* Outer ring — follows with lag, expands on hover */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        animate={{ x: pos.x - 20, y: pos.y - 20 }}
        transition={{ type: "spring", stiffness: 150, damping: 18, mass: 0.8 }}
      >
        <motion.div
          className="h-10 w-10 rounded-full border"
          animate={{
            scale: hovering ? 1.6 : 1,
            borderColor: hovering ? "#8c2a1f" : "rgba(26,22,18,0.25)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>

      {/* Inner dot — snappy, hides when hovering to show only the ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        animate={{ x: pos.x - 4, y: pos.y - 4 }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.2 }}
      >
        <motion.div
          className="h-2 w-2 rounded-full"
          animate={{
            scale: hovering ? 0 : 1,
            backgroundColor: "#1a1612",
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Contextual label next to cursor */}
      {cursorLabel && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
          animate={{ x: pos.x + 18, y: pos.y - 8 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="font-mono text-[0.6rem] uppercase tracking-widest text-[#8c2a1f]"
          >
            {cursorLabel}
          </motion.span>
        </motion.div>
      )}
    </>
  );
}

// ============================================================
// 6. ScrollProgress — top ink bar
// ============================================================
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-[#8c2a1f]"
      style={{ scaleX }}
    />
  );
}

// ============================================================
// 7. LetterFloat — letters float individually on hover
// ============================================================
export function LetterFloat({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          whileHover={{ y: -8, color: "#8c2a1f" }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
          style={{ whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// ============================================================
// 8. ScrollVelocity — marquee whose speed reacts to scroll
// ============================================================
export function ScrollVelocity({
  children,
  baseVelocity = 30,
  className = "",
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [2, 1, 2]);

  // Track position as a ref to avoid re-renders on every frame
  const xRef = useRef(0);
  const [xDisplay, setXDisplay] = useState(0);

  useEffect(() => {
    let rafId: number;
    const LOOP_AT = -25; // wrap at -25% (= 1 copy out of 4)

    const tick = () => {
      const speed = baseVelocity * (velocityFactor.get() ?? 1);
      xRef.current -= speed / 60;
      if (xRef.current <= LOOP_AT) {
        xRef.current += LOOP_AT * -1; // reset to 0 seamlessly
      }
      setXDisplay(xRef.current);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [baseVelocity, velocityFactor]);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="flex gap-12" style={{ transform: `translateX(${xDisplay}%)` }}>
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}

// ============================================================
// 9. RevealOnScroll — fade-up on scroll into view
// ============================================================
export function RevealOnScroll({
  children,
  delay = 0,
  className = "",
  yOffset = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{ duration: 0.8, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
