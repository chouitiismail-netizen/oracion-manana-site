import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-zinc-800/50 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold mb-2">Oraciones para dormir en paz</h3>
            <p className="text-sm text-zinc-400">
              Oraciones y reflexiones originales para terminar el día con calma y fe.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Enlaces</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Inicio
              </Link>
              <a
                href="https://www.jesuscontigo.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Jesús Contigo
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
            <div className="flex flex-col gap-2">
              <Link href="/aviso-legal" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Aviso Legal
              </Link>
              <Link href="/politica-de-privacidad" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800/50 text-center">
          <p className="text-sm text-zinc-500">
            © {currentYear} Oraciones para dormir en paz. Contenido original.
          </p>
        </div>
      </div>
    </footer>
  );
}
