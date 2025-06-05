import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { StyleSheet } from 'react-native';

export const accountDetailStyles = StyleSheet.create({
  inputStyle: {
    padding: Spacing.SPACING_2,
    fontSize: 16,
  },
  slide: {
    flex: 1,
    paddingHorizontal: Spacing.SPACING_4,
    paddingTop: Spacing.SPACING_2,
  },
  footer: {
    backgroundColor: Color.WHITE,
    paddingHorizontal: Spacing.SPACING_4,
    paddingTop: Spacing.SPACING_2,
  },
  shadow: {
    shadowColor: Color.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
