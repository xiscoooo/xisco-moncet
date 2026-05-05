"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  RevealText,
  InkSpread,
  Magnetic,
  ScrollVelocity,
} from "@/components/ui/animations";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY       = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const introY       = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-12 pt-32"
    >
      {/* Floating ornament — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
        className="absolute right-12 top-32 hidden md:block"
      >
        <div className="spin-slow font-display text-6xl italic text-[#d4c9b3]">❦</div>
      </motion.div>

      {/* Floating accent dot */}
      <motion.div
        className="absolute left-1/4 top-2/3 hidden h-2 w-2 rounded-full bg-[#8c2a1f] md:block"
        animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto w-full max-w-6xl">
        {/* Top metadata band */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex items-center justify-between border-y border-[#d4c9b3] py-3"
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#8a7c6a]">
            Vol. I — № 04
          </span>
          <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#8a7c6a] md:inline">
            Founder &amp; Data Scientist
          </span>
          <motion.span
            className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#8a7c6a]"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ● MMXXVI · Paris
          </motion.span>
        </motion.div>

        {/* Main display title */}
        <motion.div style={{ y: titleY, opacity: titleOpacity }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-[#8a7c6a]"
          >
            ¶ A working portfolio of
          </motion.p>

          <h1 className="font-display text-7xl font-light leading-[0.95] tracking-tight text-[#1a1612] md:text-[9rem]">
            <span className="block">
              <RevealText by="char" delay={0.3} staggerSpeed={0.04}>
                Xisco
              </RevealText>
            </span>
            <span className="block italic text-[#3d342a]">
              <RevealText by="char" delay={0.55} staggerSpeed={0.04}>
                Moncet
              </RevealText>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
                className="text-[#8c2a1f]"
              >
                .
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Editorial intro */}
        <motion.div style={{ y: introY }} className="mt-12 grid grid-cols-12 gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="col-span-3 hidden md:block"
          >
            <p className="marginalia">¶ on the author</p>
            <p className="mt-3 font-mono text-[0.7rem] leading-relaxed text-[#8a7c6a]">
              Engineering student, founder, occasional writer.
            </p>
            <div className="mt-6 h-px w-12 bg-[#d4c9b3]" />
            <p className="mt-3 font-mono text-[0.7rem] leading-relaxed text-[#8a7c6a]">
              Currently building Saména at Télécom Paris.
            </p>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="col-span-12 md:col-span-9"
          >
            <p className="dropcap font-serif text-xl leading-[1.7] text-[#1a1612] md:text-2xl">
              I write code, raise questions, and ship products at the
              intersection of applied research and consulting. By day I lead{" "}
              <em className="text-[#8c2a1f]">Saména</em>, building
              zero-hallucination document intelligence for serious people doing
              serious work. By evening I&apos;m a Data Science student at
              Télécom Paris, deep in backpropagation, stochastic processes, and
              the small joys of a well-typeset proof.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-6 font-serif text-base md:text-lg">
              <Magnetic strength={0.3}>
                <a
                  href="#projects"
                  data-cursor-label="explore"
                  className="ink-hover italic text-[#1a1612]"
                >
                  Read the work →
                </a>
              </Magnetic>
              <span className="text-[#d4c9b3]">·</span>
              <Magnetic strength={0.3}>
                <a
                  href="#contact"
                  data-cursor-label="contact"
                  className="ink-hover italic text-[#1a1612]"
                >
                  Write to me
                </a>
              </Magnetic>
              <span className="text-[#d4c9b3]">·</span>
              <Magnetic strength={0.3}>
                <a
                  href="/Moncet_Xisco_CV.pdf"
                  data-cursor-label="download"
                  className="ink-hover italic text-[#1a1612]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download CV ↗
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="mt-24 border-y border-[#d4c9b3] py-4"
      >
        <ScrollVelocity baseVelocity={20}>
          <span className="font-display text-3xl italic text-[#3d342a] md:text-5xl">
            data science
          </span>
          <span className="font-display text-3xl text-[#d4c9b3] md:text-5xl">·</span>
          <span className="font-display text-3xl italic text-[#3d342a] md:text-5xl">
            entrepreneurship
          </span>
          <span className="font-display text-3xl text-[#d4c9b3] md:text-5xl">·</span>
          <span className="font-display text-3xl italic text-[#8c2a1f] md:text-5xl">
            zero-hallucination AI
          </span>
          <span className="font-display text-3xl text-[#d4c9b3] md:text-5xl">·</span>
          <span className="font-display text-3xl italic text-[#3d342a] md:text-5xl">
            stochastic processes
          </span>
          <span className="font-display text-3xl text-[#d4c9b3] md:text-5xl">·</span>
          <span className="font-display text-3xl italic text-[#3d342a] md:text-5xl">
            literature
          </span>
          <span className="font-display text-3xl text-[#d4c9b3] md:text-5xl">·</span>
        </ScrollVelocity>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#8a7c6a]">
            scroll
          </span>
          <div className="h-8 w-px bg-[#8a7c6a]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
