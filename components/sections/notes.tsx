"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { RevealText, InkSpread, RevealOnScroll } from "@/components/ui/animations";

const notes = [
  {
    date: "April 2026",
    category: "Deep learning",
    readingTime: "9 min",
    title: "On parameter counting as a sanity check",
    excerpt:
      "If you can't count the parameters of your network on the back of an envelope, you don't really understand it yet. A pedagogical note built from a year of teaching myself to derive backprop from scratch — including BPTT for RNNs, where most textbooks become suddenly evasive.",
  },
  {
    date: "March 2026",
    category: "Stochastic processes",
    readingTime: "12 min",
    title: "Why Vélib' has a closed-form equilibrium",
    excerpt:
      "A short essay on the surprising fact that you can write down, exactly, the long-run distribution of bikes across 25 stations. The price is a few assumptions of independence and reversibility — but the structure that survives is genuinely beautiful.",
  },
  {
    date: "February 2026",
    category: "Building",
    readingTime: "7 min",
    title: "What consultants actually want from AI",
    excerpt:
      "Six months of customer discovery for Saména, distilled. Spoiler : it's not chat. It's the ability to point at a sentence in a 200-page contract and know exactly which clause it modifies, in which version, by which lawyer.",
  },
];

function NoteEntry({ note, idx }: { note: (typeof notes)[number]; idx: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: idx * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="grid grid-cols-12 gap-x-8 border-b border-[#d4c9b3] py-12 last:border-0"
    >
      <aside className="col-span-12 md:col-span-3">
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">
          {note.date}
        </p>
        <p className="mt-1 font-serif text-sm italic text-[#8a7c6a]">{note.category}</p>
        <motion.p
          animate={{ color: hovered ? "#8c2a1f" : "#8a7c6a" }}
          className="mt-3 font-mono text-[0.65rem] uppercase tracking-widest"
        >
          ◆ {note.readingTime} read
        </motion.p>
      </aside>

      <div className="col-span-12 md:col-span-9">
        <a
          href="#"
          data-cursor-label="read"
          className="group block"
        >
          <motion.h3
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="font-display text-3xl italic text-[#1a1612] transition-colors group-hover:text-[#8c2a1f] md:text-4xl"
          >
            {note.title}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              className="ml-2 inline-block"
            >
              <ArrowUpRight className="inline h-6 w-6" />
            </motion.span>
          </motion.h3>
        </a>
        <p className="mt-4 font-serif text-base leading-[1.85] text-[#3d342a] md:text-lg">
          {note.excerpt}
        </p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: hovered ? 80 : 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 h-px bg-[#8c2a1f]"
        />
        <p className="mt-3">
          <a href="#" className="ink-hover font-serif text-sm italic text-[#8c2a1f]">
            Continue reading →
          </a>
        </p>
      </div>
    </motion.article>
  );
}

export default function Notes() {
  return (
    <section id="notes" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="mb-16 flex items-baseline justify-between">
            <h2 className="font-display text-5xl italic text-[#1a1612] md:text-6xl">
              <span className="font-mono text-base not-italic uppercase tracking-[0.3em] text-[#8a7c6a]">
                iv.
              </span>{" "}
              <RevealText by="word" staggerSpeed={0.05}>From the notebooks</RevealText>
            </h2>
            <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#8a7c6a] md:block">
              ¶ occasional, technical, sometimes about ideas
            </span>
          </div>
          <InkSpread className="mb-16 bg-[#d4c9b3]" />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="mb-12 grid grid-cols-12 gap-x-8">
            <aside className="col-span-12 md:col-span-3">
              <p className="marginalia">¶ a working journal</p>
            </aside>
            <p className="col-span-12 font-serif text-lg italic leading-[1.85] text-[#3d342a] md:col-span-9 md:text-xl">
              A small collection of notes I keep on whatever I&apos;m teaching
              myself or being taught. Not blog posts in the modern sense — more
              like the section of a private notebook one would happen to share
              with a curious correspondent.
            </p>
          </div>
        </RevealOnScroll>

        <div>
          {notes.map((n, i) => (
            <NoteEntry key={n.title} note={n} idx={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center font-serif text-sm italic text-[#8a7c6a]"
        >
          More notes are written, slowly. They appear here when they are ready.
        </motion.p>
      </div>
    </section>
  );
}
