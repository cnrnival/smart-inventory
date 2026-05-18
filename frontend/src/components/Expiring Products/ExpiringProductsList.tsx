import { ProductType } from "@/types/ProductType"
import { ExpiringProductsItem } from "./ExpiringProductsItem"

type ExpiringProductsListProps = {
    expiringData: ProductType[]
}

export function ExpiringProductsList({ expiringData }: ExpiringProductsListProps) {
    return (
        <div className="overflow-auto w-full">

          <table className="w-full text-left text-sm whitespace-nowrap min-h-[400px]">

            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-xs sticky top-0 z-10">
              <tr>
                <th className="px-4 sm:px-8 py-3 sm:py-4">PRODUTO</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4">DATA DE VALIDADE</th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-right">QTD. EM ESTOQUE</th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 text-right">AÇÕES DE DECISÃO</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 min-h-[400px]">
              {expiringData.map((product) => (
                <ExpiringProductsItem key={product.id} data={product}/>
              ))}
            </tbody>
          </table>
        </div>
    )
}