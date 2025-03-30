import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PlazaHeader from '@/components/PlazaHeader';
import ProfileLikes from './profile-likes';

const LikesHistory = () => {
  return (
    <View style={styles.container}>
      <PlazaHeader name="Likes" rightIcon={null} />
      <View style={styles.likesContainer}>
        <ProfileLikes />
      </View>
    </View>
  );
};

export default LikesHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  likesContainer: {
    flex: 1,
  },
});
