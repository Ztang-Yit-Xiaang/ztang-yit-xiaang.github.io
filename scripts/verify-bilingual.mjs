import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const output=path.resolve("out");
const routes=["","work","photography","beyond","notes","academic","portfolio","work/optimization-playground"];
for(const kind of ["portfolio","blog"]) {
  const originals=fs.readdirSync("src/content/"+kind).filter(f=>f.endsWith(".md")).sort();
  const translated=fs.readdirSync("src/content/zh/"+kind).filter(f=>f.endsWith(".md")).sort();
  assert.deepEqual(translated,originals,"Every source article needs one Traditional Chinese translation");
  for(const file of originals)routes.push(kind+"/"+file.slice(0,-3));
}
let checks=2;
const issues=[];
function check(value,message){checks++;if(!value)issues.push(message)}
for(const route of routes) {
  const chineseFile=path.join(output,"zh",route,"index.html");
  check(fs.existsSync(chineseFile),"Missing Chinese route: "+route);
  if(!fs.existsSync(chineseFile))continue;
  const zh=fs.readFileSync(chineseFile,"utf8").split("<script")[0];
  const full=fs.readFileSync(chineseFile,"utf8");
  check(/<html[^>]*lang="zh-Hant"/.test(zh),"Chinese document language: "+route);
  check(full.includes('data-locale="zh-Hant"'),"Chinese shared navigation: "+route);
  check(full.includes('hrefLang="en"')||full.includes('hreflang="en"'),"English language alternate: "+route);
  check(full.includes('hrefLang="zh-Hant"')||full.includes('hreflang="zh-Hant"'),"Chinese language alternate: "+route);
  check(full.includes('href="/zh/photography/"'),"Localized Photography link: "+route);
}
for(const kind of ["portfolio","blog"])for(const filename of fs.readdirSync("src/content/zh/"+kind)) {
  const text=fs.readFileSync("src/content/zh/"+kind+"/"+filename,"utf8");
  check(/^title:.*[\u3400-\u9fff]/m.test(text),"Translated article title: "+filename);
  check((text.match(/[\u3400-\u9fff]/g)||[]).length>100,"Translated article body: "+filename);
  const source=fs.readFileSync("src/content/"+kind+"/"+filename,"utf8");
  const links=s=>[...s.matchAll(/\]\(([^)]+)\)/g)].map(m=>m[1]).sort();
  check(JSON.stringify(links(text))===JSON.stringify(links(source)),"Preserve article links/assets: "+filename);
}
const report={checks,passed:checks-issues.length,issues,localizedRoutes:routes.length};
console.log(JSON.stringify(report,null,2));
if(issues.length)process.exitCode=1;
