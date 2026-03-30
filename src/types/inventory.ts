// Representa um usuário do sistema
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Representa um produto
export interface Product {
  id: string;
  name: string;
  category: string;
  manufacturingDate: string;
  expiryDate: string;
  price: number;
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

export type BatchStatus = Batch['status'];

export function calculateBatchStatus(expiryDate: string): BatchStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'expired';
  if (diffDays < 7) return 'critical';
  if (diffDays < 30) return 'alert';
  return 'valid';
}