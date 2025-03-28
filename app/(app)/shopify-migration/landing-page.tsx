import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlazaTextInput from '@/components/PlazaTextInput';
import PlazaButton from '@/components/Buttons/PlazaButton';

const ShopifyLandingPage = () => {
  const [input, setInput] = useState('');

  const store_url = 'sadmeowsong.myshopify.com';
  const api_key = process.env.EXPO_PUBLIC_SHOPIFY_API_KEY || '';
  const scope = 'read_products';
  const redirect_uri = 'https://www.plaza-app.com/shopify-migration/success';
  const auth_url = `https://${store_url}/admin/oauth/authorize?client_id=${api_key}&scope=${scope}&redirect_uri=${redirect_uri}`;

  return (
    <SafeAreaView>
      <Text>ShopifyLandingPage</Text>
      <PlazaTextInput
        placeholder="Search for products"
        value={input}
        onChangeText={setInput}
      />
      <PlazaButton
        title="Try Shopify"
        onPress={async () => {
          // Handle button press
          console.log('Shopify button pressed');
          const supported = await Linking.canOpenURL(auth_url);
          if (supported) {
            Linking.openURL(auth_url);
          } else {
            console.log('Unable to open URL:', auth_url);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default ShopifyLandingPage;

const styles = StyleSheet.create({});
