import { navLinks, profile } from "@/lib/portfolio";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/60 backdrop-blur-[10px]">
      <nav className="mx-auto flex h-[72px] max-w-[1160px] items-center justify-between px-8">
        <a href="#top" className="font-display text-lg font-bold tracking-[0.01em] text-foreground">
          JS<span className="text-primary">.</span>
        </a>
        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-8 min-[761px]:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-sm font-mono text-sm text-muted-foreground transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border border-border px-4 py-[9px] font-mono text-[13px] text-foreground transition-colors duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:border-primary hover:bg-primary/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Say hello
          </a>
        </div>
      </nav>
    </header>
  );
}
