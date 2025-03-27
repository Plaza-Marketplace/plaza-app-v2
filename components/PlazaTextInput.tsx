import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import React, { FC, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import HeadingText from './Texts/HeadingText';
import BodyText from './Texts/BodyText';
import Spacing from '@/constants/Spacing';

interface PlazaTextInputProps extends TextInputProps {
  label?: string;
  limit?: number;
  rightButton?: React.ReactNode;
}

const PlazaTextInput: FC<PlazaTextInputProps> = ({
  label,
  limit,
  rightButton,
  style,
  onChangeText,
  ...rest
}) => {
  const [numChars, setNumChars] = useState(0);

  const handleTextChange = (text: string) => {
    setNumChars(text.length);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View style={styles.container}>
      {label && <HeadingText variant="h6-bold">{label}</HeadingText>}
      <TextInput
        style={[styles.textInputContainer, style]}
        onChangeText={handleTextChange}
        {...rest}
      />
      {limit && (
        <BodyText variant="md" style={styles.limit}>
          {numChars}/{limit}
        </BodyText>
      )}
      {rightButton && (
        <View style={{ alignSelf: 'flex-end' }}>{rightButton}</View>
      )}
    </View>
  );
};

export default PlazaTextInput;

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.ROUNDED,
    backgroundColor: Color.NEUTRALS_100,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Color.NEUTRALS_150,
  },
  textInputContainer: {},
  limit: {
    alignSelf: 'flex-end',
  },
});
