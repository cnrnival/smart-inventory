'use client';


import Link from 'next/link';


import { useRouter } from 'next/navigation';
import { ShieldCheck, Leaf, BarChart3, Package, User } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { useInventory } from '@/hooks/useInventory';

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
      <div className=" w-screen md:h-[100vh] sm:min-h-screen flex flex-col bg-background text-white">





        <div className="sticky top-0 z-50  bg-secondary h-[60px]">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
              <Package className="h-6 w-6" />
              Smart Inventory
            </Link>
            <div className="flex items-center gap-1">
              <Link
              href={'/'}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                    bg-primary text-white
                    text-white hover:bg-primary/90">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Criar Conta/Entrar</span>
              </Link>
            </div>
          </div>
        </div>











        <div className="mx-auto text-center py-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-medium">
            <Leaf className="h-4 w-4" />
            Gestão Preventiva de Estoque
          </div>
          <h1 className="text-4xl font-bold">
            Smart Inventory
          </h1>
          <p className="mt-4 text-lg text-white/80 md:text-xl mb-10">
            Plataforma IoT e Mobile para gestão preventiva de estoque com foco na
            <span className="font-semibold"> redução de desperdício de itens
              </span>.
          </p>

            {/* <div className="sm:w-[400px] md:w-[950px] h-[250px] bg-third mx-auto rounded-xl flex flex-col mb-4">
              <div className='w-full h-[40px] bg-primary rounded-t-xl flex flex-row items-center justify-between px-4'>
                  <h2 className='text-md font-semibold text-center text-white/80'>Produtos próximos do vencimento</h2>
                  <Link href="/products" className="hover:text-blue-700">
                    Ver tudo
                  </Link>
              </div>
              <div className='w-full h-full flex flex-row overflow-x-auto flex-nowrap items-stretch gap-4 p-3 hide-scrollbar'>
                {products.map((product) => (
                  <div 
                  key={product.id} 
                  className="min-w-[200px] h-full p-4 bg-fourth
                  flex flex-col items-center justify-center rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <span className="text-lg font-bold text-red">Vence em um dia</span>
                 </div>
                ))}
              </div>
            </div> */}

          <div className="mx-auto flex space-between gap-6 flex-wrap justify-center items-center">
            {features.map((f, index) => (
            <div
              key={index}
              className="rounded-xl border border-secondary bg-third p-6 shadow-sm transition-shadow hover:shadow-md
              sm:w-[300px] sm:h-[220px]
              md:w-[300px] md:h-[200px]">
              <div className="mb-3 inline-flex rounded-lg bg-gray-100 p-2.5">
                <f.icon className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-white/80">{f.desc}</p>
            </div>
        ))}
      </div>
      </div>
    </div>
  );



}