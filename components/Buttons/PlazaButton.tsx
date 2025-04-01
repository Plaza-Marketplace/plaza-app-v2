import { FC } from 'react';
import PressableOpacity from './PressableOpacity';
import { PressableProps, StyleSheet, View } from 'react-native';
import Color from '@/constants/Color';
import BodyText from '../Texts/BodyText';
import Radius from '@/constants/Radius';
import Spacing from '@/constants/Spacing';

interface PlazaButtonProps extends PressableProps {
  title: string;
  icon?: React.ReactNode;
  fontColor?: Color;
}

const PlazaButton: FC<PlazaButtonProps> = ({
  title,
  icon,
  style,
  fontColor = Color.NEUTRALS_WHITE,
  ...rest
}) => {
  return (
    <PressableOpacity style={[styles.container, style]} {...rest}>
      {icon ? (
        <View style={{ marginRight: Spacing.SPACING_1 }}>{icon}</View>
      ) : (
        ''
      )}
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: Radius.MD,
  },
});
