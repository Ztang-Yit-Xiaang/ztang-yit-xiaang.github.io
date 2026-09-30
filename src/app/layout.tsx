import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://ztang-yit-xiaang.github.io"),
  title: "Ztang Yit Xiaang (Yixin Chen) | Academic Portfolio",
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
    title: "Ztang Yit Xiaang (Yixin Chen) | Academic Portfolio",
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
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
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
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
