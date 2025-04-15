import { Tables } from '@/database.types';
import { supabase } from '@/utils/supabase';

// queries
const VARIANT_QUERY = `
  *
`;
const VARIANT_TYPE_QUERY = `
  *
`;
const VARIANT_VALUE_QUERY = `
  *,
  variant_type:product_variant_type(*)
`;
const VARIANT_OPTION_QUERY = `
  *,
  variant:product_variant(*),
  variant_value:product_variant_value(
    *,
    variant_type:product_variant_type(*)
  )
`;

// formatters
const formatProductVariant = (
  variant: Tables<'product_variant'>
): ProductVariant => {
  return {
    id: variant.id,
    price: variant.price,
    quantity: variant.quantity,
    productId: variant.product_id,
    createdAt: variant.created_at,
  };
};

const formatVariantType = (
  variantType: Tables<'product_variant_type'>
): VariantType => {
  return {
    id: variantType.id,
    productId: variantType.product_id,
    name: variantType.name,
    createdAt: variantType.created_at,
  };
};

const formatVariantValue = (
  variantValue: Tables<'product_variant_value'>,
  variantType: VariantType
): VariantValue => {
  return {
    id: variantValue.id,
    variantType: variantType,
    name: variantValue.name,
    createdAt: variantValue.created_at,
  };
};

const formatVariantOption = (
  variantOption: Tables<'product_variant_option'>,
  variant: ProductVariant,
  variantValue: VariantValue
): VariantOption => {
  return {
    id: variantOption.id,
    variant: variant,
    variantValue: variantValue,
    createdAt: variantOption.created_at,
  };
};

// create

export const createProductVariant = async (
  data: CreateProductVariant
): Promise<ProductVariant> => {
  const { data: variant, error } = await supabase
    .from('product_variant')
    .insert({
      price: data.price,
      quantity: data.quantity,
      product_id: data.productId,
    })
    .select(VARIANT_QUERY)
    .single();

  if (error) throw new Error('Failed to create product variant');

  return formatProductVariant(variant);
};

export const createVariantType = async (
  data: CreateVariantType
): Promise<VariantType> => {
  const { data: variantType, error } = await supabase
    .from('product_variant_type')
    .insert({
      name: data.name,
      product_id: data.productId,
    })
    .select(VARIANT_TYPE_QUERY)
    .single();

  if (error) throw new Error('Failed to create variant type');

  return formatVariantType(variantType);
};

export const createVariantValue = async (
  data: CreateVariantValue
): Promise<VariantValue> => {
  const { data: variantValue, error } = await supabase
    .from('product_variant_value')
    .insert({
      name: data.name,
      type_id: data.variantTypeId,
    })
    .select(VARIANT_VALUE_QUERY)
    .single();

  if (error) throw new Error('Failed to create variant value');

  return formatVariantValue(
    variantValue,
    formatVariantType(variantValue.variant_type)
  );
};

export const createVariantOption = async (
  data: CreateVariantOption
): Promise<VariantOption> => {
  const { data: variantOption, error } = await supabase
    .from('product_variant_option')
    .insert({
      variant_id: data.variantId,
      value_id: data.variantValueId,
    })
    .select(VARIANT_OPTION_QUERY)
    .single();

  if (error) throw new Error('Failed to create variant option');

  return formatVariantOption(
    variantOption,
    formatProductVariant(variantOption.variant),
    formatVariantValue(
      variantOption.variant_value,
      formatVariantType(variantOption.variant_value.variant_type)
    )
  );
};

// delete
export const deleteProductVariant = async (variantId: Id): Promise<void> => {
  const { error } = await supabase
    .from('product_variant')
    .delete()
    .eq('id', variantId);

  if (error) throw new Error('Failed to delete product variant');
};

export const deleteVariantType = async (variantTypeId: Id): Promise<void> => {
  const { error } = await supabase
    .from('product_variant_type')
    .delete()
    .eq('id', variantTypeId);

  if (error) throw new Error('Failed to delete variant type');
};

export const deleteVariantValue = async (variantValueId: Id): Promise<void> => {
  const { error } = await supabase
    .from('product_variant_value')
    .delete()
    .eq('id', variantValueId);

  if (error) throw new Error('Failed to delete variant value');
};

export const deleteVariantOption = async (
  variantOptionId: Id
): Promise<void> => {
  const { error } = await supabase
    .from('product_variant_option')
    .delete()
    .eq('id', variantOptionId);

  if (error) throw new Error('Failed to delete variant option');
};
