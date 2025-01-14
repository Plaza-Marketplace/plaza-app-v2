import { useAuth } from '@/contexts/AuthContext';
import useGetOrderHistoryItemsByUserId from '@/hooks/queries/useGetOrderHistoryItemsByUserId';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { Text, View } from 'react-native';

const OrderHistoryScreen = () => {
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const { data: orders } = useGetOrderHistoryItemsByUserId(user?.id);

  return (
    <View>
      {orders?.map((order) => (
        <View key={order.id}>
          <Text>{order.id}</Text>
          <Text>{order.status}</Text>
          <Text>{order.createdAt}</Text>
        </View>
      ))}
    </View>
  );
};

export default OrderHistoryScreen;
