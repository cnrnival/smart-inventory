
import { Product, Batch } from '@/types/inventory';

const addDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

const calculateBatchStatus = (expiryDate: string | Date): 'valid' | 'alert' | 'expired' | 'critical' => {
  const today = new Date();
  const expDate = new Date(expiryDate);
  const diffTime = expDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'expired';
  if (diffDays <= 7) return 'critical';
  if (diffDays <= 30) return 'alert';
  return 'valid';
};

//produtos mockados enquanto não tem dados de produtos registrados


// export const api = {
//   getProducts: () => 
//     new Promise<Product[]>(resolve => setTimeout(() => resolve([...mockProducts]), 500)),
  
//   createProduct: (product: Omit<Product, 'id'>) => 
//     new Promise<Product>(resolve => {
//       const newProduct = { ...product, id: crypto.randomUUID() } as Product;
//       //mockProducts.push(newProduct);
//       setTimeout(() => resolve(newProduct), 500);
//     }),
  
//   getBatches: () => 
//     new Promise<Batch[]>(resolve => setTimeout(() => resolve([...mockBatches]), 500)),
  
//   createBatch: (batch: Omit<Batch, 'id' | 'status'>) => 
//     new Promise<Batch>(resolve => {
//       const newBatch = { 
//         ...batch, 
//         id: crypto.randomUUID(), 
//         status: calculateBatchStatus(batch.expiryDate) 
//       } as Batch;
//       mockBatches.push(newBatch);
//       setTimeout(() => resolve(newBatch), 500);
//     }),
// };