import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeadingText from '@/components/Texts/HeadingText';
import BodyText from '@/components/Texts/BodyText';
import { router } from 'expo-router';

const CreationSuccess = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Redirect to the main app page after 3 seconds
      // You can replace this with your actual navigation logic
      router.replace('/(app)/(tabs)/(upload)/landing-page');
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView>
      <HeadingText variant="h5-bold" style={{ margin: 20 }}>
        Your Stripe account has been successfully created!
      </HeadingText>
      <View style={{ margin: 20 }}>
        <BodyText variant="md">Redirecting you back to our app...</BodyText>
      </View>
    </SafeAreaView>
  );
};

export default CreationSuccess;

const styles = StyleSheet.create({});
