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
        <div className="flex-1 flex flex-col bg-[#E8E9E8] h-full overflow-hidden w-full">
            <div className="flex px-4 pt-4 flex-row justify-between items-center shrink-0">
                <h2 className="text-xl md:text-2xl font-bold text-black">Colaboradores</h2>
                <button 
                    className="bg-[#6b9dff] flex items-center justify-center text-white font-bold rounded-md h-[36px] px-3 gap-2 shadow-sm shadow-black/70 hover:bg-[#6b9dff]/80 transition-colors" 
                    onClick={ShowCollaboratorForm}
                >
                    <PlusCircle className="w-4 h-4" />
                    <span className="text-sm">Colab...</span>
                </button>
                {isCollaboratorFormOpen && <UserForm isAdmin={false} isInInventoryPage={true} ShowCollaboratorForm={ShowCollaboratorForm}/>}
            </div>

            <div className="flex-1 flex flex-col p-4 overflow-hidden w-full mt-2">
                <div className="w-full flex flex-col flex-1 overflow-hidden bg-[#c9c9c9] rounded-md shadow-md shadow-black/70">
                    
                    {/* Cabeçalho da Lista */}
                    <div className="w-full flex flex-row items-center p-3 shrink-0 text-black border-b border-black/50 font-bold text-xs sm:text-sm gap-2">
                        <span className="w-[50%] sm:w-[40%] truncate">Nome</span>
                        <span className="hidden sm:flex sm:w-[35%] truncate">E-mail</span>
                        <span className="w-[30%] sm:w-[15%]">Acesso</span>
                        <span className="w-[20%] sm:w-[10%] flex justify-end pr-2">Ações</span>
                    </div>

                    {/* Corpo da Lista */}
                    <ul className="w-full flex-1 overflow-y-auto hide-scrollbar">
                        {usersList.map((user) => (
                            <li key={user.id} className="w-full flex flex-row min-h-[56px] items-center p-3 text-black border-b border-black/20 hover:bg-[#b9b9b9] transition-colors text-xs sm:text-sm gap-2">
                                <span className="w-[50%] sm:w-[40%] truncate font-medium">{user.name}</span>
                                <span className="hidden sm:flex sm:w-[35%] truncate">{user.email}</span>
                                <span className="w-[30%] sm:w-[15%] truncate capitalize">{user.isAdmin ? 'Admin' : 'Colaborador'}</span>
                                <div className="w-[20%] sm:w-[10%] flex justify-end items-center gap-2 sm:gap-4 pr-2">
                                    <button className="size-4 sm:size-5 shrink-0 hover:scale-110 transition-transform">
                                        <Edit className="w-full h-full text-[#222222]" />
                                    </button>
                                    <button className="size-4 sm:size-5 cursor-pointer shrink-0 hover:scale-110 transition-transform">
                                        <Trash className="w-full h-full text-red-700 hover:text-red-500" />
                                    </button>
                                </div>
                            </li>
                        ))}
                        {usersList.length === 0 && (
                            <li className="p-4 text-center text-sm text-gray-600">
                                Nenhum colaborador encontrado.
                            </li>
                        )}
                    </ul>

                </div>
            </div>
        </div>
    )
}