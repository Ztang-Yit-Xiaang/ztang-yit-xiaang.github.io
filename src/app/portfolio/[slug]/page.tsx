import fs from "fs";
import path from "path";
import { marked } from "marked";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, ExternalLink } from "lucide-react";
import { resumeData } from "@/data/resume";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return resumeData.projects.map((project) => ({
    slug: project.link.replace("/portfolio/", ""),
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  // Find the project metadata in resumeData
  const projectMeta = resumeData.projects.find(
    (p) => p.link.replace("/portfolio/", "") === slug
  );

  if (!projectMeta) {
    notFound();
  }

  // Load the markdown file
  const contentDir = path.join(process.cwd(), "src/content/portfolio");
  const filePath = path.join(contentDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Parse YAML Frontmatter
  let markdown = fileContent;
  let title = projectMeta.title;
  let date = "";
  
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
  const match = fileContent.match(frontmatterRegex);
  if (match) {
    markdown = fileContent.replace(frontmatterRegex, "");
    const fmText = match[1];
    
    const titleMatch = fmText.match(/title:\s*"(.*?)"/);
    if (titleMatch) title = titleMatch[1];
    
    const dateMatch = fmText.match(/date:\s*([\d-]+)/);
    if (dateMatch) date = dateMatch[1];
  }

  // Convert markdown to html
  const htmlContent = await marked.parse(markdown);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 py-12 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/?tab=projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-slate-400 hover:text-cinnabar dark:hover:text-cinnabar transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 pb-8 border-b border-zinc-200 dark:border-slate-900">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-cinnabar uppercase font-mono bg-red-50 dark:bg-red-950/20 px-2.5 py-1 rounded-full">
              <Tag className="h-3.5 w-3.5" />
              {projectMeta.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              {title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 dark:text-slate-400 font-medium">
            {date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-cinnabar" />
                <span>{date}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cinnabar" />
              <span>Project Case Study</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article 
          className="py-10 prose prose-zinc dark:prose-invert max-w-none 
            /* Headers */
            [&_h1]:text-2xl [&_h1]:font-extrabold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-zinc-900 [&_h1]:dark:text-slate-50
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-zinc-900 [&_h2]:dark:text-slate-100
            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-zinc-900 [&_h3]:dark:text-slate-100
            /* Text elements */
            [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-sm [&_p]:md:text-base [&_p]:text-zinc-700 [&_p]:dark:text-slate-300
            [&_strong]:font-semibold [&_strong]:text-zinc-900 [&_strong]:dark:text-white
            /* Links */
            [&_a]:text-cinnabar [&_a]:underline [&_a]:font-medium hover:[&_a]:text-cinnabar/80
            /* Lists */
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ul]:text-sm [&_ul]:md:text-base
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1.5 [&_ol]:text-sm [&_ol]:md:text-base
            /* Blockquotes */
            [&_blockquote]:border-l-4 [&_blockquote]:border-cinnabar [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-zinc-600 [&_blockquote]:dark:text-slate-400
            /* Code & Pre */
            [&_code]:font-mono [&_code]:text-xs [&_code]:bg-zinc-100 [&_code]:dark:bg-slate-900 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-cinnabar
            [&_pre]:bg-zinc-100 [&_pre]:dark:bg-slate-900/60 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-6
            [&_pre_code]:text-zinc-800 [&_pre_code]:dark:text-slate-200 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-xs
            /* Tables */
            [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse
            [&_th]:border-b [&_th]:border-zinc-200 [&_th]:dark:border-slate-800 [&_th]:pb-2 [&_th]:text-left [&_th]:font-bold [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wider
            [&_td]:border-b [&_td]:border-zinc-100 [&_td]:dark:border-slate-900/60 [&_td]:py-3 [&_td]:text-sm
            /* Horizontal rules */
            [&_hr]:border-zinc-200 [&_hr]:dark:border-slate-800 [&_hr]:my-8
          "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Case Study Actions from the original layout */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-slate-900 flex justify-between items-center">
          <Link
            href="/?tab=projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-slate-400 hover:text-cinnabar dark:hover:text-cinnabar transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects</span>
          </Link>

          <a
            href="https://github.com/Ztang-Yit-Xiaang"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cinnabar hover:underline"
          >
            <span>View on GitHub</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
