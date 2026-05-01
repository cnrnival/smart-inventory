"use client";
import { axios_api } from "@/api/axios_api";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

// ==================================================
// TIPO USUÁRIO (com password opcional apenas para o mock)
// Quando migrar para Flask, remova o campo password e faça a autenticação no back-end.
// ==================================================
export type User = {
  id: string;
  name: string;
  email: string;
  document: string;
  isAdmin: boolean;
  password?: string; // 🔴 Temporário – remova ao integrar com Flask
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  usersList: User[];
  registerUser: (newUser: User, isAdmin: boolean) => Promise<void>;
  findUserByEmailAndPassword: (email: string, password: string) => Promise<User | null>;
  getUsers: () => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Carrega o usuário do localStorage ao iniciar (client‑side)
  const [user, setUserState] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('smart_inventory_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [usersList, setUsersList] = useState<User[]>([]);

  // ✅ Persiste no localStorage sempre que o usuário mudar
  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      // Remove a senha antes de salvar (segurança)
      const { password, ...userToStore } = newUser;
      localStorage.setItem('smart_inventory_user', JSON.stringify(userToStore));
    } else {
      localStorage.removeItem('smart_inventory_user');
    }
  };

  const logout = () => setUser(null);

  async function registerUser(newUser: User, isAdmin: boolean) {
    try {
      const response = await axios_api.post("/users", newUser);
      const createdUser = response.data;
      if (isAdmin === true) {
        // Não armazena a senha no contexto
        const { password, ...userWithoutPassword } = createdUser;
        setUser(userWithoutPassword);
      } else {
        setUsersList((prev) => [...prev, createdUser]);
        toast.success("Colaborador registrado!");
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      toast.error("Erro ao criar conta. Tente novamente.");
    }
  }

  // ✅ Busca pelo email e compara a senha no front (temporário, evita dupla query)
  async function findUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const cleanEmail = email.trim();
      const response = await axios_api.get(`/users?email=${cleanEmail}`);
      const users = response.data;
      const found = users.find((u: User) => u.password === password.trim());
      if (found) {
        // Não retorna a senha
        const { password: _, ...userWithoutPassword } = found;
        return userWithoutPassword;
      }
      return null;
    } catch (error) {
      console.error("Erro no login:", error);
      return null;
    }
  }

  async function getUsers() {
    try {
      const response = await axios_api.get(`/users`);
      setUsersList(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        user,
        setUser,
        logout,
        findUserByEmailAndPassword,
        usersList,
        getUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}