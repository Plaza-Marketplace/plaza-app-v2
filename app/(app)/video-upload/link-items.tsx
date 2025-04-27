import LinkItemsProduct from '@/components/LinkItemsProduct';
import { router } from 'expo-router';
import { FlatList } from 'react-native';
import { useGetProductsBySellerId } from '@/hooks/queries/useGetProductsBySellerId';
import { useAuth } from '@/contexts/AuthContext';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { useSelectedProducts } from '@/contexts/SelectedProductsContext';
import { useEffect, useState } from 'react';

const LinkItems = () => {
  const [tempSelectedProducts, setTempSelectedProducts] = useState<Product[]>(
    []
  );
  const { selectedProducts, setSelectedProducts } = useSelectedProducts();
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const { data: products, error } = useGetProductsBySellerId(user?.id);

  useEffect(() => {
    setTempSelectedProducts(selectedProducts);
  }, [selectedProducts]);

  const handleSelectProduct = (product: Product) => {
    if (tempSelectedProducts.includes(product)) {
      setTempSelectedProducts(
        tempSelectedProducts.filter((p) => p !== product)
      );
    } else {
      setTempSelectedProducts([...tempSelectedProducts, product]);
    }
  };

  const handleSubmit = () => {
    router.back();
    setSelectedProducts(tempSelectedProducts);
  };

  return (
    <FlatList
      numColumns={2}
      data={products}
      renderItem={({ item }) => (
        <LinkItemsProduct
          product={item}
          isSelected={tempSelectedProducts.includes(item)}
          onPress={handleSelectProduct}
        />
      )}
    />
  );
};

export default LinkItems;
