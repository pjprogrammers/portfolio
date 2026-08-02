/** Prefijos de locale soportados (sin next-intl en este proyecto). */
const LOCALES = ["en"] as const;
type Locale = (typeof LOCALES)[number];

export type ParticleRouteFeatures = {
  /** Morph star / diamond / adn desde `[data-geometry]`. */
  geometryParticles: boolean;
  /** Formación de la R en el footer (`data-dissolve="in"` sin `data-geometry`). */
  footerRParticles: boolean;
};

const DEFAULT_FEATURES: ParticleRouteFeatures = {
  geometryParticles: false,
  footerRParticles: false,
};

/** Rutas sin prefijo de locale (`/` = home). */
const ROUTE_PARTICLE_FEATURES: Record<string, ParticleRouteFeatures> = {
  "/": { geometryParticles: true, footerRParticles: true },
  "/about": { geometryParticles: true, footerRParticles: true },
};

export function normalizeRoutePath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && LOCALES.includes(first as Locale)) {
    segments.shift();
  }

  if (segments.length === 0) return "/";
  return `/${segments.join("/")}`;
}

export function getParticleRouteFeatures(
  pathname: string,
): ParticleRouteFeatures {
  const path = normalizeRoutePath(pathname);
  return ROUTE_PARTICLE_FEATURES[path] ?? DEFAULT_FEATURES;
}

export function hasFooterParticleField(
  features: ParticleRouteFeatures,
): boolean {
  return features.geometryParticles || features.footerRParticles;
}
