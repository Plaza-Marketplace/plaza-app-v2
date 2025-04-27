import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SelectedProductsProvider } from '@/contexts/SelectedProductsContext';
import { RecordedVideoProvider } from '@/contexts/RecordedVideoProvider';
import { Stack } from 'expo-router';
import { TakenPhotoProvider } from '@/contexts/TakenPhotoProvider';

const ListItem = () => {
  return (
    <TakenPhotoProvider>
      <Stack
        initialRouteName="create-listing"
        screenOptions={{ headerShown: false }}
      />
    </TakenPhotoProvider>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
