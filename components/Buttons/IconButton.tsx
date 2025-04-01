import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC, ReactNode } from 'react';
import { PressableProps } from 'react-native-gesture-handler';
import PressableOpacity from './PressableOpacity';
import Color from '@/constants/Color';
import BodyText from '../Texts/BodyText';
import Radius from '@/constants/Radius';

interface IconButtonProps extends PressableProps {
  icon: ReactNode;
  label?: string;
  onPress?: () => void;
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  label,
  onPress,
  style,
  ...rest
}) => {
  return (
    <PressableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      {icon}
      {label && (
        <BodyText variant="sm" style={{ color: Color.PRIMARY_DEFAULT }}>
          {label}
        </BodyText>
      )}
    </PressableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.PRIMARY_100,
    padding: 10,
    borderRadius: Radius.LG,
  },
});
