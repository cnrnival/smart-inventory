'use client';

import { useState } from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useRouter } from 'next/navigation';
import { axios_api } from '@/api/axios_api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ✅ Chamada para a API no Render (usando GET conforme seu server.js)
      const response = await axios_api.get(`/users?email=${email}&password=${password}`);
      const users = response.data;

      if (users.length > 0) {
        // ✅ Sucesso: Salva o usuário no contexto e redireciona
        login(users[0]);
        router.push('/');
      } else {
        alert('Credenciais inválidas. Verifique seu email e senha.');
      }
    } catch (error) {
      console.error('Erro ao conectar na API:', error);
      alert('Erro ao conectar com o servidor. Tente novamente em instantes.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#262626] p-4 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 rounded-xl border border-gray-700 bg-[#323232] p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#6b9dff]">Smart Inventory</h1>
          <p className="mt-2 text-gray-400 text-sm">Entre para gerenciar seus prazos FEFO</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input 
              type="email" required
              className="w-full rounded-lg bg-[#262626] border border-gray-600 p-3 focus:outline-none focus:border-[#6b9dff]"
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@gmail.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input 
              type="password" required
              className="w-full rounded-lg bg-[#262626] border border-gray-600 p-3 focus:outline-none focus:border-[#6b9dff]"
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
        </div>

        <button type="submit" className="w-full rounded-lg bg-[#6b9dff] p-3 font-bold text-white transition-opacity hover:opacity-90">
          Acessar Dashboard
        </button>
      </form>
    </div>
  );
}