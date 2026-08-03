'use client';

import Link from 'next/link';
import Navbar from './components/Navbar';

export default function Home() {
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
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-white">Nos Domaines d'Expertise</h2>
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
                <Link href="/poles" className="text-xs font-bold text-[#D4AF37] hover:underline inline-flex items-center space-x-1">
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
