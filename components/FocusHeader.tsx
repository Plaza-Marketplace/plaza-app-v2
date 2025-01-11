import { StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import HeaderText from './Texts/HeaderText';
import PressableOpacity from './Buttons/PressableOpacity';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

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
      <HeaderText style={styles.textStyle}>{name}</HeaderText>
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
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  textStyle: {
    marginLeft: 5,
  },
});
