import { Reveal } from "@/components/reveal";
import { education } from "@/lib/portfolio";

export function Education() {
  return (
    <section id="education" className="py-[120px]">
      <div className="mx-auto max-w-[1160px] px-8">
        <Reveal className="mb-14 max-w-[640px]">
          <span className="mb-3.5 block font-mono text-[13px] text-primary">03 / Education</span>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-[-0.01em] text-foreground">
            Formal training, in progress.
          </h2>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap items-start justify-between gap-6 rounded-2xl border border-border bg-[linear-gradient(135deg,rgba(99,232,216,0.05),rgba(143,124,240,0.04))] px-10 py-9">
            <div>
              <h3 className="mb-1.5 font-display text-xl font-semibold text-foreground">{education.degree}</h3>
              <div className="text-[14.5px] text-muted-foreground">{education.school}</div>
            </div>
            <span className="font-mono text-[13px] whitespace-nowrap text-primary">{education.period}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
