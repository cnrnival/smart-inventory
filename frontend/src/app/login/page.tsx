'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthContext } from '@/hooks/useAuthContext';
import { FakeNavBar } from '@/components/FakeNavBar';
import { toast } from 'sonner';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {findUserByEmailAndPassword, setUser }= useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // ✅ renomeado de 'senha'

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const userExists = await findUserByEmailAndPassword(email, password);
    if (userExists) {
      toast.success('Login realizado com sucesso!');
      setUser(userExists);
      router.push('/');
    } else {
      toast.error('Email ou senha incorretos.');
    }
  } catch (error) {
    toast.error('Erro ao conectar com o servidor. Tente novamente.');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-[#E8E9E8]">
      <FakeNavBar />
      <main className="container mx-auto flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-xl bg-[#b2b2b2] p-8 shadow-sm shadow-black/50">
          <h1 className="text-center text-3xl font-bold text-[#6b9dff]">Smart Inventory</h1>
          <p className="mt-2 text-center text-gray-600">Entre na sua conta</p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-black/70">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#6b9dff] focus:ring-2 focus:ring-[#6b9dff]/20"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-black/70">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#6b9dff] focus:ring-2 focus:ring-[#6b9dff]/20"
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
            <Link href="/create-account" className="font-medium hover:underline text-[#6b9dff]">
              Cadastre-se
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}