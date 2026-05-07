'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useProductsContext } from '@/hooks/useProductsContext';

export default function SalesPage() {
  const router = useRouter();
  const { products } = useProductsContext();

  const handleFinalize = () => {
    // Redireciona para dashboard e finaliza sem alert()
    router.push('/'); 
  };

  return (
    <div className="min-h-screen bg-[#262626] p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex justify-between items-center border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-[#6b9dff]">Frente de Caixa</h1>
          <button onClick={() => router.push('/')} className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-red-500 hover:bg-red-500/20 transition-all font-bold">
            <LogOut size={18} /> Sair da Venda
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-700 bg-[#323232] p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Produtos em Estoque</h2>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {products.map(p => (
                <div key={p.id} className="flex justify-between rounded-lg bg-[#262626] p-4 border border-gray-700">
                  <span>{p.name}</span>
                  <span className="text-green-500 font-bold">R$ {p.price?.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-700 bg-[#323232] p-6 flex flex-col">
            <h2 className="mb-4 text-xl font-semibold">Carrinho</h2>
            <div className="flex-1 bg-[#262626] rounded-lg mb-6 border border-gray-700 border-dashed flex items-center justify-center">
              <span className="text-gray-600 italic">Venda em andamento</span>
            </div>
            <div className="pt-4 border-t border-gray-700">
              <p className="text-gray-400">Total: <span className="text-white text-3xl font-bold block">R$ 0.00</span></p>
              <button onClick={handleFinalize} className="w-full mt-6 rounded-lg bg-[#6b9dff] py-4 font-bold text-lg hover:opacity-90">Finalizar Venda</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}