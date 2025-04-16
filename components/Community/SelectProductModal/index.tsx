import ExitButton from '@/components/Buttons/ExitButton';
import PlazaButton from '@/components/Buttons/PlazaButton';
import Catalog from '@/components/Catalog';
import MyItems from '@/components/MyItems';
import HeadingText from '@/components/Texts/HeadingText';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { FC, RefObject, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import Dots from '@/components/Dots';
import { useSharedValue } from 'react-native-reanimated';

interface SelectProductModalProps {
  multiple: boolean;
  onSubmit: (productIds: Id[]) => void;
  bottomSheetRef: RefObject<BottomSheetModal>;
  title: string;
}

const SelectProductModal: FC<SelectProductModalProps> = ({
  bottomSheetRef,
  multiple,
  onSubmit,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProductIds, setSelectedProductIds] = useState<Id[]>([]);
  console.log(isOpen);
  const handlePress = (productId: Id) => {
    if (!multiple) {
      setSelectedProductIds([productId]);
      return;
    }

    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
    } else {
      setSelectedProductIds((prev) => [...prev, productId]);
    }
  };
  const handleSubmit = () => {
    onSubmit(selectedProductIds);
    bottomSheetRef.current?.close();
    setSelectedProductIds([]);
  };

  const progress = useSharedValue(0);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      )}
      enableDynamicSizing={false}
      snapPoints={['90%']}
      onChange={(index) => {
        if (index === -1) {
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      }}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={{ flex: 1 / 5 }}>
            <ExitButton onPress={() => bottomSheetRef.current?.close()} />
          </View>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HeadingText variant="h6-bold">{title}</HeadingText>
          </View>

          <View style={{ flex: 1 / 5 }}>
            <PlazaButton title="Add" onPress={handleSubmit} />
          </View>
        </View>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height * 0.7,
          }}
        >
          <Carousel
            pagingEnabled
            onProgressChange={progress}
            onSnapToItem={(index) => setActiveIndex(index)}
            loop={false}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').height * 0.7}
            data={[0, 1]}
            renderItem={({ item }) => {
              if (item === 0) {
                return (
                  <Catalog
                    enabled={isOpen}
                    onPress={handlePress}
                    selectedProductIds={selectedProductIds}
                  />
                );
              }
              return (
                <MyItems
                  enabled={isOpen}
                  onPress={handlePress}
                  selectedProductIds={selectedProductIds}
                />
              );
            }}
          />
        </View>
        <View style={{ alignItems: 'center', paddingTop: 16 }}>
          <Dots count={2} activeIndex={activeIndex} />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default SelectProductModal;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
});
