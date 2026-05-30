# Changelog — Abdennour's Portfolio

All notable changes made during the opencode session.

---

## Mobile & Responsive

- **Hero title spacing** — reduced `padding-top` from `8rem` to `5rem` on mobile so the headline sits closer to the nav bar (`css/style.css`)
- **Skills cards → horizontal row** — at the 480px breakpoint, `.service-card` now uses `flex-direction: row`, hides the large `.service-num`, places the icon on the left with text on the right, and gets rounded corners matching the certification card style (`css/style.css`)
- **Timeline card spacing** — mobile cards now have larger title `margin-bottom`, smaller font sizes for title/description, `display: block` on year for proper stacking, and tighter horizontal padding (`css/style.css`)

---

## New Features (8)

### 1. Modal Focus Trap + ARIA
- **HTML** (`index.html`): Added `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"` to `#project-modal`; added `tabindex="-1"` to `.modal-container`
- **JS** (`script.js`): Implemented `getFocusableElements()`, `trapFocus()` (Tab/Shift+Tab cycling), stores `lastFocusedElement` on open and restores focus on close

### 2. Skill Proficiency Dots
- **HTML** (`index.html`): Added a 5-dot row to each `.service-card` showing relative proficiency (4–5 dots filled per skill)
- **CSS** (`style.css`): Gold filled dots with hover glow, hidden number on mobile, dot size adjustment for small screens

### 3. Section Progress Indicator
*This feature was added in a previous PR, but has since been removed. The dot-nav and IntersectionObserver-based section progress indicator are no longer present in the codebase.*

### 4. Theme Auto-Detect
- **JS** (`script.js`): On first visit (no saved theme), checks `prefers-color-scheme: light` and applies light mode automatically

### 5. Share Button per Project
- **HTML** (`index.html`): Added a "Share" button next to "View Live Project" in the modal
- **JS** (`script.js`): Uses the Web Share API on supported devices; falls back to copying the project URL to clipboard with a "Copied!" confirmation

### 6. Project Filter URL State
- **JS** (`script.js`): Refactored the filter logic into a reusable `applyFilter()` function; clicking a filter now sets `#filter=<name>` via `history.replaceState`; loading a page with `#filter=web` restores that filter automatically

### 7. Live GitHub Pinned Repos
- **JS** (`script.js`): Fetches the 3 most recently updated repos from `api.github.com/users/Abdnour0/repos`; updates the "Explore More on GitHub" card with the latest repo name, truncated description, and direct link

### 8. Testimonials Carousel
- **HTML** (`index.html`): New "Kind Words" section with 3 testimonial cards in a scroll-snap track and dot navigation
- **CSS** (`style.css`): Snap-scroll track, gold-left-border cards, italic quote text, gold author attribution, dot indicators
- **JS** (`script.js`): Auto-advances every 5s, pauses on hover, dot click navigation, manual scroll tracking

---

## Bug Fixes

| Issue | Fix |
|-------|-----|
| Typed.js stops after navigating away and pressing Back | Added `pageshow` event listener to re-init Typed.js + refresh ScrollTrigger (bfcache fix) |
| Filter hash matching `#contact` etc. | Filter hash now requires exact `#filter=` prefix (`js/script.js`) |
| Modal `trapFocus` listener duplicated on re-open | Removes listener before re-adding (`js/script.js`) |
| Share button handler not cleaned up | Uses `addEventListener`/`removeEventListener` instead of `.onclick` (`js/script.js`) |

| Skip link didn't move focus | Added `tabindex="-1"` to `<main>`, excluded `.skip-link` from smooth anchor handler (`index.html` + `script.js`) |
| GSAP crash if library fails to load | Added fallback mock for `gsap` and `ScrollTrigger` (`script.js`) |
| Cursor errors on touch devices | Touch detection refined, cursor elements removed on touch (`script.js`) |
| Mobile nav not closing when tapping a link | Added click-to-close on mobile nav links (`script.js`) |

---

## Accessibility

- **Skip link** — "Skip to content" link at the very top of the page, visible on focus
- **Modal ARIA** — `role="dialog"`, `aria-modal`, `aria-labelledby`, focus trapping inside modal

- **Tabindex** — `<main id="main-content" tabindex="-1">` for skip link focus
- **GSAP reduced motion** — `prefers-reduced-motion` disables all CSS animations; GSAP reveals skip on low-end devices

---

## Files Modified

| File | Changes |
|------|---------|
| `index.html` | Skip link, `<main>` wrapper, modal ARIA, section nav, share button, proficiency dots, testimonials section |
| `css/style.css` | ~130 lines added: skip link, section nav, proficiency dots, testimonials carousel, mobile overrides for hero/timeline/skills |
| `js/script.js` | ~250 lines changed: modal focus trap, share, filter URL state, section nav, testimonials, GitHub fetch, theme auto-detect, bfcache fix, smooth anchor skip-link exception |
