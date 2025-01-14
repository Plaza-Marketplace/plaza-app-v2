import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import Spacing from '@/constants/Spacing';
import Radius from '@/constants/Radius';
import CaptionText from './Texts/CaptionText';
import { returnRatings } from './PlazaIcons/RatingIcons';
import StandardText from './Texts/StandardText';
import { Review } from '@/models/review';
import ProfileIcon from './ProfileIcon';
import { formatDatetime } from '@/utils/datetime';

interface ReviewProps {
  review: Review;
}

const ReviewCard: FC<ReviewProps> = ({ review }) => {
  return (
    <View style={styles.review}>
      <View style={styles.reviewUser}>
        <ProfileIcon variant="user" />
        <View style={styles.name}>
          <CaptionText>{`@${review.reviewer.username}`}</CaptionText>
          <CaptionText>{formatDatetime(review.createdAt)}</CaptionText>
        </View>
      </View>

      <View style={styles.spacing}>
        {returnRatings(review.rating, 'small')}
      </View>

      <StandardText style={styles.spacing}>{review.description}</StandardText>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  review: {
    flex: 1,
    flexDirection: 'column',
    padding: Spacing.SPACING_SM,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flexDirection: 'column',
    marginLeft: Spacing.SPACING_2,
  },
  spacing: {
    marginTop: Spacing.SPACING_2,
  },
});
