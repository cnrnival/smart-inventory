'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function VerifyCodePage() {
  const router = useRouter();
  // const { registerUser } = useAuth();
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedCode = sessionStorage.getItem('verification_code');
    const tempUser = sessionStorage.getItem('temp_user');

    if (!storedCode || !tempUser) {
      toast.error('Nenhum cadastro em andamento. Volte e tente novamente.');
      router.push('/create-account');
      return;
    }

    if (code === storedCode) {
      const user = JSON.parse(tempUser);
      // ✅ chamada restaurada
      // registerUser({ name: user.name, email: user.email, password: user.password });

      sessionStorage.removeItem('temp_user');
      sessionStorage.removeItem('verification_code');

      toast.success('Conta criada com sucesso!');
      router.push('/login');
    } else {
      toast.error('Código inválido. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
          <h1 className="text-center text-2xl font-bold">Verificar Código</h1>
          <p className="mt-2 text-center text-gray-600">
            Digite o código de 6 dígitos enviado para seu e-mail.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="code" className="mb-1 block text-sm font-medium">Código de Verificação</label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-lg tracking-widest outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90"
            >
              Validar Código
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}