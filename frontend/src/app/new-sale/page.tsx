'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, ShoppingCart, Package } from 'lucide-react';
import { useProductsContext } from '@/hooks/useProductsContext';

export default function SalesPage() {
  const router = useRouter();
  const { products, getProducts } = useProductsContext();
  const [cart, setCart] = useState<any[]>([]);

  // Carrega os produtos da API ao montar a tela
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Lógica de Finalizar Venda: Redireciona direto sem alert/pop-up
  const handleFinalizeSale = () => {
    // Redirecionamento automático para a Dashboard após a ação
    router.push('/'); 
  };

  return (
    <div className="min-h-screen bg-[#262626] p-8 text-white">
      <div className="mx-auto max-w-6xl">
        
        {/* Cabeçalho com o novo botão de Sair */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#6b9dff]">Frente de Caixa</h1>
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/20 transition-all"
          >
            <LogOut size={18} />
            Sair da Venda
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Listagem de Produtos em Estoque */}
          <div className="rounded-xl border border-gray-700 bg-[#323232] p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-200">Produtos em Estoque</h2>
            <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2 scrollbar-hide">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between rounded-lg bg-[#262626] p-4 border border-gray-700">
                  <span className="font-medium">{product.name}</span>
                  <span className="font-bold text-green-500">R$ {product.price?.toFixed(2) || '0.00'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Carrinho de Compras */}
          <div className="rounded-xl border border-gray-700 bg-[#323232] p-6 shadow-sm flex flex-col">
            <h2 className="mb-4 text-xl font-semibold text-gray-200">Carrinho</h2>
            <div className="flex-1 min-h-[300px] rounded-lg bg-[#262626] border border-gray-700 p-4 mb-6">
              {cart.length === 0 && (
                <p className="text-center text-gray-500 mt-10 italic">Carrinho vazio</p>
              )}
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-700">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-400">Total da Venda</span>
                <span className="text-3xl font-bold text-white">R$ 0.00</span>
              </div>
              <button 
                onClick={handleFinalizeSale}
                className="w-full rounded-lg bg-[#6b9dff] py-4 text-lg font-bold text-white hover:opacity-90 transition-opacity shadow-lg"
              >
                Finalizar Venda
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}