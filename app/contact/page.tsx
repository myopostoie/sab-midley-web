'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function ContactPage() {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Général',
    message: '',
  });

  const handleContactChange = (e: any) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e: any) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 5000);
    setContactForm({ name: '', email: '', phone: '', subject: 'Général', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#090A0C] text-slate-100 font-sans relative">
      <Navbar />
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Restons en contact</span>
            <h2 className="text-3xl font-extrabold text-white">Contactez-nous</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">Une question sur nos services, une commande ou un partenariat? Écrivez-nous.</p>
          </div>

          {contactSubmitted ? (
            <div className="p-6 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-center text-emerald-400 text-sm font-semibold">
              Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    placeholder="Votre nom"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="votre@email.com"
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
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    placeholder="+229..."
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Sujet</label>
                  <select
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                  >
                    <option value="Général">Question générale</option>
                    <option value="Immobilier">Immobilier & Courtage</option>
                    <option value="Négoce">Négoce & Commandes</option>
                    <option value="Partenariat">Réseau Partenaire</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder="Votre message..."
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                ></textarea>
              </div>
              <button type="submit" className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20">
                Envoyer le message
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
