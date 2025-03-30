import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import ReviewCard from '@/components/ReviewCard';
import HeadingText from '@/components/Texts/HeadingText';
import useGetReviewsTab from './useGetReviewsTab';
import BodyText from '@/components/Texts/BodyText';

interface ReviewsProps {
  sellerId: Id;
}

const Reviews: FC<ReviewsProps> = ({ sellerId }) => {
  const { data: reviewsTab, isLoading } = useGetReviewsTab(sellerId);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Tabs.FlatList
      data={reviewsTab?.reviews}
      ListHeaderComponent={
        <View style={styles.header}>
          <HeadingText variant="h5-bold">Ratings & Reviews</HeadingText>
          <BodyText variant="sm-medium">
            {reviewsTab?.reviewsCount} Ratings
          </BodyText>
        </View>
      }
      renderItem={({ item }) => <ReviewCard review={item} />}
    />
  );
};

export default Reviews;

const styles = StyleSheet.create({
  header: {
    padding: 16,
    gap: 8,
  },
});
