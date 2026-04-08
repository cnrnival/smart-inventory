// import { api } from '@/services/api';  // (não usado, mantido comentado)
import { useState, useEffect, useCallback } from 'react';
import { Product, Batch, calculateBatchStatus } from '@/types/inventory';
import { axios_api } from '@/services/axios_api';

// Chaves do localStorage (fallback enquanto não há API real)
const PRODUCTS_KEY = 'smart_inventory_products';
const BATCHES_KEY = 'smart_inventory_batches';

// Função auxiliar para carregar dados do localStorage (fallback)
function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

export function useInventory() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>(() => loadFromStorage(PRODUCTS_KEY, []));
  const [batches, setBatches] = useState<Batch[]>(() => loadFromStorage(BATCHES_KEY, []));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Busca produtos e lotes simultaneamente (Promise.all)
        const [productsResponse, batchesResponse] = await Promise.all([
          axios_api.get('/products'),
          axios_api.get('/batches')
        ]);

        const fetchedProducts = productsResponse.data;
        const fetchedBatches = batchesResponse.data;

        setProducts(fetchedProducts);
        setBatches(fetchedBatches);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Em caso de erro, mantém os dados do localStorage (fallback)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  // ---------- CRUD ----------
  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...product, id: crypto.randomUUID() };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  }, []);

  const addBatch = useCallback((batch: Omit<Batch, 'id' | 'status'>) => {
    const status = calculateBatchStatus(batch.expiryDate);
    const newBatch: Batch = { ...batch, id: crypto.randomUUID(), status };
    setBatches(prev => [...prev, newBatch]);
    return newBatch;
  }, []);

  const partialWithdrawal = useCallback((batchId: string, quantity: number) => {
    setBatches(prev =>
      prev.map(b => {
        if (b.id !== batchId) return b;
        const status = calculateBatchStatus(b.expiryDate);
        if (status === 'expired') return b; // não permite baixa em lotes vencidos
        return { ...b, quantity: Math.max(0, b.quantity - quantity) };
      })
    );
  }, []);

  // ---------- Dados derivados (sempre atualizados) ----------
  const batchesWithStatus = batches.map(b => ({
    ...b,
    status: calculateBatchStatus(b.expiryDate),
  }));

  const expiredBatches = batchesWithStatus.filter(b => b.status === 'expired');
  const nearExpiryBatches = batchesWithStatus.filter(b => b.status === 'alert' || b.status === 'critical');
  const validBatches = batchesWithStatus.filter(b => b.status === 'valid');

  const financialRisk = [...nearExpiryBatches, ...expiredBatches].reduce((acc, batch) => {
    const product = products.find(p => p.id === batch.productId);
    return acc + (product ? product.unitCost * batch.quantity : 0);
  }, 0);

  const getFEFOBatches = useCallback(
    (productId: string) => {
      return batchesWithStatus
        .filter(b => b.productId === productId && b.status !== 'expired')
        .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
    },
    [batchesWithStatus]
  );

  return {
    products,
    batches: batchesWithStatus,
    expiredBatches,
    nearExpiryBatches,
    validBatches,
    financialRisk,        
    isLoading,
    addProduct,
    addBatch,
    getFEFOBatches,
    partialWithdrawal,
  };
}