import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import Spacing from '@/constants/Spacing';
import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import PlazaText from '../../../../components/Texts/PlazaText';
import StandardText from '../../../../components/Texts/StandardText';

interface MessageProps {
  message: {
    id: number;
    message: string;
    name: string;
    time: string;
  };
  isSending: boolean;
}

const Message = ({ message, isSending }: MessageProps) => {
  let messageStyles: StyleProp<ViewStyle>[] = [styles.message];
  if (isSending) {
    messageStyles.push(styles.messageSent);
  } else {
    messageStyles.push(styles.messageReceived);
  }

  return (
    <View style={messageStyles}>
      <View style={styles.messageLabel}>
        <PlazaText
          style={styles.messageLabelText}
        >{`${message.name}, ${message.time}`}</PlazaText>
      </View>
      <StandardText style={{ marginTop: Spacing.SPACING_1 }}>
        {message.message}
      </StandardText>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  message: {
    padding: Spacing.SPACING_3,
    borderRadius: Radius.ROUNDED,
    maxWidth: '80%',
  },
  messageSent: {
    backgroundColor: Color.GREY_200,
    marginRight: 0,
    marginLeft: 'auto',
  },
  messageReceived: {
    backgroundColor: Color.GREY_100,
    marginLeft: 0,
    marginRight: 'auto',
  },
  messageLabel: {
    flexDirection: 'row',
  },
  messageLabelText: {
    color: Color.GREY_400,
  },
});
