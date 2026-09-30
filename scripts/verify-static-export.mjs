import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "out");

console.log("==================================================");
console.log("🔍 STARTING STATIC EXPORT & ASSET AUDIT (out/)");
console.log("==================================================");

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✅ [PASS] ${message}`);
  } else {
    failedChecks++;
    console.error(`  ❌ [FAIL] ${message}`);
  }
}

// 1. Check out directory exists
assert(fs.existsSync(outDir), "out/ directory was generated");

// 2. Check root index.html
const rootIndex = path.join(outDir, "index.html");
assert(fs.existsSync(rootIndex), "out/index.html exists");

if (fs.existsSync(rootIndex)) {
  const html = fs.readFileSync(rootIndex, "utf-8");
  assert(html.includes("Ztang Yit Xiaang"), "Root page contains title 'Ztang Yit Xiaang'");
  assert(html.includes("Download CV (PDF)"), "Root page contains 'Download CV (PDF)' action");
  assert(html.includes("Available for Research"), "Root page contains research status");
  assert(html.includes("甌越 · 溫州話 · Language Technology"), "Root page contains cultural marker");
  assert(html.includes("rel=\"stylesheet\""), "Root page links CSS bundle");
}

// 3. Check CV and public files
const cvFile = path.join(outDir, "files/cv.pdf");
assert(fs.existsSync(cvFile), "out/files/cv.pdf is present for download");

const mimmsPdf = path.join(outDir, "files/1155255040-Yixin Chen-Towards Tactile Intelligence_Inverse Neural Modeling and Magnetic Field Sensing for MIMMS.pdf");
assert(fs.existsSync(mimmsPdf), "CUHK MIMMS research paper PDF is present in out/files/");

// 4. Check interactive maps in out/images/
const lightMap = path.join(outDir, "images/lightweight_share_map.html");
assert(fs.existsSync(lightMap), "out/images/lightweight_share_map.html is present");

const prodMap = path.join(outDir, "images/production_hierarchical_trip_map.html");
assert(fs.existsSync(prodMap), "out/images/production_hierarchical_trip_map.html is present");

const weatherDashboard = path.join(outDir, "images/weather_dashboard/index.html");
assert(fs.existsSync(weatherDashboard), "out/images/weather_dashboard/index.html is present");

// 5. Check all blog post static routes
const expectedBlogSlugs = fs.readdirSync("src/content/blog").filter(f => f.endsWith(".md")).map(f => f.slice(0, -3));

console.log("\n--- Validating Blog Posts in out/blog/ ---");
for (const slug of expectedBlogSlugs) {
  // Support both trailingSlash (dir/index.html) and direct file (.html)
  const dirPath = path.join(outDir, "blog", slug, "index.html");
  const filePath = path.join(outDir, "blog", `${slug}.html`);
  const exists = fs.existsSync(dirPath) || fs.existsSync(filePath);
  assert(exists, `Blog post generated: /blog/${slug}/`);
  
  const targetFile = fs.existsSync(dirPath) ? dirPath : filePath;
  if (fs.existsSync(targetFile)) {
    const postHtml = fs.readFileSync(targetFile, "utf-8");
    assert(postHtml.includes("min read"), `Blog /blog/${slug}/ contains reading time`);
    assert(postHtml.includes("Back to Blog") || postHtml.includes("Back to All Posts"), `Blog /blog/${slug}/ contains back link`);
  }
}

// 6. Check all portfolio case study static routes
const expectedPortfolioSlugs = fs.readdirSync("src/content/portfolio").filter(f => f.endsWith(".md")).map(f => f.slice(0, -3));

console.log("\n--- Validating Portfolio Case Studies in out/portfolio/ ---");
for (const slug of expectedPortfolioSlugs) {
  const dirPath = path.join(outDir, "portfolio", slug, "index.html");
  const filePath = path.join(outDir, "portfolio", `${slug}.html`);
  const exists = fs.existsSync(dirPath) || fs.existsSync(filePath);
  assert(exists, `Portfolio case study generated: /portfolio/${slug}/`);
  
  const targetFile = fs.existsSync(dirPath) ? dirPath : filePath;
  if (fs.existsSync(targetFile)) {
    const projHtml = fs.readFileSync(targetFile, "utf-8");
    assert(projHtml.includes("Back to Projects"), `Portfolio /portfolio/${slug}/ contains back link`);
  }
}

// Client-rendered collections are absent from the initial HTML asset crawl.
const metadata = fs.readFileSync("src/data/resume.ts", "utf8");
const imagePaths = [...new Set([...metadata.matchAll(/(?:image|thumbnail)["']?\s*:\s*["'](\/[^"']+)["']/g)].map(match => match[1]))];
assert(imagePaths.length > 0, "Photography metadata is included in the asset audit");
for (const imagePath of imagePaths) {
  assert(fs.existsSync(path.join(outDir, imagePath)), `Collection image exists: ${imagePath}`);
}
for (const [section, slugs] of [["portfolio", expectedPortfolioSlugs], ["blog", expectedBlogSlugs]]) {
  for (const slug of slugs) {
    const route = path.join(outDir, section, slug);
    assert(fs.existsSync(path.join(route, `__next.${section}.$d$slug.__PAGE__.txt`)), `Navigation payload exists: /${section}/${slug}/`);
  }
}
assert(fs.existsSync(path.join(outDir, "portfolio", "__next.portfolio.__PAGE__.txt")), "Portfolio navigation payload exists");

// 7. Global Asset & Internal Link Crawler in out/
console.log("\n--- Crawling All Internal Links & Assets across Generated HTML ---");
let brokenLinks = 0;

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(filePath));
    } else if (file.endsWith(".html")) {
      results.push(filePath);
    }
  }
  return results;
}

const allHtmlFiles = getAllHtmlFiles(outDir);
console.log(`Found ${allHtmlFiles.length} generated HTML files to crawl.`);

for (const file of allHtmlFiles) {
  const content = fs.readFileSync(file, "utf-8");
  const relPath = path.relative(outDir, file);

  // Match local hrefs, srcs, iframes starting with / (excluding external http, mailto, etc)
  const linkRegex = /(?:href|src|data-src)=["'](\/[^"'#?]+)["']/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const targetUrl = match[1];

    // Ignore Next.js internal chunks handled by bundler (e.g., /_next/...)
    if (targetUrl.startsWith("/_next/")) continue;

    // Check if target points to a file, direct .html, or a folder with index.html
    const targetPath = path.join(outDir, decodeURIComponent(targetUrl));
    const targetHtmlPath = path.join(outDir, `${targetUrl.replace(/\/$/, "")}.html`);
    const targetIndexPath = path.join(outDir, targetUrl, "index.html");

    const resolved = fs.existsSync(targetPath) || fs.existsSync(targetHtmlPath) || fs.existsSync(targetIndexPath);
    if (!resolved) {
      console.warn(`  ⚠️ Broken reference in ${relPath}: ${targetUrl}`);
      brokenLinks++;
    }
  }
}

assert(brokenLinks === 0, `Zero broken internal asset links found across all pages (broken count: ${brokenLinks})`);

console.log("\n==================================================");
console.log(`📊 SUMMARY: ${passedChecks}/${totalChecks} PASSED (${failedChecks} FAILED)`);
console.log("==================================================");

if (failedChecks > 0) {
  process.exit(1);
}
