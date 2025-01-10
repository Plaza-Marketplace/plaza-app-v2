import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HeaderText from './Texts/HeaderText';
import PressableOpacity from './Buttons/PressableOpacity';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';

interface FocusHeaderProps {
  name: string;
}

const FocusHeader = ({ name }: FocusHeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <PressableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="close-outline" size={32} />
      </PressableOpacity>
      <HeaderText style={styles.textStyle}>{name}</HeaderText>
    </View>
  );
};

export default FocusHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  textStyle: {
    marginLeft: 5,
  },
});
