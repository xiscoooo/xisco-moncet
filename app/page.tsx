import Nav from "@/components/nav";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Notes from "@/components/sections/notes";
import Contact from "@/components/sections/contact";
import Ornament from "@/components/ornament";
import { CursorTracker, ScrollProgress } from "@/components/ui/animations";
import { Preloader } from "@/components/ui/preloader";
import { SectionDots } from "@/components/ui/section-dots";

export default function Home() {
  return (
    <main className="paper-grain relative">
      <Preloader />
      <CursorTracker />
      <ScrollProgress />
      <SectionDots />
      <Nav />
      <Hero />
      <Ornament />
      <About />
      <Ornament />
      <Skills />
      <Ornament />
      <Projects />
      <Ornament />
      <Notes />
      <Ornament />
      <Contact />
      <footer className="border-t border-[#d4c9b3] py-10 text-center">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#8a7c6a]">
          Set in EB Garamond &amp; Cormorant · Composed in Paris ·{" "}
          {new Date().getFullYear()}
        </p>
        <p className="mt-3 font-serif text-sm italic text-[#8a7c6a]">· fin ·</p>
      </footer>
    </main>
  );
}
