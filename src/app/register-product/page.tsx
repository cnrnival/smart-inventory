'use client';

import { useState } from "react";
import { toast } from "sonner";
import { ScanBarcodeIcon } from 'lucide-react';
import { BarcodeScanner } from "@/components/barcodescanner";
import { DatePickerComponent } from "@/components/datepicker";

export default function RegisterProductPage() {
  const [barCode, setBarCode] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [quantity, setQuantity] = useState('');
  const [openScanner, setOpenScanner] = useState(false);

  function expirationDatePicker(newDate: Date) {
    setExpirationDate(newDate);
  }

  function fillFormWithBarcodeData(barcode: string, productName: string) {
    setBarCode(barcode);
    setProductName(productName);
  }


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.info(`Data selecionada: ${expirationDate.toLocaleDateString('pt-BR')}`);
    // Aqui futuramente virá a lógica de salvar o produto
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto flex items-center justify-center px-4 py-10 relative select-none">
        <div className="w-[450px] rounded-xl bg-white p-8 shadow-sm">
          <h1 className="text-center text-3xl font-bold">Registrar Produto</h1>
          <p className="mt-2 text-center text-gray-600">Adicione um novo produto ao estoque</p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-5">
            <button type="button" className="w-full rounded-lg border border-primary px-4 py-2.5 shadow-sm transition-colors hover:bg-primary/90 flex flex-row items-center justify-center" onClick={() => setOpenScanner(true)}>
              <ScanBarcodeIcon className="inline-block h-5 w-5 mr-2 font-semibold text-primary" />
              <p className="text-sm font-semibold text-primary">Ler código de barras</p>
            </button>

            <label htmlFor="barcode" className="mb-1 block text-sm">Código de barras</label>
            <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" onChange={(e) => setBarCode(e.target.value)} value={barCode} />

            <label htmlFor="productName" className="mb-1 block text-sm">Nome do Produto</label>
            <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" onChange={(e) => setProductName(e.target.value)} value={productName} />

            <label htmlFor="expirationDate" className="mb-1 block text-sm">Data de Validade</label>
            <DatePickerComponent expiryDatePicker={expirationDatePicker} selectedDate={expirationDate} />

            <label htmlFor="category" className="mb-1 block text-sm">Categoria</label>
            <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" onChange={(e) => setCategory(e.target.value)} value={category} />

            <label htmlFor="productPrice" className="mb-1 block text-sm">Valor</label>
            <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />

            <label htmlFor="quantity" className="mb-1 block text-sm">Quantidade</label>
            <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" onChange={(e) => setQuantity(e.target.value)} value={quantity} />

            <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90">
              Registrar Produto
            </button>
          </form>
        </div>
        {openScanner && (
          <BarcodeScanner setOpenScanner={() => setOpenScanner(false)} fillFormWithBarcodeData={(barcode, productName) => fillFormWithBarcodeData(barcode, productName)} />
        )}
      </main>
    </div>
  );
}