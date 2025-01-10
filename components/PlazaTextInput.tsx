import Color from '@/constants/Color';
import Radius from '@/constants/Radius';
import Spacing from '@/constants/Spacing';
import { FC } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

const PlazaTextInput: FC<TextInputProps> = ({ style, ...rest }) => {
  return <TextInput style={[styles.container, style]} multiline {...rest} />;
};

export default PlazaTextInput;

const styles = StyleSheet.create({
  container: {
    textAlignVertical: 'top',
    fontFamily: 'Inter',
    borderRadius: Radius.ROUNDED,
    borderColor: Color.BORDER_SECONDARY,
    borderWidth: 1,
    padding: Spacing.SPACING_XS,
  },
});
