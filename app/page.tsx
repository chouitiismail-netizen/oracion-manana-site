import { getAllPages } from "../lib/content";
import HomePage from "../components/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oraciones para dormir en paz - Oraciones y reflexiones originales",
  description: "Oraciones y reflexiones católicas originales para terminar el día con calma, soltar preocupaciones y descansar con fe.",
};

export default function Home() {
  const pages = getAllPages();

  return <HomePage pages={pages} />;
}
