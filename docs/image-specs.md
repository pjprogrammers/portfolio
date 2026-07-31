# Image Specs

No AI-generated images for this portfolio. The page renders styled placeholder slots that
auto-swap to real files when you drop them at the paths below. Each slot points at
`public/images/<path>`. If a file is missing or fails to load, a labeled placeholder
renders in its place, so the layout never breaks.

## Placements

| # | Section | Path (public/images/...) | Ratio | Display size | Prompt / direction |
|---|---------|--------------------------|-------|--------------|--------------------|
| 1 | About | `about/portrait.jpg` | 3:4 | ~640w x 853h on desktop, sticky in left column | Portrait of Jashan Singla, neutral studio or natural light, dark slate background, muted blue shirt, photorealistic, head-and-shoulders. Keep the same cold-midnight grading as the site (`#020617` bg family). |
| 2 | Focus (optional) | `focus/work.jpg` | 16:9 | large bento cell | Overhead shot of a laptop with an automation dashboard and a notebook, dark room, blue accent lighting, shallow depth of field. |
| 3 | Education (optional) | `education/campus.jpg` | 16:9 | ~800w x 450h | Low-light campus or library at night, subtle blue tones, no visible faces or logos. |

## Rules

- Replace files at the exact paths above. Keep the extension `.jpg` (or update the `src` in
  the component that references it).
- All images render with `object-cover`, so any crop works, but matching the listed ratio
  avoids surprise crops.
- Keep files under ~300 KB each (Next.js Image optimization is enabled, but smaller source
  files keep LCP fast). Target 1280w max on the long edge.
- The hero uses a WebGL particle field instead of an image. No hero image needed.

## To remove a placeholder

Delete the `ImageSlot` usage in `src/components/sections/about.tsx` (and/or the focus and
education slots) once you have the real image in place.
