'use client'
import { ProductForm } from "@/components/productform";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { useProductsContext } from "@/hooks/useProductsContext";
import { ProductType } from "@/types/ProductType";

export default function InventoryPage() {

    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [findName, setFindName] = useState("");
    const { products, getProducts } = useProductsContext();

    useEffect(() => {
        getProducts();
    }, [])

    console.log("DADOS QUE CHEGARAM NA TELA:", products);

    function ShowProductForm() {
        setIsProductFormOpen(!isProductFormOpen);
    }
    return (
        <div className="flex-1 flex flex-col min-h-0 bg-[#262626]">
            <div className="w-full h-[70px] flex flex-row items-center justify-between p-4 shrink-0">
                <h2 className="text-2xl font-bold">Produtos</h2>
                <Link href="/" className="text-white font-bold py-2 px-4 flex flex-row items-center gap-2 hover:text-purple-300">
                    <HomeIcon className="w-[20px] h-[20px]" />
                    <span>Início</span>
                </Link>
            </div>
            <div className="flex-1 flex flex-col items-center p-4 overflow-hidden">
                <div className="w-full flex flex-row h-[50px] justify-between bg-[#222222] flex items-center rounded-md p-4">
                    <input
                        type="text"
                        placeholder="Buscar produto..."
                        className="bg-[#222222] text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#6b9dff] rounded-md h-full w-[300px] p-4"
                        value={findName}
                        onChange={(e) => setFindName(e.target.value)}
                    />

                    <button className=" bg-[#6b9dff] flex items-center justify-center text-white font-bold rounded-md h-[30px] w-[100px] rounded-md" onClick={ShowProductForm}>
                        <span className="text-sm">Produto</span>
                    </button>
                    {isProductFormOpen && <ProductForm showProductForm={ShowProductForm} />}
                </div>
                <div className="w-full flex flex-row h-[50px] justify-between  flex items-center rounded-md p-4 shrink-0">
                        <span>Total do estoque: R$ 1.000,00</span>
                        <span>Total de produtos: 100</span>

                </div>
                <div className="w-full flex flex-row h-[40px] justify-between bg-[#222222] flex items-center rounded-t-md p-4 shrink-0"></div>
                <ul className="w-full flex-1 bg-[#222222] rounded-b-md overflow-y-auto min-h-0 hide-scrollbar">
                    {products.map((product) => (
                        <li key={product.id} className="w-full flex flex-row h-[40px] justify-between  flex items-center rounded-md p-4 shrink-0 text-white bg-red-200">
                            <span>{product.name}</span>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )
}