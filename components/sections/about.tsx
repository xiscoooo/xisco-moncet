"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealText, InkSpread, RevealOnScroll } from "@/components/ui/animations";

const facts = [
  { label: "Founded",  value: "Saména",           note: "B2B SaaS · 2025"                    },
  { label: "Role",     value: "CEO",               note: "Co-founder of three"                },
  { label: "School",   value: "Télécom Paris",     note: "Institut Polytechnique de Paris"    },
  { label: "Track",    value: "Data Science",      note: "Class of 2027"                      },
  { label: "Based in", value: "Paris",             note: "Originally from Albi"               },
  { label: "Tongues",  value: "FR · EN · DE · ES", note: "C1 in English"                      },
];


export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.6], ["0%", "100%"]);

  return (
    <section ref={ref} id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <div className="mb-16 flex items-baseline justify-between">
            <h2 className="font-display text-5xl italic text-[#1a1612] md:text-6xl">
              <span className="font-mono text-base not-italic uppercase tracking-[0.3em] text-[#8a7c6a]">
                i.
              </span>{" "}
              <RevealText by="word" staggerSpeed={0.05}>About the author</RevealText>
            </h2>
            <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#8a7c6a] md:block">
              ¶ in which we set the scene
            </span>
          </div>
          <InkSpread className="mb-16 bg-[#d4c9b3]" />
        </RevealOnScroll>

        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          {/* Sticky marginalia */}
          <aside className="col-span-12 md:col-span-3">
            <div className="md:sticky md:top-32">
              <p className="marginalia mb-6">¶ Vital statistics</p>
              <dl className="space-y-5">
                {facts.map((f, i) => (
                  <RevealOnScroll key={f.label} delay={i * 0.05}>
                    <div className="border-l border-[#d4c9b3] pl-3 transition-colors hover:border-[#8c2a1f]">
                      <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-[#8a7c6a]">
                        {f.label}
                      </dt>
                      <dd className="mt-1 font-serif text-base italic text-[#1a1612]">
                        {f.value}
                      </dd>
                      <p className="mt-0.5 font-mono text-[0.6rem] text-[#8a7c6a]">
                        {f.note}
                      </p>
                    </div>
                  </RevealOnScroll>
                ))}
              </dl>
            </div>
          </aside>

          {/* Main prose */}
          <div className="relative col-span-12 md:col-span-9">
            <motion.div
              className="absolute -left-6 top-0 hidden w-px bg-[#8c2a1f] md:block"
              style={{ height: lineHeight }}
            />

            <div className="space-y-8 font-serif text-lg leading-[1.85] text-[#1a1612] md:text-xl">
              <RevealOnScroll>
                <p>
                  I came to data science by an unsentimental route: three years
                  of <em>classes préparatoires</em> in southern France, the kind
                  of regimented mathematical apprenticeship that leaves you
                  allergic to imprecision. Then Télécom Paris, where I picked
                  the Data Science track because the questions were the most
                  beautiful and the answers the most contested.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <p>
                  In May 2025 I co-founded{" "}
                  <a href="https://samena.cloud" target="_blank" rel="noopener noreferrer" className="ink-hover font-medium text-[#8c2a1f]">
                    Saména
                  </a>{" "}
                  with two friends, Matthieu and Ange. We&apos;re building a
                  document-intelligence platform for consulting firms: semantic
                  search at scale, structured extraction, zero hallucinations.
                  Incubated at Télécom Paris under Prof. Fabian Suchanek, whose
                  Knowledge Base Lab gave us early technical credibility and a
                  healthy fear of <em>retrieval at the tail of the distribution</em>.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <motion.blockquote
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="pullquote my-12 text-2xl md:text-[1.8rem]"
                >
                  &ldquo;The interesting work happens where research meets
                  shipping, where you have to make the proof actually run, on
                  actual data, for actual people.&rdquo;
                </motion.blockquote>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <p>
                  The rest of my time is spent reading, swimming (twelve years
                  competitive, hard to give up), and quietly accumulating notes on
                  backpropagation, stochastic processes, and Markov chain Monte
                  Carlo. Some of those notes end up{" "}
                  <a href="#notes" className="ink-hover font-medium">
                    here
                  </a>
                  .
                </p>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="border-t border-[#d4c9b3] pt-6">
                  <p className="font-serif text-sm leading-relaxed text-[#8a7c6a]">
                    <sup className="font-mono">1</sup> If you came here to read a
                    bullet-pointed CV, my apologies; you can find one{" "}
                    <a href="/Moncet_Xisco_CV.pdf" className="ink-hover italic text-[#1a1612]">
                      in PDF, neatly typeset
                    </a>
                    .
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
