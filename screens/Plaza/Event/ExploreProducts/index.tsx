import BottomSheet from '@gorhom/bottom-sheet';
import { FC, RefObject, useMemo } from 'react';
import { Event } from '../models';
import { BoothContainer } from '../BoothContainer';

interface ExploreProductsProps {
  bottomSheetRef: RefObject<BottomSheet>;
  sellers: Event['sellers'];
  fetchNextPage: () => void;
}

const ExploreProducts: FC<ExploreProductsProps> = ({
  bottomSheetRef,
  sellers,
  fetchNextPage,
}) => {
  const snapPoints = useMemo(() => [80, '80%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
    >
      <BoothContainer
        name="Explore Products"
        sellers={sellers}
        fetchNextPage={fetchNextPage}
      />
    </BottomSheet>
  );
};

export default ExploreProducts;
