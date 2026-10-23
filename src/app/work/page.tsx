import type { Metadata } from "next";
import { languageAlternates } from "@/lib/i18n";
import { ProjectsPortfolio } from "@/components/projects-portfolio";
export const metadata: Metadata = { title: "Work | Ztang Yit Xiaang", description: "Research questions, implementation, personal contributions, evidence and limitations across numerical optimization, randomized algorithms and applied systems.", alternates: languageAlternates("en","/work/") };
export default function WorkPage() { return <div className="world-wrap collection-page"><ProjectsPortfolio /></div>; }
