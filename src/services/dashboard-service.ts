'use client'

import { ProductStatus } from "@/contexts/ProductsContext";
import { ProductType } from "@/types/ProductType";

export function DashBoardService(products: ProductType[] ){

    function calculateProductStatus(expiryDate: string): ProductStatus {

        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
            // Forçar parse local: separar ano, mês, dia
            const [year, month, day] = expiryDate.split('-').map(Number);
            const expiry = new Date(year, month - 1, day); // mês começa em 0
    
            if (isNaN(expiry.getTime())) {
                console.warn('Data inválida recebida:', expiryDate);
                return 'expired';
            }
    
            const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
            if (diffDays < 0) return 'expired';
            if (diffDays < 7) return 'critical';
            if (diffDays < 30) return 'alert';
            return 'valid';
    }
    
    const productsWithStatus = products.map(p => ({
            ...p,
            status: calculateProductStatus(p.expiryDate),
    }));
    
    const expiredProducts = productsWithStatus.filter(p => p.status === 'expired');
    const nearExpiryProducts = productsWithStatus.filter(p => p.status === 'alert' || p.status === 'critical');
    const validProducts = productsWithStatus.filter(p => p.status === 'valid');
    
        const financialRisk = [...nearExpiryProducts, ...expiredProducts].reduce((acc, product) => {
        return acc + (product ? product.price * product.quantity : 0);
      }, 0);

    return {
        calculateProductStatus,
        productsWithStatus,
         expiredProducts,
        nearExpiryProducts,
        validProducts,
        financialRisk
    }
}