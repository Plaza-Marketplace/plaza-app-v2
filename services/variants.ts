import {
  VariantOption,
  VariantsDisplay,
} from '@/screens/Upload/List-Product/schema';
import { createProduct, createProducts } from './crud/product';
import {
  bulkCreateProductVariants,
  bulkCreateVariantOptions,
  bulkCreateVariantTypes,
  bulkCreateVariantValues,
} from './crud/variant';

export const uploadProductsAndVariants = async (
  productSpecs: CreateProduct,
  options: VariantOption[],
  values: VariantsDisplay[]
) => {
  console.log('Specs: ', productSpecs);
  const [product] = await createProducts([
    {
      ...productSpecs,
      hasVariants: true,
    },
  ]);

  // create variants first, mapping value names to their IDs
  const variantMap = new Map<string, Id>();
  const variantTypeMap = new Map<string, Id>();
  const variantValueMap = new Map<string, Id>();

  const createVariants: CreateProductVariant[] = values.map((variantValue) => ({
    price: variantValue.value.price,
    quantity: variantValue.value.quantity,
    productId: product.id,
  }));

  const createdVariants = await bulkCreateProductVariants(createVariants);

  console.log('created variants: ', createdVariants);
  console.log('values: ', values);

  createdVariants.forEach((variant, index) => {
    variantMap.set(values[index].value.id, variant.id);
  });

  const createVariantTypes: CreateVariantType[] = options.map((option) => ({
    name: option.name,
    productId: product.id,
  }));
  const createdVariantTypes = await bulkCreateVariantTypes(createVariantTypes);
  createdVariantTypes.forEach((type) => {
    variantTypeMap.set(type.name, type.id);
  });

  const createVariantValues: CreateVariantValue[] = options
    .map((option) =>
      option.values.map((value) => ({
        name: value,
        variantTypeId: variantTypeMap.get(option.name) || -1,
      }))
    )
    .flat();

  const createdVariantValues = await bulkCreateVariantValues(
    createVariantValues
  );

  createdVariantValues.forEach((value) => {
    variantValueMap.set(value.name, value.id);
  });

  console.log('variant map: ', variantMap);
  console.log('variant type map: ', variantTypeMap);

  const createVariantOptions: CreateVariantOption[] = [];

  values.forEach((variantValue) => {
    const variantId = variantMap.get(variantValue.value.id);
    if (!variantId) return;

    variantValue.fields.forEach((field) => {
      const variantTypeId = variantTypeMap.get(field.type);
      const variantValueId = variantValueMap.get(field.value);

      if (variantTypeId && variantValueId) {
        createVariantOptions.push({
          variantId: variantId,
          variantValueId: variantValueId,
        });
      }
    });
  });

  console.log('create variant options: ', createVariantOptions);

  await bulkCreateVariantOptions(createVariantOptions);

  return product.id;
};
