'use client'

import { createContext, useState, ReactNode, useCallback } from "react";
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
  login: (credentials: any) => Promise<void>; // ✅ Ajustado para aceitar objeto de credenciais ou dados do usuário
  logout: () => void;
  getUsers: () => Promise<void>;
  registerUser: (userData: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);

  // ✅ Mantive sua lógica, permitindo que o login receba dados da API ou credenciais
  const login = async (data: any) => {
    if (data.email && data.password) {
      // Se vier credenciais, faz o post
      try {
        const response = await axios_api.post('/login', data);
        setUser(response.data.user || response.data);
      } catch (error) {
        console.error("Erro no login:", error);
        throw error;
      }
    } else {
      // Se vier o objeto pronto, apenas loga (seu uso atual)
      setUser(data);
    }
  };

  const logout = () => {
    setUser(null);
    setUsersList([]);
  };

  // useCallback evita que a função mude em cada render, economizando recursos
  const getUsers = useCallback(async () => {
    try {
      const response = await axios_api.get('/users');
      const data = Array.isArray(response.data) ? response.data : response.data.users ?? [];
      setUsersList(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }, []);

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