import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { Image } from 'expo-image';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import PressableOpacity from './Buttons/PressableOpacity';

interface VideoPreviewProps {
  uri: string | null;
  onPress?: () => void;
}

const VideoPreview: FC<VideoPreviewProps> = ({ uri, onPress }) => {
  const [thumbnail, setThumbnail] = useState<Url | null>(null);

  useEffect(() => {
    if (!uri) return;

    VideoThumbnails.getThumbnailAsync(uri, { quality: 0 }).then(({ uri }) =>
      setThumbnail(uri)
    );
  }, []);

  return uri ? (
    <PressableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: thumbnail }} style={styles.container} />
    </PressableOpacity>
  ) : (
    <PressableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.container} />
    </PressableOpacity>
  );
};

export default VideoPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    borderRadius: Radius.ROUNDED,
    backgroundColor: Color.SURFACE_SECONDARY,
  },
});
