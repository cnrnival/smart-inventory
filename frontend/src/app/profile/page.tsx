'use client'

import { useAuthContext } from "@/hooks/useAuthContext"

export type User = {
    id: string;
    name: string;
    email: string;
    document: string;
    isAdmin: boolean;
}

export default function Profile() {
    const { user } = useAuthContext();

    return (
        <div className="min-h-[calc(100vh-60px)] w-full bg-[#E8E9E8] p-4 sm:p-8 flex justify-center items-start">
            
            <div className="w-full max-w-2xl flex flex-col mt-2 sm:mt-6 p-4 sm:p-8 bg-[#c9c9c9] rounded-md shadow-md shadow-black/50 text-black/70">
                
                <h2 className="font-bold mb-6 text-[#6b9dff] text-2xl sm:text-3xl">
                    Perfil
                </h2>

                <div className="flex flex-col sm:flex-row sm:items-center w-full mb-4 gap-1 sm:gap-4">
                    <span className="text-black font-semibold sm:w-[100px] shrink-0">Nome:</span>
                    <div className="flex-1 min-h-[40px] bg-white flex items-center px-3 rounded-md text-black overflow-hidden">
                        <span className="truncate w-full">{user?.name}</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center w-full mb-4 gap-1 sm:gap-4">
                    <span className="text-black font-semibold sm:w-[100px] shrink-0">E-mail:</span>
                    <div className="flex-1 min-h-[40px] bg-white flex items-center px-3 rounded-md text-black overflow-hidden">
                        <span className="truncate w-full">{user?.email}</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center w-full mb-4 gap-1 sm:gap-4">
                    <span className="text-black font-semibold sm:w-[100px] shrink-0">Doc:</span>
                    <div className="flex-1 min-h-[40px] bg-white flex items-center px-3 rounded-md text-black overflow-hidden">
                        <span className="truncate w-full">{user?.document}</span>
                    </div>
                </div>

            </div>
            
        </div>
    )
}