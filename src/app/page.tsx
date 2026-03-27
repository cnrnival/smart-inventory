'use client';


import Link from 'next/link';


import { useRouter } from 'next/navigation';
import { ShieldCheck, Leaf, BarChart3 } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { useInventory } from '@/hooks/useInventory';
import { useState } from 'react';

const features = [
  {
    icon: ShieldCheck, // icon: o componente do ícone (importado acima).
    title: 'Controle Preventivo',
    desc: 'Alertas automáticos antes do vencimento dos produtos.',
  },
  {
    icon: Leaf,
    title: 'Redução de Desperdício',
    desc: 'Lógica FEFO garante saída dos produtos mais próximos do vencimento.',
  },
  {
    icon: BarChart3,
    title: 'Visão Financeira',
    desc: 'Estimativa de risco financeiro por produtos em perigo.',
  },
];

export default function Home() {
  
  const products = [
     { id: 1, name: 'Produto 1', expiryDate: '2026-03-26' },
     { id: 2, name: 'Produto 2', expiryDate: '2023-03-26' },
     { id: 3, name: 'Produto 3', expiryDate: '2023-03-26' },
     { id: 4, name: 'Produto 4', expiryDate: '2023-03-26' },
     { id: 5, name: 'Produto 5', expiryDate: '2023-03-26' },
     { id: 6, name: 'Produto 6', expiryDate: '2023-03-26' },
     { id: 7, name: 'Produto 7', expiryDate: '2023-03-26' },
     { id: 8, name: 'Produto 8', expiryDate: '2023-03-26' },
     { id: 9, name: 'Produto 9', expiryDate: '2023-03-26' }
    ];

  return (
    <div className="w-full md:h-[calc(100vh-60px)] sm:min-h-screen flex flex-col text-white bg-[#262626]">
      
      <div className="container w-full flex justify-center py-10 mx-auto">

  <div className="w-full bg-third rounded-xl flex flex-col mb-4 bg-[#323232]">

    <div className="w-full h-[40px] bg-primary rounded-t-xl flex items-center justify-between px-4 bg-[#6b9dff]">
      <h2 className="text-md font-semibold text-white/80">
        Produtos próximos do vencimento
      </h2>

      <Link href="/products">Ver tudo</Link>
    </div>

    <div className="w-full flex overflow-x-auto gap-4 p-3 hide-scrollbar">
      
      {products.map((product) => (
        <div
          key={product.id}
          className="w-[300px] h-[200px] flex-shrink-0 p-4 bg-fourth
          flex flex-col items-center justify-center rounded-lg shadow-md bg-[#424242]">
          <h3>{product.name}</h3>
          <span className="text-red-400">Vence em um dia</span>
        </div>
      ))}

    </div>
  </div>

</div>      

    </div>
  );
}