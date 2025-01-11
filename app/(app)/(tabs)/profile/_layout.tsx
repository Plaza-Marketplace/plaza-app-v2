import { View, Text } from 'react-native';
import React from 'react';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const _layout = () => {
  return (
    <SafeAreaView>
      <Text>lasdjlkfhlkjhwelf</Text>
      <PressableOpacity
        onPress={() => {
          supabase.auth.signOut();
          router.navigate('auth');
        }}
      >
        <Text>Press me</Text>
      </PressableOpacity>
    </SafeAreaView>
  );
};

export default _layout;
