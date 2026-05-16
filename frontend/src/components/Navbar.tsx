'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Package, User, Home, HandCoins } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';

const links = [
  { to: '/', label: 'Início', icon: Home },
  { to: '/profile', label: 'Perfil', icon: User },
  { to: '/inventory', label: 'Estoque', icon: Package }, //PlusCircle },
  { to: '/new-sale', label: 'Vender', icon: HandCoins },
];

export function Navbar() {

  const { user } = useAuthContext();
  const router = useRouter();

  const pathname = usePathname();
  const [isInventory, setIsInventory] = useState(false);


  useEffect(() => {
    if (pathname === '/inventory') {
      setIsInventory(true);
    } else {
      setIsInventory(false);
    }
  }, [pathname]);

  useEffect(() => {

  if (pathname === '/' && !user) {
    router.push('/welcome');
    return
  }
  const protectedRoutes = ['/inventory', '/profile', '/new-sale'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));

  if (isProtectedRoute && !user) {
    router.push('/login');
    return;
  }

  if (user && (pathname === '/welcome' || pathname === '/login')) {
    router.push('/');
  }
}, [pathname, user, router]);



  if (
    pathname === '/welcome' ||
    pathname === '/login' ||
    pathname === '/create-account' ||
    pathname === '/new-sale'
  ) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50  bg-[#222222] h-[60px] text-white">
      <div className="w-full flex h-16 items-center justify-between px-2 sm:px-4">
        {/* Alteração na linha abaixo: text-base md:text-xl e tamanhos do ícone */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 text-base md:text-xl font-bold text-[#6b9dff]">
          <Package className="h-5 w-5 md:h-6 md:w-6 shrink-0" />
          <span className="truncate">Smart Inventory</span>
        </Link>
        
        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }, index) => (
            <Link
              key={index}
              href={to}
              className={`flex items-center gap-1.5 rounded-lg px-2 sm:px-3 py-2 text-sm font-medium transition-colors
                ${pathname === to
                  ? 'border-b-2 border-[#6b9dff] text-[#7faeff]' // Cor para o link ativo
                  : 'text-white hover:border-b-2 border-[#6b9dff]'
                }
              ${to === '/new-sale' ?
                  'bg-[#6b9dff] hover:bg-[#6b9dff]/70' : ''}
                 ${to === '/new-sale' // seleciona componente que vai para new sale e verifica se o componente atual é o de inventory 
                  ? pathname.includes('/inventory')
                    ? 'bg-[#222222] text-white hover:bg-[#6b9dff]/70'
                    : 'bg-[#6b9dff] hover:bg-[#6b9dff]/70'
                  : ''}
                `}
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