'use client';

import { useState } from 'react';

export default function SuiviPartenaire() {
  const [inputID, setInputID] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [partenaireConnecte, setPartenaireConnecte] = useState(null);
  const [erreur, setErreur] = useState('');
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' ou 'conseils'
  
  // État pour gérer l'accordéon de la FAQ (garde en mémoire quelle question est ouverte)
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErreur('');

    try {
      const res = await fetch('https://sheetdb.io/api/v1/8wip7h4q3wv3c');
      const partenairesList = await res.json();

      const trouve = partenairesList.find(
        (p) => String(p.Identifiant).trim() === inputID.trim() && String(p.CodeRC).trim() === inputCode.trim()
      );

      if (trouve) {
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

  // Liste des questions/réponses de la FAQ
  const faqList = [
    {
      question: "1. Comment devenir partenaire ?",
      answer: "Rendez-vous sur https://www.sabmidley.co/partenaire\n\nMot de passe universel : rcsabmidley2026\n\nVous y trouverez le contrat de partenariat et toutes les informations utiles."
    },
    {
      question: "2. Dois-je remplir la partie “Code RC” du contrat ?",
      answer: "Non.\n\nLaissez cette partie vide. Le Code RC est attribué uniquement par l’équipe après validation de votre contrat."
    },
    {
      question: "3. Comment obtenir mon Code RC Partenaire ?",
      answer: "Après avoir rempli, signé et envoyé votre contrat, notre équipe procède à sa vérification.\n\nUne fois validé, un Code RC individuel vous est attribué.\n\nCe code permet :\n• d’identifier vos ventes ;\n• de suivre vos commissions ;\n• d’accéder à votre espace partenaire."
    },
    {
      question: "4. Dois-je investir de l’argent ?",
      answer: "Non.\n\nAucun investissement n’est demandé pour devenir partenaire."
    },
    {
      question: "5. Dois-je acheter un stock ?",
      answer: "Non.\n\nLes produits restent en stock chez nous."
    },
    {
      question: "6. Qui effectue les livraisons ?",
      answer: "Toutes les livraisons sont assurées par l’équipe."
    },
    {
      question: "7. Quel est le montant des commissions ?",
      answer: "Les commissions varient entre 10 % et 20 %, selon le produit.\n\nLe taux est indiqué sur chaque publication dans le canal partenaire."
    },
    {
      question: "8. Quand mes commissions sont-elles payées ?",
      answer: "Les commissions sont versées 24 heures après la livraison effective de la commande."
    },
    {
      question: "9. Comment consulter mes ventes et mes commissions ?",
      answer: "Connectez-vous sur :\nhttps://www.sabmidley.co/suivi\n\navec :\n• votre numéro de téléphone\n• votre Code RC"
    },
    {
      question: "10. J’ai oublié mon Code RC ou je n’arrive pas à me connecter.",
      answer: "Contactez l’assistance au :\n+229 01 69 32 55 76"
    },
    {
      question: "11. Puis-je envoyer mon client dans votre local ?",
      answer: "Oui.\n\nVotre client peut visiter notre local afin d’être rassuré avant son achat.\n\nMerci de nous prévenir à l’avance afin que notre équipe puisse l’accueillir."
    },
    {
      question: "12. Puis-je venir signer mon contrat dans votre local ?",
      answer: "Oui.\n\nVous pouvez vous rendre directement dans notre local si vous souhaitez être accompagné."
    },
    {
      question: "13. Comment fonctionne le paiement à la livraison ?",
      answer: "Le paiement à la livraison est disponible à Cotonou et Abomey-Calavi pour les commandes inférieures à 70 000 FCFA.\n\nAu-delà de ce montant, ou pour les autres villes, le client devra :\n• effectuer le paiement avant l’expédition ; ou\n• se rendre dans notre local pour finaliser son achat."
    },
    {
      question: "14. Puis-je modifier les prix des produits ?",
      answer: "Non.\n\nLes prix communiqués doivent être respectés."
    },
    {
      question: "15. Où trouver les photos et vidéos des produits ?",
      answer: "Dans les canaux officiels partenaires."
    },
    {
      question: "16. Où trouver les nouveautés ?",
      answer: "Toutes les nouveautés sont publiées dans les canaux partenaires."
    },
    {
      question: "17. Puis-je vendre partout au Bénin ?",
      answer: "Oui, sous réserve des conditions de livraison applicables à la zone concernée."
    },
    {
      question: "18. L'équipe peut-elle me demander de l’argent ?",
      answer: "Non.\n\nNous ne demandons jamais d’argent à nos partenaires pour intégrer le réseau ou recevoir leurs commissions."
    },
    {
      question: "19. Un membre du groupe m’a contacté en privé. Que faire ?",
      answer: "Ne répondez pas.\n\nBloquez-le puis signalez-le immédiatement au :\n+229 01 69 32 55 76\nafin que notre équipe puisse prendre les mesures nécessaires."
    },
    {
      question: "20. Où retrouver toutes les informations officielles ?",
      answer: "Toutes les procédures, documents et informations sont disponibles dans l’Espace Partenaire :\nhttps://www.sabmidley.co/partenaire\n\nMot de passe : rcsabmidley2026"
    },
    {
      question: "21. Puis-je vendre un produit qui n’est pas publié dans les canaux officiels ?",
      answer: "Non. Seuls les produits publiés dans le canal « En Stock » sont autorisés à la commercialisation. Les produits du canal « Bientôt en Stock » sont uniquement informatifs, et les produits du canal « Rupture de Stock » ne doivent pas être proposés aux clients jusqu’à leur retour en stock."
    }
  ];

  return (
    <div className="min-h-screen bg-[#090A0C] text-slate-100 p-4 sm:p-6 flex flex-col justify-center items-center font-sans">
      <div className="max-w-2xl w-full bg-slate-900 border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {!partenaireConnecte ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] uppercase">Espace Partenaire</span>
              <h1 className="text-2xl font-extrabold text-white">Suivi de vos Ventes & Commissions</h1>
              <p className="text-slate-400 text-xs">Connectez-vous avec votre numéro de téléphone et votre Code RC.</p>
            </div>

            {erreur && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-red-400 text-xs text-center">
                {erreur}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Numéro de téléphone</label>
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

            {/* ONGLET 1 : STATS, CANAUX, GUIDE & FAQ */}
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

                {/* SECTION FAQ (Comment travailler avec nous ?) */}
                <div className="space-y-4 pt-4 border-t border-slate-800">
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] uppercase">FAQ</span>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#D4AF37]">Comment travailler avec nous ?</h3>
                    <p className="text-[11px] text-slate-400">Cliquez sur une question pour afficher la réponse.</p>
                  </div>

                  <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                    {faqList.map((item, index) => {
                      const isOpen = openFaqIndex === index;
                      return (
                        <div 
                          key={index} 
                          className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden transition"
                        >
                          <button
                            onClick={() => toggleFaq(index)}
                            className="w-full p-3 text-left text-xs font-semibold text-white flex justify-between items-center hover:bg-slate-900 transition"
                          >
                            <span>{item.question}</span>
                            <span className="text-[#D4AF37] text-base font-bold ml-2">
                              {isOpen ? '−' : '+'}
                            </span>
                          </button>
                          
                          {isOpen && (
                            <div className="p-3 bg-slate-900/60 border-t border-slate-800 text-[11px] text-slate-300 whitespace-pre-line leading-relaxed">
                              {item.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
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
                <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-center space-y-1">
                  <p className="font-bold text-sm">🤝 Nous sommes à vos côtés à chaque étape !</p>
                  <p className="text-slate-300 text-[11px]">Notre équipe vous accompagne, vous forme et gère toute la logistique pour que vous puissiez vous concentrer uniquement sur vos ventes et vos profits.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h3 className="font-bold text-[#D4AF37] text-sm">💡 Astuces de Vente Efficaces</h3>
                  <div className="space-y-2 text-slate-300">
                    <p>🔥 <strong>Créez l'urgence :</strong> Signalez à vos clients que les stocks sont limités pour déclencher l'achat immédiat.</p>
                    <p>📸 <strong>Misez sur le visuel :</strong> Récupérez les photos nettes des canaux WhatsApp et postez-les partout (Statuts, Groupes, Facebook Marketplace).</p>
                    <p>💬 <strong>La règle du premier contact :</strong> Soyez toujours chaleureux, réactif et posez des questions pour comprendre le vrai besoin du client.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h3 className="font-bold text-emerald-400 text-sm">🚀 Optimiser vos Annonces (FB, TikTok & Statuts)</h3>
                  <div className="space-y-2 text-slate-300">
                    <p>📍 <strong>Facebook Marketplace :</strong> Utilisez des titres clairs et géolocalisés (ex: <em>"Article haut de gamme disponible - Livraison rapide"</em>). Renouvelez vos annonces régulièrement.</p>
                    <p>🎬 <strong>TikTok & Reels :</strong> Filmez des vidéos courtes montrant l'article sous tous ses angles avec une musique tendance. Mettez un appel à l'action clair en description.</p>
                    <p>🟢 <strong>Statuts WhatsApp :</strong> Publiez 3 à 5 produits par jour. C'est votre canal le plus puissant car vos contacts vous font déjà confiance.</p>
                  </div>
                </div>

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