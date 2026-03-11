'use client'

import { use, useState } from "react";
import { Label } from "recharts";

export default function BatchPage(){

    const [productName, setProductName] = useState('');
    const [productSKU, setProductSKU] = useState('');
    const [category, setCategory] = useState('');
    const [productPrice, setProductPrice] = useState('');
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    }
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
                    <h1 className="text-center text-3xl font-bold">Registrar Produto</h1>
                    <p className="mt-2 text-center text-gray-600">Adicione um novo produto ao estoque</p>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <label htmlFor="productName" className="mb-1 block text-sm font-medium">SKU</label>
                        <input type="text" className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" onChange={(e)=> e.target.value} value={productName} />

                        <label htmlFor="productNam" className="mb-1 block text-sm font-medium">Nome do Produto</label>
                        <input type="text" className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" onChange={(e)=> e.target.value} value={productSKU} />

                        <label htmlFor="category" className="mb-1 block text-sm font-medium">Categoria</label>
                        <input type="text" className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" onChange={(e)=> e.target.value} value={category} />

                        <label htmlFor="category" className="mb-1 block text-sm font-medium">Custo Unitário</label>
                        <input type="text" className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" onChange={(e)=> e.target.value} value={productPrice} />
                    </form>
                </div>
            </main>
        </div>
    );
}