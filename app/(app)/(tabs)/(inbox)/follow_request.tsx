import ActivityNote from '@/app/(app)/(tabs)/(inbox)/ActivityNote';
import BackHeader from '@/app/(app)/(tabs)/(inbox)/BackHeader';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import CaptionText from '@/components/Texts/CaptionText';
import Spacing from '@/constants/Spacing';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

const mockData = [1, 2, 3];

const FollowRequest = () => {
  return (
    <>
      <BackHeader name="Follow Request" />
      <View style={{ flex: 1, marginTop: Spacing.SPACING_2 }}>
        <FlatList
          style={styles.list}
          data={mockData}
          keyExtractor={(item, index) => `${item + index}`}
          renderItem={({ item }) => (
            <View
              style={{
                marginVertical: Spacing.SPACING_2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <ActivityNote name="William Zhong" note="asdlfkjhasdlft" />
              <View style={styles.options}>
                <PressableOpacity>
                  <Ionicons name="checkmark" size={24} color="black" />
                </PressableOpacity>
                <PressableOpacity style={{ marginLeft: Spacing.SPACING_2 }}>
                  <Ionicons name="close" size={24} color="black" />
                </PressableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default FollowRequest;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: Spacing.SPACING_3,
  },
  options: {
    flexDirection: 'row',
  },
});
