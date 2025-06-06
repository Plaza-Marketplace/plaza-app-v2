import { Event, track } from '@/analytics/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  VariantsDisplay,
  VariantOption,
} from '@/screens/Upload/List-Product/schema';
import { createProduct } from '@/services/crud/product';
import { uploadProductsAndVariants } from '@/services/variants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUploadProduct = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (spec: CreateProduct) => createProduct(spec),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['products', user?.id],
        (oldProducts: Product[] | undefined) => {
          return oldProducts ? [...oldProducts, data] : [data];
        }
      );
      track(Event.LISTED_PRODUCT, { productId: data.id });
    },
  });
};

export const useUploadProductsWithVariants = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      spec,
      options,
      values,
    }: {
      spec: CreateProduct;
      options: VariantOption[];
      values: VariantsDisplay[];
    }) => uploadProductsAndVariants(spec, options, values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products', user?.id] });
      track(Event.LISTED_PRODUCT, { productId: data });
    },
  });
};
