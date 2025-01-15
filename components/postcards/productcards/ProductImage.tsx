import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import productCardStyles from './styles';
import { Image } from 'expo-image';

const ProductImage = ({ uri }: { uri: string }) => {
  return (
    <View style={productCardStyles.shadow}>
      <View style={[productCardStyles.background]}>
        <Image
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: '#0553',
          }}
          source={uri}
          contentFit="cover"
        />
      </View>
    </View>
  );
};

export default ProductImage;
