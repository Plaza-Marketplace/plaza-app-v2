import ShoppingCartProductCard from '@/components/Product/ProductCards/ShoppingCartProductCard';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { useAuth } from '@/contexts/AuthContext';
import useGetOrderHistoryItemsByUserId from '@/hooks/queries/useGetOrderHistoryItems';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { ScrollView, StyleSheet } from 'react-native';

const OrderHistoryScreen = () => {
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const { data: orders } = useGetOrderHistoryItemsByUserId(user?.id);

  return (
    <ScrollView style={styles.container}>
      {orders?.map((order) => (
        <ShoppingCartProductCard
          key={order.id}
          product={order.product}
          showCheckbox={false}
          orderStatus={order.status}
        />
      ))}
    </ScrollView>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.SPACING_3,
    gap: Spacing.SPACING_3,
    backgroundColor: Color.SURFACE_PRIMARY,
  },
  content: {
    flex: 1,
    gap: Spacing.SPACING_3,
  },
});
