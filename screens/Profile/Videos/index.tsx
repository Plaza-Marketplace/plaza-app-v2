import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import VideoPreview from '@/components/VideoPreview';
import { router } from 'expo-router';
import { useGetVideosByUserId } from './hooks';

interface VideosProps {
  userId: number;
}

const Videos: FC<VideosProps> = ({ userId }) => {
  const { data: videos, isLoading } = useGetVideosByUserId(userId);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Tabs.FlatList
      numColumns={3}
      data={videos}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1 / 3,
            height: 200,
          }}
        >
          <VideoPreview
            uri={item.videoUrl}
            onPress={() => {
              router.push({
                pathname: '/video-display',
                params: { videoId: item.id },
              });
            }}
          />
        </View>
      )}
    />
  );
};

export default Videos;

const styles = StyleSheet.create({});
