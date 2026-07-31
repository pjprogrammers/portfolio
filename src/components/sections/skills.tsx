import { skills } from "@/lib/portfolio";

export function Skills() {
  const row = [...skills, ...skills];

  return (
    <section aria-label="Tools I work with" className="border-t border-border/70 py-16 md:py-20">
      <div className="mx-auto max-w-[1160px] px-8">
        <p className="font-mono text-xs text-muted-foreground">Tools I work with</p>
      </div>

      <div className="relative mt-8 overflow-hidden">
        <div className="flex w-max animate-marquee will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex w-max shrink-0 items-center">
              {row.map((skill, i) => (
                <span key={`${copy}-${skill}-${i}`} className="flex items-center">
                  <span className="px-5 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {skill}
                  </span>
                  <span aria-hidden="true" className="text-sm text-border">
                    /
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent"
        />
      </div>
    </section>
  );
}
