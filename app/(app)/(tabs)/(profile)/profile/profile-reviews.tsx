import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import ReviewCard from '@/components/ReviewCard';
import { useGetSellerReviews } from '@/hooks/queries/useSellerReview';

const mocking = Array.from({ length: 10 });

interface ProfileReviewsProps {
  sellerId: Id;
}

const ProfileReviews: FC<ProfileReviewsProps> = ({ sellerId }) => {
  const { data: reviews, isLoading } = useGetSellerReviews(sellerId);
  if (isLoading) return <Text>Loading...</Text>;
  return (
    <Tabs.FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewCard review={item} />}
    />
  );
};

export default ProfileReviews;

const styles = StyleSheet.create({});
