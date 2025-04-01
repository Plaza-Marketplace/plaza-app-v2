import { PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import PressableOpacity from './PressableOpacity';
import Radius from '@/constants/Radius';
import Spacing from '@/constants/Spacing';
import Color from '@/constants/Color';
import BodyText from '../Texts/BodyText';

interface HighlightButtonProps extends PressableProps {
  title: string;
  icon: React.ReactNode; // Replace with your icon type
  style?: StyleProp<ViewStyle>;
}

const HighlightButton: FC<HighlightButtonProps> = ({
  title,
  icon,
  style,
  ...rest
}) => {
  return (
    <PressableOpacity
      style={[styles.container, styles.shadow, style]}
      {...rest}
    >
      <BodyText
        variant="lg"
        fontWeight={'semibold'}
        color={Color.PRIMARY_DEFAULT}
      >
        {title}
      </BodyText>
      {icon}
    </PressableOpacity>
  );
};

export default HighlightButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.LG,
    paddingVertical: Spacing.SPACING_4,
    paddingHorizontal: Spacing.SPACING_3,
    backgroundColor: Color.PRIMARY_100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    color: Color.PRIMARY_DEFAULT,
  },
  shadow: {
    shadowColor: Color.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5, // For Android
  },
});
