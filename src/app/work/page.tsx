import type { Metadata } from "next";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { WorkImageCard } from "@/components/work-image-card";
import { Footer } from "@/components/sections/footer";
import { profile, work } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Jashan Singla — Tavryne Wallpapers, Tavryne AI, VyaparAI, Qrigo, and Jashan 3D, explained.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return (
    <LenisProvider>
      <Nav />
      <main className="relative z-10">
        <section id="work" className="pb-[120px] pt-[160px]">
          <div className="mx-auto max-w-[1160px] px-8">
            <Reveal className="mb-20 max-w-[640px]">
              <span className="mb-3.5 block font-mono text-[13px] text-primary">Work</span>
              <h1 className="mb-4 font-display text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-foreground">
                Selected work, explained.
              </h1>
              <p className="text-base text-muted-foreground">
                The homepage gives you the highlights; this page is the full story: what each
                project does, how it was built, and the parts that taught me the most.
              </p>
            </Reveal>
          </div>

          <div className="space-y-24">
            {work.map((item) => (
              <article key={item.id} id={item.id} className="scroll-mt-[96px]">
                <Reveal>
                  <div className="mx-auto max-w-[1160px] px-8">
                    <div className="group">
                      <a
                        href={item.href}
                        aria-label={`${item.ariaLabel}`}
                        className="mx-auto block w-[min(920px,84%)] transition-[filter] duration-[0.25s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:brightness-[1.08] max-[700px]:w-full"
                      >
                        <WorkImageCard item={item} />
                      </a>
                    </div>

                    <div className="mx-auto mt-10 grid max-w-[920px] gap-10 lg:grid-cols-[240px_1fr]">
                      <div>
                        <h2 className="font-serif font-medium italic text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.2] tracking-[-0.01em] text-foreground">
                          {item.name}
                        </h2>
                        <p className="mt-2 font-mono text-[13px] text-amber">{item.context}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md border border-border bg-white/[0.02] px-3 py-[7px] font-mono text-[12.5px] text-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="max-w-[65ch]">
                        <p className="text-[16px] leading-relaxed text-foreground">{item.summary}</p>
                        <ul className="mt-6 space-y-3">
                          {item.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="relative pl-[18px] text-[15px] text-muted-foreground"
                            >
                              <span
                                aria-hidden="true"
                                className="absolute top-[9px] left-0 h-[5px] w-[5px] rounded-full bg-primary opacity-70"
                              />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </article>
            ))}
          </div>

          <Reveal className="mx-auto mt-24 max-w-[1160px] px-8 text-center">
            <p className="font-mono text-[13px] text-muted-foreground">
              Want to build something like this?{" "}
              <a
                href={`mailto:${profile.email}`}
                className="border-b border-transparent text-foreground transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-primary hover:text-primary"
              >
                Get in touch
              </a>
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </LenisProvider>
  );
}
