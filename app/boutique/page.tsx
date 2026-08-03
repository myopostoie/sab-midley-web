'use client';

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import Navbar from '../components/Navbar';

export default function BoutiquePage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [orderProduct, setOrderProduct] = useState<any>(null);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);
  const [showPartnerField, setShowPartnerField] = useState(false);
  
  const defaultProducts = [
    { 
      id: 1, 
      title: "Article Premium Démo", 
      price: "25 000 XOF", 
      status: "En stock", 
      summary: "Idéal pour un usage professionnel quotidien avec finitions haut de gamme.",
      description: "Ceci est une description complète détaillée du produit incluant les spécificités techniques et les avantages pour les clients finaux.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" 
    }
  ];

  const [productsList, setProductsList] = useState<any[]>(defaultProducts);

  // 🔑 Clés JSONBin intégrées
  const BIN_ID = '6a70e40bda38895dfeb502bb'; 
  const API_KEY = '$2a$10$j7cMEnY0wys4AhMpQIYXhe11Z5wI5bgWCY1qSNxVzCFajdeWF6nVW';

  // Fonction pour charger les produits directement depuis le Cloud JSONBin
  const loadProductsFromCloud = async () => {
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { 'X-Master-Key': API_KEY },
        cache: 'no-store'
      });
      const data = await response.json();
      if (data && data.record && Array.isArray(data.record) && data.record.length > 0) {
        setProductsList(data.record);
      }
    } catch (e) {
      console.error("Erreur de chargement cloud des produits", e);
    }
  };

  useEffect(() => {
    // Chargement initial au montage de la page
    loadProductsFromCloud();

    // Actualisation automatique toutes les 60 secondes pour préserver les performances mobiles et le rate-limiting
    const interval = setInterval(loadProductsFromCloud, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: 'BJ',
    city: '',
    address: '',
    phone: '',
    partnerCode: '',
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveOrderToGoogleSheets = async (orderData: any) => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyCLzeK1mr3pccEO2Hc1UVtd-qA_SZe4uKQkpVr1ZP063mTc317JAAGcnPYWTb5pzuW/exec';
    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      console.log('Vente enregistrée avec succès dans le Google Sheets !');
    } catch (error) {
      console.error("Erreur lors de l'enregistrement dans Google Sheets:", error);
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
    doc.text('Informations du Client:', 25, 93);
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
    doc.text('✓ Service VIP & Assistance logistique activés.', 20, 244);
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
    let clientEmail = formData.email.trim();
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
            currency: { iso: 'XOF' }
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

  return (
    <div className="min-h-screen bg-[#090A0C] text-slate-100 font-sans relative">
      <Navbar />
      <section className="py-20 px-6 max-w-7xl mx-auto">
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
                  <p className="text-slate-400 text-xs line-clamp-2">{product.summary || product.description}</p>
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

      {/* Modal Détails Produit Améliorée (Standard VIP) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-6 p-6 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold">X</button>
            <div className="h-56 rounded-2xl overflow-hidden">
              <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-3">
              <span className="text-[#D4AF37] font-bold text-lg">{selectedProduct.price}</span>
              <h3 className="text-xl font-extrabold text-white">{selectedProduct.title}</h3>
              
              {/* Badges de certification et de service */}
              <div className="flex flex-wrap gap-2 py-1">
                 <span className="text-[10px] uppercase font-bold px-2 py-1 bg-slate-800 text-emerald-400 rounded-md">✓ Composants Certifiés</span>
                 <span className="text-[10px] uppercase font-bold px-2 py-1 bg-slate-800 text-[#D4AF37] rounded-md">⭐ Service VIP Inclus</span>
              </div>

              {selectedProduct.summary && (
                <p className="text-amber-400/90 text-sm italic font-semibold border-l-2 border-[#D4AF37] pl-3 py-1">
                  {selectedProduct.summary}
                </p>
              )}
              
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line pt-2">{selectedProduct.description}</p>
              
              {/* Mention packaging premium */}
              <div className="bg-[#090A0C] p-3 rounded-lg border border-slate-800 mt-2">
                <p className="text-xs text-slate-400">
                  <strong className="text-white">📦 Packaging & Logistique :</strong> Conditionnement sécurisé haute résistance prévu pour le transport régional.
                </p>
              </div>
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

      {/* Modal Commande / FedaPay */}
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

      <footer className="border-t border-slate-900 bg-[#090A0C] py-12 px-6 text-center text-xs text-slate-500 space-y-4">
        <p className="font-bold text-slate-300 text-sm">SAB MIDLEY - Abomey-Calavi, Bénin</p>
        <p>© 2026 SAB MIDLEY. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
