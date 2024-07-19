import { FC } from 'react';
import { Text, TextProps } from 'react-native';

const PlazaText: FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text style={{ fontFamily: 'SpaceMono' }} {...props}>
      {children}
    </Text>
  );
};

export default PlazaText;
