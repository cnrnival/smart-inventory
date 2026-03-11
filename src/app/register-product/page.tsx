'use client'

import { use, useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from 'sonner';
import Link from "next/link";
import { ScanBarcodeIcon } from 'lucide-react';

export default function RegisterProductPage(){

    const [productName, setProductName] = useState('');
    // const [productSKU, setProductSKU] = useState('');
    const [category, setCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const  [manufactureDate, setManufactureDate] = useState('');
    const  [expirationDate, setExpirationDate] = useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    }
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto flex items-center justify-center px-4 py-10">
                <div className="w-[450px] rounded-xl border bg-white p-8 shadow-sm">
                    <h1 className="text-center text-3xl font-bold">Registrar Produto</h1>
                    <p className="mt-2 text-center text-gray-600">Adicione um novo produto ao estoque</p>

                    <form onSubmit={handleSubmit} className="mt-5 space-y-5">

                        <button type="submit" className="w-full rounded-lg border border-primary px-4 py-2.5 shadow-sm transition-colors hover:bg-primary/90 flex flex-row items-center justify-center">
                            <ScanBarcodeIcon className="inline-block h-5 w-5 mr-2 font-semibold text-primary" />
                            <p className=" text-sm font-semibold text-primary">Ler código de barras</p>
                        </button>

                        <label htmlFor="manufactureDate" className="mb-1 block text-sm ">Código de barras</label>
                        <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" onChange={(e)=> e.target.value} value={manufactureDate} />

                        <label htmlFor="productName" className="mb-1 block text-sm">Nome do Produto</label>
                        <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" onChange={(e)=> e.target.value} value={productName} />

                        {/* <label htmlFor="productNam" className="mb-1 block text-sm font-medium">SKU</label>
                        <input type="text" className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" onChange={(e)=> e.target.value} value={productSKU} /> */}

                         <label htmlFor="expirationDate" className="mb-1 block text-sm ">Data de Validade</label>
                        <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" onChange={(e)=> e.target.value} value={expirationDate} />

                        <label htmlFor="category" className="mb-1 block text-sm">Categoria</label>
                        <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" onChange={(e)=> e.target.value} value={category} />


                        <label htmlFor="productPrice" className="mb-1 block text-sm">Valor</label>
                        <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" onChange={(e)=> e.target.value} value={productPrice} />

                        <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 bg-blue-600">
                            Criar Conta
                        </button>
                    </form>
                </div>
                <div className="absolute flex items-center justify-center w-full h-full">
                        <span className=" mt-16 w-[450px] h-full rounded-xl border bg-green-200 p-8 shadow-sm flex flex-col items-center justify-center">
                            
                         </span>
                    </div>
            </main>
        </div>
    );
}



