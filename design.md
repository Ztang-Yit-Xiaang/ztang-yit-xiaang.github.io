# Field Atlas — A Personal World
Revision: 2026-10-20. Status: **approved design implemented locally; build, export and bounded browser/accessibility checks verified; not published**.

This replaces the earlier optimizer-led Field Atlas proposal. The original is retained in `docs/field-atlas-v1-design.md`. The user selected Field Atlas, accepted the combined identity/academic opening with “This looks way better,” then authorized website changes. The reviewed composition is now implemented on the existing review branch.

## Objective and hierarchy

The subject is **Ztang Yit Xiaang**. Visitors should recognize a person, see a credible introduction, and choose a part of his world. The order is identity → information architecture → visual storytelling → aesthetic polish → experimental interactions.

Keep the 70% warm editorial / 30% technical experimentation direction. “The Geometry of Curiosity” becomes the connective idea and quiet colophon, rather than the first-screen headline. A real portrait and the person’s name replace the optimization landscape as the homepage’s primary visual.

## Pre-redesign audit snapshot — 2026-10-18

- Active Next.js checkout: `E:\Yit_Xiaang_Website\ztang-yit-xiaang.github.io-live`. The similarly named checkout without `-live` is the separate older Jekyll site.
- Current branch: `codex/geometry-of-curiosity-prototype`; base commit: `df6c99db15c0655e58b5c414104bf71da8b64589`. The preview includes uncommitted files. HEAD alone does not identify its appearance.
- Current preview: `http://127.0.0.1:62864/field-atlas/`. All 12 files in the preceding screenshot source receipt matched their current SHA-256 values when inspected.
- Measured at 1440 × 1000: current page is 4839px high; its only portrait is 88 × 88px, starting approximately 4383px down the page. Header destinations are same-page anchors.
- Photography is still reached through `/?tab=photography`; Beyond links to `/?tab=about#language-culture-heading`. There are no dedicated Photography, Beyond, Notes index, or Academic pages.
- Keep Next.js 16.2.10, React 19.2.4, Tailwind CSS v4, static export, trailing slashes, existing build normalization and deployment safeguards.
- Audit sources: `src/app/page.tsx`, `globals.css`, `field-atlas/*`, `components/projects-portfolio.tsx`, `editorial-photography.tsx`, `live-status.tsx`, `data/resume.ts`, portfolio/blog route renderers, Markdown content, and export configuration. See `docs/redesign-audit.md` for the baseline and revision findings.

## Scope and content authority

Use `src/data/resume.ts` and existing Markdown as content authorities. The four existing Highlights & Milestones entries were hardcoded in the original homepage; they are now preserved in `src/components/academic-record.tsx`. Preserve all 11 project entries, existing case-study and note permalinks, photography originals and metadata, education, experience, teaching, publications/report distinctions, PDF files, repository links, archived demos, and contact/social links.

The homepage can shorten presentation without deleting underlying content. Its unified opening contains the person and a reference-style academic preview, followed by three selected project introductions, two photographs on desktop / one on mobile, a brief personal-culture invitation, two recent notes, and contact access. Full evidence, limitations and technical details remain on project pages.

Copy in the prototype is editorial wording of existing facts, for review. Do not add invented locations to the portrait, awards, interests, travel anecdotes, research results, quotes, or a claim that prototypes are deployed services. The portrait caption is editorial, not a claimed date or location. “Available for Research & Collaboration” and the Minneapolis clock are existing content and interactions to retain in the final shared footer.

Research boundaries remain explicit:
- Torch-OSQP: a working dense reference route; broader numerical acceptance and release remain open.
- Travel planner: implemented planning/evaluation components; full research comparison remains incomplete.
- Adaptive Hutch++: source, diagnostic tests and archived benchmark tables; do not turn archived evidence into freshly rerun measurements or universal performance claims.
- Keep private-collaboration, reading-direction, team-contribution and report-vs-publication qualifications throughout the remaining work.

## Sitemap and navigation

See `docs/personal-world-sitemap.md` for the full route map and old-entry compatibility table.

