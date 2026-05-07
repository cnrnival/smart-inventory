'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/useAuthContext";
import { toast } from "sonner";
import { UserPlus, Loader2 } from "lucide-react";

interface Props {
  isAdmin?: boolean;
  isInInventoryPage?: boolean;
  ShowCollaboratorForm?: () => void;
}

export function UserForm({ isAdmin = false, isInInventoryPage = false, ShowCollaboratorForm }: Props) {
  const { registerUser } = useAuthContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    document: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await registerUser({
        ...form,
        isAdmin: isAdmin
      });

      toast.success("Usuário cadastrado com sucesso!");
      
      if (ShowCollaboratorForm) {
        ShowCollaboratorForm();
      }

      if (!isInInventoryPage) {
        router.push("/login");
      }
    } catch (error) {
      toast.error("Erro ao realizar cadastro. Verifique os dados.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = "w-full rounded-lg border border-gray-600 bg-[#262626] px-4 py-2.5 text-white outline-none focus:border-[#6b9dff] transition-all placeholder:text-gray-500";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#323232] p-6 rounded-xl border border-gray-700 shadow-xl max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-2 text-[#6b9dff]">
        <UserPlus size={24} />
        <h2 className="text-xl font-bold text-white">Novo Cadastro</h2>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Nome Completo"
          required
          className={inputStyle}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="E-mail profissional"
          required
          className={inputStyle}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Documento (CPF/CNPJ)"
          className={inputStyle}
          value={form.document}
          onChange={(e) => setForm({ ...form, document: e.target.value })}
        />

        <input
          type="password"
          placeholder="Senha de acesso"
          required
          className={inputStyle}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 flex items-center justify-center gap-2 bg-[#6b9dff] hover:bg-[#5a8dec] disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Finalizar Cadastro"}
      </button>
    </form>
  );
}