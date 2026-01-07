'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { PageData } from '../lib/content';

interface HomePageProps {
  pages: PageData[];
}

export default function HomePage({ pages }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Separate prayer pages from legal pages
  const prayerPages = useMemo(() => {
    return pages.filter(p => p.category !== 'legal');
  }, [pages]);

  const legalPages = useMemo(() => {
    return pages.filter(p => p.category === 'legal');
  }, [pages]);

  // Get unique prayer categories (exclude legal)
  const prayerCategories = useMemo(() => {
    const cats = new Set(prayerPages.map(p => p.category || 'dormir'));
    return Array.from(cats).sort();
  }, [prayerPages]);

  // Smart selection for top 3 featured prayer pages
  const topRecommended = useMemo(() => {
    // Priority slugs for featured section
    const prioritySlugs = [
      'oracion-calmar-mente-antes-de-dormir',
      'oracion-para-dormir-en-paz',
      'oracion-noche-soltar-preocupaciones'
    ];

    const featured: PageData[] = [];

    // Try to get priority pages first
    for (const slug of prioritySlugs) {
      const page = prayerPages.find(p => p.slug === slug);
      if (page) featured.push(page);
      if (featured.length === 3) break;
    }

    // Fill remaining slots with first available prayer pages
    if (featured.length < 3) {
      for (const page of prayerPages) {
        if (!featured.includes(page)) {
          featured.push(page);
          if (featured.length === 3) break;
        }
      }
    }

    return featured;
  }, [prayerPages]);

  // Filter only prayer pages based on search and category
  const filteredPages = useMemo(() => {
    return prayerPages.filter(page => {
      const matchesSearch = searchQuery === '' ||
        (page.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (page.metaDescription || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [prayerPages, searchQuery, selectedCategory]);

  // Sort filtered pages by updatedAt desc, then title
  const sortedFilteredPages = useMemo(() => {
    return [...filteredPages].sort((a, b) => {
      const dateA = new Date(a.updatedAt || '2026-01-01').getTime();
      const dateB = new Date(b.updatedAt || '2026-01-01').getTime();

      if (dateB !== dateA) {
        return dateB - dateA; // Most recent first
      }

      return (a.title || '').localeCompare(b.title || '');
    });
  }, [filteredPages]);

  // Remove featured pages from main grid to avoid duplicates
  const mainGridPages = useMemo(() => {
    const featuredSlugs = new Set(topRecommended.map(p => p.slug));
    return sortedFilteredPages.filter(p => !featuredSlugs.has(p.slug));
  }, [sortedFilteredPages, topRecommended]);

  const getCategoryDisplayName = (cat: string | undefined) => {
    if (!cat) return 'Dormir';
    if (cat === 'dormir') return 'Dormir';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950/20 via-zinc-900 to-zinc-950 pt-24 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Oraciones para dormir en paz
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 mb-6 leading-relaxed max-w-3xl mx-auto">
              Oraciones y reflexiones católicas originales para terminar el día con calma, soltar preocupaciones y descansar con fe.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-zinc-400">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
                {prayerPages.length} oraciones disponibles
              </span>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Contenido original
              </span>
            </div>
          </div>

          {/* Top 3 Recommended */}
          <div className="mt-20 max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Comienza aquí</h2>
              <p className="text-zinc-400 text-sm sm:text-base">Las oraciones más útiles para empezar tu práctica nocturna</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {topRecommended.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="group relative p-6 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur border border-zinc-800/80 rounded-2xl hover:border-blue-700/50 hover:shadow-xl hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-600/20 text-blue-400 rounded-full mb-4">
                      {getCategoryDisplayName(page.category)}
                    </span>
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                      {page.title || 'Sin título'}
                    </h3>
                    <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                      {page.metaDescription || ''}
                    </p>
                    <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Leer más
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Todas las oraciones</h2>
            <p className="text-zinc-400 text-sm sm:text-base">Explora nuestra colección completa de oraciones nocturnas</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar por título o tema..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-900/70 border border-zinc-800/80 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600/50 focus:bg-zinc-900 transition-all"
                />
              </div>
            </div>

            {/* Category Filter - Only show if multiple prayer categories exist */}
            {prayerCategories.length > 1 && (
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                      : 'bg-zinc-900/70 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800/80'
                  }`}
                >
                  Todas
                </button>
                {prayerCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                        : 'bg-zinc-900/70 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800/80'
                    }`}
                  >
                    {getCategoryDisplayName(cat)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results count */}
          {searchQuery && (
            <p className="text-sm text-zinc-400 mb-6 text-center">
              {mainGridPages.length} {mainGridPages.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </p>
          )}

          {/* Pages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mainGridPages.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="group relative p-6 bg-zinc-900/50 backdrop-blur border border-zinc-800/80 rounded-xl hover:border-zinc-700/80 hover:bg-zinc-900/70 transition-all duration-200 hover:shadow-lg hover:shadow-black/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-zinc-800/80 text-zinc-300 rounded-full">
                    {getCategoryDisplayName(page.category)}
                  </span>
                  <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Leer
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                  {page.title || 'Sin título'}
                </h3>
                <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                  {page.metaDescription || ''}
                </p>
              </Link>
            ))}
          </div>

          {mainGridPages.length === 0 && (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-zinc-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p className="text-zinc-400 text-lg mb-2">No se encontraron oraciones</p>
              <p className="text-zinc-500 text-sm">Intenta con otros términos de búsqueda</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
