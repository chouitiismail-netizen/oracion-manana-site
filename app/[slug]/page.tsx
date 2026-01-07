import { getAllPages, getPageBySlug } from "../../lib/content";
import ArticlePage from "../../components/ArticlePage";
import type { Metadata } from "next";

export async function generateStaticParams() {
    return getAllPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const page = getPageBySlug(slug);

    if (!page) {
        return {
            title: "Página no encontrada",
            description: "La página que buscas no existe.",
        };
    }

    const baseUrl = "https://oracionparadormirenpaz.com";

    return {
        title: page.metaTitle || page.title,
        description: page.metaDescription,
        keywords: page.keywords,
        alternates: {
            canonical: `${baseUrl}/${slug}`,
        },
        openGraph: {
            title: page.metaTitle || page.title,
            description: page.metaDescription,
            url: `${baseUrl}/${slug}`,
            siteName: "Oraciones para dormir en paz",
            locale: "es_ES",
            type: "article",
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const page = getPageBySlug(slug);
    const allPages = getAllPages();

    if (!page) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Página no encontrada</h1>
                    <p className="text-zinc-400 mb-8">La página que buscas no existe.</p>
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        Volver al inicio
                    </a>
                </div>
            </div>
        );
    }

    return <ArticlePage page={page} allPages={allPages} />;
}
