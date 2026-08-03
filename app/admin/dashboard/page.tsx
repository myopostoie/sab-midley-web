'use client';

import { useState, useEffect } from 'react';

const PARTNERS_LIST = [
  { id: 1, name: "AGBO BORIS", code: "RC26BJ6646849", phone: "229 90 70 07 70", country: "BENIN", date: "juillet 2026" },
  { id: 2, name: "AGONSANOU AMOUR GBEMANYITEMEDE TAGNON", code: "RC26BJ6383633", phone: "229 98 98 67 34", country: "BENIN", date: "juillet 2026" },
  { id: 3, name: "Félicien Adantohoude", code: "RC268759570974", phone: "229 65 85 83 03", country: "BENIN", date: "juillet 2026" },
  { id: 4, name: "Vivien HOSSOU", code: "RC26BJ79373", phone: "229 69 27 21 27", country: "BENIN", date: "juillet 2026" },
  { id: 5, name: "Sokou Dépouillé", code: "RC26BJ738373", phone: "229 93 96 18 84", country: "BENIN", date: "juillet 2026" },
  { id: 6, name: "GUIDIGAN Jaures", code: "RC26BJ6376363", phone: "229 69 06 70 53", country: "BENIN", date: "juillet 2026" },
  { id: 7, name: "WINGNON Ricardo", code: "RC26BJ748840", phone: "229 56 60 20 74", country: "BENIN", date: "juillet 2026" },
  { id: 8, name: "HOSSOU vivien", code: "RC26BJ79373", phone: "229 69 27 21 27", country: "BENIN", date: "juillet 2026" },
  { id: 9, name: "SEMEVO Emmel", code: "RC26BJ374949", phone: "229 40 58 75 45", country: "BENIN", date: "juillet 2026" },
  { id: 10, name: "MAMADOU MIcheline", code: "RC26BJ5293673", phone: "229 60 76 68 58", country: "BENIN", date: "juillet 2026" },
  { id: 11, name: "Damase TONASSE", code: "RC26BJGDAO", phone: "", country: "BENIN", date: "juillet 2026" },
  { id: 12, name: "Ola Roche", code: "RC26BJ069594", phone: "229 99 45 71 46", country: "BENIN", date: "juillet 2026" },
  { id: 13, name: "OSIRI COSMER", code: "RC26BJ0373", phone: "229 96 88 18 97", country: "BENIN", date: "juillet 2026" },
  { id: 14, name: "ADANTOHOUDE romain", code: "RC268759570974", phone: "229 65 85 83 03", country: "BENIN", date: "juillet 2026" },
  { id: 15, name: "HOUNNOU XAVIER", code: "RC26BJ53946", phone: "229 43 78 50 96", country: "BENIN", date: "juillet 2026" },
  { id: 16, name: "Folly bernice", code: "RC26BJ063937", phone: "229 54 97 40 99", country: "BENIN", date: "juillet 2026" },
  { id: 17, name: "RAMA KOUNOUTO", code: "RC26BJ58262", phone: "229 66 28 33 24", country: "BENIN", date: "juillet 2026" },
  { id: 18, name: "jaures GUIDIGAN", code: "RC26BJ6376363", phone: "229 69 06 70 53", country: "BENIN", date: "juillet 2026" },
  { id: 19, name: "SALOU Issslamiath", code: "RC26BJ6393", phone: "229 90 93 53 26", country: "BENIN", date: "juillet 2026" },
  { id: 20, name: "wadoud BIGNINOU", code: "RC26BJ3758", phone: "229 67 52 86 32", country: "BENIN", date: "juillet 2026" },
  { id: 21, name: "yves GNANHOUN", code: "RC26BJ73939", phone: "229 96 61 22 37", country: "BENIN", date: "juillet 2026" },
  { id: 22, name: "AHONSOU Simon", code: "RC26BJ629292", phone: "229 62 67 44 22", country: "BENIN", date: "juillet 2026" },
  { id: 23, name: "Nico IKPADON", code: "RC26BJ26858", phone: "229 52 99 10 97", country: "BENIN", date: "juillet 2026" },
  { id: 24, name: "AGOSSOU Edguard", code: "RC26BJ58303", phone: "229 40 57 90 50", country: "BENIN", date: "juillet 2026" },
  { id: 25, name: "Goudodessi Dieu Beni", code: "RC26BJ64474", phone: "229 43 17 44 27", country: "BENIN", date: "juillet 2026" },
  { id: 26, name: "CHABIGADO", code: "RC26BJ53393", phone: "229 50 50 48 10", country: "BENIN", date: "juillet 2026" }
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [step, setStep] = useState<'credentials' | 'secret'>('credentials');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secretAnswer, setSecretAnswer] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState('');

  const [activeTab, setActiveTab] = useState<'orders' | 'partners' | 'products'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Gestion des produits avec synchronisation localStorage
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('sabmidley_products');
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        setProducts([{ 
          id: 1, 
          title: "Article Premium Démo", 
          price: "25 000 XOF", 
          status: "En stock", 
          summary: "Idéal pour un usage professionnel quotidien avec finitions haut de gamme.",
          description: "Ceci est une description complète détaillée du produit incluant les spécificités techniques et les avantages pour les clients finaux.",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" 
        }]);
      }
    } else {
      setProducts([{ 
        id: 1, 
        title: "Article Premium Démo", 
        price: "25 000 XOF", 
        status: "En stock", 
        summary: "Idéal pour un usage professionnel quotidien avec finitions haut de gamme.",
        description: "Ceci est une description complète détaillée du produit incluant les spécificités techniques et les avantages pour les clients finaux.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" 
      }]);
    }
  }, []);

  const saveProductsToStorage = (newProductsList: any[]) => {
    setProducts(newProductsList);
    localStorage.setItem('sabmidley_products', JSON.stringify(newProductsList));
    
    // Déclencheur personnalisé instantané pour la page boutique
    window.dispatchEvent(new Event('sabmidley_products_updated'));
  };

  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStatus, setNewStatus] = useState('En stock');
  const [newSummary, setNewSummary] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const scriptURL = 'https://script.google.com/macros/s/AKfycbyCLzeK1mr3pccEO2Hc1UVtd-qA_SZe4uKQkpVr1ZP063mTc317JAAGcnPYWTb5pzuW/exec';

  const fetchOrdersFromGoogleSheets = async () => {
    setLoading(true);
    try {
      const response = await fetch(scriptURL);
      const data = await response.json();
      
      if (data && data.orders && Array.isArray(data.orders)) {
        const formattedOrders = data.orders.map((item: any, index: number) => ({
          id: `SM-2026-${index + 1000}`,
          rowIndex: item.rowIndex,
          date: item.date || '',
          client: item.fullName || 'Inconnu',
          phone: item.phone || '',
          product: item.productTitle || '',
          price: item.price || '0 XOF',
          city: item.city || '',
          parrain: item.partnerCode || 'Aucun',
          status: item.status || 'Payé / En préparation'
        }));
        setOrders(formattedOrders);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commandes :', error);
    } finally {
      setLoading(false);
    }
  };

  // Étape 1 : Vérification Identifiant & Mot de passe
  const handleCheckCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (cleanUser === 'paradize' && cleanPass === 'hongkong') {
      setCurrentUserRole('admin');
      setStep('secret');
    } else if (cleanUser === 'papa' && cleanPass === 'vanice') {
      setCurrentUserRole('director');
      setStep('secret');
    } else {
      alert('Identifiant ou mot de passe incorrect.');
    }
  };

  // Étape 2 : Vérification de la question secrète
  const handleCheckSecret = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAnswer = secretAnswer.trim().toLowerCase();

    if (currentUserRole === 'admin' && cleanAnswer === 'love') {
      setIsAuthenticated(true);
      fetchOrdersFromGoogleSheets();
    } else if (currentUserRole === 'director' && cleanAnswer === 'manhia') {
      setIsAuthenticated(true);
      fetchOrdersFromGoogleSheets();
    } else {
      alert('Réponse à la question secrète incorrecte.');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const newProd = {
      id: Date.now(),
      title: newTitle,
      price: newPrice,
      status: newStatus,
      summary: newSummary || 'Aucun résumé court.',
      description: newDescription || 'Aucune description détaillée fournie.',
      image: newImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
    };

    saveProductsToStorage([newProd, ...products]);
    setNewTitle('');
    setNewPrice('');
    setNewSummary('');
    setNewDescription('');
    setNewImage('');
    alert('Article ajouté avec succès au catalogue et synchronisé avec la boutique !');
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Voulez-vous vraiment retirer cet article du catalogue ?')) {
      saveProductsToStorage(products.filter(p => p.id !== id));
      setSelectedProduct(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Sécurité SAB MIDLEY</span>
            <h1 className="text-2xl font-extrabold text-white">Connexion Back-office</h1>
            <p className="text-slate-400 text-xs">
              {step === 'credentials' ? 'Veuillez entrer vos identifiants.' : 'Question de sécurité requise.'}
            </p>
          </div>

          {step === 'credentials' ? (
            <form onSubmit={handleCheckCredentials} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Nom d'utilisateur</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ex: paradize ou papa"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Mot de passe</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-500 outline-none text-sm"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition text-sm shadow-lg shadow-amber-500/20"
              >
                Suivant
              </button>
            </form>
          ) : (
            <form onSubmit={handleCheckSecret} className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Question secrète</span>
                <p className="text-white font-bold text-sm">why ?</p>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Votre réponse</label>
                <input 
                  type="password" 
                  value={secretAnswer}
                  onChange={(e) => setSecretAnswer(e.target.value)}
                  placeholder="Entrez la réponse secrète"
                  required
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-500 outline-none text-sm"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={() => { setStep('credentials'); setPassword(''); setSecretAnswer(''); }}
                  className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition text-xs"
                >
                  Retour
                </button>
                <button 
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition text-xs shadow-lg shadow-amber-500/20"
                >
                  Valider l'accès
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Administration Générale ({currentUserRole === 'admin' ? 'Admin: paradize' : 'Directeur: papa'})
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-1">Tableau de Bord SAB MIDLEY</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchOrdersFromGoogleSheets}
              className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-semibold transition"
            >
              🔄 Actualiser les données
            </button>
            <button 
              onClick={() => { setIsAuthenticated(false); setStep('credentials'); setPassword(''); setSecretAnswer(''); }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition"
            >
              Se déconnecter
            </button>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="flex space-x-3 border-b border-slate-800 pb-4 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition whitespace-nowrap ${activeTab === 'orders' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            📦 Gestion des Commandes ({orders.length})
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition whitespace-nowrap ${activeTab === 'products' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            🏷️ Gestion des Produits & Stocks ({products.length})
          </button>
          <button 
            onClick={() => setActiveTab('partners')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition whitespace-nowrap ${activeTab === 'partners' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            🤝 Réseau des Partenaires ({PARTNERS_LIST.length})
          </button>
        </div>

        {/* ONGLET PRODUITS */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">➕ Ajouter un nouvel article au catalogue</h2>
                <p className="text-slate-400 text-xs mt-1">Renseignez les informations pour mettre à jour instantanément la boutique en ligne.</p>
              </div>

              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Nom / Titre du produit</label>
                  <input 
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ex: Montre de Luxe"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Prix</label>
                  <input 
                    type="text"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="Ex: 45 000 XOF"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Statut du stock</label>
                  <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 outline-none"
                  >
                    <option value="En stock">🟢 En stock</option>
                    <option value="Bientôt en stock">🟡 Bientôt en stock</option>
                    <option value="Rupture de stock">🔴 Rupture de stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Lien de l'image (URL)</label>
                  <input 
                    type="url"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Petit résumé (accroche courte)</label>
                  <input 
                    type="text"
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="Ex: Idéal pour un usage quotidien..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Description complète</label>
                  <textarea 
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Détails complets, spécifications techniques, garanties..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-amber-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition text-xs shadow-lg shadow-amber-500/20"
                  >
                    Publier l'article immédiatement
                  </button>
                </div>
              </form>
            </div>

            {/* Liste des articles */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold text-white">📦 Catalogue actuel ({products.length})</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((prod) => (
                  <div key={prod.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <img src={prod.image} alt={prod.title} className="w-full h-36 object-cover rounded-xl border border-slate-800" />
                      <h3 className="font-bold text-white text-sm">{prod.title}</h3>
                      <p className="text-amber-400 font-extrabold text-sm">{prod.price}</p>
                      <p className="text-slate-400 text-xs line-clamp-2">{prod.summary}</p>
                      <span className="inline-block px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-[11px] border border-slate-800">
                        {prod.status}
                      </span>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={() => setSelectedProduct(prod)}
                        className="flex-1 py-2 rounded-xl bg-slate-900 text-amber-400 hover:bg-slate-800 border border-slate-800 text-xs font-semibold transition"
                      >
                        👁️ Visualiser
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="py-2 px-3 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-900/50 border border-red-500/30 text-xs transition"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modale de visualisation d'un article */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 relative shadow-2xl">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ✕
              </button>

              <div className="space-y-4">
                <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-56 object-cover rounded-2xl border border-slate-800" />
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-amber-400 uppercase">{selectedProduct.status}</span>
                  <h2 className="text-2xl font-extrabold text-white">{selectedProduct.title}</h2>
                  <p className="text-xl font-bold text-amber-400">{selectedProduct.price}</p>
                </div>
                
                <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase text-slate-400">Résumé</h4>
                  <p className="text-slate-200 text-xs">{selectedProduct.summary}</p>
                </div>

                <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <h4 className="text-xs font-bold uppercase text-slate-400">Description Complète</h4>
                  <p className="text-slate-300 text-xs whitespace-pre-line">{selectedProduct.description}</p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedProduct(null)}
                className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition text-xs"
              >
                Fermer la vue détaillée
              </button>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white">Suivi des Commandes</h2>
            {loading ? (
              <p className="text-slate-400 text-xs">Chargement des commandes depuis Google Sheets...</p>
            ) : orders.length === 0 ? (
              <p className="text-slate-400 text-xs">Aucune commande enregistrée pour le moment.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((order, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-amber-400 uppercase">{order.id} - {order.date}</span>
                      <h4 className="font-bold text-white text-sm">{order.client} ({order.phone})</h4>
                      <p className="text-slate-300 text-xs">Produit : <strong className="text-white">{order.product}</strong> ({order.price})</p>
                      <p className="text-slate-400 text-xs">Ville : {order.city} | Parrain : {order.parrain}</p>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'partners' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white">Réseau des Partenaires ({PARTNERS_LIST.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {PARTNERS_LIST.map((partner) => (
                <div key={partner.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] font-bold text-amber-400">{partner.code}</span>
                  <h4 className="font-bold text-white text-sm">{partner.name}</h4>
                  <p className="text-slate-400 text-xs">📱 {partner.phone || 'Non renseigné'}</p>
                  <p className="text-slate-500 text-[11px]">{partner.country} - {partner.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
