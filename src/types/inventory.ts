// Representa um usuário do sistema
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Representa um produto
export interface Product {
  id: string;               // ID único
  sku: string;              // Código SKU
  name: string;             // Nome do produto
  category: string;         // Categoria principal
  subcategory: string;      // Subcategoria (pode ser vazia)
  unitCost: number;         // Custo por unidade (R$)
}

// Representa um lote
export interface Batch {
  id: string;
  productId: string;
  batchCode: string;
  manufacturingDate: string; 
  expiryDate: string;
  quantity: number;
  status: 'valid' | 'alert' | 'critical' | 'expired'; 
}

// Tipo auxiliar para o status
export type BatchStatus = Batch['status'];

/**
 * Calcula o status do lote com base na data de vencimento (RF04)
 * @param expiryDate - Data no formato YYYY-MM-DD
 * @returns Status correspondente: 'valid' | 'alert' | 'critical' | 'expired'
 */
export function calculateBatchStatus(expiryDate: string): BatchStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ignora horas
  const expiry = new Date(expiryDate);
  const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'expired';      // Já passou
  if (diffDays < 7) return 'critical';     // Menos de 7 dias → vermelho
  if (diffDays < 30) return 'alert';       // Entre 7 e 29 → amarelo
  return 'valid';                           // 30+ dias → verde
}