import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono, Newsreader } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import "./world.css";
import "./bilingual.css";
import { SiteShell } from "@/components/site-shell";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const newsreader = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-field-display", display: "swap" });

export const metadata: Metadata = {
  alternates: {canonical:"/", languages:{en:"/","zh-Hant":"/zh/","x-default":"/"}},
  metadataBase: new URL("https://ztang-yit-xiaang.github.io"),
  title: "Ztang Yit Xiaang (Yixin Chen) | Creative Research Portfolio",
  description: "Personal website of Ztang Yit Xiaang (Yixin Chen), Data Science student at the University of Minnesota working on randomized algorithms, optimization, scientific computing, and language technology.",
  authors: [{ name: "Ztang Yit Xiaang (Yixin Chen)" }],
  keywords: [
    "Ztang Yit Xiaang",
    "Yixin Chen",
    "Data Science",
    "Randomized Algorithms",
    "Optimization",
    "Scientific Computing",
    "University of Minnesota",
    "Wenzhounese Language Technology",
  ],
  openGraph: {
    title: "Ztang Yit Xiaang (Yixin Chen) | Creative Research Portfolio",
    description: "Data Science student at the University of Minnesota researching randomized linear algebra, numerical optimization, and language technology.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${newsreader.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.lang = window.location.pathname === '/zh' || window.location.pathname.startsWith('/zh/') ? 'zh-Hant' : 'en';
                  var theme = localStorage.getItem('theme');
                  if (theme !== 'dark') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground flex flex-col font-sans">
        <TooltipProvider><SiteShell>{children}</SiteShell></TooltipProvider>
      </body>
    </html>
  );
}
