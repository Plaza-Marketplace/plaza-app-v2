import { Stack } from 'expo-router';

export default function MarketplaceLayout() {
  return (
    <Stack>
      <Stack.Screen name="(top-tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="cart" />
    </Stack>
  );
}
