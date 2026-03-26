
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


let mockProducts: Product[] = [
  { id: 'p1', name: 'Dipirona 500mg', sku: 'MED-001', unitCost: 5.50, category: 'Medicamento', subcategory: 'Analgésico' },
  { id: 'p2', name: 'Amoxicilina 500mg', sku: 'MED-002', unitCost: 15.90, category: 'Medicamento', subcategory: 'Antibiótico' },
  { id: 'p3', name: 'Ibuprofeno 400mg', sku: 'MED-003', unitCost: 8.00, category: 'Medicamento', subcategory: 'Anti-inflamatório' },
];

let mockBatches: Batch[] = [

{ id: 'b1', productId: 'p1', batchCode: 'LOTE-A100', quantity: 200, expiryDate: addDays(-20)},
  { id: 'b2', productId: 'p1', batchCode: 'LOTE-A101', quantity: 50, expiryDate: addDays(15)},
  { id: 'b3', productId: 'p2', batchCode: 'LOTE-B200', quantity: 150, expiryDate: addDays(90)},
  { id: 'b4', productId: 'p2', batchCode: 'LOTE-B201', quantity: 20, expiryDate: addDays(-5)},
  { id: 'b5', productId: 'p3', batchCode: 'LOTE-C300', quantity: 80, expiryDate: addDays(5)},
  { id: 'b6', productId: 'p3', batchCode: 'LOTE-C301', quantity: 300, expiryDate: addDays(200)},

//ajuda a fazer a localização pro calculo automatico dos dias!
].map(batch => ({
  ...batch,
  status: calculateBatchStatus(batch.expiryDate)
})) as Batch[];


export const api = {
  getProducts: () => 
    new Promise<Product[]>(resolve => setTimeout(() => resolve([...mockProducts]), 500)),
  
  createProduct: (product: Omit<Product, 'id'>) => 
    new Promise<Product>(resolve => {
      const newProduct = { ...product, id: crypto.randomUUID() } as Product;
      mockProducts.push(newProduct);
      setTimeout(() => resolve(newProduct), 500);
    }),
  
  getBatches: () => 
    new Promise<Batch[]>(resolve => setTimeout(() => resolve([...mockBatches]), 500)),
  
  createBatch: (batch: Omit<Batch, 'id' | 'status'>) => 
    new Promise<Batch>(resolve => {
      const newBatch = { 
        ...batch, 
        id: crypto.randomUUID(), 
        status: calculateBatchStatus(batch.expiryDate) 
      } as Batch;
      mockBatches.push(newBatch);
      setTimeout(() => resolve(newBatch), 500);
    }),
};