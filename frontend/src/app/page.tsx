'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, AlertTriangle, XCircle, LogOut, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useProductsContext } from '@/hooks/useProductsContext';
import { useAuthContext } from '@/hooks/useAuthContext';

const COLORS = ['#15bd53', '#eab308', '#ca1111'];

export default function DashboardPage() {
  const { products, getProducts } = useProductsContext();
  const { user, logout } = useAuthContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    getProducts();
  }, [getProducts]);

  // Lógica de dados do gráfico baseada no estoque
  const expiredCount = products.filter(p => new Date(p.expiryDate) < new Date()).length;
  const warningCount = products.filter(p => {
    const diff = new Date(p.expiryDate).getTime() - new Date().getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return days > 0 && days <= 30;
  }).length;

  const data = [
    { name: 'Válidos', value: Math.max(0, products.length - expiredCount - warningCount) },
    { name: 'Em alerta', value: warningCount },
    { name: 'Vencidos', value: expiredCount },
  ];

  if (!isClient) return <div className="min-h-screen bg-[#262626]" />;

  return (
    <div className="min-h-screen p-4 md:p-8 text-white bg-[#262626]">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Cabeçalho */}
        <header className="flex flex-col items-center justify-between gap-4 rounded-xl border border-gray-700 bg-[#323232] p-6 shadow-sm sm:flex-row">
          <h1 className="text-2xl font-bold text-[#6b9dff]">Smart Inventory</h1>
          <div className="flex gap-4">
            <Link href="/new-sale" className="flex items-center gap-2 bg-[#6b9dff] px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90">
              <ShoppingCart size={16} /> Nova Venda
            </Link>
            <button onClick={logout} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <div className='flex flex-col lg:flex-row gap-8 mb-8'>
          <div className="w-full lg:w-[600px] h-[400px] rounded-xl border border-gray-700 bg-[#323232] p-7 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Proporção de Validade</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {data.map((_, index) => <Cell key={index} fill={COLORS[index]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '8px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Resumo em Cards */}
          <div className="flex-1 grid grid-cols-1 gap-4">
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5">
              <Package className="mr-4 text-green-500" size={32} />
              <div><p className="text-sm text-gray-400">Total de Lotes</p><p className="text-2xl font-bold">{products.length}</p></div>
            </div>
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5">
              <AlertTriangle className="mr-4 text-yellow-500" size={32} />
              <div><p className="text-sm text-gray-400">Em Alerta</p><p className="text-2xl font-bold">{warningCount}</p></div>
            </div>
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5">
              <XCircle className="mr-4 text-red-500" size={32} />
              <div><p className="text-sm text-gray-400">Vencidos</p><p className="text-2xl font-bold">{expiredCount}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}