import FocusHeader from '@/components/FocusHeader';
import LinkItemsProduct from '@/components/LinkItemsProduct';
import Footer from '@/components/Footer';
import { router } from 'expo-router';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView style={{ flex: 1 }}>
      <FocusHeader name="Link Items" />
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
      <Footer
        leftTitle="Cancel"
        rightTitle="Confirm Items"
        leftOnPress={router.back}
        rightOnPress={handleSubmit}
      />
    </SafeAreaView>
  );
};

export default LinkItems;
