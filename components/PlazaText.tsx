import { FC } from 'react';
import { Text, TextProps } from 'react-native';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

const CaptionText: FC<TextProps> = ({ children, ...props }) => {
  let [fontsLoaded] = useFonts({
    Inter_300Light,
  });
  return (
    <Text
      style={{ fontSize: 12, fontWeight: 300, fontFamily: 'Inter_300Light' }}
      {...props}
    >
      {children}
    </Text>
  );
};

const PlazaText: FC<TextProps> = ({ children, ...props }) => {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  return (
    <Text
      style={{ fontSize: 14, fontWeight: 400, fontFamily: 'Inter_400Regular' }}
      {...props}
    >
      {children}
    </Text>
  );
};

const FocusedText: FC<TextProps> = ({ children, ...props }) => {
  let [fontsLoaded] = useFonts({
    Inter_500Medium,
  });
  return (
    <Text
      style={{ fontSize: 16, fontWeight: 500, fontFamily: 'Inter_500Medium' }}
      {...props}
    >
      {children}
    </Text>
  );
};

const HeaderText: FC<TextProps> = ({ children, ...props }) => {
  let [fontsLoaded] = useFonts({
    Inter_700Bold,
  });
  return (
    <Text
      style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Inter_700Bold' }}
      {...props}
    >
      {children}
    </Text>
  );
};

export { CaptionText, PlazaText, FocusedText, HeaderText };
