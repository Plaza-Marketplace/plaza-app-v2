import { FC, useState } from 'react';
import { Image as ExpoImage } from 'expo-image';
import { Image, StyleSheet, View } from 'react-native';
import CaptionText from '../Texts/CaptionText';
import Color from '@/constants/Color';
import PressableOpacity from '../Buttons/PressableOpacity';

interface CommunityCollectionItemPostProps {
  communityCollectionItem: CommunityCollectionItem;
}

const CommunityCollectionItemPost: FC<CommunityCollectionItemPostProps> = ({
  communityCollectionItem,
}) => {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  Image.getSize(
    communityCollectionItem.product.imageUrls[0],
    (width, height) => {
      setAspectRatio(width / height);
    }
  );

  if (!aspectRatio) return null;

  return (
    <PressableOpacity style={{ gap: 4 }}>
      <ExpoImage
        source={{ uri: communityCollectionItem.product.imageUrls[0] }}
        style={[styles.image, { aspectRatio }]}
      />
      {communityCollectionItem.description && (
        <View style={styles.caption}>
          <CaptionText>{communityCollectionItem.description}</CaptionText>
        </View>
      )}
    </PressableOpacity>
  );
};

export default CommunityCollectionItemPost;

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
