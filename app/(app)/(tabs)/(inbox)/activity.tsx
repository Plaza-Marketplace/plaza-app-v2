import { SectionList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router } from 'expo-router';
import GeneralHeader from '@/components/GeneralHeader';
import ActivityHeader from '@/components/ActivityHeader';
import Spacing from '@/constants/Spacing';
import StandardText from '@/components/Texts/StandardText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SubheaderText from '@/components/Texts/SubheaderText';
import ActivityNote from '@/components/ActivityNote';

const mockData = [
  {
    title: 'Today',
    data: [1, 2, 3],
  },
  {
    title: 'This Week',
    data: [1, 2, 3],
  },
  {
    title: 'This Month',
    data: [1, 2, 3],
  },
  {
    title: 'This Year',
    data: [1, 2, 3],
  },
];

const Activity = () => {
  return (
    <>
      <ActivityHeader name="Activity" />
      <View style={{ flex: 1 }}>
        <PressableOpacity
          style={styles.followRequest}
          onPress={() => router.push('follow_request')}
        >
          <StandardText>Follow Request</StandardText>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </PressableOpacity>
        <View style={{ flex: 1 }}>
          <SectionList
            style={styles.list}
            sections={mockData}
            stickySectionHeadersEnabled={false}
            keyExtractor={(item, index) => `${item + index}`}
            renderItem={({ item }) => (
              <View style={{ marginVertical: Spacing.SPACING_2 }}>
                <ActivityNote name="William Zhong" note="liked your post" />
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={{ marginTop: Spacing.SPACING_3 }}>
                <SubheaderText>{title}</SubheaderText>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
};

export default Activity;

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
