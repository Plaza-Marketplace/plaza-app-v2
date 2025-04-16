import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router } from 'expo-router';
import {
  bulkCreateProductVariants,
  createProductVariant,
} from '@/services/crud/variant';

const APITest = () => {
  const testCreateVariant: CreateProductVariant[] = [
    {
      price: 100,
      quantity: 10,
      productId: 94,
    },
    {
      price: 200,
      quantity: 20,
      productId: 94,
    },
  ];

  const startTest = async () => {
    await createProductVariant(testCreateVariant[0])
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
    await bulkCreateProductVariants(testCreateVariant)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  return (
    <SafeAreaView>
      <PressableOpacity onPress={() => router.back()}>
        <Text>Back</Text>
      </PressableOpacity>

      <PressableOpacity onPress={startTest}>
        <Text>Start Test</Text>
      </PressableOpacity>
    </SafeAreaView>
  );
};

export default APITest;

const styles = StyleSheet.create({});