Primary destinations: Home `/`, Work `/work/`, Photography `/photography/`, Beyond `/beyond/`, Notes `/notes/`, Academic / CV `/academic/`. The CV download remains `/files/cv.pdf`.

Existing `/portfolio/[slug]/`, `/blog/[slug]/` and archive/demo URLs stay valid. `/portfolio/` remains a functional project collection entry using the same new shell. Do not rename case-study URLs simply to make the sitemap look uniform.

Use Next Link for normal page navigation and native anchors for PDFs, email and external destinations. Each primary destination must export a directory index and work on a direct load, refresh and browser Back/Forward. Homepage navigation must point to real page routes, rather than changing tabs or scrolling between sections. Highlight the active page with `aria-current`.

Use a shared header/footer within the existing app structure. A small route-aware navigation component is justified because current headers are repeated and bind navigation to homepage tab state. Reuse the existing command menu, but migrate its destinations to the new routes. Preserve search, saved theme and keyboard behavior. No router replacement, page-builder, CMS, animation framework or new design dependency is needed.

Legacy query entry points resolve to the corresponding new pages within the same visual system after implementation. This is a compatibility boundary for existing incoming links; it must not be used for new internal navigation. Static GitHub Pages cannot depend on server redirects. Preserve and translate relevant old hashes, including culture and CV.

## Visual tokens

Use a scoped system first, then promote to shared variables only after visual approval. The user’s permission to use subtle warm gradients takes precedence over the previous no-gradient art direction.

| Role | Light | Dark target | Usage |
| --- | --- | --- | --- |
| Paper | #F7F2E9 | #20221E | Page ground |
| Ink | #272820 | #F4EDE1 | Primary text |
| Muted | #656056 | #C0B7A7 | Body annotations, captions |
| Cinnabar | #A54230 | #E79A80 | Identity emphasis, links, focus |
| Sage | #526451 | #B2C3A4 | Secondary research detail, status |
| Rule | #D6CCBD | #686456 | Quiet dividers |
| Warm wash | #EEE6D9 | #2C2E27 | Subtle section transitions |

Light and dark themes are implemented. Opaque text contrast and photographic overlays are checked separately against the actual build; see the implementation receipt.

Use a faint terracotta glow near the lower left of the hero, and a pale ochre glow toward the photograph. They support the warmth of the real image; they do not animate or become the focal point. No purple gradients, glass dashboards, fake grain, large abstract blobs, generic icon-card grids or gratuitous 3D.

Spacing scale: 4, 8, 12, 16, 20, 24, 32, 48, 64, 80, 96px. Major section spacing can vary optically; do not force every block into a full-height section.

The portrait has a mostly rectangular crop with one soft corner. Photography retains the established approximately 26px rounded frames. Project entries use open rows and rules, rather than uniform cards. No heavy shadows.

## Typography

- Display: existing licensed **Newsreader**, regular and italic. The person’s name is the largest text; approximately 78px at 1440px, 86px on wide screens, and 57–68px on small phones. Tight optical tracking, two intentional lines. Do not make the concept slogan larger than the name.
- Body/navigation: existing **Geist**, 16–18px desktop, 14–16px mobile with 1.6–1.75 line height. Smaller research summaries are secondary content, not substitutes for a legible introduction.
- Technical labels: existing **Geist Mono**, generally 10–12px. Keep uppercase metadata sparse.
- Photography: existing **Caveat** only where already meaningful, especially “Blue Ridge”.
- Chinese: preserve exact traditional characters and use an appropriate system CJK fallback. Do not synthesize translations or phonetic spellings.
- Keep paragraph lines near 55–70 characters even while the overall composition uses more desktop width. Wide layouts do not mean wide prose columns.

## Homepage composition

Four major content groups, approximately 3–4 desktop screens at 1440 × 1000, including navigation and footer.

### 1. One opening view: the person and academic overview

User refinement, 2026-10-18: the portrait/identity and academic overview must feel like one page, rather than two separate screens. Put them in one homepage section with a continuous warm background and a shared asymmetric grid. Remove the old full-height hero, folio divider and the separate academic block before Work.

