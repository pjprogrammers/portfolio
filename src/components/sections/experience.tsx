import { Reveal } from "@/components/reveal";
import { experience } from "@/lib/portfolio";

export function Experience() {
  return (
    <section id="experience" className="py-[120px]">
      <div className="mx-auto max-w-[1160px] px-8">
        <Reveal className="mb-14 max-w-[640px]">
          <span className="mb-3.5 block font-mono text-[13px] text-primary">02 / Experience</span>
          <h2 className="mb-3.5 font-display text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-[-0.01em] text-foreground">
            Where the hours went.
          </h2>
          <p className="text-base text-muted-foreground">
            Three internships, in order, each one narrowing the gap between finding a problem and fixing it.
          </p>
        </Reveal>

        <Reveal>
          <div className="relative">
            <span aria-hidden="true" className="absolute bottom-2 top-2 left-[8px] w-px bg-border min-[601px]:left-[56px]" />
            <ol>
              {experience.map((item) => (
                <li key={item.org + item.period} className="relative mb-14 pl-[34px] last:mb-0 min-[601px]:pl-[120px]">
                  <span className="mb-1.5 block w-auto font-mono text-[12.5px] text-muted-foreground min-[601px]:absolute min-[601px]:top-0.5 min-[601px]:left-0 min-[601px]:mb-0 min-[601px]:w-[90px] min-[601px]:text-right">
                    {item.period}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute left-1 top-1.5 h-[9px] w-[9px] rounded-full border-2 border-primary bg-background min-[601px]:left-[52px] ${
                      item.current ? "bg-primary shadow-[0_0_14px_var(--primary)]" : ""
                    }`}
                  />
                  <h3 className="mb-0.5 font-display text-[19px] font-semibold text-foreground">{item.role}</h3>
                  <span className="mb-3.5 block font-mono text-[13px] text-amber">{item.org}</span>
                  <ul className="space-y-[9px]">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="relative pl-[18px] text-[14.5px] text-muted-foreground">
                        <span
                          aria-hidden="true"
                          className="absolute top-[9px] left-0 h-[5px] w-[5px] rounded-full bg-primary opacity-70"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  {item.tools ? (
                    <p className="mt-3 font-mono text-[12.5px] text-muted-foreground">
                      Tools: <strong className="font-medium text-foreground">{item.tools}</strong>
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
