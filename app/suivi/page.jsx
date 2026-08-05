'use client';

import { useState } from 'react';

export default function SuiviPartenaire() {
  const [inputID, setInputID] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [partenaireConnecte, setPartenaireConnecte] = useState(null);
  const [erreur, setErreur] = useState('');
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' ou 'conseils'

  const handleLogin = async (e) => {
    e.preventDefault();
    setErreur('');

    try {
      // Récupération en direct de votre Google Sheets via l'API SheetDB
      const res = await fetch('https://sheetdb.io/api/v1/8wip7h4q3wv3c');
      const partenairesList = await res.json();

      // Recherche du partenaire correspondant
      const trouve = partenairesList.find(
        (p) => String(p.Identifiant).trim() === inputID.trim() && String(p.CodeRC).trim() === inputCode.trim()
      );

      if (trouve) {
        // Adaptation des données reçues pour correspondre au design de votre page
        const partenaireFormate = {
          identifiant: trouve.Identifiant,
          codeRc: trouve.CodeRC,
          nom: trouve.Nom,
          niveau: trouve.Niveau,
          ventes: Number(trouve.Ventes || 0),
          chiffreAffaires: trouve.ChiffreAffaires ? trouve.ChiffreAffaires + " FCFA" : "0 FCFA",
          commission: trouve.Commission ? trouve.Commission + " FCFA" : "0 FCFA",
          motivation: trouve.Motivation || "Continuez vos efforts !"
        };
        setPartenaireConnecte(partenaireFormate);
      } else {
        setErreur("Identifiant ou Code RC incorrect. Vérifiez vos informations.");
      }
    } catch (err) {
      setErreur("Erreur de connexion au serveur de données.");
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
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Numéro de téléphone </label>
                <input
                  type="text"
                  value={inputID}
                  onChange={(e) => setInputID(e.target.value)}
                  placeholder="Ex: 2290169325576"
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
                Conseils de vente & Support
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
                    <a href="https://raw.githubusercontent.com/myopostoie/sab-midley-files/main/Guide%20MAJ%20RC%20SAB%20MIDLEY%202026.pdf#toolbar=0" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 transition flex items-center justify-between text-[#D4AF37] font-bold">
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

            {/* ONGLET 2 : CONSEILS DE VENTE & SUPPORT CLIENT */}
            {activeTab === 'conseils' && (
              <div className="space-y-4 text-xs leading-relaxed max-h-[420px] overflow-y-auto pr-1">
                
                {/* Introduction Assistance */}
                <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-center space-y-1">
                  <p className="font-bold text-sm">🤝 Nous sommes à vos côtés à chaque étape !</p>
                  <p className="text-slate-300 text-[11px]">Notre équipe vous accompagne, vous forme et gère toute la logistique pour que vous puissiez vous concentrer uniquement sur vos ventes et vos profits.</p>
                </div>

                {/* Section Astuces de Vente Avancées */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h3 className="font-bold text-[#D4AF37] text-sm">💡 Astuces de Vente Efficaces</h3>
                  <div className="space-y-2 text-slate-300">
                    <p>🔥 <strong>Créez l'urgence :</strong> Signalez à vos clients que les stocks sont limités pour déclencher l'achat immédiat.</p>
                    <p>📸 <strong>Misez sur le visuel :</strong> Récupérez les photos nettes des canaux WhatsApp et postez-les partout (Statuts, Groupes, Facebook Marketplace).</p>
                    <p>💬 <strong>La règle du premier contact :</strong> Soyez toujours chaleureux, réactif et posez des questions pour comprendre le vrai besoin du client.</p>
                  </div>
                </div>

                {/* Section Annonces (FB Marketplace & TikTok) */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h3 className="font-bold text-emerald-400 text-sm">🚀 Optimiser vos Annonces (FB, TikTok & Statuts)</h3>
                  <div className="space-y-2 text-slate-300">
                    <p>📍 <strong>Facebook Marketplace :</strong> Utilisez des titres clairs et géolocalisés (ex: <em>"Article haut de gamme disponible - Livraison rapide"</em>). Renouvelez vos annonces régulièrement.</p>
                    <p>🎬 <strong>TikTok & Reels :</strong> Filmez des vidéos courtes montrant l'article sous tous ses angles avec une musique tendance. Mettez un appel à l'action clair en description.</p>
                    <p>🟢 <strong>Statuts WhatsApp :</strong> Publiez 3 à 5 produits par jour. C'est votre canal le plus puissant car vos contacts vous font déjà confiance.</p>
                  </div>
                </div>

                {/* Section Contact / Support & Commande Client */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-[#D4AF37]/50 space-y-3 text-center">
                  <h3 className="font-bold text-white text-sm">📞 Besoin d'aide ou d'effectuer une commande client ?</h3>
                  <p className="text-slate-300 text-[11px]">
                    Une question sur un produit, un client prêt à commander ou besoin d'un accompagnement personnalisé ? Contactez-nous directement !
                  </p>
                  <div className="pt-1">
                    <a 
                      href="https://wa.me/22969325576?text=Bonjour,%2520je%2520suis%2520partenaire%2520et%2520j'ai%2520besoin%2520d'assistance%2520pour%2520une%2520commande." 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block px-6 py-3 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-xs hover:bg-[#c5a030] transition shadow-lg"
                    >
                      Joindre le Support / Valider une commande
                    </a>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}