import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import Spacing from '@/constants/Spacing';
import Radius from '@/constants/Radius';
import CaptionText from './Texts/CaptionText';
import { returnRatings } from './PlazaIcons/RatingIcons';
import StandardText from './Texts/StandardText';
import ProfileIcon from './ProfileIcon';
import Color from '@/constants/Color';
import UserInfo from './UserInfo';

interface ReviewProps {
  username: string;

  profileImageUrl: Url | null;

  rating: number;

  description: string;
}

const ReviewCard: FC<ReviewProps> = ({
  username,
  profileImageUrl,
  rating,
  description,
}) => {
  return (
    <View style={styles.review}>
      <UserInfo username={username} profilePictureUrl={profileImageUrl} />

      <View style={styles.spacing}>{returnRatings(rating, 'small')}</View>

      <StandardText style={styles.spacing}>{description}</StandardText>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  review: {
    flex: 1,
    padding: 16,
    borderRadius: Radius.LG,
    backgroundColor: Color.NEUTRALS_WHITE,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
