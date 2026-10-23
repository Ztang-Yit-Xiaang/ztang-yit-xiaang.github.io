import { ArticlePage, articleMetadata, articleSlugs } from "@/components/content-pages";
interface Props { params: Promise<{slug:string}> }
export const dynamicParams=false;
export function generateStaticParams(){return articleSlugs("portfolio").map(slug=>({slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;return articleMetadata("portfolio",slug);}
export default async function Page({params}:Props){const {slug}=await params;return <ArticlePage kind="portfolio" slug={slug}/>;}
