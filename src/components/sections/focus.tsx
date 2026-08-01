import { Reveal } from "@/components/reveal";
import { focusAreas, throughline } from "@/lib/portfolio";

export function Focus() {
  return (
    <section id="focus" className="py-[120px]">
      <div className="mx-auto max-w-[1160px] px-8">
        <Reveal className="mb-14 max-w-[640px]">
          <span className="mb-3.5 block font-mono text-[13px] text-primary">01 / Focus</span>
          <h2 className="mb-3.5 font-display text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-[-0.01em] text-foreground">
            Two disciplines, one habit of mind.
          </h2>
          <p className="text-base text-muted-foreground">
            Find the weak point before it gets exploited. Then automate the parts that don&apos;t need a human.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border min-[761px]:grid-cols-2">
            {focusAreas.map((area, i) => (
              <article key={area.tag} className="bg-card/85 p-10">
                <span
                  className={`mb-[18px] block font-mono text-xs uppercase tracking-[0.06em] ${i === 1 ? "text-primary" : "text-amber"}`}
                >
                  {area.tag}
                </span>
                <h3 className="mb-[10px] font-display text-[22px] font-semibold text-foreground">{area.title}</h3>
                <p className="mb-6 text-[15px] text-muted-foreground">{area.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {area.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-md border border-border bg-white/[0.02] px-3 py-[7px] font-mono text-[12.5px] text-foreground"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-10 max-w-[760px] rounded-r-[10px] border-l-2 border-primary bg-primary/5 px-7 py-6 text-[15px] text-foreground">
            {throughline}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
