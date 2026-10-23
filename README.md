# Ztang Yit Xiaang — research, engineering & photography

Personal portfolio built with Next.js and exported to GitHub Pages.

- Website: https://ztang-yit-xiaang.github.io/
- Portfolio: https://ztang-yit-xiaang.github.io/portfolio/
- Photography: `/photography/`
- Work / Research: `/work/`
- Beyond / Culture: `/beyond/`
- Academic / CV: `/academic/`
- Research notes: `/notes/`

## Develop and verify

Use Node.js 20.9 or newer and the committed npm lockfile.

```sh
npm ci
npm run dev
npm run lint
npm run build
node scripts/verify-static-export.mjs
```

The production output is `out/`. The build includes a small compatibility step
for Next.js 16 on Windows: it copies nested navigation payloads to the flat
filenames requested by the browser. Already-correct exports are unchanged. GitHub Actions builds and deploys pushes to `main`.

## Content

`src/data/resume.ts` contains project, publication, blog, and photography metadata.
Case studies live in `src/content/portfolio/`; posts live in `src/content/blog/`.
Each project records its contribution, current evidence, and the corresponding
repository. A private collaborator repository is clearly labeled. Local research
progress is distinguished from the state of the public source snapshots.

Photographs use web-sized WebP copies in `public/assets/photos/`; travel-journal
originals are kept outside the repository. New exports omit camera metadata.
Archived travel dashboards are demonstrations, not live travel or booking advice.

## Approved Field Atlas redesign

The `codex/geometry-of-curiosity-prototype` branch now implements the approved
personal portfolio: portrait and academic overview in one opening, followed by
selected work, a short photography/culture preview, notes and contact. Work,
Photography, Beyond, Notes and Academic have dedicated real routes. Existing
case studies, articles, PDFs and archives remain valid. Old query-based entries
resolve to the new pages. The earlier unindexed `/field-atlas/` study is retained.

Changes are local: no commit, push or deployment has been performed.

The full gallery retains all 26 photographs, captions, categories and accessible
lightbox; the homepage uses a small teaser. Wenzhounese phrases and day/night
food interactions share the new visual system. The optimization illustration
lives at `/work/optimization-playground/`. No dependencies were added.

See `design.md`, `docs/personal-world-sitemap.md` and
`docs/personal-world-implementation.md` for design and verification evidence.
Earlier audit and prototype receipts are retained separately.

## English and Traditional Chinese

Use EN / 中 in the header to switch the current page. English uses the existing
URLs; Traditional Chinese uses /zh/ with the same page structure and slugs.
Navigation, research/academic copy, photographs, culture, all case studies and
notes have Traditional Chinese versions. Original source content and PDFs remain
intact. See docs/bilingual-verification.md for coverage and checks.

After building, also run node scripts/verify-bilingual.mjs. Keep translated
articles paired with their English originals and update src/data/zh-Hant.json
when changing shared interface text.
