'use client'

import { createContext, useState, ReactNode } from "react";
import { axios_api } from "@/api/axios_api";

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  usersList: User[]; // ✅ Adicionado para a página de colaboradores
  login: (userData: User) => void;
  logout: () => void;
  getUsers: () => Promise<void>; // ✅ Adicionado para buscar a lista
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]); // ✅ Estado da lista

  const login = (userData: User) => setUser(userData);
  const logout = () => {
    setUser(null);
    setUsersList([]);
  };

  const getUsers = async () => {
    try {
      const response = await axios_api.get('/users');
      // Ajuste conforme o retorno da sua API (se é array direto ou tem .users)
      const data = Array.isArray(response.data) ? response.data : response.data.users ?? [];
      setUsersList(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, usersList, login, logout, getUsers }}>
      {children}
    </AuthContext.Provider>
  );
}