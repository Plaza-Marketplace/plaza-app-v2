import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import React, { FC, Ref } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Text,
} from 'react-native';
import HeadingText from './Texts/HeadingText';
import BodyText from './Texts/BodyText';

interface PlazaTextInputProps extends TextInputProps {
  inputRef?: Ref<TextInput>;
  label?: string;
  rightButton?: React.ReactNode;
  leftElement?: string;
  error?: string;
}

const PlazaTextInput: FC<PlazaTextInputProps> = ({
  inputRef,
  label,
  rightButton,
  leftElement,
  style,
  onChangeText,
  error,
  ...rest
}) => {
  const handleTextChange = (text: string) => {
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View style={{ gap: 4 }}>
      {label && <HeadingText variant="h6-bold">{label}</HeadingText>}
      <View style={styles.container}>
        {leftElement && (
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ color: Color.NEUTRALS_750 }}>{leftElement}</Text>
          </View>
        )}
        <TextInput
          ref={inputRef}
          style={[styles.textInputContainer, style]}
          onChangeText={handleTextChange}
          {...rest}
        />
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
});
