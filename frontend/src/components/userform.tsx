"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useAuthContext } from "@/hooks/useAuthContext";
import { UserPlus, Package } from "lucide-react";

type Props = {
  isAdmin: boolean;
  isInInventoryPage: boolean;
  ShowCollaboratorForm?: () => void;
};

export function UserForm({
  isAdmin,
  isInInventoryPage,
  ShowCollaboratorForm,
}: Props) {
  const { registerUser } = useAuthContext();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    document: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, document } = form;

    const newUserData = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      document,
      isAdmin,
    };

    if (!name || !email || !password || !document) {
      toast.error("Preencha todos os campos.");
      return;
    }
    if (password.length < 4) {
      toast.error("A senha deve ter no mínimo 4 caracteres.");
      return;
    }

    try {
      await registerUser(newUserData, isAdmin);

      if (isInInventoryPage === false) {
        toast.success("Conta criada com sucesso!");
        router.push("/");
      } else {
        toast.success("Colaborador adicionado!");
        if (ShowCollaboratorForm) {
          ShowCollaboratorForm(); // Fecha o formulário/modal na página pai após salvar
        }
      }
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      toast.error("Ocorreu um erro ao criar sua conta. Tente novamente.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl mb-3 md:hidden">
          {isInInventoryPage ? <UserPlus className="h-6 w-6" /> : <Package className="h-6 w-6" />}
        </div>
        <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isInInventoryPage ? "Novo Colaborador" : "Crie sua conta"}
        </h1>
        <p className="mt-1.5 text-center text-slate-500 font-medium text-sm">
          {isInInventoryPage ? "Cadastre um usuário na plataforma" : "Preencha seus dados abaixo"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold text-slate-700">
            Nome Completo *
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ex: João da Silva"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700">
            E-mail *
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="seu@email.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            required
          />
        </div>

        <div>
          <label htmlFor="document" className="mb-1 block text-sm font-semibold text-slate-700">
            CPF/CNPJ da Empresa *
          </label>
          <input
            id="document"
            type="text"
            value={form.document}
            onChange={(e) => setForm({ ...form, document: e.target.value })}
            placeholder="Apenas números"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-semibold text-slate-700">
            Senha *
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Mínimo 4 caracteres"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-4 py-3 mt-4 text-sm font-bold text-white transition-all hover:bg-blue-700 shadow-sm shadow-blue-600/30"
        >
          {isInInventoryPage === false ? "Finalizar Cadastro" : "Cadastrar usuário"}
        </button>
      </form>

      {isInInventoryPage === false && (
        <p className="mt-6 text-center text-sm text-slate-500">
          Já tem conta?{" "}
          <Link
            href="/login"
            className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            Fazer login
          </Link>
        </p>
      )}
    </div>
  );
}