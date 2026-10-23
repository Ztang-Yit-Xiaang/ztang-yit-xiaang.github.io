import type { Metadata } from "next";
import { AcademicPage } from "@/components/portfolio-pages";
import { languageAlternates } from "@/lib/i18n";
export const metadata: Metadata = { title: "Academic record & CV | Ztang Yit Xiaang", description: "Education, research experience, teaching, publications, project report and CV.", alternates: languageAlternates("en","/academic/") };
export default function Page() { return <AcademicPage />; }
