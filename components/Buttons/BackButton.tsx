import { StyleSheet, View } from 'react-native';
import { ChevronLeft } from '../Icons';
import Color from '@/constants/Color';
import PressableOpacity from './PressableOpacity';
import { router } from 'expo-router';
import Radius from '@/constants/Radius';

const BackButton = () => {
  return (
    <PressableOpacity style={styles.container} onPress={router.back}>
      <ChevronLeft color={'#000'} />
    </PressableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: Color.NEUTRALS_100,
    padding: 10,
    borderRadius: Radius.LG,
  },
});
