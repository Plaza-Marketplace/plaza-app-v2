import {
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, { FC } from 'react';
import Spacing from '@/constants/Spacing';
import PressableOpacity from './PressableOpacity';
import Radius from '@/constants/Radius';
import Color from '@/constants/Color';
import HeaderText from '../Texts/HeaderText';
import BodyText from '../Texts/BodyText';
import PlazaText from '../Texts/PlazaText';

interface DescriptionButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  description: string;
  leftIcon: React.ReactNode; // Replace with your icon type
}

const PlazaDescriptionButton: FC<DescriptionButtonProps> = ({
  title,
  description,
  leftIcon,
  style,
  ...rest
}) => {
  return (
    <PressableOpacity style={[styles.container, style]} {...rest}>
      <View style={styles.iconContainer}>{leftIcon}</View>
      <View style={styles.textContainer}>
        <HeaderText style={styles.text}>{title}</HeaderText>
        <View style={{ marginTop: Spacing.SPACING_1 }}>
          <PlazaText style={styles.text}>{description}</PlazaText>
        </View>
      </View>
    </PressableOpacity>
  );
};

export default PlazaDescriptionButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.LG,
    paddingVertical: Spacing.SPACING_3,
    backgroundColor: Color.PRIMARY_100,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1, // Take the remaining space
    paddingRight: Spacing.SPACING_3,
    justifyContent: 'center', // Center vertically
  },
  text: {
    color: Color.PRIMARY_DEFAULT,
  },
});
