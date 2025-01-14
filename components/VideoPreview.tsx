import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { Image } from 'expo-image';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface VideoPreviewProps {
  uri: string | null;
}

const VideoPreview: FC<VideoPreviewProps> = ({ uri }) => {
  const [thumbnail, setThumbnail] = useState<Url | null>(null);

  useEffect(() => {
    if (!uri) return;

    VideoThumbnails.getThumbnailAsync(uri).then(({ uri }) => setThumbnail(uri));
  }, []);

  return uri ? (
    <Image source={{ uri: thumbnail }} style={styles.container} />
  ) : (
    <View style={styles.container}></View>
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
