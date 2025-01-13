import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusHeader from '@/components/FocusHeader';
import { router, useLocalSearchParams } from 'expo-router';

const PostModal = () => {
  const params = useLocalSearchParams<{
    postId: string;
    postName: string;
  }>();

  if (!params.postId || !params.postName) {
    router.navigate('/+not-found');
    return;
  }

  return (
    <SafeAreaView>
      <FocusHeader name={params.postName} />
    </SafeAreaView>
  );
};

export default PostModal;

const styles = StyleSheet.create({});
