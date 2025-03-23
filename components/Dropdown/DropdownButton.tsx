import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import HeaderText from '../Texts/HeaderText';
import PressableOpacity from '../Buttons/PressableOpacity';
import Spacing from '@/constants/Spacing';

interface DropdownButtonProps {
  name: string;
  useKey?: string;
  onPress: () => void;
}

const DropdownButton: FC<DropdownButtonProps> = ({ name, useKey, onPress }) => {
  return (
    <PressableOpacity
      style={styles.buttonContainer}
      onPress={onPress}
      key={useKey}
    >
      <HeaderText key={`${useKey}-label`}>{name}</HeaderText>
    </PressableOpacity>
  );
};

export default DropdownButton;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: Spacing.SPACING_2,
    paddingVertical: Spacing.SPACING_1,
  },
});
