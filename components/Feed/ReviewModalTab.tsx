import {
  FeedReview,
  Review as ReviewType,
  SellerReview,
} from '@/models/review';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Review from './Review';
import SubheaderText from '../Texts/SubheaderText';
import StandardText from '../Texts/StandardText';
import Spacing from '@/constants/Spacing';
import BoldStandardText from '../Texts/BoldStandardText';
import Color from '@/constants/Color';
import ProductIcon from '../Product/ProductIcon';
import ReviewCard from '../ReviewCard';
import { FlashList } from '@shopify/flash-list';

interface ReviewModalTabProps {
  reviews: SellerReview[];
}

const ReviewModalTab: FC<ReviewModalTabProps> = ({ reviews }) => {
  return (
    <View style={styles.container}>
      <FlashList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewCard
            key={item.id}
            username={item.reviewer.username}
            profileImageUrl={item.reviewer.profileImageUrl}
            rating={item.rating}
            description={item.description}
          />
        )}
        contentContainerStyle={{
          padding: Spacing.SPACING_2,
        }}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.SPACING_4 }} />}
      />
    </View>
  );
};

export default ReviewModalTab;

const styles = StyleSheet.create({
  container: {
    gap: Spacing.SPACING_3,
  },
  mainInfoContainer: {
    padding: Spacing.SPACING_2,
    gap: Spacing.SPACING_3,
    borderBottomWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.SPACING_3,
  },
  ratingContainer: {
    gap: Spacing.SPACING_1,
  },
});
