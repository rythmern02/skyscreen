# SkyScreen — Advertising Has Left The Ground

A cinematic, award-grade marketing experience for **SkyScreen**, a (fictional) company
that flies a massive drone-suspended LED screen into the night sky.

Built as an *experience*, not a brochure: a real Three.js night-sky stage, custom GLSL,
GSAP + Lenis scroll choreography, a bespoke magnetic cursor, and handcrafted sections.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first design tokens — layered blacks, cinematic type)
- **Three.js** + **React Three Fiber** + **drei** + **@react-three/postprocessing** (bloom)
- **GSAP** (magnetic interactions) · **Motion** (Framer Motion) · **Lenis** (smooth scroll)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

> The hero & technology scenes are live WebGL. On devices without a usable WebGL
> context the site degrades gracefully to a CSS night-sky fallback.

## Architecture

```
src/
  app/
    layout.tsx          Fonts (Inter + Sora), SEO/OpenGraph metadata, JSON-LD schema
    page.tsx            Section composition
    globals.css         Design system: layered blacks, glow, glass, type scale
  components/
    providers/          Lenis <-> GSAP ScrollTrigger smooth-scroll
    canvas/             Hero scene (SkyBackdrop, DroneRig, Drone, LedScreen),
                        exploded technology drone, WebGL fallback
    sections/           Hero, Marquee, Manifesto, WhatIs, Showcase, Technology,
                        Stats, Industries, Process, Gallery, Testimonials, Faq,
                        Contact, Footer
    ui/                 Custom cursor, magnetic button, reveals, nav, count-up...
  hooks/                useMagnetic
  lib/                  content data, glsl chunks, webgl detection, utils
```

## Signature details

- **Hero** — procedural drone rig carrying an LED panel that plays a *live* animated
  ad (canvas texture -> LED-pixel-grid emissive shader), spinning props with volumetric
  glow, blinking nav lights, a single-pass GLSL night sky (clouds, stars, city lights),
  bloom, and a camera that orbits with mouse parallax and pushes in on scroll.
- **Technology** — a scroll-synced exploded 3D drone; each system glows as it's read.
- **Showcase** — horizontal scroll storytelling. **Industries** — draggable 3D carousel.
- **Process** — a glowing path that fills on scroll. **Gallery** — masonry with a shared-
  element lightbox. **Contact** — full campaign brief with a drone-takeoff success state.
- **Throughout** — magnetic cursor, magnetic buttons, word-by-word headline reveals,
  scroll-linked text, reduced-motion + mobile quality scaling, semantic HTML & a11y.

Content copy is original; statistics are illustrative spec figures.
