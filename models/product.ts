type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  sellerId: number;
  images: string[];
  createdAt: string;
  quantity?: number;
};

type UpdateProduct = {
  name: string;
  description: string;
  price: number;
  sellerId: number;
  images: string[];
  quantity?: number;
};

type CreateProduct = {
  name: string;
  description: string;
  price: number;
  sellerId: number;
  images: string[];
  quantity?: number;
};
