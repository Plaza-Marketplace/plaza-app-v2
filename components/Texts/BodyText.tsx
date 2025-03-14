import { StyleSheet } from 'react-native';
import PlazaText, { PlazaTextProps } from './PlazaText';
import { FC } from 'react';

interface BodyTextProps extends PlazaTextProps {
  variant: keyof typeof styles;
}

const BodyText: FC<BodyTextProps> = ({ children, variant, ...rest }) => {
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

export default BodyText;

const styles = StyleSheet.create({
  lg: {
    fontSize: 16,
    fontWeight: 'regular',
    lineHeight: 24,
  },
  ['md-bold']: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  ['md-regular']: {
    fontSize: 14,
    fontWeight: 'regular',
    lineHeight: 20,
  },
  ['md-medium']: {
    fontSize: 14,
    fontWeight: 'medium',
    lineHeight: 20,
  },
  md: {
    fontSize: 14,
    fontWeight: 'regular',
    lineHeight: 20,
  },
  ['sm-bold']: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  ['sm-regular']: {
    fontSize: 12,
    fontWeight: 'regular',
    lineHeight: 18,
  },
  ['sm-medium']: {
    fontSize: 12,
    fontWeight: 'medium',
    lineHeight: 18,
  },
});
