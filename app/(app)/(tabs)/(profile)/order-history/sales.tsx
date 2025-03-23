import { SectionList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MOCK_SALES } from '@/models/__mocks__/order_history';
import OrderHistoryCard from '@/components/OrderHistoryCard';
import { OrderStatus } from '@/models/orderHistoryItem';
import HeaderText from '@/components/Texts/HeaderText';
import Spacing from '@/constants/Spacing';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router } from 'expo-router';
import { useGetSales } from '@/hooks/routes/orderhistory';

const Sales = () => {
  // const sales = MOCK_SALES;
  const { data: sales, isLoading, isError } = useGetSales();
  if (isLoading) return <Text>Loading...</Text>;
  if (!sales) return <Text>No sales found</Text>;
  if (isError) return <Text>Error loading sales</Text>;
  return (
    <SectionList
      sections={[
        {
          title: 'Pending Sales',
          data: sales.filter((item) => item.status !== OrderStatus.DELIVERED),
        },
        {
          title: 'Completed Sales',
          data: sales.filter((item) => item.status === OrderStatus.DELIVERED),
        },
      ]}
      style={{ paddingHorizontal: Spacing.SPACING_3 }}
      renderItem={({ item }) => (
        <PressableOpacity
          style={styles.cardMargins}
          onPress={() =>
            router.push({
              pathname: '/order-details',
              params: { orderId: item.id, side: 'sales' },
            })
          }
        >
          <OrderHistoryCard order={item} side="sell" />
        </PressableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <HeaderText>{title}</HeaderText>
        </View>
      )}
    />
  );
};

export default Sales;

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: Spacing.SPACING_3,
  },
  cardMargins: {
    marginVertical: Spacing.SPACING_2,
  },
});
