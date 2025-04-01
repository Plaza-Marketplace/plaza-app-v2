import BackButton from '@/components/Buttons/BackButton';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { useRecordedVideo } from '@/contexts/RecordedVideoProvider';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Alert, Text, SafeAreaView } from 'react-native';
import { Camera, useCameraDevice, VideoFile } from 'react-native-vision-camera';

const VideoRecorder = () => {
  const [cameraPosition, setCameraPosition] = useState<'back' | 'front'>(
    'back'
  );
  const device = useCameraDevice(cameraPosition);
  const { setRecordedVideo } = useRecordedVideo();
  const camera = useRef<Camera>(null);
  const [isRecording, setIsRecording] = useState(false);

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

  const onMediaCaptured = useCallback((media: VideoFile, type: 'video') => {
    console.log(`Media captured! ${JSON.stringify(media)}`);
    setRecordedVideo(media);
    router.navigate('/video-upload/landing-page');
  }, []);

  const startRecording = async () => {
    if (device && !isRecording) {
      setIsRecording(true);
      try {
        const video = await camera.current?.startRecording({
          fileType: 'mp4',
          flash: 'off',
          onRecordingFinished: (video) => {
            console.log('Video saved at:', video.path);
            onMediaCaptured(video, 'video');
          },
          onRecordingError: (error) => {
            console.error('Recording Error:', error);
          },
        });
      } catch (error) {
        console.error('Start Recording Error:', error);
      }
    }
  };

  const stopRecording = () => {
    if (camera.current && isRecording) {
      camera.current.stopRecording();
      setIsRecording(false);
    }
  };

  return (
    <>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={false}
        video={true}
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
            {isRecording ? (
              <PressableOpacity
                onPress={stopRecording}
                style={{
                  borderWidth: 1,
                  borderColor: Color.WHITE,
                  padding: Spacing.SPACING_2,
                  borderRadius: 9999,
                }}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 9999,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name="stop" size={40} color={Color.RED_500} />
                </View>
              </PressableOpacity>
            ) : (
              <PressableOpacity
                onPress={startRecording}
                style={{
                  borderWidth: 1,
                  borderColor: Color.WHITE,
                  padding: Spacing.SPACING_2,
                  borderRadius: 9999,
                }}
              >
                <View
                  style={{
                    backgroundColor: Color.RED_500,
                    width: 60,
                    height: 60,
                    borderRadius: 9999,
                  }}
                />
              </PressableOpacity>
            )}

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
