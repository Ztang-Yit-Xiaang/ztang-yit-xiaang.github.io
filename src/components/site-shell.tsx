"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { CommandMenu } from "@/components/command-menu";
import { LiveStatus } from "@/components/live-status";
import { localeFromPath, withoutLocale, localePath, t, type Locale } from "@/lib/i18n";
import { resumeData } from "@/data/resume";

const pages = [
  ["/", "Home"], ["/work/", "Work"], ["/photography/", "Photography"],
  ["/beyond/", "Beyond"], ["/notes/", "Notes"], ["/academic/", "Academic / CV"],
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const route = usePathname();
  const locale = localeFromPath(route);
  const pathname = withoutLocale(route);
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsDark(document.documentElement.classList.contains("dark")), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (!tab) return;
    const destinations: Record<string, string> = {
      projects: "/work/", photography: "/photography/", blog: "/notes/",
      research: "/academic/#publications", about: "/beyond/",
    };
    let destination = destinations[tab];
    if (tab === "about" && window.location.hash === "#cv") destination = "/academic/#cv";
    if (tab === "about" && window.location.hash === "#language-culture-heading") destination = "/beyond/#language-culture";
    if (destination) router.replace(localePath(locale,destination));
  }, [pathname, router, locale]);

  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  function toggleTheme() {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch { /* The theme still works when storage is unavailable. */ }
  }

  if (pathname.startsWith("/field-atlas")) return <>{children}</>;
  const home = pathname === "/";
  const active = (href: string) => href === "/" ? home : pathname.startsWith(href) || (href === "/work/" && pathname.startsWith("/portfolio/")) || (href === "/notes/" && pathname.startsWith("/blog/"));

  return (
    <div lang={locale} data-locale={locale} className={`world ${home ? "reference-home unified-page" : "reference-academic"}`}>
      <a className="skip" href="#main-content">{t(locale,"Skip to content")}</a>
      <header className="world-wrap masthead">
        <Link className="brand" href={localePath(locale,"/")} aria-label={t(locale,"Ztang Yit Xiaang — Home")}>
          <span className="seal" aria-hidden="true">陳</span>
          <span><span className="brand-name">{t(locale,"Ztang Yit Xiaang.")}</span><span className="brand-note">{t(locale,"A personal field atlas")}</span></span>
        </Link>
        <nav className="navigation" aria-label={t(locale,"Main navigation")}>
          {pages.map(([href, label]) => <Link key={href} href={localePath(locale,href)} className={active(href) ? "current" : undefined} aria-current={active(href) ? "page" : undefined}>{t(locale,label)}</Link>)}
        </nav>
        <div className="site-actions">
          <LanguageSwitch locale={locale} pathname={pathname} className="desktop-language" />
          <CommandMenu locale={locale} onToggleTheme={toggleTheme} isDark={isDark} />
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={t(locale,`Switch to ${isDark ? "light" : "dark"} theme`)}>{isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}</button>
        </div>
        <details className="mobile-menu" ref={menu} onKeyDown={event => {
          if (event.key === "Escape") { menu.current!.open = false; menu.current?.querySelector("summary")?.focus(); }
        }}>
          <summary>{t(locale,"Explore")}</summary>
          <nav aria-label={t(locale,"Mobile navigation")} onClick={() => { if (menu.current) menu.current.open = false; }}>
            {pages.map(([href, label]) => <Link key={href} href={localePath(locale,href)} aria-current={active(href) ? "page" : undefined}>{t(locale,label)}</Link>)}
          </nav>
        </details>
        <nav className="mobile-shortcuts" aria-label={t(locale,"Quick navigation")}>
          <Link href={localePath(locale,"/work/")}>{t(locale,"Work")}</Link><Link href={localePath(locale,"/photography/")}>{t(locale,"Photography")}</Link><Link href={localePath(locale,"/beyond/")}>{t(locale,"Beyond")}</Link><a href={resumeData.resumeUrl}>{t(locale,"CV ↗")}</a><LanguageSwitch locale={locale} pathname={pathname} className="mobile-language" />
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="world-wrap world-footer">
        <div className="footer-status"><LiveStatus locale={locale} /><a className="text-link" href={resumeData.resumeUrl}>{t(locale,"Download CV (PDF) ↗")}</a></div>
        <div className="footer">
          <span>© {new Date().getFullYear()} {resumeData.title}</span>
          <span className="folio-note">{t(locale,"The geometry of curiosity. The shape of a life.")}</span>
          <nav aria-label={t(locale,"Social links")}>
            <a href={resumeData.socials.github}>{t(locale,"GitHub ↗")}</a><a href={resumeData.socials.googlescholar}>{t(locale,"Scholar ↗")}</a><a href={resumeData.socials.linkedin}>{t(locale,"LinkedIn ↗")}</a><a href={resumeData.socials.instagram}>{t(locale,"Instagram ↗")}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function LanguageSwitch({locale,pathname,className}:{locale:Locale;pathname:string;className:string}) {
  const router=useRouter();
  return <nav className={"language-switch "+className} aria-label={locale==="en"?"Language":"語言"}>{(["en","zh-Hant"] as const).map(value=><Link key={value} href={localePath(value,pathname)} hrefLang={value} lang={value} aria-current={locale===value?"page":undefined} aria-label={value==="en"?"View this page in English":"以繁體中文閱讀此頁"} onClick={event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();router.push(localePath(value,pathname)+window.location.search+window.location.hash);}}>{value==="en"?"EN":"中"}</Link>)}</nav>;
}
