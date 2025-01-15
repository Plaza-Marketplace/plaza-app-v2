import { Image, ImageProps } from 'expo-image';
import { FC, useState } from 'react';
import { View } from 'react-native';

interface PlazaImageProps extends ImageProps {}

const PlazaImage: FC<PlazaImageProps> = (props) => {
  const [error, setError] = useState<boolean | null>(null);

  return error ? (
    <Image source={props.source} {...props} onError={() => setError(true)} />
  ) : (
    <View style={{}} />
  );
};

export default PlazaImage;
