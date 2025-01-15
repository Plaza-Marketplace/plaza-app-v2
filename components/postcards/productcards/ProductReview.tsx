import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import productCardStyles from './styles';
import CaptionText from '@/components/Texts/CaptionText';
import PlazaText from '@/components/Texts/PlazaText';
import { ProfileIconCircle } from '../PostIcon';
import useGetSellerInfo from '@/hooks/queries/useGetSellerInfo';
import { ProductDetails } from '@/models/communityPost';

interface ProductReviewProps {
  product: ProductDetails;
}

const ProductReview: FC<ProductReviewProps> = ({ product }) => {
  return (
    <View style={productCardStyles.shadow}>
      <View style={[productCardStyles.reviewContainer]}>
        <View style={styles.imageContainer}></View>

        <View style={styles.contentContainer}>
          <PlazaText>{product.name}</PlazaText>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <ProfileIconCircle url="lole" />
            <View style={{ marginLeft: 5 }}>
              <CaptionText>
                {product.seller ? product.seller.username : ''}
              </CaptionText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductReview;

const styles = StyleSheet.create({
  imageContainer: {
    flexBasis: '30%',
    backgroundColor: 'gray',
  },
  contentContainer: {
    flexBasis: '70%',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
