import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Color from '@/constants/Color';
import HeaderText from '../../../../components/Texts/HeaderText';
import PressableOpacity from '../../../../components/Buttons/PressableOpacity';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface BackHeaderProps {
  name: string;
}

const BackHeader = ({ name }: BackHeaderProps) => {
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
        <PressableOpacity
          onPress={() => router.back()}
          style={{ marginLeft: 16 }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </PressableOpacity>
        <View style={{ marginLeft: 16 }}>
          <HeaderText>{name}</HeaderText>
        </View>
      </View>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({});
