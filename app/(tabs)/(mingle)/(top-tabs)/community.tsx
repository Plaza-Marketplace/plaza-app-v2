import { StyleSheet, View } from 'react-native';
import React from 'react';
import CommunityCard from '@/components/Community/CommunityCard';

const community = () => {
  return (
    <View style={styles.container}>
      <CommunityCard
        community={{
          id: 1,
          name: 'Cats',
          memberCount: 20,
          description: 'Description',
          iconUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg',
          backgroundUrl: 'background',
        }}
        notificationsCount={4}
      />
      <CommunityCard
        community={{
          id: 2,
          name: 'Dogs',
          memberCount: 1,
          description: 'Description',
          iconUrl:
            'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
          backgroundUrl: 'background',
        }}
        notificationsCount={32}
      />
      <CommunityCard
        community={{
          id: 3,
          name: 'Shit',
          memberCount: 4,
          description: 'Description',
          iconUrl:
            'https://nypost.com/wp-content/uploads/sites/2/2018/06/180608-doctors-on-why-people-poop-outside.jpg?quality=75&strip=all',
          backgroundUrl: 'background',
        }}
        notificationsCount={100}
      />
    </View>
  );
};

export default community;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    gap: 16,
  },
});
