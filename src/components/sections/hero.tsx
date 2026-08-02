"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "@/lib/portfolio";

const HeroBlob = dynamic(() => import("@/components/hero-blob"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduceMotion = Boolean(useReducedMotion());
  const init = reduceMotion ? false : ({ opacity: 0, y: 24 } as const);

  return (
    <section id="top" data-ambient-formation-hero className="relative flex min-h-screen min-h-[100dvh] items-center pt-[72px]">
      <HeroBlob reduced={reduceMotion} />

      <div className="relative z-10 mx-auto w-full max-w-[1160px] px-8">
        <div className="max-w-[640px]">
          <motion.div
            initial={init}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-[22px] flex items-center gap-[10px] font-mono text-[13px] uppercase tracking-[0.08em] text-primary"
          >
            <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
            Security Research · AI Systems
          </motion.div>

          <motion.h1
            initial={init}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mb-6 font-display text-[clamp(2.6rem,5.4vw,4.4rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-foreground"
          >
            I look for the door{" "}
            <em className="bg-[linear-gradient(100deg,var(--primary),var(--amber))] bg-clip-text text-transparent not-italic">
              nobody locked
            </em>
            .
          </motion.h1>

          <motion.p
            initial={init}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mb-9 max-w-[520px] text-[17px] text-muted-foreground"
          >
            AI Automation & Intelligent Solutions Intern at CSRBOX, building agentic
            AI workflows by day and probing broken authentication, access control,
            and injection flaws the rest of the time. BTech in Artificial
            Intelligence, based in Sirsa, Haryana.
          </motion.p>

          <motion.div
            initial={init}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="flex flex-wrap gap-3.5"
          >
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-[22px] py-[13px] text-sm font-medium text-primary-foreground transition-[transform,background-color,border-color] duration-[0.18s] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-0.5 hover:bg-[#7ff0e1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
            >
              See the journey
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-[22px] py-[13px] text-sm font-medium text-foreground transition-[transform,background-color,border-color] duration-[0.18s] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-0.5 hover:border-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
            >
              Email me
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-[34px] left-8 flex items-center gap-[10px] font-mono text-xs text-muted-foreground">
        <span aria-hidden="true" className="relative h-px w-9 overflow-hidden bg-muted-foreground">
          <span className="absolute inset-y-0 -left-full w-full animate-scrollline bg-primary" />
        </span>
        SCROLL
      </div>
    </section>
  );
}
