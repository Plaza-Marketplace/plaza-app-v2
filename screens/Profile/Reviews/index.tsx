import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import ReviewCard from '@/components/ReviewCard';
import HeadingText from '@/components/Texts/HeadingText';
import useGetReviewsTab from './useGetReviewsTab';
import BodyText from '@/components/Texts/BodyText';
import { formatRating } from '@/utils/product';
import Color from '@/constants/Color';
import { Review } from '@/components/Icons';

interface ReviewsProps {
  sellerId: Id;
  averageRating: number;
}

const Reviews: FC<ReviewsProps> = ({ sellerId, averageRating }) => {
  const { data: reviewsTab, isLoading } = useGetReviewsTab(sellerId);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Tabs.FlatList
      data={reviewsTab?.reviews}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <View style={styles.header}>
          <HeadingText variant="h5-bold">Ratings & Reviews</HeadingText>
          <View style={styles.rating}>
            <Review color={Color.REVIEWS_500} fill={Color.REVIEWS_500} />
            <BodyText variant="lg-bold" color={Color.REVIEWS_500}>
              {formatRating(averageRating)}
            </BodyText>
            <BodyText variant="sm-medium">
              {reviewsTab?.reviewsCount} Ratings
            </BodyText>
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <ReviewCard
          username={item.reviewer.username}
          profileImageUrl={item.reviewer.profileImageUrl}
          rating={item.rating}
          description={item.description}
        />
      )}
    />
  );
};

export default Reviews;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    gap: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
