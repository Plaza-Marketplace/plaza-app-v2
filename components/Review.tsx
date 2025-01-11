import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Spacing from '@/constants/Spacing';
import Radius from '@/constants/Radius';
import CaptionText from './Texts/CaptionText';
import { returnRatings } from './PlazaIcons/RatingIcons';
import StandardText from './Texts/StandardText';

const Review = () => {
  return (
    <View style={styles.review}>
      <View style={styles.reviewUser}>
        <View
          style={{
            backgroundColor: 'gray',
            width: 2 * Radius.LG,
            height: 2 * Radius.LG,
            borderRadius: Radius.LG,
          }}
        />
        <View style={styles.name}>
          <CaptionText>@Username</CaptionText>
          <CaptionText>Time</CaptionText>
        </View>
      </View>

      <View style={styles.spacing}>{returnRatings(4, 'small')}</View>

      <StandardText style={styles.spacing}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        malesuada, odio et vehicula.
      </StandardText>
    </View>
  );
};

export default Review;

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
