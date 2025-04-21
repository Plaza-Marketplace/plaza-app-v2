import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import PressableOpacity from '../Buttons/PressableOpacity';
import BodyText from '../Texts/BodyText';
import Spacing from '@/constants/Spacing';
import Color from '@/constants/Color';

interface MenuButtonProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

const MenuButton: FC<MenuButtonProps> = ({ icon, title, onPress }) => {
  return (
    <PressableOpacity style={styles.buttonContainer} onPress={onPress}>
      {icon}
      <BodyText variant="lg-bold" style={styles.buttonText}>
        {title}
      </BodyText>
    </PressableOpacity>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: Spacing.SPACING_3,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
  },
  buttonText: {
    marginLeft: Spacing.SPACING_3,
  },
});
