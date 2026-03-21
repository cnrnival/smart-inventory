import React from 'react';

export interface Produto {
  id: string;
  sku: string;
  nome: string;
  categoria: string;
  subcategoria: string;
  custo_unitario: number;
}

export interface Lote {
  id: string;
  produto_id: string;
  lote: string;
  data_fabricacao: string;
  data_vencimento: string;
  quantidade: number;
  status: 'válido' | 'alerta' | 'crítico' | 'vencido';
}

export type LoteStatus = Lote['status'];

export function calcularStatusLote(dataVencimento: string): LoteStatus {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); 
  const venc = new Date(dataVencimento);
  
  venc.setMinutes(venc.getMinutes() + venc.getTimezoneOffset());
  
  const diffDias = Math.ceil((venc.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDias < 0) return 'vencido';
  if (diffDias < 7) return 'crítico';
  if (diffDias < 30) return 'alerta';
  return 'válido';
}

export function ProductStatus({ status }: { status: LoteStatus }) {
  let config = { label: status, className: 'bg-gray-100 text-gray-700' };

  switch (status) {
    case 'válido':
      config = { label: 'válido', className: 'bg-green-100 text-green-700' };
      break;
    case 'alerta':
      config = { label: 'alerta', className: 'bg-yellow-100 text-yellow-800' };
      break;
    case 'crítico':
      config = { label: 'crítico', className: 'bg-orange-100 text-orange-800' };
      break;
    case 'vencido':
      config = { label: 'vencido', className: 'bg-red-100 text-red-700' };
      break;
  }

  return (
    <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${config.className}`}>
      {config.label}
    </span>
  );
}