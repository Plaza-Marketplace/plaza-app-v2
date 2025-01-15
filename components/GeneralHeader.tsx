import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderText from './Texts/HeaderText';
import Color from '@/constants/Color';
import { supabase } from '@/utils/supabase';
import PressableOpacity from './Buttons/PressableOpacity';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface GeneralHeaderProps {
  name: string;
  id: Id;
  currentUser: number;
}

const GeneralHeader = ({ name, id, currentUser }: GeneralHeaderProps) => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={{
        height: 100,
        borderBottomWidth: 2,
        borderColor: Color.BORDER_SECONDARY,
        backgroundColor: Color.BORDER_TERTIARY,
        paddingTop: inset.top,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View>
        <HeaderText>{name}</HeaderText>
      </View>
      {id === currentUser && (
        <PressableOpacity onPress={() => router.push('/settings')}>
          <Ionicons name="cog-outline" size={32} />
        </PressableOpacity>
      )}
    </View>
  );
};

export default GeneralHeader;

const styles = StyleSheet.create({});
