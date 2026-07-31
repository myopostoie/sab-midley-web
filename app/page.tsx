'use client';

import { useState } from 'react';

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
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'partners'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const scriptURL = 'https://script.google.com/macros/s/AKfycbyCLzeK1mr3pccEO2Hc1UVtd-qA_SZe4uKQkpVr1ZP063mTc3I7JAAGcnPYWTb5pzuW/exec';

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'SabMidley2026!') {
      setIsAuthenticated(true);
      fetchOrdersFromGoogleSheets();
    } else {
      alert('Mot de passe administrateur incorrect.');
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));

    const targetOrder = orders.find(o => o.id === id);
    if (!targetOrder) return;

    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateStatus',
          rowIndex: targetOrder.rowIndex,
          status: newStatus
        })
      });
    } catch (error) {
      console.error('Erreur lors de la synchronisation du statut :', error);
    }
  };

  const totalRevenue = orders.reduce((acc, order) => {
    const cleanNum = parseInt(String(order.price).replace(/[^0-9]/g, ''), 10) || 0;
    return acc + cleanNum;
  }, 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Sécurité Admin</span>
            <h1 className="text-2xl font-extrabold text-white">SAB MIDLEY Back-office</h1>
            <p className="text-slate-400 text-xs">Accès restreint aux administrateurs autorisés.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Mot de passe</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe admin"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-500 outline-none text-sm"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition text-sm shadow-lg shadow-amber-500/20"
            >
              Se connecter au tableau de bord
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Administration Générale</span>
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
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition"
            >
              Se déconnecter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-medium text-slate-400 uppercase">Chiffre d'Affaires Global</span>
            <p className="text-2xl font-extrabold text-amber-400">{totalRevenue.toLocaleString()} XOF</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-medium text-slate-400 uppercase">Commandes Validées</span>
            <p className="text-2xl font-extrabold text-white">{orders.length} Commandes</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
            <span className="text-xs font-medium text-slate-400 uppercase">Partenaires Enregistrés</span>
            <p className="text-2xl font-extrabold text-white">{PARTNERS_LIST.length} Membres</p>
          </div>
        </div>

        <div className="flex space-x-3 border-b border-slate-800 pb-4">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition ${activeTab === 'orders' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            📦 Gestion des Commandes ({orders.length})
          </button>
          <button 
            onClick={() => setActiveTab('partners')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition ${activeTab === 'partners' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`}
          >
            🤝 Réseau des Partenaires ({PARTNERS_LIST.length})
          </button>
        </div>

        {activeTab === 'orders' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Suivi des Commandes & Statuts Logistiques</h2>
              {loading && <span className="text-xs text-amber-400">Chargement des ventes...</span>}
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">Date & Client</th>
                    <th className="py-3 px-4">Article</th>
                    <th className="py-3 px-4">Montant & Ville</th>
                    <th className="py-3 px-4">Code Partenaire</th>
                    <th className="py-3 px-4">Statut Logistique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 text-sm">
                        {loading ? 'Chargement en cours...' : 'Aucune commande enregistrée pour le moment.'}
                      </td>
                    </tr>
                  ) : (
                    orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-4 px-4">
                          <span className="text-slate-400 text-[11px] block">{ord.date}</span>
                          <span className="text-white font-medium">{ord.client}</span>
                          <span className="text-slate-400 text-xs block">{ord.phone}</span>
                        </td>
                        <td className="py-4 px-4 text-slate-200">{ord.product}</td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-white block">{ord.price}</span>
                          <span className="text-slate-400 text-xs">{ord.city}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-md bg-slate-800 text-amber-400 text-xs font-semibold border border-slate-700">
                            {ord.parrain}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <select 
                            value={ord.status}
                            onChange={(e) => updateStatus(ord.id, e.target.value)}
                            className="bg-slate-950 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs outline-none focus:border-amber-500"
                          >
                            <option value="Payé / En préparation">Payé / En préparation</option>
                            <option value="Expédié">Expédié</option>
                            <option value="En cours de livraison">En cours de livraison</option>
                            <option value="Livré">Livré</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'partners' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-white">Liste officielle des Partenaires du Réseau</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">#ID</th>
                    <th className="py-3 px-4">Nom et Prénoms</th>
                    <th className="py-3 px-4">Code Partenaire</th>
                    <th className="py-3 px-4">Téléphone</th>
                    <th className="py-3 px-4">Pays & Validité</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {PARTNERS_LIST.map((partner) => (
                    <tr key={partner.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 px-4 text-slate-400 font-bold">{partner.id}</td>
                      <td className="py-3 px-4 text-white font-semibold">{partner.name}</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-800 text-amber-400 font-mono text-xs border border-slate-700">
                          {partner.code}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{partner.phone || 'Non renseigné'}</td>
                      <td className="py-3 px-4">
                        <span className="text-white font-medium block">{partner.country}</span>
                        <span className="text-slate-400 text-xs">Inscrit : {partner.date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
