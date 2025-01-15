import { StyleSheet, View } from 'react-native';
import ProfileIcon from '../ProfileIcon';
import CaptionText from '../Texts/CaptionText';
import Spacing from '@/constants/Spacing';
import { FC } from 'react';
import StandardText from '../Texts/StandardText';
import ExpandableDescription from '../ExpandableDescription';
import { FeedReview } from '@/models/review';

interface ReviewProps {
  review: FeedReview;
}

const Review: FC<ReviewProps> = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <ProfileIcon
          variant="user"
          size={32}
          url={review.reviewer.profileImageUrl}
        />
        <View>
          <CaptionText>@{review.reviewer.username}</CaptionText>
          <CaptionText>
            {new Date(review.createdAt).toLocaleDateString()}
          </CaptionText>
        </View>
      </View>
      <StandardText>{review.rating}</StandardText>
      <ExpandableDescription
        initialNumberOfLines={4}
        description={review.description}
      />
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    gap: Spacing.SPACING_1,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.SPACING_2,
  },
});
