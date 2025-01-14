import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import PlazaText from './Texts/PlazaText';
import Color from '@/constants/Color';
import PressableOpacity from './Buttons/PressableOpacity';
import { FC } from 'react';

interface AddImageProps {
  imageUri?: string;
  onPress: () => void;
}

const AddImage: FC<AddImageProps> = ({ imageUri, onPress }) => {
  return (
    <PressableOpacity
      style={[styles.container, { borderWidth: imageUri ? 0 : 2 }]}
      onPress={onPress}
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <PlazaText>Icon</PlazaText>
      )}
    </PressableOpacity>
  );
};

export default AddImage;

const styles = StyleSheet.create({
  container: {
    borderColor: Color.BORDER_SECONDARY,
    borderStyle: 'dashed',
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },
});
