'use client';
import { createContext, useState } from "react";
import { ProductType } from "../types/ProductType";
import { axios_api } from "@/services/axios_api";

type ProductsContextType = {
    products: ProductType[];
    addProduct: (product: ProductType) => Promise<void>;
    getProducts: () => Promise<void>;
}

export const ProductsContext = createContext({} as ProductsContextType);

export const ProductsContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [products, setProducts] = useState<ProductType[]>([]);

    async function addProduct(newProduct: Omit<ProductType, 'id'>) {
        const response = await axios_api.post('/products', newProduct);
        setProducts([...products, response.data]);

    }

    async function getProducts() {
        const response = await axios_api.get('/products');
        setProducts(response.data);
    }
    

    return <ProductsContext.Provider value={{ products, addProduct, getProducts }}>
        {children}
    </ProductsContext.Provider>
}