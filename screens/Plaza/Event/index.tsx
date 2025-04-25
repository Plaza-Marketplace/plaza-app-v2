import ProductCollection from '@/components/Product/ProductCollection';
import HeadingText from '@/components/Texts/HeadingText';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Camera, MapView, MarkerView, UserLocation } from '@rnmapbox/maps';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useGetEvent, useAddEventPin } from './hooks';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import BackButton from '@/components/Buttons/BackButton';
import Pin from './Pin';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { Image } from 'expo-image';
import { Zoomable } from '@likashefqet/react-native-image-zoom';
import ExitButton from '@/components/Buttons/ExitButton';
import PlazaTextInput from '@/components/PlazaTextInput';
import PlazaButton from '@/components/Buttons/PlazaButton';

const Event = () => {
  const [zoom, setZoom] = useState(18);
  const [showMap, setShowMap] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinName, setPinName] = useState('');
  const [pinCoordinates, setPinCoordinates] = useState<[number, number] | null>(
    null
  );
  const { id } = useLocalSearchParams<{ id: string }>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const eventId = parseInt(id);
  const { data, error } = useGetEvent(eventId);
  const { mutate: addPin } = useAddEventPin(eventId);

  const snapPoints = useMemo(() => [80, '80%'], []);
  const insets = useSafeAreaInsets();

  const scale = useMemo(() => {
    if (zoom < 17.5) return 0;

    return zoom - 17;
  }, [zoom]);

  const handleLongPress = (feature: GeoJSON.Feature) => {
    if (feature.geometry.type === 'Point') {
      const coordinates = feature.geometry.coordinates as [number, number];
      setPinCoordinates(coordinates);
      setShowPinModal(true);
    }
  };

  const handleSubmit = () => {
    if (pinCoordinates) {
      addPin({
        name: pinName,
        coordinates: pinCoordinates,
      });
      setShowPinModal(false);
      setPinCoordinates(null);
      setPinName('');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.backButtonContainer}>
          <BackButton alternativeColor />
        </SafeAreaView>
        <MapView
          style={{ flex: 1 }}
          scaleBarEnabled={false}
          compassEnabled
          onLongPress={handleLongPress}
          onCameraChanged={(a) => {
            setZoom(a.properties.zoom);
          }}
        >
          <PressableOpacity
            style={{
              position: 'absolute',
              zIndex: 99,
              right: 16,
              top: insets.top + 64,
            }}
            onPress={() => setShowMap(true)}
          >
            <HeadingText variant="h6">Show map</HeadingText>
          </PressableOpacity>

          <Camera
            zoomLevel={18}
            centerCoordinate={data?.coordinates}
            animationMode="none"
            animationDuration={0}
          />
          {data?.pins.map((pin) => (
            <Pin
              key={pin.id}
              id={pin.id}
              name={pin.name}
              coordinates={pin.coordinates}
              scale={scale}
            />
          ))}
          {data?.coordinates && (
            <MarkerView
              key="pointAnnotation"
              id="pointAnnotation"
              coordinate={data?.coordinates}
            >
              <PressableOpacity
                onPress={() => bottomSheetRef.current?.expand()}
                style={{ alignItems: 'center' }}
              >
                {/* <GroupIcon size={32} url={null} /> */}
                <HeadingText variant="h6-bold">{data.name}</HeadingText>
              </PressableOpacity>
            </MarkerView>
          )}

          {pinCoordinates && (
            <Pin
              id={Math.random() * 1000000}
              name={pinName}
              coordinates={pinCoordinates}
              scale={scale}
            />
          )}

          <UserLocation />
        </MapView>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
        >
          <ProductCollection
            title="Explore Products"
            description="Nearby Items"
            products={data?.products ?? []}
          />
        </BottomSheet>
      </View>
      <Modal visible={showMap} animationType="slide">
        <View
          style={{
            position: 'absolute',
            zIndex: 99,
            paddingLeft: 16,
            top: insets.top,
          }}
        >
          <ExitButton onPress={() => setShowMap(false)} />
        </View>
        <Zoomable>
          <Image
            source={{ uri: data?.mapUrl }}
            style={{ width: '100%', height: '100%' }}
            contentFit="contain"
          />
        </Zoomable>
      </Modal>
      <Modal visible={showPinModal} animationType="fade" transparent>
        <View
          style={{
            position: 'absolute',
            zIndex: 99,
            paddingLeft: 16,
            top: insets.top,
          }}
        >
          <ExitButton
            onPress={() => {
              setShowPinModal(false);
              setPinCoordinates(null);
            }}
          />
        </View>
        <View style={styles.pinModal}>
          <View style={{ width: '80%' }}>
            <PlazaTextInput placeholder="Pin Name" onChangeText={setPinName} />
          </View>
          <PlazaButton title="Create Pin" onPress={handleSubmit} />
        </View>
      </Modal>
    </>
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
    padding: 16,
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
  pinModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    gap: 16,
  },
});
