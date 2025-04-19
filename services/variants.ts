import {
  VariantOption,
  VariantsDisplay,
} from '@/screens/Upload/List-Product/schema';
import { createProduct } from './crud/product';
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
  const product = await createProduct({
    ...productSpecs,
    hasVariants: true,
  });

  // create variants first, mapping value names to their IDs
  const variantMap = new Map<string, Id>();
  const variantTypeMap = new Map<string, Id>();

  const createVariants: CreateProductVariant[] = values.map((variantValue) => ({
    price: variantValue.value.price,
    quantity: variantValue.value.quantity,
    productId: product.id,
  }));

  const createdVariants = await bulkCreateProductVariants(createVariants);

  createdVariants.forEach((variant, index) => {
    values[index].fields.forEach((field) => {
      variantMap.set(`${field.type}-${field.value}`, variant.id);
    });
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

  const createVariantOptions: CreateVariantOption[] = createdVariantValues.map(
    (value) => {
      // first take the variantTypeId and map it back to its corresponding type name
      const variantTypeName = options.find((option) =>
        option.values.includes(value.name)
      )?.name;
      // then find the variant associated with the type-name
      const variantId = variantMap.get(`${variantTypeName}-${value.name}`);
      return {
        variantId: variantId || -1,
        variantValueId: value.id,
      };
    }
  );

  await bulkCreateVariantOptions(createVariantOptions);
};
