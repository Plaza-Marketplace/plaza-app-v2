import PressableOpacity from './PressableOpacity';
import { Exit } from '../Icons';
import { StyleSheet } from 'react-native';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { router } from 'expo-router';

const ExitButton = () => {
  return (
    <PressableOpacity style={styles.container} onPress={router.back}>
      <Exit color={Color.BLACK} />
    </PressableOpacity>
  );
};

export default ExitButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: Radius.ROUNDED,
    backgroundColor: Color.NEUTRALS_100,
  },
});
