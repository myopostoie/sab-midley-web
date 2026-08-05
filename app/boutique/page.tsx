'use client';

import { useState } from 'react';
import { productsList as initialProducts } from '../products';

export default function BoutiquePage() {
  const [productsList] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#090A0C] text-slate-100 font-sans p-8">
      <h1 className="text-3xl font-extrabold text-white mb-8 text-center">
        Boutique <span className="text-[#D4AF37]">SAB MIDLEY</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {productsList.map((product: any) => (
          <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h3 className="text-lg font-bold text-white">{product.title}</h3>
              <p className="text-[#D4AF37] font-bold mt-1">{product.price}</p>
            </div>
            <button 
              onClick={() => setSelectedProduct(product)}
              className="mt-4 py-2.5 bg-[#D4AF37] text-[#090A0C] font-bold rounded-xl text-xs hover:bg-[#c5a030] transition"
            >
              Voir les détails
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-[#D4AF37] rounded-3xl p-6 max-w-lg w-full relative">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-4 right-4 bg-slate-800 text-white px-3 py-1 rounded-full text-xs"
            >
              ✕ Fermer
            </button>
            <h2 className="text-xl font-bold text-white mb-2">{selectedProduct.title}</h2>
            <p className="text-[#D4AF37] font-bold mb-4">{selectedProduct.price}</p>
            <p className="text-slate-300 text-sm">{selectedProduct.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
