export type ProductType = {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  price: number;
  status: 'valid' | 'alert' | 'critical' | 'expired';
  quantity: number;
}