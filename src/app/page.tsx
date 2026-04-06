'use client';

// ==================================================
// ARQUIVO: src/app/dashboard/page.tsx
// DESCRIÇÃO: Dashboard principal da aplicação. Exibe
// cards de resumo, gráficos (em desenvolvimento) e
// tabela de lotes. Consome os hooks useInventory e useAuth.
// ==================================================

import { useRouter } from 'next/navigation';
import { useInventory } from '@/hooks/useInventory';
import { useTestAuth } from '@/hooks/test_auth';
import { StatusBadge } from '@/components/StatusBadge';
import { Package, AlertTriangle, XCircle, DollarSign, LogOut } from 'lucide-react';
import Link from 'next/link';
// Placeholder para gráficos (serão implementados pela Pessoa B)
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

// Constante de cores para o gráfico de pizza
const COLORS = ['#15bd53', '#eab308', '#ca1111'];

export default function DashboardPage() {
  const router = useRouter();
  const { products, batches, expiredBatches, nearExpiryBatches, validBatches, financialRisk, isLoading } = useInventory();
  // const { findUserByEmail } = useTestAuth(); // será usado após implementar login real



  // Obter nome do usuário logado (mock enquanto não há autenticação real)
  const userName = 'Usuário'; // substituir por dados do usuário real

  // Função auxiliar para obter nome do produto pelo ID
  const getProductName = (productId: string) =>
    products.find(p => p.id === productId)?.name ?? 'Produto não encontrado';


  const handleLogout = () => {
    // Implementar logout (limpar token, redirecionar)
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-white bg-[#262626]">
        <p className="animate-pulse text-lg font-medium">Carregando dashboard...</p>
      </div>
    );
  }

  const pieData = [
    { name: 'Válidos', value: validBatches.length },
    { name: 'Em alerta', value: nearExpiryBatches.length },
    { name: 'Vencidos', value: expiredBatches.length },
  ];

  const barData = products.map(product => {
    const productBatches = batches.filter(b => b.productId === product.id);
    return {
      name: product.name,
      validos: productBatches.filter(b => b.status === 'valid').reduce((acc, b) => acc + b.quantity, 0),
      alerta: productBatches.filter(b => b.status === 'alert').reduce((acc, b) => acc + b.quantity, 0),
      vencidos: productBatches.filter(b => b.status === 'expired' || b.status === 'critical').reduce((acc, b) => acc + b.quantity, 0),
    };
  }).filter(data => data.validos > 0 || data.alerta > 0 || data.vencidos > 0);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 text-white bg-[#262626]">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Cabeçalho */}
        <header className="flex flex-col items-start justify-between gap-4 rounded-xl border bg-third p-6 shadow-sm sm:flex-row sm:items-center bg-[#323232]">
          <div>
            <h1 className="text-2xl font-bold">Dashboard de Risco</h1>
            <p className="text-sm">
              Bem-vindo(a), <span className="font-semibold text-[#6b9dff]">{userName}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
          >
            <LogOut size={16} />
            Sair
          </button>
        </header>
        {/*Gráfico em pizza */}
        <div className='flex flex-row justify-between h-[500px] gap-8 mb-8'>
          {batches.length > 0 && (
            <div className="grid grid-cols-1 w-[600px] lg:grid-cols-2 gap-8">
              <div className="rounded-xl border bg-third p-7 shadow-sm h-[450px] flex flex-col bg-[#323232] w-[600px] h-full ">
                <h2 className="text-lg font-semibold mb-4">Proporção de Produtos</h2>
                <div className='flex-1 min-h-0 w-full'>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie

                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => (percent && percent > 0 && name) ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} lotes`, 'Quantidade']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Cards de resumo */}
          <div className="w-full lg:w-7/12 flex flex-col gap-4 flex-1 py-8">
            {/* Card: Produtos Válidos */}
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5 shadow-sm">
              <div className="mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-green-600/20 text-green-500">
                <Package size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-400">Produtos Válidos</p>
                <p className="mt-1 text-3xl font-bold leading-none text-white">{validBatches.length}</p>
              </div>
            </div>

            {/* Card: Em Alerta */}
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5 shadow-sm">
              <div className="mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-500/20 text-yellow-500">
                <AlertTriangle size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-400">Em Alerta</p>
                <p className="mt-1 text-3xl font-bold leading-none text-white">{nearExpiryBatches.length}</p>
              </div>
            </div>

            {/* Card: Críticos */}
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5 shadow-sm">
              <div className="mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gray-600/50 text-gray-300">
                <AlertTriangle size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-400">Críticos</p>
                <p className="mt-1 text-3xl font-bold leading-none text-white">
                  {batches.filter(b => b.status === 'critical').length}
                </p>
              </div>
            </div>

            {/* Card: Vencidos */}
            <div className="flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5 shadow-sm">
              <div className="mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-red-600/20 text-red-500">
                <XCircle size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-400">Vencidos</p>
                <p className="mt-1 text-3xl font-bold leading-none text-white">{expiredBatches.length}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Card de Risco Financeiro */}

      <div className="rounded-xl border bg-third p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#323232] mb-8 w-[1150px] mx-auto">
        <div>
          <div className="flex items-center gap-3 mb-2 w-full">
            <DollarSign size={20} />
            <h3 className="text-sm font-medium ">Risco Financeiro Total</h3>
          </div>
          <p className="text-sm ">
            Valor de produtos em alerta, críticos ou vencidos.
          </p>
        </div>
        <p className="text-4xl font-bold">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(financialRisk)}
        </p>
      </div>

      {/* Tabela de lotes */}
      <div className="rounded-xl border bg-third shadow-sm overflow-hidden bg-[#323232] w-[1150px] mx-auto">
        <div className="border-b px-6 py-4 flex justify-between flex-row">
          <h2 className="text-lg font-semibold">Produtos para se atentar</h2>
          <Link href="/inventory" className="flex items-center gap-2 text-xl font-bold text-primary text-[#6b9dff]">
           Ver estoque
          </Link>

        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="whitespace-nowrap px-6 py-4 font-medium">Produto</th>
                <th className="whitespace-nowrap px-6 py-4 font-medium">SKU</th>
                <th className="whitespace-nowrap px-6 py-4 font-medium">Lote</th>
                <th className="whitespace-nowrap px-6 py-4 font-medium">Validade</th>
                <th className="whitespace-nowrap px-6 py-4 text-right font-medium">Qtd</th>
                <th className="whitespace-nowrap px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {batches.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center ">
                    Nenhum lote cadastrado no momento.
                  </td>
                </tr>
              ) : (
                batches
                  .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
                  .map((batch) => (
                    <tr key={batch.id} className="transition-colors hover:bg-background hover:bg-[][#424242]">
                      <td className="whitespace-nowrap px-6 py-4 font-medium ">
                        {getProductName(batch.productId)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{batch.batchCode}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {new Date(batch.expiryDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right font-medium">{batch.quantity}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <StatusBadge status={batch.status} />
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div >

  );
}