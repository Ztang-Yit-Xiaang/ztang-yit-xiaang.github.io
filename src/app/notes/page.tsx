import type { Metadata } from "next";
import { NotesPage } from "@/components/portfolio-pages";
import { languageAlternates } from "@/lib/i18n";
export const metadata: Metadata = { title: "Notes | Ztang Yit Xiaang", description: "Research notes on scientific software, numerical optimization, randomized algorithms and building systems.", alternates: languageAlternates("en","/notes/") };
export default function Page() { return <NotesPage />; }
