'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function PartenairePage() {
  const [partnerLoggedIn, setPartnerLoggedIn] = useState(false);
  const [universalPasswordInput, setUniversalPasswordInput] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleUniversalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Comparaison directe avec le mot de passe sécurisé 
    // (Note: Pour un mot de passe universel simple, le comparer côté client ou via une API route évite les bugs de Server Action mal configurée)
    if (universalPasswordInput.trim() === "rcsabmidley2026") {
      setPartnerLoggedIn(true);
    } else {
      alert("Mot de passe incorrect. Veuillez vérifier le code d'accès fourni par le réseau.");
    }
  };

  // ... (conservez exactement tout votre tableau faqList ici)
  const faqList = [
    {
      question: "1. Comment devenir partenaire ?",
      answer: "Rendez-vous sur https://www.sabmidley.co/partenaire\n\nVous y trouverez le contrat de partenariat et toutes les informations utiles."
    },
    // ... (gardez tous les autres éléments de la FAQ à l'identique)
  ];

  return (
    <div className="min-h-screen bg-[#090A0C] text-slate-100 font-sans relative">
      <Navbar />
      <section className="py-16 px-6 max-w-4xl mx-auto min-h-[75vh] flex flex-col justify-center">
        {!partnerLoggedIn ? (
          <div className="bg-slate-900 border border-[#D4AF37]/40 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Accès Réservé Partenaires</span>
              <h2 className="text-3xl font-extrabold text-white">Portail Partenaire RC SAB MIDLEY</h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Veuillez entrer le mot de passe universel du réseau pour accéder aux informations, guides et ressources de partenariat.
              </p>
            </div>
            <form onSubmit={handleUniversalLogin} className="space-y-6 max-w-md mx-auto w-full">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Mot de passe unique</label>
                <input
                  type="password"
                  value={universalPasswordInput}
                  onChange={(e) => setUniversalPasswordInput(e.target.value)}
                  placeholder="Entrez le mot de passe du réseau"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20"
              >
                Entrer sur le portail
              </button>
              <div className="text-center">
                <p className="text-xs text-slate-500">Entrez le mot de passe fourni dans le groupe <strong className="text-[#D4AF37]">Bonne connexion</strong></p>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-slate-900 border border-[#D4AF37]/40 rounded-3xl p-8 md:p-12 shadow-2xl space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-6 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Espace Privé Partenaire</span>
                <h2 className="text-3xl font-extrabold text-white">Portail Partenaire RC SAB MIDLEY</h2>
              </div>
              <button
                onClick={() => { setPartnerLoggedIn(false); setUniversalPasswordInput(''); }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              >
                Fermer la session
              </button>
            </div>

            <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
              <p className="text-base font-semibold text-white">Bienvenue dans le Réseau Commercial RC SAB MIDLEY.</p>
              <p>Cette page regroupe toutes les informations et ressources nécessaires pour démarrer votre activité de partenaire dans les meilleures conditions.</p>
            </div>

            {/* Le reste de votre contenu (contrats, guide, FAQ, etc.) reste exactement pareil ici */}
            
          </div>
        )}
      </section>

      <footer className="border-t border-slate-900 bg-[#090A0C] py-12 px-6 text-center text-xs text-slate-500 space-y-4">
        <p className="font-bold text-slate-300 text-sm">SAB MIDLEY - Abomey-Calavi, Bénin</p>
        <p>© 2026 SAB MIDLEY. Tous droits réservés.</p>
      </footer>
    </div>
  );
}