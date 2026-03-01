import type { Metadata } from "next";
import { Noto_Serif_JP, Inter, Space_Grotesk, Archivo } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import ContactBadge from "@/components/ContactBadge";
import LoadingScreen from "@/components/LoadingScreen";
import StickyNoteCTA from "@/components/StickyNoteCTA";

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manas | Creative Technologist & Builder",
  description:
    "Portfolio of Manas - AI researcher, full-stack architect, and relentless builder. Exploring uncertainty quantification, intent-driven systems, and explainable AI.",
  keywords: [
    "Manas",
    "Creative Technologist",
    "Full Stack Developer",
    "AI Researcher",
    "Machine Learning",
    "Software Engineer",
    "Portfolio",
    "Next.js",
    "React",
    "Python",
  ],
  authors: [{ name: "Manas", url: "https://manas.dev" }],
  creator: "Manas",
  publisher: "Manas",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manas.dev",
    title: "Manas | Creative Technologist & Builder",
    description:
      "AI researcher, full-stack architect, and relentless builder. Explore my scrapbook of projects, research, and technical arsenal.",
    siteName: "Manas Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manas | Creative Technologist & Builder",
    description:
      "AI researcher, full-stack architect, and relentless builder. Explore my scrapbook of projects, research, and technical arsenal.",
    creator: "@Manas",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth relative overflow-x-hidden" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${notoSerifJP.variable} ${inter.variable} ${spaceGrotesk.variable} ${archivo.variable} antialiased paper-texture`}
      >
        <LoadingScreen />
        <Cursor />
        {children}
        <StickyNoteCTA />
        <ContactBadge />
      </body>
    </html>
  );
}
