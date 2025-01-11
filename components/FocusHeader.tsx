import { StyleSheet, View } from 'react-native';
import React, { ReactNode } from 'react';
import HeaderText from './Texts/HeaderText';
import PressableOpacity from './Buttons/PressableOpacity';
import Ionicons from '@expo/vector-icons/Ionicons';
import Spacing from '@/constants/Spacing';
import { router } from 'expo-router';
import Color from '@/constants/Color';

interface FocusHeaderProps {
  leftIcon: ReactNode;
  leftOnClick: () => void;
  name: string;
  rightIcon?: ReactNode;
  rightOnClick?: () => void;
}

const FocusHeader = ({
  leftIcon = <Ionicons name="close-outline" size={32} />,
  leftOnClick = () => router.back(),
  name,
  rightIcon,
  rightOnClick,
}: FocusHeaderProps) => {
  return (
    <View style={styles.header}>
      <PressableOpacity onPress={leftOnClick}>{leftIcon}</PressableOpacity>
      <HeaderText>{name}</HeaderText>
      <PressableOpacity
        onPress={rightOnClick}
        style={{ marginLeft: 'auto', marginRight: 16 }}
      >
        {rightIcon}
      </PressableOpacity>
    </View>
  );
};

export default FocusHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.BORDER_SECONDARY,
    paddingHorizontal: Spacing.SPACING_3,
    paddingVertical: Spacing.SPACING_1,
    gap: Spacing.SPACING_3,
  },
});
