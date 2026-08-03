'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function PartenairePage() {
  const [partnerLoggedIn, setPartnerLoggedIn] = useState(false);
  const [universalPasswordInput, setUniversalPasswordInput] = useState('');
  const UNIVERSAL_PARTNER_PASSWORD = 'rcsabmidley2026';

  const handleUniversalLogin = (e: any) => {
    e.preventDefault();
    if (universalPasswordInput.trim() === UNIVERSAL_PARTNER_PASSWORD) {
      setPartnerLoggedIn(true);
    } else {
      alert("Mot de passe incorrect. Veuillez vérifier le code d'accès fourni par le réseau.");
    }
  };

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
                <h3 className="text-xl font-bold text-white">✅ Étape 1 : Lire et signer le contrat</h3>
                <p className="text-slate-400 text-sm">Le contrat de partenariat est obligatoire. Il vous permet d’intégrer officiellement le réseau RC SAB MIDLEY.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://raw.githubusercontent.com/myopostoie/sab-midley-files/main/RC-CONTRAT%20DE%20PARTENARIAT.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition inline-flex items-center space-x-2"
                >
                  <span>👁️ Lire le contrat (Aperçu)</span>
                </a>
                <a
                  href="https://raw.githubusercontent.com/myopostoie/sab-midley-files/main/RC-CONTRAT%20DE%20PARTENARIAT.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-xs hover:bg-[#c5a030] transition shadow-lg inline-flex items-center space-x-2"
                >
                  <span>📥 Télécharger le contrat</span>
                </a>
              </div>
            </div>

            {/* Signature électronique */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">✍️ Signature électronique</h3>
                <p className="text-slate-400 text-sm">Vous n’êtes pas obligé d’imprimer le contrat. Vous pouvez le remplir directement sur votre téléphone.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-[#D4AF37] text-sm">📱 iPhone</h4>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
                    <li>Ouvrez le PDF avec <strong>Fichiers</strong> ou <strong>Adobe Acrobat Reader</strong></li>
                    <li>Sélectionnez <strong>Remplir et signer</strong></li>
                    <li>Complétez les informations</li>
                    <li>Ajoutez votre signature</li>
                  </ul>
                </div>
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-[#D4AF37] text-sm">🤖 Android</h4>
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
              <h3 className="text-xl font-bold text-white">📤 Étape 2 : Envoyer le contrat signé</h3>
              <p className="text-slate-400 text-sm">Une fois signé, envoyez votre contrat par WhatsApp au :</p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 inline-block">
                <p className="text-[#D4AF37] font-bold text-base">+229 01 69 32 55 76</p>
              </div>
              <div className="pt-2 space-y-2 text-xs text-slate-300">
                <p>Après validation, vous recevrez votre :</p>
                <div className="p-3 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] font-bold inline-block">
                  🪪 Code Partenaire Officiel
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
                <h3 className="text-xl font-bold text-white">📘 Guide du partenaire</h3>
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
                  href="https://raw.githubusercontent.com/myopostoie/sab-midley-files/main/Guide%20MAJ%20RC%20SAB%20MIDLEY%202026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition inline-flex items-center space-x-2"
                >
                  <span>👁️ Lire le Guide (Aperçu)</span>
                </a>
                <a
                  href="https://raw.githubusercontent.com/myopostoie/sab-midley-files/main/Guide%20MAJ%20RC%20SAB%20MIDLEY%202026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition inline-flex items-center space-x-2"
                >
                  <span>📥 Télécharger le Guide</span>
                </a>
              </div>
            </div>

            {/* Catalogue Partenaire */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">📦 Catalogue Partenaire</h3>
                <p className="text-slate-400 text-sm">Consultez la liste des produits autorisés à la commercialisation.</p>
              </div>
              <div>
                <a
                  href="https://raw.githubusercontent.com/myopostoie/sab-midley-files/main/Guide%20MAJ%20RC%20SAB%20MIDLEY%202026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition inline-flex items-center space-x-2"
                >
                  <span>🛍 Ouvrir le catalogue</span>
                </a>
              </div>
            </div>

            {/* Canaux officiels */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white">📢 Nos canaux officiels</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-emerald-400 text-sm mb-1">🟢 EN STOCK</p>
                    <p className="text-xs text-slate-300 leading-relaxed">Tous les produits actuellement disponibles.</p>
                  </div>
                  <a href="https://whatsapp.com/channel/0029Vb8gOUW5EjxzqTnZ713v" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-lg bg-emerald-600/25 text-emerald-400 text-xs font-semibold text-center border border-emerald-500/30 hover:bg-emerald-600/40 transition">Rejoindre</a>
                </div>
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-amber-400 text-sm mb-1">🟠 BIENTÔT EN STOCK</p>
                    <p className="text-xs text-slate-300 leading-relaxed">Découvrez les prochains arrivages avant leur mise en vente.</p>
                  </div>
                  <a href="https://whatsapp.com/channel/0029Vb8a9RgAzNc1IBH2X02D" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-lg bg-amber-600/25 text-amber-400 text-xs font-semibold text-center border border-amber-500/30 hover:bg-amber-600/40 transition">Rejoindre</a>
                </div>
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-rose-400 text-sm mb-1">🔴 RUPTURE DE STOCK</p>
                    <p className="text-xs text-slate-300 leading-relaxed">Consultez les articles momentanément indisponibles.</p>
                  </div>
                  <a href="https://whatsapp.com/channel/0029VbDsUK6KbYMQEmAgCt30" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-lg bg-rose-600/25 text-rose-400 text-xs font-semibold text-center border border-rose-500/30 hover:bg-rose-600/40 transition">Rejoindre</a>
                </div>
              </div>
            </div>

            {/* Vos avantages */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white">💰 Vos avantages</h3>
              <p className="text-slate-400 text-sm">En rejoignant RC SAB MIDLEY, vous bénéficiez de :</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
                <li className="flex items-center space-x-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-emerald-400">✅</span>
                  <span>Jusqu’à 20 % de commission</span>
                </li>
                <li className="flex items-center space-x-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-emerald-400">✅</span>
                  <span>Aucun investissement</span>
                </li>
                <li className="flex items-center space-x-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-emerald-400">✅</span>
                  <span>Aucun stock à gérer</span>
                </li>
                <li className="flex items-center space-x-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-emerald-400">✅</span>
                  <span>Livraison assurée</span>
                </li>
                <li className="flex items-center space-x-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-emerald-400">✅</span>
                  <span>Service après-vente assuré</span>
                </li>
                <li className="flex items-center space-x-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-emerald-400">✅</span>
                  <span>Produits sélectionnés</span>
                </li>
                <li className="flex items-center space-x-2 bg-slate-900 p-3 rounded-xl border border-slate-800 md:col-span-2">
                  <span className="text-emerald-400">✅</span>
                  <span>Local physique pour rassurer les clients</span>
                </li>
              </ul>
            </div>

            {/* Règles importantes */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white">📋 Règles importantes</h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-[#D4AF37] font-bold">✔</span>
                  <span>Respectez les prix communiqués.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#D4AF37] font-bold">✔</span>
                  <span>Le Code Partenaire est obligatoire pour recevoir vos commissions.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#D4AF37] font-bold">✔</span>
                  <span>Les canaux partenaires sont strictement réservés aux partenaires.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#D4AF37] font-bold">✔</span>
                  <span>Merci de ne jamais partager les liens d’accès des canaux afin de préserver les avantages du réseau.</span>
                </li>
              </ul>
            </div>

            {/* Questions fréquentes */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white">❓ Questions fréquentes</h3>
              <div className="space-y-4 text-xs">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                  <p className="font-bold text-white">Quand suis-je payé ?</p>
                  <p className="text-slate-400">Sous 24 heures après confirmation de la livraison.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                  <p className="font-bold text-white">Ai-je besoin d’acheter un stock ?</p>
                  <p className="text-slate-400">Non.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                  <p className="font-bold text-white">Qui effectue les livraisons ?</p>
                  <p className="text-slate-400">RC SAB MIDLEY.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                  <p className="font-bold text-white">Qui gère le service après-vente ?</p>
                  <p className="text-slate-400">RC SAB MIDLEY.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
                  <p className="font-bold text-white">Puis-je vendre depuis n’importe quelle ville ?</p>
                  <p className="text-slate-400">Oui, selon les zones couvertes.</p>
                </div>
              </div>
            </div>

            {/* Besoin d'aide */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-3 text-center">
              <h3 className="text-lg font-bold text-white">📞 Besoin d’aide ?</h3>
              <p className="text-slate-400 text-xs">Notre équipe est disponible sur WhatsApp.</p>
              <div className="pt-2">
                <a href="https://wa.me/2290169325576" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-xl bg-emerald-600/20 text-emerald-400 font-bold text-xs border border-emerald-500/30 hover:bg-emerald-600/30 transition">
                  📱 +229 01 69 32 55 76
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
