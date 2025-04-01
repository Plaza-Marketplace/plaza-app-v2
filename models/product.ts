type Product = {
  id: number;

  sellerId: number;

  name: string;

  description: string;

  // Change to enum?
  category: string;

  // Change to enum?
  condition: string;

  price: number;

  shippingPrice: number;

  imageUrls: Url[];

  createdAt: Timestamp;

  quantity: number | null;
};

type UpdateProduct = {
  name?: string;

  description?: string;

  category?: string;

  condition?: string;

  price?: number;

  shippingPrice?: number;

  images?: string[];

  quantity?: number;
};

type CreateProduct = {
  sellerId: number;

  name: string;

  description: string;

  price: number;

  shippingPrice: number;

  base64Images: Base64[];

  arrayBufferImages?: ArrayBuffer[];

  quantity?: number;
};
