'use client';


import Link from 'next/link';


import { useRouter } from 'next/navigation';
import { ShieldCheck, Leaf, BarChart3 } from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import { useInventory } from '@/hooks/useInventory';

const features = [
  {
    icon: ShieldCheck, // icon: o componente do ícone (importado acima).
    title: 'Controle Preventivo',
    desc: 'Alertas automáticos antes do vencimento dos produtos.',
  },
  {
    icon: Leaf,
    title: 'Redução de Desperdício',
    desc: 'Lógica FEFO garante saída dos produtos mais próximos do vencimento.',
  },
  {
    icon: BarChart3,
    title: 'Visão Financeira',
    desc: 'Estimativa de risco financeiro por produto em perigo.',
  },
];


export default function Home() {
  const { products, batches, expiredBatches, nearExpiryBatches, validBatches, financialRisk, isLoading } = useInventory();
  const router = useRouter();
  return (


    <div className="container mx-auto px-4 w-screen h-calc(100vh - 60px) flex flex-col">
      <div className="mx-auto max-w-3xl text-center py-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gray-200 px-4 py-1.5 text-sm font-medium">
          <Leaf className="h-4 w-4" />
          Gestão Preventiva de Estoque
        </div>
        <h1 className="text-4xl font-bold">
          Smart Inventory
        </h1>
        <p className="mt-4 text-lg text-gray-600 md:text-xl">
          Plataforma IoT e Mobile para gestão preventiva de estoque com foco na
          <span className="font-semibold"> redução de desperdício de itens
          </span>.
        </p>
      </div>
            
            {/* Lista dos produtos comentados */}

      {/* <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
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
        </div> */}

      <div className="mx-auto flex space-between gap-6 flex-wrap justify-center items-center">
        {features.map((f, index) => (
          <div
            key={index}
            className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md
              sm:w-[300px] sm:h-[220px]
              md:w-[350px] md:h-[250px]">
            <div className="mb-3 inline-flex rounded-lg bg-gray-100 p-2.5">
              <f.icon className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );



}