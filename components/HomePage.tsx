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

  const grouped = useMemo(() => {
    return pages.reduce<Record<string, typeof pages>>((acc, p) => {
      acc[p.category] = acc[p.category] || [];
      acc[p.category].push(p);
      return acc;
    }, {});
  }, [pages]);

  const categories = useMemo(() => Object.keys(grouped).sort(), [grouped]);

  const filteredPages = useMemo(() => {
    return pages.filter(page => {
      const matchesSearch = searchQuery === '' ||
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.metaDescription.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [pages, searchQuery, selectedCategory]);

  const topRecommended = useMemo(() => {
    return pages.slice(0, 3);
  }, [pages]);

  const getCategoryDisplayName = (cat: string) => {
    if (cat === 'dormir') return 'Dormir';
    if (cat === 'legal') return 'Legal';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Oraciones para dormir en paz
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 mb-8">
              Oraciones y reflexiones originales para terminar el día con calma, soltar preocupaciones y descansar con fe.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-zinc-400">
              <span>{pages.length} oraciones disponibles</span>
            </div>
          </div>

          {/* Top 3 Recommended */}
          <div className="mt-16 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Comienza aquí</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topRecommended.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="group p-6 bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-xl hover:border-zinc-700 hover:bg-zinc-900/80 transition-all"
                >
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-600/20 text-blue-400 rounded-full mb-3">
                    {getCategoryDisplayName(page.category)}
                  </span>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-2">{page.metaDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar oraciones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                }`}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                  }`}
                >
                  {getCategoryDisplayName(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          {searchQuery && (
            <p className="text-sm text-zinc-400 mb-6">
              {filteredPages.length} {filteredPages.length === 1 ? 'resultado' : 'resultados'} encontrados
            </p>
          )}

          {/* Pages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="group p-6 bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-xl hover:border-zinc-700 hover:bg-zinc-900/80 transition-all hover:shadow-lg hover:shadow-blue-900/10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-zinc-800 text-zinc-300 rounded-full">
                      {getCategoryDisplayName(page.category)}
                    </span>
                    <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Leer →
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {page.title}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-3">{page.metaDescription}</p>
                </Link>
              ))}
          </div>

          {filteredPages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-zinc-400">No se encontraron oraciones que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
