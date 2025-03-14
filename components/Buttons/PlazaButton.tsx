import { FC } from 'react';
import PressableOpacity from './PressableOpacity';
import { PressableProps, StyleSheet } from 'react-native';
import Color from '@/constants/Color';
import BodyText from '../Texts/BodyText';
import Radius from '@/constants/Radius';

interface PlazaButtonProps extends PressableProps {
  title: string;
  fontColor?: Color;
}

const PlazaButton: FC<PlazaButtonProps> = ({
  title,
  style,
  fontColor = Color.NEUTRALS_WHITE,
  ...rest
}) => {
  return (
    <PressableOpacity style={[styles.container, style]} {...rest}>
      <BodyText variant="md-bold" color={fontColor}>
        {title}
      </BodyText>
    </PressableOpacity>
  );
};

export default PlazaButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.PRIMARY_DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: Radius.MD,
  },
});
