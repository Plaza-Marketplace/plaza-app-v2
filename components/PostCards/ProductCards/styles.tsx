import { StyleSheet } from 'react-native';

const productCardStyles = StyleSheet.create({
  background: {
    width: '100%',
    height: 200,
    backgroundColor: 'gray',
    borderRadius: 5,
    overflow: 'hidden',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  reviewContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 100,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default productCardStyles;
