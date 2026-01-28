import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oracion-manana-site.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Oraciones de la mañana - Oraciones para empezar el día con fe y paz",
  description: "Oraciones originales para empezar el día con fe, calma y confianza en Dios. Para ofrecer el día, pedir protección, tomar decisiones y vivir en paz desde el amanecer.",
  keywords: ["oraciones de la mañana", "oracion de la mañana", "oracion al despertar", "oraciones católicas", "oracion para empezar el dia"],
  alternates: {
    canonical: baseUrl,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "theme-color": "#d17b27",
  },
  openGraph: {
    title: "Oraciones de la mañana",
    description: "Oraciones originales para empezar el día con fe, calma y confianza en Dios. Para ofrecer el día, pedir protección, tomar decisiones y vivir en paz desde el amanecer.",
    url: baseUrl,
    siteName: "Oraciones de la mañana",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oraciones de la mañana",
    description: "Oraciones originales para empezar el día con fe, calma y confianza en Dios. Para ofrecer el día, pedir protección, tomar decisiones y vivir en paz desde el amanecer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${fraunces.variable} ${inter.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
