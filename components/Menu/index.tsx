import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import HeadingText from '../Texts/HeadingText';
import Spacing from '@/constants/Spacing';

interface MenuModalProps {
  bottomSheetRef?: React.RefObject<BottomSheetModal>;
  children?: React.ReactNode;
}

const MenuModal: FC<MenuModalProps> = ({ bottomSheetRef, children }) => {
  const snapPoints = useMemo(() => ['50%'], []);
  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      )}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
    >
      <View style={styles.container}>
        <HeadingText variant="h6-bold" style={styles.headingMargin}>
          Menu
        </HeadingText>
        {children}
      </View>
    </BottomSheetModal>
  );
};

export default MenuModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  headingMargin: {
    marginBottom: Spacing.SPACING_3,
  },
});
