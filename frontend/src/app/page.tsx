'use client';

import { useRouter } from 'next/navigation';
// ✅ CORREÇÃO: Removido o import inexistente de useInventory que quebrava o Vercel
import { Package, AlertTriangle, XCircle, DollarSign, LogOut } from 'lucide-react';
import Link from 'next/link';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useProductsContext } from '@/hooks/useProductsContext';
import { useAuthContext } from '@/hooks/useAuthContext'; // ✅ Usando o hook padrão
import { useEffect } from 'react';

const COLORS = ['#15bd53', '#eab308', '#ca1111'];

export default function DashboardPage() {
  // ✅ Puxamos produtos e a função de busca do contexto correto
  const { products, getProducts } = useProductsContext();
  const { user, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    getProducts();
  }, []);

  const userName = user?.name ?? 'Usuário'; 

  // Lógica de cálculo da Dashboard (Substituindo o antigo useInventory)
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

  return (
    <div className="min-h-screen p-4 md:p-8 text-white bg-[#262626]">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-700 bg-[#323232] p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#6b9dff]">Smart Inventory</h1>
            <p className="text-sm">
              Dashboard de Risco | Bem-vindo(a), <span className="font-semibold">{userName}</span>
            </p>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/20"
          >
            <LogOut size={16} />
            Sair
          </button>
        </header>

        {/* Gráfico e Cards */}
        <div className='flex flex-col lg:flex-row gap-8 mb-8'>
          <div className="w-full lg:w-[600px] h-[400px] rounded-xl border border-gray-700 bg-[#323232] p-7">
            <h2 className="text-lg font-semibold mb-4">Proporção de Validade (FEFO)</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%" cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 grid grid-cols-1 gap-4">
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5">
              <Package className="mr-4 text-green-500" size={32} />
              <div>
                <p className="text-sm text-gray-400">Total de Lotes</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
            </div>
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5">
              <AlertTriangle className="mr-4 text-yellow-500" size={32} />
              <div>
                <p className="text-sm text-gray-400">Em Alerta (30 dias)</p>
                <p className="text-2xl font-bold">{warningProducts.length}</p>
              </div>
            </div>
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5">
              <XCircle className="mr-4 text-red-500" size={32} />
              <div>
                <p className="text-sm text-gray-400">Vencidos</p>
                <p className="text-2xl font-bold">{expiredProducts.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Produtos */}
        <div className="rounded-xl border border-gray-700 bg-[#323232] overflow-hidden">
          <div className="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Itens Próximos ao Vencimento</h2>
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
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{new Date(product.expiryDate).toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-500 border border-red-500/50">
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