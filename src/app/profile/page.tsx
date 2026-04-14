'use client'

import { useAuthContext } from "@/hooks/useAuthContext"

export default function Profile() {

    const { user } = useAuthContext();

    return (
        <div className="h-[calc(100vh-60px)] w-screen bg-[#E8E9E8]">

            <div className="w-6xl h-[600px] mx-auto flex flex-col mt-6 p-4 bg-[#c9c9c9] rounded-md shadow-md shadow-black/50 text-black/70">

                <h2 className="font-bold my-2 h-[40px] w-[250px] text-[#6b9dff] text-3xl">Perfil</h2>

                <div className="text-black h-[40px] w-[250px] flex flex-row jsutify-between items-center my-2">
                    <h2 className='flex items-center justify-center w-[25%] h-full'>Nome:</h2>
                    <h2 className="flex-1 h-full bg-white flex items-center justify-center rounded-md">{user?.name}</h2>
                </div>

                <div className="text-black h-[40px] w-[250px] flex flex-row jsutify-between items-center my-2">
                    <h2 className='flex items-center justify-center w-[25%] h-full'>E-mail:</h2>
                    <h2 className="flex-1 h-full bg-white flex items-center justify-center rounded-md">{user?.email}</h2>
                </div>
                <div className="text-black h-[40px] w-[250px] flex flex-row jsutify-between items-center my-2">
                    <h2 className='flex items-center justify-center w-[25%] h-full'>Doc:</h2>
                    <h2 className="flex-1 h-full bg-white flex items-center justify-center rounded-md">{user?.document}</h2>
                </div>

            </div>
        </div>
    )
}

export type User = {
    id: string;
    name: string;
    email: string;
    document: string;
    isAdmin: boolean;
}