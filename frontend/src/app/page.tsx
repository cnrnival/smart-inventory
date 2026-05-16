'use client';

import { useRouter } from 'next/navigation';
import { Package, AlertTriangle, XCircle, LogOut, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useProductsContext } from '@/hooks/useProductsContext';
import { useAuthContext } from '@/hooks/useAuthContext'; 
import { useEffect, useState } from 'react';

const COLORS = ['#15bd53', '#eab308', '#ca1111'];

export default function DashboardPage() {
  const { products, getProducts } = useProductsContext();
  const { user, logout } = useAuthContext();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    getProducts();
  }, [getProducts]);

  // ✅ LÓGICA DE ORDENAÇÃO FEFO: Vencidos -> Alerta -> Longe de Vencer
  const sortedProducts = [...products].sort((a, b) => {
    return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
  });

  // Cálculos para os Cards e Gráfico
  const expiredProducts = products.filter(p => new Date(p.expiryDate) < new Date());
  const warningProducts = products.filter(p => {
    const diff = new Date(p.expiryDate).getTime() - new Date().getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return days > 0 && days <= 30;
  });

  const pieData = [
    { name: 'Válidos', value: products.length - expiredProducts.length - warningProducts.length },
    { name: 'Em alerta', value: warningProducts.length },
    { name: 'Vencidos', value: expiredProducts.length },
  ];

  if (!isClient) return <div className="min-h-screen bg-[#262626]" />;

  return (
    <div className="min-h-screen p-4 md:p-8 text-white bg-[#262626]">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Header Original */}
        <header className="flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-700 bg-[#323232] p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#6b9dff]">Smart Inventory</h1>
            <p className="text-sm text-gray-400">Bem-vindo, <span className="font-semibold text-white">{user?.name ?? 'Usuário'}</span></p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/new-sale" className="flex items-center gap-2 bg-[#6b9dff] px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
              <ShoppingCart size={16} /> Nova Venda
            </Link>
            <button onClick={logout} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Gráfico e Cards */}
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className="w-full lg:w-[600px] h-[400px] rounded-xl border border-gray-700 bg-[#323232] p-7">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Proporção de Validade</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {pieData.map((_, index) => <Cell key={index} fill={COLORS[index]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 grid grid-cols-1 gap-4">
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5">
              <Package className="mr-4 text-green-500" size={32} />
              <div><p className="text-sm text-gray-400">Total de Itens</p><p className="text-2xl font-bold">{products.length}</p></div>
            </div>
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5">
              <AlertTriangle className="mr-4 text-yellow-500" size={32} />
              <div><p className="text-sm text-gray-400">Em Alerta</p><p className="text-2xl font-bold">{warningProducts.length}</p></div>
            </div>
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5">
              <XCircle className="mr-4 text-red-500" size={32} />
              <div><p className="text-sm text-gray-400">Vencidos</p><p className="text-2xl font-bold">{expiredProducts.length}</p></div>
            </div>
          </div>
        </div>

        {/* ✅ TABELA DE INVENTÁRIO COMPLETA COM ORDENAÇÃO FEFO */}
        <div className="rounded-xl border border-gray-700 bg-[#323232] overflow-hidden shadow-xl">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-gray-200">Inventário de Produtos</h2>
            <p className="text-sm text-gray-400">Organizado por prioridade de vencimento</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#262626] text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Produto</th>
                  <th className="px-6 py-4 font-semibold">Data de Validade</th>
                  <th className="px-6 py-4 font-semibold">Status de Risco</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sortedProducts.map((product) => {
                  const isExpired = new Date(product.expiryDate) < new Date();
                  const diff = new Date(product.expiryDate).getTime() - new Date().getTime();
                  const days = diff / (1000 * 60 * 60 * 24);
                  const isWarning = days > 0 && days <= 30;

                  return (
                    <tr key={product.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-200">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {new Date(product.expiryDate).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4">
                        {isExpired ? (
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-500 border border-red-500/40">VENCIDO</span>
                        ) : isWarning ? (
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-yellow-500/20 text-yellow-500 border border-yellow-500/40">ALERTA</span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-500/20 text-green-500 border border-green-500/40">VÁLIDO</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}