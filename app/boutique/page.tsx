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

  // ======= ÉTATS POUR LE PORTAIL PARTENAIRE =====
  const [activeTab, setActiveTab] = useState<'accueil' | 'partenaire'>('accueil');
  const [partnerLoggedIn, setPartnerLoggedIn] = useState(false);
  const [universalPasswordInput, setUniversalPasswordInput] = useState('');
  
  // MOT DE PASSE UNIVERSEL UNIQUE POUR TOUS LES PARTENAIRES
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

  // ================= VÉRIFICATION DU MOT DE PASSE UNIVERSEL
  const handleUniversalLogin = (e: any) => {
    e.preventDefault();
    if (universalPasswordInput.trim() === UNIVERSAL_PARTNER_PASSWORD) {
      setPartnerLoggedIn(true);
    } else {
      alert("Mot de passe incorrect. Veuillez vérifier le code d'accès fourni par le réseau.");
    }
  };

  // Fonction pour envoyer la vente vers votre Google Sheets
  const saveOrderToGoogleSheets = async (orderData: any) => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyCLzeK1mr3pccEO2Hc1UVtd-qA_SZe4uKQkpVr1ZP063mTc317JAAGcnPYWTb5pzuW/exec';
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
      console.error("Erreur lors de l'enregistrement dans Google Sheets:", error);
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
    doc.text(`Référence: #SM-${Math.floor(100000 + Math.random() * 900000)}`, 20, 55);
    doc.text(`Date: ${orderData.date}`, 20, 62);
    doc.text(`Moyen de paiement: FedaPay (Mobile Money / Carte)`, 20, 69);
    
    if (orderData.partnerCode && orderData.partnerCode !== 'Aucun') {
      doc.text(`Code Partenaire: ${orderData.partnerCode}`, 20, 76);
    }

    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, 85, 170, 35, 3, 3, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.text('Informations du Client :', 25, 93);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nom: ${orderData.fullName}`, 25, 101);
    doc.text(`Email: ${orderData.email}`, 25, 108);
    doc.text(`Téléphone : ${orderData.phone} | Ville: ${orderData.city}`, 25, 115);

    doc.setFillColor(9, 10, 12);
    doc.rect(20, 130, 170, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text("Désignation de l'Article", 25, 136);
    doc.text('Montant', 150, 136);

    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(orderData.productTitle, 25, 150);
    doc.setFont('helvetica', 'bold');
    doc.text(orderData.price, 150, 150);

    doc.setDrawColor(200, 200, 200);
    doc.line(20, 160, 190, 160);
    doc.setFont('helvetica', 'normal');
    doc.text('Sous-total:', 120, 172);
    doc.text(orderData.price, 150, 172);
    doc.text('Frais de livraison:', 120, 180);
    doc.text('Confirmés avant expédition', 135, 180);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(212, 175, 55);
    doc.text('Total Payé :', 120, 192);
    doc.text(orderData.price, 150, 192);

    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text("Contacts officiels: Bénin: +229 01 69 32 55 76 | Côte d'Ivoire: +225 07 104 106 04", 20, 215);
    doc.text("Burkina Faso: +226 04 26 18 02 | Togo: +228 92 04 66 86", 20, 221);
    
    doc.setFontSize(9);
    doc.text('SAB MIDLEY - Abomey-Calavi, Bénin', 20, 232);
    doc.text('Ce reçu fait office de justificatif officiel pour votre transaction.', 20, 238);
    
    doc.save(`Recu_SAB_MIDLEY_${orderData.fullName.replace(/\s+/g, '_')}.pdf`);
  };

  const handleOrderSubmit = (e: any) => {
    e.preventDefault();
    if (!formData.fullName || !formData.city || !formData.phone || !formData.country) {
      alert('Veuillez remplir tous les champs obligatoires, y compris le pays.');
      return;
    }
    if (!orderProduct || !orderProduct.price) {
      alert('Erreur: Aucun produit sélectionné.');
      return;
    }

    const rawPrice = String(orderProduct.price);
    const cleanedPrice = rawPrice.replace(/[^0-9]/g, '');
    const amount = parseInt(cleanedPrice, 10);

    if (isNaN(amount) || amount <= 0) {
      alert('Erreur: Le montant du produit est invalide.');
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9+]/g, '').trim();
    let clientEmail = formData.email ? formData.email.trim() : '';
    
    if (!clientEmail || !clientEmail.includes('@')) {
      const cleanId = cleanPhone.replace(/[^0-9]/g, '') || Date.now();
      clientEmail = `client_${cleanId}@sabmidley.co`;
    }

    const nameParts = formData.fullName.trim().split(' ');
    const firstname = nameParts[0] ? nameParts[0].trim() : 'Client';
    const lastname = nameParts.slice(1).join(' ').trim() || 'Client';
    const descriptionText = `Commande: ${orderProduct.title}`.replace(/["\\]/g, '');

    const handleSuccessfulPayment = async () => {
      const fedapayContainers = document.querySelectorAll('#fedapay-widget-container, .fedapay-modal, iframe[src*="fedapay"]');
      fedapayContainers.forEach(el => el.remove());

      const completedOrder = {
        fullName: formData.fullName,
        email: clientEmail,
        productTitle: orderProduct.title,
        price: orderProduct.price,
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
          public_key: 'pk_live_63P5upxQrTGI6nS7aZWlmujt',
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
        console.error("Erreur d'initialisation FedaPay:", err);
        alert("Une erreur est survenue lors du lancement du paiement.");
      }
    } else {
      alert("Le module de paiement FedaPay est en cours de chargement, veuillez patienter une seconde et réessayer.");
    }
  };

  const poles = [
    {
      id: 'immobilier',
      title: 'Courtage & Immobilier International',
      description: "Location d'appartements d'exception, courtage automobile haut de gamme et investissements sécurisés.",
      badge: 'Pôle 01',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
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
    }
  ];

  return (
    <div className="min-h-screen bg-[#090A0C] text-slate-100 font-sans relative">
      
      {/* Script FedaPay CDN */}
      <script src="https://cdn.fedapay.com/checkout.js?v=1.1.7"></script>

      {/* Top Banner d'actualité */}
      <div className="bg-[#D4AF37] text-[#090A0C] text-xs md:text-sm font-bold py-2.5 px-4 text-center tracking-wide">
        Expansion Régionale en cours: Bénin, Côte d'Ivoire & Burkina Faso — Rejoignez notre réseau commercial.
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
              className={`px-5 py-2.5 rounded-lg font-bold text-sm transition shadow-md ${activeTab === 'partenaire' ? 'bg-white text-[#090A0C]' : 'bg-[#D4AF37] text-[#090A0C] hover:bg-[#c5a030] shadow-[#D4AF37]/25'}`}
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
            <button onClick={() => { setActiveTab('accueil'); setMobileMenuOpen(false); }} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1 w-full text-left">Accueil</button>
            <a href="#poles" onClick={() => { setActiveTab('accueil'); setMobileMenuOpen(false); }} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">Nos Pôles</a>
            <a href="#boutique" onClick={() => { setActiveTab('accueil'); setMobileMenuOpen(false); }} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">Boutique & Négoce</a>
            <a href="#carrieres" onClick={() => { setActiveTab('accueil'); setMobileMenuOpen(false); }} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">Carrières</a>
            <a href="#contact" onClick={() => { setActiveTab('accueil'); setMobileMenuOpen(false); }} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">Contact</a>
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

      {/* CONTENU CONDITIONNEL */}
      {activeTab === 'partenaire' ? (
        <section className="py-16 px-6 max-w-4xl mx-auto min-h-[75vh] flex flex-col justify-center">
          {!partnerLoggedIn ? (
            <div className="bg-slate-900 border border-[#D4AF37]/40 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Accès Réservé Partenaires</span>
                <h2 className="text-3xl font-extrabold text-white">Portail Partenaire RC SAB MIDLEY</h2>
                <p className="text-slate-400 text-sm max-w-md mx-auto">Veuillez entrer le mot de passe universel du réseau pour accéder aux informations et guides.</p>
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
                <button type="submit" className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20">
                  Entrer sur le portail
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-slate-900 border border-[#D4AF37]/40 rounded-3xl p-8 md:p-12 shadow-2xl space-y-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-6 gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Espace Privé Partenaire</span>
                  <h2 className="text-3xl font-extrabold text-white">Bienvenue sur le Portail Partenaire RC SAB MIDLEY</h2>
                </div>
                <button onClick={() => { setPartnerLoggedIn(false); setUniversalPasswordInput(''); }} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition">
                  Fermer la session
                </button>
              </div>
              <div className="space-y-4 text-slate-300 leading-relaxed text-sm">
                <p className="text-base font-semibold text-white">Bienvenue dans le Réseau Commercial RC SAB MIDLEY.</p>
                <p>Cette page regroupe toutes les ressources pour démarrer votre activité de partenaire.</p>
              </div>
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Hero Section */}
          <section className="py-20 px-6 max-w-7xl mx-auto text-center space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold tracking-widest uppercase">
              Excellence & Fiabilité en Afrique de l'Ouest
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
              Votre Partenaire Stratégique en <span className="text-[#D4AF37]">Négoce et Services</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
              Implantés à Abomey-Calavi (Bénin) et en expansion sur la Côte d'Ivoire et le Burkina Faso, nous connectons ambition et opportunités à travers nos quatre pôles d'excellence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <a href="#poles" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20">
                Découvrir nos Pôles
              </a>
              <a href="#boutique" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold hover:border-[#D4AF37]/50 transition">
                Visiter la Boutique
              </a>
            </div>
          </section>

          {/* Section Nos Pôles */}
          <section id="poles" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-3xl font-extrabold text-white">Nos Domaines d'Expertise</h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto">Une offre diversifiée pour répondre aux exigences des particuliers et des professionnels.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {poles.map((pole) => (
                <div key={pole.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/40 transition group">
                  <div className="h-48 overflow-hidden relative">
                    <img src={pole.image} alt={pole.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-4 left-4 bg-[#090A0C]/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                      {pole.badge}
                    </div>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white">{pole.title}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed">{pole.description}</p>
                    </div>
                    <a href="#contact" className="text-xs font-bold text-[#D4AF37] hover:underline inline-flex items-center space-x-1">
                      <span>En savoir plus</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section Boutique & Négoce */}
          <section id="boutique" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
            <div className="text-center space-y-3 mb-16">
              <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Négoce & Distribution</span>
              <h2 className="text-3xl font-extrabold text-white">Notre Catalogue de Produits</h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto">Sélection d'équipements, de mobilier et d'articles de qualité supérieure disponibles immédiatement.</p>
            </div>

            {orderSuccess && (
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-2xl max-w-2xl mx-auto mb-12 text-center space-y-3">
                <h3 className="text-emerald-400 font-bold text-lg">Commande validée avec succès !</h3>
                <p className="text-slate-300 text-sm">Merci, {orderSuccess.fullName}. Votre reçu officiel a été généré et téléchargé.</p>
                <button onClick={() => setOrderSuccess(null)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold">
                  Fermer
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsList.map((product: any) => (
                <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/40 transition">
                  <div className="h-60 overflow-hidden relative">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-[#090A0C]/90 backdrop-blur-md px-3 py-1 rounded-lg text-sm font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                      {product.price}
                    </div>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white">{product.title}</h3>
                      <p className="text-slate-400 text-xs line-clamp-2">{product.description}</p>
                    </div>
                    <div className="flex items-center space-x-3 pt-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
                      >
                        Détails
                      </button>
                      <button
                        onClick={() => setOrderProduct(product)}
                        className="flex-1 py-3 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-xs hover:bg-[#c5a030] transition shadow-md"
                      >
                        Commander
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section Carrières */}
          <section id="carrieres" className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-900">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Rejoignez l'équipe</span>
                <h2 className="text-3xl font-extrabold text-white">Carrières & Opportunités</h2>
                <p className="text-slate-400 text-sm max-w-md mx-auto">Vous souhaitez contribuer au développement d'un acteur majeur du négoce en Afrique ? Postulez dès maintenant.</p>
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
                      <input type="text" name="fullName" value={careerForm.fullName} onChange={handleCareerChange} placeholder="Ex: Jean Dupont" required className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Email</label>
                      <input type="email" name="email" value={careerForm.email} onChange={handleCareerChange} placeholder="jean@example.com" required className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20">
                    Envoyer ma candidature
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Section Contact */}
          <section id="contact" className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-900">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl space-y-8">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Restons en contact</span>
                <h2 className="text-3xl font-extrabold text-white">Contactez-nous</h2>
                <p className="text-slate-400 text-sm max-w-md mx-auto">Une question sur nos services, une commande ou un partenariat ? Écrivez-nous.</p>
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
                      <input type="text" name="name" value={contactForm.name} onChange={handleContactChange} placeholder="Votre nom" required className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Email</label>
                      <input type="email" name="email" value={contactForm.email} onChange={handleContactChange} placeholder="votre@email.com" required className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20">
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Modal Détails Produit */}
          {selectedProduct && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-6 p-6 relative">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold">X</button>
                <div className="h-56 rounded-2xl overflow-hidden">
                  <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                  <span className="text-[#D4AF37] font-bold text-lg">{selectedProduct.price}</span>
                  <h3 className="text-xl font-extrabold text-white">{selectedProduct.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{selectedProduct.description}</p>
                </div>
                <div className="flex space-x-4 pt-2">
                  <button
                    onClick={() => { const prod = selectedProduct; setSelectedProduct(null); setOrderProduct(prod); }}
                    className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-sm hover:bg-[#c5a030] transition shadow-md"
                  >
                    Commander ce produit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Commande & FedaPay */}
          {orderProduct && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-6 p-6 relative max-h-[90vh] overflow-y-auto">
                <button onClick={() => setOrderProduct(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold">X</button>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#D4AF37] uppercase">Finaliser la commande</span>
                  <h3 className="text-xl font-extrabold text-white">{orderProduct.title}</h3>
                  <p className="text-[#D4AF37] font-bold">{orderProduct.price}</p>
                </div>
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Nom complet</label>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Pays</label>
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
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Ville</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Ex: Abomey-Calavi"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Téléphone (Mobile Money)</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+229..."
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email (Optionnel)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                    />
                  </div>
                  <div>
                    {!showPartnerField ? (
                      <button
                        type="button"
                        onClick={() => setShowPartnerField(true)}
                        className="text-xs text-[#D4AF37] hover:underline font-semibold"
                      >
                        + Avez-vous un code partenaire ?
                      </button>
                    ) : (
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Code partenaire</label>
                        <input
                          type="text"
                          name="partnerCode"
                          value={formData.partnerCode}
                          onChange={handleInputChange}
                          placeholder="Entrez le code partenaire"
                          className="w-full px-4 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none transition text-sm"
                        />
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20"
                  >
                    Procéder au Paiement Sécurisé (FedaPay)
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#090A0C] py-12 px-6 text-center text-xs text-slate-500 space-y-4">
        <p className="font-bold text-slate-300 text-sm">SAB MIDLEY - Abomey-Calavi, Bénin</p>
        <p>Contacts: Bénin: +229 01 69 32 55 76 | Côte d'Ivoire: +225 07 104 106 04 | Burkina Faso: +226 04 26 18 02</p>
        <p>© 2026 SAB MIDLEY. Tous droits réservés.</p>
      </footer>

      {/* Bouton Scroll Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#D4AF37] text-[#090A0C] shadow-lg hover:bg-[#c5a030] transition"
          aria-label="Retour en haut"
        >
          ↑
        </button>
      )}
    </div>
  );
}
