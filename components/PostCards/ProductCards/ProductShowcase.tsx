import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import productCardStyles from './styles';
import StandardText from '@/components/Texts/StandardText';
import MediumText from '@/components/Texts/MediumText';
import { formatPrice } from '@/utils/currency';
import Spacing from '@/constants/Spacing';
import { Image } from 'expo-image';
import { ProductDetails } from '@/models/communityPost';
import HeadingText from '@/components/Texts/HeadingText';
import BodyText from '@/components/Texts/BodyText';
import Radius from '@/constants/Radius';

interface ProductShowcaseProps {
  product: ProductDetails;
}

const ProductShowcase: FC<ProductShowcaseProps> = ({ product }) => {
  return (
    <View style={productCardStyles.shadow}>
      <View style={styles.card}>
        <Image source={{ uri: product?.imageUrls[0] }} style={{ flex: 1 }} />
        <View style={styles.text}>
          <HeadingText variant="h6">{product?.name ?? 'hello'}</HeadingText>
          <BodyText variant="md">{formatPrice(product?.price)}</BodyText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  placement: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  card: {
    width: '100%',
    height: 220,
    backgroundColor: 'white',
    borderRadius: Radius.LG,
    overflow: 'hidden',
  },
  text: {
    padding: Spacing.SPACING_2,
  },
});

export default ProductShowcase;
