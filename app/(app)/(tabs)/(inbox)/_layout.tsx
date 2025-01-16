import React from 'react';
import { Stack } from 'expo-router';

const InboxLayout = () => {
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
