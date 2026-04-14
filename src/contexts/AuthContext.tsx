'use client'
import { axios_api } from "@/app/api/axios_api";
import { createContext, ReactNode, useState } from "react";

export type User = {
    id: string;
    name: string;
    email: string;
    document: string;
    isAdmin: boolean;
}


type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
    registerUser: (newUser: User) => Promise<void>;
    findUserByEmailAndPassword: (email: string, password: string) => Promise<User>
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({children}: {children:  ReactNode}){
''
    const [user, setUser] = useState<User | null>(null);

    async function registerUser(newUser: User) {
        const response = await axios_api.post('/users', newUser)
        setUser(response.data);

    }

    async function findUserByEmailAndPassword(email: string, password: string){
        try {
            const response = await axios_api.get(`/users?name=${email}&password=${password}`);
           return response.data[0];
        } catch (error) {
            console.log(error)
            return;
        }
    }
     
    // async function findUser(id: string){
    //     try {
    //         const response = await axios_api.get(`/users/${id}`);
    //         return !!response.data; // Retorna true se tiver dados
    //     } catch (error) {
    //         // Se o Axios jogar um erro 404, capturamos aqui e retornamos false
    //         return false;
    //     }
    // }

    return(
        <AuthContext.Provider value={{
            registerUser,
            user,
            setUser,
            findUserByEmailAndPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}
