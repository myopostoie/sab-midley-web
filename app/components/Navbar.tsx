'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#090A0C]/90 backdrop-blur-md border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="text-xl font-black text-white tracking-wider text-left">
            SAB <span className="text-[#D4AF37]">MIDLEY</span>
          </Link>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-[#D4AF37] transition">Accueil</Link>
          <Link href="/poles" className="hover:text-[#D4AF37] transition">Nos Pôles</Link>
          <Link href="/boutique" className="hover:text-[#D4AF37] transition">Boutique & Négoce</Link>
          <Link href="/carrieres" className="hover:text-[#D4AF37] transition">Carrières</Link>
          <Link href="/contact" className="hover:text-[#D4AF37] transition">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/partenaire"
            className="px-5 py-2.5 rounded-lg font-bold text-sm transition shadow-md bg-[#D4AF37] text-[#090A0C] hover:bg-[#c5a030] shadow-[#D4AF37]/20"
          >
            Portail Partenaire
          </Link>
        </div>

        {/* Bouton Burger Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white focus:outline-none p-2"
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu Déroulant Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090A0C] border-t border-[#D4AF37]/20 px-6 py-5 space-y-4 shadow-2xl">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">
            Accueil
          </Link>
          <Link href="/poles" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">
            Nos Pôles
          </Link>
          <Link href="/boutique" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">
            Boutique & Négoce
          </Link>
          <Link href="/carrieres" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">
            Carrières
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">
            Contact
          </Link>
          <div className="pt-2">
            <Link href="/partenaire" onClick={() => setMobileMenuOpen(false)} className="block text-center w-full px-5 py-3 rounded-lg bg-[#D4AF37] text-[#090A0C] font-bold text-sm">
              Portail Partenaire
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
