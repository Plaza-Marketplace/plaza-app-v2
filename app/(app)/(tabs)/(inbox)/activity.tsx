import { SectionList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router } from 'expo-router';
import GeneralHeader from '@/components/GeneralHeader';
import ActivityHeader from '@/app/(app)/(tabs)/(inbox)/ActivityHeader';
import Spacing from '@/constants/Spacing';
import StandardText from '@/components/Texts/StandardText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SubheaderText from '@/components/Texts/SubheaderText';
import ActivityNote from '@/app/(app)/(tabs)/(inbox)/ActivityNote';
import BoldStandardText from '@/components/Texts/BoldStandardText';
import HeaderText from '@/components/Texts/HeaderText';
import Color from '@/constants/Color';

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
          <Ionicons name="chevron-forward" size={24} color={Color.GREY_500} />
        </PressableOpacity>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          {/* <SectionList
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
          /> */}
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              width: '80%',
            }}
          >
            <HeaderText>Under Construction!</HeaderText>
            <StandardText style={{ textAlign: 'center', marginTop: 5 }}>
              This page is under construction, but you can still look at your
              pending follow requests.
            </StandardText>
          </View>
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
