import { PlazaProduct, ShopifyProduct } from './model';

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

export { productShopifyToPlaza };
