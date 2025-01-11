import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import VideoPreview from '@/components/VideoPreview';

const mocking = Array.from({ length: 10 });

const ProfileVideos = () => {
  return (
    <Tabs.FlatList
      style={{ flex: 1 }}
      numColumns={3}
      data={mocking}
      renderItem={() => (
        <View
          style={{
            width: '33.333%',
            height: 200,
            paddingHorizontal: 2,
            paddingTop: 10,
          }}
        >
          <VideoPreview />
        </View>
      )}
    />
  );
};

export default ProfileVideos;

const styles = StyleSheet.create({});
