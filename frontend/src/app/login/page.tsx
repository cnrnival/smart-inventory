"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/hooks/useAuthContext";
import { FakeNavBar } from "@/components/FakeNavBar";
import { axios_api } from "@/api/axios_api"; // ✅ Importação adicionada
import { toast } from "sonner";

export default function LoginPage() {
  const { login } = useAuthContext();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ Estado adicionado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    }
  };

  return (
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
    </div>
  );
}