import { MarkerView } from '@rnmapbox/maps';
import { FC, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useGetEventPin } from './hooks';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import Color from '@/constants/Color';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import Radius from '@/constants/Radius';
import BodyText from '@/components/Texts/BodyText';
import { BoothContainer } from '../BoothContainer';

interface PinProps {
  id: Id;
  name: string;
  coordinates: [number, number];
  scale: number;
}

const Pin: FC<PinProps> = ({ id, name, scale, coordinates }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, error } = useGetEventPin(id, isOpen);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['80%'], []);

  return (
    <>
      <MarkerView id={id.toString()} coordinate={coordinates} allowOverlap>
        <PressableOpacity
          style={[styles.container, { transform: [{ scale }] }]}
          onPress={() => {
            bottomSheetRef.current?.present();
            console.log(id);
          }}
        >
          <BodyText variant="sm-bold" style={{ fontSize: 10 }}>
            {name}
          </BodyText>
        </PressableOpacity>
      </MarkerView>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
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
        <BoothContainer name={name} sellers={data?.sellers ?? []} />
      </BottomSheetModal>
    </>
  );
};

export default Pin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.WHITE,
    padding: 4,
    borderRadius: Radius.ROUNDED,
  },
  content: {
    flex: 1,
    gap: 16,
  },
});
