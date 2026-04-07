'use client';

// ==================================================
// ARQUIVO: src/app/dashboard/page.tsx
// DESCRIÇÃO: Dashboard principal da aplicação. Exibe
// cards de resumo, gráficos e tabela de lotes. 
// Consome os hooks useInventory e useProductsContext.
// ==================================================

import { useRouter } from 'next/navigation';
import { useInventory } from '@/hooks/useInventory';
import { Package, AlertTriangle, XCircle, DollarSign, LogOut } from 'lucide-react';
import Link from 'next/link';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useProductsContext } from '@/hooks/useProductsContext';
import { useEffect } from 'react';

// Constante de cores para o gráfico de pizza
const COLORS = ['#15bd53', '#eab308', '#ca1111'];

export default function DashboardPage() {
  const { products, getProducts } = useProductsContext();
  const router = useRouter();
  const { batches, expiredBatches, nearExpiryBatches, validBatches, financialRisk, isLoading } = useInventory();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Obter nome do usuário logado (mock enquanto não há autenticação real)
  const userName = 'Usuário'; 

  // Função auxiliar para obter nome do produto pelo ID
  const getProductName = (productId: string) =>
    products.find(p => p.id === productId)?.name ?? 'Produto não encontrado';

  const handleLogout = () => {
    // Implementar logout (limpar token, redirecionar)
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#262626] text-white">
        <p className="animate-pulse text-lg font-medium">Carregando dashboard...</p>
      </div>
    );
  }

  const pieData = [
    { name: 'Válidos', value: validBatches.length },
    { name: 'Em alerta', value: nearExpiryBatches.length },
    { name: 'Vencidos', value: expiredBatches.length },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 text-white bg-[#262626]">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Cabeçalho */}
        <header className="flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-700 bg-[#323232] p-6 shadow-sm sm:flex-row sm:items-center">
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

        {/* Gráfico em pizza e Cards */}
        {/* Usamos lg:h-[450px] no container pai para ditar a altura exata de ambos os lados */}
        <div className='flex flex-col lg:flex-row gap-8 mb-8 lg:h-[450px]'>
          
          {/* Lado do Gráfico */}
          {batches.length > 0 && (
            <div className="w-full lg:w-[600px] h-[450px] lg:h-full">
              <div className="rounded-xl border border-gray-700 bg-[#323232] p-7 shadow-sm flex flex-col h-full w-full">
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

          {/* Lado dos Cards de resumo */}
          {/* h-full puxa a altura exata definida no pai (450px) e gap-4 separa os filhos */}
          <div className="w-full lg:flex-1 flex flex-col gap-4 h-full">
            
            {/* Adicionado flex-1 em cada card para preencherem a altura total por igual */}
            {/* Card: Produtos Válidos */}
            <div className="flex-1 flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5 shadow-sm">
              <div className="mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-green-600/20 text-green-500">
                <Package size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-400">Produtos Válidos</p>
                <p className="mt-1 text-3xl font-bold leading-none text-white">{validBatches.length}</p>
              </div>
            </div>

            {/* Card: Em Alerta */}
            <div className="flex-1 flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5 shadow-sm">
              <div className="mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-500/20 text-yellow-500">
                <AlertTriangle size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-400">Em Alerta</p>
                <p className="mt-1 text-3xl font-bold leading-none text-white">{nearExpiryBatches.length}</p>
              </div>
            </div>

            {/* Card: Críticos */}
            <div className="flex-1 flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5 shadow-sm">
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
            <div className="flex-1 flex items-center rounded-xl border border-gray-700 bg-[#323232] p-5 shadow-sm">
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
      <div className="rounded-xl border border-gray-700 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#323232] p-6 mb-8 max-w-6xl mx-auto">
        <div>
          <div className="flex items-center gap-3 mb-2 w-full">
            <DollarSign size={20} />
            <h3 className="text-sm font-medium ">Risco Financeiro Total</h3>
          </div>
          <p className="text-sm text-gray-400">
            Valor de produtos em alerta, críticos ou vencidos.
          </p>
        </div>
        <p className="text-4xl font-bold text-white">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(financialRisk)}
        </p>
      </div>

      {/* Tabela de Produtos */}
      <div className="rounded-xl border border-gray-700 shadow-sm overflow-hidden bg-[#323232] max-w-6xl mx-auto">
        <div className="border-b border-gray-700 px-6 py-4 flex justify-between flex-row items-center">
          <h2 className="text-lg font-semibold">Produtos para se atentar</h2>
          <Link href="/inventory" className="flex items-center gap-2 text-sm font-bold text-[#6b9dff] hover:underline">
            Ver estoque
          </Link>
        </div>

        <div className="overflow-auto max-h-[500px] hide-scrollbar">
          <table className="w-full text-left text-sm">
            
            {/* Adicione sticky top-0 e o bg-color aqui para o cabeçalho fixar no topo */}
            <thead className="border-b border-gray-700 sticky top-0 bg-[#323232] z-10">
              <tr>
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-300">Produto</th>
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-300">Validade</th>
                <th className="whitespace-nowrap px-6 py-4 text-right font-medium text-gray-300">Qtd</th>
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-300">Status</th>
              </tr>
            </thead>

            {/* Remova o overflow-y-auto e o max-h-[300px] daqui */}
            <tbody className="divide-y divide-gray-700 bg-[#323232]">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                    Nenhum lote cadastrado no momento.
                  </td>
                </tr>
              ) : (
                products
                  .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
                  .map((product) => (
                    <tr key={product.id} className="transition-colors hover:bg-[#424242]">
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-white">
                        {product.name || getProductName(product.id)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-gray-300">
                        {product.expiryDate ? new Date(product.expiryDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-gray-300">
                        <span>10</span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="inline-flex items-center gap-2 px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                          Em Alerta
                        </span>
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