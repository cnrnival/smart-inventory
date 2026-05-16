'use client';

import { useState } from 'react';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useRouter } from 'next/navigation';
import { axios_api } from '@/api/axios_api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Chamada para o seu novo servidor no Render
      // Passamos os dados via query params conforme seu server.js espera no GET /users
      const response = await axios_api.get(`/users?email=${email}&password=${password}`);
      
      const users = response.data;

      if (users.length > 0) {
        // Pega o primeiro usuário encontrado
        const userFound = users[0];
        
        // Salva no contexto global
        login(userFound);
        
        //Redireciona para a Dashboard
        router.push('/');
      } else {
        alert('Usuário ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao conectar com o servidor');
    }
  };

  return (
    //  garanta que o onSubmit={handleSubmit} esteja no <form>
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  );
}