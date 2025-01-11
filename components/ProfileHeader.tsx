import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderText from './Texts/HeaderText';
import Color from '@/constants/Color';

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
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({});
