"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useAuthContext } from "@/hooks/useAuthContext";

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

    // Validações
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

      if (isInInventoryPage == false) {
        toast.success("Conta criada com sucesso!");
        router.push("/");
      } else {
        if (ShowCollaboratorForm) {
          ShowCollaboratorForm();
        }
      }
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      toast.error("Ocorreu um erro ao criar sua conta. Tente novamente.");
    }
  };

  return (
    <main
      className={
        isInInventoryPage === false
          ? `container mx-auto flex items-center justify-center px-4 py-10`
          : `w-full h-full mx-auto flex items-center justify-center  py-10 select-none text-black bg-black/50 absolute inset-0 rounded-xl`
      }
      onClick={ShowCollaboratorForm}
    >
      <div
        className="w-full max-w-md rounded-xl p-8 shadow-sm bg-[#b2b2b2] shadow-sm shadow-black/50 text-black/70"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-center text-3xl font-bold text-[#6b9dff]">
          Smart Inventory
        </h1>
        <p className="mt-2 text-center">Crie sua conta</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5 text-black/70">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-black/70"
            >
              Nome *
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Seu nome completo"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#6b9dff] focus:ring-2 focus:ring-[#6b9dff]/20 bg-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-black/70"
            >
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="seu@email.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#6b9dff] focus:ring-2 focus:ring-[#6b9dff]/20 bg-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="document"
              className="mb-1 block text-sm font-medium text-black/70"
            >
              CPF/CNPJ da Empresa *
            </label>
            <input
              id="document"
              type="text"
              value={form.document}
              onChange={(e) => setForm({ ...form, document: e.target.value })}
              placeholder="Apenas números"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#6b9dff] focus:ring-2 focus:ring-[#6b9dff]/20 bg-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-black/70"
            >
              Senha *
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Mínimo 4 caracteres"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#6b9dff] focus:ring-2 focus:ring-[#6b9dff]/20 bg-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#6b9dff]/90 bg-[#6b9dff] hover:bg-[#6b9dff]/70"
          >
            {isInInventoryPage === false ? "Criar conta" : "Cadastrar usuário"}
          </button>
        </form>

        {isInInventoryPage === false && (
          <p className="mt-6 text-center text-sm">
            Já tem conta?{" "}
            <Link
              href="/login"
              className="font-medium hover:underline text-[#6b9dff] hover:text-[#6b9dff]/70"
            >
              Fazer login
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
