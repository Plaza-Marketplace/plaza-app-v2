import BackButton from '@/components/Buttons/BackButton';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { useTakenPhoto } from '@/contexts/TakenPhotoProvider';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Alert, Text, SafeAreaView } from 'react-native';
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  VideoFile,
} from 'react-native-vision-camera';

const VideoRecorder = () => {
  const [cameraPosition, setCameraPosition] = useState<'back' | 'front'>(
    'back'
  );
  const device = useCameraDevice(cameraPosition);
  const { setTakenPhoto } = useTakenPhoto();
  const camera = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();
      if (
        cameraPermission !== 'granted' ||
        microphonePermission !== 'granted'
      ) {
        Alert.alert(
          'Permissions required',
          'Please enable camera and microphone permissions.'
        );
      }
    })();
  }, []);

  if (!device)
    return (
      <View style={styles.container}>
        <Text>No camera device found.</Text>
        <PressableOpacity
          onPress={() => router.back()}
          style={{ marginTop: 20 }}
        >
          <Text>Go Back</Text>
        </PressableOpacity>
      </View>
    );

  const onFlipCameraPressed = () => {
    setCameraPosition((p) => (p === 'back' ? 'front' : 'back'));
  };

  const onMediaCaptured = useCallback((media: PhotoFile, type: 'photo') => {
    console.log(`Media captured! ${JSON.stringify(media)}`);
    setTakenPhoto(media);
    router.navigate('/list-item/create-listing');
  }, []);

  const startTaking = async () => {
    if (device) {
      try {
        console.log('Taking photo...');
        const photo = await camera.current?.takePhoto({
          enableShutterSound: false,
        });
        onMediaCaptured(photo, 'photo');
      } catch (error) {
        console.error('Start Recording Error:', error);
      }
    }
  };

  return (
    <>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        video={false}
      />

      <SafeAreaView style={styles.buttonContainer}>
        <View style={styles.buttonPositionContainer}>
          <BackButton alternativeColor={true} />

          <View style={styles.bottomContainer}>
            <PressableOpacity
              style={{
                marginTop: Spacing.SPACING_3,
                padding: Spacing.SPACING_3,
                backgroundColor: 'lightgray',
                borderRadius: 9999,
                opacity: 0,
              }}
            >
              <Ionicons name="reload-outline" size={24} />
            </PressableOpacity>

            <PressableOpacity
              onPress={startTaking}
              style={{
                marginTop: Spacing.SPACING_3,
                padding: Spacing.SPACING_3,
                backgroundColor: Color.PRIMARY_DEFAULT,
                borderRadius: 9999,
              }}
            >
              <Ionicons name="camera" size={24} color="white" />
            </PressableOpacity>

            <PressableOpacity
              onPress={onFlipCameraPressed}
              style={{
                marginTop: Spacing.SPACING_3,
                padding: Spacing.SPACING_3,
                backgroundColor: 'lightgray',
                borderRadius: 9999,
              }}
            >
              <Ionicons name="reload-outline" size={24} />
            </PressableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: { width: '100%', height: 500 },
  buttonContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  buttonPositionContainer: {
    flex: 1,
    padding: Spacing.SPACING_3,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.SPACING_3,
    width: '100%',
  },
});

export default VideoRecorder;
