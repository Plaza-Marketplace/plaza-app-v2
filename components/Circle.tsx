import { FC } from 'react';
import { View, ViewProps } from 'react-native';

interface CircleProps extends ViewProps {
  size: number;
}

const Circle: FC<CircleProps> = ({ size, style, ...rest }) => {
  return (
    <View
      style={[{ width: size, height: size, borderRadius: size / 2 }, style]}
      {...rest}
    />
  );
};

export default Circle;
