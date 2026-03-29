import Link from "next/link";
import {Package, SettingsIcon} from "lucide-react";

export default function NewSale(){

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
            <main className="flex-1 bg-red-200 flex overflow-hidden">
                <div className="bg-yellow-400 w-[70%] h-full p-4">

                    <div className="w-full h-[8%] bg-purple-200">

                    </div>

                    <div className="w-full h-[92%] bg-blue-300 grid [grid-template-columns:repeat(auto-fill,minmax(10rem,1fr))] gap-6 p-6 overflow-auto hide-scrollbar">
                        {products.map((product) => (
                            <div 
                            key={product.id} 
                            className="bg-gray-300 aspect-square flex flex-col items-center justify-center rounded">
                                <span className="font-bold">{product.name}</span>
                                <span className="text-sm">Vence em: {product.expiryDate}</span>
                            </div>
                        ))}
                    </div>


                </div>



                <div className="bg-green-400 w-[50%] h-full p-4 flex flex-col">
                    <div className="w-full h-[75%] bg-orange-400 overflow-auto hide-scrollbar">
                        {products.map((product) => (
                            <div 
                            key={product.id}
                            className="bg-gray-300 w-full h-[70px] border border-b flex flex-col items-center justify-center rounded">
                                <span className="font-bold">{product.name}</span>
                                <span className="text-sm">Vence em: {product.expiryDate}</span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full h-[15%] bg-pink-400 border-t"></div>
                    <div className="w-full h-[10%] bg-black"></div>
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