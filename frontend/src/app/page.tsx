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

  // Ordenação FEFO para a tabela
  const sortedProducts = [...products].sort((a, b) => 
    new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
  );

  const expiredCount = products.filter(p => new Date(p.expiryDate) < new Date()).length;
  const warningCount = products.filter(p => {
    const diff = new Date(p.expiryDate).getTime() - new Date().getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return days > 0 && days <= 30;
  }).length;

  const pieData = [
    { name: 'Válidos', value: products.length - expiredCount - warningCount },
    { name: 'Em alerta', value: warningCount },
    { name: 'Vencidos', value: expiredCount },
  ];

  if (!isClient) return <div className="min-h-screen bg-[#262626]" />;

  return (
    <div className="min-h-screen p-4 md:p-8 text-white bg-[#262626]">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Header Limpo para o Usuário */}
        <header className="flex flex-col items-center justify-between gap-4 rounded-xl border border-gray-700 bg-[#323232] p-6 sm:flex-row">
          <div>
            <h1 className="text-2xl font-bold text-[#6b9dff]">Smart Inventory</h1>
            <p className="text-sm text-gray-400 font-medium tracking-tight">Bem-vindo, <span className="text-white">{user?.name || 'Usuário'}</span></p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => router.push('/new-sale')} className="flex items-center gap-2 bg-[#6b9dff] px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90">
              <ShoppingCart size={18} /> Nova Venda
            </button>
            <button onClick={logout} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
              <LogOut size={22} />
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
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px' }} />
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
              <div><p className="text-sm text-gray-400">Em Alerta (30 dias)</p><p className="text-2xl font-bold">{warningCount}</p></div>
            </div>
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5">
              <XCircle className="mr-4 text-red-500" size={32} />
              <div><p className="text-sm text-gray-400">Vencidos</p><p className="text-2xl font-bold">{expiredCount}</p></div>
            </div>
          </div>
        </div>

        {/* Tabela FEFO Completa */}
        <div className="rounded-xl border border-gray-700 bg-[#323232] overflow-hidden">
          <div className="p-6 border-b border-gray-700 bg-[#323232]">
            <h2 className="text-xl font-bold text-gray-100">Controle de Inventário</h2>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[#262626] text-gray-400 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Vencimento</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedProducts.map((p) => {
                const isExp = new Date(p.expiryDate) < new Date();
                const days = (new Date(p.expiryDate).getTime() - new Date().getTime()) / (1000*60*60*24);
                return (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm">{p.name}</td>
                    <td className="px-6 py-4 text-sm">{new Date(p.expiryDate).toLocaleDateString('pt-BR')}</td>
                    <td className="px-6 py-4">
                      {isExp ? <span className="text-red-500 font-black">VENCIDO</span> : 
                       days <= 30 ? <span className="text-yellow-500 font-black">ALERTA</span> : 
                       <span className="text-green-500 font-bold">VÁLIDO</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}