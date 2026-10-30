import Image from "next/image";
import Link from "next/link";
import { EditorialPhotography } from "@/components/editorial-photography";
import { WenzhouneseTrick } from "@/components/wenzhounese-trick";
import { AcademicRecord } from "@/components/academic-record";
import { Publications } from "@/components/publications";
import { OptimizationLandscape } from "@/app/field-atlas/optimization-landscape";
import { getResumeData, localePath, t, type Locale } from "@/lib/i18n";
import type { PhotographyItem } from "@/data/resume";

export function PhotographyPage({locale="en"}:{locale?:Locale}) {
 return <div className="world-wrap photography-page"><header className="page-intro"><p className="kicker red">{t(locale,"A different kind of observation")}</p><h1>{t(locale,"Photography.")}</h1><p>{t(locale,"A visual journal of places, people, and quiet distances.")}</p></header><EditorialPhotography locale={locale} /></div>;
}

export function BeyondPage({locale="en"}:{locale?:Locale}) {
const resumeData=getResumeData(locale);

  const photo = (resumeData.photography as PhotographyItem[]).find(p => p.thumbnail.includes("xiwan-sunrise"))!;
  return <div className="world-wrap beyond-page">
    <header className="page-intro"><p className="kicker red">{t(locale,"Beyond the equations")}</p><h1>{t(locale,"Language, places,")}<br />{" "}<em>{t(locale,"and belonging.")}</em></h1><p>{t(locale,"Research and engineering are part of this portfolio. So are the photographs I make and the language tools I build.")}</p></header>
    <div className="personal-spread"><figure><Image src={photo.image} alt={t(locale,photo.alt ?? photo.description)} width={800} height={1200} sizes="(max-width: 700px) 100vw, 40vw" /><figcaption><strong>{photo.title}</strong><span>{photo.location} · {photo.date}</span><p>{photo.description}</p></figcaption></figure>
      <section className="language-story" id="language-culture" aria-labelledby="language-heading"><p className="kicker red">{resumeData.cultureMark}</p><h2 id="language-heading">{t(locale,"A living language,")}<br />{" "}<em>{t(locale,"in everyday use.")}</em></h2><p>{t(locale,"My Wenzhounese and Rui’anese input tools use phonetic schemas and dialect dictionaries for the Rime input engine. They connect language technology with local expression.")}</p><div className="dialect-line"><strong lang="zh-Hant">飯吃爻罷未？</strong><span>{t(locale,"vo chi o baa mei / Have you eaten?")}</span></div><p>{t(locale,"The little dictionary contains familiar phrases and a food surprise that changes with your local time: a daytime table or an evening one.")}</p><figure className="language-demo"><a href="https://ztang-yit-xiaang.github.io/Ruianese_Typing_Method/" target="_blank" rel="noreferrer"><Image src="/images/ruianese-typing-demo.png" alt={t(locale,"Ruianese typing demo showing ssang and the candidate 人")} width={484} height={414} sizes="(max-width: 700px) 100vw, 40vw" /></a><figcaption>{t(locale,"Actual browser demo: ssang → 人.")}</figcaption></figure><a className="text-link" href="https://ztang-yit-xiaang.github.io/Ruianese_Typing_Method/" target="_blank" rel="noreferrer">{t(locale,"Try the Ruianese keyboard")} ↗</a><WenzhouneseTrick locale={locale} /><Link className="text-link" href={localePath(locale,"/portfolio/wenzhounese-input-method/")}>{t(locale,"Explore the language tools")}<span aria-hidden="true">↗</span></Link></section>
    </div>
    <section className="beyond-links"><div><p className="kicker red">{t(locale,"A visual journal")}</p><h2>{t(locale,"Another way of looking.")}</h2><p>{t(locale,"Coastlines, canyon light, city passages, and the small details that make a place memorable.")}</p><Link className="text-link" href={localePath(locale,"/photography/")}>{t(locale,"Browse the full photography journal ↗")}</Link></div><div><p className="kicker red">{t(locale,"The academic side")}</p><h2>{t(locale,"From curiosity to work.")}</h2><p>{t(locale,"My education, research experience, teaching, publications and CV.")}</p><Link className="text-link" href={localePath(locale,"/academic/")}>{t(locale,"Read the academic record ↗")}</Link></div></section>
  </div>;

}

