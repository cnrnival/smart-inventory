'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

export default function CreateAccountPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, confirmEmail, password, confirmPassword } = form;

    // Refatorado com o switch que você pediu anteriormente!
    switch (true) {
      case (!name || !email || !confirmEmail || !password || !confirmPassword):
        toast.error('Preencha todos os campos.');
        return;
      
      case (email !== confirmEmail):
        toast.error('Os emails não coincidem.');
        return;
      
      case (password !== confirmPassword):
        toast.error('As senhas não coincidem.');
        return;
      
      case (password.length < 4):
        toast.error('A senha deve ter no mínimo 4 caracteres.');
        return;
      
      default:
        break;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    sessionStorage.setItem('temp_user', JSON.stringify({ name, email, password }));
    sessionStorage.setItem('verification_code', code);

    toast.success(`Código de verificação enviado para ${email} (código: ${code})`);

    // Atualizado para a nova rota em inglês
    router.push('/verify-code');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
          <h1 className="text-center text-3xl font-bold">Criar Conta</h1>
          <p className="mt-2 text-center text-gray-600">Cadastre-se no Smart Inventory</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">Nome *</label>
              <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Seu nome completo" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">Email *</label>
              <input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="seu@email.com" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
            </div>

            <div>
              <label htmlFor="confirmEmail" className="mb-1 block text-sm font-medium">Confirmar Email *</label>
              <input id="confirmEmail" type="email" value={form.confirmEmail} onChange={(e) => setForm({ ...form, confirmEmail: e.target.value })} placeholder="Confirme seu email" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium">Senha *</label>
              <input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Mínimo 4 caracteres" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">Confirmar Senha *</label>
              <input id="confirmPassword" type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="Repita a senha" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" required />
            </div>

            <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 bg-blue-600">
              Criar Conta
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Já tem conta?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:underline">
              Fazer login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}