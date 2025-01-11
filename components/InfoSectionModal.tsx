import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { FC, useMemo } from 'react';
import HeaderText from './Texts/HeaderText';
import StandardText from './Texts/StandardText';

interface InfoSectionModalProps {
  title: string;
  items: string[];
  bottomSheetRef: React.RefObject<BottomSheetModal>;
}

const InfoSectionModal: FC<InfoSectionModalProps> = ({
  title,
  items,
  bottomSheetRef,
}) => {
  const snapPoints = useMemo(() => ['50%'], []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={BottomSheetBackdrop}
    >
      <BottomSheetView>
        <HeaderText>{title}</HeaderText>
        {items.map((item) => (
          <StandardText key={item}>{item}</StandardText>
        ))}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default InfoSectionModal;
