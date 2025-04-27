import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlazaTextInput from '@/components/PlazaTextInput';
import PlazaButton from '@/components/Buttons/PlazaButton';
import PlazaHeader from '@/components/PlazaHeader';
import HeadingText from '@/components/Texts/HeadingText';
import KeyboardView from '@/components/KeyboardView';
import BodyText from '@/components/Texts/BodyText';
import Spacing from '@/constants/Spacing';
import Footer from '@/components/Footer';
import { router } from 'expo-router';
import { Plaza } from '@/components/Icons';

const ShopifyLandingPage = () => {
  const [input, setInput] = useState('');
  const api_key = process.env.EXPO_PUBLIC_SHOPIFY_API_KEY || '';
  const scope = 'read_products';
  const redirect_uri = 'https://www.plaza-app.com/shopify-migration/success';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PlazaHeader name="Shopify Migration" accountForSafeArea={false} />

      <KeyboardView style={{ flex: 1, padding: 20 }}>
        <HeadingText variant="h5-bold">Your Shopify Information</HeadingText>

        <BodyText variant="lg">
          Help us make the transfer process more efficient by giving us
          information about your store!
        </BodyText>

        <View style={{ marginTop: Spacing.SPACING_4 }}>
          <PlazaTextInput
            label="Shopify Domain"
            placeholder="Your Shopify Store URL (e.g., sadmeowsong.myshopify.com)"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            textContentType="URL"
            value={input}
            onChangeText={setInput}
          />
        </View>
      </KeyboardView>

      {/* <PlazaButton
        title="Test jump straight to success"
        onPress={() => router.push('/shopify-migration/success')}
      /> */}

      <Footer
        leftTitle="Back"
        rightTitle="Begin Transfer"
        leftOnPress={() => router.back()}
        rightOnPress={() => {
          Linking.openURL(
            `https://${input}/admin/oauth/authorize?client_id=${api_key}&scope=${scope}&redirect_uri=${redirect_uri}`
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ShopifyLandingPage;

const styles = StyleSheet.create({});
