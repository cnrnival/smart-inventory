'use client';
import { createContext, useState } from "react";
import { ProductType } from "../types/ProductType";
import { axios_api } from "@/services/axios_api";

export type ProductStatus = 'valid' | 'alert' | 'critical' | 'expired';

const statusConfig: Record<ProductStatus, { label: string; className: string }> = {
    valid: { label: 'Válido', className: 'bg-green-100 text-green-800 border-green-200' },
    alert: { label: 'Alerta', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    critical: { label: 'Crítico', className: 'bg-red-100 text-red-800 border-red-200' },
    expired: { label: 'Vencido', className: 'bg-gray-100 text-gray-800 border-gray-300' },
};

type ProductsContextType = {
    products: ProductType[];
    addProduct: (product: ProductType) => Promise<void>;
    getProducts: () => Promise<void>;
    isLoading: boolean;
    expiredProducts: ProductType[];
    nearExpiryProducts: ProductType[];
    validProducts: ProductType[];
    statusConfig: typeof statusConfig;
    financialRisk: number;
};

export const ProductsContext = createContext({} as ProductsContextType);

export const ProductsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    async function addProduct(newProduct: Omit<ProductType, 'id'>) {
        const response = await axios_api.post('/products', newProduct);
        setProducts([...products, response.data]);
    }

    async function getProducts() {
        setIsLoading(true);
        const response = await axios_api.get('/products');
        setProducts(response.data);
        setIsLoading(false);
    }

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

    return (
        <ProductsContext.Provider value={{
            products: productsWithStatus,
            addProduct,
            getProducts,
            isLoading,
            expiredProducts,
            nearExpiryProducts,
            validProducts,
            statusConfig,
            financialRisk,
        }}>
            {children}
        </ProductsContext.Provider>
    );
};

// StatusBadge
interface StatusBadgeProps {
    status: ProductStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const { label, className } = statusConfig[status];
    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${className}`}>
            {label}
        </span>
    );
}
