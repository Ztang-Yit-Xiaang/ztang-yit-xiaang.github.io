"use client";

import { useCallback, useEffect, useState } from "react";
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
  Camera,
  ArrowRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { EditorialPhotography } from "@/components/editorial-photography";

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

const validTabs = ["about", "projects", "research", "photography", "blog"] as const;
type TabValue = (typeof validTabs)[number];

const isValidTab = (value: string | null): value is TabValue =>
  value !== null && validTabs.includes(value as TabValue);

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState<TabValue>("about");
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

    if (!shouldUseDark) {
      const timeoutId = window.setTimeout(() => setIsDark(false), 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    const syncTabFromLocation = () => {
      const url = new URL(window.location.href);
      const requestedTab = url.searchParams.get("tab");
      const nextTab = isValidTab(requestedTab) ? requestedTab : "about";

      setActiveTab(nextTab);

      if (requestedTab && !isValidTab(requestedTab)) {
        url.searchParams.delete("tab");
        window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
      }
    };

    syncTabFromLocation();
    window.addEventListener("popstate", syncTabFromLocation);
    return () => window.removeEventListener("popstate", syncTabFromLocation);
  }, []);

  const handleTabChange = useCallback((value: string) => {
    const nextTab: TabValue = isValidTab(value) ? value : "about";
    setActiveTab(nextTab);

    const url = new URL(window.location.href);
    if (nextTab === "about") {
      url.searchParams.delete("tab");
    } else {
      url.searchParams.set("tab", nextTab);
    }

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl !== currentUrl) {
      window.history.pushState({}, "", nextUrl);
    }
  }, []);

  const openPhotography = useCallback(() => {
    handleTabChange("photography");
    window.requestAnimationFrame(() => {
      document.getElementById("portfolio-content")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [handleTabChange]);

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

  // Get unique categories for projects
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
                onClick={() => handleTabChange("about")}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === "about" ? "bg-zinc-200/60 dark:bg-slate-800 text-zinc-950 dark:text-slate-50" : "text-zinc-600 dark:text-slate-400 hover:text-zinc-950 dark:hover:text-slate-100"}`}
              >
                Profile
              </button>
              <button 
                onClick={() => handleTabChange("projects")}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === "projects" ? "bg-zinc-200/60 dark:bg-slate-800 text-zinc-950 dark:text-slate-50" : "text-zinc-600 dark:text-slate-400 hover:text-zinc-950 dark:hover:text-slate-100"}`}
              >
                Projects
              </button>
              <button 
                onClick={() => handleTabChange("research")}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === "research" ? "bg-zinc-200/60 dark:bg-slate-800 text-zinc-950 dark:text-slate-50" : "text-zinc-600 dark:text-slate-400 hover:text-zinc-950 dark:hover:text-slate-100"}`}
              >
                Research
              </button>
              <button 
                onClick={() => handleTabChange("photography")}
                className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === "photography" ? "bg-zinc-200/60 dark:bg-slate-800 text-zinc-950 dark:text-slate-50" : "text-zinc-600 dark:text-slate-400 hover:text-zinc-950 dark:hover:text-slate-100"}`}
              >
                Photography
              </button>
              <button 
                onClick={() => handleTabChange("blog")}
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
      <section className="relative overflow-hidden border-b border-zinc-200 py-5 dark:border-slate-900 sm:py-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-slate-100),theme(colors.white))] opacity-40 dark:bg-[radial-gradient(45rem_50rem_at_top,rgba(180,91,63,0.1),theme(colors.slate.950))] dark:opacity-100" />
        
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)]">
            
            {/* Bio info */}
            <div className="relative space-y-6 rounded-[2rem] border border-zinc-200/80 bg-white/85 p-7 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 sm:p-9 lg:p-10">
              {/* Vertical Cinnabar Accent Strip from the original website design */}
              <div className="absolute right-0 top-0 w-1.5 h-12 bg-cinnabar rounded-full opacity-90 hidden lg:block" />

              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100/60 px-3 py-1 text-xs font-semibold text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-400 border border-cyan-200/30 dark:border-cyan-800/30">
                <Sparkles className="h-3 w-3" />
                <span>{resumeData.kicker}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight md:leading-tight">
                {resumeData.title}
                <span className="block mt-1 text-2xl font-semibold text-zinc-500 dark:text-slate-400 font-sans">
                  {resumeData.subtitle}
                </span>
              </h1>

              {/* Wenzhounese Easter Egg Clickable Trigger */}
              <Dialog>
                <DialogTrigger
                  render={
                    <button 
                      onClick={handleCultureClick}
                      className="text-sm font-extrabold tracking-wider text-cinnabar hover:text-cinnabar/80 cursor-help uppercase flex items-center gap-1.5 bg-transparent border-0 p-0 focus:outline-hidden"
                    >
                      <span>{resumeData.cultureMark}</span>
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

              <p className="max-w-2xl text-lg text-zinc-600 dark:text-slate-300 leading-relaxed">
                {resumeData.bio}
              </p>

              {/* Social and action links */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href={`mailto:${resumeData.email}`}
                  className="flex items-center gap-2 rounded-full bg-cinnabar hover:bg-cinnabar/90 text-white px-5 py-2.5 text-sm font-semibold transition-all shadow-md hover:scale-105"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact Me</span>
                </a>
                
                <button
                  type="button"
                  onClick={openPhotography}
                  className="flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinnabar dark:border-slate-700 dark:hover:bg-slate-800 motion-reduce:transform-none"
                >
                  <Camera className="h-4 w-4" />
                  <span>View Photography</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <a 
                  href={resumeData.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-zinc-300 dark:border-slate-800 hover:bg-zinc-100 dark:hover:bg-slate-900 px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>GitHub</span>
                </a>

                <a 
                  href={resumeData.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-zinc-300 dark:border-slate-800 hover:bg-zinc-100 dark:hover:bg-slate-900 px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>

                <a 
                  href={resumeData.socials.googlescholar}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-zinc-300 dark:border-slate-800 hover:bg-zinc-100 dark:hover:bg-slate-900 px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Scholar</span>
                </a>
              </div>
            </div>

            {/* Editorial anchor image */}
            <div className="relative order-first min-h-[58vh] overflow-hidden rounded-[2rem] bg-slate-900 shadow-xl lg:min-h-[calc(100vh-8.5rem)]">
              <Image
                src="/assets/photos/blue-ridge-solitude-full.webp"
                alt="A lone figure standing in a winter meadow above layered blue mountain ridges"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover"
                style={{ objectPosition: "center 58%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
              <p className="font-handwritten absolute left-7 top-4 -rotate-3 text-7xl leading-none text-white drop-shadow-xl sm:left-10 sm:top-6 sm:text-8xl lg:text-9xl">
                Blue Ridge
              </p>
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-7 text-white sm:p-10">
                <div className="space-y-1">
                  <p className="text-xl font-semibold tracking-tight sm:text-2xl">Blue Ridge Solitude</p>
                  <p className="flex items-center gap-1.5 text-xs text-white/75 sm:text-sm">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    Blue Ridge Mountains, Virginia · March 2025
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openPhotography}
                  className="rounded-full border border-white/30 bg-black/20 px-5 py-2.5 text-sm font-semibold backdrop-blur-sm transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Explore the journal
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE CONTENT SWITCHER (TABS) */}
      <main id="portfolio-content" className="mx-auto max-w-[90rem] scroll-mt-24 px-4 py-12 sm:px-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-12">
          
          <TabsList className="grid grid-cols-5 w-full max-w-md mx-auto md:hidden bg-zinc-200/60 dark:bg-slate-900 p-1 rounded-xl">
            <TabsTrigger value="about" className="rounded-lg text-[10px] py-2">Profile</TabsTrigger>
            <TabsTrigger value="projects" className="rounded-lg text-[10px] py-2">Projects</TabsTrigger>
            <TabsTrigger value="research" className="rounded-lg text-[10px] py-2">Research</TabsTrigger>
            <TabsTrigger value="photography" className="rounded-lg text-[10px] py-2">Photos</TabsTrigger>
            <TabsTrigger value="blog" className="rounded-lg text-[10px] py-2">Blog</TabsTrigger>
          </TabsList>

          {/* TAB 1: PROFILE / ABOUT */}
          <TabsContent value="about" className="space-y-12 outline-hidden">
            
            {/* Grid for Focus & Thread Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <Card className="bg-white/60 dark:bg-slate-900/60 border-zinc-200/80 dark:border-slate-900 backdrop-blur-xs relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500" />
                <CardHeader className="pl-6">
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">Current Focus</span>
                  <CardTitle className="text-xl font-bold mt-1">Summer Research Assistant</CardTitle>
                </CardHeader>
                <CardContent className="pl-6 text-sm text-zinc-600 dark:text-slate-400">
                  <p>Working on randomized algorithms with Prof. Swati Padmanabhan and building differentiable PyGRANSO Torch adapters with Prof. Ju Sun at UMN.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 dark:bg-slate-900/60 border-zinc-200/80 dark:border-slate-900 backdrop-blur-xs relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 left-0 w-2 h-full bg-cinnabar" />
                <CardHeader className="pl-6">
                  <span className="text-xs font-bold text-cinnabar uppercase tracking-wider">Research Thread</span>
                  <CardTitle className="text-xl font-bold mt-1">Randomized Matrix Theory</CardTitle>
                </CardHeader>
                <CardContent className="pl-6 text-sm text-zinc-600 dark:text-slate-400">
                  <p>Investigating sketching, dimension reduction, Hutch++ trace estimation, and randomized linear solver guarantees for massive data scales.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 dark:bg-slate-900/60 border-zinc-200/80 dark:border-slate-900 backdrop-blur-xs relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
                <CardHeader className="pl-6">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Optimization Thread</span>
                  <CardTitle className="text-xl font-bold mt-1">Differentiable Solvers</CardTitle>
                </CardHeader>
                <CardContent className="pl-6 text-sm text-zinc-600 dark:text-slate-400">
                  <p>Translating standard QP split solvers (OSQP) into PyTorch primitives for gradient backpropagation and deep-learning integrations.</p>
                </CardContent>
              </Card>

            </div>

            {/* Split layout: Education (Left) & Experience (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12">
              
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
          <TabsContent value="photography" className="outline-hidden">
            <EditorialPhotography />
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
