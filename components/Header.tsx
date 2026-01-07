'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/60 shadow-lg shadow-black/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo and title */}
          <Link href="/" className="flex flex-col group">
            <span className="text-lg lg:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              Oraciones para dormir en paz
            </span>
            <span className="text-xs text-zinc-500 hidden sm:block">Oraciones y reflexiones originales</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/"
              className={`px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/')
                  ? 'text-white bg-zinc-800/60'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/aviso-legal"
              className={`px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/aviso-legal')
                  ? 'text-white bg-zinc-800/60'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              }`}
            >
              Aviso Legal
            </Link>
            <Link
              href="/politica-de-privacidad"
              className={`px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive('/politica-de-privacidad')
                  ? 'text-white bg-zinc-800/60'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
              }`}
            >
              Privacidad
            </Link>
            <div className="ml-2 lg:ml-4">
              <a
                href="https://www.jesuscontigo.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 lg:px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-blue-900/30 hover:shadow-blue-900/40"
              >
                Jesús Contigo
              </a>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/40"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800/60">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/')
                    ? 'text-white bg-zinc-800/60'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/aviso-legal"
                className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/aviso-legal')
                    ? 'text-white bg-zinc-800/60'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Aviso Legal
              </Link>
              <Link
                href="/politica-de-privacidad"
                className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/politica-de-privacidad')
                    ? 'text-white bg-zinc-800/60'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Privacidad
              </Link>
              <div className="mt-3 pt-3 border-t border-zinc-800/60">
                <a
                  href="https://www.jesuscontigo.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all text-center shadow-lg shadow-blue-900/30"
                >
                  Jesús Contigo
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
