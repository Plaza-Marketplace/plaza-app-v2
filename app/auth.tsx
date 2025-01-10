import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import Auth from '@/components/Auth';
import AuthContext from '@/components/Contexts/AuthContext';
import { router } from 'expo-router';

const _layout = () => {
  const session = useContext(AuthContext);

  useEffect(() => {
    if (session && session.user) {
      router.replace('/');
    }
  }, [session]);

  return (
    <View>
      <Auth />
    </View>
  );
};

export default _layout;

const styles = StyleSheet.create({});
