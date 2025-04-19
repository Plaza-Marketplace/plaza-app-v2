export type ShopifyProduct = {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  tags: string[];
  options: ShopifyVariantOptions[];
  variants: ShopifyVariants[];
  images: ShopifyImages[];
};

export type ShopifyVariants = {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string | null;
  option1: string;
  option2: string | null;
  option3: string | null;
  requires_shipping: boolean;
  taxable: boolean;
  inventory_quantity: number | null;
  inventory_management: string | null;
  created_at: string;
  updated_at: string;
};

export type ShopifyVariantOptions = {
  name: string;
  values: string[];
};

export type ShopifyImages = {
  id: number;
  product_id: number;
  position: number;
  created_at: string;
  updated_at: string;
  alt: string | null;
  width: number;
  height: number;
  src: string; // URL to the image
};

export type PlazaProduct = {
  id: number;
  sellerId: Id;
  name: string;
  description: string;
  category: string;
  condition: string;
  price: number;
  shippingPrice: number;
  imageUrls: string[];
  quantity: number;
  createdAt: string;
  options: PlazaVariantOptions[];
  variants: PlazaVariantValues[];
};

export type PlazaVariantOptions = {
  name: string;
  values: string[];
};

export type PlazaVariantValues = {
  id: number;
  variant1: string;
  variant2: string | null;
  price: number;
  quantity: number;
};
