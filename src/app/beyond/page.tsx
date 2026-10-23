import type { Metadata } from "next";
import { BeyondPage } from "@/components/portfolio-pages";
import { languageAlternates } from "@/lib/i18n";
export const metadata: Metadata = { title: "Beyond the equations | Ztang Yit Xiaang", description: "Wenzhounese language, culture, input tools, photography, and the personal side of this field atlas.", alternates: languageAlternates("en","/beyond/") };
export default function Page() { return <BeyondPage />; }
