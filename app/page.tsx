
'use client';

import { useState, useEffect } from 'react';
import { productsList } from './products';
import jsPDF from 'jspdf';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [orderProduct, setOrderProduct] = useState<any>(null);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  // État pour afficher ou masquer le champ du code partenaire
  const [showPartnerField, setShowPartnerField] = useState(false);

  // État pour le menu mobile (burger)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // État pour afficher ou masquer la flèche de retour en haut
  const [showScrollTop, setShowScrollTop] = useState(false);

  // États pour les formulaires de Contact et Carrières
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [careerSubmitted, setCareerSubmitted] = useState(false);

  // ================= ÉTATS POUR LE PORTAIL PARTENAIRE (MOT DE PASSE UNIVERSEL) =================
  const [activeTab, setActiveTab] = useState<'accueil' | 'partenaire'>('accueil');
  const [partnerLoggedIn, setPartnerLoggedIn] = useState(false);
  const [universalPasswordInput, setUniversalPasswordInput] = useState('');

  // MOT DE PASSE UNIVERSEL UNIQUE POUR TOUS LES PARTENAIRES (modifiable ici)
  const UNIVERSAL_PARTNER_PASSWORD = 'rcsabmidley2026';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: 'BJ',
    city: '',
    address: '',
    yangoAddress: '',
    phone: '',
    partnerCode: '',
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Général',
    message: '',
  });

  const [careerForm, setCareerForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'BJ',
    experience: 'Débutant',
    motivation: '',
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactChange = (e: any) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleCareerChange = (e: any) => {
    setCareerForm({ ...careerForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e: any) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 5000);
    setContactForm({ name: '', email: '', phone: '', subject: 'Général', message: '' });
  };

  const handleCareerSubmit = (e: any) => {
    e.preventDefault();
    setCareerSubmitted(true);
    setTimeout(() => setCareerSubmitted(false), 5000);
    setCareerForm({ fullName: '', email: '', phone: '', country: 'BJ', experience: 'Débutant', motivation: '' });
  };

  // ================= VÉRIFICATION DU MOT DE PASSE UNIVERSEL =================
  const handleUniversalLogin = (e: any) => {
    e.preventDefault();
    if (universalPasswordInput.trim() === UNIVERSAL_PARTNER_PASSWORD) {
      setPartnerLoggedIn(true);
    } else {
      alert('Mot de passe incorrect. Veuillez vérifier le code d\'accès fourni par le réseau.');
    }
  };

  // Fonction pour envoyer la vente vers votre Google Sheets
  const saveOrderToGoogleSheets = async (orderData: any) => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyCLzeK1mr3pccEO2Hc1UVtd-qA_SZe4uKQkpVr1ZP063mTc3I7JAAGcnPYWTb5pzuW/exec';
    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      console.log('Vente enregistrée avec succès dans le Google Sheets !');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement dans Google Sheets :', error);
    }
  };

  // Fonction de génération et téléchargement automatique du reçu PDF
  const generatePDFReceipt = (orderData: any) => {
    const doc = new jsPDF();

    doc.setFillColor(9, 10, 12);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('SAB MIDLEY', 20, 25);

    doc.setTextColor(212, 175, 55);
    doc.setFontSize(10);
    doc.text('REÇU DE PAIEMENT OFFICIEL', 135, 25);

    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Référence : #SM-${Math.floor(100000 + Math.random() * 900000)}`, 20, 55);
    doc.text(`Date : ${orderData.date}`, 20, 62);
    doc.text(`Moyen de paiement : FedaPay (Mobile Money / Carte)`, 20, 69);
    if (orderData.partnerCode && orderData.partnerCode !== 'Aucun') {
      doc.text(`Code Partenaire : ${orderData.partnerCode}`, 20, 76);
    }

    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, 85, 170, 35, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.text('Informations du Client :', 25, 93);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nom : ${orderData.fullName}`, 25, 101);
    doc.text(`Email : ${orderData.email}`, 25, 108);
    doc.text(`Téléphone : ${orderData.phone} | Ville : ${orderData.city}`, 25, 115);

    doc.setFillColor(9, 10, 12);
    doc.rect(20, 130, 170, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Désignation de l\'Article', 25, 136);
    doc.text('Montant', 150, 136);

    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(orderData.productTitle, 25, 150);
    doc.setFont('helvetica', 'bold');
    doc.text(orderData.price, 150, 150);

    doc.setDrawColor(200, 200, 200);
    doc.line(20, 160, 190, 160);

    doc.setFont('helvetica', 'normal');
    doc.text('Sous-total :', 120, 172);
    doc.text(orderData.price, 150, 172);

    doc.text('Frais de livraison :', 120, 180);
    doc.text('Confirmés avant expédition', 135, 180);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(212, 175, 55);
    doc.text('Total Payé :', 120, 192);
    doc.text(orderData.price, 150, 192);

    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Contacts officiels : Bénin: +229 01 69 32 55 76 | Côte d\'Ivoire: +225 07 104 106 04', 20, 215);
    doc.text('Burkina Faso: +226 04 26 18 02 | Togo: +228 92 04 66 86', 20, 221);

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.text('SAB MIDLEY — Abomey-Calavi, Bénin', 20, 232);
    doc.text('Ce reçu fait office de justificatif officiel pour votre transaction.', 20, 238);

    doc.save(`Recu_SAB_MIDLEY_${orderData.fullName.replace(/\s+/g, '_')}.pdf`);
  };

  const handleOrderSubmit = (e: any) => {
    e.preventDefault();
    if (!formData.fullName || !formData.city || !formData.phone || !formData.country) {
      alert('Veuillez remplir tous les champs obligatoires, y compris le pays.');
      return;
    }

    if (!orderProduct || !(orderProduct as any).price) {
      alert('Erreur : Aucun produit sélectionné.');
      return;
    }

    const rawPrice = String((orderProduct as any).price);
    const cleanedPrice = rawPrice.replace(/[^0-9]/g, '');
    const amount = parseInt(cleanedPrice, 10);

    if (isNaN(amount) || amount <= 0) {
      alert('Erreur : Le montant du produit est invalide.');
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9+]/g, '').trim();

    let clientEmail = formData.email.trim();
    if (!clientEmail || !clientEmail.includes('@')) {
      const cleanId = cleanPhone.replace(/[^0-9]/g, '') || Date.now();
      clientEmail = `client_${cleanId}@sabmidley.co`;
    }

    const nameParts = formData.fullName.trim().split(' ');
    const firstname = nameParts[0] ? nameParts[0].trim() : 'Client';
    const lastname = nameParts.slice(1).join(' ').trim() || 'Client';

    const descriptionText = `Commande : ${(orderProduct as any).title}`.replace(/['"\\\/]/g, '');

    const handleSuccessfulPayment = async () => {
      const fedapayContainers = document.querySelectorAll('#fedapay-widget-container, .fedapay-modal, iframe[src*="fedapay"]');
      fedapayContainers.forEach(el => el.remove());

      const completedOrder = {
        fullName: formData.fullName,
        email: clientEmail,
        productTitle: (orderProduct as any).title,
        price: (orderProduct as any).price,
        city: formData.city,
        phone: formData.phone,
        partnerCode: formData.partnerCode || 'Aucun',
        date: new Date().toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      };

      await saveOrderToGoogleSheets(completedOrder);

      setOrderProduct(null);
      setSelectedProduct(null);
      setOrderSuccess(completedOrder);
      
      generatePDFReceipt(completedOrder);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (typeof window !== 'undefined' && (window as any).FedaPay) {
      try {
        const widget = (window as any).FedaPay.init({
          public_key: 'pk_live_63P5upxQrTGl6nS7aZWlmujt',
          transaction: {
            amount: Number(amount),
            description: descriptionText,
            currency: {
              iso: 'XOF'
            }
          },
          customer: {
            firstname: String(firstname),
            lastname: String(lastname),
            email: String(clientEmail),
            phone_number: String(cleanPhone),
            country: String(formData.country)
          },
          onComplete: (resp: any) => {
            if (resp && (resp.reason === 'CHECKOUT_COMPLETE' || resp.status === 'approved' || resp.transaction)) {
              handleSuccessfulPayment();
            }
          }
        });

        widget.open();

      } catch (err) {
        console.error('Erreur d’initialisation FedaPay:', err);
        alert('Une erreur est survenue lors du lancement du paiement.');
      }
    } else {
      alert('Le module de paiement FedaPay est en cours de chargement, veuillez patienter une seconde et réessayer.');
    }
  };

  const poles = [
    {
      id: 'immobilier',
      title: 'Courtage & Immobilier International',
      description: 'Location d’appartements d’exception, courtage automobile haut de gamme et investissements sécurisés.',
      badge: 'Pôle 01',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'negoce',
      title: 'Négoce & Commerce Général',
      description: 'Import-export premium, approvisionnement mondial en équipements, mobilier et luminaires design.',
      badge: 'Pôle 02',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'conciergerie',
      title: 'Assistance Administrative & Mobilité',
      description: 'Accompagnement sur-mesure pour vos procédures de visa et conciergerie administrative globale.',
      badge: 'Pôle 03',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'academy',
      title: 'Digital & Formation (Academy)',
      description: 'Programmes de pointe en e-commerce, conception web, stratégie de marque et design.',
      badge: 'Pôle 04',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-[#090A0C] text-slate-100 font-sans relative">
      
      {/* Top Banner d'actualité */}
      <div className="bg-[#D4AF37] text-[#090A0C] text-xs md:text-sm font-bold py-2.5 px-4 text-center tracking-wide">
        Expansion Régionale en cours : Bénin, Côte d'Ivoire & Burkina Faso — Rejoignez notre réseau commercial.
      </div>

      {/* Barre de Menu / Navigation */}
      <header className="sticky top-0 z-40 bg-[#090A0C]/90 backdrop-blur-md border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setActiveTab('accueil')} className="text-xl font-black text-white tracking-wider text-left">
              SAB <span className="text-[#D4AF37]">MIDLEY</span>
            </button>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <button onClick={() => setActiveTab('accueil')} className={`${activeTab === 'accueil' ? 'text-[#D4AF37]' : 'text-slate-300'} hover:text-white transition`}>Accueil</button>
            <a href="#poles" onClick={() => setActiveTab('accueil')} className="hover:text-[#D4AF37] transition">Nos Pôles</a>
            <a href="#boutique" onClick={() => setActiveTab('accueil')} className="hover:text-[#D4AF37] transition">Boutique & Négoce</a>
            <a href="#carrieres" onClick={() => setActiveTab('accueil')} className="hover:text-[#D4AF37] transition">Carrières</a>
            <a href="#contact" onClick={() => setActiveTab('accueil')} className="hover:text-[#D4AF37] transition">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setActiveTab('partenaire')} 
              className={`px-5 py-2.5 rounded-lg font-bold text-sm transition shadow-md ${activeTab === 'partenaire' ? 'bg-white text-[#090A0C]' : 'bg-[#D4AF37] text-[#090A0C] hover:bg-[#c5a030] shadow-[#D4AF37]/20'}`}
            >
              Portail Partenaire
            </button>
          </div>

          {/* Bouton Burger Mobile */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white focus:outline-none p-2"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu Déroulant Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#090A0C] border-t border-[#D4AF37]/20 px-6 py-5 space-y-4 shadow-2xl">
            <button 
              onClick={() => { setActiveTab('accueil'); setMobileMenuOpen(false); }} 
              className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1 w-full text-left"
            >
              Accueil
            </button>
            <a 
              href="#poles" 
              onClick={() => { setActiveTab('accueil'); setMobileMenuOpen(false); }} 
              className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1"
            >
              Nos Pôles
            </a>
            <a 
              href="#boutique" 
              onClick={() => { setActiveTab('accueil'); setMobileMenuOpen(false); }} 
              className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1"
            >
              Boutique & Négoce
            </a>
            <a 
              href="#carrieres" 
              onClick={() => { setActiveTab('accueil'); setMobileMenuOpen(false); }} 
              className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1"
            >
              Carrières
            </a>
            <a 
              href="#contact" 
              onClick={() => { setActiveTab('accueil'); setMobileMenuOpen(false); }} 
              className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1"
            >
              Contact
            </a>
            <div className="pt-2">
              <button 
                onClick={() => { setActiveTab('partenaire'); setMobileMenuOpen(false); }} 
                className="block text-center w-full px-5 py-3 rounded-lg bg-[#D4AF37] text-[#090A0C] font-bold text-sm"
              >
                Portail Partenaire
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================= CONTENU CONDITIONNEL : ACCUEIL OU PORTAIL PARTENAIRE ================= */}
      {activeTab === 'partenaire' ? (
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
                  <p className="text-xs text-slate-500">Mot de passe de test fourni : <strong className="text-[#D4AF37]">rcsabmidley2026</strong></p>
                </div>
              </form>
            </div>
          ) : (
            /* CONTENU DE LA PAGE PARTENAIRE DEMANDÉE (Simple, Professionnel, Sans émojis superflus) */
            <div className="bg-slate-900 border border-[#D4AF37]/40 rounded-3xl p-8 md:p-12 shadow-2xl space-y-12">
              
              {/* En-tête */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-6 gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Espace Privé Partenaire</span>
                  <h2 className="text-3xl font-extrabold text-white">Bienvenue sur le Portail Partenaire RC SAB MIDLEY</h2>
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

              {/* Étape 1 : Contrat */}
              <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Étape 1 : Lire et signer le contrat</h3>
                  <p className="text-slate-400 text-sm">Le contrat de partenariat est obligatoire. Il vous permet d’intégrer officiellement le réseau RC SAB MIDLEY.</p>
                </div>
                <div>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); alert('Téléchargement du contrat de partenariat (PDF) bientôt disponible.'); }}
                    className="inline-block px-6 py-3.5 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-sm hover:bg-[#c5a030] transition shadow-lg"
                  >
                    Télécharger le contrat de partenariat
                  </a>
                </div>

                {/* Signature électronique */}
                <div className="border-t border-slate-800/80 pt-6 space-y-4">
                  <h4 className="font-bold text-white text-base">Signature électronique</h4>
                  <p className="text-slate-400 text-sm">Vous n’êtes pas obligé d’imprimer le contrat. Vous pouvez le remplir directement sur votre téléphone.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
                      <p className="font-bold text-[#D4AF37] text-sm">iPhone</p>
                      <ul className="text-slate-300 text-xs space-y-1.5 list-disc list-inside">
                        <li>Ouvrez le PDF avec Fichiers ou Adobe Acrobat Reader</li>
                        <li>Sélectionnez Remplir et signer</li>
                        <li>Complétez les informations</li>
                        <li>Ajoutez votre signature</li>
                      </ul>
                    </div>
                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-2">
                      <p className="font-bold text-[#D4AF37] text-sm">Android</p>
                      <ul className="text-slate-300 text-xs space-y-1.5 list-disc list-inside">
                        <li>Installez Adobe Acrobat Reader</li>
                        <li>Ouvrez le contrat</li>
                        <li>Utilisez Remplir et signer</li>
                        <li>Complétez les informations</li>
                        <li>Ajoutez votre signature</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Étape 2 : Envoi */}
              <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xl font-bold text-white">Étape 2 : Envoyer le contrat signé</h3>
                <p className="text-slate-400 text-sm">Une fois signé, envoyez votre contrat par WhatsApp au :</p>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 inline-block">
                  <p className="text-[#D4AF37] font-bold text-base">+229 01 69 32 55 76</p>
                </div>
                <div className="space-y-2 pt-2 text-slate-300 text-sm">
                  <p>Après validation, vous recevrez votre :</p>
                  <p className="font-bold text-white text-base">Code Partenaire Officiel</p>
                  <p className="text-slate-400">Ce code est indispensable pour identifier vos ventes et recevoir vos commissions.</p>
                </div>
              </div>

              {/* Guide et Catalogue */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">Guide du partenaire</h3>
                    <p className="text-slate-400 text-sm">Découvrez le fonctionnement du réseau : comment vendre, les règles du partenariat, les commissions, les procédures et les bonnes pratiques.</p>
                  </div>
                  <div>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); alert('Téléchargement du Guide Partenaire bientôt disponible.'); }}
                      className="inline-block px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
                    >
                      Télécharger le Guide Partenaire
                    </a>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">Catalogue Partenaire</h3>
                    <p className="text-slate-400 text-sm">Consultez la liste des produits autorisés à la commercialisation.</p>
                  </div>
                  <div>
                    <a 
                      href="#boutique" 
                      onClick={() => setActiveTab('accueil')}
                      className="inline-block px-5 py-3 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-xs hover:bg-[#c5a030] transition"
                    >
                      Ouvrir le catalogue
                    </a>
                  </div>
                </div>
              </div>

              {/* Canaux officiels */}
              <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
                <h3 className="text-xl font-bold text-white">Nos canaux officiels</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="space-y-1">
                      <p className="font-bold text-emerald-400 text-sm">EN STOCK</p>
                      <p className="text-xs text-slate-400">Tous les produits actuellement disponibles.</p>
                    </div>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); alert('Lien vers le canal WhatsApp En Stock'); }}
                      className="px-4 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 text-xs font-semibold text-center transition border border-emerald-500/30"
                    >
                      Rejoindre
                    </a>
                  </div>

                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="space-y-1">
                      <p className="font-bold text-amber-400 text-sm">BIENTÔT EN STOCK</p>
                      <p className="text-xs text-slate-400">Découvrez les prochains arrivages avant leur mise en vente.</p>
                    </div>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); alert('Lien vers le canal Bientôt en Stock'); }}
                      className="px-4 py-2 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 text-xs font-semibold text-center transition border border-amber-500/30"
                    >
                      Rejoindre
                    </a>
                  </div>

                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="space-y-1">
                      <p className="font-bold text-rose-400 text-sm">RUPTURE DE STOCK</p>
                      <p className="text-xs text-slate-400">Consultez les articles momentanément indisponibles.</p>
                    </div>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); alert('Lien vers le canal Rupture de Stock'); }}
                      className="px-4 py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 text-xs font-semibold text-center transition border border-rose-500/30"
                    >
                      Rejoindre
                    </a>
                  </div>
                </div>
              </div>

              {/* Vos avantages */}
              <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xl font-bold text-white">Vos avantages</h3>
                <p className="text-slate-400 text-sm">En rejoignant RC SAB MIDLEY, vous bénéficiez de :</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
                  <li className="flex items-center space-x-2">
                    <span className="text-[#D4AF37] font-bold">•</span>
                    <span>Jusqu’à 20 % de commission</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-[#D4AF37] font-bold">•</span>
                    <span>Aucun investissement</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-[#D4AF37] font-bold">•</span>
                    <span>Aucun stock à gérer</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-[#D4AF37] font-bold">•</span>
                    <span>Livraison assurée</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-[#D4AF37] font-bold">•</span>
                    <span>Service après-vente assuré</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-[#D4AF37] font-bold">•</span>
                    <span>Produits sélectionnés</span>
                  </li>
                  <li className="flex items-center space-x-2 sm:col-span-2">
                    <span className="text-[#D4AF37] font-bold">•</span>
                    <span>Local physique pour rassurer les clients</span>
                  </li>
                </ul>
              </div>

              {/* Règles importantes */}
              <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-xl font-bold text-white">Règles importantes</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#D4AF37] font-bold">-</span>
                    <span>Utilisez uniquement les supports officiels fournis.</span>
                  </li>
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

              {/* Questions fréquentes (FAQ) */}
              <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
                <h3 className="text-xl font-bold text-white">Questions fréquentes</h3>
                <div className="space-y-4 text-sm">
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Quand suis-je payé ?</p>
                    <p className="text-slate-400">Sous 24 heures après confirmation de la livraison.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Ai-je besoin d’acheter un stock ?</p>
                    <p className="text-slate-400">Non.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Qui effectue les livraisons ?</p>
                    <p className="text-slate-400">RC SAB MIDLEY.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Qui gère le service après-vente ?</p>
                    <p className="text-slate-400">RC SAB MIDLEY.</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Puis-je vendre depuis n’importe quelle ville ?</p>
                    <p className="text-slate-400">Oui, selon les zones couvertes.</p>
                  </div>
                </div>
              </div>

              {/* Besoin d'aide */}
              <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-4 text-center">
                <h3 className="text-xl font-bold text-white">Besoin d’aide ?</h3>
                <p className="text-slate-400 text-sm">Notre équipe est disponible.</p>
                <div>
                  <a 
                    href="https://wa.me/2290169325576" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3.5 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-sm hover:bg-[#c5a030] transition shadow-lg"
                  >
                    WhatsApp : +229 01 69 32 55 76
                  </a>
                </div>
              </div>

              <div className="text-center pt-4">
                <button 
                  onClick={() => setActiveTab('accueil')}
                  className="text-sm text-[#D4AF37] hover:underline font-semibold"
                >
                  ← Retour au site principal
                </button>
              </div>

            </div>
          )}
        </section>
      ) : (
        <>
          {/* ================= MODALE / ÉCRAN DE SUCCÈS DE COMMANDE ================= */}
          {orderSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
              <div className="bg-slate-900 border border-[#D4AF37] rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6 my-8">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-full flex items-center justify-center mx-auto text-[#D4AF37] text-3xl font-bold">
                    ✓
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">Paiement Reçu avec Succès !</h2>
                  <p className="text-slate-300 text-sm">
                    Merci pour votre confiance. Votre commande pour <strong className="text-[#D4AF37]">{orderSuccess.productTitle}</strong> a bien été enregistrée.
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-sm">
                  <h3 className="text-[#D4AF37] font-bold uppercase tracking-wider text-xs">Détails de la commande & Fonctionnement :</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Notre service commercial va vous contacter très rapidement au <strong className="text-white">{orderSuccess.phone}</strong> pour organiser la livraison à l'adresse convenue à <strong className="text-white">{orderSuccess.city}</strong>.
                  </p>
                  
                  <div className="border-t border-slate-800 pt-3 space-y-1 text-xs text-slate-400">
                    <p className="font-semibold text-slate-300">Rappel des tarifs de livraison indicatifs :</p>
                    <p>• Cotonou : 1 000 F | Akpakpa : 1 500 F | Abomey-Calavi : 500 F</p>
                    <p>• Lomé : 500 F - 1 500 F | Abidjan : 1 000 F - 2 000 F (petits articles)</p>
                    <p className="text-[#D4AF37] italic mt-1">Note : Le prix fixe exact de la livraison vous sera communiqué par téléphone avant expédition.</p>
                  </div>

                  <div className="border-t border-slate-800 pt-3 text-xs text-slate-400 space-y-1">
                    <p className="font-semibold text-slate-300">Nos numéros officiels d'assistance :</p>
                    <p>🇧🇯 Bénin : +229 01 69 32 55 76</p>
                    <p>🇨🇮 Côte d'Ivoire : +225 07 104 106 04</p>
                    <p>🇧🇫 Burkina Faso : +226 04 26 18 02</p>
                    <p>🇹🇬 Togo : +228 92 04 66 86</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => generatePDFReceipt(orderSuccess)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-sm hover:bg-[#c5a030] transition shadow-lg text-center"
                  >
                    Télécharger un autre reçu (PDF)
                  </button>
                  <button
                    onClick={() => setOrderSuccess(null)}
                    className="py-3 px-6 rounded-xl bg-slate-800 text-white font-semibold text-sm hover:bg-slate-700 transition border border-slate-700 text-center"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= MODALE DE COMMANDE PRODUIT (FORMULAIRE) ================= */}
          {orderProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
              <div className="bg-slate-900 border border-[#D4AF37]/40 rounded-3xl max-w-xl w-full p-8 shadow-2xl space-y-6 my-8 relative">
                <button 
                  onClick={() => setOrderProduct(null)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-white text-xl font-bold"
                >
                  ✕
                </button>
                <div className="space-y-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37]">Finalisation de commande</span>
                  <h3 className="text-xl font-extrabold text-white">{orderProduct.title}</h3>
                  <p className="text-[#D4AF37] font-bold text-lg">{orderProduct.price}</p>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Nom et Prénom <span className="text-[#D4AF37]">*</span></label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Ex: Jean Dupont" 
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Téléphone (Mobile Money) <span className="text-[#D4AF37]">*</span></label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Ex: +229 01..." 
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email (optionnel)</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="nom@exemple.com" 
                        className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Pays <span className="text-[#D4AF37]">*</span></label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                      >
                        <option value="BJ">Bénin</option>
                        <option value="CI">Côte d'Ivoire</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="TG">Togo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Ville <span className="text-[#D4AF37]">*</span></label>
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Ex: Cotonou, Abidjan..." 
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Adresse de livraison <span className="text-[#D4AF37]">*</span></label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Quartier, repère précis..." 
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                    />
                  </div>

                  {/* Champ Code Partenaire optionnel */}
                  <div>
                    {!showPartnerField ? (
                      <button 
                        type="button" 
                        onClick={() => setShowPartnerField(true)}
                        className="text-xs text-[#D4AF37] hover:underline font-medium"
                      >
                        + Avez-vous un code partenaire ?
                      </button>
                    ) : (
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Code Partenaire</label>
                        <input 
                          type="text" 
                          name="partnerCode"
                          value={formData.partnerCode}
                          onChange={handleInputChange}
                          placeholder="Entrez le code partenaire" 
                          className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-[#D4AF37]/50 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                        />
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20 mt-4"
                  >
                    Procéder au Paiement Sécurisé
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ================= MODALE DE DÉTAILS PRODUIT ================= */}
          {selectedProduct && !orderProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
              <div className="bg-slate-900 border border-[#D4AF37]/40 rounded-3xl max-w-xl w-full p-8 shadow-2xl space-y-6 my-8 relative">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-white text-xl font-bold"
                >
                  ✕
                </button>
                <div className="h-60 rounded-2xl overflow-hidden relative">
                  <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-[#090A0C]/90 text-[#D4AF37] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#D4AF37]/30">
                    {selectedProduct.category}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">{selectedProduct.title}</h3>
                  <span className="text-[#D4AF37] font-extrabold text-xl block">{selectedProduct.price}</span>
                  <p className="text-slate-300 text-sm leading-relaxed pt-2">{selectedProduct.description}</p>
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => {
                      const item = selectedProduct;
                      setSelectedProduct(null);
                      setOrderProduct(item);
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-sm hover:bg-[#c5a030] transition shadow-lg text-center"
                  >
                    Commander cet article
                  </button>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="py-3.5 px-6 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-700 hover:text-white transition border border-slate-700 text-center"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center justify-center text-center px-6 overflow-hidden py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-[#090A0C]/95 to-[#090A0C] z-0" />
            <div className="relative z-10 max-w-5xl mx-auto space-y-8">
              <span className="inline-block py-2 px-5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium tracking-wider uppercase border border-[#D4AF37]/30 shadow-lg">
                Réseau Commercial International SAB MIDLEY
              </span>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
                L'Excellence Multiservice <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5c558] via-[#D4AF37] to-[#b39229]">
                  Sans Frontières
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Basé au Bénin et en Côte d'Ivoire, SAB MIDLEY structure vos projets d'avenir à travers 4 pôles d'excellence, une plateforme e-commerce et un réseau d'indépendants en pleine expansion.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-xl shadow-[#D4AF37]/20">
                  Initier une demande de service
                </a>
                <a href="#carrieres" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition border border-[#D4AF37]/30">
                  Rejoindre nos offres (Carrières)
                </a>
              </div>
            </div>
          </section>

          {/* Section des 4 Pôles Majeurs */}
          <section id="poles" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">Nos 4 Pôles d'Expertise</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Des solutions globales et sur-mesure adaptées aux exigences des particuliers, investisseurs et professionnels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {poles.map((pole) => (
                <div
                  key={pole.id}
                  className="group rounded-2xl bg-slate-900/60 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition duration-300 overflow-hidden flex flex-col justify-between shadow-xl backdrop-blur-sm"
                >
                  <div className="relative h-52 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                    <img 
                      src={pole.image} 
                      alt={pole.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-4 left-4 z-20 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#090A0C]/90 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-md">
                      {pole.badge}
                    </span>
                  </div>
                  <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition">
                        {pole.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed text-base">{pole.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section E-commerce / Négoce (Catalogue Produits) */}
          <section id="boutique" className="py-24 px-6 max-w-7xl mx-auto border-t border-[#D4AF37]/20">
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Boutique en ligne & Négoce</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">Nos Articles & Équipements Sélectionnés</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Commandez directement en ligne avec livraison rapide au Bénin, Togo, Côte d'Ivoire et Burkina Faso. Paiement sécurisé Mobile Money et Cartes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsList.map((product: any) => (
                <div 
                  key={product.id}
                  className="group bg-slate-900/80 border border-slate-800 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition duration-300"
                >
                  <div className="h-56 overflow-hidden relative cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 bg-[#090A0C]/90 text-[#D4AF37] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#D4AF37]/30">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition">{product.title}</h3>
                      <p className="text-slate-400 text-sm line-clamp-2">{product.description}</p>
                    </div>
                    <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                      <span className="text-[#D4AF37] font-extrabold text-lg">{product.price}</span>
                      <button 
                        onClick={() => setOrderProduct(product)}
                        className="py-2.5 px-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-xs hover:bg-[#c5a030] transition shadow-md"
                      >
                        Commander
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section Carrières / Recrutement */}
          <section id="carrieres" className="py-24 px-6 max-w-5xl mx-auto border-t border-[#D4AF37]/20">
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Expansion & Opportunités</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">Rejoignez le Réseau SAB MIDLEY</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Nous recrutons des commerciaux indépendants et des partenaires d'affaires au Bénin, en Côte d'Ivoire, au Burkina Faso et au Togo.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
              {careerSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-3xl font-bold">✓</div>
                  <h3 className="text-2xl font-bold text-white">Candidature envoyée avec succès !</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">Notre département des ressources partenaires étudiera votre profil et vous contactera sous 48 heures.</p>
                </div>
              ) : (
                <form onSubmit={handleCareerSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Nom et Prénom <span className="text-[#D4AF37]">*</span></label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={careerForm.fullName}
                        onChange={handleCareerChange}
                        placeholder="Ex: Marie Kouassi" 
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Email <span className="text-[#D4AF37]">*</span></label>
                      <input 
                        type="email" 
                        name="email"
                        value={careerForm.email}
                        onChange={handleCareerChange}
                        placeholder="marie@exemple.com" 
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Téléphone / WhatsApp <span className="text-[#D4AF37]">*</span></label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={careerForm.phone}
                        onChange={handleCareerChange}
                        placeholder="+225 07..." 
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Pays de résidence <span className="text-[#D4AF37]">*</span></label>
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
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Expérience commerciale</label>
                      <select
                        name="experience"
                        value={careerForm.experience}
                        onChange={handleCareerChange}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                      >
                        <option value="Débutant">Débutant (Formation offerte)</option>
                        <option value="Intermédiaire">Intermédiaire (1 à 3 ans)</option>
                        <option value="Confirmé">Confirmé (+3 ans)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Motivation / Présentation rapide <span className="text-[#D4AF37]">*</span></label>
                    <textarea 
                      name="motivation"
                      rows={4}
                      value={careerForm.motivation}
                      onChange={handleCareerChange}
                      placeholder="Expliquez brièvement pourquoi vous souhaitez intégrer notre réseau..."
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20"
                  >
                    Soumettre ma candidature
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Section Contact */}
          <section id="contact" className="py-24 px-6 max-w-5xl mx-auto border-t border-[#D4AF37]/20">
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Contactez-nous</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white">Une Question ? Un Projet ?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Nos équipes basées au Bénin et en Côte d'Ivoire sont à votre écoute pour répondre à toutes vos demandes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Nos Coordonnées Officielles</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    SAB MIDLEY — Siège social et pôles d'activités en Afrique de l'Ouest.
                  </p>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="flex items-start space-x-3">
                    <span className="text-[#D4AF37] font-bold">🇧🇯 Bénin :</span>
                    <span>Abomey-Calavi | Tél / WhatsApp : +229 01 69 32 55 76</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#D4AF37] font-bold">🇨🇮 Côte d'Ivoire :</span>
                    <span>Abidjan | Tél / WhatsApp : +225 07 104 106 04</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#D4AF37] font-bold">🇧🇫 Burkina Faso :</span>
                    <span>Ouagadougou | Tél / WhatsApp : +226 04 26 18 02</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-[#D4AF37] font-bold">🇹🇬 Togo :</span>
                    <span>Lomé | Tél / WhatsApp : +228 92 04 66 86</span>
                  </div>
                </div>

                <div className="p-6 bg-slate-900 border border-[#D4AF37]/30 rounded-2xl space-y-2">
                  <h4 className="text-[#D4AF37] font-bold text-sm">Rappel : Accès Portail Partenaire</h4>
                  <p className="text-xs text-slate-400">Si vous intégrez le réseau commercial, accédez au portail sécurisé pour télécharger le contrat et consulter le guide.</p>
                  <button onClick={() => setActiveTab('partenaire')} className="mt-2 text-xs font-bold text-[#D4AF37] hover:underline block">
                    Accéder au Portail Partenaire →
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
                {contactSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-3xl font-bold">✓</div>
                    <h3 className="text-2xl font-bold text-white">Message envoyé !</h3>
                    <p className="text-slate-300 text-sm">Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Votre Nom <span className="text-[#D4AF37]">*</span></label>
                      <input 
                        type="text" 
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        placeholder="Ex: Paul Martin" 
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email <span className="text-[#D4AF37]">*</span></label>
                        <input 
                          type="email" 
                          name="email"
                          value={contactForm.email}
                          onChange={handleContactChange}
                          placeholder="paul@exemple.com" 
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Téléphone <span className="text-[#D4AF37]">*</span></label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={contactForm.phone}
                          onChange={handleContactChange}
                          placeholder="+229..." 
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Sujet</label>
                      <select 
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                      >
                        <option value="Général">Demande générale</option>
                        <option value="Immobilier">Immobilier / Courtage</option>
                        <option value="Négoce">Négoce & Import-Export</option>
                        <option value="Partenariat">Réseau Partenaire / Affiliation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Message <span className="text-[#D4AF37]">*</span></label>
                      <textarea 
                        name="message"
                        rows={4}
                        value={contactForm.message}
                        onChange={handleContactChange}
                        placeholder="Votre message..." 
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20"
                    >
                      Envoyer le message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-[#090A0C] border-t border-[#D4AF37]/20 py-12 px-6 text-center text-slate-500 text-xs space-y-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 SAB MIDLEY. Tous droits réservés. Abomey-Calavi, Bénin & Abidjan, Côte d'Ivoire.</p>
          <div className="flex space-x-6">
            <button onClick={() => setActiveTab('accueil')} className="hover:text-[#D4AF37] transition">Accueil</button>
            <button onClick={() => setActiveTab('partenaire')} className="hover:text-[#D4AF37] transition">Portail Partenaire</button>
            <a href="#contact" onClick={() => setActiveTab('accueil')} className="hover:text-[#D4AF37] transition">Contact</a>
          </div>
        </div>
      </footer>

      {/* Bouton Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-[#D4AF37] text-[#090A0C] p-3.5 rounded-full shadow-2xl hover:bg-[#c5a030] transition duration-300 focus:outline-none"
          aria-label="Retour en haut"
        >
          ↑
        </button>
      )}

    </div>
  );
}
