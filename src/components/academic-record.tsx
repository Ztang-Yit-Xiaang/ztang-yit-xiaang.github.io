import { getResumeData, localePath, t, type Locale } from "@/lib/i18n";
import Link from "next/link";

import { WenzhouneseTrick } from "@/components/wenzhounese-trick";

const milestones = [
  { year: "2026", text: "Summer research assistant work with Prof. Swati Padmanabhan and Prof. Ju Sun at UMN." },
  { year: "2026", text: "Found a supervisor for the itinerary/context-aware planner project with Prof. Seongjin Choi." },
  { year: "2026", text: "Independent study in randomized matrix algorithms." },
  { year: "2025", text: "Teaching assistant (CSCI 2081) at the University of Minnesota." },
];

export function AcademicRecord({ preview = false, locale = "en" }: { preview?: boolean; locale?: Locale }) {
const resumeData=getResumeData(locale);
  const teaching = preview ? [{ ...resumeData.teaching[0], period: "Fall 2025 – Fall 2026" }] : resumeData.teaching;
  return (
    <div className={preview ? "reference-home-record" : "reference-full-record"}>
      <aside className="record-culture" aria-labelledby="record-culture-title">
        <div><p className="kicker">{t(locale,"Language and culture")}</p><h2 id="record-culture-title">{resumeData.cultureMark}</h2><p>{t(locale,"Language tools, Wenzhounese culture, and everyday expression.")}</p></div>
        <WenzhouneseTrick locale={locale} />
      </aside>
      <div className="record-columns">
        <div className="record-sidebar">
          <section aria-labelledby="record-education">
            <h2 className="record-heading" id="record-education">{t(locale,"Education")}</h2>
            <ol className="record-timeline">{resumeData.education.slice(0, preview ? 1 : undefined).map(entry =>
              <li className="record-entry" key={entry.institution}>
                <div className="record-entry-head"><h3>{entry.institution}</h3><span className="record-date">{t(locale,entry.period)}</span></div>
                <p className="record-degree">{entry.degree}</p><p className="record-location">{entry.location}</p><p className="record-gpa">{entry.gpa}</p>
              </li>)}</ol>
          </section>
          <section className="record-teaching" aria-labelledby="record-teaching">
            <h2 className="record-heading" id="record-teaching">{t(locale,"Teaching")}</h2>
            <div className="teaching-stack">{teaching.map(entry =>
              <article className="record-teaching-card" key={entry.period}>
                <div className="record-entry-head"><h3>{entry.course}</h3><span className="record-date">{t(locale,entry.period)}</span></div>
                <p className="record-role">{entry.role} · {entry.institution}</p><p>{entry.description}</p>
              </article>)}</div>
          </section>
        </div>
        <section className="record-research" id="research" aria-labelledby="record-research">
          <h2 className="record-heading" id="record-research">{t(locale,"Research Experience")}</h2>
          <ol className="record-timeline">{resumeData.experience.slice(0, preview ? 3 : undefined).map(entry =>
            <li className="record-entry" key={entry.role + entry.organization}>
              <div className="record-entry-head"><h3>{entry.role}</h3><span className="record-date">{t(locale,entry.period)}</span></div>
              <p className="record-organization">{entry.organization}</p>
              <ul className="record-bullets">{entry.bullets.slice(0, preview ? 1 : undefined).map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
            </li>)}</ol>
          {preview && <div className="record-more"><Link className="text-link" href={localePath(locale,"/academic/#research")}>{t(locale,"All research experience")}<span aria-hidden="true">↗</span></Link></div>}
        </section>
      </div>
      <section className="record-milestones" aria-labelledby="record-milestones">
        <h2 className="record-heading" id="record-milestones">{t(locale,"Highlights & Milestones")}{locale==="en"&&<span lang="zh-Hant">/ 歷程里程碑</span>}</h2>
        <div className="milestone-grid">{milestones.map(item =>
          <article className="milestone-item" key={item.text}><time>{item.year}</time><p>{t(locale,item.text)}</p></article>)}</div>
      </section>
      {preview && <div className="record-more"><Link className="text-link" href={localePath(locale,"/academic/")}>{t(locale,"Full academic record & CV")}<span aria-hidden="true">↗</span></Link></div>}
    </div>
  );
}
