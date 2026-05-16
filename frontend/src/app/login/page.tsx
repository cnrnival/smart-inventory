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
      const resp = await axios_api.get(`/users?email=${email}&password=${password}`);
      if (resp.data.length > 0) {
        login(resp.data[0]);
        router.push('/');
      } else { alert('Credenciais inválidas'); }
    } catch { alert('Erro na API'); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#212121] p-4 text-white">
      <div className="w-full max-w-md rounded-2xl bg-[#333333] p-10 shadow-2xl border border-gray-600">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-[#6b9dff]">Smart Inventory</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase">E-mail</label>
            <input type="email" required className="w-full rounded-lg bg-[#d9d9d9] p-4 text-black focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase">Senha</label>
            <input type="password" required className="w-full rounded-lg bg-[#d9d9d9] p-4 text-black focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full rounded-lg bg-[#6b9dff] py-4 text-lg font-bold text-white hover:opacity-90 transition-opacity">Acessar Dashboard</button>
        </form>
      </div>
    </div>
  );
}