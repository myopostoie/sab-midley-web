'use client';

import { useState } from 'react';

export default function GlobalKoffiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'koffi', text: 'Bonjour et bienvenue ! Je suis Koffi, votre assistant virtuel. Que puis-je faire pour vous aujourd hui ?' }
  ]);
  const [input, setInput] = useState('');

  const clientFaqs = [
    { question: "Quels sont vos produits ?", answer: "Nous proposons une large gamme d'articles de qualité rigoureusement sélectionnés. Vous pouvez consulter notre catalogue directement sur la page d'accueil." },
    { question: "Zones de livraison", answer: "Nous livrons à Cotonou, Abomey-Calavi, Abidjan et Ouagadougou. Les délais varient entre 24h et 72h selon votre position." },
    { question: "Modalités de paiement", answer: "Le paiement à la livraison est disponible pour les commandes de moins de 50 000 FCFA dans nos zones couvertes. Au-delà, un paiement préalable ou un retrait en agence est requis." },
    { question: "Comment passer commande ?", answer: "Vous pouvez commander directement sur le site en ajoutant les articles au panier, ou nous contacter par WhatsApp pour valider votre achat." }
  ];

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      const found = clientFaqs.find(f => 
        f.question.toLowerCase().includes(textToSend.toLowerCase()) || 
        textToSend.toLowerCase().includes(f.question.toLowerCase())
      );
      
      const reply = found 
        ? found.answer 
        : "Je n'ai pas trouvé de réponse exacte à votre requête. Pour une assistance immédiate, contactez notre service client sur WhatsApp au +229 01 69 32 55 76.";
      
      setMessages(prev => [...prev, { sender: 'koffi', text: reply }]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-3 rounded-full bg-sky-600 text-white font-bold text-xs shadow-2xl hover:bg-sky-500 transition flex items-center space-x-2 border border-sky-400/30"
        >
          <span>Besoin d aide ? Discutez avec Koffi</span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col h-[450px] overflow-hidden">
          <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-white text-sm">Koffi - Assistant Virtuel</h4>
              <p className="text-[10px] text-emerald-400">En ligne pour vous aider</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white text-xs font-semibold px-2 py-1 rounded bg-slate-800"
            >
              Fermer
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  msg.sender === 'koffi'
                    ? 'bg-slate-800 text-slate-200 self-start'
                    : 'bg-sky-600 text-white font-medium ml-auto self-end'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-2 bg-slate-950 border-t border-slate-800 flex flex-wrap gap-1">
            {clientFaqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => handleSend(faq.question)}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-lg transition border border-slate-700"
              >
                {faq.question}
              </button>
            ))}
          </div>

          <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Posez votre question ici..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-sky-500 outline-none"
            />
            <button
              onClick={() => handleSend(input)}
              className="px-4 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-500 transition"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
