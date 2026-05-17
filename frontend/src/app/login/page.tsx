"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/hooks/useAuthContext";
import { toast } from "sonner";
import { Package } from "lucide-react";

export default function LoginPage() {
  const { findUserByEmailAndPassword, setUser } = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userExists = await findUserByEmailAndPassword(email, password);
    if (userExists) {
      toast.success('Usuário encontrado.');
      setUser(userExists);
      router.push('/');
    } else {
      toast.error('Usuário não encontrado.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      
      {/* Cartão Centralizado com duas colunas internas */}
      <div className="w-full max-w-[850px] flex flex-col md:flex-row bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        
        {/* Coluna da Imagem (Apenas 40% do cartão, escondida no mobile) */}
        <div className="hidden md:flex md:w-[40%] relative bg-slate-900 items-center justify-center p-8">
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-30"
          ></div>
          <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="bg-white/10 p-3 rounded-xl mb-4 backdrop-blur-sm border border-white/20">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Smart Inventory</h2>
            <p className="mt-2 text-sm text-slate-300 font-medium leading-relaxed">
              Gestão preventiva e inteligente para o seu estoque.
            </p>
          </div>
        </div>

        {/* Coluna do Formulário (60% do cartão, foco total) */}
        <div className="w-full md:w-[60%] p-8 sm:p-12">
          <div className="flex flex-col items-center mb-6 md:hidden">
            <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl mb-3">
              <Package className="h-6 w-6" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-center md:text-left">
            Bem-vindo de volta
          </h1>
          <p className="mt-1.5 text-slate-500 font-medium text-sm text-center md:text-left mb-8">
            Entre na sua conta para continuar
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-semibold text-slate-700">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-4 py-3 mt-4 text-sm font-bold text-white transition-all hover:bg-blue-700 shadow-sm shadow-blue-600/30"
            >
              Entrar no Sistema
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Ainda não tem conta?{" "}
            <Link href="/create-account" className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}