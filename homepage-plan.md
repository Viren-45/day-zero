# Day Zero — Homepage Architecture Plan

## Top-Level Overview

**Goal:** Build the complete, visually polished homepage for the Day Zero application.
The homepage is the only page in scope. It collects a GitHub repo URL, a role, and an
experience level, then navigates to a results page (not planned here).

**Stack:** Next.js 16 (App Router, no src directory), React 19, TypeScript 5, Tailwind CSS v4.
Path alias `@/*` maps to the project root.

**Approach:** Decompose the homepage into small, single-responsibility components colocated
under `app/components/`. The root page file (`app/page.tsx`) becomes a thin orchestrator that
imports and composes those components. No third-party UI library is introduced.

---

## File & Folder Structure

```
day-zero/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── OnboardingForm.tsx
│   │   ├── HowItWorksSection.tsx
│   │   └── ExamplesSection.tsx
│   ├── globals.css
│   ├── layout.tsx          ← Inter font via next/font/google + scroll-behavior: smooth
│   └── page.tsx            ← thin orchestrator
└── public/
    └── hero-bg.png         ← already present
```

All components are **React Server Components** (no `"use client"`) except `OnboardingForm`,
which requires `"use client"` for controlled inputs and the scroll-triggered CTA button.

---

## Sub-Tasks

---

### Sub-Task 1 — Root Layout & Global CSS baseline

**Status:** `[ ] pending`

**Intent:**
Establish the global layout foundation that every page inherits: smooth scrolling, the brand
background colour, and the Inter typeface. This needs to happen before any component is built
so that the page shell is correct.

**Expected Outcomes:**
- `app/layout.tsx` loads the **Inter** font using `next/font/google` and applies the generated
  className to both the `<html>` and `<body>` elements so the font cascades everywhere.
- `<html>` receives `scroll-behavior: smooth` via a Tailwind utility class (`[scroll-behavior:smooth]`
  or a global CSS rule on `html`).
- `app/globals.css` retains the Tailwind v4 `@import "tailwindcss"` line and adds:
  - `html, body { background-color: #F0EFFF; }` so the warm lavender-grey base colour is
    inherited by every page without needing to repeat it on individual components.
  - A `:root` block with CSS custom properties: `--color-bg: #F0EFFF` and `--color-accent`
    (a deeper purple, e.g. `#6C63FF`) for consistent theming across components.

**Todo List:**
- [ ] Update `app/layout.tsx`: import `Inter` from `next/font/google`, apply its `.className`
      to `<html>`, add `scroll-behavior: smooth`, confirm metadata title is "Day Zero".
- [ ] Update `app/globals.css`: set `background-color: #F0EFFF` on `html` and `body`, and
      define `--color-bg` and `--color-accent` CSS custom properties under `:root`.

**Relevant Context:**
- [`app/layout.tsx`](app/layout.tsx) — currently minimal, no font or class set.
- [`app/globals.css`](app/globals.css) — currently only `@import "tailwindcss"`.
- `next/font/google` is already available (part of Next.js core); no extra package needed.
- Tailwind v4 does not require a `tailwind.config` entry for custom colours — components can
  use the CSS variables directly via `style={{ color: 'var(--color-accent)' }}` or Tailwind
  arbitrary values like `text-[var(--color-accent)]`.

---

### Sub-Task 2 — Navbar component

**Status:** `[ ] pending`

**Intent:**
Create the fixed top navigation bar. Separating it into its own component keeps `page.tsx`
clean and makes the navbar independently maintainable (e.g. future active-link logic).

**Expected Outcomes:**
- File `app/components/Navbar.tsx` exists.
- Renders a fixed, full-width bar (`fixed top-0 left-0 w-full z-50`) with a semi-transparent
  dark background and a subtle bottom border or backdrop blur.
- Left slot: "Day Zero" wordmark / logo text.
- Centre slot: "How it works" and "Examples" anchor links (`<a href="#how-it-works">` and
  `<a href="#examples">`). These are plain anchor tags; smooth scrolling is handled by the
  global CSS `scroll-behavior`.
- Right slot: "Get Started" button that is an `<a href="#form">` styled as a primary button.
  Clicking it smoothly scrolls to the `OnboardingForm` section.
- The component is a **Server Component** (no interactivity required).

**Todo List:**
- [ ] Create `app/components/Navbar.tsx`.
- [ ] Implement three-column flex layout (logo | nav links | CTA).
- [ ] Style with Tailwind: fixed positioning, z-index, backdrop blur, brand colours.
- [ ] Add `id` anchors on the destination sections (coordinated with later sub-tasks).

**Relevant Context:**
- No existing component folder; this is the first component created.
- Navbar must not overlap content: the `<main>` in `page.tsx` should have a top padding
  equal to the navbar height (e.g. `pt-16` or `pt-20`).

---

### Sub-Task 3 — HeroSection component

