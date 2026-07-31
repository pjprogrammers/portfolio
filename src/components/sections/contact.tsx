import { Reveal } from "@/components/reveal";
import { profile } from "@/lib/portfolio";

export function Contact() {
  return (
    <section id="contact" className="py-[120px] pb-20">
      <div className="mx-auto max-w-[1160px] px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[20px] border border-border bg-[radial-gradient(circle_at_50%_0%,rgba(99,232,216,0.08),transparent_60%)] px-12 py-16 text-center">
            <h2 className="mb-4 font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.01em] text-foreground">
              Have something worth breaking?
            </h2>
            <p className="mx-auto mb-8 max-w-[480px] text-muted-foreground">
              Open to internships and collaborations across security research and AI automation. I read every email myself.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-[22px] py-[13px] text-sm font-medium text-primary-foreground transition-[transform,background-color,border-color] duration-[0.18s] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-0.5 hover:bg-[#7ff0e1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
              >
                {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-[22px] py-[13px] text-sm font-medium text-foreground transition-[transform,background-color,border-color] duration-[0.18s] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-0.5 hover:border-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
              >
                LinkedIn ↗
              </a>
            </div>
            <div className="mt-7 font-mono text-[12.5px] text-muted-foreground">{profile.location}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
