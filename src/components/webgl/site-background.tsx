"use client";

import useFontsReady from "@/lib/hooks/useFontsReady";
import GlobalParticleCanvas from "@/components/webgl/FooterRCanvas";

export default function SiteBackground() {
  useFontsReady();
  return <GlobalParticleCanvas />;
}
