type ShopifyProduct = {
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

type ShopifyVariants = {
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

type ShopifyVariantOptions = {
  name: string;
  values: string[];
};

type ShopifyImages = {
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

type PlazaProduct = {
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

type PlazaVariantOptions = {
  name: string;
  values: string[];
};

type PlazaVariantValues = {
  id: number;
  variant1: string;
  variant2: string | null;
  price: number;
  quantity: number;
};

const productShopifyToPlaza = (
  userId: Id,
  product: ShopifyProduct
): PlazaProduct => {
  return {
    id: product.id, // Convert to string for consistency
    sellerId: userId,
    name: product.title || '',
    description: product.body_html || '',
    category: product.product_type,
    condition: 'new', // Default condition, can be changed based on requirements
    price: parseFloat(product.variants[0].price), // Assuming we take the first variant's price
    shippingPrice: 0, // Default shipping price, can be adjusted
    imageUrls: product.images.map((image) => image.src) || [], // Map Shopify image URLs to Plaza format
    quantity: product.variants.reduce(
      (total, variant) => total + (variant.inventory_quantity || 0),
      0
    ),
    createdAt: new Date(product.created_at).toISOString(), // Convert to ISO string
    options:
      product.options.map((option) => {
        return {
          name: option.name,
          values: option.values,
        };
      }) || [],
    variants:
      product.variants.map((variant) => {
        return {
          id: variant.id,
          variant1: variant.option1,
          variant2: variant.option2,
          price: parseFloat(variant.price),
          quantity: variant.inventory_quantity || 0,
        };
      }) || [],
  };
};

export {
  ShopifyProduct,
  ShopifyVariants,
  ShopifyImages,
  ShopifyVariantOptions,
  PlazaProduct,
  PlazaVariantOptions,
  PlazaVariantValues,
  productShopifyToPlaza,
};
