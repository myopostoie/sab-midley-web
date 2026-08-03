'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const poles = [
    {
      id: 'immobilier',
      title: 'Courtage & Immobilier International',
      description: "Location d'appartements d'exception, courtage automobile haut de gamme et investissements sécurisés.",
      badge: 'Pôle 01',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'negoce',
      title: 'Négoce & Commerce Général',
      description: 'Import-export premium, approvisionnement mondial en équipements, mobilier et luminaires design.',
      badge: 'Pôle 02',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'conciergerie',
      title: 'Assistance Administrative & Mobilité',
      description: 'Accompagnement sur-mesure pour vos procédures de visa et conciergerie administrative globale.',
      badge: 'Pôle 03',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'academy',
      title: 'Digital & Formation (Academy)',
      description: 'Programmes de pointe en e-commerce, conception web, stratégie de marque et design.',
      badge: 'Pôle 04',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    }
  ];

  return (
    <div className="min-h-screen bg-[#090A0C] text-slate-100 font-sans relative">
      {/* Barre d'alerte haut */}
      <div className="bg-[#D4AF37] text-[#090A0C] text-xs md:text-sm font-bold py-2.5 px-4 text-center tracking-wide">
        Expansion Régionale en cours: Bénin, Côte d'Ivoire & Burkina Faso — Rejoignez notre réseau commercial.
      </div>

      {/* Navbar intégrée directement pour éviter les erreurs de chemin */}
      <header className="sticky top-0 z-40 bg-[#090A0C]/90 backdrop-blur-md border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-xl font-black text-white tracking-wider text-left">
              SAB <span className="text-[#D4AF37]">MIDLEY</span>
            </Link>
          </div>

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

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#090A0C] border-t border-[#D4AF37]/20 px-6 py-5 space-y-4 shadow-2xl">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">Accueil</Link>
            <Link href="/poles" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">Nos Pôles</Link>
            <Link href="/boutique" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">Boutique & Négoce</Link>
            <Link href="/carrieres" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">Carrières</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">Contact</Link>
            <div className="pt-2">
              <Link href="/partenaire" onClick={() => setMobileMenuOpen(false)} className="block text-center w-full px-5 py-3 rounded-lg bg-[#D4AF37] text-[#090A0C] font-bold text-sm">
                Portail Partenaire
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold tracking-widest uppercase">
          Excellence & Fiabilité en Afrique de l'Ouest
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Votre Partenaire Stratégique en <span className="text-[#D4AF37]">Négoce et Services</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
          Implantés à Abomey-Calavi (Bénin) et en expansion sur la Côte d'Ivoire et le Burkina Faso, nous connectons ambition et opportunités à travers nos quatre pôles d'excellence.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Link href="/poles" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20">
            Découvrir nos Pôles
          </Link>
          <Link href="/boutique" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold hover:border-[#D4AF37]/50 transition">
            Visiter la Boutique
          </Link>
        </div>
      </section>

      {/* Section Aperçu des Pôles */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/10 text-[#D4AF37] uppercase tracking-wider inline-block">NOS ACTIVITÉS</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Nos Domaines d'Expertise</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">Une offre diversifiée pour répondre aux exigences des particuliers et des professionnels.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {poles.map((pole) => (
            <div key={pole.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/40 transition group">
              <div className="h-48 overflow-hidden relative">
                <img src={pole.image} alt={pole.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-4 left-4 bg-[#090A0C]/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                  {pole.badge}
                </div>
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">{pole.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{pole.description}</p>
                </div>
                <Link href="/poles" className="text-xs font-bold text-[#D4AF37] hover:underline inline-flex items-center space-x-1 pt-2">
                  <span>En savoir plus</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#090A0C] py-12 px-6 text-center text-xs text-slate-500 space-y-4">
        <p className="font-bold text-slate-300 text-sm">SAB MIDLEY - Abomey-Calavi, Bénin</p>
        <p>Contacts: Bénin: +229 01 69 32 55 76 | Côte d'Ivoire: +225 07 104 106 04 | Burkina Faso: +226 04 26 18 02</p>
        <p>© 2026 SAB MIDLEY. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
