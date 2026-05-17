'use client';

// ==================================================
// ARQUIVO: src/app/dashboard/page.tsx
// DESCRIÇÃO: Dashboard principal da aplicação. Exibe
// cards de resumo, gráficos e tabela de lotes. 
// Consome os hooks useInventory e useProductsContext.
// ==================================================

import { useRouter } from 'next/navigation';
import { Package, AlertTriangle, XCircle, DollarSign, LogOut, Check } from 'lucide-react';
import Link from 'next/link';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useProductsContext } from '@/hooks/useProductsContext';
import { use, useEffect } from 'react';
import { StatusBadge } from '@/components/StatusBadge';
import { useAuthContext } from '@/hooks/useAuthContext';

// Cores atualizadas para combinar com a paleta moderna do Tailwind (green-500, amber-500, red-500)
const COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

export default function DashboardPage() {

  const {user} = useAuthContext();
  const { products, getProducts, isLoading, expiredProducts, nearExpiryProducts, validProducts, financialRisk } = useProductsContext();
  const router = useRouter();
  const riskyProducts = [...expiredProducts, ...nearExpiryProducts];


  useEffect(() => {
    getProducts();
  }, []);

  // Função auxiliar para obter nome do produto pelo ID
  const getProductName = (productId: string) =>
    products.find(p => p.id === productId)?.name ?? 'Produto não encontrado';

  const handleLogout = () => {
    // Implementar logout (limpar token, redirecionar)
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-800 bg-slate-50">
        <p className="animate-pulse text-lg font-medium">Carregando dashboard...</p>
      </div>
    );
  }

  const pieData = [
    { name: 'Válidos', value: validProducts.length },
    { name: 'Em alerta', value: nearExpiryProducts.length },
    { name: 'Vencidos', value: expiredProducts.length },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans text-slate-800 bg-slate-50">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Cabeçalho */}
        <header className="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard de Risco</h1>
            <p className="text-sm text-slate-500 mt-1">
              Bem-vindo(a), <span className="font-semibold text-blue-600">{user?.name}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg bg-red-50 border border-red-100 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
          >
            <LogOut size={16} />
            Sair
          </button>
        </header>

        {/* Gráfico em pizza e Cards */}
        {/* Usamos lg:h-[450px] no container pai para ditar a altura exata de ambos os lados */}
        <div className='flex flex-col lg:flex-row gap-6 mb-8 lg:h-[450px]'>
          
          {/* Lado do Gráfico */}
          {products.length > 0 && (
            <div className="w-full lg:w-[600px] h-[450px] lg:h-full">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col h-full w-full">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Proporção de Produtos</h2>
                <div className='flex-1 min-h-0 w-full'>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => (percent && percent > 0 && name) ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                        outerRadius={110}
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value} lotes`, 'Quantidade']} 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Lado dos Cards de resumo */}
          <div className="w-full lg:flex-1 flex flex-col gap-4 h-full">
            
            {/* Card: Produtos Válidos */}
            <div className="flex-1 flex items-center rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Check size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-slate-500">Produtos Válidos</p>
                <p className="mt-1 text-3xl font-bold leading-none text-slate-800">{validProducts.length}</p>
              </div>
            </div>

            {/* Card: Em Alerta */}
            <div className="flex-1 flex items-center rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <AlertTriangle size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-slate-500">Em Alerta</p>
                <p className="mt-1 text-3xl font-bold leading-none text-slate-800">{nearExpiryProducts.length}</p>
              </div>
            </div>

            {/* Card: Críticos */}
            <div className="flex-1 flex items-center rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <AlertTriangle size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-slate-500">Críticos</p>
                <p className="mt-1 text-3xl font-bold leading-none text-slate-800">
                  {products.filter(b => b.status === 'critical').length}
                </p>
              </div>
            </div>

            {/* Card: Vencidos */}
            <div className="flex-1 flex items-center rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
              <div className="mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <XCircle size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-slate-500">Vencidos</p>
                <p className="mt-1 text-3xl font-bold leading-none text-slate-800">{expiredProducts.length}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Card de Risco Financeiro */}
      <div className="rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 mb-8 max-w-6xl mx-auto">
        <div>
          <div className="flex items-center gap-3 mb-2 w-full">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <DollarSign size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Risco Financeiro Total</h3>
          </div>
          <p className="text-sm text-slate-500">
            Valor de produtos em alerta, críticos ou vencidos.
          </p>
        </div>
        <p className="text-4xl font-bold text-slate-800">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(financialRisk)}
        </p>
      </div>

      {/* Tabela de Produtos */}
      <div className="rounded-xl border border-slate-200 shadow-sm overflow-hidden bg-white max-w-6xl mx-auto">
        <div className="border-b border-slate-100 px-6 py-5 flex justify-between flex-row items-center bg-white">
          <h2 className="text-lg font-bold text-slate-800">Produtos para se atentar</h2>
          <Link href="/inventory" className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
            Ver estoque
          </Link>
        </div>

        <div className="overflow-auto max-h-[500px] hide-scrollbar">
          <table className="w-full text-left text-sm">
            
            <thead className="border-b border-slate-200 sticky top-0 bg-slate-50 z-10">
              <tr>
                <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Produto</th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Validade</th>
                <th className="whitespace-nowrap px-6 py-4 text-right font-semibold text-slate-500 text-xs uppercase tracking-wider">Qtd</th>
                <th className="whitespace-nowrap px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {riskyProducts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-medium">
                    Nenhum lote com risco no momento. Tudo certo!
                  </td>
                </tr>
              ) : (
                riskyProducts
                  .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
                  .map((product) => (
                    <tr key={product.id} className="transition-colors duration-150 hover:bg-slate-50 group">
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-800">
                        {product.name || getProductName(product.id)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                        {product.expiryDate ? new Date(product.expiryDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-slate-700">
                        {product.quantity}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge status={product.status} />
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}