import { FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import QuickCrypto from 'react-native-quick-crypto';
import { ScrollView } from 'react-native-gesture-handler';
import { productShopifyToPlaza, ShopifyProduct } from '@/services/shopify';
import { useAuth } from '@/contexts/AuthContext';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import Spacing from '@/constants/Spacing';
import ProductCard from '@/components/Product/ProductCard';

type ShopifySuccessParams = {
  code?: string;
  hmac?: string;
  host?: string;
  shop?: string;
  timestamp?: string;
};

const ShopifySuccess = () => {
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const params = useLocalSearchParams<ShopifySuccessParams>();
  // const url =
  ('https://www.plaza-app.com/shopify-migration/success?code=cb2ebb44baec30b52107305b46029123&hmac=e930f1befda9cb9cf62c09681bfce074a29c0f55c157a32e9f8dcf0abbaffd23&host=YWRtaW4uc2hvcGlmeS5jb20vc3RvcmUvc2FkbWVvd3Nvbmc&shop=sadmeowsong.myshopify.com&timestamp=1743300386');
  // Parse the URL to extract query parameters
  // const parsedUrl = new URL(url);
  // const params: ShopifySuccessParams = {
  //   code: parsedUrl.searchParams.get('code') || undefined,
  //   hmac: parsedUrl.searchParams.get('hmac') || undefined,
  //   host: parsedUrl.searchParams.get('host') || undefined,
  //   shop: parsedUrl.searchParams.get('shop') || undefined,
  //   timestamp: parsedUrl.searchParams.get('timestamp') || undefined,
  // };

  const [accessToken, setAccessToken] = useState();
  const [products, setProducts] = useState<Product[]>();
  const [status, setStatus] = useState<string>('initializing');

  useEffect(() => {
    const receivedHmac = params.hmac;
    const hmacParams = {
      code: params.code,
      host: params.host,
      shop: params.shop,
      timestamp: params.timestamp,
    };

    const sortedParams = new URLSearchParams(
      hmacParams as Record<string, string>
    );
    const paramString = sortedParams.toString();
    const computedHmac = QuickCrypto.createHmac(
      'sha256',
      process.env.EXPO_PUBLIC_SHOPIFY_SECRET_KEY || ''
    ).update(paramString);

    // Verify the HMAC
    if (!receivedHmac) {
      setStatus('Missing HMAC');
      console.error('HMAC is missing');
      return;
    }
    if (computedHmac.digest('hex') !== receivedHmac) {
      setStatus('Invalid HMAC');
      console.error('HMAC verification failed');
      return;
    }

    const access_token_url = `https://${params.shop}/admin/oauth/access_token`;
    const access_token_params = {
      client_id: process.env.EXPO_PUBLIC_SHOPIFY_API_KEY || '',
      client_secret: process.env.EXPO_PUBLIC_SHOPIFY_SECRET_KEY || '',
      code: params.code,
    };

    fetch(access_token_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(access_token_params),
    })
      .then(async (response) => {
        if (!response.ok) {
          setStatus('Access token response was not ok');
          console.error('Error fetching access token:', response.json());
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAccessToken(data.access_token);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    if (accessToken && user) {
      // You can now use the access token to make authenticated requests to the Shopify API
      fetch(`https://${params.shop}/admin/api/2025-01/products.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken, // Use the access token here
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            console.error('Error fetching products:', response);
            setStatus('Products response was not ok');
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          // Check if products are returned
          if (!data.products || data.products.length === 0) {
            setStatus('No products found');
            console.log('No products found.');
            return;
          }
          const fetchedProducts: Product[] = data.products.map(
            (product: ShopifyProduct) => {
              return productShopifyToPlaza(user.id, product);
            }
          );
          setProducts(fetchedProducts);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, [accessToken, user]);

  if (!params.code || !params.hmac) {
    return (
      <SafeAreaView>
        <Text>ShopifySuccess</Text>
        <Text>Missing required params</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>ShopifySuccess</Text>
      <Text>Status: {status}</Text>
      <Text>Received params: {JSON.stringify(params)}</Text>
      <Text>Received access token: {accessToken}</Text>
      <Text>Number of products: {products ? products.length : 0}</Text>
      {products ? (
        <FlatList
          style={styles.flatlistContainer}
          data={products}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.productCardContainer}>
              <ProductCard
                id={item.id}
                name={item.name}
                username={'poop'}
                thumbnailUrl={item.imageUrls[0]}
                rating={4}
                price={item.price}
              />
            </View>
          )}
        />
      ) : (
        <Text>No products fetched yet.</Text>
      )}
    </SafeAreaView>
  );
};

export default ShopifySuccess;

const styles = StyleSheet.create({
  flatlistContainer: {
    marginTop: Spacing.SPACING_2,
    flex: 1,
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: Spacing.SPACING_3,
  },
  productCardContainer: {
    flex: 1 / 2,
  },
});
