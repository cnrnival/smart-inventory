'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/hooks/useAuthContext';
import { axios_api } from '@/api/axios_api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Busca usuário na API do Render filtrando por e-mail e senha
      const response = await axios_api.get(`/users?email=${email}&password=${password}`);
      const users = response.data;

      if (users.length > 0) {
        login(users[0]);
        router.push('/'); // Redirecionamento funcional para dashboard
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      alert('Erro ao conectar com a API');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#212121] p-4 text-white">
      <div className="w-full max-w-md rounded-2xl bg-[#333333] p-8 shadow-2xl border border-gray-600">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#6b9dff]">Smart Inventory</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">E-mail</label>
            <input 
              type="email" 
              className="w-full rounded-lg bg-[#d9d9d9] p-3 text-black focus:outline-none focus:ring-2 focus:ring-[#6b9dff]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Senha</label>
            <input 
              type="password" 
              className="w-full rounded-lg bg-[#d9d9d9] p-3 text-black focus:outline-none focus:ring-2 focus:ring-[#6b9dff]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full rounded-lg bg-[#6b9dff] py-3 text-lg font-bold text-white hover:opacity-90 transition-opacity mt-4 shadow-lg"
          >
            Acessar Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}