**Status:** `[ ] pending`

**Intent:**
Build the full-viewport hero section. It is the most visually complex piece: a background
image with four floating feature-preview cards in the corners and the main content (headline,
subtitle, form) centred. Isolating it prevents `page.tsx` from growing large.

**Expected Outcomes:**
- File `app/components/HeroSection.tsx` exists.
- Renders a `<section>` that fills the viewport (`min-h-screen`), using `hero-bg.png` as a
  CSS `background-image` (via an inline style or a Tailwind arbitrary value), with
  `background-size: cover` and `background-position: center`.
- Four floating card elements are absolutely positioned in the four corners of the section.
  Each card is a small, visually distinct preview panel (e.g. a mock "Architecture Overview"
  card, a "Setup Guide" card, a "Watch Out" card, and a "Suggested Task" card). They are
  purely decorative/illustrative and contain only static placeholder content.
- The centre of the section holds: main headline ("Your personalised onboarding kit,
  generated instantly"), a subtitle, and the `OnboardingForm` component embedded inline.
- The section contains the `id="form"` anchor so the Navbar CTA scrolls here.
- This is a **Server Component** — it simply renders `<OnboardingForm />` as a child.

**Todo List:**
- [ ] Create `app/components/HeroSection.tsx`.
- [ ] Apply background image via inline style (Next.js Image is not used for CSS bg images).
- [ ] Build the four corner card components as inline JSX within this file (they are not
      reusable enough to warrant their own files).
- [ ] Build the centred content area with headline, subtitle, and `<OnboardingForm />`.
- [ ] Add `id="form"` to the section element.

**Relevant Context:**
- Background image is at `public/hero-bg.png`, served at `/hero-bg.png` by Next.js static
  serving.
- `OnboardingForm` (Sub-Task 4) must be created first or in parallel — HeroSection imports it.

---

### Sub-Task 4 — OnboardingForm component

**Status:** `[ ] pending`

**Intent:**
Encapsulate all form state and user-input logic in one client component. Keeping it separate
from HeroSection means the hero background and layout remain a Server Component, limiting
the `"use client"` boundary to just the form island.

**Expected Outcomes:**
- File `app/components/OnboardingForm.tsx` exists with `"use client"` at the top.
- Contains a `<form>` with three fields:
  1. A text input for the GitHub repository URL (placeholder: `https://github.com/org/repo`).
  2. A `<select>` dropdown for role: Frontend, Backend, Full Stack, DevOps.
     **Default selected value: "Full Stack".**
  3. A `<select>` dropdown for experience level: Junior, Mid Level, Senior.
     **Default selected value: "Mid Level".**
- The form is never in an empty/unselected state on first render.
- A "Generate My Kit" primary `<button type="submit">`.
- On submit, the form uses `useRouter` (from `next/navigation`) to navigate to a results
  page route such as `/kit?repo=...&role=...&level=...`. The results page is out of scope
  for this plan, so the navigation target can be a placeholder.
- All fields have appropriate accessible labels (`<label>` or `aria-label`).
- Styled with Tailwind: rounded corners, clear visual focus states. Background of the form
  card should be semi-transparent white or a slightly lighter lavender tint so it reads
  well over the hero background image.

**Todo List:**
- [ ] Create `app/components/OnboardingForm.tsx` with `"use client"`.
- [ ] Initialise `useState` for role with `"Full Stack"` and for experience level with
      `"Mid Level"` so defaults are always set.
- [ ] Implement controlled inputs with `useState` for repo URL, role, and experience level.
- [ ] Wire submit handler to build query string and call `router.push(...)`.
- [ ] Style form fields and button consistently with the lavender-grey theme; ensure the
      form card is readable against the hero background image.
- [ ] Ensure the form is accessible (labels, ARIA, keyboard navigation).

**Relevant Context:**
- This is the only `"use client"` component on the homepage.
- Imported by `HeroSection` (Sub-Task 3).

---

### Sub-Task 5 — HowItWorksSection component

**Status:** `[ ] pending`

**Intent:**
Present the three-step explainer below the hero. A dedicated component keeps the section
self-contained and gives it its own `id` anchor for the Navbar link.

**Expected Outcomes:**
- File `app/components/HowItWorksSection.tsx` exists.
- Renders a `<section id="how-it-works">` with a heading "How it works".
- Shows exactly three numbered steps in a horizontal row (or stacked on mobile):
  1. Paste a GitHub URL
  2. Choose your role & level
  3. Get your personalised kit
- Each step has a number badge, a short title, and a one-sentence description.
- This is a **Server Component**.

**Todo List:**
- [ ] Create `app/components/HowItWorksSection.tsx`.
- [ ] Define a static array of step objects `{ number, title, description }` and map over it.
- [ ] Style with a background that creates visual separation from the hero — use a slightly
      deeper lavender or neutral tone (e.g. `bg-[#E8E7F8]` or a semi-opaque white layer)
      rather than a dark colour, to stay consistent with the warm lavender-grey theme.
- [ ] Ensure `id="how-it-works"` matches the Navbar anchor link.

**Relevant Context:**
- Anchor `id="how-it-works"` must match the `href="#how-it-works"` in `Navbar.tsx`.

---

### Sub-Task 6 — ExamplesSection component

**Status:** `[ ] pending`

**Intent:**
Provide clickable sample repository cards so users can try the tool without typing anything.
Separating it keeps `page.tsx` thin and makes it easy to add or change example repos later.

**Expected Outcomes:**
- File `app/components/ExamplesSection.tsx` exists.
- Renders a `<section id="examples">` with a heading "Examples".
- Shows two or three repository cards, each containing: repo name, a one-line description,
  a role tag, and a "Try this →" link/button.
- Clicking a card navigates to `/kit?repo=<encoded-url>&role=...&level=mid-level` (the
  experience default matches the form default of Mid Level). Because this is navigation only
  (an anchor), this component can remain a **Server Component** using `<Link>` tags.
- Example repos (hard-coded): `vercel/next.js` (Frontend), `expressjs/express` (Backend),
  `facebook/react` (Full Stack) — or any three recognisable open-source projects.

**Todo List:**
- [ ] Create `app/components/ExamplesSection.tsx`.
- [ ] Define a static array of example repo objects and map to cards.
- [ ] Use `<Link href="...">` from `next/link` for navigation.
- [ ] Style cards consistently with the overall dark theme (hover states, border, etc.).
- [ ] Ensure `id="examples"` matches the Navbar anchor link.

**Relevant Context:**
- Anchor `id="examples"` must match the `href="#examples"` in `Navbar.tsx`.
- `next/link` is the correct primitive for internal navigation in App Router.

---

### Sub-Task 7 — Page orchestration (app/page.tsx)

**Status:** `[ ] pending`

**Intent:**
Wire all components together in the root page file. The page itself stays as thin as possible
— its only job is to import and sequence the sections.

**Expected Outcomes:**
- `app/page.tsx` imports and renders in order:
  `<Navbar />`, `<HeroSection />`, `<HowItWorksSection />`, `<ExamplesSection />`.
- A `<main>` wrapper with `pt-16` (or the correct value matching the Navbar height) ensures
  content is not hidden behind the fixed Navbar.
- No business logic or state lives in this file.

**Todo List:**
- [ ] Replace the placeholder content in `app/page.tsx` with the component imports.
- [ ] Wrap sections in `<main className="pt-16">` (adjust padding to match Navbar height).
- [ ] Verify all section `id` anchors are present and consistent with Navbar hrefs.

**Relevant Context:**
- [`app/page.tsx`](app/page.tsx) — currently a one-liner placeholder.
- Depends on Sub-Tasks 2–6 being complete.

---

## Component Responsibility Summary

| Component | Type | Responsibility |
|---|---|---|
| `Navbar` | Server | Fixed top bar: logo, nav links, Get Started CTA |
| `HeroSection` | Server | Full-viewport section: background image, corner cards, centre content shell |
| `OnboardingForm` | Client | Controlled form: URL input, role + level dropdowns, submit → navigate |
| `HowItWorksSection` | Server | Three-step explainer with anchored section id |
| `ExamplesSection` | Server | Clickable sample repo cards with pre-filled navigation links |
| `page.tsx` | Server | Thin orchestrator; sequences all sections |

---

## Key Decisions & Constraints

- **No `src` directory.** Components live under `app/components/`, not `src/components/`.
- **Tailwind v4.** Uses `@import "tailwindcss"` syntax; no `tailwind.config` file is needed
  for basic usage.
- **`"use client"` boundary.** Only `OnboardingForm` is a Client Component, minimising the
  client bundle size.
- **hero-bg.png used as CSS background.** Next.js `<Image>` is not appropriate for CSS
  background images; an inline `style` prop is correct.
- **Corner cards are purely decorative.** They are already embedded in the background image
  and require no JSX or interactivity. The hero layout only renders the centre content zone.
- **Smooth scrolling.** Handled globally via CSS (`scroll-behavior: smooth` on `<html>`),
  not via JavaScript, keeping the Navbar a Server Component.
- **Base background colour `#F0EFFF`.** Set on `html` and `body` in `globals.css` so every
  page inherits the warm lavender-grey without per-component repetition.
- **Inter font.** Loaded via `next/font/google` in `app/layout.tsx` and applied as a
  className on `<html>` so it cascades to all text on every page.
- **Form defaults.** Role defaults to "Full Stack", experience level defaults to "Mid Level".
  The form is never blank on first render.
- **Results page is out of scope.** The form and example cards point to a `/kit` route that
  does not exist yet; this is intentional and acceptable for this phase.
