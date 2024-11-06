import { StyleSheet, View } from 'react-native';
import React from 'react';
import productCardStyles from './styles';
import { CaptionText, PlazaText } from '@/components/PlazaText';
import { ProfileIconCircle } from '../PostIcon';

const ProductReview = () => {
  return (
    <View style={productCardStyles.shadow}>
      <View style={[productCardStyles.reviewContainer]}>
        <View style={styles.imageContainer}></View>

        <View style={styles.contentContainer}>
          <PlazaText>ProductReview</PlazaText>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <ProfileIconCircle url="lole" />
            <View style={{ marginLeft: 5 }}>
              <CaptionText>Product</CaptionText>
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
