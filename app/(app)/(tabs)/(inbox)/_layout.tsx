import React from 'react';
import { Stack } from 'expo-router';

const InboxLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName="landing-page"
    />
  );
};

export default InboxLayout;
