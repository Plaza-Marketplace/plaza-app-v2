import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const logoSize = 35;

export const ProfileIconCircle = ({ url }: { url: string }) => {
  return <View style={styles.testCircle} />;
};

export const ProfileIconSquare = ({ url }: { url: string }) => {
  return <View style={styles.testSquare} />;
};

const styles = StyleSheet.create({
  testCircle: {
    width: logoSize,
    height: logoSize,
    borderRadius: logoSize / 2,
    backgroundColor: 'gray',
  },

  testSquare: {
    width: logoSize,
    height: logoSize,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
});
