import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import React from 'react';
import Color from '@/constants/Color';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import HeadingText from '@/components/Texts/HeadingText';
import BodyText from '@/components/Texts/BodyText';
import { PlazaLogo } from '@/components/Icons';
import { router } from 'expo-router';

const PlazaReference = () => {
  return (
    <PressableOpacity
      style={styles.container}
      onPress={() => router.push('/about-plaza')}
    >
      <View style={styles.image}>
        <PlazaLogo width={32} height={32} color={Color.WHITE} />
      </View>
      <View style={styles.content}>
        <HeadingText variant="h6">{'Plaza'}</HeadingText>
        <BodyText variant="md" numberOfLines={1} color={Color.NEUTRALS_DEFAULT}>
          {'A message from the team'}
        </BodyText>
      </View>
    </PressableOpacity>
  );
};

export default PlazaReference;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  content: {
    gap: 4,
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Color.PRIMARY_DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
