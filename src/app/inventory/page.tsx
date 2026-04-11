'use client'
import { ProductForm } from "@/components/productform";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HomeIcon, PlusCircle } from "lucide-react";
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
        <div className="flex-1 flex flex-col bg-[#E8E9E8] h-full">
            <div className="flex ml-4 mt-4 mr-4 flex-row justify-between items-center">
                 <h2 className="text-2xl font-bold text-black">Produtos</h2>
                 <button className=" bg-[#6b9dff] flex items-center justify-center text-white font-bold rounded-md h-[30px] w-[100px] rounded-md gap-1  shadow-sm shadow-black/70" onClick={ShowProductForm}>
                        <PlusCircle className="w-[15px] h-[15px] " />
                        <span className="text-sm ">Produto</span>
                    </button>
                    {isProductFormOpen && <ProductForm showProductForm={ShowProductForm} />}
            </div>
            <div className="flex-1 flex flex-col items-center p-4 overflow-hidden md:h-[100vh] sm:min-h-screen rounded-md sm:text-sm md:text-base">
                <div className="w-full flex flex-row h-[40px] justify-between  flex items-center rounded-md shrink-0 text-black ">
                        <span>Total do estoque: R$ 1.000,00</span>
                        <span>Total de produtos: 100</span>

                </div>
                <div className="w-full flex flex-row h-[50px] justify-between bg-[#c9c9c9] flex items-center rounded-md p-4 mb-3 shadow-sm shadow-black/70">
                    <input
                        type="text"
                        placeholder="Buscar produto..."
                        className="bg-[#c9c9c9] text-black placeholder:text-gray-500 border border-black/50 focus:outline-none focus:ring-2 focus:ring-[#6b9dff] rounded-md h-full w-[300px] p-4"
                        value={findName}
                        onChange={(e) => setFindName(e.target.value)}
                    />
                </div>
                 <div className="w-full flex flex-row h-[40px] justify-between  flex items-center rounded-t-md  p-4 shrink-0 text-black border-b border-black/50 flex flex-row items-center gap-4 space-between bg-[#c9c9c9] shadow-md shadow-black/70">
                            <span>nome</span>
                            <span>preço</span>
                            <span>data de validade</span>
                </div>
                <ul className="w-full flex-1 bg-[#c9c9c9] rounded-b-md overflow-y-auto max-h-[440px] hide-scrollbar shadow-md shadow-black/70">
                    {products.map((product) => (
                        <li key={product.id} className="w-full flex flex-row h-[50px] justify-between  flex items-center rounded-md p-4 shrink-0 text-black border-b border-black/50 flex flex-row items-center gap-4 space-between">
                            <span className="w-[65%] truncate">{product.name}</span>
                            <span className="w-[50%]">R$ {product.price}</span>
                            <span className="w-[30%] flex justify-end">{product.expiryDate}</span>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    )
}