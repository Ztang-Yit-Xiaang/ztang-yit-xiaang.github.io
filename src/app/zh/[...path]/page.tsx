import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectsPortfolio } from "@/components/projects-portfolio";
import { PhotographyPage, BeyondPage, NotesPage, AcademicPage, PlaygroundPage } from "@/components/portfolio-pages";
import { ArticlePage, articleMetadata, articleSlugs } from "@/components/content-pages";
import { languageAlternates } from "@/lib/i18n";

export const dynamicParams=false;
const pages = {
  work:["研究與專案","數值最佳化、隨機化演算法、科學計算與應用系統。"],
  photography:["攝影日誌","地方、人物與寧靜遠方的影像日誌。"],
  beyond:["方程式之外","溫州話、在地文化、輸入工具與攝影。"],
  notes:["研究隨筆","研究問題、實作心得與仍在醞釀的想法。"],
  academic:["學術經歷與履歷","教育背景、研究與教學經歷、論文、專案報告及履歷。"],
  portfolio:["研究與專案","所有研究與工程專案。"],
  "work/optimization-playground":["最佳化互動實驗","以二次函數地形探索梯度下降，明確呈現控制與限制。"]
} as const;
interface Props { params:Promise<{path:string[]}> }
export function generateStaticParams() {
  return [...Object.keys(pages).map(p=>({path:p.split("/")})),...(["portfolio","blog"] as const).flatMap(kind=>articleSlugs(kind).map(slug=>({path:[kind,slug]})))];
}
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {path}=await params;
  if(path.length===2&&(path[0]==="portfolio"||path[0]==="blog"))return articleMetadata(path[0],path[1],"zh-Hant");
  const key=path.join("/") as keyof typeof pages,entry=pages[key];
  if(!entry)notFound();
  return {title:entry[0]+" | Ztang Yit Xiaang",description:entry[1],alternates:languageAlternates("zh-Hant",key==="portfolio"?"/work/":"/"+key+"/"),openGraph:{title:entry[0]+" | Ztang Yit Xiaang",description:entry[1],locale:"zh_TW"}};
}
export default async function Page({params}:Props) {
  const {path}=await params,key=path.join("/");
  if(path.length===2&&(path[0]==="portfolio"||path[0]==="blog"))return <ArticlePage kind={path[0]} slug={path[1]} locale="zh-Hant"/>;
  switch(key) {
    case "work":case "portfolio":return <ProjectsPortfolio locale="zh-Hant"/>;
    case "photography":return <PhotographyPage locale="zh-Hant"/>;
    case "beyond":return <BeyondPage locale="zh-Hant"/>;
    case "notes":return <NotesPage locale="zh-Hant"/>;
    case "academic":return <AcademicPage locale="zh-Hant"/>;
    case "work/optimization-playground":return <PlaygroundPage locale="zh-Hant"/>;
    default:notFound();
  }
}
