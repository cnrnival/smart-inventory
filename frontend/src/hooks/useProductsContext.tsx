import { ProductsContext } from "@/contexts/ProductsContext";
import { useContext } from "react";

export function useProductsContext() {
    const contexto = useContext(ProductsContext);
    return contexto;
}