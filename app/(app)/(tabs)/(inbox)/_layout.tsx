import React from 'react';
import { Stack } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import AnonymousPrompt from '@/screens/Anonymous';

const InboxLayout = () => {
  const { session } = useAuth();
  const isAnonymous = session?.user.is_anonymous;

  if (isAnonymous) {
    return <AnonymousPrompt />;
  }

  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName="landing-page"
    />
  );
};

export default InboxLayout;
