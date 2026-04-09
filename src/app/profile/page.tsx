'use client'

import { useAuthContext } from "@/hooks/useAuthContext"

export default function Profile() {

    const {user} = useAuthContext();

    return (
        <div className="h-[calc(100vh-60px)] text-white bg-[#262626] flex flex-col ">
            <h1 className="text-3xl font-bold">Perfil do Usuário</h1>
            <span>{user?.name}</span>
            <span>{user?.email}</span>
            <span>{user?.document}</span>
        </div>
    )
}