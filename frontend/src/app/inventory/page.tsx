'use client';

import { useState, useEffect } from 'react';
import { Package, Plus, Search, Filter } from 'lucide-react';
import { useProductsContext } from '@/hooks/useProductsContext';
import { ProductForm } from '@/components/productform';

export default function InventoryPage() {
  const { products, getProducts } = useProductsContext();
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const toggleProductForm = () => {
    setIsProductFormOpen(!isProductFormOpen);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#262626] p-4 md:p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Package className="text-[#6b9dff]" />
              Estoque Completo
            </h1>
            <p className="text-sm text-gray-400">Gerenciamento por ordem de vencimento (FEFO)</p>
          </div>

          <button
            onClick={toggleProductForm}
            className="flex items-center gap-2 bg-[#6b9dff] hover:bg-[#5a8dec] px-4 py-2 rounded-lg font-bold transition-all"
          >
            <Plus size={20} />
            {isProductFormOpen ? "Fechar" : "Novo Produto"}
          </button>
        </header>

        {/* Exibição do Formulário */}
        {isProductFormOpen && (
          <div className="flex justify-center animate-in fade-in slide-in-from-top-4">
            <ProductForm showProductForm={toggleProductForm} />
          </div>
        )}

        {/* Filtros e Busca */}
        <div className="flex gap-4 bg-[#323232] p-4 rounded-xl border border-gray-700">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Buscar produto..."
              className="w-full bg-[#262626] border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:border-[#6b9dff]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 bg-[#262626] border border-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-700">
            <Filter size={18} />
            Filtros
          </button>
        </div>

        {/* Tabela de Produtos */}
        <div className="rounded-xl border border-gray-700 bg-[#323232] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#222222] text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4 text-center">Qtd.</th>
                <th className="px-6 py-4">Validade</th>
                <th className="px-6 py-4">Preço</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{product.category || 'Geral'}</td>
                  <td className="px-6 py-4 text-center">{product.quantity}</td>
                  <td className="px-6 py-4">
                    {new Date(product.expiryDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}