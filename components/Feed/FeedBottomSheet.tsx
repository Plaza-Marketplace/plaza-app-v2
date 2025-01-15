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
  const snapPoints = useMemo(() => ['60%'], []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      )}
      enableDynamicSizing={false}
    >
      <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
};

export default FeedBottomSheet;
