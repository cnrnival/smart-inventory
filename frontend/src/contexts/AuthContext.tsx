'use client'

import { createContext, useState, ReactNode } from "react";
import { axios_api } from "@/api/axios_api";

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
  registerUser: (userData: any) => Promise<void>; // ✅ Adicionado para resolver o erro
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);

  const login = (userData: User) => setUser(userData);
  
  const logout = () => {
    setUser(null);
    setUsersList([]);
  };

  const getUsers = async () => {
    try {
      const response = await axios_api.get('/users');
      const data = Array.isArray(response.data) ? response.data : response.data.users ?? [];
      setUsersList(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // ✅ Nova função de registro adicionada
  const registerUser = async (userData: any) => {
    try {
      await axios_api.post('/users', userData);
      await getUsers(); // Atualiza a lista após cadastrar
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