import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import productCardStyles from './styles';
import { PlazaText } from '@/components/PlazaText';

const ProductShowcase = () => {
  return (
    <View style={productCardStyles.shadow}>
      <View style={[productCardStyles.background, styles.placement]}>
        <View style={styles.card}>
          <PlazaText>ProductShowcase</PlazaText>
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
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default ProductShowcase;
