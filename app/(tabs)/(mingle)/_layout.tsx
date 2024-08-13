import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const MingleLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(top-tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MingleLayout;
