import { FC } from 'react';
import PressableOpacity from './PressableOpacity';

import { PressableProps, StyleSheet } from 'react-native';
import Color from '@/constants/Color';
import StandardText from '../Texts/StandardText';
import Spacing from '@/constants/Spacing';

interface PlazaButtonProps extends PressableProps {
  title: string;
  fontColor?: Color;
}

const PlazaButton: FC<PlazaButtonProps> = ({
  title,
  style,
  fontColor = Color.TEXT_PRIMARY_FLIP,
  ...rest
}) => {
  return (
    <PressableOpacity style={[styles.container, style]} {...rest}>
      <StandardText color={fontColor} fontWeight={600}>
        {title}
      </StandardText>
    </PressableOpacity>
  );
};

export default PlazaButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.SURFACE_SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.SPACING_4,
    paddingVertical: Spacing.SPACING_3,
    borderRadius: 100,
  },
});
