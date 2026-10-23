# Creative Research Portfolio — current-site audit

Audited 2026-10-16 (America/Chicago). Scope: current source, local production export, representative interactions, desktop/mobile screenshots. Deliverable: audit and directions only. Website source/content/dependencies/configuration and production design were not edited.

## Finding

The site has a credible foundation: explicit personal contributions and evidence limits, durable case-study links, useful original photography, and meaningful language-technology work. Expose those connections through a continuous editorial homepage while retaining complete collection views.

Recommend **Field Atlas**, the first direction in [design.md](../design.md). Warm paper, serif hierarchy, inspectable contours, and photographic spreads match the requested 70/30 balance.

## Checkout and baseline

| Item | Evidence |
| --- | --- |
| Supplied working directory | `E:/Yit_Xiaang_Website/ztang-yit-xiaang.github.io` is the older Jekyll/Academic Pages checkout. Existing modified Gemfile/layout/about/CSS/CV/package and untracked cover image were left intact. |
| Requested app | `E:/Yit_Xiaang_Website/ztang-yit-xiaang.github.io-live` |
| Remote | `https://github.com/Ztang-Yit-Xiaang/ztang-yit-xiaang.github.io.git` |
| Branch | `codex/editorial-photography` |
| Inspected commit | `df6c99db15c0655e58b5c414104bf71da8b64589` |
| Initial app state | Clean before proposal documents |
| Stack | Next.js 16.2.10, React/React DOM 19.2.4, Tailwind CSS v4, TypeScript, KaTeX/marked, Base UI-backed components |
| Live homepage | Browser HTTP 200; title/research headline match inspected app. This does not prove every deployed asset matches local source. |

Hashes for all **317 tracked files** were captured before proposal documents. See [machine-readable baseline](redesign-baseline.json) for counts, checks, contrast calculations, source receipt location, and screenshots.

## Inspection coverage

Read all seven requested areas: homepage, global styles, project portfolio, editorial photography, live status, resume data, case-study route renderer and all 11 case-study Markdown files.

Also inspected layout/metadata, portfolio page, note renderer, command palette/dialog components, Markdown/KaTeX processing, manifest/README, Next configuration, export normalization/audit, Pages workflow, and installed Next.js static-export guide. Blog metadata and every note filename were inventoried; underlying research experiments were not rerun.

## Content preservation inventory

| Collection | Count | Source / rule |
| --- | ---: | --- |
| Projects/case studies | 11 | `src/data/resume.ts:183`, `src/content/portfolio/`; preserve slug, contribution, evidence, status, repository, limits |
| Notes | 11 | `src/data/resume.ts:422`, `src/content/blog/`; preserve title/date/summary/Markdown/link |
| Photographs | 26 | `src/data/resume.ts:501`; 24 Places, 2 Portraits; preserve references, captions, dates, location, crop metadata/full image |
| Publications/report | 3 | `src/data/resume.ts:365`; two publication records and explicitly non-peer-reviewed CUHK report/poster |
| Education/experience/teaching | 2 / 8 / 3 | Keep full chronology, supervisors, roles, attribution |
| PDFs | 6 | `public/files/`; keep all filenames/paths, including CV and filenames with spaces |
| Archived demonstrations | Existing HTML/maps/dashboard | Keep `/images/*` destinations and archive context |

These are current authored site facts, not newly independently verified research/biography claims. This audit did not establish new results, credentials, upstream evidence, or publication status.

## Strengths and reusable elements

| Element | Value to retain | Source |
| --- | --- | --- |
| Evidence-aware data | Contribution/evidence/status/repository labels already support credible storytelling. Reuse the existing schema. | `src/data/resume.ts:17` |
| Editorial portfolio intro | Serif emphasis and method/evidence margin note are a useful seed for the new direction. | `globals.css:286`, `projects-portfolio.tsx:28` |
| Search/categories | Native pressed-state buttons, labeled search, polite result count, empty-state reset. Sample search/reset state worked. | `projects-portfolio.tsx:7` |
| Photography | Original images, asymmetric sticky-feature/masonry layout, bilingual captions, responsive sizes, categories. Strongest current visual storytelling. | `editorial-photography.tsx:15`, `:82` |
| Lightbox | Full-image viewing, arrows/Escape/named dialog, explicit focus restoration. Sampled journey passed. | `editorial-photography.tsx:97` |
| Language/culture | Identity marker, Rime case study, meaningful dialog, food surprise. Bring substantive language work into the narrative. | `page.tsx:353`, `wenzhounese-input-method.md` |
| Command palette | Ctrl/Cmd+K, catalog, actions, keyboard navigation, modal focus handling/restoration. Ctrl+K opening checked. | `command-menu.tsx:248` |
| Academic access | CV, contact/professional links, timelines, publications/report, BibTeX copy. | `page.tsx:294`, `:573` |
| Reduced motion | Global animation/transition suppression plus photography transform suppression. Sampled ping computed to 0.01ms under reduce. | `globals.css:267` |
| Static safeguards | Directory indexes, static params, asset checks, Windows payload normalization. Current build/export pass. | `next.config.ts`, export scripts, Pages workflow |

