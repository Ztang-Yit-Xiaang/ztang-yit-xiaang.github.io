"use client";

import { getResumeData, localePath, t, type Locale } from "@/lib/i18n";


import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { ProjectFigure } from "@/components/project-figure";


export function ProjectsPortfolio({locale="en"}:{locale?:Locale}) {
const resumeData=getResumeData(locale);
  const [category, setCategory] = useState("All work");
  const [query, setQuery] = useState("");
  const categories = ["All work", ...new Set(resumeData.projects.map(p => p.category))];
  const projects = resumeData.projects.filter(project =>
    (category === "All work" || project.category === category) &&
    [project.title, project.description, project.contribution, ...project.skills, ...Object.values(getResumeData("en").projects.find(p=>p.link===project.link)!).filter(v=>typeof v==="string")].join(" ").toLowerCase().includes(query.trim().toLowerCase())
  );
  return <section className="work-portfolio" aria-labelledby="work-heading">
    <header className="work-intro"><div><p className="work-eyebrow">{t(locale,"Research & engineering")}</p><h1 id="work-heading">{t(locale,"Questions, built")}<br />{" "}<em>{t(locale,"into systems.")}</em></h1><p className="work-lede">{t(locale,"I work where mathematical ideas meet software: numerical solvers, randomized algorithms, and decision tools people can inspect and use.")}</p><div className="work-intro-links"><a href={resumeData.resumeUrl}>{t(locale,"Download CV ↗")}</a><a href={`mailto:${resumeData.email}`}>{t(locale,"Let’s talk ↗")}</a><Link href={localePath(locale,"/work/optimization-playground/")}>{t(locale,"Optimization playground ↗")}</Link></div></div><aside className="work-note"><span className="work-eyebrow">{t(locale,"From idea to evidence")}</span><p>{t(locale,"Model the problem.")}<br />{t(locale,"Build the implementation.")}<br />{t(locale,"Check what the results support.")}</p><span>{t(locale,"Research & engineering · University of Minnesota")}</span></aside></header>
    <div className="work-tools"><div className="work-filters" aria-label={t(locale,"Filter projects by field")}>{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{t(locale,item)}</button>)}</div><label className="work-search"><Search size={17} aria-hidden="true" /><span className="sr-only">{t(locale,"Search projects and skills")}</span><input type="search" placeholder={t(locale,"Search projects or skills")} value={query} onChange={e => setQuery(e.target.value)} /></label></div>
    <p className="work-count" aria-live="polite">{projects.length} {t(locale,projects.length === 1 ? "project" : "projects")} {t(locale,"· contribution, evidence, and current limits")}</p>
    <div className="work-grid">{projects.map(project => {
      const index = resumeData.projects.indexOf(project);
      return <article className="work-project" key={project.link}>
        <div className="work-project-top"><span>{project.category}</span><span className="work-status">{project.status}</span></div>
        <div className="work-project-main"><h2><Link href={localePath(locale,project.link + "/")}>{project.title}</Link></h2><p className="work-description">{project.description}</p>
          {index < 3 && <figure className="project-diagram work-figure"><ProjectFigure locale={locale} index={index} /><figcaption>{t(locale,["Schematic / from inputs to checks", "Illustrative repair / preserve commitments", "Symbolic budget / no measured proportions"][index])}</figcaption></figure>}
          <ul className="work-skills" aria-label={t(locale,"Skills and tools")}>{project.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
        </div>
        <dl><div><dt>{t(locale,"My contribution")}</dt><dd>{project.contribution}</dd></div><div><dt>{t(locale,"Current evidence & limits")}</dt><dd>{project.evidence}</dd></div></dl>
        <div className="work-project-links"><Link href={localePath(locale,project.link + "/")}>{t(locale,"Read case study ↗")}</Link><a href={project.repository} target="_blank" rel="noreferrer">{project.repositoryLabel ?? "GitHub repository"} ↗</a></div>
      </article>;
    })}</div>
    {projects.length === 0 && <div className="work-empty"><h2>{t(locale,"No matching projects")}</h2><p>{t(locale,"Try a skill such as Python, optimization, or visualization.")}</p><button type="button" onClick={() => { setQuery(""); setCategory("All work"); }}>{t(locale,"Clear search and filters")}</button></div>}
  </section>;
}
