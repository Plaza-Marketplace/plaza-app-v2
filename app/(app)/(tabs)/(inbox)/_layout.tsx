import React, { useContext } from 'react';
import { Stack } from 'expo-router';
import { AuthContext } from '@/contexts/AuthContext';
import { Text } from 'react-native';

const InboxLayout = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <Text>Loading...</Text>;
  return (
    <Stack>
      <Stack.Screen name="activity" options={{ headerShown: false }} />
      <Stack.Screen name="follow_request" options={{ headerShown: false }} />
      <Stack.Screen name="message_list" options={{ headerShown: false }} />
      <Stack.Screen name="message" options={{ headerShown: false }} />
    </Stack>
  );
};

export default InboxLayout;
