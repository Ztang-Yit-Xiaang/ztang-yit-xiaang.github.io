"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  FileText, 
  FolderGit2, 
  BookOpen, 
  Camera, 
  Sparkles, 
  Sun, 
  Moon, 
  Copy, 
  Check, 
  Download, 
  GraduationCap,
  X
} from "lucide-react";
import { resumeData } from "@/data/resume";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Projects" | "Research" | "Blog" | "Photography" | "Actions";
  icon: React.ReactNode;
  keywords?: string;
  action: () => void;
}

export function CommandMenu({
  onSelectTab,
  onToggleTheme,
  isDark,
}: {
  onSelectTab: (tab: string) => void;
  onToggleTheme: () => void;
  isDark: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Build the complete command catalog
  const items: CommandItem[] = [
    // Quick Actions
    {
      id: "action-cv",
      title: "Download Resume / CV (PDF)",
      category: "Actions",
      keywords: "resume cv download pdf bio",
      icon: <Download className="h-4 w-4 text-cinnabar" />,
      action: () => {
        window.open("/files/cv.pdf", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "action-email",
      title: `Copy Email (${resumeData.email})`,
      category: "Actions",
      keywords: "email contact message mail",
      icon: copiedText === "email" ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-indigo-500" />,
      action: () => {
        copyToClipboard(resumeData.email, "email");
        setTimeout(() => setIsOpen(false), 500);
      },
    },
    {
      id: "action-theme",
      title: `Switch to ${isDark ? "Light" : "Dark"} Mode`,
      category: "Actions",
      keywords: "theme mode dark light toggle color",
      icon: isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />,
      action: () => {
        onToggleTheme();
        setIsOpen(false);
      },
    },
    {
      id: "action-github",
      title: "Visit GitHub Profile",
      category: "Actions",
      keywords: "github code repository git",
      icon: <FolderGit2 className="h-4 w-4 text-zinc-500" />,
      action: () => {
        window.open(resumeData.socials.github, "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "action-scholar",
      title: "Visit Google Scholar",
      category: "Actions",
      keywords: "google scholar citations papers publications research",
      icon: <GraduationCap className="h-4 w-4 text-emerald-500" />,
      action: () => {
        window.open(resumeData.socials.googlescholar, "_blank");
        setIsOpen(false);
      },
    },

    // Navigation Tabs
    {
      id: "nav-about",
      title: "Go to Profile & Education",
      category: "Navigation",
      keywords: "profile about bio education experience teaching uumn",
      icon: <Sparkles className="h-4 w-4 text-cinnabar" />,
      action: () => {
        startTransition(() => {
          onSelectTab("about");
          router.push("/?tab=about");
        });
        setIsOpen(false);
      },
    },
    {
      id: "nav-projects",
      title: "Go to Projects Grid",
      category: "Navigation",
      keywords: "projects portfolio software systems code",
      icon: <FolderGit2 className="h-4 w-4 text-cyan-500" />,
      action: () => {
        startTransition(() => {
          onSelectTab("projects");
          router.push("/?tab=projects");
        });
        setIsOpen(false);
      },
    },
    {
      id: "nav-research",
      title: "Go to Research & Publications",
      category: "Navigation",
      keywords: "research papers publications working papers osqp sketching",
      icon: <BookOpen className="h-4 w-4 text-emerald-500" />,
      action: () => {
        startTransition(() => {
          onSelectTab("research");
          router.push("/?tab=research");
        });
        setIsOpen(false);
      },
    },
    {
      id: "nav-photography",
      title: "Go to Photography Journal",
      category: "Navigation",
      keywords: "photos photography gallery travel pictures dalian",
      icon: <Camera className="h-4 w-4 text-amber-500" />,
      action: () => {
        startTransition(() => {
          onSelectTab("photography");
          router.push("/?tab=photography");
        });
        setIsOpen(false);
      },
    },
    {
      id: "nav-blog",
      title: "Go to Academic Blog",
      category: "Navigation",
      keywords: "blog posts essays thoughts articles notes",
      icon: <FileText className="h-4 w-4 text-purple-500" />,
      action: () => {
        startTransition(() => {
          onSelectTab("blog");
          router.push("/?tab=blog");
        });
        setIsOpen(false);
      },
    },

    // Individual Projects
    ...resumeData.projects.map((project) => ({
      id: `project-${project.link}`,
      title: project.title,
      category: "Projects" as const,
      keywords: `${project.title} ${project.category} ${project.description}`,
      icon: <FolderGit2 className="h-4 w-4 text-cyan-500" />,
      action: () => {
        startTransition(() => {
          router.push(project.link);
        });
        setIsOpen(false);
      },
    })),

    // Blog Posts
    ...resumeData.blog.map((post) => ({
      id: `blog-${post.slug}`,
      title: post.title,
      category: "Blog" as const,
      keywords: `${post.title} ${post.summary} ${post.date}`,
      icon: <FileText className="h-4 w-4 text-purple-500" />,
      action: () => {
        startTransition(() => {
          router.push(post.link);
        });
        setIsOpen(false);
      },
    })),

    // Publications (Direct BibTeX copy or jump)
    ...resumeData.publications.map((pub) => ({
      id: `pub-${pub.id}`,
      title: `${pub.title} (${pub.year})`,
      category: "Research" as const,
      keywords: `${pub.title} ${pub.authors} ${pub.venue} ${pub.year}`,
      icon: <BookOpen className="h-4 w-4 text-emerald-500" />,
      action: () => {
        copyToClipboard(pub.bibtex, pub.id);
        startTransition(() => {
          onSelectTab("research");
          router.push("/?tab=research");
        });
        setIsOpen(false);
      },
    })),
  ];

  // Filter items based on user query
  const filteredItems = items.filter((item) => {
    if (!query.trim()) return true;
    const cleanQuery = query.toLowerCase().trim();
    const matchTitle = item.title.toLowerCase().includes(cleanQuery);
    const matchCategory = item.category.toLowerCase().includes(cleanQuery);
    const matchKeywords = item.keywords?.toLowerCase().includes(cleanQuery);
    return matchTitle || matchCategory || matchKeywords;
  });

  // Handle open/close keyboard listener (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQuery("");
        setSelectedIndex(0);
        setIsOpen((prev) => {
          if (!prev) {
            previousActiveElement.current = document.activeElement as HTMLElement;
          }
          return !prev;
        });
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Handle Focus & Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);


  // Keyboard navigation within list
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (filteredItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredItems[selectedIndex];
      if (selected) {
        selected.action();
      }
    }
  };

  return (
    <>
      {/* Trigger Button in Header */}
      <button
        onClick={() => {
          previousActiveElement.current = document.activeElement as HTMLElement;
          setQuery("");
          setSelectedIndex(0);
          setIsOpen(true);
        }}
        aria-label="Open Command Menu (Press Ctrl+K)"
        className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-3 py-1.5 text-xs text-zinc-500 dark:text-slate-400 shadow-xs hover:border-zinc-300 dark:hover:border-slate-700 hover:text-zinc-900 dark:hover:text-slate-200 transition-all cursor-pointer"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search site...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-zinc-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-zinc-500 dark:text-slate-400 border border-zinc-200 dark:border-slate-700">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Command Search Palette"
        >
          <div 
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleModalKeyDown}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-slate-800 px-4 py-3.5">
              <Search className="h-5 w-5 text-zinc-400 dark:text-slate-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                placeholder="Type a command or search (projects, papers, blog, photos)..."
                className="w-full bg-transparent text-sm text-zinc-900 dark:text-slate-100 placeholder-zinc-400 dark:placeholder-slate-500 outline-hidden"
              />
              {query && (
                <button
                  onClick={() => { setQuery(""); setSelectedIndex(0); }}
                  className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <kbd className="rounded bg-zinc-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono font-medium text-zinc-400 border border-zinc-200 dark:border-slate-700">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div 
              ref={listRef}
              className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-zinc-100 dark:divide-slate-800/60"
            >
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-sm text-zinc-500 dark:text-slate-400">
                  No matching commands or pages found for &quot;{query}&quot;.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-xs sm:text-sm transition-colors ${
                        isSelected
                          ? "bg-zinc-100 dark:bg-slate-800/80 text-zinc-950 dark:text-slate-50 font-medium"
                          : "text-zinc-600 dark:text-slate-300 hover:bg-zinc-50 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="shrink-0">{item.icon}</span>
                        <span className="truncate">{item.title}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-slate-500 bg-zinc-200/50 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-mono text-cinnabar">↵</span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer helper */}
            <div className="flex items-center justify-between border-t border-zinc-200/80 dark:border-slate-800/80 bg-zinc-50 dark:bg-slate-950/50 px-4 py-2 text-[11px] text-zinc-400 dark:text-slate-500 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              {copiedText && (
                <span className="text-emerald-500 font-sans font-medium flex items-center gap-1">
                  <Check className="h-3 w-3" /> Copied to clipboard!
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
