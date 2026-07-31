import { Reveal } from "@/components/reveal";
import { ImageSlot } from "@/components/image-slot";
import { about } from "@/lib/portfolio";

export function About() {
  return (
    <section id="about" className="py-[120px]">
      <div className="mx-auto max-w-[1160px] px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <ImageSlot
              src="/images/about/portrait.jpg"
              alt="Portrait of Jashan Singla"
              ratio="3/4"
              specPath="about/portrait.jpg"
              className="max-w-md lg:sticky lg:top-24"
            />
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-[-0.01em] text-foreground">
                {about.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6">
                {about.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mb-4 max-w-[60ch] text-base leading-relaxed text-muted-foreground last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                {about.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-mono text-xs text-muted-foreground">{stat.label}</dt>
                    <dd className="mt-2 text-sm text-foreground">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
