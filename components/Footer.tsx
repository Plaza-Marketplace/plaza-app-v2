import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { StyleSheet, View } from 'react-native';
import PlazaButton from './Buttons/PlazaButton';
import { FC } from 'react';

interface FooterProps {
  leftTitle: string;
  rightTitle: string;
  leftOnPress: () => void;
  rightOnPress: () => void;
  rightDisabled?: boolean;
  leftDisabled?: boolean;
}

const Footer: FC<FooterProps> = ({
  leftTitle,
  rightTitle,
  leftOnPress,
  rightOnPress,
  rightDisabled,
  leftDisabled,
}) => {
  return (
    <View style={styles.buttonsContainer}>
      <PlazaButton
        title={leftTitle}
        style={[styles.leftButton, styles.buttonPadding]}
        fontColor={Color.PRIMARY_DEFAULT}
        onPress={leftOnPress}
        disabled={leftDisabled}
      />
      <PlazaButton
        title={rightTitle}
        style={[styles.rightButton, styles.buttonPadding]}
        onPress={rightOnPress}
        disabled={rightDisabled} 
      />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
    gap: Spacing.SPACING_2,
    paddingHorizontal: Spacing.SPACING_4,
    paddingTop: Spacing.SPACING_3,
  },
  leftButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Color.PRIMARY_DEFAULT,
    backgroundColor: Color.WHITE,
  },
  rightButton: {
    flex: 1,
  },
  buttonPadding: {
    paddingVertical: Spacing.SPACING_3,
  },
});
