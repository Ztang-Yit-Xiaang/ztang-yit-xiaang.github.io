import translations from "@/data/zh-Hant.json";
import { resumeData } from "@/data/resume";

export type Locale = "en" | "zh-Hant";
const dictionary: Record<string, string> = translations;
const months: Record<string, string> = { Jan:"1", Feb:"2", Mar:"3", Apr:"4", May:"5", Jun:"6", Jul:"7", Aug:"8", Sep:"9", Oct:"10", Nov:"11", Dec:"12" };
export function t(locale: Locale, text: string): string {
  if (locale === "en") return text;
  const key = text.replace(/\s+/g, " ").trim();
  if (dictionary[key]) return dictionary[key];
  const arrow = key.match(/^(.*?)(\s*[↗→✓])$/);
  if (arrow && dictionary[arrow[1].trim()]) return dictionary[arrow[1].trim()] + " " + arrow[2].trim();
  const date = key.match(/^([A-Z][a-z]{2}) (\d{1,2}), (\d{4})$/);
  if (date && months[date[1]]) return date[3] + " 年 " + months[date[1]] + " 月 " + date[2] + " 日";
  if (/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Fall|Spring|Summer) \d{4}(?: [–-] (?:Present|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Fall|Spring|Summer) \d{4}))?$/.test(key)) {
    return key.split(/ [–-] /).map(part => {
      if (part === "Present") return "迄今";
      const [unit,year] = part.split(" ");
      return year + " 年" + (months[unit] ? " " + months[unit] + " 月" : ({Fall:"秋季",Spring:"春季",Summer:"夏季"} as Record<string,string>)[unit]);
    }).join("－");
  }
  if (key.startsWith("Open Photography: ")) return "開啟攝影日誌："+key.slice(18);
  const photo = key.match(/^Open (.+) in the photography lightbox$/);
  if (photo) return "在燈箱中開啟「" + photo[1] + "」";
  const read = key.match(/^Read (.+)$/);
  if (read) return "閱讀「" + read[1] + "」";
  const count = key.match(/^(All Photos|Places|Portraits) \((\d+)\)$/);
  if (count) return dictionary[count[1]] + "（" + count[2] + "）";
  const step = key.match(/^Step (\d+)\. Objective (.+)\.$/);
  if (step) return "第 " + step[1] + " 步，目標函數值 " + step[2] + "。";
  const theme = key.match(/^Switch to (Light|Dark) Mode$/);
  if (theme) return theme[1] === "Light" ? "切換至淺色模式" : "切換至深色模式";
  const email = key.match(/^Copy Email \((.+)\)$/);
  if (email) return "複製電子郵件（" + email[1] + "）";
  return text;
}

export function localeFromPath(pathname: string): Locale {
  return /^\/zh(?:\/|$)/.test(pathname) ? "zh-Hant" : "en";
}
export function withoutLocale(pathname: string): string {
  const path = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  return path.endsWith("/") ? path : path + "/";
}
export function localePath(locale: Locale, path: string): string {
  if (!/^\/(?:$|(?:work|photography|beyond|notes|academic|portfolio|blog)(?:\/|$))/.test(path)) return path;
  return locale === "zh-Hant" ? "/zh" + path : path;
}
export function languageAlternates(locale: Locale, path: string) {
  return { canonical: localePath(locale,path), languages: { en:path, "zh-Hant":localePath("zh-Hant",path), "x-default":path } };
}

function localize<T>(value: T): T {
  if (typeof value === "string") return t("zh-Hant",value) as T;
  if (Array.isArray(value)) return value.map(localize) as T;
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key,entry]) =>
    [key, ["link","url","pdf","resumeUrl","repository","image","thumbnail","avatar","bibtex","slug","overlayLabel","objectPosition"].includes(key) ? entry : localize(entry)]
  )) as T;
  return value;
}
const chineseResume = localize(resumeData);
export const getResumeData = (locale: Locale) => locale === "zh-Hant" ? chineseResume : resumeData;
