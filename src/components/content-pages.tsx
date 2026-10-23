import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { processMarkdown } from "@/lib/markdown";
import { resumeData } from "@/data/resume";
import { getResumeData, languageAlternates, localePath, t, type Locale } from "@/lib/i18n";
import { ProjectFigure } from "@/components/project-figure";

export type ContentKind = "portfolio" | "blog";
export function articleSlugs(kind: ContentKind) {
  return fs.readdirSync(path.join(process.cwd(),"src/content",kind)).filter(f=>f.endsWith(".md")).map(f=>f.slice(0,-3));
}
async function article(kind: ContentKind, slug: string, locale: Locale) {
  if (!articleSlugs(kind).includes(slug)) notFound();
  const file = path.join(process.cwd(),"src/content",locale === "en" ? "" : "zh",kind,slug+".md");
  return processMarkdown(fs.readFileSync(file,"utf8"));
}
export async function articleMetadata(kind: ContentKind, slug: string, locale: Locale = "en"): Promise<Metadata> {
  const {frontmatter} = await article(kind,slug,locale);
  const project = getResumeData(locale).projects.find(p=>p.link==="/portfolio/"+slug);
  const title = String(frontmatter.title || project?.title || slug);
  const description = String(frontmatter.description || project?.description || (locale === "en" ? "Research note by Ztang Yit Xiaang (Yixin Chen)." : "陳奕昕的研究與實作筆記。"));
  return {title:title+" | Ztang Yit Xiaang",description,
    alternates:languageAlternates(locale,"/"+kind+"/"+slug+"/"),
    authors:kind==="blog"?[{name:String(frontmatter.author || "Ztang Yit Xiaang")}]:undefined,
    openGraph:{title,description,type:"article",locale:locale==="en"?"en_US":"zh_TW",publishedTime:typeof frontmatter.date==="string"?frontmatter.date:undefined}};
}
export async function ArticlePage({kind,slug,locale="en"}:{kind:ContentKind;slug:string;locale?:Locale}) {
  const {frontmatter,html,content,readingTimeMinutes} = await article(kind,slug,locale);
  const data=getResumeData(locale),project=data.projects.find(p=>p.link==="/portfolio/"+slug);
  if(kind==="portfolio"&&!project)notFound();
  const title=String(frontmatter.title||project?.title||slug),date=String(frontmatter.date||""),tags=(frontmatter.tags as string[])||[];
  let renderedHtml=html.replace(/<h1([^>]*)>/g,"<h2$1>").replaceAll("</h1>","</h2>");
  if(locale==="zh-Hant")renderedHtml=renderedHtml.replace(/href="(\/(?:blog|portfolio)\/[^"]*)"/g,(_,href:string)=>'href="'+localePath(locale,href)+'"');
  const parent=kind==="portfolio"?"/work/":"/notes/",back=kind==="portfolio"?"All research & projects":"All notes";
  const diagramIndex=project?data.projects.indexOf(project):-1;
  const minutes=locale==="en"?readingTimeMinutes:Math.max(1,Math.ceil(content.replace(/\s/g,"").length/500));
  return <div className="world-wrap article-page">
    <Link className="article-back" href={localePath(locale,parent)}>← {t(locale,back)}</Link>
    <header className="article-heading"><p className="kicker red">{project?project.category+" / "+t(locale,"Case study"):tags.length?tags.map(x=>t(locale,x)).join(" · "):t(locale,"From the notebook")}</p><h1>{title}</h1>
      {project&&<p>{project.description}</p>}
      <div className="article-meta">{date&&<time>{date}</time>}{project?<span>{project.status}</span>:<><span>{locale==="en"?minutes+" min read":"約 "+minutes+" 分鐘閱讀"}</span><span>{String(frontmatter.author||"Ztang Yit Xiaang")}</span></>}</div>
    </header>
    {project&&<section className="case-evidence" aria-label={t(locale,"Contribution, evidence and limitations")}><div><h2>{t(locale,"My contribution")}</h2><p>{project.contribution}</p></div><div><h2>{t(locale,"Current evidence & limits")}</h2><p>{project.evidence}</p></div><a href={project.repository} target="_blank" rel="noreferrer">{project.repositoryLabel??t(locale,"Explore the GitHub repository")} ↗</a></section>}
    {diagramIndex>=0&&diagramIndex<3&&<figure className="project-diagram case-figure"><ProjectFigure index={diagramIndex} locale={locale}/><figcaption>{t(locale,["Schematic / from inputs to checks","Illustrative repair / preserve commitments","Symbolic budget / no measured proportions"][diagramIndex])}</figcaption></figure>}
    <article className="technical-article" dangerouslySetInnerHTML={{__html:renderedHtml}}/>
    <div className="article-actions"><Link href={localePath(locale,parent)}>← {t(locale,back)}</Link><a href={project?.repository??resumeData.socials.github} target="_blank" rel="noreferrer">{project?project.repositoryLabel??t(locale,"View repository on GitHub"):t(locale,"Discuss on GitHub")} ↗</a></div>
  </div>;
}
