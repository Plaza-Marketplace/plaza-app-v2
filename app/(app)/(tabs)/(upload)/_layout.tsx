import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

const _layout = () => {
  return (
    <Stack
      initialRouteName="landing-page"
      screenOptions={{ headerShown: false }}
    />
  );
};

export default _layout;

const styles = StyleSheet.create({});
