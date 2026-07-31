"use client"; // Nécessaire pour gérer l'ouverture du menu mobile avec un état
import { useState } from "react";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Intégration du script officiel FedaPay */}
        <Script src="https://cdn.fedapay.com/checkout.js?v=1.1.7" strategy="beforeInteractive" />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        
        {/* === BARRE DE NAVIGATION GLOBALE (PC & Mobile) === */}
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            
            {/* 1. Logo SAB MIDLEY cliquable vers l'accueil */}
            <Link href="/" className="text-xl font-bold tracking-wider text-gray-900">
              SAB MIDLEY
            </Link>

            {/* 2. Menu pour grand écran (PC) */}
            <nav className="hidden md:flex space-x-8 items-center font-medium text-gray-600">
              <Link href="/" className="hover:text-black transition-colors">Accueil</Link>
              <Link href="/catalogue" className="hover:text-black transition-colors">Catalogue</Link>
              <Link href="/reseau" className="hover:text-black transition-colors">Le Réseau</Link>
              <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
            </nav>

            {/* 3. Bouton Burger pour Mobile */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 focus:outline-none p-2"
              aria-label="Menu"
            >
              {isOpen ? (
                // Icône Croix (Fermer)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Icône 3 barres (Ouvrir)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Menu déroulant mobile (s'affiche si isOpen est vrai) */}
          {isOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-5 space-y-3 shadow-lg">
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-black font-medium"
              >
                Accueil
              </Link>
              <Link 
                href="/catalogue" 
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-black font-medium"
              >
                Catalogue
              </Link>
              <Link 
                href="/reseau" 
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-black font-medium"
              >
                Le Réseau
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-700 hover:text-black font-medium"
              >
                Contact
              </Link>
            </div>
          )}
        </header>

        {/* === CONTENU DE LA PAGE === */}
        <main className="flex-grow">{children}</main>

      </body>
    </html>
  );
}