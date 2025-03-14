import { FC } from 'react';
import PlazaText, { PlazaTextProps } from './PlazaText';
import { StyleSheet } from 'react-native';

interface HeadingTextProps extends PlazaTextProps {
  variant: keyof typeof styles;
}

const HeadingText: FC<HeadingTextProps> = ({ children, variant, ...rest }) => {
  return (
    <PlazaText
      fontSize={styles[variant].fontSize}
      fontWeight={styles[variant].fontWeight}
      style={{
        lineHeight: styles[variant].lineHeight,
      }}
      {...rest}
    >
      {children}
    </PlazaText>
  );
};

export default HeadingText;

const styles = StyleSheet.create({
  h6: {
    fontSize: 16,
    fontWeight: 'semibold',
    lineHeight: 18,
  },
  ['h6-bold']: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  h5: {
    fontSize: 20,
    fontWeight: 'semibold',
    lineHeight: 24,
  },
  ['h5-bold']: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
  },
});
