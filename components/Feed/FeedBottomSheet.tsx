import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { FC, PropsWithChildren, useMemo } from 'react';

interface FeedBottomSheetProps extends PropsWithChildren {
  bottomSheetRef: React.RefObject<BottomSheetModal>;
}

const FeedBottomSheet: FC<FeedBottomSheetProps> = ({
  bottomSheetRef,
  children,
}) => {
  const snapPoints = useMemo(() => ['50%'], []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      backdropComponent={BottomSheetBackdrop}
    >
      <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
};

export default FeedBottomSheet;
