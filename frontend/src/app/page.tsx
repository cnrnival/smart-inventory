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

// Constante de cores para o gráfico de pizza
const COLORS = ['#15bd53', '#eab308', '#ca1111'];

export default function DashboardPage() {

  const {user} = useAuthContext();
  const { products, getProducts, isLoading, expiredProducts, nearExpiryProducts, validProducts, financialRisk } = useProductsContext();
  const router = useRouter();
  const riskyProducts = [...expiredProducts, ...nearExpiryProducts];


  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Obter nome do usuário logado (mock enquanto não há autenticação real)
  // s
  // Função auxiliar para obter nome do produto pelo ID
  const getProductName = (productId: string) =>
    products.find(p => p.id === productId)?.name ?? 'Produto não encontrado';

45const handleLogout = () => {
46     auth?.logoff();
47     router.push('/login');
48   };

  

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-black">
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
    <div className="min-h-screen p-4 md:p-8 text-black bg-[#E8E9E8]">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Cabeçalho */}
        <header className="flex flex-col items-start justify-between gap-4 rounded-xl  shadow-md shadow-black/70 bg-[#c9c9c9] p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard de Risco</h1>
            <p className="text-sm">
              Bem-vindo(a), <span className="font-semibold text-[#6b9dff]">{user?.name}</span>
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
          {products.length > 0 && (
            <div className="w-full lg:w-[600px] h-[450px] lg:h-full">
              <div className="rounded-xl shadow-md shadow-black/70 bg-[#c9c9c9] p-7 shadow-sm flex flex-col h-full w-full">
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
            <div className="flex-1 flex items-center rounded-xl  shadow-md shadow-black/70 bg-[#c9c9c9] p-5 shadow-sm">
              <div className="mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-green-600/20 text-green-500">
                <Check size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-black/50">Produtos Válidos</p>
                <p className="mt-1 text-3xl font-bold leading-none text-black">{validProducts.length}</p>
              </div>
            </div>

            {/* Card: Em Alerta */}
            <div className="flex-1 flex items-center rounded-xl  shadow-md shadow-black/70 bg-[#c9c9c9] p-5 shadow-sm">
              <div className="mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-500/20 text-yellow-500">
                <AlertTriangle size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-black/50">Em Alerta</p>
                <p className="mt-1 text-3xl font-bold leading-none text-black">{nearExpiryProducts.length}</p>
              </div>
            </div>

            {/* Card: Críticos */}
            <div className="flex-1 flex items-center rounded-xl  shadow-md shadow-black/70 bg-[#c9c9c9] p-5 shadow-sm">
              <div className="mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gray-600/50 text-black">
                <AlertTriangle size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-black/50">Críticos</p>
                <p className="mt-1 text-3xl font-bold leading-none text-black">
                  {products.filter(b => b.status === 'critical').length}
                </p>
              </div>
            </div>

            {/* Card: Vencidos */}
            <div className="flex-1 flex items-center rounded-xl  shadow-md shadow-black/70 bg-[#c9c9c9] p-5 shadow-sm">
              <div className="mr-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-red-600/20 text-red-500">
                <XCircle size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium text-black/50">Vencidos</p>
                <p className="mt-1 text-3xl font-bold leading-none text-black">{expiredProducts.length}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Card de Risco Financeiro */}
      <div className="rounded-xl  shadow-md shadow-black/70 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#c9c9c9] p-6 mb-8 max-w-6xl mx-auto">
        <div>
          <div className="flex items-center gap-3 mb-2 w-full">
            <DollarSign size={20} />
            <h3 className="text-sm font-medium ">Risco Financeiro Total</h3>
          </div>
          <p className="text-sm text-black/50">
            Valor de produtos em alerta, críticos ou vencidos.
          </p>
        </div>
        <p className="text-4xl font-bold text-black">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(financialRisk)}
        </p>
      </div>

      {/* Tabela de Produtos */}
      <div className="rounded-xl  shadow-md shadow-black/70 shadow-sm overflow-hidden bg-[#c9c9c9] max-w-6xl mx-auto">
        <div className="border-b border-black/50 px-6 py-4 flex justify-between flex-row items-center">
          <h2 className="text-lg font-semibold">Produtos para se atentar</h2>
          <Link href="/inventory" className="flex items-center gap-2 text-sm font-bold text-[#6b9dff] hover:underline">
            Ver estoque
          </Link>
        </div>

        <div className="overflow-auto max-h-[500px] hide-scrollbar">
          <table className="w-full text-left text-sm">
            
            {/* Adicione sticky top-0 e o bg-color aqui para o cabeçalho fixar no topo */}
            <thead className="border-b border-black/50 sticky top-0 bg-[#c9c9c9] z-10">
              <tr>
                <th className="whitespace-nowrap px-6 py-4 font-medium text-black">Produto</th>
                <th className="whitespace-nowrap px-6 py-4 font-medium text-black">Validade</th>
                <th className="whitespace-nowrap px-6 py-4 text-right font-medium ttext-black">Qtd</th>
                <th className="whitespace-nowrap px-6 py-4 font-medium ttext-black">Status</th>
              </tr>
            </thead>

            {/* Remova o overflow-y-auto e o max-h-[300px] daqui */}
            <tbody className="divide-y divide-black/50 bg-[#c9c9c9]">
              {riskyProducts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-black/50">
                    Nenhum lote cadastrado no momento.
                  </td>
                </tr>
              ) : (
                riskyProducts
                  .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
                  .map((product) => (
                    <tr key={product.id} className="transition-colors hover:bg-[#b1b1b1]">
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-black">
                        {product.name || getProductName(product.id)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-black">
                        {product.expiryDate ? new Date(product.expiryDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-'}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-black">
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