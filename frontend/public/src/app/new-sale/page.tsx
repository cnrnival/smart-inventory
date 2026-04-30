'use client'
import Link from "next/link";
import { Package, SettingsIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { PaymentComponent } from "@/components/paymentcomponent";
import { ProductType } from "@/types/ProductType";
import { useProductsContext } from "@/hooks/useProductsContext";

type ProductTest = {
    id: number;
    name: string;
    expiryDate: string;
}

export default function NewSale() {
    const { products, getProducts } = useProductsContext();
    const [cart, setCart] = useState<ProductType[]>([]);
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

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
        <div className="w-full h-screen flex flex-col text-black bg-[#E8E9E8]">
            <div className="sticky top-0 z-50 h-[60px] bg-[#1f1f1f] shrink-0">
                <div className="container mx-auto flex h-full items-center justify-between px-4">
                    <div className="flex items-center gap-2 text-xl font-bold text-[#6b9dff]">
                        <Package className="h-6 w-6" />
                        <span className="hidden sm:inline">Smart Inventory</span>
                        <span className="sm:hidden">Smart Inv</span>
                    </div>
                    <div className="h-6 w-6 text-black cursor-pointer relative" onClick={showMenu}>
                        <SettingsIcon className="h-full w-full text-[#6b9dff]" />
                        {menuOpen && (
                            <ul className="w-[150px] bg-white absolute top-8 right-0 flex flex-col items-start justify-center rounded-md p-2 shadow-lg z-50">
                                <Link href="/" className="text-black text-sm w-full p-1 hover:bg-gray-100 rounded">Ir para o início</Link>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-[70%] h-[55%] md:h-full p-2 md:p-4 flex flex-col">
                    <div className="w-full h-[40px] md:h-[5%] bg-[#c9c9c9] mb-2 md:mb-0 rounded shrink-0"></div>

                    <div className="w-full flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 p-2 md:p-6 overflow-y-auto hide-scrollbar">
                        {products.map((product) => (
                            <div 
                                key={product.id} 
                                className="bg-[#c9c9c9] aspect-square flex flex-col rounded-md items-center justify-between active:bg-[#555] cursor-pointer p-2 md:p-4 shadow-sm shadow-black/50"
                                onClick={() => addToCart(product)}
                            >
                                <div className="w-full h-[20px] flex items-center justify-end">
                                    {cart.some((item) => item.id === product.id) && (
                                        <div className="bg-red-600 px-2 h-full flex items-center justify-center rounded-xl text-white text-xs font-bold">
                                            {cart.filter((item) => item.id === product.id).length}
                                        </div>
                                    )}
                                </div>
                                <span className="font-bold text-center text-sm md:text-base truncate w-full">{product.name}</span>
                                <span className="text-sm md:text-lg font-bold whitespace-nowrap">R$ {product.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#c9c9c9] w-full md:w-[30%] h-[45%] md:h-full p-2 md:p-4 flex flex-col">
                    <div className="w-full flex-1 overflow-y-auto hide-scrollbar space-y-2">
                        {cart.map((product, index) => (
                            <div 
                                key={index}
                                className="bg-[#E8E9E8] w-full min-h-[60px] border-b border-[#555] flex flex-row items-center justify-between rounded p-2 gap-2"
                            >
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <span className="size-8 md:size-10 bg-red-200 shrink-0 rounded"></span>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="font-bold text-sm truncate">{product.name}</span>
                                        <span className="text-xs text-gray-600 truncate">Vence: {product.expiryDate}</span>
                                    </div>
                                </div>
                                <Trash className="h-5 w-5 text-red-500 shrink-0 cursor-pointer" />
                            </div>
                        ))}
                    </div>

                    <div className="w-full pt-2 border-t-2 border-[#555] flex flex-col justify-between items-end shrink-0">
                        <span className="text-sm">Subtotal: R$ 0,00</span>
                        <span className="text-lg md:text-xl font-bold">Total: R$ 0,00</span>
                    </div>

                    <div className="w-full mt-2 flex items-center justify-end shrink-0 relative">
                        <button 
                            className="bg-[#6b9dff] hover:bg-[#6b9dff]/70 text-black font-bold py-2 px-4 rounded w-full md:w-auto" 
                            onClick={openPayment}
                        >
                            Finalizar Compra
                        </button>
                        {paymentOpen && (
                            <PaymentComponent openPayment={openPayment}/>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}