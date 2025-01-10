import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { StyleSheet, View } from 'react-native';

const VideoPreview = () => {
  return <View style={styles.container}></View>;
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
