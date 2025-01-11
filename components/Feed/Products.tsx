import { StyleSheet, View } from 'react-native';
import Spacing from '@/constants/Spacing';
import FeedProduct from './FeedProduct';

const Products = () => {
  return (
    <View style={styles.container}>
      <FeedProduct />
      <FeedProduct />
      <FeedProduct />
      <FeedProduct />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.SPACING_1,
  },
});
