import { ProductType } from '@/types/ProductType';
import { X } from 'lucide-react'
import { ExpiringProductsItem } from './ExpiringProductsItem';
import { ExpiringProductsList } from './ExpiringProductsList';

type ExpiringProductsReviewProps = {
    onClose: () => void;
    ExpiringProductsData: ProductType[];
}
export function ExpiringProductsReview({ onClose, ExpiringProductsData }: ExpiringProductsReviewProps) {
    return (
        <div className="w-full h-full mx-auto flex items-center justify-center p-2 sm:p-4 select-none text-black bg-black/50 fixed inset-0 z-50 backdrop-blur-sm animate-fade-in"
            onClick={onClose}>
            
            <div className="bg-white border border-slate-200 rounded-xl shadow-2xl relative overflow-hidden w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}>

                    <ModalHeader onClick={onClose}/>
                    <ExpiringProductsList expiringData={ExpiringProductsData}/>

            </div>
        </div>
    )
}

type modalHeaderProps = {
    onClick: () => void;
}

export function ModalHeader({ onClick }: modalHeaderProps) {
    return (
        <div className="flex items-start justify-between gap-4 p-4 sm:p-6 border-b border-slate-100 pl-5 sm:pl-8 shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              Revisão de Produtos a Vencer
              <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 whitespace-normal">
              Analise os produtos próximos do vencimento e decida se deseja criar uma promoção ativa ou ignorar o alerta temporariamente.
            </p>
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
            {/* Botão de Fechar Modal */}
            <button 
              onClick={onClick} 
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Fechar">
                <X size={20} />
            </button>
          </div>
        </div>
    )
}

