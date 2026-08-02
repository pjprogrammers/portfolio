export function Footer() {
  return (
    <footer
      data-dissolve="in"
      data-dissolve-start-ref="#education"
      data-dissolve-start="top bottom"
      data-dissolve-end="bottom bottom"
      className="border-t border-border py-7"
    >
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-2.5 px-8 font-mono text-[12.5px] text-muted-foreground">
        <span>© 2026 Jashan Singla</span>
        <span>Built with curiosity, Three.js, and one too many CTFs.</span>
      </div>
    </footer>
  );
}
