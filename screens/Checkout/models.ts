export enum FormType {
  PAYMENT = 'PAYMENT',
  SHIPPING = 'SHIPPING',
}

export interface CheckoutItem {
  addresses: Address[];
  product: Product;
}
