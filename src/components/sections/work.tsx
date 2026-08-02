"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Reveal } from "@/components/reveal";
import { WorkImageCard } from "@/components/work-image-card";
import { work, type WorkItem } from "@/lib/portfolio";

const MAX_ANGLE = 28;
const MAX_SCALE = 0.12;
// Small screens scroll fast (flick/gesture), so use a stronger angle and a
// snappier lerp there — otherwise the bend never catches up while the card
// is on screen and it reads as no tilt at all.
const MOBILE_MAX_ANGLE = 42;
const MOBILE_MAX_SCALE = 0.18;
const LERP = 0.2;

function useScrollBend(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(max-width: 1024px)");
    let mobile = mq.matches;

    let current = 0;
    let raf = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);

      const maxAngle = mobile ? MOBILE_MAX_ANGLE : MAX_ANGLE;
      const maxScale = mobile ? MOBILE_MAX_SCALE : MAX_SCALE;

      const vh = window.innerHeight;
      const vCenter = vh / 2;
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      // -1 when the card center sits below the viewport center, 0 at center,
      // +1 when it sits above. Mirrors the reference implementation.
      let progress = (vCenter - elCenter) / (vCenter + rect.height / 2);
      progress = Math.max(-1, Math.min(1, progress));

      current += (progress - current) * LERP;

      const angle = current * maxAngle;
      const scale = 1 - Math.abs(current) * maxScale;
      el.style.transform = `perspective(1000px) rotateX(${angle.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    };

    const onMq = () => {
      mobile = mq.matches;
    };
    mq.addEventListener("change", onMq);

    loop();
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", onMq);
    };
  }, [ref]);
}

function WorkRow({ item }: { item: WorkItem }) {
  const imgRef = useRef<HTMLDivElement>(null);
  useScrollBend(imgRef);

  return (
    <div className="relative">
      <Reveal>
        <a
          href={`/work#${item.id}`}
          aria-label={item.ariaLabel}
          className="group block cursor-pointer"
        >
          <div
            ref={imgRef}
            className="mx-auto w-[min(920px,84%)] origin-center overflow-hidden transition-[filter] duration-[0.25s] ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-transform group-hover:brightness-[1.08] max-[700px]:w-full"
          >
            <WorkImageCard item={item} />
          </div>
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
