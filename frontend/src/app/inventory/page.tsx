'use client'

import { ProductForm } from "@/components/productform";
import { useProductsContext } from "@/hooks/useProductsContext";
import { PlusCircle, Trash, Edit } from "lucide-react"
import { useEffect, useState } from "react";
import { StatusBadge } from '@/components/StatusBadge';

export default function InventoryPage(){
    const { products, getProducts, isLoading, deleteProduct } = useProductsContext();
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);

    useEffect(() => {
        getProducts()
    }, [])

    function toggleProductForm() {
        setIsProductFormOpen(!isProductFormOpen);
    }

    if (isLoading) {
        return (
            <div className="flex-1 flex min-h-screen items-center justify-center bg-slate-50 font-sans">
                <p className="animate-pulse text-lg font-semibold text-slate-500">Carregando estoque...</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-slate-50 h-full p-4 sm:p-8 font-sans w-full">
            
            {/* Topo da Página */}
            <div className="flex flex-row justify-between items-center mb-6 shrink-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Estoque de Produtos</h2>
                <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg h-10 px-4 flex items-center gap-2 transition-colors duration-200 shadow-sm shadow-blue-600/30 active:scale-95" 
                    onClick={toggleProductForm}
                >
                    <PlusCircle className="w-5 h-5" />
                    <span className="text-sm">Novo Produto</span>
                </button>
                {isProductFormOpen && <ProductForm showProductForm={toggleProductForm}/>}
            </div>

            {/* Tabela de Produtos */}
            <div className="flex-1 flex flex-col w-full overflow-hidden mt-2">
                
                {/* Cabeçalho da Lista */}
                <div className="flex flex-row h-12 items-center px-6 bg-white border border-slate-200 rounded-t-xl border-b-0 shadow-sm text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0 gap-2">
                    <span className="w-[30%] sm:w-[25%] flex justify-start">Produto</span>
                    <span className="hidden sm:flex sm:w-[20%] flex justify-start">Cód. Barras</span>
                    <span className="w-[20%] sm:w-[15%] flex justify-start">Validade</span>
                    <span className="w-[15%] sm:w-[10%] flex justify-start">Qtd</span>
                    <span className="w-[15%] sm:w-[20%] flex justify-start">Status</span>
                    <span className="w-[10%] flex justify-end">Ações</span>
                </div>

                {/* Corpo da Lista */}
                <ul className="flex flex-1 flex-col bg-white border border-slate-200 rounded-b-xl shadow-sm overflow-y-auto max-h-[530px] hide-scrollbar">
                    {products.map((product) => (
                        <li 
                            key={product.id} 
                            className="flex flex-row h-16 items-center px-6 text-slate-600 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors duration-150 shrink-0 gap-2 text-xs sm:text-sm"
                        >
                            <span className="w-[30%] sm:w-[25%] flex justify-start truncate font-medium text-slate-800">
                                {product.name}
                            </span>
                            
                            <span className="hidden sm:flex sm:w-[20%] justify-start truncate pr-4 text-slate-500">
                                {product.barcode || 'N/A'}
                            </span>
                            
                            <span className="w-[20%] sm:w-[15%] flex justify-start truncate">
                                {product.expiryDate ? new Date(product.expiryDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-'}
                            </span>
                            
                            <span className="w-[15%] sm:w-[10%] flex justify-start font-semibold text-slate-700">
                                {product.quantity}
                            </span>
                            
                            <span className="w-[15%] sm:w-[20%] flex justify-start">
                                <StatusBadge status={product.status} />
                            </span>
                            
                            <div className="w-[10%] flex justify-end items-center gap-1 sm:gap-3">
                                <button className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                                <button 
                                    className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                    onClick={() => deleteProduct(product.id)}
                                >
                                    <Trash className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </li>
                    ))}

                    {products.length === 0 && (
                        <li className="p-8 text-center text-sm font-medium text-slate-400">
                            Nenhum produto encontrado no estoque.
                        </li>
                    )}
                </ul>

            </div>
        </div>
    )
}