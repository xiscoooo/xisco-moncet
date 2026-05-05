"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { RevealText, InkSpread, RevealOnScroll } from "@/components/ui/animations";

type Skill = { name: string; weight?: "primary" | "secondary" };

type Category = {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    num: "α",
    title: "Machine & Deep Learning",
    subtitle: "from MLPs to GANs, by hand and in code",
    description:
      "Architectures derived from first principles, then implemented. I can count parameters on the back of an envelope, derive backprop and BPTT, and explain why your VAE collapses.",
    skills: [
      { name: "PyTorch", weight: "primary" },
      { name: "TensorFlow", weight: "primary" },
      { name: "MLP" },
      { name: "CNN" },
      { name: "RNN / LSTM / GRU" },
      { name: "Transformers", weight: "primary" },
      { name: "VAE" },
      { name: "GAN" },
      { name: "Backprop & BPTT" },
      { name: "Transfer learning" },
    ],
  },
  {
    num: "β",
    title: "NLP & Information Retrieval",
    subtitle: "the core of what I build at Saména",
    description:
      "Modern retrieval systems, the math underneath, and the engineering to make them production-ready. Daily diet at Saména.",
    skills: [
      { name: "BERT", weight: "primary" },
      { name: "Sentence-Transformers", weight: "primary" },
      { name: "BERTopic" },
      { name: "TF-IDF" },
      { name: "HMM (Forward · Viterbi · Baum-Welch)" },
      { name: "IBM Models" },
      { name: "LLMs", weight: "primary" },
      { name: "RAG", weight: "primary" },
      { name: "Vector databases" },
    ],
  },
  {
    num: "γ",
    title: "Applied Mathematics",
    subtitle: "where my training is most rigorous",
    description:
      "Three years of classes préparatoires plus continuous coursework at Télécom Paris. The mathematical apparatus that lets me reason about systems before building them.",
    skills: [
      { name: "Stochastic processes", weight: "primary" },
      { name: "CTMC" },
      { name: "Queuing networks (M/M/1)" },
      { name: "Migration networks" },
      { name: "EM" },
      { name: "MAP / MLE" },
      { name: "Optimisation" },
      { name: "Linear algebra" },
      { name: "Real analysis" },
    ],
  },
  {
    num: "δ",
    title: "Engineering",
    subtitle: "the unglamorous craft of shipping",
    description:
      "Languages, frameworks, and tooling. I write production Python every day for Saména, and I can read C and Java when something goes wrong at a lower level.",
    skills: [
      { name: "Python", weight: "primary" },
      { name: "FastAPI", weight: "primary" },
      { name: "Pandas / NumPy / scikit-learn" },
      { name: "JavaScript / TypeScript" },
      { name: "Java" },
      { name: "C" },
      { name: "SQL" },
      { name: "Next.js" },
      { name: "LaTeX" },
      { name: "Git / Linux" },
    ],
  },
];

function SkillTag({ skill, idx }: { skill: Skill; idx: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={{
        y: -4,
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 15 },
      }}
      className={`inline-block cursor-default rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
        skill.weight === "primary"
          ? "border-[#1a1612] bg-[#1a1612] text-[#f5f1e8] hover:border-[#8c2a1f] hover:bg-[#8c2a1f]"
          : "border-[#d4c9b3] text-[#3d342a] hover:border-[#1a1612] hover:bg-[#1a1612]/5"
      }`}
    >
      {skill.name}
    </motion.span>
  );
}

function CategoryCard({ cat, idx }: { cat: Category; idx: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative grid grid-cols-12 gap-x-8 border-b border-[#d4c9b3] pb-16 last:border-0"
    >
      <div className="col-span-12 md:col-span-3">
        <motion.div
          animate={{ rotate: hovered ? -6 : 0, scale: hovered ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="font-display text-[8rem] italic leading-none text-[#d4c9b3] md:text-[10rem]"
        >
          {cat.num}
        </motion.div>
        <motion.p
          animate={{ color: hovered ? "#8c2a1f" : "#8a7c6a" }}
          transition={{ duration: 0.4 }}
          className="mt-2 font-mono text-[0.65rem] uppercase tracking-widest"
        >
          chapter {cat.num} of δ
        </motion.p>
      </div>

      <div className="col-span-12 md:col-span-9">
        <h3 className="font-display text-3xl text-[#1a1612] md:text-4xl">{cat.title}</h3>
        <p className="mt-1 font-serif text-lg italic text-[#3d342a]">{cat.subtitle}</p>
        <p className="mt-5 max-w-2xl font-serif text-base leading-[1.75] text-[#1a1612] md:text-lg">
          {cat.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {cat.skills.map((s, i) => (
            <SkillTag key={s.name} skill={s} idx={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="mb-16 flex items-baseline justify-between">
            <h2 className="font-display text-5xl italic text-[#1a1612] md:text-6xl">
              <span className="font-mono text-base not-italic uppercase tracking-[0.3em] text-[#8a7c6a]">
                ii.
              </span>{" "}
              <RevealText by="word" staggerSpeed={0.05}>The toolbox</RevealText>
            </h2>
            <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#8a7c6a] md:block">
              ¶ in four chapters
            </span>
          </div>
          <InkSpread className="mb-16 bg-[#d4c9b3]" />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="mb-20 grid grid-cols-12 gap-x-8">
            <aside className="col-span-12 md:col-span-3">
              <p className="marginalia">¶ A note</p>
            </aside>
            <p className="col-span-12 font-serif text-lg italic leading-[1.85] text-[#3d342a] md:col-span-9 md:text-xl">
              I&apos;ve never trusted skill lists that read like supermarket
              shelves. What follows is organized by what these tools actually
              <em> do</em> for me — what kinds of questions they let me ask, and
              what kinds of answers they let me build.
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-16">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.num} cat={cat} idx={i} />
          ))}
        </div>

        <RevealOnScroll delay={0.2}>
          <p className="mt-20 text-center font-serif text-sm italic text-[#8a7c6a]">
            Languages spoken : <strong>French</strong> (native) ·{" "}
            <strong>English</strong> C1 · <strong>German</strong> B1 ·{" "}
            <strong>Spanish</strong> A2.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
