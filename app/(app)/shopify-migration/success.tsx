import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';

const ShopifySuccess = () => {
  const url = Linking.useURL();

  const [params, setParams] = useState({});

  if (url) {
    const { hostname, path, queryParams } = Linking.parse(url);
    console.log('Hostname:', hostname);
    console.log('Path:', path);
    console.log('Query Params:', JSON.stringify(queryParams));
    if (queryParams) {
      setParams(queryParams);
    }
  }
  return (
    <SafeAreaView>
      <Text>ShopifySuccess</Text>
      <Text>Received url: {url}</Text>
      <Text>params: </Text>
    </SafeAreaView>
  );
};

export default ShopifySuccess;

const styles = StyleSheet.create({});
