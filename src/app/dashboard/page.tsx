'use client';

// ==================================================
// ARQUIVO: src/app/dashboard/page.tsx
// DESCRIÇÃO: Dashboard principal da aplicação. Exibe
// cards de resumo, gráficos (em desenvolvimento) e
// tabela de lotes. Consome os hooks useInventory e useAuth.
// ==================================================

import { useRouter } from 'next/navigation';
import { useInventory } from '@/hooks/useInventory';
import { useAuth } from '@/hooks/useAuth';
import { StatusBadge } from '@/components/StatusBadge';
import { Package, AlertTriangle, XCircle, DollarSign, LogOut } from 'lucide-react';
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
  const { findUserByEmail } = useAuth(); // será usado após implementar login real


  
  // Obter nome do usuário logado (mock enquanto não há autenticação real)
  const userName = 'Usuário'; // substituir por dados do usuário real

  // Função auxiliar para obter nome do produto pelo ID
  const getProductName = (productId: string) =>
    products.find(p => p.id === productId)?.name ?? 'Produto não encontrado';

  // Função auxiliar para obter SKU do produto
  const getProductSku = (productId: string) =>
    products.find(p => p.id === productId)?.sku ?? '—';

  const handleLogout = () => {
    // Implementar logout (limpar token, redirecionar)
    router.push('/login');
  };

if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="animate-pulse text-lg font-medium text-gray-500">Carregando dashboard...</p>
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Cabeçalho */}
        <header className="flex flex-col items-start justify-between gap-4 rounded-xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard de Risco</h1>
            <p className="text-sm text-gray-600">
              Bem-vindo(a), <span className="font-semibold text-primary">{userName}</span>
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

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-green-600 mb-2">
              <Package size={20} />
              <h3 className="text-sm font-medium text-gray-600">produtos Válidos</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{validBatches.length}</p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-yellow-600 mb-2">
              <AlertTriangle size={20} />
              <h3 className="text-sm font-medium text-gray-600">Em alerta</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{nearExpiryBatches.length}</p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <AlertTriangle size={20} />
              <h3 className="text-sm font-medium text-gray-600">Críticos</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {batches.filter(b => b.status === 'critical').length}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <XCircle size={20} />
              <h3 className="text-sm font-medium text-gray-600">Vencidos</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{expiredBatches.length}</p>
          </div>
        </div>

        {/* Card de Risco Financeiro */}
        <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-gray-700 mb-2">
              <DollarSign size={20} />
              <h3 className="text-sm font-medium text-gray-600">Risco Financeiro Total</h3>
            </div>
            <p className="text-sm text-gray-500">
              Valor de produtos em alerta, críticos ou vencidos.
            </p>
          </div>
          <p className="text-4xl font-bold text-gray-900">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(financialRisk)}
          </p>
        </div>

        {/* Tabela de produtos */}
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Listagem de produtos</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900">
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
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Nenhum lote cadastrado no momento.
                    </td>
                  </tr>
                ) : (
                  batches
                    .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
                    .map((batch) => (
                      <tr key={batch.id} className="transition-colors hover:bg-gray-50/50">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                          {getProductName(batch.productId)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                          {getProductSku(batch.productId)}
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

         {/*Gráfico em pizza */}
       {batches.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-xl border bg-white p-6 shadow-sm h-[400px] flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Proporção de Lotes</h2>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
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

            {/*Gráficos em barra */}
            <div className="rounded-xl border bg-white p-6 shadow-sm h-[400px] flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Estoque por Produto</h2>
               <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} angle={-45} textAnchor="end" height={60} />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36}/>
                    {[
                      { key: 'validos', name: 'Válidos' },
                      { key: 'alerta', name: 'Em Alerta' },
                      { key: 'vencidos', name: 'Vencidos/Críticos' }
                          ].map((item, index) => (
                    <Bar key={item.key} dataKey={item.key} name={item.name} stackId="a" fill={COLORS[index]} />
))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}