Component paths above are under `src/components/`; page/styles under `src/app/`; case-study Markdown under `src/content/portfolio/`.

## Problems and implications

| Priority | Observation | Source / implication |
| --- | --- | --- |
| High | Identity is fragmented into tabs | `page.tsx:269,339,662,667`: default profile has two project features; photography/notes require a different view. Add a connected introduction; retain full views. |
| High | First impression differs from requested direction | `layout.tsx:58` defaults dark unless light stored; `globals.css:53` has neutral white/black tokens with cool navy overrides. Homepage uses heavy Geist; serif is limited to portfolio. Propose warm canvas and dedicated serif hierarchy. |
| High | Mobile discovery comes late | At 390×844 the headline/bio/actions occupy the screen and portrait only begins. Desktop section nav is hidden under md; mobile tabs are below hero/features (`page.tsx:342`). Put section access in the mobile header and simplify hero. |
| High | Page semantics need improvement | No skip link found. Case/note roots are divs (`portfolio/[slug]/page.tsx:71`, `blog/[slug]/page.tsx:74`); sampled case has no main. Photo query view has no h1. Retain working interactions while fixing structure. |
| Medium | Repeated text containers dominate projects | Uniform two-column catalog (`globals.css:302`); homepage selects only `slice(0,2)`. Catalog behavior is valuable; feature three essays with bespoke explanatory figures. |
| Medium | Case studies lack visual explanations | Shared category/date/overview/article shell is clear but mostly text. Travel has an actual archived preview; math needs labeled schematics, not invented plots. |
| Medium | Accent vocabulary drifts | Name cinnabar-to-indigo gradient (`page.tsx:208`); status/commands add purple, indigo, cyan, emerald, amber. Use warm neutrals/cinnabar and restrained sage without losing status meanings. |
| Medium | Live-status prominence outweighs information | `live-status.tsx:6`: pill/ping/seconds clock precedes headline. Preserve availability/time zone but propose quieter placement. Availability is authored, not measured online presence. |
| Medium | Shared styling makes broad replacement risky | `globals.css:137` onward supports case/dashboard classes; portfolio has another token family. Scope prototype styles before approved global edits. |
| Review | Small metadata/control typography | Mobile tabs 10px; captions/skills around 10–12px. Measure rendered contrast and target size; token inspection is not a full accessibility audit. |
| Review | HTML-only math | `src/lib/markdown.ts:100,113` requests KaTeX HTML output. Review accessible math exposure when introducing landscape equations. |
| Review | Stale metadata permalink | Sensor-array Markdown declares `/portfolio/magnetic-sensor-visualization`; current data/filename generate `/portfolio/magnetic-sensor-array-visualization/`. Renderer uses data. Preserve effective route; any alias is a later scoped decision. |

No horizontal overflow was observed in the sampled views. A missing semantic landmark or late mobile navigation should not be described as a broken static export.

## Research boundaries to retain

- Torch-OSQP: dense reference; open float64-polishing numerical acceptance/release; local/public snapshot distinction; QP solve is not an automatically differentiable layer.
- Travel: prototype, incomplete comparison, independent evaluation, archived demos.
- Hutch++: explicit query accounting, archived artifacts, pilot cost/uncertainty; no universal improvement. No campaign rerun here.
- Multi-Task Optimizer: reproduction planning/private collaborator repository; no new completed training/benchmark gain.
- Leverage scores/TurboQuant: local notebook/related repository link; TurboQuant is a reading direction in this site content.
- PDEBench-Lang/FER: team attribution and stated evaluation role; hypotheses are not measured improvements.
- Sparse PCA: exploratory analysis, not clinical prediction. CUHK report/poster is not relabeled peer-reviewed.

## Current verification

