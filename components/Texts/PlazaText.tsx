import { FC } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

export interface PlazaTextProps extends TextProps {
  style?: TextStyle;
  fontSize?: TextStyle['fontSize'];
  fontWeight?: TextStyle['fontWeight'];
  color?: TextStyle['color'];
}

const PlazaText: FC<PlazaTextProps> = ({
  fontSize,
  fontWeight,
  color,
  style,
  children,
  ...props
}) => {
  const handleFontWeight = () => {
    switch (fontWeight) {
      case '100':
      case 100:
        return 'Inter_100Thin';
      case '200':
      case 200:
        return 'Inter_200ExtraLight';
      case '300':
      case 300:
        return 'Inter_300Light';
      case '400':
      case 400:
        return 'Inter_400Regular';
      case '500':
      case 500:
        return 'Inter_500Medium';
      case '600':
      case 600:
        return 'Inter_600SemiBold';
      case '700':
      case 700:
        return 'Inter_700Bold';
      case '800':
      case 800:
        return 'Inter_800ExtraBold';
      case '900':
      case 900:
        return 'Inter_900Black';
      case 'thin':
        return 'Inter_100Thin';
      case 'ultralight':
        return 'Inter_200ExtraLight';
      case 'light':
        return 'Inter_300Light';
      case 'regular':
        return 'Inter_400Regular';
      case 'medium':
        return 'Inter_500Medium';
      case 'semibold':
        return 'Inter_600SemiBold';
      case 'bold':
        return 'Inter_700Bold';
      default:
        return 'Inter_400Regular';
    }
  };

  return (
    <Text
      style={{ fontSize, fontFamily: handleFontWeight(), color, ...style }}
      {...props}
    >
      {children}
    </Text>
  );
};

export default PlazaText;
