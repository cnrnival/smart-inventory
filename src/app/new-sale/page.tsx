'use client'
import Link from "next/link";
import {Package, SettingsIcon, Trash} from "lucide-react";
import { useEffect, useState } from "react";
import { PaymentComponent } from "@/components/paymentcomponent";
import { ProductType } from "@/types/ProductType";
import { useProductsContext } from "@/hooks/useProductsContext";

type ProductTest = {
    id: number;
    name: string;
    expiryDate: string;
}

export default function NewSale(){

    const { products, getProducts } = useProductsContext();
    const [cart, setCart] = useState<ProductType[]>([]);
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
            getProducts();
        }, [])

    function showMenu() {
        setMenuOpen(!menuOpen);
    }

    function addToCart(product: ProductType) {
        setCart((prevCart) => [...prevCart, product]);
    }

    function openPayment() {
        setPaymentOpen(!paymentOpen);
    }   


    return (
    
        <div className=" w-screen md:h-[100vh] sm:min-h-screen flex flex-col text-black bg-[#E8E9E8]">

            <div className="sticky top-0 z-50 h-[60px] bg-[#1f1f1f]">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2 text-xl font-bold text-[#6b9dff]">
                        <Package className="h-6 w-6" />
                        Smart Inventory
                    </div>
                    <div className="h-4 w-4 text-black" onClick={showMenu}>
                        <SettingsIcon className="h-full w-full text-[#6b9dff]" />
                        {menuOpen && (
                            <ul className="w-[150px] h-[30px] bg-white absolute top-10 right-7 mt-1 flex flex-col items-start justify-center rounded-md p-2 ">
                                <Link href="/" className="text-black text-sm">Ir para o início</Link>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <main className="flex-1 flex overflow-hidden ">
                <div className=" w-[70%] h-full p-4">

                    {/* FILTROS */}
                    <div className="w-full h-[5%] bg-[#c9c9c9]">

                    </div>

                    {/* CLICAR PRA ADICIONAR AO CARRINHO */}
                    <div className="w-full h-[92%] grid [grid-template-columns:repeat(auto-fill,minmax(10rem,1fr))] gap-6 p-6 overflow-auto hide-scrollbar">
                        {products.map((product) => (
                            <div 
                            key={product.id} 
                            className="bg-[#c9c9c9] aspect-square flex flex-col rounded-md items-center active:bg-[#555] cursor-pointer p-4 shadow-sm shadow-black/50"
                             onClick={() => addToCart(product)}>
                                <div className="w-full h-[20px] flex items-center justify-end">
                                    {cart.some((item) => item.id === product.id) &&
                                    <div className="bg-red-600 w-[20px] h-full flex items-center justify-center rounded-xl">
                                    {cart.some((item) => item.id === product.id) ? `${cart.filter((item) => item.id === product.id).length}` : ''}</div>}
                                </div>
                                <span className="font-bold">{product.name}</span>
                                <span className="text-lg font-bold">R$ {product.price.toFixed(2)}</span>

                            </div>
                        ))}
                    </div>


                </div>



                <div className="bg-[#c9c9c9] w-[50%] h-full p-4 flex flex-col">
                    <div className="w-full h-[75%] overflow-auto hide-scrollbar">
                        {cart.map((product, index) => (
                            <div 
                            key={index}
                            className="bg-[#E8E9E8] w-full h-[60px] border-b border-[#555] flex flex-row items-center justify-center rounded gap-4">
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
                        <button className="bg-[#6b9dff] hover:bg-[#6b9dff]/70 text-black font-bold py-2 px-4 rounded" onClick={openPayment}>
                            <span>Finalizar Compra</span>
                        </button>
                         {paymentOpen && (   
                                <PaymentComponent openPayment={openPayment}/>
                        )}
                    </div>
                </div>
            </main>

        </div>

     )
}


{/* //  <Link
//               href={'/login'}
//                 className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors
//                     bg-primary text-black
//                     text-white hover:bg-primary/90">
//               </Link> */}