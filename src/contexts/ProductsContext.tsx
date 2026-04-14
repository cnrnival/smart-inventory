'use client';
import { createContext, useState, useMemo } from "react";
import { ProductType } from "../types/ProductType";
import { axios_api } from "@/api/axios_api";

import { DashBoardService } from '@/services/dashboard-service'

export type ProductStatus = 'valid' | 'alert' | 'critical' | 'expired';

const statusConfig: Record<ProductStatus, { label: string; className: string }> = {
    valid: { label: 'Válido', className: 'bg-green-100 text-green-800 border-green-200' },
    alert: { label: 'Alerta', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    critical: { label: 'Crítico', className: 'bg-red-100 text-red-800 border-red-200' },
    expired: { label: 'Vencido', className: 'bg-gray-100 text-gray-800 border-gray-300' },
};

type ProductsContextType = {
    products: ProductType[];
    addProduct: (product: Omit<ProductType, 'status'>) => Promise<void>;
    getProducts: () => Promise<void>;
    isLoading: boolean;
    expiredProducts: ProductType[];
    nearExpiryProducts: ProductType[];
    validProducts: ProductType[];
    statusConfig: typeof statusConfig;
    financialRisk: number;
    findProductByName: (name: string) => Promise<ProductType[]>;
};

export const ProductsContext = createContext({} as ProductsContextType);

export const ProductsContextProvider = ({ children }: { children: React.ReactNode }, ) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { 
        productsWithStatus, 
        expiredProducts, 
        nearExpiryProducts, 
        validProducts, 
        financialRisk 
    } = useMemo(() => DashBoardService(products), [products]);


//   funcoes api
    async function addProduct(newProduct: Omit<ProductType, 'status'>) {
        const response = await axios_api.post('/products', newProduct);
        setProducts([...products, response.data]);
    }

    async function getProducts() {
        setIsLoading(true);
        const response = await axios_api.get('/products');
        setProducts(response.data);
        setIsLoading(false);
    }

    async function findProductByName(name: string){
        const response = await axios_api.get(`/products?name=${name}`)
        return response.data;
    }

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
            findProductByName
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
