'use client'

import { Package, Trash, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importado para fazer o redirecionamento seguro
import { PaymentComponent } from "@/components/paymentcomponent";
import { ProductType } from "@/types/ProductType";
import { useProductsContext } from "@/hooks/useProductsContext";

type ProductTest = {
    id: number;
    name: string;
    expiryDate: string;
}

export default function NewSale() {
    const router = useRouter(); // Inicializando o roteador do Next.js
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

    // FUNÇÃO DE TRAVA DE SEGURANÇA
    function handleSafeExit() {
        if (cart.length > 0) {
            const confirmExit = window.confirm(
                "Atenção: Você tem produtos no carrinho! Se sair agora, esta venda será cancelada. Deseja realmente abandonar o caixa?"
            );
            if (!confirmExit) return; // Cancela a saída e mantém o lojista na tela
        }
        
        router.push('/'); // Executa a saída caso o carrinho esteja vazio ou o user confirme
    }

    return (
        <div className="w-full h-screen flex flex-col font-sans text-slate-800 bg-slate-50 overflow-hidden">

            {/* Navbar Escura do Caixa Protegida */}
            <div className="relative z-50 h-[60px] bg-[#222222] text-white shadow-md shadow-black/10 shrink-0 font-sans">
                <div className="max-w-7xl mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

                    {/* Logo - Agora como botão protegido */}
                    <button 
                        onClick={handleSafeExit} 
                        className="flex items-center gap-2 text-xl font-bold text-[#6b9dff] hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        <Package className="h-6 w-6" />
                        <span>Smart Inventory</span>
                    </button>

                    {/* Botão Sair - Ajustado para disparar o handleSafeExit com feedback visual destrutivo sutil */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSafeExit}
                            className="text-xs sm:text-sm font-semibold text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-xl transition-all cursor-pointer active:scale-95"
                        >
                            Sair da Venda
                        </button>
                    </div>

                </div>
            </div>

            <main className="flex-1 flex flex-col md:flex-row relative h-[calc(100vh-60px)]">

                {/* LADO DIREITO (DOM Order 1): Carrinho / Sidebar */}
                <div className="w-full h-full md:w-[30%] bg-white border-l border-slate-200 p-4 md:p-6 flex flex-col shadow-[-4px_0_24px_-8px_rgba(0,0,0,0.05)] z-10 order-1 md:order-2">

                    <div className="flex justify-between items-center mb-4 shrink-0">
                        <h3 className="font-bold text-lg text-slate-800">Carrinho</h3>
                        <button
                            onClick={() => setIsProductModalOpen(true)}
                            className="md:hidden flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors active:scale-95"
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
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl w-full transition-colors shadow-sm shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-95"
                            onClick={openPayment}
                        >
                            Finalizar Compra
                        </button>
                        {paymentOpen && (
                            <PaymentComponent openPayment={openPayment} />
                        )}
                    </div>
                </div>

                {/* LADO ESQUERDO (DOM Order 2): Área de Produtos */}
                <div className={`
                    fixed top-[60px] inset-x-0 bottom-0 z-40 bg-slate-50 p-4 flex flex-col transition-transform duration-300 ease-in-out
                    ${isProductModalOpen ? 'translate-y-0' : 'translate-y-full'}
                    md:relative md:top-0 md:translate-y-0 md:w-[70%] md:h-full md:bg-transparent md:p-6 md:flex md:order-1 md:z-auto
                `}>

                    <div className="flex md:hidden justify-between items-center mb-4 shrink-0">
                        <h3 className="font-bold text-lg text-slate-800">Selecione os produtos</h3>
                        <button
                            onClick={() => setIsProductModalOpen(false)}
                            className="p-1.5 bg-slate-200 hover:bg-slate-300 rounded-full text-slate-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="w-full h-12 md:h-14 bg-white border border-slate-200 mb-4 rounded-xl shadow-sm shrink-0 flex items-center px-4">
                        <span className="text-sm font-medium text-slate-400">Filtrar produtos...</span>
                    </div>

                    <div className="w-full flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5 overflow-y-auto hide-scrollbar pb-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white border border-slate-200 aspect-square flex flex-col rounded-xl items-center justify-center relative cursor-pointer p-3 md:p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 active:scale-95 group"
                                onClick={() => addToCart(product)}
                            >
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