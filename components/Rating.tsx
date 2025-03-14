import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Color from '@/constants/Color';
import BodyText from './Texts/BodyText';
import { formatRating } from '@/utils/product';
import { StarFull } from './Icons';

interface RatingProps {
  rating: number;
}

const Rating: FC<RatingProps> = ({ rating }) => {
  return (
    <View style={styles.container}>
      <StarFull color={Color.REVIEWS_500} />
      <BodyText variant="sm-medium" color={Color.REVIEWS_500}>
        {formatRating(rating)}
      </BodyText>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    padding: 4,
    gap: 4,
    backgroundColor: Color.PRIMARY_100,
  },
});
