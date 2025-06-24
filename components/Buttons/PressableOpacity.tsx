import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { FC } from 'react';

interface PressableOpacityProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  showDisabledStyle?: boolean;
  pressedOpacity?: number;
}
const PressableOpacity: FC<PressableOpacityProps> = ({
  style,
  showDisabledStyle = true,
  pressedOpacity = 0.5,
  children,
  disabled,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={({ pressed }) => [
        {
          opacity: pressed || (disabled && showDisabledStyle) 
          ? pressedOpacity
          : 1,
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
};

export default PressableOpacity;
