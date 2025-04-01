import Sale from '@/screens/Inbox/Sale';
import { useLocalSearchParams } from 'expo-router';

const SaleScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log(id);
  return <Sale id={parseInt(id)} />;
};

export default SaleScreen;
