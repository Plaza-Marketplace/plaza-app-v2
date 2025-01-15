import { FeedReview, Review as ReviewType } from '@/models/review';
import { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Review from './Review';
import ProfileIcon from '../ProfileIcon';
import SubheaderText from '../Texts/SubheaderText';
import StandardText from '../Texts/StandardText';
import Spacing from '@/constants/Spacing';
import BoldStandardText from '../Texts/BoldStandardText';
import Color from '@/constants/Color';
import ProductIcon from '../Product/ProductIcon';

interface ReviewModalTabProps {
  isSeller: boolean;
  imageUrl?: Url;
  name: string;
  reviews: FeedReview[];
}

const ReviewModalTab: FC<ReviewModalTabProps> = ({
  name,
  imageUrl,
  isSeller,
  reviews,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainInfoContainer}>
        <View style={styles.infoContainer}>
          {!isSeller ? (
            <ProductIcon imageUrl={imageUrl} />
          ) : (
            <ProfileIcon variant="user" url={imageUrl} size={64} />
          )}
          <View>
            <SubheaderText>{name}</SubheaderText>
          </View>
        </View>
      </View>
      <FlatList
        data={reviews}
        renderItem={({ item }) => <Review key={item.id} review={item} />}
        contentContainerStyle={{
          gap: Spacing.SPACING_4,
          padding: Spacing.SPACING_2,
        }}
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
