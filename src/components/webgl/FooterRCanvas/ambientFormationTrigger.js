import { AMBIENT_FORMATION_MAX_PROMINENCE } from "./footerRConfig.js";
import { particleScrollState } from "./particleScrollState.js";
import { gsap } from "@/lib/gsap/registerPlugin";

const AMBIENT_FORMATION_HERO_SELECTOR = "[data-ambient-formation-hero]";
const AMBIENT_FORMATION_ABOUT_SELECTOR = "[data-ambient-formation-about]";

/**
 * Fundido de la estrella como fondo ambiental según scroll.
 *
 * En el hero (`data-ambient-formation-hero`) la prominencia es 0: el campo de
 * partículas se queda orgánico. Según el hero sale de pantalla sube a
 * `AMBIENT_FORMATION_MAX_PROMINENCE` (~0.38) y se mantiene como motivo sutil
 * en el resto del sitio. Solo se aplica al tramo estrella; la R del footer
 * (`rFormation`) no depende de este valor.
 */
export function setupAmbientFormationTrigger() {
  const heroEl = document.querySelector(AMBIENT_FORMATION_HERO_SELECTOR);
  const aboutEl = document.querySelector(AMBIENT_FORMATION_ABOUT_SELECTOR);
  if (!heroEl) return;

  const endTriggerEl = aboutEl ?? heroEl;
  const end = "bottom top";

  gsap.fromTo(
    particleScrollState,
    { formationProminence: 0 },
    {
      formationProminence: AMBIENT_FORMATION_MAX_PROMINENCE,
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: heroEl,
        start: "top top",
        endTrigger: endTriggerEl,
        end,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    },
  );
}
