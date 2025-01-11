import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { FC, useMemo, useRef } from 'react';
import HeaderText from './Texts/HeaderText';

interface AddContentModalProps {
  title: string;
}

const AddContentModal: FC<AddContentModalProps> = ({ title }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['50%'], []);

  if (bottomSheetModalRef.current) {
    bottomSheetModalRef.current.expand();
  }

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      index={0}
      backdropComponent={() => null}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <HeaderText>{title}</HeaderText>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default AddContentModal;
