import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/Navbar';
import { AuthProvider } from '@/hooks/test_auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart Inventory',
  description: 'Gestão preventiva de estoque com foco em redução de desperdício',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#1a1a1a]`}>
        <AuthProvider>
          <Navbar />
          
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}