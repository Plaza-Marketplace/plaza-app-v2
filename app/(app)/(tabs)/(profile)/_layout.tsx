import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const Profile = () => {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="video-display" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Profile;

const styles = StyleSheet.create({});
