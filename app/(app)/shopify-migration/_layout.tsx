import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router, Stack } from 'expo-router';

const ShopifyMigration = () => {
  return (
    <Stack
      initialRouteName="landing-page"
      screenOptions={{ headerShown: false }}
    />
  );
};

export default ShopifyMigration;

const styles = StyleSheet.create({});
