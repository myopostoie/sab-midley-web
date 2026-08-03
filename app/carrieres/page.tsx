'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function CarrieresPage() {
  const [careerSubmitted, setCareerSubmitted] = useState(false);
  const [expandedOffer, setExpandedOffer] = useState<number | null>(null);
  const [careerForm, setCareerForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'BJ',
    experience: 'Débutant',
    motivation: '',
  });

  const toggleOffer = (id: number) => {
    setExpandedOffer(expandedOffer === id ? null : id);
  };

  const handleCareerChange = (e: any) => {
    setCareerForm({ ...careerForm, [e.target.name]: e.target.value });
  };

  const handleCareerSubmit = (e: any) => {
    e.preventDefault();
    setCareerSubmitted(true);
    setTimeout(() => setCareerSubmitted(false), 5000);
    setCareerForm({ fullName: '', email: '', phone: '', country: 'BJ', experience: 'Débutant', motivation: '' });
  };

  const offres = [
    {
      id: 1,
      title: 'Assistance Commerciale',
      location: 'Abomey-Calavi, Bénin',
      type: 'Temps plein (Sur place)',
      image: 'https://images.unsplash.com/photo-1531343838779-7cf83c6b1a43?auto=format&fit=crop&w=800&q=80',
      summary: "Gestion de la relation client, appui au développement des ventes et coordination des opérations commerciales depuis notre siège à Abomey-Calavi.",
      missions: [
        "Accueil, conseil et suivi personnalisé des clients et partenaires.",
        "Gestion des commandes, des factures et suivi rigoureux des dossiers clients.",
        "Appui à la prospection et coordination avec les équipes terrain.",
        "Participation active aux stratégies d'expansion commerciale de la structure."
      ],
      profil: "Dynamique, sens de l'organisation rigoureux, excellente maîtrise de l'expression écrite et orale, aisance avec les outils bureautiques et digitaux."
    },
    {
      id: 2,
      title: 'Livreur / Logisticien',
      location: 'Abomey-Calavi, Bénin',
      type: 'Temps plein (Sur place)',
      image: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&w=800&q=80',
      summary: "Assurer la livraison sécurisée et rapide des commandes et du mobilier auprès de notre clientèle à Abomey-Calavi et environs.",
      missions: [
        "Chargement, transport et livraison des articles et équipements commandés.",
        "Vérification de l'état des marchandises au départ et à l'arrivée.",
        "Gestion rigoureuse des bons de livraison et encaissements si nécessaire.",
        "Entretien et suivi de premier niveau du moyen de transport assigné."
      ],
      profil: "Bonne condition physique, excellente connaissance de la zone d'Abomey-Calavi et de Cotonou, permis de conduire valide, intégrité et ponctualité."
    },
    {
      id: 3,
      title: 'Partenaires Commerciaux Indépendants',
      location: 'Bénin, Côte d\'Ivoire & Burkina Faso',
      type: 'Indépendant / Partenariat',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      summary: "Rejoignez notre réseau commercial en expansion pour distribuer nos gammes d'équipements, mobilier et solutions de négoce.",
      missions: [
        "Développer un portefeuille de clients et prescripteurs locaux.",
        "Promouvoir les offres de nos différents pôles d'excellence.",
        "Participer à la croissance du réseau d'affiliés dans votre zone géographique.",
        "Assurer un relais d'information fluide entre les clients et la direction."
      ],
      profil: "Esprit entrepreneurial fort, sens du relationnel développé, ambition de croissance et goût du challenge."
    }
  ];

  return (
    <div className="min-h-screen bg-[#090A0C] text-slate-100 font-sans relative">
      <Navbar />

      {/* En-tête de page */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold tracking-widest uppercase">
          Rejoignez l'équipe
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Carrières & <span className="text-[#D4AF37]">Opportunités</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
          Vous souhaitez contribuer au développement d'un acteur majeur du négoce en Afrique ? Découvrez nos offres en cours ou postulez directement ci-dessous.
        </p>
      </section>

      {/* SECTION DES OFFRES EN COURS */}
      <section className="pb-16 px-6 max-w-5xl mx-auto space-y-8">
        <h2 className="text-xl font-bold text-white border-l-4 border-[#D4AF37] pl-3">
          Nos offres d'emploi en cours
        </h2>

        {offres.map((offre) => (
          <div key={offre.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl transition hover:border-[#D4AF37]/40">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="h-56 md:h-auto relative overflow-hidden">
                <img src={offre.image} alt={offre.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-transparent to-transparent md:hidden" />
              </div>

              <div className="col-span-2 p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/20">
                      {offre.location}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium">
                      {offre.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">{offre.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{offre.summary}</p>
                </div>

                {/* Bouton pour afficher/masquer les détails */}
                <div>
                  <button
                    onClick={() => toggleOffer(offre.id)}
                    className="text-xs font-bold text-[#D4AF37] hover:underline inline-flex items-center space-x-1 focus:outline-none"
                  >
                    <span>{expandedOffer === offre.id ? 'Masquer les détails' : 'Voir les détails, missions & profil'}</span>
                    <span>{expandedOffer === offre.id ? '↑' : '↓'}</span>
                  </button>
                </div>

                {/* Bloc détails accordéon */}
                {expandedOffer === offre.id && (
                  <div className="pt-4 border-t border-slate-800 space-y-4 animate-fadeIn">
                    <div>
                      <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Missions principales :</h4>
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                        {offre.missions.map((m, idx) => (
                          <li key={idx}>{m}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">Profil recherché :</h4>
                      <p className="text-xs text-slate-300">{offre.profil}</p>
                    </div>
                  </div>
                )}

                {/* Instructions de postulation par e-mail */}
                <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    Pour postuler : <span className="text-white font-semibold">CV + Lettre de motivation</span> par e-mail
                  </div>
                  <a
                    href={`mailto:rh@sabmidley.co?subject=Candidature - ${offre.title}`}
                    className="px-6 py-3 rounded-xl bg-[#D4AF37] text-[#090A0C] text-xs font-bold hover:bg-[#c5a030] transition text-center shadow-md shadow-[#D4AF37]/20"
                  >
                    Envoyer à rh@sabmidley.co
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* FORMULAIRE DE CANDIDATURE SPONTANÉE / GÉNÉRALE */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Candidature Spontanée</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">Vous ne trouvez pas d'offre correspondante mais souhaitez proposer votre profil ? Remplissez notre formulaire.</p>
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
                Envoyer ma candidature spontanée
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
