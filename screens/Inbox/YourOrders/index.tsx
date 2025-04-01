import HeadingText from '@/components/Texts/HeadingText';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetYourOrdersScreen } from './hooks';
import OrderCard from '@/components/Inbox/OrderCard';

const YourOrders = () => {
  const { data, error } = useGetYourOrdersScreen();

  const pendingOrders = data?.pendingOrders ?? [];
  const completedOrders = data?.completedOrders ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ gap: 24 }}>
        <View style={styles.section}>
          <HeadingText variant="h5-bold">Pending Orders</HeadingText>
          {pendingOrders.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              status={order.status}
              product={order.product}
              createdAt={order.createdAt}
            />
          ))}
        </View>
        <View style={styles.section}>
          <HeadingText variant="h5-bold">Completed Orders</HeadingText>
          {completedOrders.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              status={order.status}
              product={order.product}
              createdAt={order.createdAt}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default YourOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    gap: 16,
  },
});
