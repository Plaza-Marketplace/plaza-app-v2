import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import Review from '@/components/Review';

const mocking = Array.from({ length: 10 });

const ProfileReviews = () => {
  return <Tabs.FlatList data={mocking} renderItem={() => <Review />} />;
};

export default ProfileReviews;

const styles = StyleSheet.create({});
