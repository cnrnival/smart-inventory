'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthContext } from '@/hooks/useAuthContext';
import { FakeNavBar } from '@/components/FakeNavBar';

export default function LoginPage() {

  const {findUser}= useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // ✅ renomeado de 'senha'
   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
   }

  return (
    <div className="min-h-screen bg-gray-50">
      <FakeNavBar />
      <main className="container mx-auto flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
          <h1 className="text-center text-3xl font-bold text-[#6b9dff]">Smart Inventory</h1>
          <p className="mt-2 text-center text-gray-600">Entre na sua conta</p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#6b9dff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#6b9dff]/90"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Não tem conta?{' '}
            <Link href="/create-account" className="font-medium text-primary hover:underline text-[#6b9dff]">
              Cadastre-se
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}