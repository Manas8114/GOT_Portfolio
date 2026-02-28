import type { Metadata } from "next";
import { Noto_Serif_JP, Inter, Space_Grotesk, Archivo } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

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
    "AI",
    "Machine Learning",
    "Full Stack Developer",
    "Research",
    "Portfolio",
    "Manas",
  ],
  authors: [{ name: "Manas" }],
  openGraph: {
    title: "Manas | Creative Technologist & Builder",
    description:
      "AI researcher, full-stack architect, and relentless builder.",
    type: "website",
  },
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
        <Cursor />
        {children}
      </body>
    </html>
  );
}
