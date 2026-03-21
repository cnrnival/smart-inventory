'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product, Batch, calculateBatchStatus } from '@/types/inventory';

// Chaves do localStorage
const PRODUCTS_KEY = 'smart_inventory_products';
const BATCHES_KEY = 'smart_inventory_batches';

/**
 * Carrega dados do localStorage com fallback.
 */
function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

export function useInventory() {
  // Estados principais
  const [products, setProducts] = useState<Product[]>(() => loadFromStorage(PRODUCTS_KEY, []));
  const [batches, setBatches] = useState<Batch[]>(() => loadFromStorage(BATCHES_KEY, []));

  // Persistência automática
  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(BATCHES_KEY, JSON.stringify(batches));
  }, [batches]);

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
        if (status === 'expired') return b; // bloqueia baixa em vencidos
        return { ...b, quantity: Math.max(0, b.quantity - quantity) };
      })
    );
  }, []);

  // ---------- Dados derivados ----------
  const batchesWithStatus = batches.map(b => ({
    ...b,
    status: calculateBatchStatus(b.expiryDate),
  }));

  const expiredBatches = batchesWithStatus.filter(b => b.status === 'expired');
  const nearExpiryBatches = batchesWithStatus.filter(b => b.status === 'alert' || b.status === 'critical');
  const validBatches = batchesWithStatus.filter(b => b.status === 'valid');

  /**
   * Risco financeiro (RF05): soma do valor (unitCost * quantity)
   * dos lotes em alerta, crítico ou vencidos.
   */
  const financialRisk = [...nearExpiryBatches, ...expiredBatches].reduce((acc, batch) => {
    const product = products.find(p => p.id === batch.productId);
    return acc + (product ? product.unitCost * batch.quantity : 0);
  }, 0);

  /**
   * Retorna lotes de um produto ordenados por data de vencimento (mais próximo primeiro),
   * excluindo os vencidos. Útil para lógica FEFO.
   */
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
    addProduct,
    addBatch,
    getFEFOBatches,
    partialWithdrawal,
  };
}