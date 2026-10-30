import { getResumeData, localePath, t, type Locale } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { MotionPortrait } from "@/components/motion-portrait";
import { AcademicRecord } from "@/components/academic-record";
import { ProjectTeaser } from "@/components/project-teaser";
import type { PhotographyItem } from "@/data/resume";

const summaries = [
  "A dense PyTorch reference for QP subproblems, with explicit numerical contracts.",
  "Repairing a trip when conditions change, while keeping commitments visible.",
  "Spending a matrix–vector query budget between approximation and estimation.",
];

function PhotoTeaser({ photo, small = false, locale = "en" }: { photo: PhotographyItem; small?: boolean; locale?: Locale }) {
  return <Link className={`photo-card ${small ? "small" : "large"}`} href={localePath(locale,"/photography/")} aria-label={t(locale,`Open Photography: ${photo.title}`)}>
    <Image src={photo.thumbnail} alt={t(locale,photo.alt ?? photo.description)} width={small ? 800 : 1200} height={small ? 1200 : 800} sizes={small ? "25vw" : "(max-width: 700px) 100vw, 45vw"} style={{ objectPosition: photo.objectPosition ?? "center" }} />
    {photo.overlayLabel && <span className="photo-script">{photo.overlayLabel}</span>}
    <span className="expand" aria-hidden="true">↗</span><span className="photo-caption"><strong>{photo.title}</strong><small>{photo.location}</small></span>
  </Link>;
}

