export type Point = readonly [number, number];
export const QUADRATIC_L = 4;
const angle = -Math.PI / 9;
const c = Math.cos(angle), s = Math.sin(angle);

// Rotated quadratic with eigenvalues 1 and 4; the display contours use this same rotation.
export function quadratic(point: Point) {
  const u = c * point[0] + s * point[1];
  const v = -s * point[0] + c * point[1];
  return (u * u + 4 * v * v) / 2;
}
export function quadraticGradient(point: Point): Point {
  const u = c * point[0] + s * point[1];
  const v = -s * point[0] + c * point[1];
  return [c * u - 4 * s * v, s * u + 4 * c * v];
}
export function descentStep(point: Point, alpha: number): Point {
  const gradient = quadraticGradient(point);
  return [point[0] - alpha / QUADRATIC_L * gradient[0], point[1] - alpha / QUADRATIC_L * gradient[1]];
}
export function descentTrajectory(start: Point, alpha: number) {
  const path: Point[] = [start];
  let reason: "converged" | "outside" | "limit" = "limit";
  for (let step = 0; step < 200; step++) {
    if (Math.hypot(...quadraticGradient(path.at(-1)!)) < 1e-4) { reason = "converged"; break; }
    const next = descentStep(path.at(-1)!, alpha);
    path.push(next);
    if (!next.every(Number.isFinite) || Math.hypot(...next) > 25) { reason = "outside"; break; }
  }
  return { path, reason };
}
export function rateWitness(alpha: number, k: number) {
  const x = 2 * (1 - alpha / 4) ** k, y = (1 - alpha) ** k;
  return { x, y, gap: (x * x + 4 * y * y) / 2, bound: 10 / k, covered: Math.abs(alpha - 1) < 1e-8 };
}
export function psdWitness(mu: number, theta: number) {
  return { x: Math.cos(theta), y: Math.sin(theta), value: Math.cos(theta) ** 2 + mu * Math.sin(theta) ** 2, psd: mu >= 0 };
}

export type DictionaryRow = [word: string, code: string, weight: number, source: number];
export type DictionaryData = { commit: string; sources: { file: string; label: string }[]; entries: DictionaryRow[] };
export type DictionaryCandidate = { word: string; code: string; weight: number; source: number; keys: string[] };
// These are the optional spelling derivations in the pinned ruianese.schema.yaml.
const derivations: [RegExp, string][] = [
  [/^zz(i[a-z]+|y[a-z]*)$/, "jj$1"], [/^z(i[a-z]+|y[a-z]*)$/, "j$1"],
  [/^c(i[a-z]+|y[a-z]*)$/, "q$1"], [/^ss(i[a-z]+|y[a-z]*)$/, "zs$1"], [/^s(i[a-z]+|y[a-z]*)$/, "x$1"],
  [/^(b|p|bb|m|f|v|d|t|dd|n|l|g|k|gg|ng|h|hh|j|q|jj|nj|x|zs)?ie$/, "$1i"],
  [/^(b|p|bb|m|f|v|d|t|dd|n|l|g|k|gg|ng|h|hh|j|q|jj|nj|x|zs)?yue$/, "$1yu"],
];
export function prepareDictionary(rows: DictionaryRow[]): DictionaryCandidate[] {
  const memo = new Map<string, string[]>();
  const variants = (syllable: string) => {
    const tone = syllable.match(/[1-8]$/)?.[0] ?? "";
    const base = syllable.replace(/[1-8]$/, "");
    if (!memo.has(base)) {
      const forms = new Set([base]);
      for (const [pattern, replacement] of derivations) for (const form of [...forms]) if (pattern.test(form)) forms.add(form.replace(pattern, replacement));
      memo.set(base, [...forms]);
    }
    return { forms: memo.get(base)!, tone };
  };
  return rows.map(([word, code, weight, source]) => {
    let bare = [""], toned = [""];
    for (const syllable of code.split(/\s+/)) {
      const { forms, tone } = variants(syllable);
      bare = bare.flatMap(prefix => forms.map(form => prefix + form)).slice(0, 32);
      toned = toned.flatMap(prefix => forms.map(form => prefix + form + tone)).slice(0, 32);
    }
    return { word, code, weight, source, keys: [...new Set([...bare, ...toned])] };
  });
}
export function lookupDictionary(entries: DictionaryCandidate[], input: string) {
  const query = input.normalize("NFKC").toLowerCase().replace(/[\s']/g, "").trim();
  if (!query) return [];
  const han = /\p{Script=Han}/u.test(query);
  const matches = entries.map(entry => {
    const exact = han ? entry.word === query : entry.keys.includes(query);
    const prefix = han ? entry.word.includes(query) : entry.keys.some(key => key.startsWith(query));
    return { entry, rank: exact ? 0 : prefix ? 1 : 2 };
  }).filter(item => item.rank < 2).sort((a, b) => a.rank - b.rank || b.entry.weight - a.entry.weight);
  const seen = new Set<string>();
  return matches.filter(({ entry }) => { const key = entry.word + "\t" + entry.code; if (seen.has(key)) return false; seen.add(key); return true; }).map(({ entry }) => entry);
}
