import { StyleSheet, View } from 'react-native';
import React, { FC, ReactNode } from 'react';
import HeaderText from './Texts/HeaderText';
import PressableOpacity from './Buttons/PressableOpacity';
import Ionicons from '@expo/vector-icons/Ionicons';
import Spacing from '@/constants/Spacing';
import { router } from 'expo-router';
import Color from '@/constants/Color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PlazaHeaderProps {
  leftIcon?: ReactNode;
  leftOnClick?: () => void;
  name: string;
  rightIcon?: ReactNode;
  rightOnClick?: () => void;
  accountForSafeArea?: boolean;
}

const PlazaHeader: FC<PlazaHeaderProps> = ({
  leftIcon = <Ionicons name="close-outline" size={32} />,
  leftOnClick = () => router.back(),
  name,
  rightIcon = null,
  rightOnClick,
  accountForSafeArea = true,
}) => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.header,
        { paddingTop: accountForSafeArea ? inset.top : 0 },
      ]}
    >
      <PressableOpacity onPress={leftOnClick}>{leftIcon}</PressableOpacity>
      <HeaderText>{name}</HeaderText>
      <PressableOpacity
        onPress={rightOnClick}
        style={{ marginLeft: 'auto', marginRight: 0 }}
      >
        {rightIcon}
      </PressableOpacity>
    </View>
  );
};

export default PlazaHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.GREY_100,
    borderBottomWidth: 2,
    borderBottomColor: Color.BORDER_SECONDARY,
    paddingHorizontal: Spacing.SPACING_3,
    paddingVertical: Spacing.SPACING_1,
  },
});
