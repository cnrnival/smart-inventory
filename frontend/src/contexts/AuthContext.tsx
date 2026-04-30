"use client";
import { axios_api } from "@/api/axios_api";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

export type User = {
  id: string;
  name: string;
  email: string;
  document: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  usersList: User[];
  registerUser: (newUser: User, isAdmin: boolean) => Promise<void>;
  findUserByEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<User>;
  getUsers: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);

  async function registerUser(newUser: User, isAdmin: boolean) {
    const response = await axios_api.post("/users", newUser);
    const createdUser = response.data;

    if (isAdmin == true) {
      setUser(createdUser);
    } else {
      setUsersList((prevList) => [...prevList, createdUser]);
      toast.success("Colaborador registrado!");
    }
  }
  async function findUserByEmailAndPassword(email: string, password: string) {
    try {
      // Usamos trim() para remover espaços acidentais que o teclado do celular ou Windows pode colocar
      const cleanEmail = email.trim();
      const cleanPassword = password.trim();

      const response = await axios_api.get(
        `/users?email=${cleanEmail}&password=${cleanPassword}`,
      );

      // Verificamos se a lista não está vazia antes de retornar
      if (response.data && response.data.length > 0) {
        return response.data[0];
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
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        user,
        setUser,
        findUserByEmailAndPassword,
        usersList,
        getUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