At 1440px, use the existing 1344px composition width. The left panel contains the name, alias, real portrait, personal introduction, Work/CV actions and quiet Photography/Beyond links. The larger right panel contains the culture banner, Education/Teaching sidebar, Research Experience timeline and full-width milestones below its own two-column academic grid. Keep both panels aligned at their top.

The name remains the largest text (approximately 78px at 1440px). Use the unchanged public/profile.jpg photograph, crop with CSS only, and preserve the person, face and camera. Current portrait frame is approximately 458 × 345px. The entire opening ends at y≈938px in the 1440 × 1000 reference viewport, so identity and the basic academic record are visible together.

Retain the natural source-faithful introduction. The culture banner is part of the same opening and leads to /beyond/#language-culture, inside the planned new visual system. Do not introduce a new route, tab, full-screen section or large background change between the person and the basic academic record.

The academic overview retains one current education entry, one CSCI 2081 teaching summary dated Fall 2025 – Fall 2026, three research entries with the correct supervisor/date and one original source bullet each, and all four existing milestone entries. All research experience continues to /academic/#research, where all eight records remain available. The complete Academic record retains both education entries, three detailed teaching semester records, publications/report distinctions and existing PDF/BibTeX access.

At tablet widths, keep readable text and allow the academic subcolumns to stack within the same opening. On phones, stack the person panel first, then the academic overview on the same continuous page. Name, portrait, brief introduction and Work/CV access remain visible immediately. Do not attempt to force the entire academic record into a phone viewport or clip content at enlarged text sizes.

### 2. Selected work

The next homepage section introduces Torch-OSQP, the context-aware travel planner and Adaptive Hutch++. Keep concise project copy, actual status, schematic diagrams and case-study links; full contributions, evidence and limitations remain on the Work collection and original project permalinks. Label illustrative diagrams clearly and preserve every existing evidence boundary.

The optimization playground remains a quiet link beneath the selected work, with its proposed home at /work/optimization-playground/. Preserve its existing controls and the explicit explanation that the illustration is not the PyGRANSO solver or a measured benchmark.

Latest visual-stage receipt: docs/unified-opening-prototype-verification.json. The 1440px homepage is 3114px high (about 3.1 screens). Earlier prototypes are retained for comparison. This revision changes separate visual-artboard files and documentation only; the application source and production routes remain unchanged.

### 3. A personal visual spread

Pair two real photographs with a culture story in the right-hand column. Homepage photo previews lead to the dedicated Photography page. They are not the complete gallery. Keep one large preview on mobile to prevent another long photograph stack.

Culture is a personal invitation, with the existing phrase `飯吃爻罷未？` and verified `vo chi o baa mei / Have you eaten?` wording. Continue to `/beyond/`, inside the same design system. No old-tab links and no legacy layout escape.

### 4. Notes and contact

Two recent notes on the left, a direct email invitation and Academic/CV access on the right. Use actual note titles and dates. Keep the full notes list on its own page. Preserve professional/social destinations and adapt the existing LiveStatus to the quieter shared footer, with a static reduced-motion dot.

## Page-specific requirements

### Work and case studies
The Work page carries the full existing project collection and reusable search/category behavior. Avoid replacing the whole collection with three homepage features. Use varied editorial rows with discipline labels and useful diagrams, not an undifferentiated tile grid.

Existing case studies keep question → approach → personal contribution → evidence → limitations → full technical links. Distinguish source inspection, implemented code, executed tests, archived data, plans and release readiness. Retain full Markdown, math, diagrams, screenshots, demos and repository links. Apply the same global shell, readable article column and optional evidence sidebar.

### Photography
Create `/photography/` with the **full**, not preview, EditorialPhotography component as the starting point. Preserve all 26 entries and both categories (24 Places, 2 Portraits), title, date, caption, location, alt text, original image, thumbnail, crop and featured flags.

