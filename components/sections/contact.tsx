"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { RevealText, InkSpread, RevealOnScroll, Magnetic } from "@/components/ui/animations";

const channels = [
  { label: "by post",        detail: "xmoncet@icloud.com",            href: "mailto:xmoncet@icloud.com"                },
  { label: "professionally", detail: "linkedin.com/in/xisco-moncet",  href: "https://linkedin.com/in/xisco-moncet"     },
  { label: "by code",        detail: "github.com/xiscoooo",            href: "https://github.com/xiscoooo"              },
  { label: "by phone",       detail: "+33 6 77 53 41 25",             href: "tel:+33677534125"                          },
];

function ChannelRow({ c, idx }: { c: (typeof channels)[number]; idx: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <a
        href={c.href}
        target={c.href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        data-cursor-label="contact"
        className="group relative flex items-baseline justify-between overflow-hidden py-6 transition-colors"
      >
        <motion.div
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          className="absolute inset-0 bg-[#ede5d3]/50"
        />
        <motion.span
          animate={{ x: hovered ? 12 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative font-serif text-lg italic text-[#3d342a] md:text-xl"
        >
          — {c.label}
        </motion.span>
        <motion.span
          animate={{ color: hovered ? "#8c2a1f" : "#1a1612", x: hovered ? -8 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative font-mono text-sm md:text-base"
        >
          {c.detail}
        </motion.span>
      </a>
    </motion.li>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="mb-16 flex items-baseline justify-between">
            <h2 className="font-display text-5xl italic text-[#1a1612] md:text-6xl">
              <span className="font-mono text-base not-italic uppercase tracking-[0.3em] text-[#8a7c6a]">
                v.
              </span>{" "}
              <RevealText by="word" staggerSpeed={0.05}>Postscript</RevealText>
            </h2>
            <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#8a7c6a] md:block">
              ¶ how to reach the author
            </span>
          </div>
          <InkSpread className="mb-16 bg-[#d4c9b3]" />
        </RevealOnScroll>

        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          <aside className="col-span-12 md:col-span-3">
            <p className="marginalia">¶ Correspondence</p>
          </aside>

          <div className="col-span-12 md:col-span-9">
            <RevealOnScroll>
              <p className="dropcap font-serif text-xl leading-[1.75] text-[#1a1612] md:text-2xl">
                I&apos;m always glad to hear from people working on hard
                problems — whether it&apos;s applied research, building
                consulting-grade AI, or thinking through the architecture of
                something new. I read every message, and reply to most of them.
                The fastest way is by email.
              </p>
            </RevealOnScroll>

            <ul className="mt-12 divide-y divide-[#d4c9b3] border-y border-[#d4c9b3]">
              {channels.map((c, i) => (
                <ChannelRow key={c.label} c={c} idx={i} />
              ))}
            </ul>

            <RevealOnScroll delay={0.2}>
              <div className="mt-20 text-right">
                <p className="font-serif text-lg italic text-[#3d342a]">With my warmest,</p>
                <motion.p
                  whileHover={{ skewX: -3, color: "#8c2a1f" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mt-2 inline-block cursor-default font-display text-5xl italic text-[#1a1612]"
                >
                  Xisco.
                </motion.p>
                <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#8a7c6a]">
                  Paris, the{" "}
                  {new Date().toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
