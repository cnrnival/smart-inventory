'use client';

import { UserForm } from "@/components/userform";
import { Package } from "lucide-react";

export default function CreateAccountPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      
      {/* Cartão Centralizado com duas colunas */}
      <div className="w-full max-w-[900px] flex flex-col md:flex-row bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        
        {/* Coluna da Imagem (Apenas 40% do cartão) */}
        <div className="hidden md:flex md:w-[40%] relative bg-slate-900 items-center justify-center p-8">
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-30"
          ></div>
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="bg-white/10 p-3 rounded-xl mb-4 backdrop-blur-sm border border-white/20">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Crie sua Conta</h2>
            <p className="mt-2 text-sm text-slate-300 font-medium leading-relaxed">
              Junte-se ao Smart Inventory e elimine o desperdício no seu estoque.
            </p>
          </div>
        </div>

        {/* Coluna do Formulário (60% do cartão) */}
        <div className="w-full md:w-[60%] flex items-center justify-center bg-white p-4 sm:p-8">
           {/* Como UserForm já tem o próprio padding e formatação, apenas o chamamos aqui */}
           <UserForm isAdmin={true} isInInventoryPage={false} />
        </div>
      </div>
    </div>
  );
}