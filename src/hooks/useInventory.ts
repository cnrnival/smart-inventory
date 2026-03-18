'use client';

import { useState, useEffect, useCallback } from 'react';
// import { User } from '@/types/inventory';

const USERS_KEY = 'smart_inventory_users';

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

// export function useInventory() {
//   const [users, setUsers] = useState<User[]>(() => loadFromStorage(USERS_KEY, []));

  // Salva usuários no localStorage sempre que mudar
  // useEffect(() => {
  //   localStorage.setItem(USERS_KEY, JSON.stringify(users));
  // }, [users]);

  // Registra um novo usuário
  // const registerUser = useCallback((user: Omit<User, 'id'>) => {
  //   const newUser: User = { ...user, id: crypto.randomUUID() };
  //   setUsers(prev => [...prev, newUser]);
  //   return newUser;
  // }, []);

  // Busca um usuário por email (para login)
  const findUserByEmail = useCallback((email: string) => {
    return users.find(u => u.email === email);
  }, [users]);

  return {
    users,
    registerUser,
    findUserByEmail,
  };
}