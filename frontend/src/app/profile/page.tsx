'use client'

import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext"

export default function Profile() {
    const { user, logout } = useAuthContext();
    const [isEditing, setIsEditing] = useState(false);
    
    // Novo estado para controlar a exibição do formulário de senha
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        document: user?.document || ''
    });

    // Novo estado para os dados da senha
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log("Dados salvos:", formData);
        setIsEditing(false);
    };

    const handleSavePassword = () => {
       
        console.log("Senha alterada:", passwordData);
        setIsPasswordOpen(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="min-h-[calc(100vh-60px)] w-full bg-slate-100 p-4 sm:p-8 flex justify-center items-start font-sans">
            <div className="w-full max-w-4xl flex flex-col mt-2 sm:mt-6 gap-6">
                
                {/* Cabeçalho da Página */}
                <div className="flex justify-between items-center bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="font-bold text-slate-800 text-2xl sm:text-3xl">Meu Perfil</h2>
                    <button 
                        onClick={logout}
                        className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-semibold py-2 px-5 rounded-lg transition-colors duration-200"
                    >
                        Sair
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Seção 1: Dados Pessoais */}
                    <div className="flex flex-col p-5 sm:p-8 bg-white rounded-xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-800 text-xl">Dados Pessoais</h3>
                            {!isEditing ? (
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                                >
                                    Editar
                                </button>
                            ) : (
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => setIsEditing(false)}
                                        className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        onClick={handleSave}
                                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm shadow-blue-600/30"
                                    >
                                        Salvar
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-5">
                            <InputField label="Nome" name="name" value={formData.name} isEditing={isEditing} onChange={handleInputChange} />
                            <InputField label="E-mail" name="email" value={formData.email} isEditing={isEditing} onChange={handleInputChange} type="email" />
                            <InputField label="Documento" name="document" value={formData.document} isEditing={isEditing} onChange={handleInputChange} />
                        </div>
                        
                        {/* Seção de Alterar Senha Expansível */}
                        <div className="mt-8 pt-6 border-t border-slate-100">
                            {!isPasswordOpen ? (
                                <button 
                                    onClick={() => setIsPasswordOpen(true)}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                                >
                                    Alterar Senha de Acesso
                                </button>
                            ) : (
                                <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <h4 className="font-semibold text-slate-700 text-sm mb-1">Mudar Senha</h4>
                                    
                                    <InputField label="Senha Atual" name="currentPassword" type="password" value={passwordData.currentPassword} isEditing={true} onChange={handlePasswordChange} />
                                    <InputField label="Nova Senha" name="newPassword" type="password" value={passwordData.newPassword} isEditing={true} onChange={handlePasswordChange} />
                                    <InputField label="Confirmar Nova" name="confirmPassword" type="password" value={passwordData.confirmPassword} isEditing={true} onChange={handlePasswordChange} />
                                    
                                    <div className="flex justify-end gap-3 mt-4">
                                        <button 
                                            onClick={() => setIsPasswordOpen(false)}
                                            className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                                        >
                                            Cancelar
                                        </button>
                                        <button 
                                            onClick={handleSavePassword}
                                            className="text-sm bg-slate-800 hover:bg-slate-900 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                                        >
                                            Atualizar Senha
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

// O Subcomponente InputField continua exatamente o mesmo
interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    isEditing: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function InputField({ label, name, value, isEditing, onChange, type = "text" }: InputFieldProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center w-full gap-2 sm:gap-4">
            <span className="text-slate-500 font-medium text-sm sm:text-base sm:w-[120px] shrink-0">
                {label}:
            </span>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={!isEditing}
                className={`flex-1 min-h-[44px] px-4 rounded-lg w-full outline-none transition-all duration-200 text-base
                    ${isEditing 
                        ? 'bg-white border-2 border-blue-500 text-slate-800 shadow-sm focus:ring-4 focus:ring-blue-500/20' 
                        : 'bg-slate-50 border-2 border-transparent text-slate-600 cursor-default'
                    }
                `}
            />
        </div>
    );
}