export function NotesPage({locale="en"}:{locale?:Locale}) {
const resumeData=getResumeData(locale);
 return <div className="world-wrap notes-page"><header className="page-intro"><p className="kicker red">{t(locale,"From the notebook")}</p><h1>{t(locale,"Still thinking.")}</h1><p>{t(locale,"Implementation notes, questions from research, and ideas I’m working through.")}</p></header><aside className="notes-tools" aria-labelledby="notes-tools-heading"><div><p className="kicker red">{t(locale,"Skills & tools")}</p><h2 id="notes-tools-heading">{t(locale,"From notes to reusable tools.")}</h2><p>{t(locale,"Reusable workflows and source code, starting with MathProof Skill.")}</p></div><nav aria-label={t(locale,"Skills and tool repositories")}><a className="text-link" href="https://github.com/Ztang-Yit-Xiaang/mathproof-skill" target="_blank" rel="noreferrer">MathProof Skill <span aria-hidden="true">↗</span></a><a className="text-link" href={resumeData.socials.github + "?tab=repositories"} target="_blank" rel="noreferrer">{t(locale,"Browse my GitHub libraries")}<span aria-hidden="true">↗</span></a></nav></aside><div className="notes-list">{resumeData.blog.map(post => <article className="editorial-note" key={post.slug}><time>{post.date}</time><div><h2><Link href={localePath(locale,post.link + "/")}>{post.title}</Link></h2><p>{post.summary}</p></div><Link className="note-arrow" href={localePath(locale,post.link + "/")} aria-label={t(locale,`Read ${post.title}`)}>↗</Link></article>)}</div></div>;
}

export function AcademicPage({locale="en"}:{locale?:Locale}) {
const resumeData=getResumeData(locale);
 return <div className="world-wrap academic-page" id="cv"><header className="academic-page-title"><div><p className="kicker red">{t(locale,"The academic side / Ztang Yit Xiaang")}</p><h1>{t(locale,"Academic record.")}</h1><p>{t(locale,"Education, research, teaching, and the steps along the way.")}</p></div><a className="text-link" href={resumeData.resumeUrl}>{t(locale,"Download full CV")}<span aria-hidden="true">↗</span></a></header><AcademicRecord locale={locale} /><Publications locale={locale} /></div>;
}

export function PlaygroundPage({locale="en"}:{locale?:Locale}) {
 return <div className="world-wrap playground-page"><header className="page-intro"><p className="kicker red">{t(locale,"A small mathematical detour")}</p><h1>{t(locale,"Finding a direction.")}</h1><p>{t(locale,"An interactive illustration of gradient descent on a quadratic landscape. This is a teaching example, not the PyGRANSO solver or a research benchmark.")}</p></header><div className="playground-spread"><section className="playground-feature" aria-label={t(locale,"Interactive optimization landscape")}><OptimizationLandscape locale={locale} /></section><aside><h2>{t(locale,"What to look for")}</h2><p>{t(locale,"Choose a starting point, change the step size, and inspect each update. A large step can leave the displayed domain; a smaller step may take longer.")}</p><p>{t(locale,"Run pauses when the illustration goes offscreen. Reduced-motion preferences produce a bounded static result.")}</p><Link className="text-link" href={localePath(locale,"/portfolio/osqp-method-in-torch/")}>{t(locale,"Read about the actual solver work ↗")}</Link><Link className="text-link" href={localePath(locale,"/work/")}>{t(locale,"All research & projects ↗")}</Link></aside></div></div>;
}
