"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { navLinks, profile } from "@/lib/portfolio";

const accents = [
  { dot: "bg-primary", bar: "bg-primary", text: "text-primary", wash: "hover:bg-primary/[0.05]" },
  { dot: "bg-amber", bar: "bg-amber", text: "text-amber", wash: "hover:bg-amber/[0.05]" },
  { dot: "bg-violet", bar: "bg-violet", text: "text-violet", wash: "hover:bg-violet/[0.05]" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const resolveHref = (href: string): string => {
    if (isHome) return href;
    return href === "#top" ? "/" : `/${href}`;
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/60 backdrop-blur-[10px]">
      <nav className="mx-auto flex h-[72px] max-w-[1160px] items-center justify-between px-8">
        <a href="#top" className="font-display text-lg font-bold tracking-[0.01em] text-foreground">
          JS<span className="text-primary">.</span>
        </a>
        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-8 min-[761px]:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                className="rounded-sm font-mono text-sm text-muted-foreground transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="hidden rounded-full border border-border px-4 py-[9px] font-mono text-[13px] text-foreground transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-primary hover:bg-primary/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-[761px]:inline-flex"
          >
            Say hello
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-[761px]:hidden"
          >
            <span className="relative block h-[13px] w-[18px]">
              <span
                className={`absolute top-0 left-0 block h-[1.5px] w-full bg-current transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${open ? "translate-y-[5.75px] rotate-45" : ""}`}
              />
              <span
                className={`absolute top-1/2 left-0 block h-[1.5px] w-full bg-current transition-opacity duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 block h-[1.5px] w-full bg-current transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${open ? "-translate-y-[5.75px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-[10px]"
          >
            <div className="mx-auto max-w-[1160px] px-8 py-3">
              <div className="flex flex-col">
                {navLinks.map((link, index) => {
                  const accent = accents[index % accents.length];
                  return (
                    <a
                      key={link.href}
                      href={resolveHref(link.href)}
                      onClick={() => setOpen(false)}
                      className={`group relative flex items-center justify-between overflow-hidden border-b border-border py-4 pl-2 pr-2 transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${accent.wash}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-1 left-0 w-[2px] origin-top scale-y-0 transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-y-100 ${accent.bar}`}
                      />
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={`inline-block h-[5px] w-[5px] scale-0 rounded-full transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-100 ${accent.dot}`}
                        />
                        <span className="font-mono text-[15px] text-muted-foreground transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-x-1 group-hover:text-foreground">
                          {link.label}
                        </span>
                      </span>
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className={`h-4 w-4 -translate-x-1 opacity-0 transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-x-0 group-hover:opacity-100 ${accent.text}`}
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  );
                })}
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => setOpen(false)}
                  className="my-4 rounded-full border border-border px-4 py-[9px] text-center font-mono text-[13px] text-foreground transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-primary hover:bg-primary/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Say hello
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
