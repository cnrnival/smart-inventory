'use client'

import { useAuthContext } from "@/hooks/useAuthContext"

export default function Profile() {

    const { user } = useAuthContext();

    return (
        <div className="h-[calc(100vh-60px)] w-screen ">
            <div className="w-6xl h-full mx-auto flex flex-col">
                <h2 className="text-black">{user?.name}</h2>
                <span>{user?.email}</span>

            </div>
        </div>
    )
}