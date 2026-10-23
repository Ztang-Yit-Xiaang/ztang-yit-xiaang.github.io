"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Moon, Sun } from "lucide-react";
import { CommandMenu } from "@/components/command-menu";
import { EditorialPhotography } from "@/components/editorial-photography";
import { LiveStatus } from "@/components/live-status";
import { resumeData } from "@/data/resume";
import { OptimizationLandscape } from "./optimization-landscape";
import styles from "./field-atlas.module.css";

const questions = [
  "How do we preserve a solver’s behavior when we translate its mathematics into software?",
  "What can change in a trip without losing what matters to the traveler?",
  "How should we spend a limited budget of matrix–vector queries?",
];
const captions = [
  "Schematic / From a quadratic program to inspectable checks",
  "Illustrative repair flow / Preserve commitments, evaluate change",
  "Schematic / A budget is a decision, not a guarantee of improvement",
];

function ProjectFigure({ index }: { index: number }) {
  if (index === 0) return (
    <svg viewBox="0 0 600 170" role="img" aria-label="Schematic: quadratic-program inputs pass through a dense KKT and LU reference route, then residual checks.">
      <defs><marker id="field-atlas-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10" className={styles.diagramLine} /></marker></defs>
      <g className={styles.diagramText}>
        <path d="M38 35H27V107H38M130 35H141V107H130" className={styles.diagramLine} />
        <text x="52" y="65" className={styles.diagramSymbol}>P</text><text x="102" y="65" className={styles.diagramSymbol}>q</text>
        <text x="52" y="95" className={styles.diagramSymbol}>A</text><text x="103" y="95" className={styles.diagramSymbol}>b</text>
        <path d="M158 73H214M396 73H449" className={styles.diagramLine} markerEnd="url(#field-atlas-arrow)" />
        <rect x="230" y="30" width="154" height="84" rx="2" className={styles.diagramBox} />
        <text x="307" y="62" textAnchor="middle" className={styles.diagramHeading}>Dense KKT</text>
        <text x="307" y="87" textAnchor="middle">LU factorization</text>
        <text x="477" y="54" className={styles.diagramResidual}>rₚ</text><text x="528" y="54" className={styles.diagramResidual}>r𝒹</text>
        <path d="M471 72H555M471 94H539" className={styles.diagramLine} />
        <text x="82" y="146" textAnchor="middle">QP inputs</text>
        <text x="307" y="146" textAnchor="middle">Reference route</text>
        <text x="516" y="146" textAnchor="middle">Residual checks</text>
      </g>
    </svg>
  );
  if (index === 1) return (
    <svg viewBox="0 0 600 180" role="img" aria-label="Illustrative route repair: preserve two commitments while changing an intermediate stop. No measured route data is shown.">
      <g className={styles.diagramText}>
        <text x="18" y="25">BEFORE</text><text x="18" y="118" className={styles.diagramAccent}>REPAIR</text>
        <path d="M65 61L197 30L340 75L524 45" className={styles.beforeRoute} />
        <path d="M65 148Q123 119 197 128Q266 142 341 113Q408 118 524 139" className={styles.afterRoute} />
        {[[65, 61], [197, 30], [340, 75], [524, 45]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" className={styles.beforeStop} />)}
        {[[65, 148], [197, 128], [341, 113], [524, 139]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" className={styles.afterStop} />)}
        <path d="M197 39V118M524 54V129" className={styles.keptGuides} />
        <text x="197" y="166" textAnchor="middle">kept</text>
        <text x="341" y="149" textAnchor="middle" className={styles.diagramAccent}>changed</text>
        <text x="524" y="165" textAnchor="middle">kept</text>
      </g>
    </svg>
  );
  return (
    <svg viewBox="0 0 600 165" role="img" aria-label="Symbolic query budget: pilot, low-rank approximation, and residual estimation. Segment widths are illustrative, not experimental measurements.">
      <g className={styles.diagramText}>
        <path d="M30 28V19H555V28" className={styles.diagramLine} />
        <text x="293" y="12" textAnchor="middle">One fixed query budget</text>
        <rect x="30" y="47" width="111" height="51" className={styles.pilotBlock} />
        <rect x="145" y="47" width="189" height="51" className={styles.rankBlock} />
        <rect x="338" y="47" width="217" height="51" className={styles.residualBlock} />
        <text x="86" y="77" textAnchor="middle" className={styles.blockLightText}>Pilot</text>
        <text x="239" y="77" textAnchor="middle" className={styles.blockInkText}>Low-rank</text>
        <text x="447" y="77" textAnchor="middle" className={styles.blockLightText}>Residual</text>
        <text x="86" y="126" textAnchor="middle">Choose</text>
        <text x="239" y="126" textAnchor="middle">Approximate</text>
        <text x="447" y="126" textAnchor="middle">Estimate</text>
      </g>
    </svg>
  );
}

export function FieldAtlas({ fontClassName }: { fontClassName: string }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", dark);
    const timer = window.setTimeout(() => setIsDark(dark), 0);
    return () => clearTimeout(timer);
  }, []);

  function toggleTheme() {
    const dark = !isDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }

  return (
    <div className={`${styles.atlas} ${fontClassName}`} data-theme={isDark ? "dark" : "light"}>
      <a href="#field-atlas-content" className={styles.skipLink}>Skip to content</a>
      <header className={styles.header}>
        <div className={styles.masthead}>
          <Link href="/" className={styles.brand} aria-label="Ztang Yit Xiaang — current website">
            <span>{resumeData.title}<span className={styles.accent}>.</span></span>
            <span className={styles.identity}>{resumeData.subtitle}</span>
          </Link>
          <nav className={styles.navigation} aria-label="Field Atlas navigation">
            <a href="#work">Research</a><a href="#beyond">Beyond</a><a href="#notes">Notes</a><a href="#academic">Academic</a>
          </nav>
          <div className={styles.headerActions}>
            <a href={resumeData.resumeUrl} className={styles.headerCv}>CV <ArrowUpRight size={14} aria-hidden="true" /></a>
            <CommandMenu onSelectTab={() => undefined} onToggleTheme={toggleTheme} isDark={isDark} />
            <button type="button" className={styles.themeButton} onClick={toggleTheme} aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}>
              {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
      <main id="field-atlas-content" className={styles.main} tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="field-atlas-title">
          <div>
            <p className={styles.eyebrow}>Research, software & observation</p>
            <h1 id="field-atlas-title" className={styles.heroTitle}>The geometry<br /><em>of curiosity.</em></h1>
            <p className={styles.biography}>I study randomized algorithms and numerical optimization at the University of Minnesota, and build software that makes those ideas inspectable.</p>
            <div className={styles.heroActions}>
              <a href="#work" className={styles.textLink}>Explore selected work <ArrowDownRight size={17} aria-hidden="true" /></a>
              <a href={resumeData.resumeUrl} className={styles.textLink}>Download CV <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
            <p className={styles.cultureMark}>{resumeData.cultureMark}</p>
          </div>
          <OptimizationLandscape />
        </section>
        <div className={styles.authorLine}>
          <span>{resumeData.location}</span><span>Randomized algorithms · Numerical optimization</span><span>Field Atlas / Design preview</span>
        </div>
        <section id="work" className={styles.work} aria-labelledby="field-work-heading">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>Selected research & engineering</p><h2 id="field-work-heading">Questions, built into systems.</h2></div>
            <Link href="/portfolio/" className={styles.textLink}>All projects <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          {resumeData.projects.slice(0, 3).map((project, index) => (
            <article className={styles.project} key={project.link}>
              <div>
                <p className={styles.projectIndex}><span>{String(index + 1).padStart(2, "0")}</span>{project.category} · {project.status}</p>
                <h3><Link href={project.link}>{project.title}</Link></h3>
                <p className={styles.question}>{questions[index]}</p>
                <dl className={styles.projectEvidence}>
                  <div><dt>My contribution</dt><dd>{project.contribution}</dd></div>
                  <div><dt>Current evidence & limits</dt><dd>{project.evidence}</dd></div>
                </dl>
                <div className={styles.projectLinks}>
                  <Link href={project.link} className={styles.textLink}>Read case study <ArrowUpRight size={16} aria-hidden="true" /></Link>
                  <a href={project.repository} target="_blank" rel="noreferrer" className={styles.quietLink}>Source repository ↗</a>
                </div>
              </div>
              <figure className={styles.projectFigure}><ProjectFigure index={index} /><figcaption>{captions[index]}</figcaption></figure>
            </article>
          ))}
        </section>
        <section id="beyond" className={styles.beyond} aria-labelledby="field-beyond-heading">
          <p className={styles.eyebrow}>A different kind of observation</p>
          <h2 id="field-beyond-heading" className={styles.sectionTitle}>Beyond the Equations</h2>
          <div className={styles.cultureStory}>
            <div><h3>Language is a form of belonging.</h3><p>My Wenzhounese and Rui’anese input tools use phonetic schemas and dialect dictionaries for the Rime input engine. Photography is another part of this visual journal: places, people, and quiet distances.</p></div>
            <div className={styles.cultureLinks}>
              <Link href="/portfolio/wenzhounese-input-method/" className={styles.textLink}>Explore language tools <ArrowUpRight size={17} aria-hidden="true" /></Link>
              <Link href="/?tab=about#language-culture-heading" className={styles.quietLink}>Culture & language ↗</Link>
            </div>
          </div>
          <div className={styles.galleryPreview}><EditorialPhotography preview /></div>
          <div className={styles.galleryMore}><p>A selection from the visual journal.</p><Link href="/?tab=photography" className={styles.textLink}>Browse all {resumeData.photography.length} photographs <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </section>
        <section id="notes" className={styles.notes} aria-labelledby="field-notes-heading">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>Work in thought</p><h2 id="field-notes-heading">From the notebook</h2></div>
            <Link href="/?tab=blog" className={styles.textLink}>All notes <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          {resumeData.blog.slice(0, 3).map(post => (
            <article className={styles.note} key={post.slug}>
              <time>{post.date}</time><div><h3><Link href={post.link}>{post.title}</Link></h3><p>{post.summary}</p></div><Link href={post.link} aria-label={`Read ${post.title}`}><ArrowUpRight size={22} aria-hidden="true" /></Link>
            </article>
          ))}
        </section>
        <section id="academic" className={styles.academic} aria-labelledby="field-academic-heading">
          <div className={styles.author}>
            <Image src={resumeData.avatar} alt="Portrait of Ztang Yit Xiaang" width={88} height={88} />
            <div><p className={styles.eyebrow}>Academic record</p><h2 id="field-academic-heading">{resumeData.title}</h2><p>{resumeData.education[0].degree}<br />{resumeData.education[0].institution}</p></div>
          </div>
          <nav className={styles.academicLinks} aria-label="Academic details">
            <Link href="/?tab=about#cv">Education, experience & teaching ↗</Link>
            <Link href="/?tab=research">Publications & project report ↗</Link>
            <a href={resumeData.resumeUrl}>Full CV (PDF) ↗</a>
          </nav>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div><h2>Let’s compare notes.</h2><a className={styles.email} href={`mailto:${resumeData.email}`}>{resumeData.email} ↗</a></div>
          <nav aria-label="Professional and personal links">
            <a href={resumeData.socials.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={resumeData.socials.googlescholar} target="_blank" rel="noreferrer">Google Scholar ↗</a>
            <a href={resumeData.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={resumeData.socials.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
          </nav>
        </div>
        <div className={styles.availability}><LiveStatus /></div>
        <div className={styles.colophon}><span>© 2026 {resumeData.title}</span><Link href="/">View the current website ↗</Link><span>The Geometry of Curiosity / Field Atlas</span></div>
      </footer>
    </div>
  );
}
