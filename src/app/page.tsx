"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { resumeData } from "@/data/resume";
import {
  Mail,
  GraduationCap,
  Briefcase,
  MapPin,
  ExternalLink,
  Sun,
  Moon,
  BookOpen,
  FlaskConical,
  Search,
  Calendar,
  Sparkles,
  School,
  FileText,
  Camera
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

// Inline SVG brand icons since they are missing in this lucide-react version
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface FoodParticle {
  id: number;
  icon: string;
  name: string;
  side: "left" | "right";
  top: string;
  randomX: number;
  randomY: number;
  randomRotate: number;
  delay: number;
}

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const [projectFilter, setProjectFilter] = useState("All");
  const [projectSearch, setProjectSearch] = useState("");

  // Food Confetti Easter Egg State
  const [foodParticles, setFoodParticles] = useState<FoodParticle[]>([]);

  const handleCultureClick = () => {
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 18;

    const dayFoods = [
      { name: "溫州糯米飯", icon: "🍚" },
      { name: "燈盞糕", icon: "🫓" },
      { name: "江蟹生", icon: "🦀" },
      { name: "溫州餛飩", icon: "🍜" },
      { name: "豬臟粉", icon: "🍜" }
    ];

    const nightFoods = [
      { name: "油蔥鯧魚", icon: "🐟" },
      { name: "桂圓荷包蛋湯", icon: "🍳" },
      { name: "溫州魚餅", icon: "🍥" },
      { name: "血蛤", icon: "🐚" }
    ];

    const pool = isDay ? dayFoods : nightFoods;
    const newParticles: FoodParticle[] = [];

    // Spawn 10 particles (5 from left, 5 from right)
    for (let i = 0; i < 10; i++) {
      const food = pool[Math.floor(Math.random() * pool.length)];
      const side = i < 5 ? "left" : "right";
      newParticles.push({
        id: Date.now() + i + Math.random(),
        icon: food.icon,
        name: food.name,
        side,
        top: `${15 + Math.random() * 70}%`, // Random height from 15% to 85%
        randomX: Math.random(),
        randomY: Math.random(),
        randomRotate: -180 + Math.random() * 360,
        delay: Math.random() * 0.4, // Staggered delay
      });
    }

    setFoodParticles((prev) => [...prev, ...newParticles]);

    // Clean up particles after 2.5 seconds
    setTimeout(() => {
      setFoodParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 2500);
  };

  useEffect(() => {
    const shouldUseDark = localStorage.getItem("theme") !== "light";
    document.documentElement.classList.toggle("dark", shouldUseDark);
    const frame = window.requestAnimationFrame(() => setIsDark(shouldUseDark));
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };


  const openProfileSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    setActiveTab("about");
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };  // Get unique categories for projects
  const projectCategories = ["All", ...Array.from(new Set(resumeData.projects.map(p => p.category)))];

  // Filter and search projects
  const filteredProjects = resumeData.projects.filter(project => {
    const matchesCategory = projectFilter === "All" || project.category === projectFilter;
    const matchesSearch = project.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
                          project.description.toLowerCase().includes(projectSearch.toLowerCase()) ||
                          project.category.toLowerCase().includes(projectSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-zinc-50/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-cinnabar to-indigo-500 bg-clip-text text-transparent dark:from-cinnabar dark:to-indigo-400">
              {resumeData.title}
            </span>
            <span className="text-xs text-zinc-500 dark:text-slate-400 hidden sm:inline-block">
              {resumeData.kicker}
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <div className="hidden md:flex gap-1 text-sm font-medium">
              <button
                onClick={() => setActiveTab("about")}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === "about" ? "bg-zinc-200/60 dark:bg-slate-800 text-zinc-950 dark:text-slate-50" : "text-zinc-600 dark:text-slate-400 hover:text-zinc-950 dark:hover:text-slate-100"}`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === "projects" ? "bg-zinc-200/60 dark:bg-slate-800 text-zinc-950 dark:text-slate-50" : "text-zinc-600 dark:text-slate-400 hover:text-zinc-950 dark:hover:text-slate-100"}`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab("research")}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === "research" ? "bg-zinc-200/60 dark:bg-slate-800 text-zinc-950 dark:text-slate-50" : "text-zinc-600 dark:text-slate-400 hover:text-zinc-950 dark:hover:text-slate-100"}`}
              >
                Research
              </button>
              <button
                onClick={() => setActiveTab("photography")}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === "photography" ? "bg-zinc-200/60 dark:bg-slate-800 text-zinc-950 dark:text-slate-50" : "text-zinc-600 dark:text-slate-400 hover:text-zinc-950 dark:hover:text-slate-100"}`}
              >
                Photography
              </button>
              <button
                onClick={() => setActiveTab("blog")}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === "blog" ? "bg-zinc-200/60 dark:bg-slate-800 text-zinc-950 dark:text-slate-50" : "text-zinc-600 dark:text-slate-400 hover:text-zinc-950 dark:hover:text-slate-100"}`}
              >
                Blog
              </button>
            </div>

            {/* Light/Dark Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-xs transition-colors hover:bg-zinc-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-indigo-600" />}
            </button>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-zinc-200 py-14 dark:border-slate-900 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-slate-100),theme(colors.white))] opacity-30 dark:bg-[radial-gradient(45rem_50rem_at_top,rgba(180,91,63,0.08),theme(colors.slate.950))] dark:opacity-100" />

        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
            <div className="min-w-0">
              <p className="mb-5 text-sm font-bold tracking-wide text-cinnabar">
                {resumeData.title}
                <span className="ml-2 font-medium text-zinc-500 dark:text-slate-400">
                  {resumeData.subtitle}
                </span>
              </p>

              <h1 className="max-w-[16ch] text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-zinc-950 dark:text-slate-50 sm:text-5xl lg:text-6xl">
                I build randomized and optimization methods for scalable scientific computing.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-slate-300 sm:text-lg">
                Data Science and Mathematics at UMN, working across randomized linear algebra, differentiable optimization, and sensor-driven modeling.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#featured-research" className="inline-flex items-center justify-center rounded-lg bg-cinnabar px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cinnabar/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar dark:text-slate-950">
                  Explore Research
                </a>
                <a href="#cv" onClick={(event) => openProfileSection(event, "cv")} className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-400 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar dark:border-slate-700 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-900">
                  Read CV
                </a>
              </div>

              <nav aria-label="Professional links" className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-zinc-500 dark:text-slate-400">
                <a href={resumeData.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-zinc-950 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar dark:hover:text-slate-100">
                  <GithubIcon className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
                <a href={resumeData.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-zinc-950 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar dark:hover:text-slate-100">
                  <LinkedinIcon className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
                <a href={resumeData.socials.googlescholar} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-zinc-950 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar dark:hover:text-slate-100">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                  Google Scholar
                </a>
                <a href={`mailto:${resumeData.email}`} className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-zinc-950 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar dark:hover:text-slate-100">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Contact
                </a>
              </nav>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="h-[220px] w-[220px] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 shadow-sm dark:border-slate-800 dark:bg-slate-800 sm:h-[240px] sm:w-[240px]">
                <Image src={resumeData.avatar} alt="Portrait of Ztang Yit Xiaang" width={240} height={240} className="h-full w-full object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-research" aria-labelledby="featured-research-heading" className="scroll-mt-24 border-b border-zinc-200 bg-white/40 py-10 dark:border-slate-900 dark:bg-slate-950/40 md:py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cinnabar">Featured research</p>
            <h2 id="featured-research-heading" className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 dark:text-slate-50">Methods in practice</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <article className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-slate-50">
                <Link href="/portfolio/randomized-sketching" className="rounded-sm underline-offset-4 hover:text-cinnabar hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cinnabar">Randomized Linear Algebra</Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-slate-300">Built leverage-score sampling and sketching pipelines to benchmark speed–accuracy tradeoffs in large-scale regression.</p>
            </article>

            <article className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-6 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-slate-50">
                <Link href="/portfolio/osqp-method-in-torch" className="rounded-sm underline-offset-4 hover:text-cinnabar hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cinnabar">Differentiable Optimization</Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-slate-300">Developed PyTorch-based OSQP components and identified sparsity loss and dense solves as key scalability bottlenecks.</p>
            </article>
          </div>
        </div>
      </section>
      {/* CORE CONTENT SWITCHER (TABS) */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">

          <TabsList className="grid grid-cols-5 w-full max-w-md mx-auto md:hidden bg-zinc-200/60 dark:bg-slate-900 p-1 rounded-xl">
            <TabsTrigger value="about" className="rounded-lg text-[10px] py-2">Profile</TabsTrigger>
            <TabsTrigger value="projects" className="rounded-lg text-[10px] py-2">Projects</TabsTrigger>
            <TabsTrigger value="research" className="rounded-lg text-[10px] py-2">Research</TabsTrigger>
            <TabsTrigger value="photography" className="rounded-lg text-[10px] py-2">Photos</TabsTrigger>
            <TabsTrigger value="blog" className="rounded-lg text-[10px] py-2">Blog</TabsTrigger>
          </TabsList>

          {/* TAB 1: PROFILE / ABOUT */}
          <TabsContent value="about" className="space-y-12 outline-hidden">

            <section aria-labelledby="language-culture-heading" className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white/60 p-5 dark:border-slate-800 dark:bg-slate-900/60 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-cinnabar">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Language and culture
                </p>
                <h2 id="language-culture-heading" className="mt-2 text-lg font-bold text-zinc-950 dark:text-slate-50">{resumeData.cultureMark}</h2>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-slate-400">Language technology and input tools grounded in Wenzhounese culture and everyday expression.</p>
              </div>
              {/* Wenzhounese Easter Egg Clickable Trigger */}
              <Dialog>
                <DialogTrigger
                  render={
                    <button
                      onClick={handleCultureClick}
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-cinnabar transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-800"
                    >
                      <span>Explore Wenzhounese</span>
                      <span className="text-[9px] bg-red-500/10 text-cinnabar px-1.5 py-0.5 rounded-full font-mono font-medium hover:bg-red-500/20 transition-colors">
                        Click Trick 💡
                      </span>
                    </button>
                  }
                />
                <DialogContent className="max-w-md bg-white dark:bg-slate-900 border-zinc-200 dark:border-slate-800">
                  <DialogHeader>
                    <span className="text-[10px] font-bold tracking-wider text-cinnabar uppercase font-mono">Wenzhounese Dialect Tricks / 溫州話小技巧</span>
                    <DialogTitle className="text-xl font-bold mt-1">甌語小詞典 & 趣事</DialogTitle>
                    <DialogDescription className="text-xs text-zinc-500 dark:text-slate-400 pt-1">
                      Wenzhounese (温州话/瓯语) is a Southern Wu Chinese language variety, famous for its extreme phonetic diversity and cultural heritage.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                    <div className="space-y-3">
                      <div className="p-3 bg-zinc-50 dark:bg-slate-950 rounded-lg space-y-1">
                        <span className="font-bold text-cinnabar text-sm">飯吃爻罷未？ (vo chi o baa mei)</span>
                        <p className="text-xs text-zinc-700 dark:text-slate-300"><strong>Meaning:</strong> Have you eaten?</p>
                        <p className="text-[11px] text-zinc-500 dark:text-slate-400">The most classic, warm daily greeting in Wenzhounese. Literally translates to &quot;Have you eaten rice yet?&quot;</p>
                      </div>

                      <div className="p-3 bg-zinc-50 dark:bg-slate-950 rounded-lg space-y-1">
                        <span className="font-bold text-cinnabar text-sm">你眙 (ni tshi)</span>
                        <p className="text-xs text-zinc-700 dark:text-slate-300"><strong>Meaning:</strong> You look (你看)</p>
                        <p className="text-[11px] text-zinc-500 dark:text-slate-400">Wenzhounese uses &quot;眙&quot; for &quot;look/see&quot;. Note that this is literal and does not mean hello.</p>
                      </div>

                      <div className="p-3 bg-zinc-50 dark:bg-slate-950 rounded-lg space-y-1">
                        <span className="font-bold text-cinnabar text-sm">甌越 (au-nyu)</span>
                        <p className="text-xs text-zinc-700 dark:text-slate-300"><strong>Meaning:</strong> Ou Yue</p>
                        <p className="text-[11px] text-zinc-500 dark:text-slate-400">The historical name of the Wenzhou region. Note that the Wenzhounese pronunciation of &quot;越&quot; is &quot;nyu&quot;.</p>
                      </div>

                      <div className="p-3 bg-zinc-50 dark:bg-slate-950 rounded-lg space-y-1">
                        <span className="font-bold text-cinnabar text-sm">天不怕地不怕，就怕温州人说温州话</span>
                        <p className="text-xs text-zinc-700 dark:text-slate-300"><strong>Meaning:</strong> Fear not heaven, fear not earth, only fear Wenzhou people speaking Wenzhounese.</p>
                        <p className="text-[11px] text-zinc-500 dark:text-slate-400">A famous nationwide saying in China. Because Wenzhounese is phonetically complex and highly divergent, it was used as an uncrackable military code language during WWII!</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </section>
            {/* Split layout: Education (Left) & Experience (Right) */}
            <div id="cv" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12">

              {/* Education (Left Column) */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 relative pl-4">
                    <div className="absolute left-0 top-1 w-1.5 h-6 bg-cinnabar rounded-full" />
                    <School className="h-5 w-5 text-cinnabar" />
                    <span>Education</span>
                  </h2>
                  <div className="h-0.5 w-16 bg-cinnabar mt-2" />
                </div>

                <div className="space-y-6">
                  {resumeData.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="relative pl-6 border-l border-zinc-200 dark:border-slate-800 space-y-2 group"
                    >
                      <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-zinc-300 dark:bg-slate-700 group-hover:bg-cinnabar transition-colors" />
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                        <h4 className="font-bold text-zinc-800 dark:text-slate-100">{edu.institution}</h4>
                        <span className="text-xs text-zinc-500 dark:text-slate-400 bg-zinc-200/50 dark:bg-slate-900 px-2 py-0.5 rounded-full font-mono">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-zinc-600 dark:text-slate-300">{edu.degree}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 dark:text-slate-400">{edu.location}</span>
                        <span className="font-bold text-cinnabar">{edu.gpa}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Teaching Section */}
                <div className="space-y-6 pt-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 relative pl-4">
                      <div className="absolute left-0 top-1 w-1.5 h-6 bg-cinnabar rounded-full" />
                      <BookOpen className="h-5 w-5 text-cinnabar" />
                      <span>Teaching History</span>
                    </h2>
                    <div className="h-0.5 w-16 bg-cinnabar mt-2" />
                  </div>

                  <div className="space-y-6">
                    {resumeData.teaching.map((teach, idx) => (
                      <div key={idx} className="bg-white dark:bg-slate-900 border border-zinc-200/60 dark:border-slate-900 p-5 rounded-xl space-y-2 shadow-xs">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-bold text-sm text-zinc-800 dark:text-slate-100">{teach.course}</h4>
                          <span className="text-[10px] font-mono bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 px-2 py-0.5 rounded-full">
                            {teach.period}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-zinc-500 dark:text-slate-400">{teach.role} · {teach.institution}</p>
                        <p className="text-xs text-zinc-600 dark:text-slate-400 leading-relaxed">{teach.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Research Experience Timeline (Right Column) */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 relative pl-4">
                    <div className="absolute left-0 top-1 w-1.5 h-6 bg-cinnabar rounded-full" />
                    <Briefcase className="h-5 w-5 text-cinnabar" />
                    <span>Research Experience</span>
                  </h2>
                  <div className="h-0.5 w-16 bg-cinnabar mt-2" />
                </div>

                <div className="relative border-l border-zinc-200 dark:border-slate-800 ml-4 pl-8 space-y-10">
                  {resumeData.experience.map((exp, idx) => (
                    <div key={idx} className="relative group space-y-2">
                      {/* Timeline dot */}
                      <div className="absolute -left-[38px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-slate-950 border border-zinc-300 dark:border-slate-700 group-hover:border-cinnabar group-hover:bg-zinc-50 dark:group-hover:bg-slate-900 transition-colors">
                        <div className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-slate-600 group-hover:bg-cinnabar transition-colors" />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                        <h3 className="text-lg font-bold text-zinc-950 dark:text-slate-50 leading-tight">
                          {exp.role}
                        </h3>
                        <span className="text-xs font-mono text-zinc-500 dark:text-slate-400 bg-zinc-200/50 dark:bg-slate-900 px-2 py-0.5 rounded-full shrink-0">
                          {exp.period}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-cinnabar">
                        {exp.organization}
                      </p>

                      <ul className="list-disc list-outside ml-4 text-sm text-zinc-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
                        {exp.bullets.map((bullet, bidx) => (
                          <li key={bidx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Highlights Section */}
            <div className="space-y-6 pt-12 border-t border-zinc-200 dark:border-slate-900">
              <div>
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 relative pl-4">
                  <div className="absolute left-0 top-1 w-1.5 h-6 bg-cinnabar rounded-full" />
                  <Sparkles className="h-5 w-5 text-cinnabar" />
                  <span>Highlights & Milestones / 歷程里程碑</span>
                </h2>
                <div className="h-0.5 w-16 bg-cinnabar mt-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 bg-white dark:bg-slate-900 border border-zinc-200/60 dark:border-slate-900 p-5 rounded-xl shadow-xs">
                  <span className="text-lg font-bold text-cinnabar font-mono shrink-0">2026</span>
                  <div className="text-sm text-zinc-600 dark:text-slate-400">
                    Summer research assistant work with Prof. Swati Padmanabhan and Prof. Ju Sun at UMN.
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white dark:bg-slate-900 border border-zinc-200/60 dark:border-slate-900 p-5 rounded-xl shadow-xs">
                  <span className="text-lg font-bold text-cinnabar font-mono shrink-0">2026</span>
                  <div className="text-sm text-zinc-600 dark:text-slate-400">
                    Found a supervisor for the itinerary/context-aware planner project with <strong>Prof. Seongjin Choi</strong>.
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white dark:bg-slate-900 border border-zinc-200/60 dark:border-slate-900 p-5 rounded-xl shadow-xs">
                  <span className="text-lg font-bold text-cinnabar font-mono shrink-0">2026</span>
                  <div className="text-sm text-zinc-600 dark:text-slate-400">
                    Independent study in randomized matrix algorithms.
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white dark:bg-slate-900 border border-zinc-200/60 dark:border-slate-900 p-5 rounded-xl shadow-xs">
                  <span className="text-lg font-bold text-cinnabar font-mono shrink-0">2025</span>
                  <div className="text-sm text-zinc-600 dark:text-slate-400">
                    Teaching assistant (CSCI 2081) at the University of Minnesota.
                  </div>
                </div>
              </div>
            </div>

          </TabsContent>

          {/* TAB 2: PROJECTS */}
          <TabsContent value="projects" className="space-y-8 outline-hidden">

            {/* Category Filter and Search Panel */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 rounded-xl border border-zinc-200/60 dark:border-slate-900 shadow-xs">

              {/* Category badges */}
              <div className="flex flex-wrap gap-2">
                {projectCategories.map((category, idx) => (
                  <button
                    key={idx}
                    onClick={() => setProjectFilter(category)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${projectFilter === category ? "bg-cinnabar text-white shadow-xs" : "bg-zinc-100 hover:bg-zinc-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-zinc-700 dark:text-slate-300"}`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-zinc-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full bg-zinc-100 focus:bg-white dark:bg-slate-800 dark:focus:bg-slate-950 border-0 focus:ring-2 focus:ring-cinnabar rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-800 dark:text-slate-100 placeholder-zinc-400 transition-all outline-hidden"
                />
              </div>

            </div>

            {/* Grid display of filtered projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, idx) => (
                <Card
                  key={idx}
                  className="bg-white dark:bg-slate-900/40 border-zinc-200/80 dark:border-slate-900/60 hover:border-cinnabar/60 hover:shadow-md hover:scale-[1.02] transition-all flex flex-col justify-between"
                >
                  <CardHeader className="pb-4">
                    <span className="text-[10px] font-bold tracking-wider text-cinnabar uppercase font-mono bg-red-50 dark:bg-red-950/20 px-2 py-0.5 rounded-full w-fit">
                      {project.category}
                    </span>
                    <CardTitle className="text-lg font-bold mt-2.5 line-clamp-1 leading-snug">
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-zinc-500 dark:text-slate-400 line-clamp-3 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    <Link
                      href={project.link}
                      className="w-full mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-slate-900 dark:hover:bg-slate-800 py-2.5 text-xs font-semibold transition-colors"
                    >
                      <span>Explore Details</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>

                  </CardContent>
                </Card>
              ))}

              {filteredProjects.length === 0 && (
                <div className="col-span-full py-16 text-center text-zinc-500 dark:text-slate-500">
                  <p className="text-lg font-semibold">No projects match your filter or search.</p>
                  <button
                    onClick={() => { setProjectFilter("All"); setProjectSearch(""); }}
                    className="mt-3 text-xs font-bold text-cinnabar hover:underline"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>

          </TabsContent>

          {/* TAB 3: RESEARCH & PUBLICATIONS */}
          <TabsContent value="research" className="space-y-8 outline-hidden">

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 relative pl-4">
                  <div className="absolute left-0 top-1 w-1.5 h-6 bg-cinnabar rounded-full" />
                  <FlaskConical className="h-5 w-5 text-cinnabar" />
                  <span>Selected Publications & Research Notes</span>
                </h2>
                <div className="h-0.5 w-16 bg-cinnabar mt-2" />
              </div>

              <div className="grid grid-cols-1 gap-6">
                {resumeData.publications.map((pub, idx) => (
                  <Card key={idx} className="bg-white dark:bg-slate-900 border-zinc-200/60 dark:border-slate-900 hover:border-cinnabar/40 hover:shadow-xs transition-all">
                    <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-bold hover:text-cinnabar transition-colors cursor-pointer">
                          {pub.title}
                        </CardTitle>
                        <p className="text-xs font-bold text-zinc-500 dark:text-slate-400">
                          {pub.venue}
                        </p>
                      </div>
                      <Badge className="shrink-0 bg-red-50 text-cinnabar hover:bg-red-50 dark:bg-red-950/20 dark:text-cinnabar font-mono">
                        {pub.year}
                      </Badge>
                    </CardHeader>
                    <CardContent className="text-sm text-zinc-600 dark:text-slate-400">
                      <p className="leading-relaxed"><strong className="text-zinc-700 dark:text-slate-300">Abstract Summary:</strong> Focusing on {pub.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </TabsContent>

          {/* TAB 4: PHOTOGRAPHY */}
          <TabsContent value="photography" className="space-y-8 outline-hidden">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 relative pl-4">
                  <div className="absolute left-0 top-1 w-1.5 h-6 bg-cinnabar rounded-full" />
                  <Camera className="h-5 w-5 text-cinnabar" />
                  <span>My Photography / 影像實錄</span>
                </h2>
                <div className="h-0.5 w-16 bg-cinnabar mt-2" />
              </div>

              <p className="text-sm text-zinc-500 dark:text-slate-400 max-w-xl leading-relaxed">
                Captured moments from my travels, research stints, and camping journeys back home in China and around Minnesota.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumeData.photography.map((photo, idx) => (
                  <Card key={idx} className="bg-white dark:bg-slate-900/40 border-zinc-200 dark:border-slate-900 overflow-hidden hover:shadow-lg hover:border-cinnabar/40 transition-all duration-300 flex flex-col group">

                    {/* Lightbox dialog popup */}
                    <Dialog>
                      <DialogTrigger
                        render={
                          <button className="relative block w-full overflow-hidden aspect-[4/3] cursor-zoom-in text-left border-0 p-0 m-0 bg-transparent focus:outline-hidden">
                            <Image
                              src={photo.image}
                              alt={photo.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </button>
                        }
                      />
                      <DialogContent className="max-w-4xl p-1 bg-black/95 border-0 text-white flex flex-col justify-center items-center">
                        <div className="relative w-full aspect-[4/3] max-h-[75vh]">
                          <Image
                            src={photo.image}
                            alt={photo.title}
                            fill
                            className="object-contain"
                            priority
                          />
                        </div>
                        <div className="p-5 w-full text-center space-y-1 bg-black/60 rounded-b-lg">
                          <h4 className="font-bold text-lg text-white">{photo.title}</h4>
                          <p className="text-xs text-zinc-400 flex items-center justify-center gap-1">
                            <MapPin className="h-3.5 w-3.5" /> {photo.location} · {photo.date}
                          </p>
                          <p className="text-sm text-zinc-200 pt-3 leading-relaxed">{photo.description}</p>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <CardContent className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="font-bold text-md leading-tight group-hover:text-cinnabar transition-colors">{photo.title}</h3>
                        <p className="text-[11px] text-zinc-400 dark:text-slate-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span className="truncate">{photo.location}</span>
                        </p>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-slate-400 line-clamp-2 pt-1 border-t border-zinc-100 dark:border-slate-800/60 mt-2">
                        {photo.description}
                      </p>
                    </CardContent>

                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 5: BLOG */}
          <TabsContent value="blog" className="space-y-8 outline-hidden">

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2 relative pl-4">
                  <div className="absolute left-0 top-1 w-1.5 h-6 bg-cinnabar rounded-full" />
                  <FileText className="h-5 w-5 text-cinnabar" />
                  <span>Personal Academic Blog</span>
                </h2>
                <div className="h-0.5 w-16 bg-cinnabar mt-2" />
              </div>

              <div className="relative border-l border-zinc-200 dark:border-slate-800 ml-4 pl-8 space-y-8">
                {resumeData.blog.map((post, idx) => (
                  <div key={idx} className="relative group space-y-1">

                    {/* Timeline dot */}
                    <div className="absolute -left-[38px] top-1 h-3.5 w-3.5 rounded-full bg-white dark:bg-slate-950 border border-zinc-300 dark:border-slate-700 group-hover:border-cinnabar group-hover:bg-cinnabar transition-colors" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-md font-bold text-zinc-950 dark:text-slate-100 group-hover:text-cinnabar transition-colors cursor-pointer">
                        {post.title}
                      </h4>
                      <span className="text-xs text-zinc-400 dark:text-slate-500 font-mono flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                    </div>

                    <p className="text-sm text-zinc-500 dark:text-slate-400 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </TabsContent>

        </Tabs>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-zinc-200 dark:border-slate-900 bg-white dark:bg-slate-950 py-10 mt-16 text-center text-xs text-zinc-500 dark:text-slate-500">
        <div className="mx-auto max-w-6xl px-6 space-y-2 relative">
          {/* Vertical Cinnabar Accent Strip matching the original website footer */}
          <div className="absolute left-6 top-1 w-1 h-8 bg-cinnabar opacity-70 hidden sm:block" />
          <p>© 2026 {resumeData.title}. All rights reserved.</p>
          <p>Powered by Next.js 16, Tailwind CSS v4, and React 19.</p>
        </div>
      </footer>
      {/* Floating Wenzhounese Food Particles */}
      {foodParticles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            top: p.top,
            [p.side === "left" ? "left" : "right"]: "0px",
            pointerEvents: "none",
            zIndex: 9999,
            animation: `${p.side === "left" ? "food-fly-left" : "food-fly-right"} 1.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards`,
            animationDelay: `${p.delay}s`,
            "--random-x": p.randomX,
            "--random-y": p.randomY,
            "--random-rotate": `${p.randomRotate}deg`,
          } as React.CSSProperties}
          className="flex flex-col items-center gap-1 bg-white/95 dark:bg-slate-900/95 shadow-md border border-zinc-200 dark:border-slate-800 px-3 py-1.5 rounded-full select-none"
        >
          <span className="text-xl">{p.icon}</span>
          <span className="text-[10px] font-bold text-cinnabar whitespace-nowrap">{p.name}</span>
        </div>
      ))}

    </div>
  );
}
