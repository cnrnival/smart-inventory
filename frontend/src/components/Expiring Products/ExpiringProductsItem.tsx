import { ProductType } from "@/types/ProductType";

type ExpiringProductsItemProps = {
    data: ProductType;
}
export function ExpiringProductsItem({ data }: ExpiringProductsItemProps) {
    return (
        <tr className="hover:bg-slate-50/70 transition-colors">

                  <td className="px-4 sm:px-8 py-3 sm:py-4">
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm block">{data.name}</span>
                  </td>

                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[11px] sm:text-xs font-semibold bg-red-50 text-red-600">
                      {data.expiryDate}
                    </span>
                  </td>

                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-slate-700">
                    {data.quantity}
                  </td>

                  {/* BOTOES DE ACÃO */}
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">

                    <div className="flex items-center justify-end gap-1.5 sm:gap-2">

                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all active:scale-95 px-2.5 py-1.5 sm:px-3 text-xs sm:text-sm">
                        Promover
                      </button>

                    </div>
                    
                  </td>
                </tr>
    )
}