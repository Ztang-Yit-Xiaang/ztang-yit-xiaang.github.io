import type { Metadata } from "next";
import { PlaygroundPage } from "@/components/portfolio-pages";
import { languageAlternates } from "@/lib/i18n";
export const metadata: Metadata = { title: "Optimization playground | Ztang Yit Xiaang", description: "An interactive quadratic landscape illustrating gradient descent, with transparent controls and limitations.", alternates: languageAlternates("en","/work/optimization-playground/") };
export default function Page() { return <PlaygroundPage />; }
