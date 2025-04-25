import { MarkerView } from '@rnmapbox/maps';
import { FC, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useGetEventPin } from './hooks';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import HeadingText from '@/components/Texts/HeadingText';
import ProductCollection from '@/components/Product/ProductCollection';
import Color from '@/constants/Color';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import Radius from '@/constants/Radius';

interface PinProps {
  id: Id;
  name: string;
  coordinates: [number, number];
}

const Pin: FC<PinProps> = ({ id, name, coordinates }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, error } = useGetEventPin(id, isOpen);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <MarkerView id={id.toString()} coordinate={coordinates} allowOverlap>
        <PressableOpacity
          style={styles.container}
          onPress={() => bottomSheetRef.current?.present()}
        >
          <HeadingText variant="h6-bold">{name}</HeadingText>
        </PressableOpacity>
      </MarkerView>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['50%']}
        enableDynamicSizing={false}
        onChange={(index) => {
          if (index === -1) {
            setIsOpen(false);
          } else {
            setIsOpen(true);
          }
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
        )}
      >
        <ProductCollection
          title={name}
          description="Nearby Products"
          products={data?.products ?? []}
        />
      </BottomSheetModal>
    </>
  );
};

export default Pin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.WHITE,
    padding: 8,
    borderRadius: Radius.ROUNDED,
  },
  content: {
    flex: 1,
    gap: 16,
  },
});
