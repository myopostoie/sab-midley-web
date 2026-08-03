'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function PolesPage() {
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
      <Navbar />
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Nos Activités</span>
          <h2 className="text-4xl font-extrabold text-white">Nos Domaines d'Expertise</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">Une offre diversifiée pour répondre aux exigences des particuliers et des professionnels.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {poles.map((pole) => (
            <div key={pole.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/40 transition group">
              <div className="h-64 overflow-hidden relative">
                <img src={pole.image} alt={pole.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-4 left-4 bg-[#090A0C]/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                  {pole.badge}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-bold text-white">{pole.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{pole.description}</p>
                <div className="pt-4">
                  <Link href="/contact" className="inline-flex items-center space-x-2 text-sm font-bold text-[#D4AF37] hover:underline">
                    <span>Nous contacter pour ce pôle</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-900 bg-[#090A0C] py-12 px-6 text-center text-xs text-slate-500 space-y-4">
        <p className="font-bold text-slate-300 text-sm">SAB MIDLEY - Abomey-Calavi, Bénin</p>
        <p>© 2026 SAB MIDLEY. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
