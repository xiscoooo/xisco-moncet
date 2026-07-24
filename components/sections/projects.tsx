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
    { v: "1",  label: "paying client"            },
    { v: "1",  label: "POC in progress"          },
    { v: "YC", label: "S26 applicant"            },
  ];

  const timeline = [
    { date: "May 2025",   event: "Saména founded with Matthieu Bertrand & Ange Loisy"          },
    { date: "Sept 2025",  event: "Incubation at Télécom Paris incubator"                        },
    { date: "Nov 2025",   event: "Scientific supervision, Prof. Suchanek (YAGO, Knowledge Base Lab)" },
    { date: "Q1 2026",    event: "First paying client, POC in progress, Early Access programme launched" },
    { date: "June 2026",  event: "VivaTech — Sorbonne Université / Institut Polytechnique de Paris stand" },
    { date: "2026",       event: "Y Combinator Summer 2026 application · press outreach (Consultor)"  },
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
                  Visit samena.cloud <ArrowUpRight className="h-4 w-4" />
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
              An end-to-end platform for consulting firms. Saména ingests
              heterogeneous corpora (PDFs, slide decks, internal reports) and
              builds a structured, agentic knowledge base — a living wiki that
              understands the firm&apos;s institutional memory. Queries are
              resolved by an LLM agent that orchestrates hybrid retrieval,
              cross-document reasoning, and structured extraction. Every answer
              is sourced, every claim is traceable, and the system is
              explicitly designed to say <em>I don&apos;t know</em> rather than
              hallucinate.
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
                  { step: "01", t: "Ingestion",  d: "PDFs, decks, reports → structured chunks, canonical tag taxonomy, async deduplication" },
                  { step: "02", t: "Knowledge",  d: "Agentic wiki: hybrid retrieval (vector + BM25 + synonym graph), cross-document reasoning" },
                  { step: "03", t: "Synthesis",  d: "LLM agent → sourced answer with citations, explicit refusal when uncertain" },
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
                {["Agentic LLM", "Hybrid retrieval", "Qdrant", "BM25", "Python", "FastAPI", "Anthropic", "Next.js"].map(
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

function ResearchProject() {
  const results = [
    { label: "H1 — confirmed",   value: "+0.232", note: "GEO coef., p < 0.0001, robust across visual-literacy covariates (~2.2× effect size)" },
    { label: "H2 — negative",    value: "p = 0.65", note: "STTR 0.729 vs 0.728, Wilcoxon — lexical diversity unaffected"                      },
    { label: "H3 — carry-over",  value: "r = 0.44", note: "Within-subject order effect, p = 0.004"                                             },
  ];

  return (
    <article className="border-b border-[#d4c9b3] py-32">
      <div className="grid grid-cols-12 gap-x-8 gap-y-12">
        <aside className="col-span-12 md:col-span-3">
          <div className="font-display text-[10rem] italic leading-none text-[#d4c9b3] md:text-[12rem]">
            ii.
          </div>
          <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">
            2026
          </p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">
            Co-author
          </p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">
            Télécom Paris
          </p>
          <div className="mt-8 hidden md:block">
            <Magnetic strength={0.3}>
              <a
                href="https://doi.org/10.17605/OSF.IO/WRFVP"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="read"
                className="ink-hover inline-flex items-center gap-1 font-serif italic text-[#8c2a1f]"
              >
                Read on OSF <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
          </div>
        </aside>

        <div className="col-span-12 md:col-span-9">
          <h3 className="font-display text-5xl text-[#1a1612] md:text-6xl">
            Referential language in climate data visualisations
          </h3>
          <p className="mt-2 font-display text-xl italic text-[#3d342a]">
            Does the map&apos;s origin change how we describe it? A mixed-effects study.
          </p>

          <RevealOnScroll delay={0.1}>
            <p className="mt-8 font-serif text-lg leading-[1.8] text-[#1a1612]">
              A team study of five, supervised by Anne-Flore Cabouat at Télécom Paris.
              Core question: do participants use systematically different referential
              language when describing a real versus a fictional map of France? Three
              hypotheses tested across mixed-effects models, Wilcoxon tests, and bootstrap
              effect sizes. I led the full analytical cycle: pipeline integration,
              extension implementations requested by the supervisor, unification of the
              team codebase into a single notebook, LaTeX report, and oral defence.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <div className="my-12 grid grid-cols-1 gap-3 md:grid-cols-3">
              {results.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  whileHover={{ y: -6, borderColor: "#8c2a1f" }}
                  className="border border-[#d4c9b3] bg-[#f5f1e8] p-5 transition-all"
                >
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[#8c2a1f]">
                    {m.label}
                  </p>
                  <p className="mt-2 font-display text-3xl italic text-[#1a1612]">{m.value}</p>
                  <p className="mt-2 font-serif text-sm leading-relaxed text-[#3d342a]">{m.note}</p>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <motion.div
              whileHover={{ borderColor: "#8c2a1f" }}
              className="my-8 rounded-sm border border-[#d4c9b3] bg-[#ede5d3]/40 p-6 transition-colors"
            >
              <p className="marginalia mb-3">¶ Publication</p>
              <a
                href="https://doi.org/10.17605/OSF.IO/WRFVP"
                target="_blank"
                rel="noopener noreferrer"
                className="ink-hover font-mono text-sm text-[#8c2a1f]"
              >
                doi: 10.17605/OSF.IO/WRFVP
              </a>
              <p className="mt-1 font-serif text-sm italic text-[#3d342a]">
                Open Science Framework · 2026
              </p>
            </motion.div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Python", "spaCy", "statsmodels", "Mixed-effects models", "Bootstrap", "LaTeX", "Jupyter", "Git"].map((tag) => (
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
            iii.
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
            Evaluating deep-tech ventures at the Télécom Paris incubator.
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
              sharpens a particular skill: reading the gap between what a team
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
              {["Agritech", "Deep tech", "Startup evaluation", "Institut Polytechnique de Paris"].map((tag) => (
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
              ¶ four disciplines, one through-line
            </span>
          </div>
          <InkSpread className="mb-16 bg-[#d4c9b3]" />
        </RevealOnScroll>

        <SamenaProject />
        <ResearchProject />
        <JuryProject />
        <SemanticProject />
      </div>
    </section>
  );
}
