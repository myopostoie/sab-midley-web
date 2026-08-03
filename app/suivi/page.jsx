'use client';

import { useState } from 'react';
import { partenairesList } from '../partenairesData';

export default function SuiviPartenaire() {
  const [inputID, setInputID] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [partenaireConnecte, setPartenaireConnecte] = useState(null);
  const [erreur, setErreur] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErreur('');

    const trouve = partenairesList.find(
      (p) => p.identifiant === inputID.trim() && p.codeRc === inputCode.trim()
    );

    if (trouve) {
      setPartenaireConnecte(trouve);
    } else {
      setErreur("Identifiant ou Code RC incorrect. Vérifiez vos informations.");
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0C] text-slate-100 p-6 flex flex-col justify-center items-center font-sans">
      <div className="max-w-xl w-full bg-slate-900 border border-[#D4AF37]/40 rounded-3xl p-8 shadow-2xl">
        
        {!partenaireConnecte ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] uppercase">Espace Partenaire</span>
              <h1 className="text-2xl font-extrabold text-white">Suivi de vos Ventes & Commissions</h1>
              <p className="text-slate-400 text-xs">Connectez-vous avec votre numéro (ou email) et votre Code RC.</p>
            </div>

            {erreur && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-red-400 text-xs text-center">
                {erreur}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Numéro de téléphone ou Email</label>
                <input
                  type="text"
                  value={inputID}
                  onChange={(e) => setInputID(e.target.value)}
                  placeholder="Ex: +22969325576"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Code RC Partenaire</label>
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Ex: RC26"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-xs hover:bg-[#c5a030] transition shadow-lg"
              >
                Accéder à mon espace
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-[#D4AF37]">{partenaireConnecte.niveau}</span>
                <h2 className="text-xl font-bold text-white">Bonjour, {partenaireConnecte.nom}</h2>
              </div>
              <button
                onClick={() => setPartenaireConnecte(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
              >
                Déconnexion
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs leading-relaxed">
              <strong>Mot de l'équipe :</strong> {partenaireConnecte.motivation}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase">Ventes Réalisées</p>
                <p className="text-lg font-bold text-white mt-1">{partenaireConnecte.ventes}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase">Chiffre d'Affaires</p>
                <p className="text-lg font-bold text-white mt-1">{partenaireConnecte.chiffreAffaires}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 uppercase">Commission Gagnée</p>
                <p className="text-lg font-bold text-emerald-400 mt-1">{partenaireConnecte.commission}</p>
              </div>
            </div>

            <div className="text-center pt-2">
              <p className="text-[11px] text-slate-500">Votre Code RC officiel : <strong className="text-white">{partenaireConnecte.codeRc}</strong></p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