Keep the large sticky featured image on desktop, the established rounded masonry composition, Caveat “Blue Ridge” overlay, gradient captions and filters. On mobile show the selected featured frame clearly, then the editorial grid. Maintain image loading sizes and original full-image opening; do not stretch card thumbnails into full-resolution lightbox assets.

Keep keyboard-operable photo buttons, arrow keys, Escape, dialog focus containment and focus restoration to the opening photo. Filters must announce selection and changed count. Preserve saved theme. Homepage preview should not alter the full gallery’s default behavior.

### Beyond / personal story and culture
Make a dedicated editorial page with a small portrait/identity introduction, Wenzhounese phrases, language-tool links and the existing food easter egg as a tactile focal interaction. Use existing facts rather than inventing a personal origin story.

Extract the current culture dialog and food behavior into a reusable component when implementing; it currently lives inside the homepage, so route separation requires this extraction. Preserve:
- `飯吃爻罷未？ (vo chi o baa mei)` — Have you eaten?
- `你眙 (ni tshi)` — You look / 你看; it does not mean hello.
- `甌越 (au-nyu)` — Ou Yue; preserve the source pronunciation note.
- The familiar saying already in the dialog, with existing meaning/context.
- Food names, emoji, random selection and day/night variation. Existing semantics use **the visitor’s local hour**, day 06:00–17:59, not the Minneapolis live-status clock.
- Day pool: 溫州糯米飯 🍚, 燈盞糕 🫓, 江蟹生 🦀, 溫州餛飩 🍜, 豬臟粉 🍜.
- Night pool: 油蔥鯧魚 🐟, 桂圓荷包蛋湯 🍳, 溫州魚餅 🍥, 血蛤 🐚.
- User-triggered bounded bursts: existing ten particles, approximately 1.8s animation, removed by 2.5s. Limit repeated concurrent bursts, clear timers on unmount, and keep effects pointer-transparent.
- Under reduced motion, opening the same content should reveal a static food selection instead of flying particles. Do not remove the cultural interaction or hide important explanations.
Use an explicit stacking scale for the dialog/effect layer; no site-wide 9999 effect layer. Do not auto-trigger bursts on page entry. A day/night preview control can be added later if useful, but is not necessary to preserve the original semantics.

### Notes and Academic
Notes gets an actual index route. Preserve all existing blog permalinks and article rendering. Academic holds education, research/work experience, teaching, publications and the correctly labeled project report, BibTeX copying, and PDF access. Keep a concise readable CV layout without making it the homepage.

## Responsive requirements

- 1440px: approximately 1344px usable width; name and portrait share the first screen. Do not replace useful side content with blank margins.
- 1920px: cap composition at 1560px; keep text readable, use the photograph and sidebar for breadth.
- Tablet: collapse the slim marginal rail, reduce gutters and rebalance columns; avoid portrait crops that cut off the face.
- 390 × 844: visible compact navigation, name, real portrait, short introduction and Work/CV access. Keep the portrait ahead of the introduction’s prose in reading and visual order. Current visual draft has portrait y≈317–627px and intro/actions ending y≈824px.
- 320px: preserve all identity content, reduce crop height/gutters; no horizontal overflow or hidden route controls.
- 200% text / browser zoom: allow content to reflow and scroll; do not force all hero content into a fixed height. First-screen targets apply to ordinary reference viewports, not a reason to clip enlarged text.
- Avoid fixed pixel page heights, scroll-jacking, horizontal page overflow and hover-only information.

## Accessibility, behavior and motion

Semantic landmarks, skip link, one page h1, heading hierarchy, visible focus, 44px control targets where practical, descriptive names for icon controls, meaningful alt text and no color-only statuses.

No necessary content begins hidden behind an animation. Navigation updates the page title and active route; route changes have normal scroll/history semantics. If an unobtrusive transition is added, use a short 120–180ms opacity change without delaying navigation. Reduced-motion users get instant transitions and no parallax, ping, food flight or automatic path animation.

The typography, warm gradients and transparent image-caption overlays require final contrast measurement: 4.5:1 for normal text, 3:1 for large text and meaningful UI graphics. Measure the worst part of the actual photo/gradient background, not just the nominal palette.

