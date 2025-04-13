type ProductVariant = {
  id: Id;
  price: number;
  quantity: number | null;
  productId: Id;
  createdAt: string;
};

type CreateProductVariant = {
  price: number;
  quantity: number;
  productId: Id;
};

type VariantType = {
  id: Id;
  productId: Id;
  name: string;
  createdAt: string;
};

type CreateVariantType = {
  name: string;
  productId: Id;
};

type VariantValue = {
  id: Id;
  variantType: VariantType;
  name: string;
  createdAt: string;
};

type CreateVariantValue = {
  name: string;
  variantTypeId: Id;
};

type VariantOption = {
  id: Id;
  variant: ProductVariant;
  variantValue: VariantValue;
  createdAt: string;
};

type CreateVariantOption = {
  variantId: Id;
  variantValueId: Id;
};
