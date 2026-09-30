import fs from "fs";
import path from "path";

function fixLinksInDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixLinksInDir(fullPath);
    } else if (file.endsWith(".md")) {
      let content = fs.readFileSync(fullPath, "utf-8");
      
      // Fix old Jekyll /posts/YYYY/MM/slug links
      content = content.replace(/\/posts\/\d{4}\/\d{2}\/([^/"']+)\/?/g, "/blog/$1/");
      
      // Fix old research working papers links
      content = content.replace(/\/research\/working-papers\/?/g, "/?tab=research");
      content = content.replace(/\/research\/?(?=[/)"'\s]|$)/g, "/?tab=research");
      
      // Fix legacy project links
      content = content.replace(/\/portfolio\/hutchpp-trace-estimation\/?/g, "/portfolio/matrix-vector-trace-estimation/");
      
      fs.writeFileSync(fullPath, content, "utf-8");
      console.log(`Normalized URLs in: ${file}`);
    }
  }
}

fixLinksInDir(path.join(process.cwd(), "src/content"));
