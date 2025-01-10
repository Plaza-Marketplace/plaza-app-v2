import { StyleSheet, View } from 'react-native';
import PlazaText from './Texts/PlazaText';
import Color from '@/constants/Color';

const AddImage = () => {
  return (
    <View style={styles.container}>
      <PlazaText>Icon</PlazaText>
    </View>
  );
};

export default AddImage;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Color.BORDER_SECONDARY,
    borderStyle: 'dashed',
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
