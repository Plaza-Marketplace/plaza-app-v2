import { useAuth } from '@/contexts/AuthContext';
import AnonymousPrompt from '@/screens/Anonymous';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

const _layout = () => {
  const { session } = useAuth();
  const isAnonymous = session?.user.is_anonymous;
  if (isAnonymous) {
    return <AnonymousPrompt />;
  }
  return (
    <Stack
      initialRouteName="landing-page"
      screenOptions={{ headerShown: false }}
    />
  );
};

export default _layout;

const styles = StyleSheet.create({});
