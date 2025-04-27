import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HeadingText from '@/components/Texts/HeadingText';
import PlazaButton from '@/components/Buttons/PlazaButton';
import { anonymousLogout } from './services';

const AnonymousPrompt = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <HeadingText variant="h5-bold" style={{ textAlign: 'center' }}>
        You are currently logged in as a guest! Please log in to continue.
      </HeadingText>
      <PlazaButton
        title="Log In"
        onPress={async () => {
          await anonymousLogout();
        }}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default AnonymousPrompt;

const styles = StyleSheet.create({});
