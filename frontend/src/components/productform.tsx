'use client'

import { useForm } from "react-hook-form"
import { useProductsContext } from "@/hooks/useProductsContext"
import { toast } from "sonner"

// Interface para as Props do componente
interface ProductFormProps {
  showProductForm?: () => void;
}

// Interface para os campos do formulário
interface ProductFormData {
  name: string;
  expiryDate: string;
  price: number;
  quantity: number;
  category: string;
}

export function ProductForm({ showProductForm }: ProductFormProps) {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<ProductFormData>()
  
  const { addProduct } = useProductsContext()

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formattedData = {
        name: data.name,
        expiryDate: data.expiryDate,
        price: Number(data.price),
        quantity: Number(data.quantity),
        category: data.category || "Geral",
      }

      // Envia para o contexto (Backend)
      await addProduct(formattedData as any)
      
      toast.success("Produto adicionado com sucesso ao inventário!")
      reset()

      // Se a função de fechar foi passada, ela é executada aqui
      if (showProductForm) {
        showProductForm()
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error)
      toast.error("Erro ao conectar com o servidor.")
    }
  }

  const inputStyle = "w-full rounded-lg border border-gray-300 bg-[#323232] px-3 py-2 text-sm outline-none focus:border-[#6b9dff] focus:ring-2 focus:ring-[#6b9dff]/20 text-white placeholder:text-gray-500 transition-all"

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col gap-4 p-6 bg-[#222222] rounded-xl shadow-2xl border border-white/5 w-full max-w-md"
    >
      <div className="border-b border-gray-700 pb-2 mb-2">
        <h2 className="text-white text-xl font-bold">Cadastrar Produto</h2>
        <p className="text-gray-400 text-xs">Gestão de Validade FEFO</p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-300 text-xs font-medium ml-1">Nome do Produto</label>
        <input 
          type="text"
          placeholder="Ex: Arroz Integral 5kg"
          className={`${inputStyle} ${errors.name ? 'border-red-500' : ''}`}
          {...register("name", { required: "Nome é obrigatório" })} 
        />
        {errors.name && <span className="text-red-500 text-[10px] ml-1">{errors.name.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-300 text-xs font-medium ml-1">Data de Validade</label>
        <input 
          type="date"
          className={`${inputStyle} ${errors.expiryDate ? 'border-red-500' : ''}`}
          {...register("expiryDate", { required: "Data é essencial" })} 
        />
        {errors.expiryDate && <span className="text-red-500 text-[10px] ml-1">{errors.expiryDate.message}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-xs font-medium ml-1">Preço (R$)</label>
          <input 
            type="number"
            step="0.01"
            placeholder="0,00"
            className={inputStyle}
            {...register("price", { required: true, min: 0.01 })} 
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-300 text-xs font-medium ml-1">Qtd. Inicial</label>
          <input 
            type="number"
            placeholder="0"
            className={inputStyle}
            {...register("quantity", { required: true, min: 1 })} 
          />
        </div>
      </div>

      <button 
        type="submit"
        className="mt-4 w-full py-2.5 bg-[#6b9dff] hover:bg-[#5a8dec] text-white font-bold rounded-lg shadow-md transition-all active:scale-[0.98]"
      >
        Confirmar Cadastro
      </button>
    </form>
  )
}