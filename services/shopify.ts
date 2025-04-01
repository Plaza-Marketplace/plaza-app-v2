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
  variants: ShopifyVariants[];
  images: ShopifyImages[];
};

type ShopifyVariants = {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string | null;
  requires_shipping: boolean;
  taxable: boolean;
  inventory_quantity: number | null;
  inventory_management: string | null;
  created_at: string;
  updated_at: string;
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

const productShopifyToPlaza = (
  userId: Id,
  product: ShopifyProduct
): Product => {
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
  };
};

export {
  ShopifyProduct,
  ShopifyVariants,
  ShopifyImages,
  productShopifyToPlaza,
};
