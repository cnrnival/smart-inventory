'use client'
import { createContext, useContext } from "react";
import { ReactNode } from "react";
import { useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean
    login: () => void;
    logoff: () => void
}

const AuthContext = createContext<AuthContextType | null >(null);

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

export function useTestAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth deve ser usado dentro de AuthProvider')
    }
    return context;
}