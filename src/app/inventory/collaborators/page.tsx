'use client'
import { UserForm } from "@/components/userform";
import { PlusCircle } from "lucide-react"
import { useState } from "react";

export default function CollaboratorsPage(){

    const [isCollaboratorFormOpen, setIsCollaboratorFormOpen] = useState(false);

    const collaborators = [
        {id: 1, name: 'lara'},
        {id: 2, name: 'kelso'},
        {id: 3, name: 'torugo'},
        {id: 4, name: 'gus'},
        {id: 5, name: 'jonathas'},
        {id: 6, name: 'william'}
    ]

      function ShowCollaboratorForm() {
        setIsCollaboratorFormOpen(!isCollaboratorFormOpen);
    }
    

    return (
        <div className="flex-1 flex flex-col bg-[#E8E9E8] h-full">
            <div className="flex ml-4 mt-4 mr-4 flex-row justify-between items-center">
                 <h2 className="text-2xl font-bold text-black">Colaboradores</h2>
                 <button className=" bg-[#6b9dff] flex items-center justify-center text-white font-bold rounded-md h-[30px] w-[100px] rounded-md gap-1  shadow-sm shadow-black/70" onClick={ShowCollaboratorForm}>
                        <PlusCircle className="w-[15px] h-[15px] " />
                        <span className="text-sm">Colab...</span>
                    </button>
                    {isCollaboratorFormOpen && <UserForm isAdmin={false} isInInventoryPage={true} ShowCollaboratorForm={ShowCollaboratorForm}/>}
            </div>
            <div className="mx-4 flex flex-row h-[50px] justify-between  flex items-center rounded-t-md  p-4 shrink-0 text-black border-b border-black/50 flex flex-row items-center gap-4 space-between bg-[#c9c9c9] shadow-md shadow-black/70 mt-4">
                <span>nome</span>
                <span>email</span>
                <span>tipo de acesso</span>
            </div>
            <ul className="mx-4 flex flex-1 flex-col bg-[#c9c9c9] rounded-b-md overflow-y-auto max-h-[530px] hide-scrollbar shadow-md shadow-black/70">
                    {collaborators.map((collaborator) => (
                        <li key={collaborator.id} className="w-full flex flex-row h-[50px] justify-between  flex items-center rounded-md p-4 shrink-0 text-black border-b border-black/50 flex flex-row items-center gap-4 space-between">
                            <span className="w-[65%] truncate">{collaborator.name}</span>
                            
                        </li>
                    ))}

            </ul>
        </div>
    )
}