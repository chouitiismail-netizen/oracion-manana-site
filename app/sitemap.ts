import type { MetadataRoute } from 'next';
import { getAllPages } from "../lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://oracionparadormirenpaz.com";
    const pages = getAllPages();

    return [
        { url: baseUrl, lastModified: new Date() },
        ...pages.map((p) => ({
            url: `${baseUrl}/${p.slug}`,
            lastModified: new Date(p.updatedAt),
        })),
    ];
}
