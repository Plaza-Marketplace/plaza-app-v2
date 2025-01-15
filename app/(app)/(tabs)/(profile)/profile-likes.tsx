import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import VideoPreview from '@/components/VideoPreview';
import { useGetVideosLikedByUserId } from '@/hooks/queries/useGetVideoLikes';
import { router } from 'expo-router';

const mocking = Array.from({ length: 10 });

interface ProfileLikesProps {
  userId: Id;
}

const ProfileLikes: FC<ProfileLikesProps> = ({ userId }) => {
  const { data: videos, isLoading } = useGetVideosLikedByUserId(userId);
  console.log('i am here!');
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  console.log(videos);

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
