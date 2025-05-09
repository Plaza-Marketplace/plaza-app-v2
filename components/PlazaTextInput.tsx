import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import React, { FC, Ref, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import HeadingText from './Texts/HeadingText';
import BodyText from './Texts/BodyText';

interface PlazaTextInputProps extends TextInputProps {
  inputRef?: Ref<TextInput>;
  label?: string;
  limit?: number;
  rightButton?: React.ReactNode;
  error?: string;
}

const PlazaTextInput: FC<PlazaTextInputProps> = ({
  inputRef,
  label,
  limit,
  rightButton,
  style,
  onChangeText,
  error,
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
    <View style={{ gap: 4 }}>
      {label && <HeadingText variant="h6-bold">{label}</HeadingText>}
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
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
      {error && (
        <BodyText variant="sm" style={{ color: Color.RED_500 }}>
          {error}
        </BodyText>
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
  textInputContainer: {
    flex: 1,
  },
  limit: {
    alignSelf: 'flex-end',
  },
});
