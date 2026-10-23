# The Geometry of Curiosity

Field Atlas selected · isolated prototype built · review before homepage replacement

A Creative Research Portfolio: 70% warm editorial, 30% experimental creative coding. This document proposes design and later validation; it is not implementation evidence.

## Decision and context

**Selected Direction 1: Field Atlas.** An authored research journal can connect inspectable mathematics, evidence-led software, photography, and Wenzhounese language technology without replacing the existing content system.

Read the [current-site audit](docs/redesign-audit.md). The requested Next.js application is in `E:/Yit_Xiaang_Website/ztang-yit-xiaang.github.io-live`; the similarly named folder without `-live` is a separate, modified Jekyll checkout. Inspected Next.js base: `df6c99db15c0655e58b5c414104bf71da8b64589`. Recheck status before branching.

## Photography style — fixed requirement

The user explicitly chose to retain the current [photography tab](https://ztang-yit-xiaang.github.io/?tab=photography). This requirement applies to **all three homepage directions**.

- Preserve the large sticky featured photograph and asymmetric masonry arrangement.
- Preserve rounded image frames, the existing Caveat handwritten Blue Ridge overlay, bottom caption gradients, location captions, and expand affordances.
- Preserve All Photos / Places / Portraits filters, all 26 photographs, the full-image lightbox, keyboard arrows/Escape, focus restoration, and responsive behavior.
- Keep the dedicated photography tab in its existing light/dark visual style. Do not apply a new editorial serif or global reset to its headings, captions, filters, or image treatment. Retain the existing EditorialPhotography component.
- A homepage teaser may reuse this visual language at a smaller scale. It must link to the complete gallery; it does not replace the gallery or flatten it into the initial concept’s simple photo strip.

This is a confirmed design constraint, not an implemented code change. The live gallery was checked during this refinement: HTTP 200 and 26 photo triggers.

Concept previews: [Annotated Proof](C:/Users/Ztang_Yit_Xiaang/.codex/visualizations/2026/10/17/01a147d4-4b22-7b20-951f-792d9f388d0e/annotated-proof-preview.png), [Curiosity Cabinet](C:/Users/Ztang_Yit_Xiaang/.codex/visualizations/2026/10/17/01a147d4-4b22-7b20-951f-792d9f388d0e/curiosity-cabinet-preview.png), [Field Atlas with the gallery retained](C:/Users/Ztang_Yit_Xiaang/.codex/visualizations/2026/10/17/01a147d4-4b22-7b20-951f-792d9f388d0e/field-atlas-gallery-v2-preview.png). These are static visual studies outside the website source, not functional prototypes or approval to deploy.

## Three visual directions

These are direction proposals, not homepage mockups. Shared preservation and accessibility requirements apply to all three.

| Direction | Composition and typography | Creative interaction | Identity and photography | Tradeoff |
| --- | --- | --- | --- | --- |
| **1. Field Atlas — recommended** | Large Newsreader serif title in a 7/5 split; precise Geist prose; margin notes, thin rules, numbered figures, offset project essays. Warm paper dominates. | A generous 2D contour experiment follows the research introduction. A small contour detail may accompany the hero. | A photographic spread and substantive language-tools vignette share Beyond the Equations. Portrait becomes an author detail. | Closest to 70/30; requires disciplined spacing to feel authored rather than empty. |
| **2. Annotated Proof** | Quieter Newsreader opening; wider margins, numbered questions, restrained monospace annotations, diagrams integrated with text. | The landscape is the central explanatory figure; project diagrams read as visual derivations. | Photographs provide observations between essays; language tools get an annotated example. | Strong research rigor; risks looking too much like a paper or becoming dense on mobile. |
| **3. Curiosity Cabinet** | More expressive Fraunces display, a large existing photograph, a mathematical specimen, and staggered editorial spreads. No draggable collage. | The landscape becomes an interactive specimen with a visible explanation. | Photography and language technology carry more of the personal narrative, with research preceding long journal material. | Most expressive; imagery could obscure the research evidence if overused. |

Newsreader is a variable screen-reading typeface licensed under SIL OFL 1.1 ([Production Type](https://github.com/productiontype/Newsreader)). Fraunces is a more expressive soft-serif alternative ([Google Fonts description](https://github.com/google/fonts/blob/main/ofl/fraunces/article/ARTICLE.en_us.html), [upstream/license](https://github.com/undercasetype/Fraunces)). Choose one display family. Newsreader is now bundled through next/font on the isolated Field Atlas prototype route; the production layout fonts are unchanged. Its license is included in public/licenses/Newsreader-OFL.txt. Fraunces has not been added.

### Field Atlas visual language

A researcher's field journal, carefully typeset. Contours, query budgets, route decisions, and photographic horizons connect structure with observation. Geometry must describe something real or explicitly illustrative. Avoid abstract particle backgrounds, stock science imagery, fabricated plots, generic dashboard cards, purple gradients, gratuitous 3D, and excessive glass/shadows.

The 70/30 balance is art direction, not a measured area ratio: prose, photographs, and hierarchy carry the page; interaction explains one idea and strengthens selected project figures.

## Proposed tokens

No production styles have changed.

| Token | Light value | Use |
| --- | --- | --- |
| `paper` | `#F6F1E7` | Warm ivory canvas |
| `paper-raised` | `#FCF9F3` | Occasional figure/control surface |
| `ink` | `#24251F` | Primary text and headings |
| `ink-secondary` | `#615C53` | Supporting prose and captions |
| `cinnabar` | `#A43D2D` | Links, selected controls, important paths |
| `cinnabar-hover` | `#853023` | Hover/pressed emphasis |
| `sage` | `#4E6253` | Secondary explanatory series/annotations |
| `sage-wash` | `#E4E9DE` | Quiet surface, never text |
| `rule` | `#CFC6B8` | Decorative separators |
| `control-edge` | `#8A8175` | Meaningful input boundaries |
| `focus` | `#A43D2D` | Solid outline on paper |

Calculated opaque sRGB contrast against paper: ink **13.72:1**, secondary **5.90:1**, cinnabar **5.68:1**, sage **5.84:1**, control edge **3.41:1**. Paper text on cinnabar: **5.68:1**. These calculations do not establish rendered-page accessibility; sizes, opacity, overlays, states, and both themes still need browser checks.

Preserve the theme toggle and saved preference. Propose warm light for visitors without a saved choice, while honoring stored dark mode. Dark counterpart: warm charcoal `#22231F`, paper text `#F6F1E7` (14.04:1), light terracotta `#E6A18A` (7.40:1). Complete dark secondary/focus/control/figure colors must be verified in the prototype.

Cinnabar is the primary accent, sage a restrained secondary. Color alone must not indicate convergence, feasibility, success, or availability. Decorative rules may be subtle; meaningful figure paths and control boundaries need stronger contrast.

### Typography

- Display: **Newsreader**, weight 400–500, restrained italic emphasis; Georgia fallback. Hero approximately `clamp(2.75rem, 6.5vw, 6.5rem)`, line-height 1.02–1.08, slightly negative tracking. Avoid forced desktop breaks on mobile.
- Body/navigation: retain **Geist**; 400 prose, 500–600 emphasis/actions. Body 16–18px, line-height 1.65–1.8, reading width 58–66ch.
- Labels: retain **Geist Mono**, 12–13px, tabular numbers. Sentence case except short figure/section labels.
- Chinese identity/examples: retain exact authored text. Use available CJK fallbacks such as PingFang TC/Microsoft JhengHei/Noto Serif CJK TC; a Latin display family does not supply Chinese glyphs. Check alignment, wrapping, and coverage.
- Retain existing Caveat overlay where authored on photographs; do not spread a fourth type voice across the site.
- In the approved prototype, use build-time bundled or licensed local font assets through existing font infrastructure after consulting installed Next.js docs. Include notices for new assets. No runtime font-CDN dependency.

### Layout and surface system

Spacing scale: 4/8/12/16/24/32/48/64/96/128px, implemented in rem. Content max around 1248px; gutters 48–64px desktop, 32px tablet, 20–24px mobile. Reading columns stay narrower than the overall grid.

Use 12 desktop columns and 5/7 or 7/5 essay compositions. Maintain normal DOM reading order. Sections get about 96–128px vertical space desktop and 56–72px mobile, varied optically. Use flat surfaces, thin rules, 0–4px figure corners, and 6–8px control corners; retain comfortable photo/lightbox framing. Avoid uniform card shadows/pills.

Proposed layer scale: content 0, sticky navigation 10, dialog 30, optional culture effect 40. Decorations never intercept input or obscure focus.

## Homepage narrative

| Order | Purpose and treatment | Content source |
| --- | --- | --- |
| 1. Masthead/hero | Name, bilingual identity, Research/Work/Beyond/Notes links, CV/contact. Large serif concept title beside a small contour or author detail. Mobile section access above the long content. | Existing identity, portrait, links |
| 2. Research introduction | Concise randomized linear algebra/numerical optimization/software description with UMN affiliation; can be part of the hero. | Existing bio/experience |
| 3. Optimization landscape | One explanatory 2D experiment, labeled controls, and a statement of what it demonstrates. | Explicitly illustrative mathematics |
| 4. Three featured studies | Numbered essays with distinct figures and alternating emphasis; contribution, evidence, limits, case link visible. | First three existing projects |
| 5. Beyond the Equations | Small photographic spread plus substantive Wenzhounese/Rui’anese input-tools story. | Existing photographs/culture/case study |
| 6. Recent notes | Three dated rows with summaries, plus complete collection access. Preserve original dates and stable tie ordering. | Existing blog metadata |
| 7. Academic details/contact | Full education, experience, teaching, publications/report access; CV PDF, email, Scholar, GitHub, LinkedIn, Instagram. | Existing complete collections |

Possible display copy: **“The geometry of curiosity.”** Supporting draft: “I study randomized algorithms and numerical optimization at the University of Minnesota, and build software that makes those ideas inspectable.” Keep the exact existing name and Chinese identity visible. This is proposed editorial wording, not a new credential or achievement.

The homepage is selective. Complete academic details, all projects, all notes, and the full gallery stay available.

## Mathematical interaction

Propose a native SVG contour plot of the illustrative convex quadratic:

`f(x,y) = 1/2 (4x² + 2xy + y²)`

Gradient-descent update: `x_next = x - α(4x + y)`, `y_next = y - α(x + y)`, using the same current point for both updates. Label this as a teaching demonstration; it is **not** the PyGRANSO/OSQP algorithm, a benchmark, or GPU-performance evidence.

- Start with a static field and marked point; no autoplay.
- Labeled starting x/y numeric inputs, step-size slider with visible value, Step, Run/Pause, Reset. Optional pointer point selection must have equivalent keyboard input.
- Proposed domain `[-3,3]²`, start `(2,1)`, α `0.15`; permit exploration up to `0.55` to demonstrate instability. Bound a run to 40 updates; stop and explain when it leaves the visible domain. Do not clamp the point and imply convergence.
- Show iteration/objective value as illustrative calculations. Differentiate initial point/path/minimum by shape or line style as well as color. Include a text description and accessible figure name.
- Announce deliberate steps/completion politely, not every frame.
- Reduced motion: instant deliberate updates and a final static path; no animated drawing. Step/Reset remain useful.
- Pause when offscreen/document hidden. No continuous background loop, WebGL, 3D, or new chart/animation dependency.
- Static export includes useful explanatory text and the initial figure before hydration. Client failure cannot hide the research narrative or links.

## Featured case-study treatment

| Study | Question and bespoke figure | Evidence boundary |
| --- | --- | --- |
| **Torch-OSQP for PyGRANSO** | How does a translation preserve solver behavior? QP inputs → dense KKT/LU operations → residual/stopping checks, with scaling/reuse annotations. | Dense reference implemented; broader numerical acceptance/release open. No sparse-QDLDL equivalence, differentiable QP layer, or accelerator speedup claim. |
| **Context-aware travel planner** | How can a trip change while preserving commitments? Annotated repair/evaluator flow and actual archived route preview linked to its dashboard. | Implemented prototype; full research comparison incomplete; archive is not a live booking tool or current travel advice. |
| **Adaptive Hutch++ trace estimation** | How should a fixed query budget be allocated? Pilot → low-rank allocation → residual probes as a budget ribbon. Use symbolic allocations unless a named artifact provides numbers. | Source/tests/archived tables exist; experiments not rerun in this website audit; no universal improvement claim. |

Each essay includes question, approach, personal contribution, inspectable evidence, limitations, and full technical links. Label schematics. Future quantitative charts require a named data artifact, units, methods, and uncertainty.

Retain all 11 case-study routes, private collaborator labeling, team attribution, local/public distinctions, and report/publication distinctions.

## Beyond the Equations

Proposed selections: **Blue Ridge Solitude**, **Xiwān Sunrise**, **Sea Through Stone**. Keep original location/date/caption/image references. Do not relabel a photograph as Wenzhou or as a research image. Respect original proportions and crop metadata; full images remain available. The fixed photography-style requirement above takes precedence over the initial flat photo-strip mockup.

Give language technology real space: explain existing Rime schemas/dictionaries, link the Wenzhounese/Rui’anese case study, retain the culture dialog. Reuse authored phrases/romanization only. No invented examples, synthesized speech, or unsupported cultural claims.

Preserve the food surprise as an explicit optional interaction with a reduced-motion equivalent; never trigger it on hover/page load. Preserve the complete 26-photo gallery, Places/Portraits filters, keyboard lightbox, and focus restoration through `/?tab=photography`. Reuse existing gallery behavior rather than duplicate it.

## Preservation contract

- Keep `/portfolio/`, every `/portfolio/<slug>/` and `/blog/<slug>/`, `/files/*`, and archived `/images/*`; preserve case and PDF filenames with spaces.
- Keep all five `?tab=about|projects|research|photography|blog` entry points, Back/Forward behavior, and command-menu navigation. Explicit about still exposes the full academic profile. The default homepage can tell the new story without removing collection views.
- Retain search/categories/result count/reset, BibTeX copy, CV/contact/social destinations, theme preference, culture dialog, photography captions/lightbox.
- Preserve authored availability wording unless the owner changes it; it is not measured presence. Propose quieter placement and minute-level clock updates later, retaining America/Chicago.
- Keep existing Markdown and resume data as sources. No fabricated achievements, results, dates, awards, qualifications, or biographical additions.
- No commits, pushes, messages, publication, or deployment are authorized by this proposal.

## Responsive, accessibility, and motion requirements

| State | Required behavior |
| --- | --- |
| 320–639px | Single column/logical reading order; compact header with reachable sections, CV/contact, search/theme. Title around 44–56px subject to wrapping. Controls wrap rather than shrink; plot and controls stack. |
| 640–1023px | Two-column groups only where prose fits; stack figures/controls when needed. Readability outranks asymmetry. |
| 1024–1440px | Full grid and offset essays; optional sticky figures never trap scroll. |
| 1920px | Bounded composition and deliberate margins. |
| 200% text / 400% zoom | Reflow and reachable navigation/dialogs; contained horizontal scrolling only for inherently wide technical tables/equations. |
| Keyboard/assistive tech | Skip link, one main landmark and page h1 per route, logical headings, real links/buttons, visible focus, modal Escape/focus restoration. |
| Touch | Aim for 44×44px controls and spacing; hover carries no unique information. |
| Contrast | 4.5:1 normal text, 3:1 large text and meaningful UI/figure boundaries; check both themes, all states, image overlays. |
| Reduced motion | CSS and JS honor preference; useful static state and deliberate interaction remain. |

Focus outlines at least 2px with offset. Sticky-header anchor offsets. Descriptive alt/captions. Review HTML-only KaTeX accessibility when introducing math. Decorative SVG is hidden from assistive tech; meaningful figures have names/descriptions.

Use motion for feedback: 120–180ms controls, at most 240ms small transitions. No scroll hijacking, parallax, magnetic cursors, typography loops, spotlights, or content initially hidden behind an animation.

## Later implementation and approval gates

The user selected Field Atlas after reviewing the visual directions. The isolated prototype is now implemented on codex/geometry-of-curiosity-prototype at /field-atlas/. Broader homepage replacement remains behind prototype review.

| Stage | Entry gate | Scope and exit evidence | State / risk |
| --- | --- | --- | --- |
| A. Audit/directions | Inspect sources and constraints | This proposal, audit, baseline checks/screenshots | Delivered for review; underlying research not newly revalidated upstream |
| B. Separate-branch prototype | User selects direction; source/status rechecked | Create `codex/geometry-of-curiosity-prototype` from the inspected Next.js base; keep documents; homepage-only preview with scoped tokens, real interaction, desktop/mobile screenshots, preservation comparison | Verified locally; see docs/field-atlas-prototype.md and docs/field-atlas-verification.json; prototype review remains the next gate |
| C. Homepage foundations | User approves prototype composition/behavior | Approved typography/tokens/navigation/homepage, all query collection entry points, saved theme, build/export checks | Proposed; homepage/query/theme coupling |
| D. Case studies/identity | Foundations verified | Three incremental diagram/essay treatments; preserve all other routes, gallery, academic content, evidence/limits | Proposed; illustrations could imply measured results |
| E. Verification/refinement | Integrated work implemented | Lint/build/export, full routes/assets, keyboard journeys, contrast/themes/motion, screenshots at 320/390/768/1024/1440/1920; resolve unexplained failures | Proposed; build and token ratios alone do not prove accessibility |

Critical path: direction approval → separate-branch prototype → prototype approval → homepage foundations → case studies → final verification. Content inventory and figure sourcing can run alongside approved prototype work; avoid concurrent edits to shared homepage/styles. Deployment requires separate authorization.

Use existing checks: `npm run lint`, `npm run build`, `node scripts/verify-static-export.mjs`. Preserve export/trailing-slash/unoptimized-image settings, static params, Windows payload normalization, and the Pages generator-injection guard. Adjust wording-specific assertions only for approved copy changes while preserving semantic content/route/asset coverage; do not remove failing preservation checks to obtain a pass.

Rollback: retain baseline/production commit and use a reviewable branch. No route migration, content deletion, CMS, backend, hosting migration, or new interaction library is necessary.

**Next decision:** review the working Field Atlas prototype before replacing the current homepage. Deployment remains a separate authorization.
