# PLG Ecosystem — Handoff Notes

## Project overview

Next.js app (v16.2.1, App Router) deployed on Vercel via GitHub.
Live URL: **https://plg.partners**
Repo: `PLGecosystem`, branch `main`.
No local `npm install` — builds happen on Vercel after push via GitHub Desktop.

---

## Auth / passwords

| Section | Cookie | Password | Login page |
|---|---|---|---|
| Main site | `plg_auth` | `ecosystem` | `/login` |
| Kometa | `plg_kometa` | `brno` | `/kometa/login` |
| Analytics | `plg_analytics` | (separate) | `/analytics/login` |

Auth is handled in `middleware.ts` — three-layer check: analytics → kometa → main.

---

## Route map

| URL | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Main English ecosystem orbit |
| `/kometa` | `src/app/kometa/page.tsx` | Czech client orbit — DO NOT touch main page |
| `/kometa/login` | `src/app/kometa/login/page.tsx` | |
| `/kometa/ticketing` | `src/app/kometa/ticketing/page.tsx` | Full Czech ticketing page |
| `/kometa/crm` | `src/app/kometa/crm/page.tsx` | Full Czech CRM page |
| `/ticketing` | `src/app/ticketing/page.tsx` | Original English — do not touch |
| `/crm` | `src/app/crm/page.tsx` | Original English — do not touch |
| `/analytics` | `src/app/analytics/page.tsx` | Internal dashboard |

**Rule:** All kometa-specific changes go under `src/app/kometa/`. Never edit the original pages.

---

## Key components

### `src/components/OrbitDiagram.tsx`
Accepts optional `products?: Product[]` prop. If omitted, falls back to global `PRODUCTS` from `src/lib/products.ts`. Kometa passes its own `KOMETA_PRODUCTS` array.

### `src/components/ExternalDataCloud.tsx`
Canvas-based animation. Accepts optional `nodes?: DataNode[]` prop.
- **Default (English)** nodes used on main `/` page — no prop needed.
- **Czech nodes** (`KOMETA_NODES`) passed explicitly from `src/app/kometa/page.tsx`.
- Animation: glowing pulse dots travel along connector lines from external data labels to the orbit ring, bidirectional (inward blue, outward green tint).
- Boxes show `● Live` indicator.
- Connector dot sits at the box edge, not the center.

### `src/components/ProductBreadcrumb.tsx`
Used on all original product pages. Hardcodes `router.push('/')`. Do NOT use on kometa sub-pages — use an inline breadcrumb instead (see `/kometa/ticketing/page.tsx` for the pattern).

---

## Kometa orbit products (`src/app/kometa/page.tsx`)

10 ring nodes (evenly spaced at 36°) + SSO center:

| Slug | Label | Color |
|---|---|---|
| `ticketing` | Ticketingové weby | #F59E0B |
| `kiosks` | Kiosky | #2563EB |
| `cashless` | Cashless | #EA580C |
| `nabidka` | Nabídka | #16A34A |
| `partnersky-portal` | Partnerský portál | #6366F1 |
| `marketing` | Marketing | #E11D48 |
| `ai-assistant` | AI asistent pro promotéry | #BE185D |
| `crm` | CRM | #0D9488 |
| `venue-apps` | Mobilní aplikace | #7C3AED |
| `pripadove-studie` | Případové studie | #B45309 |
| `sso` | SSO (center) | #06D373 |

Navigation logic in `handleProductClick`:
- `KOMETA_SUBPAGES = ['ticketing', 'crm']` → routes to `/kometa/[slug]`
- `NAVIGABLE_SLUGS` → routes to shared `/{slug}` page
- Other slugs (nabidka, partnersky-portal, marketing, pripadove-studie) → no page yet, click does nothing

---

## `/kometa/ticketing` page

**Sections:** Úvod · PLG rodina · Co nabízíme · Platforma · Funkce

**Clubs grid (`CLUBS`):** Slavia, Sparta, Liberec, Karlovy Vary, Vítkovice, Bohemians, Slovan BA, HC Slovan
Logos in `public/clubs/` — 56×56px, `object-fit: contain`.

**Features grid (`FEATURES`):** 13 tiles, CSS grid with `span` support (`wide` = md:col-span-2, `full` = md:col-span-2 lg:col-span-3).

Feature images in `public/features/`:
| File | Used in tile |
|---|---|
| `subdomain-motogp.png` | Subdoména |
| `subdomain-slavia.png` | Subdoména |
| `ticket-paper.png` | Typy vstupenek |
| `ticket-digital.png` | Typy vstupenek |
| `ticket-mobile.png` | Typy vstupenek |
| `arena-kometa.png` | Interaktivní SVG hlediště |

Images render at natural aspect ratio (no fixed height, no objectFit crop).

---

## `/kometa/crm` page

Full Czech translation of `/crm`. Custom breadcrumb → `/kometa`.

Extra feature tile added: **"Automatizované scénáře"** (7th in FEATURES list).
- Image: `public/crm-scenarios.png` (workflow canvas screenshot)
- accent: `#E11D48`

---

## Public assets

```
public/
  plglogo.svg
  clubs/
    logo_slavia.png
    logo_sparta.png
    logo_liberec.png
    logo_kv.png
    logo_vitkovice.png
    logo_bohemians.png
    logo_slovan_ba.png
    logo_slovan_hc.png
  features/
    subdomain-motogp.png
    subdomain-slavia.png
    ticket-paper.png
    ticket-digital.png
    ticket-mobile.png
    arena-kometa.png
  crm-scenarios.png        ← CRM Automatizované scénáře
  media/
    crm-hero.png
    crm-dashboard.png
    crm-fans.png
    crm-mrk.png
    crm-reports.png
    crm-cube.png
    crm-helpdesk.png
```

---

## Known gaps / next steps

- **Nabídka, Partnerský portál, Marketing, Případové studie** — orbit nodes exist but no detail pages yet
- **`/kometa/kiosks`, `/kometa/cashless`, `/kometa/venue-apps`** — currently routing to shared English pages; Czech versions not built yet
- Preview prototype at `.claude/preview/data-stream.html` — can be deleted
