# Nizam’s Chronicle

A front-end project that turns a generic responsive-website template into a small tourism guide for Hyderabad. Nine landmarks, real opening hours and ticket prices, a filterable "Explore" grid, a photo gallery, and a handful of travel tips — no framework, no build step, just HTML/CSS/JS.

**Live pages:** `index.html` is the homepage. Everything else is linked from the nav.

## Why this exists

I wanted a portfolio piece that wasn't another to-do app or weather widget, and I kept running into travel blog posts about Hyderabad that were either outdated or clearly written without anyone actually checking the ticket prices. So this project does two things at once: it's a front-end exercise (grid layouts, a modal system, a gallery lightbox, scroll animations, all built by hand), and it's an attempt at a genuinely useful one-page guide.

The opening hours, entry fees, and locations for each landmark were checked against official/tourism sources before writing them into `js/main.js`. They're accurate as of when I wrote this, but ticket prices at Indian monuments change more often than you'd expect, so treat the numbers as a solid starting point rather than gospel — always double check before you travel.

## What's inside

```text
├── index.html          → Home: hero, featured destinations, full Explore grid, stats, gallery, travel tips
├── explore.html         → Dedicated "Explore Hyderabad" directory with category filters
├── about.html           → About the guide, why it exists, how it's kept accurate
├── contact.html          → Feedback / correction form
├── login.html            → "Save your itinerary" sign-in screen (front-end only, no backend)
├── thankyou.html         → Generic confirmation page for all three forms
├── css/
│   ├── style.css          → Design tokens, reset, header/nav, footer
│   ├── grid-layouts.css   → Hero, page sections, responsive grid rules
│   └── components.css     → Buttons, cards, forms, modal, lightbox
└── js/
    └── main.js            → Attraction data + modal, filters, lightbox, scroll reveal, stat counters
```

I kept the three-file CSS split from the original template (base styles / layout / components) rather than merging everything into one file — it made it much easier to find things while the redesign was in progress, and it's a pattern I'd reuse.

## Features

- **9 landmarks, one data source.** Every attraction lives once in `ATTRACTIONS` inside `main.js`. The cards on both `index.html` and `explore.html` just reference an ID (`data-attraction="charminar"`), and clicking "Learn More" builds the modal from that object. Change a ticket price once, it updates everywhere.
- **Category filtering.** Heritage & Forts / Palaces & Museums / Leisure & Family — implemented with plain `data-category` attributes and a click handler, no library.
- **Gallery lightbox** for the photo section, built the same way as the modal (one overlay, populated on click).
- **Scroll-triggered reveal animations** via `IntersectionObserver`, with `prefers-reduced-motion` respected throughout.
- **Animated stat counters** that count up once when they enter the viewport, not on every scroll past them.
- **No JS required for the mobile nav** — it's a checkbox + `:checked` selector, so the menu still works if JavaScript fails to load.

## Design notes

The visual direction is built around things Hyderabad is actually known for rather than a generic "travel site" look: pearls (the city's namesake export) for the warm off-white background, Deccan granite for the body text color, the peacock-teal of Qutb Shahi-era tilework as the primary accent, and the antique brass of Nizam-era jewellery for highlights. The attraction cards are styled a bit like the small bronze plaques you see outside monuments — a monospaced info strip for hours/fees, separated from the description by a dashed rule.

Fonts are Cormorant Garamond for headings, Work Sans for body copy, and IBM Plex Mono for the plaque-style data (hours, fees, category labels).

Images are pulled from Wikimedia Commons and hotlinked directly (same approach the original template used with Unsplash) — no images are stored in this repo, which keeps it lightweight.

## Known limitations

- The sign-in and contact forms don't actually submit anywhere — they redirect to `thankyou.html` for demonstration purposes. There's no backend.
- Ticket prices and timings should be re-verified periodically; I've noted the source-checking date implicitly by when this was built, but I haven't set up any kind of automated check.
- Tested in current Chrome, Firefox, and Safari. Not tested against older browsers — it uses `aspect-ratio`, CSS `clamp()`, and `backdrop-filter`, which won't degrade gracefully everywhere.

## Running it locally

No build step. Clone or download the folder and open `index.html` in a browser, or serve it with anything static:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
