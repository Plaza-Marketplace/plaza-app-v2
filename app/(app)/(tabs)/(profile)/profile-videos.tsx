import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import VideoPreview from '@/components/VideoPreview';
import { useGetVideosByUserId } from '@/hooks/queries/useVideo';

interface ProfileVideoProps {
  userId: number;
}

const ProfileVideos: FC<ProfileVideoProps> = ({ userId }) => {
  const { data: videos, isLoading } = useGetVideosByUserId(userId);
  console.log(videos);

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <Tabs.FlatList
      style={{ flex: 1 }}
      numColumns={3}
      data={videos}
      renderItem={(item) => (
        <View
          style={{
            width: '33.333%',
            height: 200,
            paddingHorizontal: 2,
            paddingTop: 10,
          }}
        >
          <VideoPreview uri={item.item.videoUrl} />
        </View>
      )}
    />
  );
};

export default ProfileVideos;

const styles = StyleSheet.create({});
