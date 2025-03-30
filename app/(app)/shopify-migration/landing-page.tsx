import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlazaTextInput from '@/components/PlazaTextInput';
import PlazaButton from '@/components/Buttons/PlazaButton';
import { Redirect, router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import Loading from '@/components/Loading';

const ShopifyLandingPage = () => {
  const [input, setInput] = useState('');
  const api_key = process.env.EXPO_PUBLIC_SHOPIFY_API_KEY || '';
  const scope = 'read_products';
  const redirect_uri = 'https://www.plaza-app.com/shopify-migration/success';

  return (
    <SafeAreaView>
      <Text>ShopifyLandingPage</Text>
      <PlazaTextInput
        placeholder="Your Shopify Store URL (e.g., sadmeowsong.myshopify.com)"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
        textContentType="URL"
        value={input}
        onChangeText={setInput}
      />
      <PlazaButton
        title="Try Shopify"
        onPress={async () => {
          // Handle button press
          console.log('Shopify button pressed');
          const auth_url = `https://${input}/admin/oauth/authorize?client_id=${api_key}&scope=${scope}&redirect_uri=${redirect_uri}`;
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
