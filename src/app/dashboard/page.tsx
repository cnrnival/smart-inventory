'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, AlertTriangle, XCircle, DollarSign, LogOut } from 'lucide-react';

import { Produto, Lote, calcularStatusLote, ProductStatus } from '@/types/inventory';

export default function DashboardPage() {
  const router = useRouter();
  
  
  const [userName, setUserName] = useState('new fmx');

  // Substituir states futuramente pela  chamada de API ou hook 
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [lotes, setLotes] = useState<Lote[]>([]);

  //deixei em comentario por motivos de n ter banco de dados pra login ainda
  
  // Verifica o Login
  // useEffect(() => {
  //   const session = localStorage.getItem('smart_inventory_session');
  //   if (!session) {
  //     router.push('/login');
  //   } else {
  //     setUserName(JSON.parse(session).name);
  //   }
  // }, [router]);

  const handleLogout = () => {
    // localStorage.removeItem('smart_inventory_session');
    router.push('/login');
  };


  // Processa os Lotes reais recalculando o status com a função importada
  const lotesProcessados = lotes.map(lote => {
    const produto = produtos.find(p => p.id === lote.produto_id);
    const statusReal = calcularStatusLote(lote.data_vencimento);
    
    return {
      ...lote,
      status: statusReal,
      nomeProduto: produto?.nome || 'Produto Desconhecido',
      custoTotal: (produto?.custo_unitario || 0) * lote.quantidade
    };
  });

  // Ordena do mais próximo a vencer para o mais distante
  lotesProcessados.sort((a, b) => new Date(a.data_vencimento).getTime() - new Date(b.data_vencimento).getTime());

  // Cálculos dos Cards
  const totalValidos = lotesProcessados.filter(l => l.status === 'válido').length;
  const totalAlerta = lotesProcessados.filter(l => l.status === 'alerta').length;
  const totalCriticos = lotesProcessados.filter(l => l.status === 'crítico').length;
  const totalVencidos = lotesProcessados.filter(l => l.status === 'vencido').length;

  const riscoFinanceiro = lotesProcessados
    .filter(l => l.status !== 'válido')
    .reduce((acc, curr) => acc + curr.custoTotal, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Cabeçalho */}
        <header className="flex flex-col items-start justify-between gap-4 rounded-xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard de Risco</h1>
            <p className="text-sm text-gray-600">
              Bem-vindo(a), <span className="font-semibold text-blue-600">{userName}</span>
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

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-green-600 mb-2">
              <Package size={20} />
              <h3 className="text-sm font-medium text-gray-600">Lotes Válidos</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalValidos}</p>
          </div>
          
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-yellow-600 mb-2">
              <AlertTriangle size={20} />
              <h3 className="text-sm font-medium text-gray-600">Alerta</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalAlerta}</p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-orange-500 mb-2">
              <AlertTriangle size={20} />
              <h3 className="text-sm font-medium text-gray-600">Críticos</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalCriticos}</p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-red-600 mb-2">
              <XCircle size={20} />
              <h3 className="text-sm font-medium text-gray-600">Vencidos</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalVencidos}</p>
          </div>
        </div>

        {/* Card de Risco Financeiro */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 text-gray-700 mb-2">
              <DollarSign size={20} />
              <h3 className="text-sm font-medium text-gray-600">Risco Financeiro Total</h3>
            </div>
            <p className="text-sm text-gray-500">Valor de produtos em alerta, críticos ou vencidos.</p>
          </div>
          <p className="text-4xl font-bold text-gray-900">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(riscoFinanceiro)}
          </p>
        </div>

        {/* Tabela de Lotes */}
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Listagem de Lotes</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900">
                <tr>
                  <th className="whitespace-nowrap px-6 py-4 font-medium">Produto</th>
                  <th className="whitespace-nowrap px-6 py-4 font-medium">Lote</th>
                  <th className="whitespace-nowrap px-6 py-4 font-medium">Qtd.</th>
                  <th className="whitespace-nowrap px-6 py-4 font-medium">Validade</th>
                  <th className="whitespace-nowrap px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {lotesProcessados.length > 0 ? (
                  lotesProcessados.map((lote) => (
                    <tr key={lote.id} className="transition-colors hover:bg-gray-50/50">
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                        {lote.nomeProduto}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{lote.lote}</td>
                      <td className="whitespace-nowrap px-6 py-4">{lote.quantidade}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {new Date(lote.data_vencimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {}
                        <ProductStatus status={lote.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      Nenhum lote cadastrado no momento.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}