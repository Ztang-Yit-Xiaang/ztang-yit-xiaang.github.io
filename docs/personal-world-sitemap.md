# Personal World — Multi-page Sitemap
Revision: 2026-10-20. **Implemented locally on the review branch; not published.** Existing case-study, note, PDF and archive paths remain content authorities.

```text
Home /
├── Work /work/
│   ├── All existing projects; search and categories
│   ├── Existing case studies /portfolio/[slug]/
│   └── Optimization playground /work/optimization-playground/
├── Photography /photography/
│   ├── All / Places / Portraits
│   └── Full-image lightbox: captions, locations, arrows, Escape
├── Beyond /beyond/
│   ├── Personal introduction using verified existing facts
│   ├── Wenzhounese phrases and culture dialog
│   ├── Food easter egg / visitor-local day and night
│   └── Existing language-tool case study
├── Notes /notes/
│   └── Existing articles /blog/[slug]/
└── Academic /academic/
    ├── Education, research/work, teaching
    ├── Publications and separately labeled project report
    ├── BibTeX and existing PDF links
    └── CV /files/cv.pdf
```

## Primary page contracts

| Label | Route | Homepage role | Full-page responsibility |
| --- | --- | --- | --- |
| Home | `/` | Name, portrait, curated introduction and concise academic background | Four content groups, not the entire CV/gallery |
| Work | `/work/` | Three selected introductions | All 11 current projects, categories/search, source and case-study access |
| Photography | `/photography/` | Two desktop images / one mobile image | Full 26-photo editorial gallery, existing categories and accessible lightbox |
| Beyond | `/beyond/` | Brief language/culture invitation | Personal story grounded in existing facts, Wenzhounese interactions and food animations |
| Notes | `/notes/` | Two latest entries | Full existing notes index and article access |
| Academic / CV | `/academic/` | Header, hero CV and footer access | Full education/research/teaching record, existing milestones, publications/report, BibTeX and PDFs |
| Playground | `/work/optimization-playground/` | Quiet link below work | Existing bounded interactive illustration and limitations |

Header order: Home, Work, Photography, Beyond, Notes, Academic / CV. The brand links Home. The PDF remains available directly rather than requiring a visit to Academic. Mobile shows Work, Photography, Beyond and CV shortcuts plus the full menu. All navigation uses real URLs and standard browser history after implementation.

## Preserved entry points and compatibility

| Current incoming URL | Final destination/behavior | Constraint |
| --- | --- | --- |
| `/?tab=projects` | `/work/` | Preserve old entry; do not use for new navigation |
| `/?tab=photography` | `/photography/` | Same full gallery and metadata, new common shell |
| `/?tab=blog` | `/notes/` | Existing article URLs unchanged |
| `/?tab=research` | `/academic/#publications` | Preserve publications/report distinction |
| `/?tab=about` | `/beyond/` | Personal introduction and culture |
| `/?tab=about#language-culture-heading` | `/beyond/#language-culture` | Retain culture anchor target |
| `/?tab=about#cv` | `/academic/#cv` | Academic record remains reachable |
| `/portfolio/` | Render the new Work collection shell at this path too | Preserve the public existing collection URL |
| `/portfolio/[slug]/` | Existing case study at the same URL | New common navigation and typography; original content intact |
| `/blog/[slug]/` | Existing article at the same URL | New common navigation; original Markdown intact |
| `/files/*`, `/assets/*` | Existing files | No renaming, deletion or broken embedded references |
| Existing archive/demo URLs | Existing static archive/demo | Clearly label archive links; do not silently replace working demos |

Compatibility mapping is a small client boundary for old homepage query URLs on GitHub Pages, with a readable fallback navigation. Preserve known relevant hash mappings. Use replacement semantics for the obsolete entry so Back does not trap visitors in a redirect loop. New navigation uses actual route links. This is the only justified old-tab compatibility layer; do not preserve the old tab UI in the primary experience.

The development-only `/field-atlas/` route can remain during review. It must not be the final main navigation destination. Decide its retirement only after the new real pages are reviewed; do not delete the earlier prototype during this visual revision.

