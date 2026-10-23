import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { FieldAtlas } from "./field-atlas";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-field-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Field Atlas — design preview | Ztang Yit Xiaang",
  description: "A preview of The Geometry of Curiosity: research, software, photography, and Wenzhounese language technology.",
  robots: { index: false, follow: false },
};

export default function FieldAtlasPage() {
  return <FieldAtlas fontClassName={newsreader.variable} />;
}
