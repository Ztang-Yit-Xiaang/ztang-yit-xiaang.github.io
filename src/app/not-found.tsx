"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPath,localePath,t } from "@/lib/i18n";
export default function NotFound() {
  const locale=localeFromPath(usePathname());
  return <div className="world-wrap page-intro not-found"><p className="kicker red">{locale==="en"?"Page not found":"找不到頁面"}</p><h1>{locale==="en"?"A path that ends here.":"這條路，暫時走到這裡。"}</h1><p>{locale==="en"?"The page may have moved. Continue through the portfolio, photography journal or notes.":"此頁面可能已移動。請繼續瀏覽研究專案、攝影日誌或隨筆。"}</p><div className="intro-actions">{[["/","Home"],["/work/","Work"],["/photography/","Photography"],["/notes/","Notes"]].map(([href,label])=><Link key={href} className="text-link" href={localePath(locale,href)}>{t(locale,label)} ↗</Link>)}</div></div>;
}
