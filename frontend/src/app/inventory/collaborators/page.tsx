'use client'

import { UserForm } from "@/components/userform";
import { useAuthContext } from "@/hooks/useAuthContext";
import { PlusCircle, Trash, Edit } from "lucide-react"
import { useEffect, useState } from "react";

export default function CollaboratorsPage(){

    const {usersList, getUsers} = useAuthContext();
    const [isCollaboratorFormOpen, setIsCollaboratorFormOpen] = useState(false);

    useEffect(()=>{
        getUsers()
    }, [])

    function ShowCollaboratorForm() {
        setIsCollaboratorFormOpen(!isCollaboratorFormOpen);
    }

    return (
        <div className="flex-1 flex flex-col bg-slate-50 h-full p-4 sm:p-8 font-sans">

            {/* Topo da Página */}
            <div className="flex flex-row justify-between items-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Colaboradores</h2>
                <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg h-10 px-4 flex items-center gap-2 transition-colors duration-200 shadow-sm shadow-blue-600/30 active:scale-95" 
                    onClick={ShowCollaboratorForm}
                >
                    <PlusCircle className="w-5 h-5" />
                    <span className="text-sm">Novo</span>
                </button>
                {isCollaboratorFormOpen && 
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={ShowCollaboratorForm}>
                    <div className="w-[500px] h-[550px] flex flex-col md:flex-row bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden p-4" onClick={e => e.stopPropagation()}>
                    <UserForm isAdmin={false} isInInventoryPage={true} ShowCollaboratorForm={ShowCollaboratorForm}/>
                    </div>
                </div>
                }
            </div>

            {/* Cabeçalho da Lista */}
            <div className="flex flex-row h-12 items-center px-6 bg-white border border-slate-200 rounded-t-xl border-b-0 shadow-sm text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0">
                <span className="w-[40%] flex justify-start">Nome</span>
                <span className="w-[35%] flex justify-start">E-mail</span>
                <span className="w-[15%] flex justify-start">Tipo de acesso</span>
                <span className="w-[10%] flex justify-center">Ações</span>
            </div>

            {/* Corpo da Lista */}
            <ul className="flex flex-1 flex-col bg-white border border-slate-200 rounded-b-xl shadow-sm overflow-y-auto max-h-[530px] hide-scrollbar">
                {usersList.map((user) => (
                    <li key={user.id} className="flex flex-row h-16 items-center px-6 text-slate-600 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors duration-150 shrink-0">

                        <span className="w-[40%] flex justify-start font-medium text-slate-800">
                            {user.name}
                        </span>

                        <span className="w-[35%] flex justify-start truncate pr-4">
                            {user.email}
                        </span>

                        <span className="w-[15%] flex justify-start">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                                user.isAdmin 
                                    ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                                {user.isAdmin ? 'Admin' : 'Colaborador'}
                            </span>
                        </span>

                        <div className="w-[10%] flex justify-center items-center gap-2 sm:gap-4">
                            <button className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                                <Trash className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
