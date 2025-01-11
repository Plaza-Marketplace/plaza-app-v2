import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderText from './Texts/HeaderText';
import Color from '@/constants/Color';
import { supabase } from '@/utils/supabase';

interface ProfileHeaderProps {
  name: string;
}

const ProfileHeader = ({ name }: ProfileHeaderProps) => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={{
        height: 100,
        borderBottomWidth: 2,
        borderColor: Color.BORDER_SECONDARY,
        backgroundColor: Color.BORDER_TERTIARY,
      }}
    >
      <View style={{ marginTop: inset.top, marginLeft: 16 }}>
        <HeaderText>{name}</HeaderText>
      </View>
      <Pressable onPress={() => supabase.auth.signOut()}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({});
