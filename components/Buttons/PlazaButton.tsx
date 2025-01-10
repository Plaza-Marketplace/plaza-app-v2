import { FC } from 'react';
import PressableOpacity from './PressableOpacity';
import PlazaText from '../Texts/PlazaText';
import { PressableProps, StyleSheet } from 'react-native';
import Color from '@/constants/Color';

interface PlazaButtonProps extends PressableProps {
  title: string;
}

const PlazaButton: FC<PlazaButtonProps> = ({ title, ...rest }) => {
  return (
    <PressableOpacity style={styles.container} {...rest}>
      <PlazaText color={Color.TEXT_PRIMARY_FLIP}>{title}</PlazaText>
    </PressableOpacity>
  );
};

export default PlazaButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: Color.SURFACE_SECONDARY,
    borderRadius: 100,
  },
});
