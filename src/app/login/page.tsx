'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Package, User } from 'lucide-react';
import { useTestAuth } from '@/hooks/test_auth';

export default function LoginPage() {

  const {login} = useTestAuth();

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  //   // Simulação de login com localStorage
  //   const users = JSON.parse(localStorage.getItem('users') || '[]');
  //   const user = users.find((u: any) => u.email === email && u.senha === senha);

  //   if (user) {
  //     toast.success('Login realizado com sucesso!');
  //     localStorage.setItem('currentUser', JSON.stringify(user));
  //     router.push('/dashboard');
  //   } else {
  //     toast.error('Email ou senha inválidos.');
  //   }

  login();
  router.push('/')
  
  };

  return (
    <div className="min-h-screen text-white bg-[#262626]">

      <div className="sticky top-0 z-50 h-[60px] bg-[#1f1f1f]">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary text-[#6b9dff]">
              <Package className="h-6 w-6" />
              Smart Inventory
            </Link>
          </div>
        </div>

      <main className="container mx-auto flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-xl border border-secondary bg-third p-8 shadow-sm h-[400px] bg-[#323232] border-[#262626]">
          <h1 className="text-center text-3xl font-bold">Smart Inventory</h1>
          <p className="mt-2 text-center">Entre na sua conta</p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label htmlFor="senha" className="mb-1 block text-sm font-medium">Senha</label>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="********"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors bg-[#6b9dff] hover:bg-[#6b9dff]/70"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
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