import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { FC } from 'react';

interface PressableOpacityProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  showDisabledStyle?: boolean;
}
const PressableOpacity: FC<PressableOpacityProps> = ({
  style,
  showDisabledStyle = true,
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
          opacity: pressed || (disabled && showDisabledStyle) ? 0.5 : 1,
        },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
};

export default PressableOpacity;
