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

  const {user} = useAuthContext();
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

  useEffect(()=>{
    if(!user){
    router.push('/login')
  }
  }, [])

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
      <div className="w-full flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[#6b9dff]">
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
                  ? 'border-b-2 border-[#6b9dff] text-[#7faeff]' // Cor para o link ativo
                  : 'text-white hover:border-b-2 border-[#6b9dff]'
                }
              ${to === '/new-sale' ?
                  'bg-[#6b9dff] hover:bg-[#6b9dff]/70' : ''}
                 ${to === '/new-sale' // seleciona componente que vai para new sale e verifica se o componente atual é o de inventory 
                  ? pathname === '/inventory'
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