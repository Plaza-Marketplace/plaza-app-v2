export type CreateListingForm = {
  title: string;
  // category: string;
  // condition: string;
  description: string;
  quantity: number;
  price: number;
  shippingPrice: number;
  location: string | null;
  imageUris: string[];
};

export type VariantOption = {
  id: string;
  name: string;
  values: string[];
};

export type VariantValue = {
  id: string;
  price: number;
  quantity: number;
};

export type VariantsDisplay = {
  fields: string[];
  value: VariantValue;
};
