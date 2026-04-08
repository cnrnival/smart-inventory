
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../app/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/Navbar';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProductsContextProvider } from '@/contexts/ProductsContext';

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
          <ProductsContextProvider>
            <Navbar />
            
            <main className="flex-1 flex flex-col">
              {children}
            </main>

            <Toaster richColors position="top-right" />
          </ProductsContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}