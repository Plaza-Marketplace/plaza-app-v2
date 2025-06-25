export type CreateListingForm = {
  title: string;
  // category: string;
  // condition: string;
  description: string;
  quantity: number;
  price: number;
  shippingPrice: number;
  imageUris: string[];
  isVariantsEnabled: boolean;
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

export type VariantTypeToValue = {
  type: string;
  value: string;
};

export type VariantsDisplay = {
  fields: VariantTypeToValue[];
  value: VariantValue;
};