Reuse existing theme persistence, command palette, project search, photo lightbox, PDF links, BibTeX copying and live status. Share client state only where needed; keep content routes statically renderable and client bundles small. Priority-load only the homepage portrait; defer below-fold photos and large interactive demos.

## Implementation pipeline and review gate

| Phase | Deliverable / dependency | State | Exit evidence |
| --- | --- | --- | --- |
| P0 | Verify active branch, current preview and reusable content | Complete | Source match, measured existing layout, route audit |
| P1 | Revised design + sitemap + desktop/mobile homepage visual drafts; depends on P0 | Complete | Reviewed PNGs and retained prototype receipts |
| G1 | User reviews the revised prototypes | Complete | User accepted the unified opening and authorized implementation |
| P2 | Route shell, dedicated pages, existing-entry mapping; depends on G1 | Implemented | Direct loads and browser history work; no accidental legacy layout destinations |
| P3 | Person-first homepage + full gallery route + Beyond/culture integration; depends on P2 | Implemented | Identity screenshots, exact photo inventory, day/night and dialog behavior |
| P4 | Work, notes, academic and case-study visual integration; depends on P2, reconciles P3 | Implemented | All original content and technical links accounted for |
| P5 | Production/export/browser/accessibility verification; depends on P3/P4 | Verified locally | Checks below pass against the final source |
| Release | Commit/push/deployment | Not authorized | Separate explicit user instruction |

P3 and P4 have separable content work after the shared shell is stable, but homepage route links must be reconciled before the final verification. Critical path: source identity → revised visual review → real routes/shared shell → full page integration → final export and browser audit. Do not mistake visual approval for permission to publish.

The required prototype review was completed before application changes. The user then authorized implementation: “Feel free to make changes for the term website.” The dedicated routes and redesigned homepage are implemented locally. No commit, push or deployment has been performed.

## Final verification gates after implementation

1. Inspect the final diff and source hashes; account for all content/asset/PDF entries. Confirm no fabricated results or attribution changes.
2. `npm run lint`, `npm run build`, `node scripts/verify-static-export.mjs`. Keep output-export normalization, all directory indexes, image/PDF files and GitHub Pages trailing-slash safeguards.
3. Visit every primary route and existing project/note permalink. Audit all same-origin hrefs, fragment destinations, image requests, PDFs and retained demos; distinguish historical archive links from primary navigation.
4. Direct refresh, Back/Forward, route-active navigation, mobile menu, command palette, project filters/search, BibTeX and theme persistence.
5. Photography categories, all image/caption/location metadata, lightbox next/previous, Escape, keyboard entry, focus trap/restoration and scroll behavior.
6. Culture: visitor-local 05:59/06:00/17:59/18:00 boundaries, both exact food pools, repeated trigger cleanup, keyboard dialog and reduced-motion static equivalent.
7. Desktop/mobile screenshots at 320, 390, 768, 1024, 1440 and 1920px; portrait immediately visible at target viewports, no overflow/missing images, enlarged text reflow and generous but purposeful composition.
8. Contrast, reduced motion, keyboard order and focus across routes; record the scope of automated checks separately from manual accessibility review.
9. Compare the revised desktop and mobile screenshots against the approved prototypes and the preserved gallery. Refine visible discrepancies before calling the redesign verified.

Earlier prototype receipts remain historical evidence. Current application checks are recorded separately in `docs/personal-world-implementation.json`. Bounded browser and contrast checks do not imply full accessibility conformance or deployment.

## Risks and controls

- **Existing dirty prototype:** retain earlier code and design snapshot; do not reset either checkout.
- **Gallery style drift:** reuse the complete default component and compare against preserved gallery screenshots.
- **Legacy visual escapes:** migrate page shell and navigation together; map old incoming URLs without using them for new links.
- **Long homepage returning:** enforce the four-group content budget; put complete records on dedicated pages.
- **Portrait visibility regression:** inspect actual crop/first-viewport bounds at desktop and phone sizes, including image loading and fallback fonts.
- **Evidence becoming promotional overclaim:** preserve current statuses/limitations and source content; diagram captions stay explicit.
- **Static-host incompatibility:** use pre-renderable real routes and client compatibility mapping, never server-only redirects.

