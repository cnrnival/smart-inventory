"use client";

<<<<<<< HEAD
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/hooks/useAuthContext';
import { axios_api } from '@/api/axios_api';
=======
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/hooks/useAuthContext";
import { FakeNavBar } from "@/components/FakeNavBar";
import { axios_api } from "@/api/axios_api"; // ✅ Importação adicionada
import { toast } from "sonner";
>>>>>>> parent of ac5515f (implementation of login redirect to dashboard)

export default function LoginPage() {
  const { login } = useAuthContext();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ Estado adicionado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    try {
      const response = await axios_api.get(`/users?email=${email}&password=${password}`);
      const users = response.data;
      if (users.length > 0) {
        login(users[0]);
        router.push('/');
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor');
=======
    setIsLoading(true);
    try {
      const response = await axios_api.get(
        `/users?email=${email.trim()}&password=${password.trim()}`
      );
      
      const users = Array.isArray(response.data) ? response.data : response.data.users ?? [];

      if (users.length > 0) {
        toast.success('Login realizado!');
        login(users[0]);
        router.push('/');
      } else {
        toast.error('Email ou senha inválidos.');
      }
    } catch (error) {
      toast.error('Erro ao conectar. Tente novamente.');
    } finally {
      setIsLoading(false);
>>>>>>> parent of ac5515f (implementation of login redirect to dashboard)
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen items-center justify-center bg-[#212121] p-4 text-white font-sans">
      <div className="w-full max-w-md rounded-2xl bg-[#333333] p-10 shadow-2xl border border-gray-600">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-[#6b9dff] tracking-tight">Smart Inventory</h1>
          {/* ✅ FRASE REMOVIDA AQUI */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase ml-1">E-mail</label>
            <input 
              type="email" required
              className="w-full rounded-lg bg-[#d9d9d9] p-4 text-black focus:outline-none focus:ring-2 focus:ring-[#6b9dff] transition-all"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Senha</label>
            <input 
              type="password" required
              className="w-full rounded-lg bg-[#d9d9d9] p-4 text-black focus:outline-none focus:ring-2 focus:ring-[#6b9dff] transition-all"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full rounded-lg bg-[#6b9dff] py-4 text-lg font-bold text-white hover:bg-[#5a8cea] transition-colors shadow-lg"
          >
            Acessar Dashboard
          </button>
        </form>
      </div>
=======
    <div className="min-h-screen bg-[#E8E9E8]">
      <FakeNavBar />
      <main className="container mx-auto flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-xl bg-[#b2b2b2] p-8 shadow-sm">
          <h1 className="text-center text-3xl font-bold text-[#6b9dff]">Smart Inventory</h1>
          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-2 rounded border" 
              placeholder="Email" 
              required 
            />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-2 rounded border" 
              placeholder="Senha" 
              required 
            />
            <button 
              disabled={isLoading}
              className="w-full bg-[#6b9dff] text-white p-2 rounded font-bold"
            >
              {isLoading ? "Carregando..." : "Entrar"}
            </button>
          </form>
        </div>
      </main>
>>>>>>> parent of ac5515f (implementation of login redirect to dashboard)
    </div>
  );
}