import { StyleSheet, View } from 'react-native';
import ProfileIcon from '../ProfileIcon';
import CaptionText from '../Texts/CaptionText';
import Spacing from '@/constants/Spacing';
import { FC } from 'react';
import StandardText from '../Texts/StandardText';
import ExpandableDescription from '../ExpandableDescription';

interface ReviewProps {
  rating: number;
  description: string;
}

const Review: FC<ReviewProps> = ({ rating, description }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <ProfileIcon variant="user" size={32} />
        <View>
          <CaptionText>@username</CaptionText>
          <CaptionText>{new Date().toLocaleDateString()}</CaptionText>
        </View>
      </View>
      <StandardText>{rating}</StandardText>
      <ExpandableDescription
        initialNumberOfLines={4}
        description={description}
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
