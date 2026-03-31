'use client'
import { ProductForm } from "@/components/productform";
import { useState } from "react";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

const linksInventoryPage = [
    { name: "Produtos", href: "/inventory" },
    { name: "Categorias", href: "/inventory/categories" },
    { name: "Fornecedores", href: "/inventory/suppliers" }
];

export default function InventoryPage() {

    const [isProductFormOpen, setIsProductFormOpen] = useState(false);

    function ShowProductForm() {
        setIsProductFormOpen(!isProductFormOpen);
    }
    return (
        <div>
            <div className="w-full h-[70px] flex flex-row items-center justify-between p-4">
                <h2 className="text-2xl font-bold">Produtos</h2>
                <Link href="/dashboard" className="text-white font-bold py-2 px-4 flex flex-row items-center gap-2 hover:text-purple-300">
                    <HomeIcon w-4 h-4 />
                    <span>Início</span>
                </Link>
            </div>
            <div className="flex-1 flex flex-row items-center justify-between p-4">
                <div className="w-full flex flex-row h-[70px] justify-between bg-cyan-400 flex items-center">
                    <h2 className="text-2xl font-bold">Gerenciamento de Estoque</h2>
                    <button className=" bg-[#6b9dff] flex items-center justify-center text-white font-bold py-2 px-4 rounded h-[50px] w-[100px] text-sm" onClick={ShowProductForm}>
                        Adicionar Produto
                    </button>
                    {isProductFormOpen && <ProductForm showProductForm={ShowProductForm} />}
                </div>
            </div>
        </div>
    )
}