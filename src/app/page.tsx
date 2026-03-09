<<<<<<< HEAD
import Link from 'next/link';
import { ShieldCheck, Leaf, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,//icon: o componente do ícone (importado acima).
    title: 'Controle Preventivo',
    desc: 'Alertas automáticos antes do vencimento dos produtos.',
  },
  {
    icon: Leaf,
    title: 'Redução de Desperdício',
    desc: 'Lógica FEFO garante saída dos lotes mais próximos do vencimento.',
  },
  {
    icon: BarChart3,
    title: 'Visão Financeira',
    desc: 'Estimativa de risco financeiro por lotes em perigo.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gray-200 px-4 py-1.5 text-sm font-medium">
            <Leaf className="h-4 w-4" />
            Gestão Preventiva de Estoque
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Smart Inventory
          </h1>
          <p className="mt-4 text-lg text-gray-600 md:text-xl">
            Plataforma IoT e Mobile para gestão preventiva de estoque com foco na
            <span className="font-semibold"> redução de desperdício de alimentos</span>.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/criar-conta"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Criar Conta Grátis
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg border bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            >
              Já tenho conta
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 inline-flex rounded-lg bg-gray-100 p-2.5">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
=======


export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-neutral-400">
      <h1 className="text-6xl">Smart Inventory</h1>
      <h2 className="text-blue-600">Eu sei centralizar uma div (isso não é uma)</h2>
    </div>  
>>>>>>> a24ad35890351794330b6b38a31e1d70fb7a7950
  );
}