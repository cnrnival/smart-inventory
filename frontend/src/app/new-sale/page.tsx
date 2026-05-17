'use client'
import Link from "next/link";
import { Package, SettingsIcon, Trash, Plus, X } from "lucide-react";
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
    
    // Novo estado para controlar o modal de produtos no mobile
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

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
        <div className="w-full h-screen flex flex-col font-sans text-slate-800 bg-slate-50 overflow-hidden">
            
            {/* Navbar */}
            <div className="relative z-50 h-[60px] bg-white border-b border-slate-200 shadow-sm shrink-0">
                <div className="container mx-auto flex h-full items-center justify-between px-4">
                    <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
                        <Package className="h-6 w-6" />
                        <span className="sm:inline">Smart Inventory</span>
                    </div>
                    <div className="h-8 w-8 flex items-center justify-center cursor-pointer relative" onClick={showMenu}>
                        <SettingsIcon className="h-5 w-5 text-slate-400 hover:text-blue-600 transition-colors" />
                        {menuOpen && (
                            <ul className="w-[150px] bg-white border border-slate-200 absolute top-10 right-0 flex flex-col items-start justify-center rounded-xl p-2 shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                <Link href="/" className="text-slate-600 font-medium text-sm w-full p-2 hover:bg-slate-50 hover:text-blue-600 transition-colors rounded-lg">
                                    Ir para o início
                                </Link>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <main className="flex-1 flex flex-col md:flex-row relative h-[calc(100vh-60px)]">
                
                {/* LADO DIREITO (DOM Order 1): Carrinho / Sidebar */}
                {/* No mobile: Ocupa a tela toda. No desktop: Fica na direita (order-2) */}
                <div className="w-full h-full md:w-[30%] bg-white border-l border-slate-200 p-4 md:p-6 flex flex-col shadow-[-4px_0_24px_-8px_rgba(0,0,0,0.05)] z-10 order-1 md:order-2">
                    
                    <div className="flex justify-between items-center mb-4 shrink-0">
                        <h3 className="font-bold text-lg text-slate-800">Carrinho</h3>
                        {/* Botão de Adicionar Produto (Aparece APENAS no mobile) */}
                        <button 
                            onClick={() => setIsProductModalOpen(true)}
                            className="md:hidden flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                        >
                            <Plus size={16} /> 
                            Adicionar Produto
                        </button>
                    </div>
                    
                    <div className="w-full flex-1 overflow-y-auto hide-scrollbar space-y-3 pr-1">
                        {cart.length === 0 && (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                                <Package className="w-8 h-8 opacity-50" />
                                <span className="text-sm">Carrinho vazio</span>
                            </div>
                        )}
                        {cart.map((product, index) => (
                            <div 
                                key={index}
                                className="bg-slate-50 w-full min-h-[64px] border border-slate-100 flex flex-row items-center justify-between rounded-xl p-3 gap-3 hover:bg-slate-100 transition-colors"
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-10 h-10 bg-white border border-slate-200 flex items-center justify-center shrink-0 rounded-lg">
                                        <Package className="w-5 h-5 text-slate-300" />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="font-semibold text-slate-700 text-sm truncate">{product.name}</span>
                                        <span className="text-xs font-medium text-slate-500 truncate">R$ {product.price.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="p-2 rounded-md hover:bg-red-50 group transition-colors">
                                    <Trash className="h-4 w-4 text-slate-400 group-hover:text-red-500 shrink-0 cursor-pointer transition-colors" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="w-full pt-4 mt-2 border-t border-slate-100 flex flex-col justify-between items-end shrink-0 gap-1">
                        <span className="text-sm font-medium text-slate-500">Subtotal: R$ 0,00</span>
                        <span className="text-xl md:text-2xl font-bold text-slate-800">Total: R$ 0,00</span>
                    </div>

                    <div className="w-full mt-6 flex items-center justify-end shrink-0 relative">
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl w-full transition-colors shadow-sm shadow-blue-600/30 flex items-center justify-center gap-2" 
                            onClick={openPayment}
                        >
                            Finalizar Compra
                        </button>
                        {paymentOpen && (
                            <PaymentComponent openPayment={openPayment}/>
                        )}
                    </div>
                </div>

                {/* LADO ESQUERDO (DOM Order 2): Área de Produtos */}
                {/* No mobile: Funciona como um modal fixo que desliza para cima. No desktop: Fica na esquerda (order-1) normalmente. */}
                <div className={`
                    fixed top-[60px] inset-x-0 bottom-0 z-40 bg-slate-50 p-4 flex flex-col transition-transform duration-300 ease-in-out
                    ${isProductModalOpen ? 'translate-y-0' : 'translate-y-full'}
                    md:relative md:top-0 md:translate-y-0 md:w-[70%] md:h-full md:bg-transparent md:p-6 md:flex md:order-1 md:z-auto
                `}>
                    
                    {/* Cabeçalho do Modal (Aparece APENAS no mobile) */}
                    <div className="flex md:hidden justify-between items-center mb-4 shrink-0">
                        <h3 className="font-bold text-lg text-slate-800">Selecione os produtos</h3>
                        <button 
                            onClick={() => setIsProductModalOpen(false)} 
                            className="p-1.5 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Placeholder (Barra de pesquisa) */}
                    <div className="w-full h-12 md:h-14 bg-white border border-slate-200 mb-4 rounded-xl shadow-sm shrink-0 flex items-center px-4">
                        <span className="text-sm font-medium text-slate-400">Filtrar produtos...</span>
                    </div>

                    {/* Grid de Produtos */}
                    <div className="w-full flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5 overflow-y-auto hide-scrollbar pb-4">
                        {products.map((product) => (
                            <div 
                                key={product.id} 
                                className="bg-white border border-slate-200 aspect-square flex flex-col rounded-xl items-center justify-center relative cursor-pointer p-3 md:p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 active:scale-95 group"
                                onClick={() => addToCart(product)}
                            >
                                {/* Badge Flutuante de Quantidade no Carrinho */}
                                {cart.some((item) => item.id === product.id) && (
                                    <div className="absolute top-2 right-2 bg-blue-600 px-2 py-0.5 rounded-full text-white text-xs font-bold shadow-sm">
                                        {cart.filter((item) => item.id === product.id).length}
                                    </div>
                                )}
                                
                                <div className="flex-1 flex items-center justify-center w-full">
                                    <Package className="w-10 h-10 text-slate-200 group-hover:text-blue-100 transition-colors" />
                                </div>

                                <div className="flex flex-col items-center w-full mt-2">
                                    <span className="font-medium text-slate-700 text-sm md:text-base truncate w-full text-center">
                                        {product.name}
                                    </span>
                                    <span className="text-sm md:text-lg font-bold text-blue-600 whitespace-nowrap">
                                        R$ {product.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}