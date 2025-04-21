import { StyleSheet } from 'react-native';
import React, { FC, RefObject, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import UserReportModal from '@/components/Report/ReportModal/UserReportModal';
import MenuModal from '@/components/Menu';
import MenuButton from '@/components/Menu/MenuButton';
import { Ionicons } from '@expo/vector-icons';
import BlockModal from '@/components/Report/BlockModal';

interface OptionsProps {
  userId: Id;
  bottomSheetRef: RefObject<BottomSheetModal>;
}

const Options: FC<OptionsProps> = ({ userId, bottomSheetRef }) => {
  const reportRef = useRef<BottomSheetModal>(null);
  const blockRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <MenuModal bottomSheetRef={bottomSheetRef}>
        <MenuButton
          icon={<Ionicons name="flag-outline" size={24} />}
          title="Report"
          onPress={() => reportRef.current?.present()}
        />
        <MenuButton
          icon={<Ionicons name="ban-outline" size={24} />}
          title="Block"
          onPress={() => blockRef.current?.present()}
        />
      </MenuModal>
      <UserReportModal userId={userId} bottomSheetRef={reportRef} />
      <BlockModal userId={userId} bottomSheetRef={blockRef} />
    </>
  );
};

export default Options;

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
