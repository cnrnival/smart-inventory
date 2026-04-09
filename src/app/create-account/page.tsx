'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Package } from "lucide-react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { axios_api } from "@/services/axios_api";

export default function CreateAccountPage() {

  const { registerUser, findUser } = useAuthContext();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    document: "",
  });

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, confirmEmail, password, confirmPassword, document } = form;

    const newUserData = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      document,
      isAdmin: true
    };

    // Validações
    if (!name || !email || !confirmEmail || !password || !confirmPassword || !document) {
      toast.error("Preencha todos os campos.");
      return;
    } else if (email !== confirmEmail) {
      toast.error("Os emails não coincidem.");
      return;
    } else if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    } else if (password.length < 4) {
      toast.error("A senha deve ter no mínimo 4 caracteres.");
      return;
    } 


    try {
      await registerUser(newUserData);
        toast.success("Conta criada com sucesso!");
        router.push('/')
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      toast.error("Ocorreu um erro ao criar sua conta. Tente novamente.");
    }
  }


return (
  <div className="min-h-screen bg-background text-white bg-[#262626]">
    <div className="sticky top-0 z-50 h-[60px] bg-[#1f1f1f]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[#6b9dff]">
          <Package className="h-6 w-6" />
          Smart Inventory
        </Link>
      </div>
    </div>

    <main className="container mx-auto flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-xl p-8 shadow-sm bg-[#323232]">
        <h1 className="text-center text-3xl font-bold">Criar Conta</h1>
        <p className="mt-2 text-center">Cadastre-se no Smart Inventory</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">Nome *</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Seu nome completo"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#6b9dff] focus:ring-2 focus:ring-[#6b9dff]/20"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">Email *</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="seu@email.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#6b9dff] focus:ring-2 focus:ring-[#6b9dff]/20"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmEmail" className="mb-1 block text-sm font-medium">Confirmar Email *</label>
            <input
              id="confirmEmail"
              type="email"
              value={form.confirmEmail}
              onChange={(e) => setForm({ ...form, confirmEmail: e.target.value })}
              placeholder="Confirme seu email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#6b9dff] focus:ring-2 focus:ring-[#6b9dff]/20"
              required
            />
          </div>

          <div>
            <label htmlFor="document" className="mb-1 block text-sm font-medium">CPF/CNPJ da Empresa *</label>
            <input
              id="document"
              type="text"
              value={form.document}
              onChange={(e) => setForm({ ...form, document: e.target.value })}
              placeholder="Apenas números"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#6b9dff] focus:ring-2 focus:ring-[#6b9dff]/20"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">Senha *</label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Mínimo 4 caracteres"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#6b9dff] focus:ring-2 focus:ring-[#6b9dff]/20"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">Confirmar Senha *</label>
            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="Repita a senha"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#6b9dff] focus:ring-2 focus:ring-[#6b9dff]/20"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#6b9dff]/90 bg-[#6b9dff] hover:bg-[#6b9dff]/70"
          >
            Criar Conta
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Já tem conta?{" "}
          <Link href="/login" className="font-medium hover:underline text-[#6b9dff] hover:text-[#6b9dff]/70">
            Fazer login
          </Link>
        </p>
      </div>
    </main>
  </div>
);
}