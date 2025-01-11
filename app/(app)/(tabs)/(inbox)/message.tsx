import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import BackHeader from '@/app/(app)/(tabs)/(inbox)/BackHeader';
import PlazaTextInput from '@/components/PlazaTextInput';
import Spacing from '@/constants/Spacing';
import Radius from '@/constants/Radius';
import { Ionicons } from '@expo/vector-icons';
import Color from '@/constants/Color';
import { FlatList } from 'react-native-gesture-handler';
import Message from '@/app/(app)/(tabs)/(inbox)/MessageComponent';

type InboxParams = {
  username?: string;
};

const mockData = [
  {
    id: 1,
    message: 'Hello',
    name: 'joe',
    time: '12:00',
  },
  {
    id: 2,
    message: 'Hello',
    name: 'john',
    time: '12:00',
  },
  {
    id: 1,
    message:
      'The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.',
    name: 'joe',
    time: '12:00',
  },
  {
    id: 2,
    message: 'Cool',
    name: 'john',
    time: '12:00',
  },
  {
    id: 2,
    message:
      'Once upon a time, in a quiet village nestled at the edge of a vast forest, there lived a young man named John. John was known for his curiosity and courage, always dreaming of the world beyond the familiar hills.',
    name: 'john',
    time: '12:00',
  },
  {
    id: 1,
    message: 'nice',
    name: 'joe',
    time: '12:00',
  },
];

const Messages = () => {
  const params = useLocalSearchParams<InboxParams>();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' },
      tabBarVisible: false,
    });
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);
  return (
    <>
      <BackHeader name={params.username || 'Messages'} />
      <View style={{ flex: 1, position: 'relative', alignItems: 'center' }}>
        <FlatList
          style={{
            flex: 1,
            width: '100%',
            paddingHorizontal: Spacing.SPACING_3,
          }}
          data={mockData}
          keyExtractor={(item) => `${item.id}-${item.message}`}
          renderItem={(data) => {
            return (
              <View
                style={{ width: '100%', marginVertical: Spacing.SPACING_2 }}
              >
                <Message message={data.item} isSending={data.item.id == 1} />
              </View>
            );
          }}
        />
        <View
          style={{
            width: '100%',
            paddingBottom: Spacing.SPACING_8,
            paddingHorizontal: Spacing.SPACING_3,
            paddingTop: Spacing.SPACING_3,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: Color.BORDER_SECONDARY,
          }}
        >
          <PlazaTextInput
            placeholder="Type a message"
            style={{ flex: 1, minHeight: 40, maxHeight: 100 }}
          />
          <PressableOpacity style={{ marginLeft: Spacing.SPACING_2 }}>
            <Ionicons name="send-outline" size={24} color="black" />
          </PressableOpacity>
        </View>
      </View>
    </>
  );
};

export default Messages;

const styles = StyleSheet.create({});
