import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

const KeyboardView: FC<ViewProps> = ({ children, ...rest }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      {...rest}
    >
      <Pressable
        onPress={() => {
          if (Keyboard.isVisible()) {
            Keyboard.dismiss();
          }
        }}
        style={{ flex: 1 }}
      >
        {children}
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default KeyboardView;

const styles = StyleSheet.create({});