## Content relocation map

| Existing source | Reuse / final location |
| --- | --- |
| `src/data/resume.ts` | Remains the single existing typed source for identity, academic records, projects, photos and notes |
| `src/components/projects-portfolio.tsx` | Reuse filtering/search logic on Work, adjust presentation within the shared shell |
| `src/components/editorial-photography.tsx` | Full default behavior on Photography; homepage uses a short teaser, not the full component |
| Culture block + food state in `src/app/page.tsx` | Extract together for Beyond; retain exact phrases and day/night foods |
| `src/components/live-status.tsx` | Shared footer, same Minneapolis clock and saved availability wording |
| `src/components/command-menu.tsx` | Keep keyboard behavior; update route destinations |
| `src/app/field-atlas/optimization-landscape.tsx` | Reuse on dedicated playground, not hero |
| `src/content/portfolio/*`, `src/app/portfolio/[slug]/page.tsx` | Same content/permalinks, new page shell |
| `src/content/blog/*`, `src/app/blog/[slug]/page.tsx` | Same content/permalinks, new index and shell |
| `public/files/*`, existing archived static demos | Preserve all files and destinations |

## Navigation acceptance after implementation

Every primary route has its own h1/title, visible active-page state, direct-refresh support, normal Back/Forward, consistent header/footer and no layout escape into old homepage tabs. Each project/article retains parent navigation. No anchor-only replacement for the six main pages.

Export all routes as directory indexes with trailing slashes. Audit internal links and anchors against the export, not just successful client navigation. Test PDFs and full photography assets separately. Current exported directory indexes, navigation and incoming links are validated against the actual application build; see the implementation receipt.

## Historical prototype decisions — 2026-10-18

The following records the reviewed design stage. These route and layout decisions are now implemented; prototype-only verification statements below describe that earlier stage.

### Academic layout

Use the supplied composition for the homepage preview and expanded Academic page: full-width culture banner; Education and Teaching in the left column; Research Experience timeline in the wider right column; full-width Highlights & Milestones below. The homepage selects one current education entry and three selected research entries (two current appointments plus the completed independent study), shows one combined CSCI 2081 teaching entry dated Fall 2025 – Fall 2026 and four milestones, and links to the full record. The expanded visual study preserves 2 education entries, 3 teaching entries, 8 research/work entries and 4 milestones exactly. On mobile stack Culture → Education → Teaching → Research → Milestones. The original milestone source is src/app/page.tsx, outside resumeData. New production routes remain planned.

The homepage Research Experience link remains /academic/#research. Show the first three chronological source entries with one exact source bullet each, and preserve all eight entries on the expanded academic record. In this visual revision the anchor and eight-record destination were tested using a temporary prototype-server alias; production routing has not been migrated.

Teaching presentation refinement: the homepage has one date-range entry, Fall 2025 – Fall 2026. Retain Fall 2025, Spring 2026 and Fall 2026 as separate source records and full Academic details.

## Unified opening refinement — 2026-10-18

The person/portrait and basic academic overview share one homepage opening section. They are not separate pages or full-screen panels. On desktop use a person panel on the left and the existing two-column academic composition on the right, with milestones below the academic columns. On phones they flow in reading order within the same page. Retain the full-record /academic/#research destination for the remaining research experience and detailed academic record, plus the dedicated Work, Photography, Beyond and Notes routes. This refinement changes homepage composition rather than collapsing the multi-page sitemap.

## Traditional Chinese routes — 2026-10-21

Every public content page has a Traditional Chinese counterpart under /zh/:
/zh/, /zh/work/, /zh/photography/, /zh/beyond/, /zh/notes/, /zh/academic/,
/zh/portfolio/, /zh/work/optimization-playground/, /zh/portfolio/[slug]/ and
/zh/blog/[slug]/. The original English URLs remain unchanged. There are 31
Chinese directory-index routes. PDFs and photo assets use their original shared
paths. Canonical/language-alternate metadata and language-switch links identify
equivalent pages; source Markdown links stay inside the selected language.
