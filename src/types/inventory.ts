// //Definir as estruturas dos produtos e lotes, e a função de calculo de status

// export interface Produto{
//     id: string;
//     sku: string;
//     nome: string;
//     categoria: string;
//     subcategoria: string;
//     custo_unitario: number;
// }

// export interface Lote{
//     id: string;
//     produto_id: string;
//     lote: string;
//     data_fabricacao: string;
//     data_vencimento: string;
//     quantidade: number;
//     status: 'válido' | 'alerta' | 'crítico' | 'vencido';
// }

// export type LoteStatus = Lote['status'];

// //ccalcuyla status com base na data de vencimento
// export function calcularStatusLote(dataVencimento: string): LoteStatus {
//     const hoje = new Date();
//     hoje.setHours(0, 0, 0, 0); //ignora horas
//     const venc = new Date(dataVencimento);
//     const diffDias = Math.ceil((venc.getTime() - hoje.getTime()) / (1000 * 60 *60 * 24));

//     if (diffDias < 0) return 'vencido';
//     if (diffDias < 7) return 'crítico'; //vermelhor
//     if (diffDias < 30) return 'alerta'; //amarelo
//     return 'válido'; //verde
// }
