import ProductCollection from '@/components/Product/ProductCollection';
import SearchBar from '@/components/SearchBar';
import AllTags from '@/components/Tags/AllTags';
import HeadingText from '@/components/Texts/HeadingText';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Camera, MapView } from '@rnmapbox/maps';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

const Event = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const eventId = parseInt(id);

  const snapPoints = useMemo(() => ['10%', '80%'], []);

  return (
    <View style={styles.container}>
      <MapView style={{ flex: 1 }}>
        <Camera
          zoomLevel={5}
          centerCoordinate={[37.789, 30.41]}
          animationMode="flyTo"
          animationDuration={1000}
        />
      </MapView>
      <BottomSheet
        index={0}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
      >
        <BottomSheetView style={styles.content}>
          <View style={styles.header}>
            <HeadingText variant="h5-bold">Explore Products</HeadingText>
            <SearchBar placeholder="Search products" />
          </View>
          <AllTags />

          <View style={styles.nearbyItems}>
            <HeadingText variant="h6">Nearby Items</HeadingText>
            <ProductCollection />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 16,
  },
  header: {
    paddingHorizontal: 16,
    gap: 16,
  },
  nearbyItems: {
    paddingHorizontal: 16,
  },
});
