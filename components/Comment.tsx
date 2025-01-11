import { StyleSheet, View } from 'react-native';
import React from 'react';
import Spacing from '@/constants/Spacing';
import Radius from '@/constants/Radius';
import CaptionText from './Texts/CaptionText';
import StandardText from './Texts/StandardText';
import BoldCaptionText from './Texts/BoldCaptionText';

const Comment = () => {
  return (
    <View style={styles.comment}>
      <View
        style={{
          backgroundColor: 'gray',
          width: 2 * Radius.LG,
          height: 2 * Radius.LG,
          borderRadius: Radius.LG,
        }}
      />
      <View style={styles.commentContent}>
        <View style={styles.name}>
          <BoldCaptionText>@Username</BoldCaptionText>
          <View style={{ marginLeft: 4 }}>
            <CaptionText>Time</CaptionText>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <StandardText style={styles.spacing}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          </StandardText>
        </View>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    padding: Spacing.SPACING_SM,
  },
  commentContent: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: Spacing.SPACING_2,
  },
  name: {
    flexDirection: 'row',
  },
  spacing: {
    marginTop: Spacing.SPACING_1,
    flexShrink: 1,
  },
});
