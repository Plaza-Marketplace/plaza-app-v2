import { FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import QuickCrypto from 'react-native-quick-crypto';
import { productShopifyToPlaza, ShopifyProduct } from '@/services/shopify';
import { useAuth } from '@/contexts/AuthContext';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import Spacing from '@/constants/Spacing';
import HeadingText from '@/components/Texts/HeadingText';
import BodyText from '@/components/Texts/BodyText';
import LinkItemsProduct from '@/components/LinkItemsProduct';
import PlazaButton from '@/components/Buttons/PlazaButton';
import Footer from '@/components/Footer';
import { useUploadProducts } from '@/hooks/routes/shopify_transfer';
import { testUploadArrayBuffers } from '@/services/crud/product';

type ShopifySuccessParams = {
  code?: string;
  hmac?: string;
  host?: string;
  shop?: string;
  timestamp?: string;
};

async function imageUrlToBase64(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const data = reader.result;
      if (typeof data !== 'string') {
        reject('No data');
        return;
      }
      resolve(data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function imageUrlToArrayBuffer(url: string) {
  const response = await fetch(url);
  return await response.arrayBuffer();
}

const ShopifySuccess = () => {
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const { mutate: createProducts } = useUploadProducts();
  const params = useLocalSearchParams<ShopifySuccessParams>();

  // const url =
  //   'https://www.plaza-app.com/shopify-migration/success?code=611bfbd9c88c0b48d0b675239e66f62f&hmac=6031aff409eb9e24ccb62542e1866735dd170767b7ca9690e5385ce165e0cacc&host=YWRtaW4uc2hvcGlmeS5jb20vc3RvcmUvc2FkbWVvd3Nvbmc&shop=sadmeowsong.myshopify.com&timestamp=1743480824';
  // // Parse the URL to extract query parameters
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
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleSelectProduct = (product: Product) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleSubmit = async () => {
    if (selectedProducts.length === 0) {
      return;
    }

    const productsToUpload = await Promise.all(
      selectedProducts.map(async (product) => {
        const base64Images = await Promise.all(
          product.imageUrls.map(async (imageUri) => {
            return await imageUrlToArrayBuffer(imageUri);
          })
        );
        return {
          name: product.name,
          sellerId: user?.id,
          description: product.description,
          shippingPrice: product.shippingPrice,
          price: product.price,
          base64Images: [],
          arrayBufferImages: base64Images,
          quantity: product.quantity,
          hasVariants: false,
        } as CreateProduct;
      })
    );

    createProducts(productsToUpload);
    router.navigate('/shopify-migration/confirmation');
  };

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
      <View style={styles.container}>
        <HeadingText variant="h5-bold">Products Transferring</HeadingText>
        <BodyText variant="lg">
          Here are some products that we fetched from your Shopify Store.
        </BodyText>

        <View
          style={{
            marginTop: Spacing.SPACING_4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <HeadingText variant="h6-bold">Select Products</HeadingText>
          <PlazaButton
            title={'Select All'}
            onPress={() => {
              if (products) {
                setSelectedProducts(products);
              }
            }}
          />
        </View>
        {products ? (
          <FlatList
            style={styles.flatlistContainer}
            data={products}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.productCardContainer}>
                <LinkItemsProduct
                  product={item}
                  isSelected={selectedProducts.includes(item)}
                  onPress={handleSelectProduct}
                />
              </View>
            )}
          />
        ) : (
          <Text>No products fetched yet.</Text>
        )}
      </View>

      <Footer
        leftTitle="Back"
        rightTitle="Begin Transfer"
        leftOnPress={() => {
          router.navigate('/shopify-migration/landing-page');
        }}
        rightOnPress={handleSubmit}
      />
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
  },
  productCardContainer: {
    flex: 1 / 2,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.SPACING_3,
    paddingTop: Spacing.SPACING_4,
  },
});
