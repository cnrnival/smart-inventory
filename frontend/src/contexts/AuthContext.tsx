'use client'

import { createContext, useState, ReactNode, useCallback } from "react";
import { axios_api } from "@/api/axios_api";

// Definição da estrutura do usuário
interface User {
  id: string;
  name: string;
  email: string;
  document?: string;
  role?: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  usersList: User[];
  login: (userData: User) => void;
  logout: () => void;
  getUsers: () => Promise<void>;
  registerUser: (userData: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);

  //Login simples: recebe os dados do usuário e salva no estado
  const login = (userData: User) => setUser(userData);
  
  const logout = () => {
    setUser(null);
    setUsersList([]);
  };

  //Busca lista de usuários/colaboradores da API
  const getUsers = useCallback(async () => {
    try {
      const response = await axios_api.get('/users');
      // Garante que o dado retornado seja sempre um Array
      const data = Array.isArray(response.data) ? response.data : response.data.users ?? [];
      setUsersList(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }, []);

  //Registra novo usuário e atualiza a lista local
  const registerUser = async (userData: any) => {
    try {
      await axios_api.post('/users', userData);
      await getUsers(); 
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, usersList, login, logout, getUsers, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
}