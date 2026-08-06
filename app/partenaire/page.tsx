'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function PartenairePage() {
  const [partnerLoggedIn, setPartnerLoggedIn] = useState(false);
  const [universalPasswordInput, setUniversalPasswordInput] = useState('');
  const UNIVERSAL_PARTNER_PASSWORD = 'rcsabmidley2026';

  // État pour gérer l'accordéon de la FAQ (garde en mémoire quelle question est ouverte)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleUniversalLogin = (e: any) => {
    e.preventDefault();
    if (universalPasswordInput.trim() === UNIVERSAL_PARTNER_PASSWORD) {
      setPartnerLoggedIn(true);
    } else {
      alert("Mot de passe incorrect. Veuillez vérifier le code d'accès fourni par le réseau.");
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
      answer: "Non.\n\nLaissez cette partie vide. Le Code RC est attribué uniquement par l’équipe SAB MIDLEY après validation de votre contrat."
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
      answer: "Non.\n\nLes produits restent en stock chez SAB MIDLEY."
    },
    {
      question: "6. Qui effectue les livraisons ?",
      answer: "Toutes les livraisons sont assurées par SAB MIDLEY."
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
      answer: "Connectez-vous sur :\nhttps://www.sabmidley.co/suivi\n\navec :\n• votre numéro de téléphone (ou e-mail)\n• votre Code RC"
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
      answer: "Non.\n\nLes prix communiqués par SAB MIDLEY doivent être respectés."
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
      question: "18. RC SAB MIDLEY peut-il me demander de l’argent ?",
      answer: "Non.\n\nSAB MIDLEY ne demande jamais d’argent à ses partenaires pour intégrer le réseau ou recevoir leurs commissions."
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
              <p className="text-slate-400">Prenez quelques minutes pour suivre les étapes ci-dessous.</p>
            </div>

            {/* Étape 1: Contrat */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Étape 1 : Lire et signer le contrat</h3>
                <p className="text-slate-400 text-sm">Le contrat de partenariat est obligatoire. Il vous permet d’intégrer officiellement le réseau RC SAB MIDLEY.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://raw.githubusercontent.com/myopostoie/sab-midley-files/main/RC-CONTRAT%20DE%20PARTENARIAT.pdf#toolbar=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition inline-flex items-center space-x-2"
                >
                  <span>Aperçu du contrat</span>
                </a>
                <a
                  href="https://raw.githubusercontent.com/myopostoie/sab-midley-files/main/RC-CONTRAT%20DE%20PARTENARIAT.pdf"
                  download
                  className="px-6 py-3.5 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-xs hover:bg-[#c5a030] transition shadow-lg inline-flex items-center space-x-2"
                >
                  <span>Télécharger le contrat</span>
                </a>
              </div>
            </div>

            {/* Signature électronique */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Signature électronique</h3>
                <p className="text-slate-400 text-sm">Vous n’êtes pas obligé d’imprimer le contrat. Vous pouvez le remplir directement sur votre téléphone.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-[#D4AF37] text-sm">iPhone</h4>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
                    <li>Ouvrez le PDF avec <strong>Fichiers</strong> ou <strong>Adobe Acrobat Reader</strong></li>
                    <li>Sélectionnez <strong>Remplir et signer</strong></li>
                    <li>Complétez les informations</li>
                    <li>Ajoutez votre signature</li>
                  </ul>
                </div>
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-[#D4AF37] text-sm">Android</h4>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
                    <li>Installez <strong>Adobe Acrobat Reader</strong></li>
                    <li>Ouvrez le contrat</li>
                    <li>Utilisez <strong>Remplir et signer</strong></li>
                    <li>Complétez les informations</li>
                    <li>Ajoutez votre signature</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Étape 2: Envoi */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white">Étape 2 : Envoyer le contrat signé</h3>
              <p className="text-slate-400 text-sm">Une fois signé, envoyez votre contrat par WhatsApp au :</p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 inline-block">
                <p className="text-[#D4AF37] font-bold text-base">+229 01 69 32 55 76</p>
              </div>
              <div className="pt-2 space-y-2 text-xs text-slate-300">
                <p>Après validation, vous recevrez votre :</p>
                <div className="p-3 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] font-bold inline-block">
                  Code Partenaire Officiel
                </div>
                <p className="text-slate-400 pt-1">Ce code est indispensable pour :</p>
                <ul className="list-disc list-inside text-slate-300 space-y-1 pl-2">
                  <li>Identifier vos ventes</li>
                  <li>Recevoir vos commissions</li>
                </ul>
              </div>
            </div>

            {/* Guide du partenaire */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Guide du partenaire</h3>
                <p className="text-slate-400 text-sm">Découvrez le fonctionnement du réseau. Vous y trouverez :</p>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-2">
                  <li>Comment vendre</li>
                  <li>Les règles du partenariat</li>
                  <li>Les commissions</li>
                  <li>Les procédures</li>
                  <li>Les bonnes pratiques</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://raw.githubusercontent.com/myopostoie/sab-midley-files/main/Guide%20MAJ%20RC%20SAB%20MIDLEY%202026.pdf#toolbar=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition inline-flex items-center space-x-2"
                >
                  <span>Aperçu du Guide</span>
                </a>
                <a
                  href="https://raw.githubusercontent.com/myopostoie/sab-midley-files/main/Guide%20MAJ%20RC%20SAB%20MIDLEY%202026.pdf"
                  download
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition inline-flex items-center space-x-2"
                >
                  <span>Télécharger le Guide</span>
                </a>
              </div>
            </div>

            {/* Canaux officiels */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white">Nos canaux officiels</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-emerald-400 text-sm mb-1">EN STOCK</p>
                    <p className="text-xs text-slate-300 leading-relaxed">Canal dédié aux produits actuellement disponibles en stock, prêts pour la commande immédiate et la livraison rapide selon les zones couvertes.</p>
                  </div>
                  <a href="https://whatsapp.com/channel/0029Vb8gOUW5EjxzqTnZ713v" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-lg bg-emerald-600/25 text-emerald-400 text-xs font-semibold text-center border border-emerald-500/30 hover:bg-emerald-600/40 transition">Rejoindre le canal</a>
                </div>
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-amber-400 text-sm mb-1">BIENTÔT EN STOCK</p>
                    <p className="text-xs text-slate-300 leading-relaxed">Canal d'anticipation permettant de découvrir les prochains arrivages, les nouveautés en cours d'acheminement et de préparer vos ventes en amont.</p>
                  </div>
                  <a href="https://whatsapp.com/channel/0029Vb8a9RgAzNc1IBH2Xo2D" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-lg bg-amber-600/25 text-amber-400 text-xs font-semibold text-center border border-amber-500/30 hover:bg-amber-600/40 transition">Rejoindre le canal</a>
                </div>
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-rose-400 text-sm mb-1">RUPTURE DE STOCK</p>
                    <p className="text-xs text-slate-300 leading-relaxed">Canal d'information répertoriant les articles momentanément indisponibles pour éviter de prendre des commandes sur des produits en rupture.</p>
                  </div>
                  <a href="https://whatsapp.com/channel/0029VbDsUK6KbYMQEmAgCt3O" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-lg bg-rose-600/25 text-rose-400 text-xs font-semibold text-center border border-rose-500/30 hover:bg-rose-600/40 transition">Rejoindre le canal</a>
                </div>
              </div>
            </div>

            {/* SECTION FAQ : Comment travailler avec nous ? (Accordéon interactif) */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] uppercase">FAQ</span>
                <h3 className="text-xl font-extrabold uppercase tracking-wider text-[#D4AF37]">Comment travailler avec nous ?</h3>
                <p className="text-xs text-slate-400">Cliquez sur une question pour afficher la réponse.</p>
              </div>

              <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
                {faqList.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div 
                      key={index} 
                      className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full p-4 text-left text-xs font-semibold text-white flex justify-between items-center hover:bg-slate-800/60 transition"
                      >
                        <span>{item.question}</span>
                        <span className="text-[#D4AF37] text-base font-bold ml-2">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      
                      {isOpen && (
                        <div className="p-4 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vos avantages */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white">Vos avantages</h3>
              <p className="text-slate-400 text-sm">En rejoignant RC SAB MIDLEY, vous bénéficiez de :</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
                <li className="flex items-center space-x-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Entre 10 à 20 % de commission</span>
                </li>
                <li className="flex items-center space-x-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Aucun investissement</span>
                </li>
                <li className="flex items-center space-x-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Aucun stock à gérer</span>
                </li>
                <li className="flex items-center space-x-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Livraison assurée</span>
                </li>
                <li className="flex items-center space-x-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Service après-vente assuré</span>
                </li>
                <li className="flex items-center space-x-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Produits sélectionnés</span>
                </li>
                <li className="flex items-center space-x-2 bg-slate-900 p-3 rounded-xl border border-slate-800 md:col-span-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Local physique pour rassurer les clients</span>
                </li>
              </ul>
            </div>

            {/* Règles importantes */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white">Règles importantes</h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-[#D4AF37] font-bold">-</span>
                  <span>Respectez les prix communiqués.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#D4AF37] font-bold">-</span>
                  <span>Le Code Partenaire est obligatoire pour recevoir vos commissions.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#D4AF37] font-bold">-</span>
                  <span>Les canaux partenaires sont strictement réservés aux partenaires.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#D4AF37] font-bold">-</span>
                  <span>Merci de ne jamais partager les liens d’accès des canaux afin de préserver les avantages du réseau.</span>
                </li>
              </ul>
            </div>

            {/* Besoin d'aide */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-3 text-center">
              <h3 className="text-lg font-bold text-white">Besoin d’aide ?</h3>
              <p className="text-slate-400 text-xs">Notre équipe est disponible sur WhatsApp.</p>
              <div className="pt-2">
                <a href="https://wa.me/2290169325576" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-xl bg-emerald-600/20 text-emerald-400 font-bold text-xs border border-emerald-500/30 hover:bg-emerald-600/30 transition">
                  +229 01 69 32 55 76
                </a>
              </div>
            </div>
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