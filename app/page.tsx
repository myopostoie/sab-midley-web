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

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    if (orderData.partnerCode) {
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
    doc.text('À convenir', 150, 180);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(212, 175, 55);
    doc.text('Total Payé :', 120, 192);
    doc.text(orderData.price, 150, 192);

    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('SAB MIDLEY — Abomey-Calavi, Bénin | Tél : +229 01 69 32 55 76', 20, 230);
    doc.text('Ce reçu fait office de justificatif officiel pour votre transaction.', 20, 236);

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
            <a href="#" className="text-xl font-black text-white tracking-wider">
              SAB <span className="text-[#D4AF37]">MIDLEY</span>
            </a>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#" className="text-[#D4AF37] hover:text-white transition">Accueil</a>
            <a href="#poles" className="hover:text-[#D4AF37] transition">Nos Pôles</a>
            <a href="#boutique" className="hover:text-[#D4AF37] transition">Boutique & Négoce</a>
            <a href="#carrieres" className="hover:text-[#D4AF37] transition">Carrières</a>
            <a href="#contact" className="hover:text-[#D4AF37] transition">Contact</a>
          </nav>

          <div className="hidden md:block">
            <a href="#contact" className="px-5 py-2.5 rounded-lg bg-[#D4AF37] text-[#090A0C] font-bold text-sm hover:bg-[#c5a030] transition shadow-md shadow-[#D4AF37]/20">
              Espace Membre
            </a>
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
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">Accueil</a>
            <a href="#poles" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">Nos Pôles</a>
            <a href="#boutique" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">Boutique & Négoce</a>
            <a href="#carrieres" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">Carrières</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-[#D4AF37] font-medium py-1">Contact</a>
            <div className="pt-2">
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-center px-5 py-3 rounded-lg bg-[#D4AF37] text-[#090A0C] font-bold text-sm">
                Espace Membre
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section avec visuel de grande entreprise / partenariats */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center px-6 overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80" 
            alt="Partenariats et Équipe SAB MIDLEY" 
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <span className="inline-block py-2 px-5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium tracking-wider uppercase border border-[#D4AF37]/30 shadow-lg backdrop-blur-md">
            Réseau Commercial International & Alliances Stratégiques
          </span>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            L'Excellence Multiservice <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5c558] via-[#D4AF37] to-[#b39229]">
              Sans Frontières
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Basé au Bénin et en Côte d'Ivoire, SAB MIDLEY structure vos projets d'avenir à travers 4 pôles d'excellence, une plateforme e-commerce et un vaste réseau de plus de 500 partenaires indépendants.
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

      {/* Section E-commerce / Négoce */}
      <section id="boutique" className="py-24 px-6 max-w-7xl mx-auto border-t border-[#D4AF37]/20">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider">Catalogue & Négoce</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">Boutique & Équipements</h2>
            <p className="text-slate-400 max-w-xl text-lg">
              Cliquez sur un article pour commander, remplir vos coordonnées de livraison et régler directement par paiement sécurisé.
            </p>
          </div>
          <a 
            href="https://wa.me/2290169325576?text=Bonjour,%20je%20souhaite%20consulter%20l'int%C3%A9gralit%C3%A9%20du%20catalogue%20SAB%20MIDLEY" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition shadow-lg shadow-[#D4AF37]/20 text-center"
          >
            Assistance WhatsApp &rarr;
          </a>
        </div>

        {/* Grille des Produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsList.map((item, index) => {
            return (
              <div key={index} className="group rounded-2xl bg-slate-900/60 border border-[#D4AF37]/25 overflow-hidden hover:border-[#D4AF37] transition flex flex-col justify-between shadow-lg backdrop-blur-sm">
                <div 
                  onClick={() => setSelectedProduct(item as any)}
                  className="h-48 overflow-hidden relative cursor-pointer"
                >
                  <img src={(item as any).image} alt={(item as any).title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-3 right-3 bg-[#090A0C]/90 text-[#D4AF37] text-[10px] font-bold px-2.5 py-1 rounded-md border border-[#D4AF37]/30 backdrop-blur-md">
                    {(item as any).category}
                  </span>
                  <div className="absolute inset-0 bg-[#090A0C]/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="bg-[#D4AF37] text-[#090A0C] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
                      Voir tous les détails
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 
                      onClick={() => setSelectedProduct(item as any)}
                      className="text-base font-bold text-white line-clamp-1 hover:text-[#D4AF37] cursor-pointer transition"
                    >
                      {(item as any).title}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed">{(item as any).description}</p>
                  </div>
                  
                  <div className="space-y-3 pt-3 border-t border-slate-800/60">
                    <span className="text-[#D4AF37] font-extrabold text-base block">{(item as any).price}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setOrderProduct(item as any)}
                        className="py-2 px-2 text-center rounded-lg bg-[#D4AF37] text-[#090A0C] font-bold text-xs hover:bg-[#c5a030] transition truncate shadow-md"
                      >
                        Commander
                      </button>
                      <button 
                        onClick={() => setSelectedProduct(item as any)}
                        className="py-2 px-2 text-center rounded-lg bg-slate-800 text-slate-200 font-semibold text-xs hover:bg-slate-700 hover:text-white transition truncate border border-slate-700"
                      >
                        Détails
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION CARRIÈRES (RECRUTEMENT) */}
      <section id="carrieres" className="py-24 px-6 max-w-7xl mx-auto border-t border-[#D4AF37]/20">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider">Rejoignez notre dynamique</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Carrières & Opportunités</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            SAB MIDLEY grandit vite et recrute des talents motivés et des partenaires d'exception pour propulser ses activités au Bénin et en Côte d'Ivoire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Offre 1 : Partenaires Commerciaux Indépendants */}
          <div className="rounded-2xl bg-slate-900/80 border border-[#D4AF37]/40 p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-[#D4AF37] transition">
            <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#090A0C] text-xs font-extrabold px-4 py-1.5 rounded-bl-xl">
              +500 Partenaires
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition">Partenaires Commerciaux Indépendants</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Rejoignez notre réseau fort de plus de **500 partenaires** actifs. Votre mission : publier nos articles et trouver des clients.
              </p>
              <div className="bg-[#090A0C]/70 p-4 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs text-slate-300"><strong className="text-[#D4AF37]">Rémunération :</strong> Percevez entre <strong className="text-[#D4AF37]">10% et 20% de commission</strong> par vente.</p>
                <p className="text-xs text-slate-300"><strong className="text-[#D4AF37]">Fonctionnement simple :</strong> Vous ne faites que publier et trouver le client. <strong className="text-white">Nous gérons la livraison et l'encaissement !</strong></p>
              </div>
            </div>
            <div className="pt-6">
              <a 
                href="mailto:rh@sabmidley.co?subject=Candidature%20Partenaire%20Commercial%20Indépendant" 
                className="w-full py-3 text-center rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-sm hover:bg-[#c5a030] transition block shadow-md"
              >
                Postuler comme Partenaire
              </a>
            </div>
          </div>

          {/* Offre 2 : Assistance Commerciale */}
          <div className="rounded-2xl bg-slate-900/80 border border-[#D4AF37]/40 p-8 flex flex-col justify-between shadow-xl group hover:border-[#D4AF37] transition">
            <div className="space-y-4">
              <span className="text-xs font-bold px-3 py-1 rounded-md bg-slate-800 text-[#D4AF37] border border-slate-700">Abomey-Calavi, Bénin</span>
              <h3 className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition">Assistance Commerciale</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Nous recrutons un(e) assistant(e) commercial(e) dynamique pour travailler directement depuis notre pôle à <strong className="text-white">Abomey-Calavi</strong>.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside bg-[#090A0C]/70 p-4 rounded-xl border border-slate-800">
                <li>Accueil et suivi des clients et partenaires</li>
                <li>Gestion administrative des commandes et du catalogue</li>
                <li>Appui aux opérations quotidiennes du centre d'affaires</li>
              </ul>
            </div>
            <div className="pt-6">
              <a 
                href="mailto:rh@sabmidley.co?subject=Candidature%20Assistance%20Commerciale%20Abomey-Calavi" 
                className="w-full py-3 text-center rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-sm hover:bg-[#c5a030] transition block shadow-md"
              >
                Postuler à l'offre
              </a>
            </div>
          </div>

          {/* Offre 3 : Livreur */}
          <div className="rounded-2xl bg-slate-900/80 border border-[#D4AF37]/40 p-8 flex flex-col justify-between shadow-xl group hover:border-[#D4AF37] transition">
            <div className="space-y-4">
              <span className="text-xs font-bold px-3 py-1 rounded-md bg-slate-800 text-[#D4AF37] border border-slate-700">Abomey-Calavi, Bénin</span>
              <h3 className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition">Livreur / Logisticien</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Vous avez le sens du service, une bonne connaissance de la zone d'Abomey-Calavi et un moyen de déplacement fiable ? Rejoignez notre équipe logistique.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside bg-[#090A0C]/70 p-4 rounded-xl border border-slate-800">
                <li>Livraison rapide et sécurisée des articles de la boutique</li>
                <li>Encaissement et gestion des reçus clients sur le terrain</li>
                <li>Rigueur et ponctualité exigées</li>
              </ul>
            </div>
            <div className="pt-6">
              <a 
                href="mailto:rh@sabmidley.co?subject=Candidature%20Livreur%20Abomey-Calavi" 
                className="w-full py-3 text-center rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-sm hover:bg-[#c5a030] transition block shadow-md"
              >
                Postuler comme Livreur
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION CONTACT */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto border-t border-[#D4AF37]/20">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider">Restons en contact</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Nos Bureaux & Coordonnées</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Une question, un projet ou besoin d'assistance ? Contactez nos équipes au Bénin ou en Côte d'Ivoire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Adresse Bénin */}
          <div className="rounded-2xl bg-slate-900/60 border border-[#D4AF37]/30 p-8 space-y-4 backdrop-blur-sm">
            <span className="text-xs font-bold px-3 py-1 rounded-md bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">Siège — Bénin</span>
            <h3 className="text-2xl font-bold text-white">Aïhedji, Abomey-Calavi, Bénin</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Centre d'affaires principal, gestion des pôles négoce international, immobilier et logistique régionale.
            </p>
            <div className="pt-2">
              <a href="tel:+2290169325576" className="text-[#D4AF37] font-extrabold text-lg hover:underline block">
                +229 01 69 32 55 76
              </a>
            </div>
          </div>

          {/* Adresse Côte d'Ivoire */}
          <div className="rounded-2xl bg-slate-900/60 border border-[#D4AF37]/30 p-8 space-y-4 backdrop-blur-sm">
            <span className="text-xs font-bold px-3 py-1 rounded-md bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">Bureau — Côte d'Ivoire</span>
            <h3 className="text-2xl font-bold text-white">Angré Château, Abidjan, Côte d'Ivoire</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Antenne commerciale, développement du réseau d'indépendants et partenariats ouest-africains.
            </p>
            <div className="pt-2">
              <a href="tel:+2250710410604" className="text-[#D4AF37] font-extrabold text-lg hover:underline block">
                +225 07 104 106 04
              </a>
            </div>
          </div>

        </div>

        {/* E-mails officiels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Informations & Partenariats</span>
            <a href="mailto:contact@sabmidley.co" className="text-[#D4AF37] font-bold text-sm hover:underline">contact@sabmidley.co</a>
          </div>
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Boutique & Commandes</span>
            <a href="mailto:shop@sabmidley.co" className="text-[#D4AF37] font-bold text-sm hover:underline">shop@sabmidley.co</a>
          </div>
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 block mb-1">Ressources Humaines (RH)</span>
            <a href="mailto:rh@sabmidley.co" className="text-[#D4AF37] font-bold text-sm hover:underline">rh@sabmidley.co</a>
          </div>
        </div>
      </section>

      {/* Bouton Retour en haut */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#D4AF37] text-[#090A0C] font-bold flex items-center justify-center shadow-xl hover:bg-[#c5a030] transition"
          aria-label="Retour en haut"
        >
          ↑
        </button>
      )}

      {/* FOOTER */}
      <footer className="bg-[#090A0C] border-t border-[#D4AF37]/20 py-12 px-6 text-center text-slate-500 text-xs space-y-4">
        <p>© 2026 SAB MIDLEY. Tous droits réservés. Abomey-Calavi (Bénin) & Abidjan (Côte d'Ivoire).</p>
      </footer>

    </div>
  );
}
