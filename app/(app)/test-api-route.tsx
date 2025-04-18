import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createPayment } from '@/services/stripe';
import PressableOpacity from '@/components/Buttons/PressableOpacity';

const TestAPIRoute = () => {
  const handlePress = async () => {
    const result = await createPayment();
  };

  return (
    <SafeAreaView>
      <Text>TestAPIRoute</Text>

      <PressableOpacity onPress={handlePress}>
        <Text>Press me</Text>
      </PressableOpacity>
    </SafeAreaView>
  );
};

export default TestAPIRoute;

const styles = StyleSheet.create({});
