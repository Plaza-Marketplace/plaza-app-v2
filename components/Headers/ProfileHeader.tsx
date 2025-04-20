import { StyleSheet, View } from 'react-native';
import React, { FC, ReactNode } from 'react';
import PressableOpacity from '../Buttons/PressableOpacity';
import Spacing from '@/constants/Spacing';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BoldSubheaderText from '../Texts/BoldSubheaderText';
import HeadingText from '../Texts/HeadingText';

interface ProfileHeaderProps {
  name: string;
  leftIcon?: ReactNode;
  leftOnClick?: () => void;
  rightIcon?: ReactNode;
  rightOnClick?: () => void;
  accountForSafeArea?: boolean;
  headerDropdown?: boolean;
  headerOptions?: { name: string; onPress: () => void }[];
}

const ProfileHeader: FC<ProfileHeaderProps> = ({
  name,
  leftIcon = null,
  leftOnClick = () => {
    router.back();
  },
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
      <View style={styles.leftContainer}>
        {leftIcon ? (
          <PressableOpacity onPress={leftOnClick}>{leftIcon}</PressableOpacity>
        ) : (
          ''
        )}
        <HeadingText variant="h6-bold">{name}</HeadingText>
      </View>
      <View style={styles.iconContainer}>
        <PressableOpacity onPress={rightOnClick}>{rightIcon}</PressableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.SPACING_3,
    paddingVertical: Spacing.SPACING_1,
    gap: 8,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 30,
    height: 30,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.SPACING_2,
  },
});
