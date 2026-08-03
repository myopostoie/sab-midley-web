'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function CarrieresPage() {
  const [careerSubmitted, setCareerSubmitted] = useState(false);
  const [careerForm, setCareerForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'BJ',
    experience: 'Débutant',
    motivation: '',
  });

  const handleCareerChange = (e: any) => {
    setCareerForm({ ...careerForm, [e.target.name]: e.target.value });
  };

  const handleCareerSubmit = (e: any) => {
    e.preventDefault();
    setCareerSubmitted(true);
    setTimeout(() => setCareerSubmitted(false), 5000);
    setCareerForm({ fullName: '', email: '', phone: '', country: 'BJ', experience: 'Débutant', motivation: '' });
  };

  return (
    <div className="min-h-screen bg-[#090A0C] text-slate-100 font-sans relative">
      <Navbar />
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Rejoignez l'équipe</span>
            <h2 className="text-3xl font-extrabold text-white">Carrières & Opportunités</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">Vous souhaitez contribuer au développement d'un acteur majeur du négoce en Afrique ? Postulez dès maintenant.</p>
          </div>

          {careerSubmitted ? (
            <div className="p-6 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-center text-emerald-400 text-sm font-semibold">
              Votre candidature a bien été transmise. Notre équipe des ressources humaines vous contactera prochainement.
            </div>
          ) : (
            <form onSubmit={handleCareerSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Nom complet</label>
                  <input
                    type="text"
                    name="fullName"
                    value={careerForm.fullName}
                    onChange={handleCareerChange}
                    placeholder="Ex: Jean Dupont"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={careerForm.email}
                    onChange={handleCareerChange}
                    placeholder="jean@example.com"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Téléphone</label>
                  <input
                    type="text"
                    name="phone"
                    value={careerForm.phone}
                    onChange={handleCareerChange}
                    placeholder="+229 01..."
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Pays</label>
                  <select
                    name="country"
                    value={careerForm.country}
                    onChange={handleCareerChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                  >
                    <option value="BJ">Bénin</option>
                    <option value="CI">Côte d'Ivoire</option>
                    <option value="BF">Burkina Faso</option>
                    <option value="TG">Togo</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Motivation / Profil</label>
                <textarea
                  name="motivation"
                  rows={4}
                  value={careerForm.motivation}
                  onChange={handleCareerChange}
                  placeholder="Décrivez brièvement votre parcours et vos motivations..."
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                ></textarea>
              </div>
              <button type="submit" className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20">
                Envoyer ma candidature
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="border-t border-slate-900 bg-[#090A0C] py-12 px-6 text-center text-xs text-slate-500 space-y-4">
        <p className="font-bold text-slate-300 text-sm">SAB MIDLEY - Abomey-Calavi, Bénin</p>
        <p>© 2026 SAB MIDLEY. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
