"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ImageSlotProps = {
  src: string;
  alt: string;
  ratio: string;
  specPath: string;
  className?: string;
};

export function ImageSlot({ src, alt, ratio, specPath, className }: ImageSlotProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border bg-card",
        className
      )}
      style={{ aspectRatio: ratio }}
    >
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(120%_90%_at_30%_10%,rgba(99,232,216,0.14)_0%,transparent_60%)]">
          <span className="font-mono text-xs text-muted-foreground">Image slot</span>
          <span className="font-mono text-[11px] text-muted-foreground">
            public/images/{specPath}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
