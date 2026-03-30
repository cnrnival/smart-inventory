'use client'
import { ProductForm } from "@/components/productform";
import { useState } from "react";

export default function InventoryPage() {

    const [isProductFormOpen, setIsProductFormOpen] = useState(false);

    function ShowProductForm(){
        setIsProductFormOpen(!isProductFormOpen);
    }
    return (
        <div className="w-full h-[calc(100vh-60px)] flex flex-col bg-[#1a1a1a]">
            <div className="w-full h-[60px] bg-green-200 flex flex-row items-center justify-between px-10">
                <h2 className="text-2xl font-bold">Gerenciamento de Estoque</h2>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={ShowProductForm}>
                    Adicionar Produto
                </button>
                {isProductFormOpen && <ProductForm showProductForm={ShowProductForm} />}
            </div>
            <div className="flex-1 bg-purple-400"></div>
        </div>
    )
}