'use client';

// ==================================================
// ARQUIVO: hooks/useAuth.ts
// DESCRIÇÃO: Hook para gerenciar usuários (registro, busca)
// com persistência automática no localStorage.
// ==================================================

import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types/inventory';

// Chave usada para armazenar os usuários no localStorage
const USERS_KEY = 'smart_inventory_users';

/**
 * Carrega dados do localStorage com fallback.
 * @param key - Chave no localStorage
 * @param fallback - Valor padrão se não houver dados
 * @returns Array do tipo T
 */
function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

export function useAuth() {
  // Estado que armazena a lista de usuários, inicializado com dados do localStorage
  const [users, setUsers] = useState<User[]>(() => loadFromStorage(USERS_KEY, []));

  // Salva automaticamente no localStorage sempre que a lista de usuários mudar
  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  /**
   * Registra um novo usuário.
   * @param userData - Dados do usuário (sem o id)
   * @returns O usuário criado (com id)
   */
  const registerUser = useCallback((userData: Omit<User, 'id'>) => {
    const newUser: User = { ...userData, id: crypto.randomUUID() };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  }, []);

  /**
   * Busca um usuário pelo email.
   * @param email - Email do usuário
   * @returns Usuário encontrado ou undefined
   */
  const findUserByEmail = useCallback((email: string) => {
    return users.find(u => u.email === email);
  }, [users]);

  return { users, registerUser, findUserByEmail };
}