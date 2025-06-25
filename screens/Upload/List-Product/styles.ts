import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Color.GREY_100,
    paddingBottom: Spacing.SPACING_5,
  },
  infoContainer: {
    gap: Spacing.SPACING_4,
    paddingHorizontal: Spacing.SPACING_3,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
    gap: Spacing.SPACING_2,
    paddingHorizontal: Spacing.SPACING_2,
    paddingTop: Spacing.SPACING_3,
  },
  inputContainer: {
    gap: Spacing.SPACING_5,
  },
  headerContainer: {
    flexDirection: 'column',
    padding: Spacing.SPACING_2,
    gap: Spacing.SPACING_2,
  },
});
