'use client';

import { useState, useEffect } from 'react';
import { productsList } from './products';
import jsPDF from 'jspdf';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [orderProduct, setOrderProduct] = useState<any>(null);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  const [showPartnerField, setShowPartnerField] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [careerSubmitted, setCareerSubmitted] = useState(false);

  const [activeTab, setActiveTab] = useState<'accueil' | 'partenaire'>('accueil');
  const [partnerLoggedIn, setPartnerLoggedIn] = useState(false);
  const [universalPasswordInput, setUniversalPasswordInput] = useState('');

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

  const handleUniversalLogin = (e: any) => {
    e.preventDefault();
    if (universalPasswordInput.trim() === UNIVERSAL_PARTNER_PASSWORD) {
      setPartnerLoggedIn(true);
    } else {
      alert('Mot de passe incorrect. Veuillez vérifier le code d\'accès fourni par le réseau.');
    }
  };

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

    const descriptionText = String((orderProduct as any).title || 'Commande SAB MIDLEY').replace(/[^a-zA-Z0-9éèàùêîôâäëïöüç\s-]/g, '');

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
            description: String(descriptionText),
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
      
      <div className="bg-[#D4AF37] text-[#090A0C] text-xs md:text-sm font-bold py-2.5 px-4 text-center tracking-wide">
        Expansion Régionale en cours : Bénin, Côte d'Ivoire & Burkina Faso — Rejoignez notre réseau commercial.
      </div>

      <header className="sticky top-0 z-40 bg-[#090A0C]/90 backdrop-blur-md border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => setActiveTab('accueil')} className="text-xl font-black text-white tracking-wider text-left">
              SAB <span className="text-[#D4AF37]">MIDLEY</span>
            </button>
          </div>

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
            <div className="bg-slate-900 border border-[#D4AF37]/40 rounded-3xl p-8 md:p-12 shadow-2xl space-y-12">
              
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

              <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Étape 1 : Lire et signer le contrat</h3>
                  <p className="text-slate-400 text-sm">Le contrat de partenariat est obligatoire. Il vous permet d’intégrer officiellement le réseau RC SAB MIDLEY.</p>
                </div>
                <div>
                  <a 
                    href="https://uploadnow.io/f/73pzkc3" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3.5 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-sm hover:bg-[#c5a030] transition shadow-lg"
                  >
                    Télécharger le contrat de partenariat
                  </a>
                </div>

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

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">Guide du partenaire</h3>
                    <p className="text-slate-400 text-sm">Découvrez le fonctionnement du réseau : comment vendre, les règles du partenariat, les commissions, les procédures et les bonnes pratiques.</p>
                  </div>
                  <div>
                    <a 
                      href="https://uploadnow.io/f/2Q1vYW1" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
                    >
                      Télécharger le Guide Partenaire
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
                <h3 className="text-xl font-bold text-white">Nos canaux officiels</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="space-y-1">
                      <p className="font-bold text-emerald-400 text-sm">EN STOCK</p>
                      <p className="text-xs text-slate-400">Tous les produits actuellement disponibles.</p>
                    </div>
                    <a 
                      href="https://whatsapp.com/channel/0029Vb8gOUW5EjxzqTnZ713v" 
                      target="_blank" 
                      rel="noopener noreferrer"
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
                      href="https://whatsapp.com/channel/0029Vb8a9RgAzNc1IBH2Xo2D" 
                      target="_blank" 
                      rel="noopener noreferrer"
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
                      href="https://whatsapp.com/channel/0029VbDsUK6KbYMQEmAgCt3O" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 text-xs font-semibold text-center transition border border-rose-500/30"
                    >
                      Rejoindre
                    </a>
                  </div>
                </div>
              </div>

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
                </ul>
              </div>

              <div className="text-center bg-slate-950 p-6 rounded-2xl border border-[#D4AF37]/30 space-y-2">
                <p className="text-slate-300 text-sm">Pour toutes questions, veuillez contacter l'administration au <strong className="text-[#D4AF37]">+229 01 69 32 55 76</strong> ou l'un des admins du groupe principal.</p>
              </div>

            </div>
          )}
        </section>
      ) : (
        <main className="space-y-24 pb-20">
          
          <section className="relative py-20 px-6 max-w-7xl mx-auto text-center space-y-8">
            <div className="space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Excellence & Fiabilité</span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
                SAB <span className="text-[#D4AF37]">MIDLEY</span>
              </h1>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Votre partenaire de confiance pour le négoce international, le courtage immobilier, la conciergerie et l’approvisionnement de premier choix en Afrique de l'Ouest.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#boutique" className="px-8 py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20 text-sm">
                Découvrir la Boutique
              </a>
              <button onClick={() => setActiveTab('partenaire')} className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-700 transition text-sm">
                Portail Partenaire
              </button>
            </div>
          </section>

          <section id="poles" className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-white">Nos Pôles d'Expertise</h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">Une organisation rigoureuse articulée autour de quatre grands secteurs d'activités stratégiques.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {poles.map((pole) => (
                <div key={pole.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37]/50 transition shadow-xl">
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
                    <img src={pole.image} alt={pole.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 z-20 text-[10px] font-bold px-2.5 py-1 rounded bg-[#090A0C]/80 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
                      {pole.badge}
                    </span>
                  </div>
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white">{pole.title}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed">{pole.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="boutique" className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-white">Boutique & Négoce</h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">Explorez notre sélection d'articles haut de gamme disponibles immédiatement à la commande.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsList.map((product) => (
                <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37]/50 transition shadow-xl">
                  <div className="h-64 overflow-hidden relative bg-slate-950">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white">{product.title}</h3>
                      <p className="text-[#D4AF37] font-extrabold text-lg">{product.price}</p>
                      <p className="text-slate-400 text-xs line-clamp-2">{product.description}</p>
                    </div>
                    <div className="pt-2 flex gap-3">
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
                      >
                        Détails
                      </button>
                      <button 
                        onClick={() => setOrderProduct(product)}
                        className="flex-1 py-3 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-xs hover:bg-[#c5a030] transition"
                      >
                        Commander
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="carrieres" className="max-w-4xl mx-auto px-6 space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Rejoignez l'Équipe</span>
                <h2 className="text-3xl font-extrabold text-white">Carrières & Opportunités</h2>
                <p className="text-slate-400 text-sm max-w-md mx-auto">Vous souhaitez bâtir une carrière stimulante au sein d'une entreprise en pleine expansion ? Postulez dès maintenant.</p>
              </div>

              {careerSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center text-emerald-400 text-sm font-semibold">
                  Votre candidature a bien été transmise à notre service RH. Nous vous contacterons prochainement.
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
                        placeholder="Votre nom complet" 
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
                        type="tel" 
                        name="phone"
                        value={careerForm.phone}
                        onChange={handleCareerChange}
                        placeholder="+229..." 
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Niveau d'expérience</label>
                      <select 
                        name="experience"
                        value={careerForm.experience}
                        onChange={handleCareerChange}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                      >
                        <option value="Débutant">Débutant</option>
                        <option value="Intermédiaire">Intermédiaire (1 à 3 ans)</option>
                        <option value="Expérimenté">Expérimenté (3 ans et plus)</option>
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
                      placeholder="Parlez-nous de vous et de vos atouts..." 
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

          <section id="contact" className="max-w-4xl mx-auto px-6 space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Restons en Contact</span>
                <h2 className="text-3xl font-extrabold text-white">Contactez SAB MIDLEY</h2>
                <p className="text-slate-400 text-sm max-w-md mx-auto">Une question, un projet ou une demande d'information ? Notre équipe vous répond dans les plus brefs délais.</p>
              </div>

              {contactSubmitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center text-emerald-400 text-sm font-semibold">
                  Votre message a bien été envoyé. Merci de nous avoir contactés.
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Nom complet</label>
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
                        type="tel" 
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
                        <option value="Négoce">Négoce & Commerce</option>
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

        </main>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative space-y-6">
            <div className="h-64 relative bg-slate-950">
              <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center font-bold hover:bg-slate-900 transition"
              >
                ✕
              </button>
            </div>
            <div className="p-6 pt-0 space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-white">{selectedProduct.title}</h3>
                <p className="text-[#D4AF37] font-extrabold text-lg">{selectedProduct.price}</p>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{selectedProduct.description}</p>
              <button 
                onClick={() => {
                  const prod = selectedProduct;
                  setSelectedProduct(null);
                  setOrderProduct(prod);
                }}
                className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition"
              >
                Commander ce produit
              </button>
            </div>
          </div>
        </div>
      )}

      {orderProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative space-y-6 my-8 p-6 md:p-8">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Finalisation de commande</span>
                <h3 className="text-xl font-bold text-white">{orderProduct.title}</h3>
              </div>
              <button 
                onClick={() => setOrderProduct(null)}
                className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold hover:bg-slate-700 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Nom complet</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Votre nom complet" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Email (optionnel)</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre@email.com" 
                  className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Pays</label>
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
                    <option value="NE">Niger</option>
                    <option value="ML">Mali</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Ville</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Ex: Cotonou" 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Téléphone (Mobile Money)</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+229..." 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                />
              </div>

              <div className="pt-1">
                {!showPartnerField ? (
                  <button 
                    type="button" 
                    onClick={() => setShowPartnerField(true)}
                    className="text-xs text-[#D4AF37] hover:underline font-semibold"
                  >
                    + J'ai un code partenaire
                  </button>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-1.5">Code Partenaire</label>
                    <input 
                      type="text" 
                      name="partnerCode"
                      value={formData.partnerCode}
                      onChange={handleInputChange}
                      placeholder="Entrez le code de votre partenaire" 
                      className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-[#D4AF37]/50 text-white focus:border-[#D4AF37] outline-none transition text-sm" 
                    />
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20">
                  Payer {orderProduct.price}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {orderSuccess && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-md w-full p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Paiement Validé !</h3>
              <p className="text-slate-300 text-sm">Votre commande pour <strong className="text-white">{orderSuccess.productTitle}</strong> a été enregistrée avec succès.</p>
              <p className="text-slate-400 text-xs">Votre reçu de paiement officiel au format PDF a été téléchargé automatiquement sur votre appareil.</p>
            </div>
            <button 
              onClick={() => {
                generatePDFReceipt(orderSuccess);
              }}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
            >
              Télécharger à nouveau le reçu PDF
            </button>
            <button 
              onClick={() => setOrderSuccess(null)}
              className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-xs hover:bg-[#c5a030] transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 w-12 h-12 rounded-full bg-[#D4AF37] text-[#090A0C] flex items-center justify-center font-bold shadow-xl hover:bg-[#c5a030] transition"
          aria-label="Retour en haut"
        >
          ↑
        </button>
      )}

      <footer className="border-t border-slate-800 bg-[#090A0C] py-12 px-6 text-center text-slate-500 text-xs space-y-3">
        <p>© 2026 SAB MIDLEY. Tous droits réservés. Abomey-Calavi, Bénin.</p>
        <p>Contacts officiels : Bénin: +229 01 69 32 55 76 | Côte d'Ivoire: +225 07 104 106 04 | Burkina Faso: +226 04 26 18 02 | Togo: +228 92 04 66 86</p>
      </footer>

    </div>
  );
}
