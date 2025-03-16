import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';

const Index = () => {
  return (
    <View>
      <Redirect href={'/(app)/(tabs)/(marketplace)/(top-tabs)/feed'} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
