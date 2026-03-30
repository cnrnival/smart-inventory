'use client'
import Link from "next/link";
import {Package, SettingsIcon, Trash} from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/inventory";

type ProductTest = {
    id: number;
    name: string;
    expiryDate: string;
}

export default function NewSale(){

    const [cart, setCart] = useState<ProductTest[]>([]);

    const products = [
     { id: 1, name: 'Produto 1', expiryDate: '2026-03-26' },
     { id: 2, name: 'Produto 2', expiryDate: '2023-03-26' },
     { id: 3, name: 'Produto 3', expiryDate: '2023-03-26' },
     { id: 4, name: 'Produto 4', expiryDate: '2023-03-26' },
     { id: 5, name: 'Produto 5', expiryDate: '2023-03-26' },
     { id: 6, name: 'Produto 6', expiryDate: '2023-03-26' },
     { id: 7, name: 'Produto 7', expiryDate: '2023-03-26' },
     { id: 8, name: 'Produto 8', expiryDate: '2023-03-26' },
     { id: 9, name: 'Produto 9', expiryDate: '2023-03-26' },
     { id: 10, name: 'Produto 10', expiryDate: '2023-03-26' },
     { id: 11, name: 'Produto 11', expiryDate: '2023-03-26' },
     { id: 12, name: 'Produto 12', expiryDate: '2023-03-26' },
        { id: 13, name: 'Produto 13', expiryDate: '2023-03-26' },
        { id: 14, name: 'Produto 14', expiryDate: '2023-03-26' },
        { id: 15, name: 'Produto 15', expiryDate: '2023-03-26' },
    ];

    function addToCart(product: ProductTest) {
        setCart((prevCart) => [...prevCart, product]);
    }


    return (
    
        <div className=" w-screen md:h-[100vh] sm:min-h-screen flex flex-col bg-background text-white bg-[#262626]">

            <div className="sticky top-0 z-50 h-[60px] bg-[#1f1f1f]">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2 text-xl font-bold text-[#6b9dff]">
                        <Package className="h-6 w-6" />
                        Smart Inventory
                    </div>
                    <div className="h-4 w-4 text-white">
                        <SettingsIcon className="h-full w-full text-white" />
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <main className="flex-1 flex overflow-hidden">
                <div className=" w-[70%] h-full p-4">

                    {/* FILTROS */}
                    <div className="w-full h-[8%] bg-[#323232]">

                    </div>

                    {/* CLICAR PRA ADICIONAR AO CARRINHO */}
                    <div className="w-full h-[92%] grid [grid-template-columns:repeat(auto-fill,minmax(10rem,1fr))] gap-6 p-6 overflow-auto hide-scrollbar">
                        {products.map((product) => (
                            <div 
                            key={product.id} 
                            className="bg-[#424242] aspect-square flex flex-col rounded"
                             onClick={() => addToCart(product)}>
                                <div className="w-full h-[20px] bg-red-200">
                                    {cart.some((item) => item.id === product.id) &&
                                    <div className="bg-red-600 w-[20px] h-full flex items-center justify-center rounded-lg">
                                    {cart.some((item) => item.id === product.id) ? `${cart.filter((item) => item.id === product.id).length}` : ''}</div>}
                                </div>
                                <span className="font-bold">{product.name}</span>
                                <span className="text-sm">Vence em: {product.expiryDate}</span>

                            </div>
                        ))}
                    </div>


                </div>



                <div className="bg-[#323232] w-[50%] h-full p-4 flex flex-col">
                    <div className="w-full h-[75%] overflow-auto hide-scrollbar">
                        {cart.map((product) => (
                            <div 
                            key={product.id}
                            className="bg-[#424242] w-full h-[60px] border-b border-[#555] flex flex-row items-center justify-center rounded gap-4">
                                <span className="size-10 bg-red-200"></span>
                                <span className="font-bold">{product.name}</span>
                                <span className="text-sm">Vence em: {product.expiryDate}</span>
                                <span className="w-5 h-5 border border-white"></span>
                                <Trash className="h-5 w-5 text-red-500 mt-2" />
                            </div>
                        ))}
                    </div>
                    <div className="w-full h-[15%] border-t-2 border-[#555] flex flex-col justify-between items-end p-4">
                        <span>Subtotal: R$ 0,00</span>
                        <span className="text-xl font-bold">Total: R$ 0,00</span>
                    </div>
                    <div className="w-full h-[10%] flex items-center justify-end p-2">
                        <button className="bg-[#6b9dff] hover:bg-[#6b9dff]/70 text-white font-bold py-2 px-4 rounded">
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            </main>

        </div>

     )
}


{/* //  <Link
//               href={'/login'}
//                 className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors
//                     bg-primary text-white
//                     text-white hover:bg-primary/90">
//               </Link> */}