Next review: inspect the integrated local website and desktop/mobile captures. Publishing requires a separate explicit instruction.

## English / Traditional Chinese — 2026-10-21

Implemented EN / 中 switching with real /zh/ routes and the same Field Atlas
layout. The URL is the language state; switching preserves the current page and
fragment. Mobile language controls sit in quick navigation to preserve search.
Use Traditional Chinese system serif/sans fallbacks and reflow rather than fixed
line counts. Keep personal names, citations, code, original PDFs and Blue Ridge
handwriting intact. See docs/bilingual-verification.md for current evidence;
earlier receipts remain historical snapshots.


## Photography and language-project refinement — 2026-10-29

The user requested a rolling photography presentation and pointer/scroll-responsive portrait. The gallery now uses a native horizontal scroll-snap reel with bounded perspective, mouse drag, touch swipe, arrow controls, keyboard navigation, the full photograph inventory, categories, and the existing lightbox. This replaces the earlier sticky/masonry presentation. Reduced motion removes depth and smooth programmatic scrolling.

The portrait uses the original photograph with bounded pointer and scroll camera movement. Independent foreground segmentation is not implemented: the image-editing service returned unavailable, so no generated portrait derivative is used.

The public language repository is now `Ztang-Yit-Xiaang/Ruianese_Typing_Method`. Beyond and both language-project case studies include an actual screenshot of its browser demo (`ssang` offering 人), with a direct source/demo link. No input-engine code or dictionary was copied into this portfolio.


## Interactive project evidence — 2026-10-29

The user clarified that project motion must use original project visuals and interfaces, and interaction must change content inside a fixed view. The portfolio now contains 14 projects: magnetic sensing, array visualization, and reconstruction are one case study. The former sensor-visualization URL resolves to the merged case with its canonical metadata.

Project demonstrations use pinned source figures, byte-identical saved notebook image outputs, real saved CSV data, original source tests, and actual project interfaces. FER reveals the matching original/CAM/overlay for six real saved samples, including wrong predictions and flat heatmaps. Magnetic hover scrubbing selects discrete saved frames 70, 80, 90, 99; it does not interpolate missing reconstruction frames or invent timing. The AnySkin video is separately labeled. Image inspection magnifies pixels inside a fixed viewport. Full case-study demonstrations keep their viewports fixed. The overview previews follow the presentation split below.

The original archived travel dashboard is embedded on demand with its route playback, stop selection, and layer controls. The original typing demo, MathProof website, and portable Vital Lens web prototype can also be opened inside the page or in larger native dialogs. Vital's simulated sample data remains a prototype demonstration; no AI backend or personal records are used. Leverage-score metrics are exact saved notebook output; solver test inspection is source reading, not solver execution. Private MultiTaskOptimizer remains a source-access placeholder.

The particle playground follows the original Processing add/remove-obstacle and particle-count controls and source collision model. It adds drag, slingshot launch, gravity/bounce tuning, and bounded particle/obstacle limits. Native pointer/keyboard controls, pause/reset/step, hidden-tab/offscreen/global-pause gates, and reduced-motion handling are retained. No new package dependency is required.

Prior illustrative README guides are being replaced by captures of these authentic interactions. Website publication is separate from authorized repository documentation updates.


## Overview previews and case-study depth — 2026-10-29

The user requested the earlier animation presentation on the homepage and work index, while retaining original project media and full interactions inside each project page. `ProjectTeaser` restores the previous bilingual illustrations on those overview surfaces; `ProjectAnimation` continues to render authentic figures, saved results, embedded interfaces, and the playable particle simulation on case-study pages. The homepage particle section is a compact animated preview with a link to the full playground. Magnetic sensing and reconstruction remain one project. README recordings and their draft PRs retain the authentic project captures.


