'use client'

import { UserForm } from "@/components/userform";
import { useAuthContext } from "@/hooks/useAuthContext";
import { PlusCircle, Trash, Edit, UserPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function CollaboratorsPage() {
  // Puxamos a lista e a função do contexto corrigido
  const { usersList, getUsers } = useAuthContext();
  const [isCollaboratorFormOpen, setIsCollaboratorFormOpen] = useState(false);

  // Carrega os colaboradores ao montar a página
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="p-6 bg-[#262626] min-h-screen text-white">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="text-[#6b9dff]" />
              Gestão de Colaboradores
            </h1>
            <p className="text-gray-400 text-sm">Controle de acesso ao Smart Inventory</p>
          </div>

          <button
            onClick={() => setIsCollaboratorFormOpen(!isCollaboratorFormOpen)}
            className="flex items-center gap-2 bg-[#6b9dff] hover:bg-[#5a8dec] px-4 py-2 rounded-lg font-semibold transition-all shadow-md"
          >
            <UserPlus size={20} />
            Novo Colaborador
          </button>
        </header>

        {/* Formulário de Cadastro (aparece ao clicar no botão) */}
        {isCollaboratorFormOpen && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <UserForm isAdmin={false} isInInventoryPage={true} />
          </div>
        )}

        {/* Tabela de Colaboradores */}
        <div className="rounded-xl border border-gray-700 bg-[#323232] overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-[#222222] text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Cargo</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {usersList.length > 0 ? (
                usersList.map((colaborador) => (
                  <tr key={colaborador.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{colaborador.name}</td>
                    <td className="px-6 py-4 text-gray-300">{colaborador.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${
                        colaborador.isAdmin 
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/50' 
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/50'
                      }`}>
                        {colaborador.isAdmin ? 'Administrador' : 'Operador'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button className="text-gray-400 hover:text-white transition-colors" title="Editar">
                          <Edit size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-red-500 transition-colors" title="Excluir">
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    Nenhum colaborador encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}