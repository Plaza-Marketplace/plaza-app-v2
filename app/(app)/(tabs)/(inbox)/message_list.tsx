import { SectionList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router } from 'expo-router';
import BackHeader from '@/components/BackHeader';
import Spacing from '@/constants/Spacing';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ActivityNote from '@/components/ActivityNote';
import SubheaderText from '@/components/Texts/SubheaderText';
import { FlatList } from 'react-native-gesture-handler';
import CaptionText from '@/components/Texts/CaptionText';

const mockData = [1, 2, 3];

const MessageList = () => {
  return (
    <>
      <BackHeader name="Messages" />
      <View style={{ flex: 1, marginTop: Spacing.SPACING_2 }}>
        <FlatList
          style={styles.list}
          data={mockData}
          keyExtractor={(item, index) => `${item + index}`}
          renderItem={({ item }) => (
            <PressableOpacity
              style={{
                marginVertical: Spacing.SPACING_2,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                router.push({
                  pathname: 'message',
                  params: { username: 'William Zhong' },
                });
              }}
            >
              <ActivityNote name="William Zhong" note="liked your post" />
              <CaptionText>Today</CaptionText>
            </PressableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  followRequest: {
    width: '100%',
    paddingVertical: Spacing.SPACING_2,
    paddingHorizontal: Spacing.SPACING_3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.BORDER_TERTIARY,
  },
  list: {
    paddingHorizontal: Spacing.SPACING_3,
  },
});
