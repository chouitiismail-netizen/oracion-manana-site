'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import type { PageData } from '../lib/content';

interface ArticlePageProps {
  page: PageData;
  allPages: PageData[];
}

interface SectionData {
  heading: string;
  id: string;
  content: string[];
}

export default function ArticlePage({ page, allPages }: ArticlePageProps) {
  const sections = useMemo(() => {
    const lines = page.content.split('\n');
    const parsed: { type: 'heading' | 'content'; text: string; id: string }[] = [];

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        const title = line.replace('## ', '');
        const id = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-');
        parsed.push({ type: 'heading', text: title, id });
      } else if (line.trim()) {
        parsed.push({ type: 'content', text: line, id: '' });
      }
    });

    return parsed;
  }, [page.content]);

  const headings = useMemo(() => {
    return sections.filter(s => s.type === 'heading');
  }, [sections]);

  const { previous, next } = useMemo(() => {
    const sortedPages = [...allPages].sort((a, b) => a.title.localeCompare(b.title));
    const currentIndex = sortedPages.findIndex(p => p.slug === page.slug);

    return {
      previous: currentIndex > 0 ? sortedPages[currentIndex - 1] : null,
      next: currentIndex < sortedPages.length - 1 ? sortedPages[currentIndex + 1] : null,
    };
  }, [allPages, page.slug]);

  const renderContent = () => {
    const elements: React.ReactElement[] = [];
    let currentSection: SectionData | null = null;
    let showCTAAfter = false;

    sections.forEach((section, idx) => {
      if (section.type === 'heading') {
        // Render previous section if exists
        if (currentSection !== null) {
          const sectionToRender: SectionData = currentSection as SectionData;
          elements.push(
            <section key={sectionToRender.id} id={sectionToRender.id} className="scroll-mt-24 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">{sectionToRender.heading}</h2>
              <div className="prose prose-invert prose-lg max-w-none">
                {sectionToRender.content.map((text, i) => {
                  if (text.startsWith('**') && text.endsWith('**')) {
                    return (
                      <p key={i} className="text-zinc-200 leading-relaxed mb-4">
                        <strong className="font-semibold text-white">{text.replace(/\*\*/g, '')}</strong>
                      </p>
                    );
                  }
                  return (
                    <p key={i} className="text-zinc-300 leading-relaxed mb-4">
                      {text}
                    </p>
                  );
                })}
              </div>
            </section>
          );

          // Add CTA after Reflexión section
          if (showCTAAfter) {
            elements.push(
              <div key="cta" className="my-12 p-8 bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-800/30 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-3">Continúa acompañado</h3>
                <p className="text-zinc-300 mb-6 leading-relaxed">
                  Recibe apoyo espiritual diario y oraciones personalizadas en Jesús Contigo.
                </p>
                <a
                  href="https://www.jesuscontigo.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Ir a Jesús Contigo
                </a>
              </div>
            );
            showCTAAfter = false;
          }
        }

        // Start new section
        currentSection = {
          heading: section.text,
          id: section.id,
          content: [],
        };

        // Check if this is Reflexión to show CTA after it
        if (section.text === 'Reflexión') {
          showCTAAfter = true;
        }
      } else if (currentSection && section.text.trim()) {
        currentSection.content.push(section.text);
      }
    });

    // Render last section
    if (currentSection !== null) {
      const sectionToRender: SectionData = currentSection as SectionData;
      elements.push(
        <section key={sectionToRender.id} id={sectionToRender.id} className="scroll-mt-24 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">{sectionToRender.heading}</h2>
          <div className="prose prose-invert prose-lg max-w-none">
            {sectionToRender.content.map((text, i) => {
              if (text.startsWith('**') && text.endsWith('**')) {
                return (
                  <p key={i} className="text-zinc-200 leading-relaxed mb-4">
                    <strong className="font-semibold text-white">{text.replace(/\*\*/g, '')}</strong>
                  </p>
                );
              }
              return (
                <p key={i} className="text-zinc-300 leading-relaxed mb-4">
                  {text}
                </p>
              );
            })}
          </div>
        </section>
      );
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al inicio
        </Link>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main content */}
          <article className="lg:col-span-8">
            {/* Header */}
            <header className="mb-12">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-zinc-800 text-zinc-300 rounded-full mb-4">
                {page.category.charAt(0).toUpperCase() + page.category.slice(1)}
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                {page.title}
              </h1>
              <p className="text-xl text-zinc-400 leading-relaxed">
                {page.metaDescription}
              </p>
            </header>

            {/* Content sections */}
            <div className="space-y-8">
              {renderContent()}
            </div>

            {/* Navigation */}
            <nav className="mt-16 pt-8 border-t border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {previous && (
                  <Link
                    href={`/${previous.slug}`}
                    className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 hover:bg-zinc-900/80 transition-all"
                  >
                    <span className="text-xs text-zinc-500 mb-2 block">← Anterior</span>
                    <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors line-clamp-2">
                      {previous.title}
                    </h3>
                  </Link>
                )}
                {next && (
                  <Link
                    href={`/${next.slug}`}
                    className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 hover:bg-zinc-900/80 transition-all sm:text-right"
                  >
                    <span className="text-xs text-zinc-500 mb-2 block">Siguiente →</span>
                    <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors line-clamp-2">
                      {next.title}
                    </h3>
                  </Link>
                )}
              </div>
            </nav>
          </article>

          {/* Table of contents - Desktop only */}
          {headings.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24">
                <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <h2 className="text-sm font-semibold text-white mb-4">Contenido</h2>
                  <nav className="space-y-2">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className="block text-sm text-zinc-400 hover:text-white transition-colors py-1"
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
