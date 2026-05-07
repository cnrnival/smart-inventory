'use client';

import { useAuthContext } from '@/hooks/useAuthContext';
import { User, Mail, Shield, IdCard } from 'lucide-react'; 

export default function ProfilePage() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-[#E8E9E8] p-4 md:p-8">
      <div className="mx-auto max-w-2xl bg-[#b2b2b2] rounded-2xl p-8 shadow-lg shadow-black/20">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-[#6b9dff] rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
            <User size={48} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-black">{user?.name || 'Usuário'}</h1>
          <span className="text-sm font-semibold bg-[#6b9dff]/20 text-[#2c5ebf] px-3 py-1 rounded-full mt-2">
            {user?.isAdmin ? 'Administrador' : 'Colaborador'}
          </span>
        </div>

        <div className="space-y-4">
          {/* Campo: Email */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-black font-semibold sm:w-[100px] shrink-0 flex items-center gap-2">
              <Mail size={16} /> Email:
            </span>
            <div className="flex-1 min-h-[40px] bg-white w-full flex items-center px-3 rounded-md text-black border border-gray-300">
              <span className="truncate">{user?.email}</span>
            </div>
          </div>

          {/* Campo: Documento (CPF/CNPJ) */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-black font-semibold sm:w-[100px] shrink-0 flex items-center gap-2">
              <IdCard size={16} /> Doc:
            </span>
            <div className="flex-1 min-h-[40px] bg-white w-full flex items-center px-3 rounded-md text-black border border-gray-300">
              <span className="truncate">{user?.document || 'Não informado'}</span>
            </div>
          </div>

          {/* Campo: Cargo */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-black font-semibold sm:w-[100px] shrink-0 flex items-center gap-2">
              <Shield size={16} /> Cargo:
            </span>
            <div className="flex-1 min-h-[40px] bg-white w-full flex items-center px-3 rounded-md text-black border border-gray-300">
              <span className="truncate">{user?.role || (user?.isAdmin ? 'Gerente de Estoque' : 'Operador')}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-black/10">
          <p className="text-center text-xs text-gray-600">
            Smart Inventory - Gestão Profissional ADS 2026
          </p>
        </div>
      </div>
    </div>
  );
}