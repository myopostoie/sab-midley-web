'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import { productsList } from './products';

export default function Home() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // On prend un aperçu des 3 premiers produits de la boutique
  const previewProducts = productsList ? productsList.slice(0, 3) : [];

  return (
    <div className="min-h-screen bg-[#090A0C] text-slate-100 font-sans relative">
      <div className="bg-[#D4AF37] text-[#090A0C] text-xs md:text-sm font-bold py-2.5 px-4 text-center tracking-wide">
        Expansion Régionale en cours: Bénin, Côte d'Ivoire & Burkina Faso — Rejoignez notre réseau commercial.
      </div>
      <Navbar />

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
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Nos Pôles</span>
            <h2 className="text-3xl font-extrabold text-white">Nos Domaines d'Expertise</h2>
            <p className="text-slate-400 text-sm max-w-md">Une offre diversifiée pour répondre aux exigences des particuliers et des professionnels.</p>
          </div>
          <Link href="/poles" className="text-xs font-bold text-[#D4AF37] hover:underline inline-flex items-center space-x-1">
            <span>Voir tous les pôles</span>
            <span>→</span>
          </Link>
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
                <Link href="/poles" className="text-xs font-bold text-[#D4AF37] hover:underline inline-flex items-center space-x-1">
                  <span>En savoir plus</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Aperçu Boutique & Négoce */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Négoce & Distribution</span>
            <h2 className="text-3xl font-extrabold text-white">Aperçu de la Boutique</h2>
            <p className="text-slate-400 text-sm max-w-md">Découvrez une sélection de nos équipements et articles disponibles à la commande.</p>
          </div>
          <Link href="/boutique" className="text-xs font-bold text-[#D4AF37] hover:underline inline-flex items-center space-x-1">
            <span>Accéder à toute la boutique</span>
            <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewProducts.map((product: any) => (
            <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/40 transition">
              <div className="h-52 overflow-hidden relative">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-[#090A0C]/90 backdrop-blur-md px-3 py-1 rounded-lg text-sm font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                  {product.price}
                </div>
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">{product.title}</h3>
                  <p className="text-slate-400 text-xs line-clamp-2">{product.description}</p>
                </div>
                <Link href="/boutique" className="text-xs font-bold text-[#D4AF37] hover:underline inline-flex items-center space-x-1">
                  <span>Commander sur la boutique</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Aperçu Portail Partenaire & Carrières */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] uppercase">Réseau Commercial</span>
              <h3 className="text-2xl font-bold text-white">Portail Partenaire RC SAB MIDLEY</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Accédez aux ressources exclusives, aux guides partenaires et aux contrats officiels du réseau.
              </p>
            </div>
            <div>
              <Link href="/partenaire" className="inline-block px-6 py-3.5 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-sm hover:bg-[#c5a030] transition shadow-lg">
                Accéder au portail partenaire
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold px-3 py-1 rounded bg-slate-800 text-slate-300 uppercase">Opportunités</span>
              <h3 className="text-2xl font-bold text-white">Carrières & Recrutement</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Rejoignez une équipe dynamique et participez activement à l'expansion régionale en Afrique de l'Ouest.
              </p>
            </div>
            <div>
              <Link href="/carrieres" className="inline-block px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition">
                Postuler dès maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bouton Top Up Flottant */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="Retour en haut"
          className="fixed bottom-6 right-6 z-50 p-3.5 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold shadow-xl hover:bg-[#c5a030] transition flex items-center justify-center border border-[#090A0C]/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#090A0C] py-12 px-6 text-center text-xs text-slate-500 space-y-4">
        <p className="font-bold text-slate-300 text-sm">SAB MIDLEY - Abomey-Calavi, Bénin</p>
        <p>Contacts: Bénin: +229 01 69 32 55 76 | Côte d'Ivoire: +225 07 104 106 04 | Burkina Faso: +226 04 26 18 02</p>
        <p>© 2026 SAB MIDLEY. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
