"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { RevealText, InkSpread, RevealOnScroll, Magnetic } from "@/components/ui/animations";

function SamenaProject() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleX       = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const numberRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  const metrics = [
    { v: "0",  label: "hallucinations tolerated" },
    { v: "3",  label: "co-founders"              },
    { v: "V3", label: "current product roadmap"  },
    { v: "1",  label: "scientific advisor"        },
  ];

  const timeline = [
    { date: "May 2025",  event: "Saména founded with Matthieu & Ange"                     },
    { date: "Sept 2025", event: "Incubation at Télécom Paris"                              },
    { date: "Nov 2025",  event: "Prof. Suchanek scientific supervision"                    },
    { date: "Q1 2026",   event: "First consulting-firm prospects (AGH, Stanwell)"          },
    { date: "Now",       event: "V1.5 → V3, mission workspace, structured filters"       },
  ];

  return (
    <article ref={ref} className="relative border-b border-[#d4c9b3] pb-32">
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <aside className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-32">
            <motion.div
              style={{ rotate: numberRotate }}
              className="font-display text-[10rem] italic leading-none text-[#d4c9b3] md:text-[12rem]"
            >
              i.
            </motion.div>
            <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">
              2025 · present
            </p>
            <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">
              Founder · CEO
            </p>
            <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">
              B2B SaaS
            </p>
            <div className="mt-8 hidden md:block">
              <Magnetic strength={0.3}>
                <a
                  href="https://samena.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="visit"
                  className="ink-hover inline-flex items-center gap-1 font-serif italic text-[#8c2a1f]"
                >
                  Visit samena.ai <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
            </div>
          </div>
        </aside>

        <div className="col-span-12 md:col-span-9">
          <motion.h3
            style={{ x: titleX }}
            className="font-display text-6xl text-[#1a1612] md:text-7xl"
          >
            <RevealText by="char" staggerSpeed={0.03}>Saména</RevealText>
          </motion.h3>
          <p className="mt-2 font-display text-2xl italic text-[#3d342a]">
            AI document intelligence for consulting firms.
          </p>

          <RevealOnScroll delay={0.1}>
            <p className="mt-8 font-serif text-xl leading-[1.8] text-[#1a1612]">
              An end-to-end platform for consultants : ingestion of
              heterogeneous corpora (PDFs, slide decks, internal reports),
              followed by structured extraction with explicit grounding,
              semantic search with citation, and a mission workspace that
              accumulates institutional knowledge over time. Built on
              retrieval-augmented generation with a strong bias against
              hallucination : every answer must be traceable to its source.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <blockquote className="pullquote my-10 text-2xl md:text-3xl">
              &ldquo;The hard problem isn&apos;t generating answers. It&apos;s
              making sure the system says <em>I don&apos;t know</em> when it
              doesn&apos;t.&rdquo;
            </blockquote>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="my-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[#d4c9b3] bg-[#d4c9b3] md:grid-cols-4">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  whileHover={{ backgroundColor: "#ede5d3" }}
                  className="bg-[#f5f1e8] p-6 transition-colors"
                >
                  <p className="font-display text-5xl italic text-[#8c2a1f] md:text-6xl">{m.v}</p>
                  <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">
                    {m.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="my-16">
              <p className="marginalia mb-4">¶ Architecture, in three movements</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { step: "01", t: "Ingestion", d: "PDFs, decks, reports → normalized chunks"           },
                  { step: "02", t: "Retrieval", d: "Embeddings + structured filters → grounded context" },
                  { step: "03", t: "Synthesis", d: "RAG → answer with citations, refusal when uncertain" },
                ].map((b, i) => (
                  <motion.div
                    key={b.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    whileHover={{ y: -6, borderColor: "#8c2a1f" }}
                    className="border border-[#d4c9b3] bg-[#f5f1e8] p-5 transition-all"
                  >
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[#8c2a1f]">
                      {b.step}
                    </p>
                    <p className="mt-2 font-display text-2xl italic text-[#1a1612]">{b.t}</p>
                    <p className="mt-2 font-serif text-sm leading-relaxed text-[#3d342a]">{b.d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="my-16">
              <p className="marginalia mb-6">¶ A short chronology</p>
              <ol className="space-y-4 border-l-2 border-[#d4c9b3] pl-6">
                {timeline.map((t, i) => (
                  <motion.li
                    key={t.event}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative"
                  >
                    <span className="absolute -left-[1.85rem] top-[0.55rem] h-2 w-2 rounded-full bg-[#8c2a1f]" />
                    <span className="font-mono text-xs uppercase tracking-widest text-[#8a7c6a]">
                      {t.date}
                    </span>
                    <p className="font-serif text-lg text-[#1a1612]">{t.event}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-12 border-t border-[#d4c9b3] pt-6">
              <p className="marginalia mb-3">¶ Built with</p>
              <div className="flex flex-wrap gap-2">
                {["RAG", "Vector DB", "Next.js", "Python", "FastAPI", "OpenAI", "Anthropic", "BERTopic"].map(
                  (tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      whileHover={{ y: -3 }}
                      className="rounded-full border border-[#1a1612] bg-[#1a1612] px-3 py-1 font-mono text-xs text-[#f5f1e8]"
                    >
                      {tag}
                    </motion.span>
                  )
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </article>
  );
}

function JuryProject() {
  const criteria = [
    {
      label: "Quantitative",
      d: "Structured scoring grids: market size, traction metrics, financial assumptions, go-to-market feasibility",
    },
    {
      label: "Qualitative",
      d: "Team dynamics, narrative coherence, competitive moat, readiness for incubation and acceleration",
    },
  ];

  return (
    <article className="border-b border-[#d4c9b3] py-32">
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <aside className="col-span-12 md:col-span-3">
          <div className="font-display text-[10rem] italic leading-none text-[#d4c9b3] md:text-[12rem]">
            ii.
          </div>
          <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">
            2024 · 2025
          </p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">
            Jury Member
          </p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">
            Institut Polytechnique de Paris
          </p>
        </aside>
        <div className="col-span-12 md:col-span-9">
          <h3 className="font-display text-5xl text-[#1a1612] md:text-6xl">
            Prix des Technologies et du Numérique
          </h3>
          <p className="mt-2 font-display text-xl italic text-[#3d342a]">
            Evaluating agritech ventures at the Télécom Paris incubator.
          </p>

          <RevealOnScroll delay={0.1}>
            <p className="mt-8 font-serif text-lg leading-[1.85] text-[#1a1612]">
              Selected as jury member for the{" "}
              <em>Prix des Technologies et du Numérique</em>, a competitive award
              organised by Institut Polytechnique de Paris to identify and
              accelerate high-potential deep-tech ventures. My mandate covered
              the agritech vertical, applying both structured scoring grids and
              qualitative judgment to assess founders, market theses, and
              technical credibility across multiple selection rounds. The exercise
              sharpens a particular skill : reading the gap between what a team
              claims and what the numbers can actually support.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <motion.blockquote
              initial={{ scale: 0.97 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="pullquote my-10 text-2xl md:text-3xl"
            >
              &ldquo;The strongest candidates weren&apos;t those with the largest
              market. They were those who understood precisely where their thesis
              could break, and had a plan for it.&rdquo;
            </motion.blockquote>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="my-10">
              <p className="marginalia mb-4">¶ Evaluation framework</p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {criteria.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    whileHover={{ y: -4, borderColor: "#8c2a1f" }}
                    className="border border-[#d4c9b3] bg-[#f5f1e8] p-5 transition-all"
                  >
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[#8c2a1f]">
                      {c.label}
                    </p>
                    <p className="mt-2 font-serif text-sm leading-relaxed text-[#3d342a]">
                      {c.d}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Agritech",
                "Startup evaluation",
                "Deep tech",
                "Institut Polytechnique de Paris",
                "Strategic analysis",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#d4c9b3] px-3 py-1 font-mono text-xs text-[#3d342a] hover:border-[#1a1612] hover:bg-[#1a1612]/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </article>
  );
}

function VelibProject() {
  return (
    <article className="border-b border-[#d4c9b3] py-32">
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <aside className="col-span-12 md:col-span-3">
          <div className="font-display text-[10rem] italic leading-none text-[#d4c9b3] md:text-[12rem]">
            iii.
          </div>
          <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">2026</p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">Coursework</p>
        </aside>
        <div className="col-span-12 md:col-span-9">
          <h3 className="font-display text-5xl text-[#1a1612] md:text-6xl">
            <em>Vélib&apos;</em>, as a closed migration network
          </h3>
          <p className="mt-2 font-display text-xl italic text-[#3d342a]">
            Stochastic modelling, a queuing theory exercise.
          </p>

          <RevealOnScroll delay={0.1}>
            <p className="mt-8 font-serif text-lg leading-[1.85] text-[#1a1612]">
              Modelled the Paris Vélib&apos; bike-sharing network as a closed
              continuous-time Markov chain with 25 colonies. Derived the
              product-form stationary distribution, simulated the system with
              the Gillespie algorithm, and produced a Beamer report and oral
              defence (with Virgile Thonnier).
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <motion.div
              whileHover={{ borderColor: "#8c2a1f" }}
              className="my-10 rounded-sm border border-[#d4c9b3] bg-[#ede5d3]/40 p-6 transition-colors"
            >
              <p className="marginalia mb-3">¶ The pleasing fact</p>
              <p className="font-display text-2xl italic leading-relaxed text-[#1a1612]">
                π(n₁, n₂, …, n₂₅) ∝ ∏ᵢ νᵢⁿⁱ / nᵢ!
              </p>
              <p className="mt-3 font-serif text-sm italic text-[#3d342a]">
                The stationary distribution factorizes, even though the
                stations are coupled by bike conservation. A small theorem with
                a big consequence : you can analyze each station in isolation.
              </p>
            </motion.div>
          </RevealOnScroll>

          <div className="mt-8 flex flex-wrap gap-2">
            {["CTMC", "Python", "SimPy", "LaTeX Beamer", "Gillespie"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#d4c9b3] px-3 py-1 font-mono text-xs text-[#3d342a] hover:border-[#1a1612]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function SemanticProject() {
  return (
    <article className="py-32">
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <aside className="col-span-12 md:col-span-3">
          <div className="font-display text-[10rem] italic leading-none text-[#d4c9b3] md:text-[12rem]">
            iv.
          </div>
          <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">
            2025 · 2026
          </p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">
            Foundation work · Saména
          </p>
        </aside>
        <div className="col-span-12 md:col-span-9">
          <h3 className="font-display text-5xl text-[#1a1612] md:text-6xl">
            Unsupervised semantic analysis
          </h3>
          <p className="mt-2 font-display text-xl italic text-[#3d342a]">
            BERTopic + contextual embeddings for theme detection.
          </p>

          <RevealOnScroll delay={0.1}>
            <p className="mt-8 font-serif text-lg leading-[1.85] text-[#1a1612]">
              An exploratory tool for unsupervised theme detection across
              domain-specific corpora. Combined BERTopic with TF-IDF baselines
              and sentence-transformer embeddings to extract latent thematic
              structure from large text collections. Iterated on the clustering
              metrics and used the results to inform Saména&apos;s retrieval
              pipeline design.
            </p>
          </RevealOnScroll>

          <div className="mt-8 flex flex-wrap gap-2">
            {["BERTopic", "Sentence-Transformers", "TF-IDF", "Python", "UMAP", "HDBSCAN"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#d4c9b3] px-3 py-1 font-mono text-xs text-[#3d342a] hover:border-[#1a1612]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="mb-16 flex items-baseline justify-between">
            <h2 className="font-display text-5xl italic text-[#1a1612] md:text-6xl">
              <span className="font-mono text-base not-italic uppercase tracking-[0.3em] text-[#8a7c6a]">
                iii.
              </span>{" "}
              <RevealText by="word" staggerSpeed={0.05}>Selected work</RevealText>
            </h2>
            <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#8a7c6a] md:block">
              ¶ four essays, four disciplines
            </span>
          </div>
          <InkSpread className="mb-16 bg-[#d4c9b3]" />
        </RevealOnScroll>

        <SamenaProject />
        <JuryProject />
        <VelibProject />
        <SemanticProject />
      </div>
    </section>
  );
}
