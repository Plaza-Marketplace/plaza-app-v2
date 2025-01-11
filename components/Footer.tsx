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
}

const Footer: FC<FooterProps> = ({
  leftTitle,
  rightTitle,
  leftOnPress,
  rightOnPress,
}) => {
  return (
    <View style={styles.buttonsContainer}>
      <PlazaButton
        title={leftTitle}
        style={{ flex: 1 }}
        onPress={leftOnPress}
      />
      <PlazaButton
        title={rightTitle}
        style={{ flex: 1 }}
        onPress={rightOnPress}
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
    paddingHorizontal: Spacing.SPACING_2,
    paddingTop: Spacing.SPACING_3,
  },
});
