// frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Saída standalone reduz o tamanho do deploy e melhora compatibilidade com Render
  output: 'standalone',
  
  // Permite que imagens de domínios externos sejam carregadas (se necessário)
  images: {
    unoptimized: true, // evita erro com sharp em ambiente Node
  },
  
  // Desabilita a telemetria da Vercel (opcional)
  reactStrictMode: true,
  
  // Configurações de ambiente público (acessíveis no cliente)
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
};

module.exports = nextConfig;