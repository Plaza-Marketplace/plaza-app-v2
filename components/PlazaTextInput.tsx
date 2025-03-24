import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import { FC, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import HeadingText from './Texts/HeadingText';
import BodyText from './Texts/BodyText';

interface PlazaTextInputProps extends TextInputProps {
  label?: string;
  limit?: number;
}

const PlazaTextInput: FC<PlazaTextInputProps> = ({
  label,
  limit,
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
      <HeadingText variant="h6-bold">{label}</HeadingText>
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
    </View>
  );
};

export default PlazaTextInput;

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  textInputContainer: {
    textAlignVertical: 'top',
    fontFamily: 'Inter',
    borderRadius: Radius.ROUNDED,
    borderColor: Color.NEUTRALS_150,
    backgroundColor: Color.NEUTRALS_100,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  limit: {
    alignSelf: 'flex-end',
  },
});
