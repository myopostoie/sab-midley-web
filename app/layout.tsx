import './globals.css';
import type { Metadata } from 'next';
import GlobalKoffiChat from './GlobalKoffiChat';

export const metadata: Metadata = {
  title: 'SAB MIDLEY - Négoce et Services',
  description: 'Votre Partenaire Stratégique en Négoce et Services en Afrique de l\'Ouest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-[#090A0C] text-slate-100 font-sans antialiased selection:bg-[#D4AF37] selection:text-[#090A0C]">
        {children}
        <GlobalKoffiChat />
      </body>
    </html>
  );
}
