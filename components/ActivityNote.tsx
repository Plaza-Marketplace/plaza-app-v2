import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProfileIcon from './ProfileIcon';
import { ProfileIconCircle } from './PostCards/PostIcon';
import Radius from '@/constants/Radius';
import Spacing from '@/constants/Spacing';
import BoldStandardText from './Texts/BoldStandardText';
import CaptionText from './Texts/CaptionText';

interface ActivityNoteProps {
  name: string;
  note: string;
}

const ActivityNote = ({ name, note }: ActivityNoteProps) => {
  return (
    <View style={styles.activityNote}>
      <View style={styles.testCircle} />
      <View style={styles.note}>
        <BoldStandardText>{name}</BoldStandardText>
        <View style={styles.captionSpacing}>
          <CaptionText>{note}</CaptionText>
        </View>
      </View>
    </View>
  );
};

export default ActivityNote;

const styles = StyleSheet.create({
  activityNote: {
    flexDirection: 'row',
  },
  testCircle: {
    width: Radius.XL * 2,
    height: Radius.XL * 2,
    borderRadius: Radius.XL,
    backgroundColor: 'gray',
  },
  note: {
    marginLeft: Spacing.SPACING_2,
  },
  captionSpacing: {
    marginTop: Spacing.SPACING_1,
  },
});
