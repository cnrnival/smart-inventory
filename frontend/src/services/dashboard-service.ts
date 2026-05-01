import { ProductStatus } from "@/contexts/ProductsContext";
import { ProductType } from "@/types/ProductType";

export function DashBoardService(products: ProductType[]) {
  /**
   * Calcula o status de um produto com base na sua data de validade.
   * @param expiryDate - string no formato YYYY-MM-DD
   * @returns 'valid' | 'alert' | 'critical' | 'expired'
   */
  function calculateProductStatus(expiryDate: string): ProductStatus {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Parse manual para evitar problemas de fuso horário
    const [year, month, day] = expiryDate.split('-').map(Number);
    const expiry = new Date(year, month - 1, day);

    if (isNaN(expiry.getTime())) {
      console.warn('Data inválida recebida:', expiryDate);
      return 'expired';
    }

    const diffDays = Math.ceil(
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return 'expired';
    if (diffDays < 7) return 'critical';
    if (diffDays < 30) return 'alert';
    return 'valid';
  }

  // Adiciona o campo 'status' a cada produto
  const productsWithStatus = products.map(p => ({
    ...p,
    status: calculateProductStatus(p.expiryDate),
  }));

  // Filtros por status
  const expiredProducts = productsWithStatus.filter(p => p.status === 'expired');
  const nearExpiryProducts = productsWithStatus.filter(
    p => p.status === 'alert' || p.status === 'critical'
  );
  const validProducts = productsWithStatus.filter(p => p.status === 'valid');

  // Cálculo do risco financeiro: soma de price * quantity dos produtos em alerta/crítico/vencidos
  const financialRisk = [...nearExpiryProducts, ...expiredProducts].reduce(
    (acc, product) => acc + (product.price * product.quantity),
    0
  );

  return {
    calculateProductStatus,
    productsWithStatus,
    expiredProducts,
    nearExpiryProducts,
    validProducts,
    financialRisk,
  };
}