## Direct manipulation in miniature previews — 2026-10-29

The user requested playing with objects inside the compact overview illustrations. `teaser-interactions.ts` now controls the existing SVG primitives: solver starting point/steps, route waypoint, conserved example query allocations, task gradient blending, row selection, a verified ssang → 人 composition example, illustrated magnet bending, a loading threshold, schematic attention patches, equivalent PDE encodings, an exact f(x)=x counterexample, illustrative voting weights, a sample review/save flow, and a small collision scene. These are interactive explanations, with no project backend, solver, model, benchmark, input dictionary beyond the one verified example, personal record, or Lean checker run. The full authentic project demonstrations remain on the detail pages. The miniature collision scene reuses the source-adapted collision response with display-space units.

The overview frame no longer follows the pointer. SVG objects support pointer capture and arrow-key manipulation, with native sliders, selectors, and action buttons where appropriate. Manual changes preserve running playback and edited values. Only the explicit Pause control stops local playback; interaction also respects an existing local or global pause. Animated budget outlines follow the resized allocations, sampled rows retain their pulse, and edited curves and points keep their compatible animation. The miniature physics scene keeps running while its obstacle is moved. Reset recreates the original illustration. Offscreen/hidden/global-pause/reduced-motion gates remain in place, and manual controls remain usable with reduced motion.


## Three working miniature labs — 2026-10-29

The typing, proof, and optimization previews now need candidate lists, multiple native controls, and mathematical state. `project-mini-labs.tsx` handles those three compact labs instead of stretching the single-control SVG handlers. `mini-lab-models.ts` keeps dictionary lookup and numerical calculations independently verifiable; the remaining eleven previews retain their existing handlers and behavior.

The dictionary contains all 23,337 source rows from the five tables imported by the published Rime schema, pinned to commit 8a421c78ae960b0ce8273bf16bd0ca73ad4f99e5. Search supports Chinese characters, optional tones, and the schema's spelling variants. Candidates retain source labels; regional Wenzhounese words retain their usage qualification. Source tables, schema, provenance, and AGPL license are distributed with the derived data. `scripts/build-ruianese-demo.mjs` verifies pinned Git blob hashes and regenerates the derived JSON from those tables. It is a local dictionary lookup and composition demo; the original project link provides the full Rime keyboard.

The proof lab extends the original missing-PSD audit and O(1/k) gradient-descent proof at bef93cf9aa0b992c2984db1ba4082d0abc789c18. It separates a numeric witness from a proof of a universal claim, marks the first unsupported dependency, and offers explicit repairs. Lean is not run in the browser. The descent lab computes real gradient updates on a rotated SPD quadratic with eigenvalues 1 and 4. Click or drag to choose any visible initial point; step size, manual step, playback, pause, reduced motion, and offscreen gates are preserved. It is explicitly separate from OSQP's ADMM algorithm.


## Authentic facial and magnetic interactions — 2026-10-30

The two schematic previews are replaced by `project-evidence-labs.tsx`, because concrete paired image examples and original model/solver state require more than the old single-control SVG handlers. Thirteen facial examples retain source PNG pixels and use SVG viewport crops: seven selected correct class examples and the six first-test samples with errors and flat maps. Playback sweeps the saved overlay; pointer and slider interaction stays inside the same sample. These are stored labels and softmax scores, never a new judgment about a person.

The magnetic card remains one project with two clearly named implementation paths. `scripts/export-magnetic-demo.py` reads the user-provided local research folder without changing it, uses the exact pose function bodies on captured frames 200 and 201, records accepted SciPy TRF states, and exports frozen checkpoint weights plus independent parity fixtures. `magnetic-models.ts` implements the active sigmoid MLP, its input derivatives, bounded Adam, dipole field equation, and not-a-knot cubic centerline. The attention module is defined but bypassed in the source forward pass, so it is not depicted as active. Pose playback is explicitly distinguished from live spline edits; neural inverse optimization runs live in the browser. The original full figures and AnySkin footage remain separately inspectable on the case-study pages.
