import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { basename, join } from 'node:path';
const root = 'public/data/ruianese';
const provenance = JSON.parse(readFileSync(join(root, 'source/provenance.json'), 'utf8'));
const sources = [
  ['ruianese.zhang_yongkai.dict.yaml', '張永愷 · 瑞安方言讀音字典'],
  ['ruianese.wenzhou_words.dict.yaml', '溫州話常用詞'],
  ['ruianese.yunshu.dict.yaml', '瑞安方言曲藝韻書'],
  ['ruianese.chen_haifang.dict.yaml', '陳海芳 · 瑞安話語音研究'],
  ['ruianese.customize.dict.yaml', '自定義字詞'],
];
for (const source of provenance.files) {
  const bytes = readFileSync(join(root, 'source', basename(source.path)));
  const hash = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
  if (hash !== source.blob) throw new Error(`Source changed: ${source.path}`);
}
const entries = [];
for (const [source, [file]] of sources.entries()) {
  const body = readFileSync(join(root, 'source', file), 'utf8').split('...')[1];
  for (const line of body.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const [word, code, rawWeight] = line.split('\t');
    if (!word || !/^[a-z1-8 ]+$/.test(code)) throw new Error(`Invalid entry in ${file}: ${line}`);
    const weight = rawWeight?.trim() ? Number(rawWeight) : 0;
    if (!Number.isFinite(weight)) throw new Error(`Invalid weight: ${line}`);
    entries.push([word.trim(), code.trim(), weight, source]);
  }
}
writeFileSync(join(root, 'dictionary.json'), JSON.stringify({ commit: provenance.commit, sources: sources.map(([file, label]) => ({ file, label })), entries }) + '\n');
console.log(`Built ${entries.length} source-backed dictionary entries.`);
