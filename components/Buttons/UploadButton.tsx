import { StyleSheet } from 'react-native';
import PressableOpacity from './PressableOpacity';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { Upload } from '../Icons';

const UploadButton = () => {
  return (
    <PressableOpacity style={styles.container}>
      <Upload color={'#000'} width={24} />
    </PressableOpacity>
  );
};

export default UploadButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: Color.NEUTRALS_100,
    padding: 10,
    borderRadius: Radius.LG,
  },
});
