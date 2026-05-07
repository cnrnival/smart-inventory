'use client';

import { useRouter } from 'next/navigation';
import { Package, AlertTriangle, XCircle, LogOut } from 'lucide-react';
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
  
  // ✅ Lógica para evitar erro de hidratação no Vercel (Gráficos Recharts)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    getProducts();
  }, [getProducts]);

  const userName = user?.name ?? 'Usuário'; 

  // Lógica FEFO de cálculo (Original sua)
  const totalItems = products.length;
  const expiredProducts = products.filter(p => new Date(p.expiryDate) < new Date());
  const warningProducts = products.filter(p => {
    const diff = new Date(p.expiryDate).getTime() - new Date().getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return days > 0 && days <= 30;
  });

  const pieData = [
    { name: 'Válidos', value: totalItems - expiredProducts.length - warningProducts.length },
    { name: 'Em alerta', value: warningProducts.length },
    { name: 'Vencidos', value: expiredProducts.length },
  ];

  // ✅ Proteção para renderizar apenas no cliente
  if (!isClient) return <div className="min-h-screen bg-[#262626]" />;

  return (
    <div className="min-h-screen p-4 md:p-8 text-white bg-[#262626]">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Cabeçalho Original Restaurado */}
        <header className="flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-700 bg-[#323232] p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#6b9dff]">Smart Inventory</h1>
            <p className="text-sm">Dashboard de Risco | Bem-vindo, <span className="font-semibold">{userName}</span></p>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/20 transition-colors">
            <LogOut size={16} /> Sair
          </button>
        </header>

        {/* Gráfico e Cards Laterais - Layout Original */}
        <div className='flex flex-col lg:flex-row gap-8 mb-8'>
          <div className="w-full lg:w-[600px] h-[400px] rounded-xl border border-gray-700 bg-[#323232] p-7">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Proporção de Validade</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {pieData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 grid grid-cols-1 gap-4">
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5">
              <Package className="mr-4 text-green-500" size={32} />
              <div><p className="text-sm text-gray-400">Total de Lotes</p><p className="text-2xl font-bold">{totalItems}</p></div>
            </div>
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5">
              <AlertTriangle className="mr-4 text-yellow-500" size={32} />
              <div><p className="text-sm text-gray-400">Em Alerta (30 dias)</p><p className="text-2xl font-bold">{warningProducts.length}</p></div>
            </div>
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5">
              <XCircle className="mr-4 text-red-500" size={32} />
              <div><p className="text-sm text-gray-400">Vencidos</p><p className="text-2xl font-bold">{expiredProducts.length}</p></div>
            </div>
          </div>
        </div>

        {/* Tabela de Produtos Próximos ao Vencimento - Layout Original Restaurado */}
        <div className="rounded-xl border border-gray-700 bg-[#323232] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-200">Itens Próximos ao Vencimento</h2>
            <Link href="/inventory" className="text-[#6b9dff] text-sm hover:underline">Ver Inventário Completo</Link>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[#262626] text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Validade</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {products.slice(0, 5).map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors text-sm text-gray-300">
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4">{new Date(product.expiryDate).toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-red-500/10 text-red-400 border border-red-500/20">
                      Monitorado
                    </span>
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