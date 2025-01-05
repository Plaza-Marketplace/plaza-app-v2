import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import Auth from '@/components/Auth';
import AuthContext from '@/components/Contexts/AuthContext';
import { router } from 'expo-router';

const _layout = () => {
  const session = useContext(AuthContext);
  if (session && session.user) {
    router.replace('/');
  }
  return (
    <View>
      <Auth />
    </View>
  );
};

export default _layout;

const styles = StyleSheet.create({});
