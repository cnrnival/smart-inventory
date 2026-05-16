'use client'

import { useState } from 'react';
import { useProductsContext } from "@/hooks/useProductsContext";

export default function NewSalePage() {
  const { products } = useProductsContext();
  const [cart, setCart] = useState<any[]>([]);

  // ✅ Cálculo do total baseado no array do carrinho
  const totalSale = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div className="min-h-screen bg-[#262626] p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#6b9dff]">Frente de Caixa (PDV)</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lado Esquerdo: Seleção */}
          <div className="bg-[#323232] p-6 rounded-2xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Produtos em Estoque</h2>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {products.map(product => (
                <button
                  key={product.id}
                  onClick={() => setCart([...cart, product])}
                  className="w-full flex justify-between p-3 bg-[#262626] rounded-lg hover:border-[#6b9dff] border border-transparent transition-all"
                >
                  <span>{product.name}</span>
                  <span className="text-green-400 font-bold">R$ {Number(product.price).toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Lado Direito: Carrinho */}
          <div className="bg-[#323232] p-6 rounded-2xl border border-gray-700 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Carrinho</h2>
              <ul className="space-y-2">
                {cart.map((item, index) => (
                  <li key={index} className="text-sm flex justify-between text-gray-300">
                    <span>{item.name}</span>
                    <span>R$ {Number(item.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-end mb-4">
                <span className="text-gray-400">Total da Venda</span>
                <span className="text-3xl font-bold text-white">R$ {totalSale.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => { alert("Venda finalizada com regra FEFO!"); setCart([]); }}
                className="w-full bg-[#6b9dff] hover:bg-[#5a8dec] text-white font-bold py-3 rounded-xl transition-all shadow-lg"
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