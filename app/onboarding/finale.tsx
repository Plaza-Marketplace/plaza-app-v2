import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Color from '@/constants/Color';
import { PlazaLogo } from '@/components/Icons';
import HeadingText from '@/components/Texts/HeadingText';
import Spacing from '@/constants/Spacing';
import { router } from 'expo-router';

const Finale = () => {
  useEffect(() => {
    setTimeout(() => {
      // Navigate to the next screen
      router.push('/(app)/(tabs)/(marketplace)/(top-tabs)/feed');
    }, 3000);
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.PRIMARY_DEFAULT,
      }}
    >
      <PlazaLogo color={Color.WHITE} />
      <HeadingText
        variant="h3-bold"
        color={Color.WHITE}
        style={{ marginTop: Spacing.SPACING_5 }}
      >
        Welcome to Plaza
      </HeadingText>
    </View>
  );
};

export default Finale;

const styles = StyleSheet.create({});
