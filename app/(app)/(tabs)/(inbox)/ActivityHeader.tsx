import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Color from '@/constants/Color';
import HeaderText from '../../../../components/Texts/HeaderText';
import PressableOpacity from '../../../../components/Buttons/PressableOpacity';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Spacing from '@/constants/Spacing';

interface ActivityHeaderProps {
  name: string;
}

const ActivityHeader = ({ name }: ActivityHeaderProps) => {
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
      <View
        style={{
          marginTop: inset.top,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ marginLeft: Spacing.SPACING_3 }}>
          <HeaderText>{name}</HeaderText>
        </View>
        {/* 
        <PressableOpacity
          onPress={() => router.push('message_list')}
          style={{ marginLeft: 'auto', marginRight: Spacing.SPACING_3 }}
        >
          <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
        </PressableOpacity> */}
      </View>
    </View>
  );
};

export default ActivityHeader;

const styles = StyleSheet.create({});
