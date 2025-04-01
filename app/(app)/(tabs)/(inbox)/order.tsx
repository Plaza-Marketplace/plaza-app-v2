import Order from '@/screens/Inbox/Order';
import { useLocalSearchParams } from 'expo-router';

const OrderScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <Order id={parseInt(id)} />;
};

export default OrderScreen;
