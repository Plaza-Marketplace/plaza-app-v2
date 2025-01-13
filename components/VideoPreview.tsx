import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { useVideoPlayer, VideoView } from 'expo-video';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface VideoPreviewProps {
  uri: string | null;
}

const VideoPreview: FC<VideoPreviewProps> = ({ uri }) => {
  const player = useVideoPlayer(uri);

  return uri ? (
    <VideoView player={player} style={styles.container} />
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
