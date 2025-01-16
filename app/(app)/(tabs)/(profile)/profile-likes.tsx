import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import VideoPreview from '@/components/VideoPreview';
import { useGetVideosLikedByUserId } from '@/hooks/queries/useGetVideoLikes';
import { router } from 'expo-router';

interface ProfileLikesProps {
  userId: Id;
}

const ProfileLikes: FC<ProfileLikesProps> = ({ userId }) => {
  const { data: videos, isLoading } = useGetVideosLikedByUserId(userId);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Tabs.FlatList
      style={{ flex: 1 }}
      numColumns={3}
      data={videos}
      renderItem={({ item }) => (
        <View
          style={{
            width: '33.333%',
            height: 200,
            paddingHorizontal: 2,
            paddingTop: 10,
          }}
        >
          <VideoPreview
            uri={item.videoUrl}
            onPress={() =>
              router.push({
                pathname: '/video-display',
                params: { videoId: item.id },
              })
            }
          />
        </View>
      )}
    />
  );
};

export default ProfileLikes;

const styles = StyleSheet.create({});
