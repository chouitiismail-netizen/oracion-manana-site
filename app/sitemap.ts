import type { MetadataRoute } from 'next';
import { getAllPages } from "../lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oracion-manana-site.vercel.app";
    const pages = getAllPages();

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        ...pages.map((p) => ({
            url: `${baseUrl}/${p.slug}`,
            lastModified: new Date(p.updatedAt),
            changeFrequency: p.category === 'legal' ? 'yearly' as const : 'monthly' as const,
            priority: p.category === 'legal' ? 0.3 : 0.8,
        })),
    ];
}
