import type { Metadata } from "next";
import { HomePortfolio } from "@/components/home-portfolio";
import { languageAlternates } from "@/lib/i18n";
export const metadata: Metadata = {
  title:"Ztang Yit Xiaang（陳奕昕）｜研究、工程與攝影",
  description:"陳奕昕的個人作品集：明尼蘇達大學資料科學、隨機化演算法、最佳化、科學計算、攝影與溫州話。",
  alternates:languageAlternates("zh-Hant","/"),
  openGraph:{locale:"zh_TW",title:"Ztang Yit Xiaang（陳奕昕）｜研究、工程與攝影"}
};
export default function ChineseHome() { return <HomePortfolio locale="zh-Hant" />; }
