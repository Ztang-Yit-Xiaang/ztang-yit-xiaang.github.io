# Ztang Yit Xiaang — research, engineering & photography

Personal portfolio built with Next.js and exported to GitHub Pages.

- Website: https://ztang-yit-xiaang.github.io/
- Portfolio: https://ztang-yit-xiaang.github.io/portfolio/
- Photography: https://ztang-yit-xiaang.github.io/?tab=photography
- Research notes: https://ztang-yit-xiaang.github.io/?tab=blog

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
