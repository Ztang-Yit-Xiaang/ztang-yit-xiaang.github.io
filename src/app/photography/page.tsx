import type { Metadata } from "next";
import { PhotographyPage } from "@/components/portfolio-pages";
import { languageAlternates } from "@/lib/i18n";
export const metadata: Metadata = { title: "Photography | Ztang Yit Xiaang", description: "A visual journal of places, people, and quiet distances. Photographs from China and the United States.", alternates: languageAlternates("en","/photography/") };
export default function Page() { return <PhotographyPage />; }