export function HomePortfolio({locale="en"}:{locale?:Locale}) {
const resumeData=getResumeData(locale);
const photos=resumeData.photography as PhotographyItem[];
  return <>
    <section className="unified-opening" aria-labelledby="person-name">
      <div className="world-wrap unified-grid">
        <div className="unified-person">
          <div className="identity">
            <p className="kicker red">{t(locale,"Research · Engineering · A life in pictures")}</p>
            <h1 id="person-name"><span>{t(locale,"Ztang")}</span>{" "}<span>{t(locale,"Yit")}{" "}<em>{t(locale,"Xiaang.")}</em></span></h1>
            <p className="identity-alias">{t(locale,"Yixin Chen   /   溫州人陳奕昕")}</p>
          </div>
          <MotionPortrait locale={locale}><Image src={resumeData.avatar} alt={t(locale,"Ztang Yit Xiaang holding a camera in front of dunes and sunlit mountains")} width={1706} height={1279} priority sizes="(max-width: 700px) 100vw, 36vw" /></MotionPortrait>
          <div className="intro">
            <p>{t(locale,"Hi, I’m Yit Xiaang, a Data Science student at the University of Minnesota. I work on optimization and scientific computing, build research software, and make photographs along the way.")}</p>
            <div className="intro-actions"><Link className="primary" href={localePath(locale,"/work/")}>{t(locale,"Explore my work")}<span aria-hidden="true">↗</span></Link><a className="text-link" href={resumeData.resumeUrl}>{t(locale,"Read my CV")}<span aria-hidden="true">↗</span></a></div>
          </div>
          <p className="person-foot"><span>{t(locale,"Minneapolis, MN")}</span><Link href={localePath(locale,"/photography/")}>{t(locale,"Photography ↗")}</Link><Link href={localePath(locale,"/beyond/")}>{t(locale,"Beyond ↗")}</Link></p>
        </div>
        <div className="unified-record"><AcademicRecord locale={locale} preview /></div>
      </div>
    </section>
    <section className="world-wrap work" aria-labelledby="work-title">
      <header className="section-head"><div><p className="kicker red">{t(locale,"01 / Selected work")}</p><h2 id="work-title">{t(locale,"Questions I’m working on.")}</h2></div><p className="head-note">{t(locale,"Mathematical ideas, working software, and a clear account of what the evidence supports.")}</p></header>
      {resumeData.projects.slice(0, 3).map((project, i) => <article className="project-row" key={project.link}>
        <span className="project-no">{String(i + 1).padStart(2, "0")}</span>
        <div className="project-copy"><h3><Link href={localePath(locale,project.link + "/")}>{project.title}</Link></h3><p>{t(locale,summaries[i])}</p></div>
        <ProjectTeaser slug={project.link.split("/").at(-1)!} locale={locale} compact />
        <div className="project-meta"><div className="project-status">{project.status}</div><p>{project.evidence}</p><Link className="text-link" href={localePath(locale,project.link + "/")}>{t(locale,"Read the case study")}<span aria-hidden="true">↗</span></Link></div>
      </article>)}
      <div className="work-links"><Link className="text-link" href={localePath(locale,"/work/")}>{t(locale,"Explore all research & projects")}<span className="arrow" aria-hidden="true">↗</span></Link><p className="experiment">{t(locale,"A small mathematical detour:")}<Link href={localePath(locale,"/work/optimization-playground/")}>{t(locale,"the optimization playground ↗")}</Link></p></div>
    </section>
    <section className="world-wrap home-play-preview" aria-labelledby="home-play-title">
      <div><h2 id="home-play-title">{t(locale,"A little room to play.")}</h2><Link className="text-link" href={localePath(locale,"/portfolio/particle-obstacle-collision/")}>{locale === "en" ? "Open the interactive playground ↗" : "進入互動粒子遊樂場 ↗"}</Link></div>
      <ProjectTeaser slug="particle-obstacle-collision" locale={locale} compact />
    </section>
    <section className="beyond" aria-labelledby="beyond-title"><div className="world-wrap">
      <header className="beyond-head"><div><p className="kicker red">{t(locale,"02 / Beyond the equations")}</p><h2 id="beyond-title">{t(locale,"There’s more than one")}<br />{t(locale,"way to see.")}</h2></div><p className="head-note">{t(locale,"Photographs, language, and the places that give this portfolio a personal point of view.")}</p></header>
      <div className="beyond-grid"><div><div className="photo-spread"><PhotoTeaser locale={locale} photo={photos.find(p => p.featured)!} /><PhotoTeaser locale={locale} photo={photos.find(p => p.thumbnail.includes("xiwan-sunrise"))!} small /></div><div className="photo-foot"><p>{t(locale,"Places & people / A visual journal")}</p><Link className="text-link" href={localePath(locale,"/photography/")}>{t(locale,"Step into Photography")}<span className="arrow" aria-hidden="true">↗</span></Link></div></div>
        <aside className="culture"><p className="kicker">{t(locale,"A note from my own language")}</p><h3>{t(locale,"Wenzhounese roots.")}<br />{t(locale,"A living language.")}</h3><p>{t(locale,"Language is part of everyday life. My Wenzhounese and Rui’anese input tools bring local expression to the Rime input engine.")}</p><div className="dialect-line"><strong lang="zh-Hant">飯吃爻罷未？</strong><span>{t(locale,"vo chi o baa mei   /   Have you eaten?")}</span></div><Link className="text-link" href={localePath(locale,"/beyond/#language-culture")}>{t(locale,"Come say it in Wenzhounese")}<span aria-hidden="true">↗</span></Link><p className="food-note"><span aria-hidden="true">🍚</span><span>{t(locale,"A little food surprise awaits.")}<br />{t(locale,"Different tastes by day and by night.")}</span></p></aside>
      </div>
    </div></section>
    <section className="world-wrap notebook" aria-label={t(locale,"Notes and contact")}>
      <div><header className="notes-head"><div><p className="kicker red">{t(locale,"03 / From the notebook")}</p><h2>{t(locale,"Still thinking.")}</h2></div><Link className="text-link" href={localePath(locale,"/notes/")}>{t(locale,"All notes")}<span aria-hidden="true">↗</span></Link></header>
        {resumeData.blog.slice(0, 2).map(post => <Link className="note-row" href={localePath(locale,post.link + "/")} key={post.slug}><time>{post.date}</time><h3>{post.title}</h3><span className="arrow" aria-hidden="true">↗</span></Link>)}
      </div>
      <aside className="contact"><p className="kicker red">{t(locale,"Let’s compare notes")}</p><h2>{t(locale,"Curiosity is better")}<br />{" "}<em>{t(locale,"in conversation.")}</em></h2><p>{t(locale,"For research, collaboration, or a conversation about something here.")}</p><a className="text-link" href={`mailto:${resumeData.email}`}>{resumeData.email} <span aria-hidden="true">↗</span></a><p className="cv-line"><Link href={localePath(locale,"/academic/")}>{t(locale,"Academic background")}</Link> · <a href={resumeData.resumeUrl}>{t(locale,"Full CV (PDF) ↗")}</a></p></aside>
    </section>
  </>;
}
