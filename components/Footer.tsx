import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-zinc-800/60 bg-zinc-950/90">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Oraciones para dormir en paz</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Oraciones y reflexiones católicas originales para terminar el día con calma y fe.
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Contenido devocional creado con dedicación para acompañar tu vida espiritual.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Enlaces</h4>
            <div className="flex flex-col gap-2.5">
              <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-2 group">
                <svg className="w-3 h-3 text-zinc-600 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                Inicio
              </Link>
              <a
                href="https://www.jesuscontigo.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
              >
                <svg className="w-3 h-3 text-zinc-600 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
                </svg>
                Jesús Contigo
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <div className="flex flex-col gap-2.5">
              <Link href="/aviso-legal" className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-2 group">
                <svg className="w-3 h-3 text-zinc-600 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                </svg>
                Aviso Legal
              </Link>
              <Link href="/politica-de-privacidad" className="text-sm text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-2 group">
                <svg className="w-3 h-3 text-zinc-600 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-zinc-800/60">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-sm text-zinc-500">
              © {currentYear} Oraciones para dormir en paz. Contenido original.
            </p>
            <p className="text-xs text-zinc-600">
              Hecho con dedicación para tu vida espiritual
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
