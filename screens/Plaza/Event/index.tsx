import ProductCollection from '@/components/Product/ProductCollection';
import SearchBar from '@/components/SearchBar';
import AllTags from '@/components/Tags/AllTags';
import HeadingText from '@/components/Texts/HeadingText';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Camera, MapView, PointAnnotation, UserLocation } from '@rnmapbox/maps';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import useGetEvent from './useGetEvent';
import BodyText from '@/components/Texts/BodyText';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/components/Buttons/BackButton';
import GroupIcon from '@/components/Community/GroupIcon';

const Event = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const eventId = parseInt(id);
  const { data, error } = useGetEvent(eventId);

  const snapPoints = useMemo(() => [60, '80%'], []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.backButtonContainer}>
        <BackButton alternativeColor />
      </SafeAreaView>
      <MapView style={{ flex: 1 }} scaleBarEnabled={false} compassEnabled>
        <Camera
          zoomLevel={15}
          centerCoordinate={data?.coordinates}
          animationMode="none"
          animationDuration={0}
        />
        {data?.coordinates && (
          <PointAnnotation
            key="pointAnnotation"
            id="pointAnnotation"
            coordinate={data?.coordinates}
            onSelected={() => bottomSheetRef.current?.expand()}
          >
            <View>
              <GroupIcon size={32} url={null} />
              <BodyText variant="sm-bold">{'Jackalope'}</BodyText>
            </View>
          </PointAnnotation>
        )}

        <UserLocation />
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
          {/* <AllTags /> */}

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
  backButtonContainer: {
    position: 'absolute',
    zIndex: 99,
    paddingLeft: 16,
  },
});
