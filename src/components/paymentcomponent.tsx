'use client'

import { BarcodeIcon, CreditCardIcon, QrCodeIcon, Banknote } from "lucide-react";

type Props = {
    openPayment: () => void;
};

export function PaymentComponent({openPayment}: Props){
    
    const methods = [
        { name: "Cartão de Crédito", icon: <CreditCardIcon /> },
        { name: "Pix", icon: <QrCodeIcon /> },
        { name: "Dinheiro", icon: <Banknote /> }
    ];

    return (
        <div className="w-screen h-screen bg-black/80 absolute top-0 left-0 flex items-center justify-center" onClick={e=>  e.stopPropagation()}>
            <div className="w-[600px] h-[300px] rounded-lg  bg-[#1f1f1f] flex flex-col">
                <div className="bg-[#6b9dff] h-[40px] flex items-center justify-between p-2 rounded-tl-lg rounded-tr-lg">
                    <h2 className="">Selecione o método de pagamento</h2>
                    <button onClick={openPayment} className=" text-sm w-[70px] h-[30px] flex items-center justify-center p-2 rounded-md border border-white">voltar</button>
                </div>

                <div className="flex-1 h-full flex flex-wrap items-center justify-center p-2 rounded-b-md gap-10">
                    {methods.map((method, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-[#323232] rounded-md w-[150px] h-[150px]">
                            {method.icon}
                            <span>{method.name}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}