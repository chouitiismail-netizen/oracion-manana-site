import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PageFrontmatter = {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    publishedAt: string;
    updatedAt: string;
    category: string;
};

export type PageData = PageFrontmatter & {
    content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content/pages");

const REQUIRED_FIELDS: (keyof PageFrontmatter)[] = [
    'slug', 'title', 'metaTitle', 'metaDescription', 'keywords',
    'publishedAt', 'updatedAt', 'category'
];

function validatePage(data: any, filename: string): void {
    for (const field of REQUIRED_FIELDS) {
        if (!data[field]) {
            throw new Error(`Missing required field "${field}" in ${filename}`);
        }
    }
    if (!Array.isArray(data.keywords)) {
        throw new Error(`Field "keywords" must be an array in ${filename}`);
    }
}

export function getAllPages(): PageData[] {
    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
    return files.map((file) => {
        const fullPath = path.join(CONTENT_DIR, file);
        const raw = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = matter(raw);

        validatePage(data, file);

        return { ...(data as PageFrontmatter), content };
    }).sort((a, b) => {
        // Sort by updatedAt desc, then title asc
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        if (dateB !== dateA) return dateB - dateA;
        return a.title.localeCompare(b.title);
    });
}

export function getSpiritualPages(): PageData[] {
    return getAllPages().filter(p => p.category !== 'legal');
}

export function getLegalPages(): PageData[] {
    return getAllPages().filter(p => p.category === 'legal');
}

export function getPageBySlug(slug: string): PageData | null {
    const pages = getAllPages();
    return pages.find((p) => p.slug === slug) ?? null;
}

export function getCategories(): string[] {
    const cats = new Set<string>();
    getSpiritualPages().forEach(p => cats.add(p.category));
    return Array.from(cats).sort();
}

export function searchSpiritualPages(query: string): PageData[] {
    if (!query.trim()) return getSpiritualPages();

    const lowerQuery = query.toLowerCase();
    return getSpiritualPages().filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.metaDescription.toLowerCase().includes(lowerQuery) ||
        p.keywords.some(k => k.toLowerCase().includes(lowerQuery))
    );
}

export function getRelatedSpiritualPages(currentSlug: string, category: string, limit = 6): PageData[] {
    return getSpiritualPages()
        .filter(p => p.slug !== currentSlug && p.category === category)
        .slice(0, limit);
}

export function getPagesByCategory(category: string): PageData[] {
    return getSpiritualPages().filter(p => p.category === category);
}

export function getPagesBySlugs(slugs: string[]): PageData[] {
    const allPages = getSpiritualPages();
    const result: PageData[] = [];

    for (const slug of slugs) {
        const page = allPages.find(p => p.slug === slug);
        if (page) {
            result.push(page);
        } else if (process.env.NODE_ENV === 'development') {
            console.warn(`[Content] Slug not found: ${slug}`);
        }
    }

    return result;
}

export type LegalHrefMap = {
    avisoLegalHref: string | null;
    privacidadHref: string | null;
};

export function getLegalHrefMap(): LegalHrefMap {
    const legalPages = getLegalPages();

    const avisoLegal = legalPages.find(p => p.slug === 'aviso-legal');
    const privacidad = legalPages.find(p => p.slug === 'politica-de-privacidad');

    if (process.env.NODE_ENV === 'development') {
        if (!avisoLegal) {
            console.warn('[Content] Legal page "aviso-legal" not found');
        }
        if (!privacidad) {
            console.warn('[Content] Legal page "politica-de-privacidad" not found');
        }
    }

    return {
        avisoLegalHref: avisoLegal ? `/${avisoLegal.slug}` : null,
        privacidadHref: privacidad ? `/${privacidad.slug}` : null,
    };
}
