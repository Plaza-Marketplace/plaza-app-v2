import { Review as ReviewType } from '@/models/review';
import { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Review from './Review';
import ProfileIcon from '../ProfileIcon';
import SubheaderText from '../Texts/SubheaderText';
import StandardText from '../Texts/StandardText';
import Spacing from '@/constants/Spacing';
import BoldStandardText from '../Texts/BoldStandardText';
import Color from '@/constants/Color';

interface ReviewModalTabProps {
  isSeller: boolean;
  reviews: ReviewType[];
}

const ReviewModalTab: FC<ReviewModalTabProps> = ({ isSeller, reviews }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainInfoContainer}>
        <View style={styles.infoContainer}>
          <ProfileIcon variant={isSeller ? 'user' : 'community'} size={64} />
          <View>
            <SubheaderText>Display Name</SubheaderText>
            {isSeller && <StandardText>@username</StandardText>}
          </View>
        </View>
        <View style={styles.ratingContainer}>
          <BoldStandardText>2 out of 5</BoldStandardText>
          <StandardText>0 reviews</StandardText>
        </View>
      </View>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <Review
            key={item.id}
            rating={item.rating}
            description={item.description}
          />
        )}
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
