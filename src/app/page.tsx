import { LenisProvider } from "@/components/providers/lenis-provider";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Focus } from "@/components/sections/focus";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Page() {
  return (
    <LenisProvider>
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Focus />
        <Work />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </LenisProvider>
  );
}
