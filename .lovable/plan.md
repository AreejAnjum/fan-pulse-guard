
# Privacy-First Fan Intelligence — Landing Page Plan

## Design concept evaluation

Three concepts considered:

1. **Editorial Privacy Manifesto** — magazine-style, serif headlines, heavy whitespace. Strong on trust + uniqueness, weak on "AI/data intelligence" feel and hackathon wow factor.
2. **Enterprise Sports Intelligence + Privacy Command Center** *(chosen)* — dark graphite UI, pitch-grid background, live pipeline visual, monospaced data labels, privacy-green + data-cyan accents. Best fit across all six criteria: clubs (sports-data DNA), GDPR (command-center trust signals), AI (visible pipeline + insights dashboard), uniqueness (no purple SaaS look), hackathon impact (animated pipeline hero), conversion (clear CTA hierarchy).
3. **Stadium Operations HUD** — full-bleed broadcast-graphic style. Visually striking but risks reading as gimmicky to a privacy/innovation manager.

Going with concept 2.

## Visual system

- **Background** `#0B1117`, **surface** `#121C24`, **elevated** `#15212B`
- **Text** `#F5F7FA` primary, `#A8B3BD` secondary
- **Accents** privacy green `#30E07A`, data cyan `#37D5FF`, amber `#FBBF24` (warnings only)
- **Border** `rgba(255,255,255,0.10)` hairlines
- **Typography** Manrope (display) + IBM Plex Sans (body) + IBM Plex Mono (data labels, PII tags, code)
- **Texture** subtle football-pitch grid SVG (centerline + arcs) at low opacity behind hero; faint dotted data-flow lines connecting pipeline stages
- All colors via semantic tokens in `src/styles.css` (oklch)

## Route structure

Per project conventions, each major section is its own route with unique `head()` metadata:

```
src/routes/
  index.tsx          → / (Hero + condensed solution + CTA)
  problem.tsx        → /problem
  solution.tsx       → /solution (5-step pipeline + before/after)
  architecture.tsx   → /architecture
  demo.tsx           → /demo (placeholder demo page with sample message walkthrough)
  metrics.tsx        → /metrics (metrics + use cases + FAQ)
```

Shared `<SiteHeader />` + `<SiteFooter />` components. Header nav: Problem · Solution · Architecture · Demo · Metrics, with primary "View Demo" button.

The home page (`/`) condenses: Hero → Problem teaser → Pipeline preview → Before/After → Insights dashboard → Trust → Use cases → Metrics → FAQ → CTA → Footer. Dedicated routes deep-dive each topic for SEO and shareability.

## Key components to build

- `PipelineHero` — hero with animated stage indicators (Raw → Detect → Mask → Analyze), live-typed example message, glowing privacy status pill
- `PIIDiffPanel` — split panel; raw side highlights PII tokens with colored underlines + tag chips, masked side shows monospace `[NAME_1]` placeholders
- `PipelineDiagram` — horizontal 5-step flow with hairline connectors, step numbers, and short captions; vertical on mobile
- `InsightsDashboard` — compact dashboard tile: sentiment gauge, topic chip, intent chip, urgency meter, summary line, recommended-action callout
- `ArchitectureStack` — vertical stack diagram (Next.js → FastAPI → Presidio+Regex → Masking → Safety Gate → LLM → Postgres → Dashboard) with role labels and a side note on data retention
- `TrustGrid` — 6 trust points as compact cards with privacy-green check icons
- `UseCaseGrid` — 6 football-specific use-case cards, Lucide icons
- `MetricsStrip` — large numerical/label pairs (0% PII leakage target, EN/DE/Mixed, 1-msg mode, etc.)
- `FAQAccordion` — shadcn accordion, 6 questions
- `SectionHeading` — eyebrow + headline + lede pattern reused everywhere

Animations: Framer Motion, restrained — fade/slide on scroll-in, one looping pipeline stage indicator in hero, no blobs, no parallax confetti.

## Content rules

- No fake logos, testimonials, or fabricated stats.
- Honest hackathon framing in footer ("Raumdeuter AI Hackathon Project").
- Copy lifted/adapted from the PRD; metrics phrased as targets, not proven results.
- All PII placeholders rendered in mono font with cyan tint.

## SEO / metadata

Each route sets unique `title`, `description`, `og:title`, `og:description`. Single H1 per page. Semantic landmarks (`header`, `main`, `section`, `footer`). Lucide icons have `aria-hidden`; interactive elements are real buttons/links.

## Out of scope (this build)

- Live working demo backend (the `/demo` route shows a scripted walkthrough with the PRD's example message; wiring real FastAPI/Presidio is not part of the landing page).
- Auth, database, or Lovable Cloud — pure frontend.

## Self-review checklist (run after build)

Professional? Avoids generic AI look? 5-second value prop? Logical order? Privacy is the lead trust message? Understandable to club innovation manager AND technical judge? Visually distinctive? Mobile responsive? Contrast AA?

## Technical notes

- Tailwind v4 tokens defined in `src/styles.css` using oklch; map semantic names (`--privacy`, `--data`, `--surface`, `--surface-elevated`, `--hairline`).
- Fonts loaded via `<link>` in `__root.tsx` head (Google Fonts: Manrope, IBM Plex Sans, IBM Plex Mono).
- Pitch-grid background as inline SVG component, not a raster image.
- All shadcn primitives (button, card, accordion, badge) restyled via tokens — no default shadcn look bleeding through.
