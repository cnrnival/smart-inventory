'use client';

import Link from 'next/link';
import { 
  ShieldCheck, Leaf, BarChart3, ScanLine, AlertTriangle, Tags, 
  Ban, TrendingDown, Clock, Globe, ArrowRight, Users, Database, 
  Cpu, XCircle, CheckCircle, PieChart 
} from 'lucide-react';
import { FakeNavBar } from '@/components/FakeNavBar';

const features = [
  { icon: Ban, title: 'Bloqueio de Venda Vencida', desc: 'Segurança automatizada que impede a venda de produtos que já passaram da data de validade.' },
  { icon: Leaf, title: 'Método FEFO Integrado', desc: 'Garante a saída prioritária dos produtos mais próximos do vencimento (First Expired, First Out).' },
  { icon: BarChart3, title: 'Dashboard de Risco Financeiro', desc: 'Cálculo exato do capital imobilizado em risco, multiplicando a quantidade em estoque pelo custo unitário.' },
  { icon: ScanLine, title: 'Leitura Ágil via Câmera', desc: 'Cadastro com preenchimento automático do SKU em menos de 2 segundos utilizando a câmera do dispositivo.' },
  { icon: AlertTriangle, title: 'Alertas Cromáticos', desc: 'Identificação visual intuitiva de criticidade: Amarelo para ≤ 30 dias e Vermelho para ≤ 7 dias.' },
  { icon: Tags, title: 'Sugestão de Descontos', desc: 'Sugestões automáticas de remarcação de preços (markdown) para lotes em risco crítico.' }
];

