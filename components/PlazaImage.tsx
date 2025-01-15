import { Image, ImageProps } from 'expo-image';
import { FC, useState } from 'react';

interface PlazaImageProps extends ImageProps {}

const PlazaImage: FC<PlazaImageProps> = (props) => {
  const [error, setError] = useState<boolean | null>(null);

  return error ? (
    <Image source={props.source} {...props} onError={() => setError(true)} />
  ) : (
    <Image {...props} />
  );
};

export default PlazaImage;
