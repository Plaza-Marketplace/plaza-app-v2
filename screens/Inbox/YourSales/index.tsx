import HeadingText from '@/components/Texts/HeadingText';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import OrderCard from '@/components/Inbox/OrderCard';
import { useGetYourSalesScreen } from './hooks';

const YourSales = () => {
  const { data, error } = useGetYourSalesScreen();
  const insets = useSafeAreaInsets();
  const pendingSales = data?.pendingSales ?? [];
  const completedSales = data?.completedSales ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ gap: 24 }}>
        <View style={styles.section}>
          <HeadingText variant="h5-bold">Pending Sales</HeadingText>
          {pendingSales.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              status={order.status}
              product={order.product}
              createdAt={order.createdAt}
              isOrder={false}
            />
          ))}
        </View>
        <View style={styles.section}>
          <HeadingText variant="h5-bold">Completed Sales</HeadingText>
          {completedSales.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              status={order.status}
              product={order.product}
              createdAt={order.createdAt}
              isOrder={false}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default YourSales;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    gap: 16,
  },
});
