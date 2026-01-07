import { getAllPages } from "../lib/content";
import HomePage from "../components/HomePage";
import type { Metadata } from "next";

const baseUrl = "https://oracionparadormirenpaz.com";

export const metadata: Metadata = {
  title: "Oraciones para dormir en paz - Oraciones y reflexiones originales",
  description: "Oraciones y reflexiones católicas originales para terminar el día con calma, soltar preocupaciones y descansar con fe.",
  keywords: ["oraciones para dormir", "oraciones católicas", "paz nocturna", "reflexiones espirituales", "oraciones de la noche"],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Oraciones para dormir en paz",
    description: "Oraciones y reflexiones católicas originales para terminar el día con calma, soltar preocupaciones y descansar con fe.",
    url: baseUrl,
    siteName: "Oraciones para dormir en paz",
    locale: "es_ES",
    type: "website",
  },
};

export default function Home() {
  const pages = getAllPages();

  return <HomePage pages={pages} />;
}
