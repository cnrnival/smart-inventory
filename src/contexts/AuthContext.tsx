'use client'
import { axios_api } from "@/app/api/axios_api";
import { createContext } from "react";
import { ReactNode } from "react";
import { useState } from "react";

export type User = {
    id: string;
    name: string;
    email: string;
    document: string;
    isAdmin: boolean;
}


type AuthContextType = {
    user: User | null;
    registerUser: (newUser: User) => Promise<void>;
    findUser: (id: string) => Promise<boolean>;
    // findUserByEmailAndPassword: (email: string, password: string) => Promise<boolean>
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({children}: {children:  ReactNode}){

    const [user, setUser] = useState<User | null>(null);

    async function registerUser(newUser: User) {
        const response = await axios_api.post('/users', newUser)
        setUser(response.data);

    }
     
    async function findUser(id: string){
        try {
            const response = await axios_api.get(`/users/${id}`);
            return !!response.data; // Retorna true se tiver dados
        } catch (error) {
            // Se o Axios jogar um erro 404, capturamos aqui e retornamos false
            return false;
        }
    }

    return(
        <AuthContext.Provider value={{
            registerUser,
            user,
            findUser
            // findUserByEmailAndPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}
