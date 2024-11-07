import CommunityProduct from '@/models/communityProduct';
import { FC, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import CaptionText from '../Texts/CaptionText';
import Color from '@/constants/Color';
import PressableOpacity from '../Buttons/PressableOpacity';

interface CommunityProductPostProps {
  communityProduct: CommunityProduct;
}

const CommunityProductPost: FC<CommunityProductPostProps> = ({
  communityProduct,
}) => {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  Image.getSize(communityProduct.product.images[0], (width, height) => {
    setAspectRatio(width / height);
  });

  if (!aspectRatio) return null;

  return (
    <PressableOpacity style={{ gap: 4 }}>
      <Image
        source={{ uri: communityProduct.product.images[0] }}
        style={[styles.image, { aspectRatio }]}
      />
      {communityProduct.description && (
        <View style={styles.caption}>
          <CaptionText>{communityProduct.description}</CaptionText>
        </View>
      )}
    </PressableOpacity>
  );
};

export default CommunityProductPost;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: null,
    backgroundColor: Color.SURFACE_SECONDARY,
    borderRadius: 8,
  },
  caption: {
    paddingHorizontal: 4,
  },
});
