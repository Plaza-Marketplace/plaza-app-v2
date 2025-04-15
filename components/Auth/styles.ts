import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import Spacing from '@/constants/Spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonStyle: {
    height: 55,
    backgroundColor: Color.WHITE,
    borderWidth: 1,
    borderColor: Color.NEUTRALS_DEFAULT,
    borderRadius: Radius.ROUNDED,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
