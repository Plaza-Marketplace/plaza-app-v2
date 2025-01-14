import { SelectedCartItemsProvider } from '@/contexts/CartSelectedProductsContext';
import { Stack } from 'expo-router';

export default function MarketplaceLayout() {
  return (
    <SelectedCartItemsProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SelectedCartItemsProvider>
  );
}
