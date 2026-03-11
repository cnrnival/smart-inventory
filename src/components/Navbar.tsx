'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, LayoutDashboard, PlusCircle, Layers, User } from 'lucide-react';

const links = [
  { to: '/', label: 'Início', icon: Package },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/register-product', label: 'Novo Produto', icon: PlusCircle },
  // { to: '/register-batch', label: 'Novo Lote', icon: Layers },
  { to: '/create-account', label: 'Criar Conta/Entrar', icon: User },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md h-[60px]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Package className="h-6 w-6" />
          Smart Inventory
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }, index) => (
            <Link
              key={index}
              href={to}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                ${pathname === to
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}