'use client'
import { createContext } from "react";
import { ReactNode } from "react";
import { useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean
    login: () => void;
    logoff: () => void
}

export const AuthContext = createContext<AuthContextType | null >(null);

export function AuthProvider({children}: {children:  ReactNode}){
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logoff = () => setIsAuthenticated(false)

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logoff}}>
            {children}
        </AuthContext.Provider>
    )
}
