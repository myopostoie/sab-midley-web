'use client';

import { useState } from 'react';
import { partenairesList } from '../partenairesData';

export default function SuiviPartenaire() {
  const [inputID, setInputID] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [partenaireConnecte, setPartenaireConnecte] = useState(null);
  const [erreur, setErreur] = useState('');
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' ou 'conseils'

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
    <div className="min-h-screen bg-[#090A0C] text-slate-100 p-4 sm:p-6 flex flex-col justify-center items-center font-sans">
      <div className="max-w-2xl w-full bg-slate-900 border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
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
            {/* En-tête du tableau de bord */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-[#D4AF37]">{partenaireConnecte.niveau}</span>
                <h2 className="text-xl font-bold text-white">Bonjour, {partenaireConnecte.nom}</h2>
              </div>
              <button
                onClick={() => setPartenaireConnecte(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 transition"
              >
                Déconnexion
              </button>
            </div>

            {/* Navigation interne épurée */}
            <div className="flex space-x-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'stats' ? 'bg-[#D4AF37] text-[#090A0C]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Tableau de bord & Canaux
              </button>
              <button
                onClick={() => setActiveTab('conseils')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'conseils' ? 'bg-[#D4AF37] text-[#090A0C]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Conseils & Histoires de Succès
              </button>
            </div>

            {/* ONGLET 1 : STATS, CANAUX & GUIDE */}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs leading-relaxed">
                  <strong>Mot de l'équipe :</strong> {partenaireConnecte.motivation}
                </div>

                {/* Statistiques */}
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

                {/* Canaux WhatsApp et Guide */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase text-[#D4AF37] tracking-wider">Accès Direct & Ressources</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <a href="https://whatsapp.com/channel/0029Vb8gOUW5EjxzqTnZ713v" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition flex items-center justify-between text-slate-200">
                      <span>🟢 Canal : En stock</span>
                      <span className="text-[#D4AF37] font-bold">Accéder</span>
                    </a>
                    <a href="https://whatsapp.com/channel/0029VbDsUK6KbYMQEmAgCt3O" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition flex items-center justify-between text-slate-200">
                      <span>🔴 Canal : Rupture de stock</span>
                      <span className="text-[#D4AF37] font-bold">Accéder</span>
                    </a>
                    <a href="https://whatsapp.com/channel/0029Vb8a9RgAzNc1IBH2Xo2D" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 transition flex items-center justify-between text-slate-200">
                      <span>🟡 Canal : Bientôt en stock</span>
                      <span className="text-[#D4AF37] font-bold">Accéder</span>
                    </a>
                    <a href="https://uploadnow.io/f/2Q1vYW1" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 transition flex items-center justify-between text-[#D4AF37] font-bold">
                      <span>📄 Télécharger le Guide PDF</span>
                      <span>Ouvrir</span>
                    </a>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <p className="text-[11px] text-slate-500">Votre Code RC officiel : <strong className="text-white">{partenaireConnecte.codeRc}</strong></p>
                </div>
              </div>
            )}

            {/* ONGLET 2 : CONSEILS MARKETING & HISTOIRES DE PERSÉVÉRANCE */}
            {activeTab === 'conseils' && (
              <div className="space-y-4 text-xs leading-relaxed max-h-[400px] overflow-y-auto pr-1">
                
                {/* Stratégie Facebook & Marketplace */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <h3 className="font-bold text-[#D4AF37] text-sm">🏪 Stratégie Facebook & Marketplace</h3>
                  <p className="text-slate-300">Ne publiez pas seulement "à vendre". Créez le besoin :</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
                    <li>Utilisez des photos lumineuses prises directement des canaux WhatsApp.</li>
                    <li>Mettez des prix clairs et précisez la zone (ex: <em>Disponible à Cotonou / Abidjan / Ouagadougou</em>).</li>
                    <li>Renouvelez vos annonces tous les 3 jours pour rester en tête des recherches.</li>
                  </ul>
                </div>

                {/* Stratégie TikTok & Statuts */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <h3 className="font-bold text-emerald-400 text-sm">🎬 Puissance des Statuts & TikTok</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
                    <li>Postez au moins 3 à 5 produits par jour sur vos statuts WhatsApp avec vos contacts.</li>
                    <li>Sur TikTok, faites de courtes vidéos rythmées montrant l'utilité du produit.</li>
                    <li>Rappelez toujours à la fin : <em>"Commandez via mon code RC [Votre Code]"</em>.</li>
                  </ul>
                </div>

                {/* Histoires et Leçons de Persévérance */}
                <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 space-y-2">
                  <h3 className="font-bold text-[#D4AF37] text-sm">📖 Leçon de Persévérance : L'effet de累積 (La constance)</h3>
                  <p className="text-slate-200 italic">
                    "Au début, le plus dur n'est pas de vendre, c'est de se faire connaître. Les plus grands vendeurs de notre réseau ont commencé avec zéro vente la première semaine. Ce qui a fait la différence ? Ils n'ont pas abandonné après 3 refus. Ils ont continué à poster chaque jour, à parler de leurs produits autour d'eux. La chance sourit à ceux qui persévèrent."
                  </p>
                  <p className="text-[11px] text-[#D4AF37] font-semibold pt-1">
                    Règle d'or : Un client qui dit "non aujourd'hui" dira "oui le mois prochain" si vos statuts continuent de lui inspirer confiance.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/30 text-sky-300 text-[11px] text-center">
                  💡 <strong>Rappel :</strong> La constance bat le talent. Postez régulièrement, restez motivé, et regardez vos commissions grimper !
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
