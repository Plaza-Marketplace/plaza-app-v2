import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { PlazaTextProps } from './PlazaText';
import PressableOpacity from '../Buttons/PressableOpacity';
import BodyText from './BodyText';
import Color from '@/constants/Color';

interface LinkTextProps extends PlazaTextProps {
  href: string;
  children: React.ReactNode;
  variant: keyof typeof styles;
}

const LinkText: FC<LinkTextProps> = ({ href, children, variant, ...rest }) => {
  const openURL = () => {
    Linking.openURL(href).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  return (
    <BodyText
      variant={variant}
      style={{
        color: Color.PRIMARY_DEFAULT,
        textDecorationLine: 'underline',
      }}
      onPress={openURL}
      {...rest}
    >
      {children}
    </BodyText>
  );
};

export default LinkText;

const styles = StyleSheet.create({
  ['lg-bold']: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  ['lg-semibold']: {
    fontSize: 16,
    fontWeight: 'semibold',
    lineHeight: 24,
  },
  ['lg-medium']: {
    fontSize: 16,
    fontWeight: 'medium',
    lineHeight: 24,
  },
  lg: {
    fontSize: 16,
    fontWeight: 'regular',
    lineHeight: 24,
  },
  ['md-bold']: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  ['md-regular']: {
    fontSize: 14,
    fontWeight: 'regular',
    lineHeight: 20,
  },
  ['md-medium']: {
    fontSize: 14,
    fontWeight: 'medium',
    lineHeight: 20,
  },
  md: {
    fontSize: 14,
    fontWeight: 'regular',
    lineHeight: 20,
  },
  ['sm-bold']: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  ['sm-regular']: {
    fontSize: 12,
    fontWeight: 'regular',
    lineHeight: 18,
  },
  ['sm-medium']: {
    fontSize: 12,
    fontWeight: 'medium',
    lineHeight: 18,
  },
  sm: {
    fontSize: 12,
    fontWeight: 'regular',
    lineHeight: 18,
  },
});
