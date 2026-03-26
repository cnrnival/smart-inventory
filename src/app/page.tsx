import Link from 'next/link';
import { ShieldCheck, Leaf, BarChart3 } from 'lucide-react';

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
    desc: 'Estimativa de risco financeiro por produtos em perigo.',
  },
];

export default function Home() {
  return (
      <div className="px-4 w-screen min-h-[calc(100vh-60px)] flex flex-col bg-background text-white">
        <div className="mx-auto max-w-3xl h-[250px] text-center py-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-medium">
            <Leaf className="h-4 w-4" />
            Gestão Preventiva de Estoque
          </div>
          <h1 className="text-4xl font-bold">
            Smart Inventory
          </h1>
          <p className="mt-4 text-lg text-white/80 md:text-xl">
            Plataforma IoT e Mobile para gestão preventiva de estoque com foco na
            <span className="font-semibold"> redução de desperdício de itens
              </span>.
          </p>
        </div>

        <div className="mx-auto flex space-between gap-6 flex-wrap justify-center items-center">
          {features.map((f, index) => (
            <div
              key={index}
              className="rounded-xl border border-secondary bg-third p-6 shadow-sm transition-shadow hover:shadow-md
              sm:w-[300px] sm:h-[220px]
              md:w-[350px] md:h-[250px]">
              <div className="mb-3 inline-flex rounded-lg bg-gray-100 p-2.5">
                <f.icon className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-white/80 ">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
  );
}