"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const sections = [
  { id: "about",    roman: "i",   title: "About"   },
  { id: "skills",   roman: "ii",  title: "Toolbox" },
  { id: "projects", roman: "iii", title: "Work"    },
  { id: "notes",    roman: "iv",  title: "Notes"   },
  { id: "contact",  roman: "v",   title: "Contact" },
];

export function SectionDots() {
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { threshold: [0.25, 0.5] }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-5 xl:flex"
    >
      {sections.map((s) => {
        const isActive = active === s.id;
        const isHovered = hovered === s.id;

        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.title}
            className="group flex items-center justify-end gap-2"
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered("")}
          >
            {/* Label — slides in on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.18 }}
                  className="font-mono text-[0.6rem] uppercase tracking-widest text-[#8a7c6a]"
                >
                  {s.title}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.span
              animate={{
                scale: isActive ? 1.6 : isHovered ? 1.2 : 1,
                backgroundColor: isActive
                  ? "#8c2a1f"
                  : isHovered
                  ? "#3d342a"
                  : "#d4c9b3",
              }}
              transition={{ duration: 0.25 }}
              className="block h-2 w-2 rounded-full"
            />
          </a>
        );
      })}
    </nav>
  );
}
