'use client';

import { useState, useEffect } from 'react';
import { productsList as initialProducts } from './produit';

export default function Home() {
  const [productsList, setProductsList] = useState<any[]>(
    initialProducts.map(p => ({
      ...p,
      images: p.images || [p.image]
    }))
  );
  
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [orderProduct, setOrderProduct] = useState<any>(null);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);
  
  const [fedapayLoaded, setFedapayLoaded] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [activeTab, setActiveTab] = useState<'accueil' | 'partenaire'>('accueil');
  const [partnerLoggedIn, setPartnerLoggedIn] = useState(false);
  const [universalPasswordInput, setUniversalPasswordInput] = useState('');
  
  const UNIVERSAL_PARTNER_PASSWORD = 'rcsabmidley2026';

  // Chargement sécurisé du script FedaPay
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ((window as any).FedaPay) {
        setFedapayLoaded(true);
      } else if (document.getElementById('fedapay-script')) {
        setFedapayLoaded(true);
      } else {
        const script = document.createElement('script');
        script.id = 'fedapay-script';
        script.src = 'https://cdn.fedapay.com/checkout.js?v=1.1.7';
        script.async = true;
        script.onload = () => setFedapayLoaded(true);
        document.body.appendChild(script);
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: 'BJ',
    city: '',
    address: '',
    district: '',
    indications: '',
    phone: '',
    partnerCode: '',
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUniversalLogin = (e: any) => {
    e.preventDefault();
    if (universalPasswordInput.trim() === UNIVERSAL_PARTNER_PASSWORD) {
      setPartnerLoggedIn(true);
    } else {
      alert("Mot de passe incorrect. Veuillez vérifier le code d'accès.");
    }
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
    } catch (error) {
      console.error("Erreur Google Sheets:", error);
    }
  };

  // Import dynamique de jsPDF pour éviter les erreurs SSR (Server-Side Rendering)
  const generatePDFReceipt = async (orderData: any) => {
    if (typeof window === 'undefined') return;
    const { default: jsPDF } = await import('jspdf');

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

    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, 80, 170, 52, 3, 3, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.text('Informations du Client & Livraison :', 25, 88);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nom: ${orderData.fullName}`, 25, 96);
    doc.text(`Email: ${orderData.email} | Tel : ${orderData.phone}`, 25, 103);
    doc.text(`Adresse: ${orderData.address} - Quartier: ${orderData.district}`, 25, 110);
    doc.text(`Indications: ${orderData.indications || 'Aucune'}`, 25, 117);
    doc.text(`Ville/Pays: ${orderData.city} (${orderData.country})`, 25, 124);

    doc.setFillColor(9, 10, 12);
    doc.rect(20, 142, 170, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text("Désignation de l'Article", 25, 148);
    doc.text('Montant', 150, 148);

    doc.setTextColor(50, 50, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(orderData.productTitle, 25, 162);
    doc.setFont('helvetica', 'bold');
    doc.text(orderData.price, 150, 162);

    doc.setDrawColor(200, 200, 200);
    doc.line(20, 172, 190, 172);
    doc.setFont('helvetica', 'normal');
    doc.text('Sous-total:', 120, 182);
    doc.text(orderData.price, 150, 182);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(212, 175, 55);
    doc.text('Total Payé :', 120, 202);
    doc.text(orderData.price, 150, 202);

    doc.save(`Recu_SAB_MIDLEY_${orderData.fullName.replace(/\s+/g, '_')}.pdf`);
  };

  const handleOrderSubmit = (e: any) => {
    e.preventDefault();
    if (!formData.fullName || !formData.city || !formData.phone || !formData.country || !formData.address || !formData.district) {
      alert('Veuillez remplir tous les champs obligatoires.');
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
    let clientEmail = formData.email ? formData.email.trim() : `client_${Date.now()}@sabmidley.co`;
    
    const nameParts = formData.fullName.trim().split(' ');
    const firstname = nameParts[0] ? nameParts[0].trim() : 'Client';
    const lastname = nameParts.slice(1).join(' ').trim() || 'Client';
    const descriptionText = `Commande: ${orderProduct.title}`.replace(/["\\]/g, '');

    const handleSuccessfulPayment = async () => {
      const completedOrder = {
        fullName: formData.fullName,
        email: clientEmail,
        productTitle: orderProduct.title,
        price: orderProduct.price,
        city: formData.city,
        address: formData.address,
        district: formData.district,
        indications: formData.indications,
        phone: formData.phone,
        country: formData.country,
        partnerCode: formData.partnerCode || 'Aucun',
        date: new Date().toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      };

      await saveOrderToGoogleSheets(completedOrder);
      setOrderProduct(null);
      setSelectedProduct(null);
      setOrderSuccess(completedOrder);
      await generatePDFReceipt(completedOrder);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const FedaPayObj = (window as any).FedaPay;
    if (FedaPayObj && typeof FedaPayObj.init === 'function') {
      try {
        const widget = FedaPayObj.init({
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
        alert("Une erreur est survenue lors de l'ouverture du module de paiement.");
      }
    } else {
      alert("Le module FedaPay est en cours de chargement. Veuillez patienter 3 secondes et réessayer.");
    }
  };

  const handleMultipleImageUpload = (e: any, setImagesList: (imgs: string[]) => void, currentList: string[]) => {
    const files = Array.from(e.target.files) as File[];
    if (files.length === 0) return;

    let newImages: string[] = [...currentList];
    files.forEach((file) => {
      if (newImages.length >= 3) return;
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          newImages.push(uploadEvent.target.result as string);
          setImagesList([...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSaveEditedProduct = (e: any) => {
    e.preventDefault();
    setProductsList(productsList.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
    alert('Article mis à jour avec succès !');
  };

  return (
    <div className="min-h-screen bg-[#090A0C] text-slate-100 font-sans relative">
      <div className="bg-[#D4AF37] text-[#090A0C] text-xs md:text-sm font-bold py-2.5 px-4 text-center tracking-wide">
        Expansion Régionale en cours: Bénin, Côte d'Ivoire & Burkina Faso
      </div>

      <header className="sticky top-0 z-40 bg-[#090A0C]/90 backdrop-blur-md border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => setActiveTab('accueil')} className="text-xl font-black text-white tracking-wider text-left">
            SAB <span className="text-[#D4AF37]">MIDLEY</span>
          </button>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <button onClick={() => setActiveTab('accueil')} className={`${activeTab === 'accueil' ? 'text-[#D4AF37]' : 'text-slate-300'} hover:text-white transition`}>Accueil</button>
            <a href="#boutique" onClick={() => setActiveTab('accueil')} className="hover:text-[#D4AF37] transition">Boutique & Négoce</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => setActiveTab('partenaire')} className={`px-5 py-2.5 rounded-lg font-bold text-sm transition shadow-md ${activeTab === 'partenaire' ? 'bg-white text-[#090A0C]' : 'bg-[#D4AF37] text-[#090A0C] hover:bg-[#c5a030]'}`}>
              Portail Partenaire
            </button>
          </div>
        </div>
      </header>

      {activeTab === 'partenaire' ? (
        <section className="py-16 px-6 max-w-4xl mx-auto min-h-[75vh] flex flex-col justify-center">
          {!partnerLoggedIn ? (
            <div className="bg-slate-900 border border-[#D4AF37]/40 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
              <div className="text-center space-y-3">
                <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Accès Réservé Partenaires</span>
                <h2 className="text-3xl font-extrabold text-white">Portail Partenaire RC SAB MIDLEY</h2>
              </div>
              <form onSubmit={handleUniversalLogin} className="space-y-6 max-w-md mx-auto w-full">
                <input
                  type="password"
                  value={universalPasswordInput}
                  onChange={(e) => setUniversalPasswordInput(e.target.value)}
                  placeholder="Mot de passe universel"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none text-sm"
                />
                <button type="submit" className="w-full py-4 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold hover:bg-[#c5a030] transition">
                  Entrer sur le portail
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-slate-900 border border-[#D4AF37]/40 rounded-3xl p-8 md:p-12 shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-6">
                <h2 className="text-2xl font-extrabold text-white">Espace Partenaire Actif</h2>
                <button onClick={() => setPartnerLoggedIn(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs">Fermer la session</button>
              </div>
              <p className="text-slate-300 text-sm">Bienvenue dans le réseau commercial RC SAB MIDLEY.</p>
            </div>
          )}
        </section>
      ) : (
        <>
          {orderSuccess && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl p-8 max-w-lg w-full text-center space-y-6 shadow-2xl relative">
                <button onClick={() => setOrderSuccess(null)} className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-full text-xs font-bold transition">
                  ✕ Fermer
                </button>
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">✓</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Paiement validé avec succès !</h3>
                  <p className="text-slate-400 text-sm">Merci {orderSuccess.fullName}, votre commande a bien été enregistrée et transmise.</p>
                </div>
                <div className="flex space-x-3 pt-2">
                  <button onClick={() => generatePDFReceipt(orderSuccess)} className="flex-1 py-3.5 bg-[#D4AF37] text-[#090A0C] font-bold rounded-xl text-xs hover:bg-[#c5a030] transition shadow-lg">
                    Télécharger le reçu PDF
                  </button>
                  <button onClick={() => setOrderSuccess(null)} className="px-5 py-3.5 bg-slate-800 text-white font-semibold rounded-xl text-xs hover:bg-slate-700 transition">
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedProduct && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-slate-900 border border-[#D4AF37]/40 rounded-3xl p-6 md:p-8 max-w-2xl w-full relative space-y-6 my-8">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition">
                  ✕ Fermer
                </button>
                
                <div className="space-y-3">
                  <div className="h-72 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                    <img 
                      src={selectedProduct.images?.[activeImageIndex] || selectedProduct.image} 
                      alt={selectedProduct.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  {selectedProduct.images && selectedProduct.images.length > 1 && (
                    <div className="flex space-x-3 justify-center">
                      {selectedProduct.images.map((img: string, idx: number) => (
                        <button 
                          key={idx} 
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${activeImageIndex === idx ? 'border-[#D4AF37]' : 'border-slate-800 opacity-60'}`}
                        >
                          <img src={img} alt="Miniature" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">{selectedProduct.price}</span>
                  <h2 className="text-2xl font-extrabold text-white">{selectedProduct.title}</h2>
                  <p className="text-slate-300 text-sm leading-relaxed">{selectedProduct.description}</p>
                </div>
                
                <div className="flex space-x-4 pt-2">
                  <button onClick={() => { setSelectedProduct(null); setOrderProduct(selectedProduct); setActiveImageIndex(0); }} className="flex-1 py-3.5 bg-[#D4AF37] text-[#090A0C] font-bold rounded-xl text-xs hover:bg-[#c5a030] transition shadow-lg">
                    Commander cet article
                  </button>
                  <button onClick={() => setSelectedProduct(null)} className="px-5 py-3.5 bg-slate-800 text-slate-300 font-semibold rounded-xl text-xs hover:bg-slate-700 transition">
                    Retour
                  </button>
                </div>
              </div>
            </div>
          )}

          {orderProduct && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-slate-900 border border-[#D4AF37]/40 rounded-3xl p-6 md:p-8 max-w-xl w-full relative space-y-6 my-8">
                <button onClick={() => setOrderProduct(null)} className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition">
                  ✕ Fermer
                </button>
                <div className="space-y-1">
                  <span className="text-xs text-[#D4AF37] font-bold">Finaliser l'achat</span>
                  <h2 className="text-xl font-extrabold text-white">{orderProduct.title} ({orderProduct.price})</h2>
                </div>
                
                <form onSubmit={handleOrderSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold uppercase text-slate-400 mb-1">Nom complet *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Ex: Koffi Mensah" required className="w-full px-3.5 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold uppercase text-slate-400 mb-1">Téléphone (Mobile Money) *</label>
                      <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+229..." required className="w-full px-3.5 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none" />
                    </div>
                    <div>
                      <label className="block font-semibold uppercase text-slate-400 mb-1">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="email@example.com" className="w-full px-3.5 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold uppercase text-slate-400 mb-1">Pays *</label>
                      <select name="country" value={formData.country} onChange={handleInputChange} className="w-full px-3.5 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none">
                        <option value="BJ">Bénin</option>
                        <option value="CI">Côte d'Ivoire</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="TG">Togo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold uppercase text-slate-400 mb-1">Ville *</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Ex: Abomey-Calavi / Abidjan" required className="w-full px-3.5 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold uppercase text-slate-400 mb-1">Adresse exacte *</label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Ex: Maison bleue, Lot 12" required className="w-full px-3.5 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none" />
                    </div>
                    <div>
                      <label className="block font-semibold uppercase text-slate-400 mb-1">Quartier *</label>
                      <input type="text" name="district" value={formData.district} onChange={handleInputChange} placeholder="Ex: Cocody / Akogbato" required className="w-full px-3.5 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold uppercase text-slate-400 mb-1">Indications de livraison (Optionnel)</label>
                    <input type="text" name="indications" value={formData.indications} onChange={handleInputChange} placeholder="Ex: Près du carrefour, portail noir" className="w-full px-3.5 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white focus:border-[#D4AF37] outline-none" />
                  </div>

                  <div className="pt-2 flex space-x-3">
                    <button type="submit" className="flex-1 py-3.5 bg-[#D4AF37] text-[#090A0C] font-bold rounded-xl hover:bg-[#c5a030] transition shadow-lg">
                      {fedapayLoaded ? `Payer par FedaPay (${orderProduct.price})` : "Chargement FedaPay..."}
                    </button>
                    <button type="button" onClick={() => setOrderProduct(null)} className="px-5 py-3.5 bg-slate-800 text-slate-300 font-semibold rounded-xl hover:bg-slate-700 transition">
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {editingProduct && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-slate-900 border border-[#D4AF37]/40 rounded-3xl p-6 md:p-8 max-w-xl w-full relative space-y-6 my-8">
                <button onClick={() => setEditingProduct(null)} className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition">
                  ✕ Fermer
                </button>
                <h3 className="text-xl font-bold text-white">Modifier l'article</h3>
                <form onSubmit={handleSaveEditedProduct} className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase text-slate-400 mb-1">Titre</label>
                    <input type="text" value={editingProduct.title} onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})} className="w-full px-3.5 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white" required />
                  </div>
                  <div>
                    <label className="block uppercase text-slate-400 mb-1">Prix</label>
                    <input type="text" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full px-3.5 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white" required />
                  </div>
                  <div>
                    <label className="block uppercase text-slate-400 mb-1">Description</label>
                    <textarea value={editingProduct.description} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full px-3.5 py-3 rounded-xl bg-[#090A0C] border border-slate-800 text-white h-24" required />
                  </div>
                  <div>
                    <label className="block uppercase text-slate-400 mb-1">Images (Sélectionner 1 à 3 images locales)</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      onChange={(e) => handleMultipleImageUpload(e, (imgs) => setEditingProduct({...editingProduct, images: imgs}), editingProduct.images || [])} 
                      className="w-full text-slate-400 text-xs py-2" 
                    />
                    <div className="flex space-x-2 mt-2">
                      {editingProduct.images?.map((img: string, idx: number) => (
                        <div key={idx} className="w-12 h-12 rounded-lg overflow-hidden border border-slate-700">
                          <img src={img} alt="Aperçu" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 flex space-x-3">
                    <button type="submit" className="flex-1 py-3.5 bg-[#D4AF37] text-[#090A0C] font-bold rounded-xl hover:bg-[#c5a030] transition">Enregistrer les modifications</button>
                    <button type="button" onClick={() => setEditingProduct(null)} className="px-5 py-3.5 bg-slate-800 text-slate-300 font-semibold rounded-xl">Annuler</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <section className="py-20 px-6 max-w-7xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
              Votre Partenaire Stratégique en <span className="text-[#D4AF37]">Négoce et Services</span>
            </h1>
          </section>

          <section id="boutique" className="py-20 px-6 max-w-7xl mx-auto border-t border-t-slate-900">
            <div className="text-center space-y-3 mb-16">
              <span className="text-xs font-bold px-3 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] tracking-wider uppercase">Négoce & Distribution</span>
              <h2 className="text-3xl font-extrabold text-white">Notre Catalogue de Produits</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsList.map((product: any) => (
                <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/40 transition shadow-xl">
                  <div className="h-60 overflow-hidden relative bg-slate-950">
                    <img src={product.images?.[0] || product.image} alt={product.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 bg-[#090A0C]/90 backdrop-blur-md px-3 py-1 rounded-lg text-sm font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                      {product.price}
                    </div>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-white">{product.title}</h3>
                      <p className="text-slate-400 text-xs line-clamp-2">{product.description}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <button onClick={() => { setSelectedProduct(product); setActiveImageIndex(0); }} className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition">
                        Détails
                      </button>
                      <button onClick={() => setOrderProduct(product)} className="py-2.5 rounded-xl bg-[#D4AF37] text-[#090A0C] font-bold text-xs hover:bg-[#c5a030] transition">
                        Commander
                      </button>
                      <button onClick={() => setEditingProduct(product)} className="py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs transition">
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
