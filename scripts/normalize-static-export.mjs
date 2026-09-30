import fs from "node:fs";
import path from "node:path";

// Next.js Windows exports can turn segment separators into directories.
// https://github.com/vercel/next.js/issues/92339
// Keep this until the installed Next.js version emits the expected flat names.
const output = path.resolve("out");
let copied = 0;

function flatten(directory, routeDirectory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      flatten(source, routeDirectory);
    } else if (entry.name.endsWith(".txt")) {
      const filename = path.relative(routeDirectory, source).split(path.sep).join(".");
      const target = path.join(routeDirectory, filename);
      if (fs.existsSync(target)) {
        if (!fs.readFileSync(source).equals(fs.readFileSync(target))) {
          throw new Error(`Conflicting navigation payload: ${target}`);
        }
      } else {
        fs.copyFileSync(source, target, fs.constants.COPYFILE_EXCL);
        copied++;
      }
    }
  }
}

function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const child = path.join(directory, entry.name);
    if (entry.name.startsWith("__next.")) flatten(child, directory);
    else visit(child);
  }
}

visit(output);
console.log(`Static navigation compatibility: ${copied} payloads copied.`);
