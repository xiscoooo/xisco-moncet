"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#about",    label: "About",   num: "i"   },
  { href: "#skills",   label: "Toolbox", num: "ii"  },
  { href: "#projects", label: "Work",    num: "iii" },
  { href: "#notes",    label: "Notes",   num: "iv"  },
  { href: "#contact",  label: "Contact", num: "v"   },
];

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState<string>("");
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);

      const scrollY = window.scrollY + window.innerHeight / 3;
      for (let i = links.length - 1; i >= 0; i--) {
        const sec = document.querySelector(links[i].href) as HTMLElement | null;
        if (sec && sec.offsetTop <= scrollY) {
          setActive(links[i].href);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-[#d4c9b3] bg-[#f5f1e8]/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          {/* Logo */}
          <a href="#" onClick={closeMenu} className="group flex items-baseline gap-2">
            <motion.span
              whileHover={{ skewX: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="font-display text-2xl italic text-[#1a1612]"
            >
              Xisco
            </motion.span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#8a7c6a]">
              — moncet
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden gap-7 font-serif text-sm md:flex">
            {links.map((l) => (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  className="ink-hover italic text-[#3d342a] transition-colors hover:text-[#8c2a1f]"
                >
                  <span className="font-mono not-italic text-[0.7rem] uppercase tracking-widest text-[#8a7c6a]">
                    {l.num}.{" "}
                  </span>
                  {l.label}
                </a>
                <AnimatePresence>
                  {active === l.href && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#8c2a1f]"
                    />
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative flex h-8 w-8 flex-col items-center justify-center gap-0 md:hidden"
          >
            <motion.span
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 0 : -5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute block h-px w-5 bg-[#1a1612] origin-center"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute block h-px w-5 bg-[#1a1612]"
            />
            <motion.span
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? 0 : 5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute block h-px w-5 bg-[#1a1612] origin-center"
            />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-[#f5f1e8] md:hidden"
          >
            {/* Grain overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' seed='3'/%3E%3CfeColorMatrix values='0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            <ul className="relative space-y-8 text-center">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={closeMenu}
                    className="group inline-flex items-baseline gap-3 transition-colors hover:text-[#8c2a1f]"
                  >
                    <span className="font-mono text-sm uppercase tracking-widest text-[#8a7c6a]">
                      {l.num}.
                    </span>
                    <span className="font-display text-5xl italic text-[#1a1612] transition-colors group-hover:text-[#8c2a1f]">
                      {l.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Footer inside mobile menu */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-10 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-[#8a7c6a]"
            >
              Xisco Moncet · Paris · MMXXVI
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
