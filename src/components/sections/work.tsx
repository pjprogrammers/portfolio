"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/reveal";
import { WorkImageCard } from "@/components/work-image-card";
import { work, type WorkItem } from "@/lib/portfolio";

function bendTransform(p: number): string {
  const q = Math.max(-1, Math.min(1, p * 2 - 1));
  const angle = q * 18;
  const scale = 1 - Math.abs(q) * 0.08;
  return `perspective(1000px) rotateX(${angle.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
}

function WorkRow({ item }: { item: WorkItem }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const bend = useTransform(scrollYProgress, (p) => bendTransform(p));

  return (
    <div className="relative">
      <Reveal>
        <a
          href={`/work#${item.id}`}
          aria-label={item.ariaLabel}
          className="group block cursor-pointer"
        >
          <motion.div
            ref={imgRef}
            style={
              reduce
                ? undefined
                : { transform: bend, transformOrigin: "50% 50%", willChange: "transform" }
            }
            className="mx-auto w-[min(920px,84%)] overflow-hidden transition-[filter] duration-[0.25s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:brightness-[1.08] max-[700px]:w-full"
          >
            <WorkImageCard item={item} />
          </motion.div>
        </a>

        <div className="pointer-events-none absolute bottom-4 left-8 right-8 flex items-center justify-between max-[700px]:static max-[700px]:bottom-auto max-[700px]:left-auto max-[700px]:right-auto max-[700px]:border-b max-[700px]:border-border max-[700px]:bg-card max-[700px]:px-5 max-[700px]:py-[14px]">
          <span className="pointer-events-auto font-serif italic text-base text-foreground">
            {item.name}
          </span>
          <a
            href={item.href}
            className="pointer-events-auto border-b border-transparent text-sm text-muted-foreground transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-primary hover:text-primary"
          >
            See live
          </a>
        </div>
      </Reveal>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="py-[120px]">
      <div className="mx-auto max-w-[1160px] px-8">
        <Reveal className="mx-auto mb-14 max-w-[760px] text-center">
          <div className="mb-[22px] font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground">
            Featured Work
          </div>
          <h2 className="font-serif font-medium italic text-[clamp(1.8rem,4vw,3rem)] leading-[1.32] tracking-[-0.01em] text-foreground">
            Finding the flaw before it finds<span className="text-primary not-italic">*</span>{" "}
            someone else, then building the system that catches it next time.
          </h2>
        </Reveal>
      </div>

      <div className="mt-20 max-[700px]:mt-14">
        {work.map((item) => (
          <WorkRow key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