| Check | Result | Limit |
| --- | --- | --- |
| `npm run build` | Passed; production compilation, TypeScript, static generation; 46 navigation payloads normalized | Current baseline, not a redesigned-site pass |
| `node scripts/verify-static-export.mjs` | **146/146 passed**; zero broken internal references in its crawl; 35 HTML files | Does not check external sites or complete accessibility/interactions |
| `npm run lint` | **0 errors, 3 warnings**, exit 0 | Existing unused variables in archived dashboard.js/data_loader.js/map_controls.js |
| Browser layouts | Home 1440/390; photography and Torch-OSQP case 1440/390; portfolio 1440; no sampled overflow | Not full breakpoint/zoom/browser matrix |
| Project search | “trace” gives one project; nonsense query shows empty state | All category journeys not executed |
| Lightbox | ArrowRight Blue Ridge → Dalian; Escape closes; trigger focus restored | Sampled two-image journey |
| Command menu | Ctrl+K opens named dialog | Full catalog/clipboard/focus-cycle journeys not executed |
| Reduced motion | Ping duration becomes `1e-05s` under reduce | Not proof of every CSS/JS effect |
| Runtime | No captured page JavaScript exceptions | Request log retains ERR_ABORTED entries during navigation/prefetch; not a zero-failed-request claim |
| Live homepage | HTTP 200, matching title/headline | Other deployed routes and current CI not verified |

Baseline images show the current site, not the proposed redesign:

- [Desktop light homepage](C:/Users/Ztang_Yit_Xiaang/.codex/visualizations/2026/10/17/01a147d4-4b22-7b20-951f-792d9f388d0e/baseline-home-desktop-light.png)
- [Mobile light homepage](C:/Users/Ztang_Yit_Xiaang/.codex/visualizations/2026/10/17/01a147d4-4b22-7b20-951f-792d9f388d0e/baseline-home-mobile-light.png)
- [Desktop photography](C:/Users/Ztang_Yit_Xiaang/.codex/visualizations/2026/10/17/01a147d4-4b22-7b20-951f-792d9f388d0e/baseline-photos-desktop-light.png)
- [Mobile case study](C:/Users/Ztang_Yit_Xiaang/.codex/visualizations/2026/10/17/01a147d4-4b22-7b20-951f-792d9f388d0e/baseline-case-mobile-light.png)

Raw logs, browser receipt, 317-file hash inventory, full-page captures, and other screenshots are in `C:/Users/Ztang_Yit_Xiaang/.codex/visualizations/2026/10/17/01a147d4-4b22-7b20-951f-792d9f388d0e/`. Screenshots used the local production export and installed Edge. The in-app browser could not start because of an environment sandbox error; no extra browser or hosting service was installed.

## Next gate

Approve a direction, then create a separate-branch homepage prototype. Retain export/trailing-slash/unoptimized-image settings, static params, Windows payload normalization, Pages configuration guard, all existing routes/assets/query links, and authored evidence.

Prototype and later screenshot refinement have not started, following the user's approval boundary. No branch change, commit, push, or deployment occurred. Build/export success does not establish research acceptance, full accessibility, or publication/release readiness.


## 2026-10-17 revision — person-first, multi-page audit

**Source identity verified.** The open `http://127.0.0.1:62864/field-atlas/` preview corresponds to `codex/geometry-of-curiosity-prototype` in the separate `ztang-yit-xiaang.github.io-live` Next.js checkout. Its base commit is `df6c99db15c0655e58b5c414104bf71da8b64589`, with uncommitted prototype files. All 12 current source hashes matched the preceding screenshot receipt. The older Jekyll checkout is not the design implementation target.

### Strengths to keep

The warm Newsreader/Geist pairing, restrained cinnabar/sage palette, explicit project evidence and limitations, case-study Markdown/math, full-image gallery, categorized photography, command palette, theme persistence, live Minneapolis clock, BibTeX copying, PDFs, static-export normalization and GitHub Pages deployment safeguards remain valuable. Wenzhounese phrases and the food easter egg are part of the person’s identity, not incidental decoration.

### Confirmed hierarchy and route problems

| Finding | Current evidence | Design correction |
| --- | --- | --- |
| Optimizer dominates identity | Hero headline is “The geometry of curiosity”; OptimizationLandscape fills the second hero column | Put the person’s name and real portrait in both first viewports; relocate the experiment |
| Portrait arrives much too late | 1440 × 1000 measurement: 88px square at y≈4383px | Proposed 592 × 622px frame at y=151px |
| Homepage reproduces too much content | Current desktop page height 4839px; full project essays, gallery preview, notes and CV all stacked | Four curated groups, fuller records on dedicated pages |
| Primary navigation is not multi-page | Header uses #work, #beyond, #notes, #academic | Six real destinations with normal history |
| Photography lacks its own page | Browse link leads to /?tab=photography | New /photography/ reuses full default gallery |
| Culture escapes into old layout | “Culture & language” leads to /?tab=about#language-culture-heading | New /beyond/ contains the culture story, dialog and food behavior |
| Composition underuses desktop width | Previous container/padding restricts essential content while side areas are empty | Broader 1344px usable composition at 1440px, with culture/evidence marginal content |
| Personal voice is secondary | Portrait/identity belongs to near-footer Academic block | Brief human introduction and alias near the opening photograph |

