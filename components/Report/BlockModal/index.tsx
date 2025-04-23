import { Alert, StyleSheet, View } from 'react-native';
import React, { FC, RefObject, useMemo, useState } from 'react';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import HeadingText from '@/components/Texts/HeadingText';
import Spacing from '@/constants/Spacing';
import PlazaButton from '@/components/Buttons/PlazaButton';
import ThankYou from '../components/ThankYou';
import { useBlockUser } from './hooks';

interface BlockModalProps {
  userId: Id;
  bottomSheetRef: RefObject<BottomSheetModal>;
}

const BlockModal: FC<BlockModalProps> = ({ userId, bottomSheetRef }) => {
  const [submitted, setSubmitted] = useState(false);
  const snapPoints = useMemo(() => ['50%'], []);
  const { mutateAsync: blockUser } = useBlockUser();

  const handleSubmit = async () => {
    try {
      await blockUser(userId);
    } catch (e) {
      console.error(e);
      Alert.alert(
        'Error',
        'There was an error submitting your report. Please try again later.'
      );
    }

    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      )}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <HeadingText variant="h6-bold">Block User</HeadingText>

        <PlazaButton
          title="Block"
          onPress={() => handleSubmit()}
          style={{ marginTop: Spacing.SPACING_3 }}
        />
      </View>
    </BottomSheetModal>
  );
};

export default BlockModal;

const styles = StyleSheet.create({});
