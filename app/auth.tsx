import { StyleSheet, View } from 'react-native';
import React from 'react';
import Auth from '@/components/Auth';
import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

const _layout = () => {
  const { isLoading, session } = useAuth();

  if (!isLoading && session) {
    return <Redirect href="/" />;
  }

  return (
    <View>
      <Auth />
    </View>
  );
};

export default _layout;

const styles = StyleSheet.create({});
