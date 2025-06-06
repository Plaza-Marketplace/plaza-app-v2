import HeadingText from '@/components/Texts/HeadingText';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  Camera,
  FillLayer,
  MapView,
  MarkerView,
  PointAnnotation,
  ShapeSource,
  UserLocation,
} from '@rnmapbox/maps';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { View } from 'react-native';
import {
  useAddEventBorderPins,
  useAddEventPin,
  useGetEventPage,
  useGetNextEventSellers,
  useUpdateCenter,
  useUpdateInitialHeading,
  useUpdateInitialZoom,
} from './hooks';
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
import ExploreProducts from './ExploreProducts';
import { Polygon } from 'geojson';
import { difference, featureCollection } from '@turf/turf';
import { debounce } from 'lodash';
import { Event as EventType } from '@/analytics/utils';
import useScreenTrack from '@/hooks/useScreenTrack';

const Event = () => {
  const [zoom, setZoom] = useState(18);
  const [heading, setHeading] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinName, setPinName] = useState('');
  const [pinCoordinates, setPinCoordinates] = useState<[number, number] | null>(
    null
  );
  const { id } = useLocalSearchParams<{ id: string }>();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const eventId = parseInt(id);
  const { data, error } = useGetEventPage(eventId);
  const getNextEventSellers = useGetNextEventSellers(eventId, data?.sellers);

  const { mutate: addPin } = useAddEventPin(eventId);
  const { mutate: addBorderPins } = useAddEventBorderPins(eventId);
  const { mutate: updateInitialHeading } = useUpdateInitialHeading(eventId);
  const { mutate: updateInitialZoom } = useUpdateInitialZoom(eventId);
  const { mutate: updateCenter } = useUpdateCenter(eventId);

  const [newBorderPins, setNewBorderPins] = useState<[number, number][]>([]);

  const insets = useSafeAreaInsets();

  useScreenTrack(EventType.VIEWED_EVENT, { eventId: eventId });

  const scale = useMemo(() => {
    if (zoom < 17.5) return 0.5;

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

  const handlePress = (feature: GeoJSON.Feature) => {
    if (!__DEV__) return;

    if (feature.geometry.type !== 'Point') return;

    const coordinates = feature.geometry.coordinates;
    setNewBorderPins((prev) => [...prev, coordinates as [number, number]]);
  };

  const handleSubmitBorderPins = () => {
    if (newBorderPins.length < 3) {
      return;
    }

    addBorderPins(newBorderPins);
    setNewBorderPins([]);
  };

  const handleDrag = debounce((feature: GeoJSON.Feature, index: number) => {
    if (feature.geometry.type !== 'Point') return;

    const coordinates = feature.geometry.coordinates;

    setNewBorderPins((prev) => {
      const updatedPins = [...prev];
      updatedPins[index] = coordinates as [number, number];
      return updatedPins;
    });
  }, 100);

  const borderPins = data?.borderPins.map((pin) => pin.coordinates) ?? [];

  const worldPolygon: GeoJSON.Feature<Polygon> = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-180, -90], // Bottom-left corner
          [-180, 90], // Top-left corner
          [180, 90], // Top-right corner
          [180, -90], // Bottom-right corner
          [-180, -90], // Closing the polygon
        ],
      ],
    },
    properties: {},
  };

  const highlightedShape: GeoJSON.Feature<Polygon> | null =
    borderPins.length >= 3
      ? {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [borderPins],
          },
          properties: {},
        }
      : newBorderPins.length >= 3
      ? {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [newBorderPins],
          },
          properties: {},
        }
      : null;

  const greyedOutPolygon =
    highlightedShape != null
      ? difference(featureCollection<Polygon>([worldPolygon, highlightedShape]))
      : worldPolygon;

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
          onPress={handlePress}
          onLongPress={handleLongPress}
          onCameraChanged={(a) => {
            setZoom(a.properties.zoom);
            setHeading(a.properties.heading);
          }}
        >
          {newBorderPins.map((pin, index) => (
            <PointAnnotation
              key={index.toString()}
              id={index.toString()}
              coordinate={pin}
              draggable
              onDrag={(feature) => handleDrag(feature, index)}
            >
              <HeadingText variant="h6-bold">X</HeadingText>
            </PointAnnotation>
          ))}
          {greyedOutPolygon && (
            <ShapeSource id="greyOverlay" shape={greyedOutPolygon}>
              <FillLayer
                id="greyFillLayer"
                style={{
                  fillColor: 'rgba(0, 0, 0, 0.5)',
                }}
              />
            </ShapeSource>
          )}
          <PlazaButton
            title="More info"
            style={{
              position: 'absolute',
              zIndex: 99,
              right: 16,
              top: insets.top + 64,
            }}
            onPress={() => setShowMap(true)}
          />
          {__DEV__ && (
            <>
              <PlazaButton
                title="Clear"
                style={{
                  position: 'absolute',
                  zIndex: 99,
                  right: 16,
                  top: insets.top + 128,
                }}
                onPress={() => setNewBorderPins([])}
              />
              <PlazaButton
                title="Submit Pins"
                style={{
                  position: 'absolute',
                  zIndex: 99,
                  right: 16,
                  top: insets.top + 192,
                }}
                onPress={handleSubmitBorderPins}
              />
              <PlazaButton
                title="Remove last"
                style={{
                  position: 'absolute',
                  zIndex: 99,
                  right: 16,
                  top: insets.top + 256,
                }}
                onPress={() => {
                  setNewBorderPins((prev) => prev.slice(0, -1));
                }}
              />
              <PlazaButton
                title="Update Heading"
                style={{
                  position: 'absolute',
                  zIndex: 99,
                  right: 16,
                  top: insets.top + 320,
                }}
                onPress={() => updateInitialHeading(heading)}
              />
              <PlazaButton
                title="Update Zoom"
                style={{
                  position: 'absolute',
                  zIndex: 99,
                  right: 16,
                  top: insets.top + 384,
                }}
                onPress={() => updateInitialZoom(zoom)}
              />
              <PlazaButton
                title="Update Center"
                style={{
                  position: 'absolute',
                  zIndex: 99,
                  right: 16,
                  top: insets.top + 448,
                }}
                onPress={() =>
                  newBorderPins.length > 0 && updateCenter(newBorderPins[0])
                }
              />
            </>
          )}
          <Camera
            zoomLevel={data?.initialZoom ?? 18}
            heading={data?.initialHeading ?? undefined}
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

          <UserLocation showsUserHeadingIndicator />
        </MapView>
        <ExploreProducts
          bottomSheetRef={bottomSheetRef}
          sellers={data?.sellers ?? []}
          fetchNextPage={getNextEventSellers}
        />
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
