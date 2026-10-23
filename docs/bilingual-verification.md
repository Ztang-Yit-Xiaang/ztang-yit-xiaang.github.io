# English / Traditional Chinese — 2026-10-21

The existing Field Atlas site now has English and Traditional Chinese versions on the same review branch. Changes are local and unpublished.

## Experience

EN / 中 appears in the shared navigation. The switch opens the equivalent page and preserves its query and fragment. Desktop keeps it beside search/theme controls; phones place it in quick navigation so search remains available. The selected language follows the URL through navigation, refresh and browser history.

The 30 /zh/ routes include Home, Work, Photography, Beyond, Notes, Academic, the portfolio alias, the optimization illustration, all 11 case studies and all 11 notes. Shared components and layouts serve both versions. Chinese photo titles, descriptions, locations and alt text accompany the same 26 original assets. Education, research, teaching, milestones, search and interactive labels are translated.

Traditional Chinese wording retains the original evidence boundaries, private-repository status, project-report distinction and research limitations. Official publication titles, names, software terms, code, BibTeX, original PDFs and the Blue Ridge handwriting remain in their original form. Archived demos retain their original interfaces.

## Verification

| Check | Result |
| --- | --- |
| Production build | Passed; 30 Chinese pages; 113 normalized navigation payloads |
| Original static-export checks | 158/158 passed |
| Bilingual static checks | 248/248 passed |
| Internal links/assets/fragments | 1430 checked across 72 HTML files; none broken |
| Bilingual browser journeys | 10/10 passed |
| Original English interaction regression | 17/17 passed |
| Responsive screenshots | Both languages at 320, 390, 768, 1024, 1440 and 1920px, plus Chinese content pages on phone/desktop |
| Lint | 0 errors; 3 existing archived-dashboard warnings |
| Preservation | 22 original articles, original resume data, dependencies/configuration and 257 public assets unchanged |

Browser journeys cover same-page switching and anchors, Back/refresh, theme persistence across languages, academic records and teaching dates, Chinese and English project queries, Chinese command search, all photos and lightbox controls, translated close labels, culture/reduced motion, optimization controls, mobile navigation/search, and first-view portrait visibility. No runtime errors or failed internal requests were observed. Core optimization functions were unchanged. These are bounded Edge-on-Windows checks, not an exhaustive accessibility certification.

## Maintenance

Keep English in src/data/resume.ts and the original content directories as the source of truth. Interface/data translations live in src/data/zh-Hant.json. Complete article translations live in src/content/zh/portfolio and src/content/zh/blog. New articles require matching Chinese files; the bilingual verification script checks the inventory and link parity.

After edits, run npm run lint, npm run build, node scripts/verify-static-export.mjs and node scripts/verify-bilingual.mjs. The existing export normalization also sets the document language for Chinese HTML because both locales share a root layout; language metadata and runtime navigation are validated separately.

The GitHub Pages workflow runs both static-export checks before uploading the site. Missing Chinese routes or article translations, incorrect document language, or changed article links fail the check and stop publication.

Current source hashes, detailed journeys and screenshots are recorded in [bilingual-verification.json](bilingual-verification.json). The earlier personal-world implementation receipt records the preceding English redesign snapshot.

## Readability adjustment — 2026-10-21

Small and body text increased by 2px in the shared stylesheets; introductory and academic-summary text has more line spacing. Large display text keeps its original size. Production build and both static-export checks passed. Thirty-six English/Traditional Chinese layouts across six homepage widths and desktop/mobile content pages had no horizontal overflow or browser errors; the portrait remained visible in the opening viewport. Desktop and mobile screenshots were reviewed. The JSON typographyRevision records current stylesheet hashes and before/after sizes; the earlier source manifest and broader interaction receipts remain historical snapshots.

## Introduction, navigation and MathProof — 2026-10-22

Homepage introductory text and header labels increased by another 2px in both languages; other text sizes are unchanged. Added a complete English/Traditional Chinese MathProof note, dated October 22, 2026, based on the public mathproof-skill README. The note preserves the distinction between informal audit and a successful, faithful Lean check. It is first in Notes and the homepage preview. Notes also links to MathProof and the author's public GitHub repository collection.

The site now exports 31 Chinese pages and contains 12 notes. The production build, 162 original static checks and 257 bilingual checks passed. Lint has no errors and the same three archived-dashboard warnings. Six homepage widths in both languages, phone/desktop Notes and article views, same-article language switching, browser Back, source links and one-line dates passed; no browser errors or failed internal requests occurred. Existing resume records and translations were retained. The JSON introAndMathproofRevision records current source hashes, provenance and scoped browser evidence. Changes remain local and unpublished.

## English entry and desktop reading scale — 2026-10-22

The root homepage explicitly renders English; /zh/ remains the Traditional Chinese counterpart. A Chinese browser preference does not redirect the root, and the language switch remains manual. Preview links should open the English root by default.

At widths of 1024px and above, a scoped desktop rule overrides the compact overview: introduction 22px, body and academic summaries 17px, entry titles 18px, section headings 24px, dates 12px, and navigation 18px. Entry headings use the full available line before their dates. Existing phone/small-tablet text is unchanged. All content remains present, with natural vertical reflow.

Production build, both static-export checks (162 and 257), and lint passed with no errors; the same three archived-dashboard lint warnings remain. Sixteen bilingual homepage layouts from 320 to 2560px and 36 desktop content-page layouts passed. Tests measured the rendered font sizes, verified unchanged phone text, no horizontal overflow, English entry with a Chinese browser locale, language switching and browser Back. Desktop, phone and full academic screenshots were reviewed. The JSON desktopReadingRevision records current source hashes and scoped evidence; earlier revisions remain historical snapshots.

## Wider homepage composition — 2026-10-22

Raised the desktop homepage width cap from 1560px to 2200px, preserving aligned header/content/footer gutters. On a 1920px viewport the content is now 1824px wide with 48px side margins; at 2250px it is 2154px wide with the same margins. The portrait height scales between 365px and 450px above the wide-screen breakpoint. Text sizes and content are unchanged; other pages keep their existing widths.

The production build and both static checks (162 and 257) passed. Twenty English/Traditional Chinese homepage layouts from 320px to 2560px had no horizontal overflow or browser errors; portrait visibility, aligned gutters and retained text sizes were checked. Work, Photography and article headers retained their previous widths. Wide desktop and phone screenshots were reviewed. The JSON wideHomeRevision records the final stylesheet hash and current measurements; previous receipts remain historical snapshots.
