'use client'

import { CreditCardIcon, QrCodeIcon, Banknote } from "lucide-react";

type Props = {
    openPayment: () => void;
};

export function PaymentComponent({openPayment}: Props){
    
    const methods = [
        { name: "Cartão", icon: <CreditCardIcon className="size-8 md:size-10 text-[#6b9dff]" /> },
        { name: "Pix", icon: <QrCodeIcon className="size-8 md:size-10 text-[#6b9dff]" /> },
        { name: "Dinheiro", icon: <Banknote className="size-8 md:size-10 text-[#6b9dff]" /> }
    ];

    return (
        <div 
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm" 
            onClick={openPayment}
        >
            <div 
                className="w-full max-w-[600px] bg-[#1f1f1f] rounded-lg flex flex-col shadow-2xl overflow-hidden" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-[#6b9dff] min-h-[50px] flex items-center justify-between p-3 md:p-4">
                    <h2 className="text-black font-bold text-sm md:text-base">Método de pagamento</h2>
                    <button 
                        onClick={openPayment} 
                        className="text-black text-xs md:text-sm font-semibold px-3 py-1.5 rounded-md border border-black hover:bg-black/10 transition-colors"
                    >
                        Voltar
                    </button>
                </div>

                <div className="flex-1 p-4 md:p-8 flex items-center justify-center">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 w-full text-white">
                        {methods.map((method, index) => (
                            <button 
                                key={index} 
                                className="flex flex-col items-center justify-center p-4 bg-[#323232] hover:bg-[#444444] active:scale-95 transition-all rounded-md aspect-square w-full"
                            >
                                {method.icon}
                                <span className="mt-3 text-sm md:text-base font-medium">{method.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}