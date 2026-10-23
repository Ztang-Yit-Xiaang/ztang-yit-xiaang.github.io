"use client";

import { getResumeData, t, type Locale } from "@/lib/i18n";


import { useEffect, useRef, useState } from "react";


export function Publications({locale="en"}:{locale?:Locale}) {
const resumeData=getResumeData(locale);
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copy(id: string, bibtex: string) {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(id); setError("");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(""), 2500);
    } catch { setError("Copy is unavailable. Open BibTeX below to select the text."); }
  }
  return <section className="publications" id="publications" aria-labelledby="publications-heading">
    <p className="kicker red">{t(locale,"Technical writing")}</p><h2 id="publications-heading">{t(locale,"Publications & project report")}</h2>
    <p className="section-description">{t(locale,"The venue and document type are listed with each entry.")}</p>
    <p role="status">{t(locale,error || (copied ? "BibTeX copied." : ""))}</p>
    {resumeData.publications.map(pub => <article className="publication" key={pub.id}>
      <div className="publication-meta"><span>{pub.venue}</span><span>{pub.year}</span></div>
      <h3>{pub.title}</h3><p>{pub.authors}</p><p>{pub.description}</p>
      <div className="publication-links">
        <button type="button" onClick={() => copy(pub.id, pub.bibtex)}>{t(locale,copied === pub.id ? "BibTeX copied ✓" : "Copy BibTeX")}</button>
        {pub.pdf && <a href={pub.pdf} target="_blank" rel="noreferrer">{t(locale,"Read PDF ↗")}</a>}
        {pub.url && <a href={pub.url} target="_blank" rel="noreferrer">{t(locale,"Read paper ↗")}</a>}
      </div>
      <details><summary>{t(locale,"BibTeX")}</summary><pre><code>{pub.bibtex}</code></pre></details>
    </article>)}
  </section>;
}
