import Link from "next/link";
import type { Metadata } from "next";
import { ProjectsPortfolio } from "@/components/projects-portfolio";

export const metadata: Metadata = {
  title: "Selected work | Ztang Yit Xiaang",
  description: "Optimization software, adaptive trace estimation, machine learning, and travel planning. Explore my contributions, project evidence, and source repositories.",
  alternates: { canonical: "https://ztang-yit-xiaang.github.io/portfolio/" },
};
export default function PortfolioPage() {
  return <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-slate-950 dark:text-slate-100"><div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 md:py-12"><nav aria-label="Portfolio navigation" className="mb-12 flex flex-wrap items-center justify-between gap-4 text-sm"><Link className="font-semibold hover:text-cinnabar" href="/">← Ztang Yit Xiaang</Link><Link className="hover:text-cinnabar" href="/?tab=photography">Photography ↗</Link></nav><ProjectsPortfolio /></div></main>;
}
