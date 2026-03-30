'use client'
import { ScanBarcodeIcon } from 'lucide-react';
import { BarcodeScanner } from "@/components/barcodescanner";
import { DatePickerComponent } from "@/components/datepicker";
import { addProductToInventory } from "@/hooks/useNewInventory";
import { useState } from "react";

export function ProductForm({ showProductForm }: { showProductForm: () => void }){

     const [barCode, setBarCode] = useState('');
        const [productName, setProductName] = useState('');
        // const [productSKU, setProductSKU] = useState('');
        const [category, setCategory] = useState('');
        const [productPrice, setProductPrice] = useState('');
        const  [expiryDate, setExpiryDate] = useState(new Date());
        const [quantity, setQuantity] = useState('');
    
        const [openScanner, setOpenScanner] = useState(false);
    
        function expiryDatePicker(newDate: Date){
            // (newDate).toLocaleDateString('pt-BR')
            setExpiryDate(newDate);
        }
    
        function fillFormWithBarcodeData(barcode: string, productName: string){
            setBarCode(barcode);
            setProductName(productName);
        }
    
        function handleSubmit(e: React.FormEvent<HTMLFormElement>){
            e.preventDefault();
    
            const formData = new FormData();
            formData.append('barcode', barCode);
            formData.append('productName', productName);
            formData.append('category', category);
            formData.append('productPrice', productPrice);
            formData.append('expiryDate', expiryDate.toISOString());
            formData.append('quantity', quantity);
    
            addProductToInventory(formData);
        }

    return (
        <main className=" w-full h-full mx-auto flex items-center justify-center  py-10 select-none text-white bg-black/50 absolute inset-0 rounded-xl" onClick={showProductForm}>
                <div className="md:w-[700px] h-[550px] sm:w-[450px] rounded-xl bg-third p-8 shadow-sm bg-[#323232]"  onClick={e => e.stopPropagation()}>
                   
                   <div className='flex-col items-center justify-center'>
                        <h1 className="text-center text-3xl font-bold">Registrar Produto</h1>
                        <p className="mt-2 text-center">Adicione um novo produto ao estoque</p>
                         <button type="button" className="w-full rounded-lg border px-4 py-2.5 shadow-sm transition-colors hover:bg-primary/90 flex flex-row items-center justify-center text-primary hover:text-white border-[#6b9dff] text-[#6b9dff] hover:border-[#6b9dff] hover:bg-[#6b9dff] mt-4" onClick={() => setOpenScanner(true)}>
                            <ScanBarcodeIcon className="inline-block h-5 w-5 mr-2 font-semibold" />
                            <p className=" text-sm font-semibold ">Ler código de barras</p>
                        </button>
                   </div>

                    <form onSubmit={handleSubmit} className="mt-5 space-y-5 flex flex-row flex-wrap gap-3">

                        <div>
                            <label htmlFor="barcode" className="mb-1 block text-sm ">Código de barras</label>
                            <input type="text" className="w-[310px] rounded-lg border border-gray-300 bg-third px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-[#323232] text-white placeholder:text-gray-500" onChange={(e)=> setBarCode(e.target.value)} value={barCode} />

                        </div>

                        <div>
                            <label htmlFor="productName" className="mb-1 block text-sm">Nome do Produto</label>
                            <input type="text" className="w-[310px]  rounded-lg border border-gray-300 bg-third px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-[#6b9dff]/20 bg-[#323232] text-white placeholder:text-gray-500" onChange={(e)=> setProductName(e.target.value)} value={productName} />
                        </div>

                        <div>
                            <label htmlFor="expiryDate" className="mb-1 block text-sm mr-5">Data de Validade</label>
                            <DatePickerComponent expiryDatePicker={expiryDatePicker} selectedDate={expiryDate}/>
                        </div>
                    
                        <div>
                            <label htmlFor="category" className="mb-1 block text-sm">Categoria</label>
                            <input type="text" className="w-[310px] rounded-lg border border-gray-300 bg-third px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-[#6b9dff]/20" onChange={(e)=> setCategory(e.target.value)} value={category} />
                        </div>
                    
                        <div>
                            <label htmlFor="productPrice" className="mb-1 block text-sm">Valor</label>
                            <input type="number" min='0' className="w-[310px] rounded-lg border border-gray-300 bg-third px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-[#6b9dff]/20 bg-[#323232] text-white placeholder:text-gray-500" onChange={(e)=> setProductPrice(e.target.value)} value={productPrice} />
                        </div>

                        <div>
                            <label htmlFor="quantity" className="mb-1 block text-sm">Quantidade</label>
                            <input type="number" min='1' className="w-[310px] rounded-lg border border-gray-300 bg-third px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-[#6b9dff]/20 bg-[#323232] text-white placeholder:text-gray-500" onChange={(e)=> setQuantity((e.target.value))} value={quantity} />
                        </div>

                        <button type="submit" className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#6b9dff]/70 bg-[#6b9dff]">
                            Registrar Produto
                        </button>
                    </form>
                    </div>
                    {
                        openScanner && (
                            <BarcodeScanner setOpenScanner={()=>setOpenScanner(false)} fillFormWithBarcodeData={(barcode: string, productName: string)=>fillFormWithBarcodeData(barcode, productName)} />
                        )
                    }
            </main>
    )
}