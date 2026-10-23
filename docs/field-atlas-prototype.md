# Field Atlas — working prototype

The selected Field Atlas direction is implemented on the local branch `codex/geometry-of-curiosity-prototype`. It is available at **`/field-atlas/`** for review before replacing the current homepage. The existing homepage and published site remain unchanged.

Current local review URL: [Open the prototype](http://127.0.0.1:62864/field-atlas/). This server is temporary. For a later development session, run the existing `npm run dev` command in this Next.js checkout and open `/field-atlas/`.

## What is implemented

- Warm ivory, ink, cinnabar, and sage; scoped Newsreader display typography and existing Geist body text. Fonts are served with the static site, with no browser-time font CDN requests. The Newsreader license is included.
- A responsive Field Atlas hero, always-reachable section navigation, CV access, saved theme preference, existing command palette, and skip link.
- A real gradient-descent experiment with starting coordinates, step size, Step, Run/Pause, Reset, objective/iteration readouts, validation, domain-exit handling, and a 40-step bound. Runs pause offscreen or when the document is hidden. Reduced-motion Run produces a final static path.
- Three project essays with distinct schematics and the existing personal-contribution/evidence text. The schematics explicitly do not assert measured research results.
- Wenzhounese/Rui’anese input-tools content, access to the original culture dialog, a compact version of the existing gallery, recent notes, complete academic-record links, portrait, contact, and professional/personal links.

The new route has its own stylesheet and display font. The original `src/app/page.tsx`, `globals.css`, `layout.tsx`, resume metadata, all authored Markdown, photos, PDFs, case-study routes, and Pages configuration were not edited.

## Photography preservation

The existing `EditorialPhotography` component is reused rather than duplicated. Its optional `preview` prop limits the homepage selection and removes stickiness from that small preview. With the default prop, the full gallery keeps its prior classes, all 26 photos, filters, handwritten overlay, captions, rounded masonry presentation, and lightbox.

The original photography query route was exercised from the prototype's command palette. Its sampled desktop gallery region matched the freshly captured live gallery in both light and dark themes with **zero changed pixels** across 1,324,800 pixels per theme (1440×1000 viewport, excluding the top 80px). This is a scoped screenshot comparison, not a claim about every possible gallery state.

## Verification

| Check | Result |
| --- | --- |
| Production build and TypeScript | Passed; static prototype route generated; 47 navigation payloads normalized |
| Existing static-export audit | **146/146 passed**, 36 HTML files crawled, zero broken internal references in its crawl |
| Lint | Passed: 0 errors, 3 existing unused-variable warnings in archived travel-dashboard files |
| Behavioral browser checks | **18/18 passed** in installed Edge |
| Final responsive screenshots | 320, 390, 768, 1024, 1440, 1920px; no horizontal overflow or missing images |
| Enlarged HTML text/input sizes | Doubled computed font sizes at 390px and 1440px; no horizontal overflow |
| Light/dark palette | Normal text pairs exceed 4.5:1; control-edge pairs exceed 3:1 in both themes |
| Keyboard | Skip link, native experiment inputs/buttons, gallery Enter/arrows/Escape/focus restoration, command shortcut/navigation |
| Reduced motion | Completed bounded path without animated stepping |
| Preservation | All five original query entries, portfolio search, and an original case-study evidence boundary exercised |
| Browser errors / asset responses | No captured page exceptions or HTTP errors; no runtime external font requests in the behavioral check |
| Diff and content hashes | 315 of 317 original tracked files unchanged. Expected changes: additive README documentation and the optional gallery-preview prop |

The first numerical step was checked independently: starting at `(2,1)` with `α=0.15` gives `(0.65,0.55)` and `f=1.35375`. The large-step example at `α=0.55` stops after two steps when it actually exits the plotted domain.

After the 18 behavior checks, the final CSS refinement adjusted headline size and text reflow. The behavior-bearing TSX sources match the tested hashes; the final build received a fresh six-width layout pass, enlarged-text checks, gallery captures, and numerical interaction smoke check.

[Machine-readable verification](field-atlas-verification.json) records source hashes, individual checks, palette ratios, screenshot paths, and retained logs.

## Review images

- [Desktop opening](C:/Users/Ztang_Yit_Xiaang/.codex/visualizations/2026/10/17/01a147d4-4b22-7b20-951f-792d9f388d0e/field-atlas-implemented-1440-top.png)
- [Full desktop](C:/Users/Ztang_Yit_Xiaang/.codex/visualizations/2026/10/17/01a147d4-4b22-7b20-951f-792d9f388d0e/field-atlas-implemented-1440.png)
- [Full mobile](C:/Users/Ztang_Yit_Xiaang/.codex/visualizations/2026/10/17/01a147d4-4b22-7b20-951f-792d9f388d0e/field-atlas-implemented-390.png)
- [Dark theme](C:/Users/Ztang_Yit_Xiaang/.codex/visualizations/2026/10/17/01a147d4-4b22-7b20-951f-792d9f388d0e/field-atlas-implemented-desktop-dark.png)

## Scope and remaining gate

This is a working isolated homepage prototype, not a production-homepage replacement. No commit, push, deployment, or content migration was performed. The original site's full academic and photography views remain available.

The checks are bounded. A full assistive-technology/WCAG conformance audit and native operating-system browser-zoom session were not performed; 320px reflow and explicit doubled HTML text/input sizes were checked. Research experiments and external repository claims were not revalidated during this design implementation.

Next: review this working prototype, then approve integrating the selected composition into the default homepage. Later case-study presentation changes and deployment remain separate gates.
