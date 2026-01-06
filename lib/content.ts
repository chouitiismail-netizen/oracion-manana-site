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

export function getAllPages(): PageData[] {
    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
    return files.map((file) => {
        const fullPath = path.join(CONTENT_DIR, file);
        const raw = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = matter(raw);
        return { ...(data as PageFrontmatter), content };
    });
}

export function getPageBySlug(slug: string): PageData | null {
    const pages = getAllPages();
    return pages.find((p) => p.slug === slug) ?? null;
}
