import { StyleSheet, View } from 'react-native';
import React, { FC, ReactNode } from 'react';
import HeaderText from './Texts/HeaderText';
import PressableOpacity from './Buttons/PressableOpacity';
import Ionicons from '@expo/vector-icons/Ionicons';
import Spacing from '@/constants/Spacing';
import { router } from 'expo-router';
import Color from '@/constants/Color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Dropdown from './Dropdown/Dropdown';
import SubheaderText from './Texts/SubheaderText';
import BoldSubheaderText from './Texts/BoldSubheaderText';

interface PlazaHeaderProps {
  leftIcon?: ReactNode;
  leftOnClick?: () => void;
  name: string;
  rightIcon?: ReactNode;
  rightOnClick?: () => void;
  accountForSafeArea?: boolean;
  headerDropdown?: boolean;
  headerOptions?: { name: string; onPress: () => void }[];
}

const PlazaHeader: FC<PlazaHeaderProps> = ({
  leftIcon = <Ionicons name="close-outline" size={28} />,
  leftOnClick = () => router.back(),
  name,
  rightIcon = null,
  rightOnClick,
  accountForSafeArea = true,
  headerDropdown = false,
  headerOptions = [],
}) => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.header,
        { paddingTop: accountForSafeArea ? inset.top : 0 },
      ]}
    >
      <View style={styles.iconContainer}>
        <PressableOpacity onPress={leftOnClick}>{leftIcon}</PressableOpacity>
      </View>
      {headerDropdown ? (
        <Dropdown headerOptions={headerOptions}>
          <BoldSubheaderText>{name}</BoldSubheaderText>
        </Dropdown>
      ) : (
        <BoldSubheaderText>{name}</BoldSubheaderText>
      )}
      <View style={styles.iconContainer}>
        <PressableOpacity onPress={rightOnClick}>{rightIcon}</PressableOpacity>
      </View>
    </View>
  );
};

export default PlazaHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Color.GREY_100,
    paddingHorizontal: Spacing.SPACING_3,
    paddingVertical: Spacing.SPACING_1,
    gap: 8,
  },
  iconContainer: {
    width: 30,
    height: 30,
  },
});