### Preservation details checked

- `resumeData.avatar` is `/profile.jpg`; inspected the original real portrait before selecting the CSS crop.
- All 26 photographs remain authoritative in resumeData, including titles, categories, dates, locations, captions, thumbnails, original images and featured crop. Keep the large featured frame, rounded masonry images, Caveat Blue Ridge overlay and gradient captions.
- Existing culture trigger chooses its food pool from the **visitor’s local hour**: day 06:00–17:59, night otherwise. It emits ten particles per trigger, animates for about 1.8s and removes the burst after 2.5s.
- The three phrase entries and existing familiar saying are retained verbatim in the culture source. “你眙” is literal “you look”, not a greeting.
- Current portfolio and blog detail routes read existing Markdown, generate static parameters and are compatible with static export. Their URLs need not be changed to create dedicated top-level pages.
- Full gallery/project interactions and final production routing will need regression tests when implementation begins. Existing earlier build results do not validate routes that have not been built.

### Revision deliverables and boundary

`design.md` is now the canonical person-first revision. `docs/personal-world-sitemap.md` records proposed routes and old-entry mapping. Separate desktop/mobile visual-artboard screenshots and a bounded verification receipt demonstrate the revised homepage composition.

Application source is unchanged in this revision. The user explicitly requested **“Review the prototypes before implementing the full redesign.”** Full page implementation, final production build, internal-link/history audit and release remain subsequent work. No commit, push or deployment is part of this revision.


## 2026-10-17 follow-up — visible academic basics

The user supplied an image of the existing Education, Research Experience, Teaching and Highlights & Milestones content and requested basic serious background on the homepage. The revised visual variant adds a source-faithful academic overview after the unchanged person-first hero. It shows UMN degree/minor/GPA, both current research assistant appointments with the correct supervisors, CSCI 2081 teaching semesters, and two brief earlier experience entries. The desktop draft remains approximately 3.7 reference screens.

Important preservation finding: the four existing Highlights & Milestones entries are hardcoded in src/app/page.tsx (approximately lines 523–562), outside resumeData. Keep all four in the full Academic page, including the planner-supervisor milestone, without turning supervision into a project outcome claim. Both source records and their attribution take precedence over any ambiguous clipping or mixed text in the screenshot. No application source or running preview was changed for this visual refinement.


## 2026-10-18 — match the supplied academic composition

The user explicitly requested the screenshot layout. The three-column academic summary is superseded by the reference structure: culture banner above, education/teaching on the left, research timeline on the right, and milestones across the bottom. Both a compact homepage variant and an expanded academic-region visual study were rendered. All 2 education, 3 teaching, 8 experience and 4 milestone entries in the expanded version match existing source text, including bullets, dates, supervisors and the transferred-out qualification. Twelve layout captures across two variants and six widths have no horizontal overflow, missing images or runtime errors. The desktop homepage remains 3988px tall at 1440 × 1000; this measurement does not imply an application build or working new routes. Application source hashes remain unchanged.


## 2026-10-18 — fill the unused research-column space

Measured the previous 1440px preview: the research column was about 134px shorter than education/teaching. Added the next chronological source entry, Independent Study — Sketching & Sampling Algorithms, with its original dates, supervisor and first source bullet. Three entries fit beside the left column; the full homepage stays 3988px high. The All research experience link retains /academic/#research; a temporary prototype alias demonstrated the target anchor, all eight full records and browser Back. The remaining five records are preserved rather than squeezed into the homepage. Production application code and routing remain unchanged.


## 2026-10-18 — consolidate the teaching summary

At the user’s request, the homepage prototype now combines CSCI 2081 teaching into one Fall 2025 – Fall 2026 entry. The full Academic record retains all three semester entries and descriptions. Existing rendering checks confirm one homepage teaching card, the requested date range, preserved detailed source content, no overflow at six widths, and unchanged application source hashes. The 1440px homepage is 3946px high. This is a visual-prototype update, not an application migration.


## 2026-10-18 — combine identity and academic overview

The user requested that the two pictured screens become one page. The visual prototype now places identity/portrait and basic academic content in one shared opening section, rather than a full-height hero followed by another academic panel. The whole opening fits inside the 1440 × 1000 desktop reference viewport. Mobile stacks the same content naturally; the first viewport retains identity and portrait. The teaching date range, three research entries, all four milestones and the full eight-entry record link remain. The source hashes and content checks are unchanged, and six widths render without overflow or missing images. This is a composition prototype, not a completed application migration.
