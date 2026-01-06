'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and title */}
          <Link href="/" className="flex flex-col">
            <span className="text-lg font-bold text-white">Oraciones para dormir en paz</span>
            <span className="text-xs text-zinc-400 hidden sm:block">Oraciones y reflexiones originales</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-zinc-300 hover:text-white transition-colors">
              Inicio
            </Link>
            <Link href="/#dormir" className="text-sm text-zinc-300 hover:text-white transition-colors">
              Dormir
            </Link>
            <Link href="/aviso-legal" className="text-sm text-zinc-300 hover:text-white transition-colors">
              Aviso Legal
            </Link>
            <Link href="/politica-de-privacidad" className="text-sm text-zinc-300 hover:text-white transition-colors">
              Privacidad
            </Link>
            <a
              href="https://www.jesuscontigo.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Jesús Contigo
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
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
          <div className="md:hidden py-4 border-t border-zinc-800/50">
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-zinc-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/#dormir"
                className="text-sm text-zinc-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dormir
              </Link>
              <Link
                href="/aviso-legal"
                className="text-sm text-zinc-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Aviso Legal
              </Link>
              <Link
                href="/politica-de-privacidad"
                className="text-sm text-zinc-300 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Privacidad
              </Link>
              <a
                href="https://www.jesuscontigo.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors text-center"
              >
                Jesús Contigo
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
