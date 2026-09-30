"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { resumeData } from "@/data/resume";

export function ProjectsPortfolio() {
  const [category, setCategory] = useState("All work");
  const [query, setQuery] = useState("");
  const categories = ["All work", ...new Set(resumeData.projects.map(p => p.category))];
  const projects = resumeData.projects.filter(project =>
    (category === "All work" || project.category === category) &&
    [project.title, project.description, project.contribution, ...project.skills].join(" ").toLowerCase().includes(query.trim().toLowerCase())
  );
  return (
    <section className="work-portfolio" aria-labelledby="work-heading">
      <header className="work-intro">
        <div>
          <p className="work-eyebrow">Selected work / 2025–2026</p>
          <h1 id="work-heading">Algorithms, built into<br /><em>working systems.</em></h1>
          <p className="work-lede">I work where mathematical ideas meet software: numerical solvers, randomized algorithms, and decision tools people can inspect and use.</p>
          <div className="work-intro-links">
            <a href={resumeData.resumeUrl}>Download CV <ArrowUpRight size={15} aria-hidden="true" /></a>
            <a href={`mailto:${resumeData.email}`}>Let’s talk <ArrowUpRight size={15} aria-hidden="true" /></a>
            <Link href="/portfolio/">Portfolio permalink <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
        <aside className="work-note" aria-label="My approach">
          <span className="work-eyebrow">From idea to evidence</span>
          <p>Model the problem.<br />Build the implementation.<br />Check what the results support.</p>
          <span>Research & engineering · University of Minnesota</span>
        </aside>
      </header>
      <div className="work-tools">
        <div className="work-filters" aria-label="Filter projects by field">
          {categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <label className="work-search"><Search size={17} aria-hidden="true" /><span className="sr-only">Search projects and skills</span><input type="search" placeholder="Search projects or skills" value={query} onChange={e => setQuery(e.target.value)} /></label>
      </div>
      <p className="work-count" aria-live="polite">{projects.length} {projects.length === 1 ? "project" : "projects"} · implementation, contribution, and current evidence</p>
      <div className="work-grid">
        {projects.map(project => <article className="work-project" key={project.link}>
          <div className="work-project-top"><span>{project.category}</span><span className="work-status">{project.status}</span></div>
          <h3><Link href={project.link}>{project.title}</Link></h3>
          <p className="work-description">{project.description}</p>
          <dl><div><dt>My contribution</dt><dd>{project.contribution}</dd></div><div><dt>Current evidence</dt><dd>{project.evidence}</dd></div></dl>
          <ul className="work-skills" aria-label="Skills and tools">{project.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
          <div className="work-project-links"><Link href={project.link}>Read case study <ArrowRight size={16} aria-hidden="true" /></Link><a href={project.repository} target="_blank" rel="noreferrer">{project.repositoryLabel ?? "GitHub repository"} <ArrowUpRight size={15} aria-hidden="true" /></a></div>
        </article>)}
      </div>
      {projects.length === 0 && <div className="work-empty"><h3>No matching projects</h3><p>Try a skill such as Python, optimization, or visualization.</p><button type="button" onClick={() => {setQuery("");setCategory("All work");}}>Clear search and filters</button></div>}
    </section>
  );
}
