import type { Metadata } from "next";
import { ProjectsPortfolio } from "@/components/projects-portfolio";
export const metadata: Metadata = { title: "Selected work | Ztang Yit Xiaang", description: "The complete research and engineering portfolio, with contributions, evidence and source repositories.", alternates: { canonical: "/work/" } };
export default function PortfolioPage() { return <div className="world-wrap collection-page"><ProjectsPortfolio /></div>; }
