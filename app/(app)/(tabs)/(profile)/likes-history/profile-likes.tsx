import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import VideoPreview from '@/components/VideoPreview';
import { useGetVideosLikedByUserId } from '@/hooks/queries/useGetVideoLikes';
import { router } from 'expo-router';
import Spacing from '@/constants/Spacing';

interface ProfileLikesProps {}

const ProfileLikes: FC<ProfileLikesProps> = () => {
  const { data: videos, isLoading } = useGetVideosLikedByUserId();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      style={{ flex: 1 }}
      numColumns={3}
      data={videos}
      renderItem={({ item }) => (
        <View
          style={{
            width: '33.333%',
            height: 200,
            paddingHorizontal: Spacing.SPACING_1,
            paddingTop: Spacing.SPACING_2,
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
