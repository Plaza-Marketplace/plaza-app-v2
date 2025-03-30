import { SectionList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MOCK_PURCHASES } from '@/models/__mocks__/order_history';
import OrderHistoryCard from '@/components/OrderHistoryCard';
import { OrderStatus } from '@/models/orderHistoryItem';
import HeaderText from '@/components/Texts/HeaderText';
import Spacing from '@/constants/Spacing';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router } from 'expo-router';
import { useGetPurchases } from '@/hooks/routes/orderhistory';

const Purchases = () => {
  // const purchases = MOCK_PURCHASES;
  const { data: purchases, isLoading, isError } = useGetPurchases();
  if (isLoading) return <Text>Loading...</Text>;
  if (!purchases) return <Text>No purchases found</Text>;
  if (isError) return <Text>Error loading purchases</Text>;
  return (
    <SectionList
      sections={[
        {
          title: 'Pending Purchases',
          data: purchases.filter(
            (item) => item.status !== OrderStatus.DELIVERED
          ),
        },
        {
          title: 'Completed Purchases',
          data: purchases.filter(
            (item) => item.status === OrderStatus.DELIVERED
          ),
        },
      ]}
      style={{ paddingHorizontal: Spacing.SPACING_3 }}
      renderItem={({ item }) => (
        <PressableOpacity
          style={styles.cardMargins}
          onPress={() =>
            router.push({
              pathname: '/order-details',
              params: { orderId: item.id, side: 'purchases' },
            })
          }
        >
          <OrderHistoryCard order={item} side="buy" />
        </PressableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <HeaderText>{title}</HeaderText>
        </View>
      )}
      stickySectionHeadersEnabled={false}
    />
  );
};

export default Purchases;

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: Spacing.SPACING_3,
  },
  cardMargins: {
    marginVertical: Spacing.SPACING_2,
  },
});
