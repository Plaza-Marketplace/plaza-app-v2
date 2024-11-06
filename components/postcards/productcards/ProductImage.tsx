import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import productCardStyles from './styles';

const ProductImage = () => {
  return (
    <View style={productCardStyles.shadow}>
      <View style={[productCardStyles.background]}></View>
    </View>
  );
};

export default ProductImage;