export default function WelcomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col font-sans text-slate-800 bg-slate-50 overflow-x-hidden scroll-smooth">
      
      <FakeNavBar/>

      <div className="flex-1">
        
        {/* HERO SECTION */}
        <section className="text-center py-20 px-4 flex flex-col items-center justify-center min-h-[70vh]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-100 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            Gestão Preventiva de Estoque para o Pequeno Varejo
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Smart Inventory
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Plataforma Web e Mobile para gestão preventiva de estoque com foco na 
            <span className="font-semibold text-blue-600"> redução de desperdício de itens</span> e na preservação do capital de giro de pequenos e médios mercados.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 mt-4">
            <Link 
                href="/create-account" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#6b9dff] hover:bg-[#6b9dff]/80 text-[#222222] font-bold py-3.5 px-8 rounded-xl transition-all shadow-sm"
            >
              Começar Agora
              <ArrowRight size={18} />
            </Link>
            <Link 
                href="/login" 
                className="w-full sm:w-auto flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3.5 px-8 rounded-xl border border-slate-200 transition-all shadow-sm"
            >
              Acessar meu Estoque
            </Link>
          </div>
        </section>

        {/* ESTATÍSTICA / O PROBLEMA */}
        <section id="problema" className="bg-white py-16 px-4 border-y border-slate-200 scroll-mt-[60px]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <TrendingDown className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">O Problema do Desperdício</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              No varejo de vizinhança, a conferência visual de validades sobrecarrega funcionários e gera falhas. Sabia que cerca de <strong className="text-red-600 font-semibold">24% das perdas totais no varejo nacional</strong> estão relacionadas a produtos vencidos? O Smart Inventory substitui anotações físicas por automação baseada em dados.
            </p>
          </div>
        </section>

        {/* FEATURES (FUNCIONALIDADES) */}
        <section id="funcionalidades" className="py-20 px-4 bg-slate-50 scroll-mt-[60px]">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Por que escolher o Smart Inventory?</h2>
            <p className="mt-4 text-lg text-slate-600">Diferente de ERPs complexos e caros, focamos no que realmente importa de forma simples e direta.</p>
          </div>
          
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            {features.map((f, index) => (
              <div key={index} className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm transition-all hover:shadow-md hover:border-blue-200 flex flex-col items-center text-center group">
                <div className="mb-5 inline-flex rounded-xl bg-blue-50 p-4 transition-colors group-hover:bg-blue-100">
                  <f.icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ODS 12 E USABILIDADE */}
        <section className="bg-white text-white py-20 px-4 scroll-mt-[60px]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="flex flex-col items-start bg-slate-100 border border-slate-300 p-8 md:p-10 rounded-2xl shadow-lg">
              <div className="p-3 bg-emerald-500/10 rounded-xl mb-6">
                <Globe className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Sustentabilidade (ODS 12)</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Alinhado à Meta 12.3 dos Objetivos de Desenvolvimento Sustentável da ONU, o sistema possui relatórios de ações preventivas, garantindo o consumo responsável e atuando diretamente na <strong className="text-emerald-400 font-semibold">redução do desperdício de alimentos</strong> no comércio local.
              </p>
            </div>

            <div className="flex flex-col items-start bg-slate-100 border border-slate-300 p-8 md:p-10 rounded-2xl shadow-lg">
              <div className="p-3 bg-blue-500/10 rounded-xl mb-6">
                <Clock className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Curva de Aprendizado Zero</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Esqueça os treinamentos complexos exigidos pelas grandes plataformas. Nosso design minimalista e focado no usuário garante que novos colaboradores estejam aptos a utilizar o sistema plenamente em <strong className="text-blue-400 font-semibold">menos de 15 minutos</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* DASHBOARD E COMPARATIVO */}
        <section className="bg-slate-50 py-16 px-4" id="diferencial">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            
            {/* INFORMAÇÕES DE DASHBOARD E ACESSO */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Controle Total e Visão Estratégica</h2>
              
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg"><PieChart className="h-6 w-6 text-blue-700" /></div>
                <div>
                  <h4 className="text-xl font-bold">Dashboard Situacional</h4>
                  <p className="text-gray-600">Acompanhe seu estoque de forma visual com <strong>gráficos interativos</strong> que exibem estatísticas em tempo real, listando de forma resumida os produtos com nível de prioridade em "crítica" e "alerta".</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg"><Users className="h-6 w-6 text-blue-700" /></div>
                <div>
                  <h4 className="text-xl font-bold">Perfis de Acesso Independentes</h4>
                  <p className="text-gray-600">Separação de responsabilidades: <strong>Administradores</strong> acessam relatórios financeiros e de risco, enquanto <strong>Colaboradores</strong> têm foco ágil nas baixas e leitura de códigos.</p>
                </div>
              </div>
            </div>
            
            {/* COMPARATIVO COM CONCORRENTES (Restaurado para o original) */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-6">Por que somos diferentes dos ERPs tradicionais?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-gray-700"><strong>ERPs Financeiros e Contábeis:</strong> Focam em emissão fiscal e fluxos genéricos. Oferecem apenas relatórios estáticos de saldo, exigindo checagem manual nas prateleiras e não possuem alertas proativos de vencimento.</p>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-gray-700"><strong>Sistemas de Gestão Complexos:</strong> Construídos para grandes indústrias e redes. Possuem alto custo de licenciamento, exigem treinamento técnico especializado e têm implantação demorada, tornando-se inviáveis para o pequeno varejo.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-700"><strong>Smart Inventory:</strong> Plataforma de baixo custo, com foco exclusivo na lógica FEFO (Primeiro a Vencer, Primeiro a Sair). Elimina a checagem manual com alertas visuais automáticos e leitura de código via câmera, preservando o capital de giro.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* TECNOLOGIA E ARQUITETURA (Restaurado) */}
        <section id="tecnologias" className="py-16 px-4 bg-white text-center border-t border-slate-200">
          <h2 className="text-3xl font-bold mb-4">Arquitetura de Alta Performance</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">Desenvolvido com tecnologias modernas para garantir estabilidade, segurança e agilidade em qualquer dispositivo.</p>
          
          <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto">
             {/* Front-end */}
             <div className="flex flex-col items-center gap-3 w-40">
                <div className="bg-white shadow-sm p-4 rounded-full border border-gray-200"><Cpu className="h-8 w-8 text-blue-600" /></div>
                <h4 className="font-bold">Front-end Moderno</h4>
                <p className="text-xs text-gray-600">React, TypeScript e JavaScript</p>
             </div>
             
             {/* Back-end */}
             <div className="flex flex-col items-center gap-3 w-40">
                <div className="bg-white shadow-sm p-4 rounded-full border border-gray-200"><Database className="h-8 w-8 text-blue-600" /></div>
                <h4 className="font-bold">Back-end & API</h4>
                <p className="text-xs text-gray-600">Python com micro-framework Flask e (?)</p>
             </div>

             {/* UI/UX */}
             <div className="flex flex-col items-center gap-3 w-40">
                <div className="bg-white shadow-sm p-4 rounded-full border border-gray-200"><PieChart className="h-8 w-8 text-blue-600" /></div>
                <h4 className="font-bold">Interface & Gráficos</h4>
                <p className="text-xs text-gray-600">TailwindCSS, Recharts e Lucide Icons</p>
             </div>

             {/* Câmera */}
             <div className="flex flex-col items-center gap-3 w-40">
                <div className="bg-white shadow-sm p-4 rounded-full border border-gray-200"><ScanLine className="h-8 w-8 text-blue-600" /></div>
                <h4 className="font-bold">Integração de Câmera</h4>
                <p className="text-xs text-gray-600">Biblioteca react-zxing (Leitura em {'<'} 2s)</p>
             </div>
             
             {/* Deploy & DevOps */}
             <div className="flex flex-col items-center gap-3 w-40">
                <div className="bg-white shadow-sm p-4 rounded-full border border-gray-200"><Globe className="h-8 w-8 text-blue-600" /></div>
                <h4 className="font-bold">Infraestrutura</h4>
                <p className="text-xs text-gray-600">Hospedagem Vercel & Render, controle via Git/GitHub</p>
             </div>
          </div>
        </section>

      </div>
    </div>
  );
}