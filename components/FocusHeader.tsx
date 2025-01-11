import { StyleSheet, View } from 'react-native';
import React from 'react';
import HeaderText from './Texts/HeaderText';
import PressableOpacity from './Buttons/PressableOpacity';
import Ionicons from '@expo/vector-icons/Ionicons';
import Spacing from '@/constants/Spacing';
import { router } from 'expo-router';
import Color from '@/constants/Color';

interface FocusHeaderProps {
  name: string;
}

const FocusHeader = ({ name }: FocusHeaderProps) => {
  return (
    <View style={styles.header}>
      <PressableOpacity onPress={router.back}>
        <Ionicons name="close-outline" size={32} />
      </PressableOpacity>
      <HeaderText>{name}</HeaderText>
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
